#!/bin/bash
# Cut the continuous landing hero flight into four scroll-scrub clips.
#
# Why re-encode instead of stream-copy: the source has only 3 keyframes
# (0s/10s/20s -- a 240-frame GOP). Scrub seeks decode forward from the
# preceding keyframe, so a 240-frame GOP scrubs like a slideshow. -g 8
# puts a keyframe every 8 frames, which is what makes seeking cheap.
#
# Run from the project root:  bash scripts/encode-landing.sh
set -euo pipefail

SRC="LandingPage_Hero_Video/Landing_Page_Hero_Video.mp4"
OUT="public/assets/landing"
VID="$OUT/vid"

[ -f "$SRC" ] || { echo "ERROR: source not found: $SRC" >&2; exit 1; }
mkdir -p "$VID"

# Beat boundaries (seconds). Cut points come from the narrative beats:
# clouds -> aerial villa reveal -> wireframe/construction -> finished twilight.
NAMES=(clouds site blueprint result)
STARTS=(0     5.5   11        16)
DURS=(5.5     5.5   5         8.68)

SHARPEN="unsharp=5:5:0.6:5:5:0.0"

for i in 0 1 2 3; do
  name="${NAMES[$i]}"
  start="${STARTS[$i]}"
  dur="${DURS[$i]}"
  n=$((i + 1))

  echo "--- scene $n ($name): ${start}s +${dur}s"

  # Desktop master. -ss before -i seeks fast; because we re-encode, the output
  # still starts on a real keyframe rather than a partial GOP.
  ffmpeg -v error -y -ss "$start" -t "$dur" -i "$SRC" -an \
    -vf "scale=1920:-2,$SHARPEN" \
    -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
    -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart \
    "$VID/scene$n.mp4"

  # Mobile: smaller + twice the keyframes. Phone seek cost is dominated by
  # frames-from-keyframe, so -g 4 at 720p scrubs far better than the 1080p master.
  ffmpeg -v error -y -ss "$start" -t "$dur" -i "$SRC" -an \
    -vf "scale=-2:720,$SHARPEN" \
    -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p \
    -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart \
    "$VID/scene$n-m.mp4"

  # Poster = first frame of the encoded clip, so it matches the video's frame 1
  # exactly. The engine holds this until the video paints (stops iOS blank-flash).
  ffmpeg -v error -y -i "$VID/scene$n.mp4" -frames:v 1 \
    -c:v libwebp -quality 88 "$OUT/scene$n.webp"
  ffmpeg -v error -y -i "$VID/scene$n-m.mp4" -frames:v 1 \
    -c:v libwebp -quality 82 "$OUT/scene$n-m.webp"
done

echo
echo "=== keyframe counts (expect ~30+ desktop / ~60+ mobile, NOT 1) ==="
for i in 1 2 3 4; do
  for f in "$VID/scene$i.mp4" "$VID/scene$i-m.mp4"; do
    k=$(ffprobe -v error -select_streams v:0 -show_entries packet=flags \
          -of csv=p=0 "$f" 2>/dev/null | grep -c "K" || true)
    d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f" 2>/dev/null)
    mb=$(ls -l "$f" | awk '{printf "%.2f", $5/1048576}')
    printf "  %-34s %4s keyframes  %6.2fs  %6s MB\n" \
      "$(basename "$f")" "$k" "$d" "$mb"
  done
done

echo
echo "=== total added weight ==="
du -sh "$OUT"
