import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mountScrollWorld } from '../lib/scrub-engine';
import './landing-theme.css';

// Four beats cut from one continuous camera flight. Because every clip comes from
// the same render, each one's first frame is the frame after the previous one's
// last -- so the seams are frame-exact and need no connector clips.
const SECTIONS = [
  {
    id: 'clouds',
    label: 'Vision',
    still: '/assets/landing/scene1.webp',
    stillMobile: '/assets/landing/scene1-m.webp',
    clip: '/assets/landing/vid/scene1-m.mp4',
    clipMobile: '/assets/landing/vid/scene1-m.mp4',
    accent: '#D4AF37',
    linger: 0.5,
    eyebrow: 'Pixel Island',
    title: 'Every project begins as a view from above.',
    body: 'Before the first wall exists, we build the whole thing in light.',
    tags: ['Architectural Visualization', 'Since 2019'],
  },
  {
    id: 'site',
    label: 'The Site',
    still: '/assets/landing/scene2.webp',
    stillMobile: '/assets/landing/scene2-m.webp',
    clip: '/assets/landing/vid/scene2-m.mp4',
    clipMobile: '/assets/landing/vid/scene2-m.mp4',
    accent: '#D4AF37',
    linger: 0.5,
    eyebrow: 'The Site',
    title: 'We start where the building will stand.',
    body: 'Terrain, approach, orientation, and the way evening falls across it.',
    tags: ['Site Studies', 'Aerial Views', 'Masterplans'],
  },
  {
    id: 'blueprint',
    label: 'Engineering',
    still: '/assets/landing/scene3.webp',
    stillMobile: '/assets/landing/scene3-m.webp',
    clip: '/assets/landing/vid/scene3-m.mp4',
    clipMobile: '/assets/landing/vid/scene3-m.mp4',
    accent: '#D4AF37',
    linger: 0.5,
    eyebrow: 'The Engineering',
    title: 'Every line resolved before ground breaks.',
    body: 'Structure, setbacks, and materials -- drawn precisely, then built.',
    tags: ['Technical Drawings', 'Construction Sequencing'],
  },
  {
    id: 'result',
    label: 'The Result',
    still: '/assets/landing/scene4.webp',
    stillMobile: '/assets/landing/scene4-m.webp',
    clip: '/assets/landing/vid/scene4-m.mp4',
    clipMobile: '/assets/landing/vid/scene4-m.mp4',
    accent: '#D4AF37',
    linger: 0.45,
    eyebrow: 'The Result',
    title: 'You see it finished before it is.',
    body: 'Photoreal stills and cinematic film your buyers believe.',
    tags: [],
    cta: {
      primary: { label: 'Start a Project', href: '/contact' },
      secondary: { label: 'See Our Work', href: '/projects' },
    },
  },
];

// One null per seam: the clips already join frame-exactly, so there is nothing
// to bridge. (Length must be SECTIONS.length - 1.)
const CONNECTORS = [null, null, null];

const Landing = () => {
  const hostRef = useRef(null);
  const navigate = useNavigate();
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    // Reveal the page once the first clip can actually paint. We poll for the
    // video's readyState rather than the engine's `has-clip` class: that class
    // is added on a `seeked` event, which never fires at scroll 0 because the
    // video is already at time 0 — polling for it deadlocks the loader on top
    // of the nav. The timeout is a hard backstop so a slow or failed fetch can
    // never leave the visitor stuck behind the overlay.
    let done = false;
    const reveal = () => { if (!done) { done = true; setIsVideoReady(true); } };

    const interval = setInterval(() => {
      const v = document.querySelector('.sw-scene video');
      if (v && v.readyState >= 2) reveal();
    }, 150);
    const timeout = setTimeout(reveal, 6000);

    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // StrictMode double-invokes effects in dev. The destroy() teardown handles
    // this gracefully now, so we don't need a mountedRef guard.
    const destroy = mountScrollWorld(host, {
      brand: { name: 'Pixel Island', href: '/', logoUrl: '/assets/Logo_C_Alpha.png' },
      // Get Started is the "leave the flythrough, enter the site" exit, so it
      // lands on the main site home rather than jumping straight to contact.
      cta: { label: 'Get Started', href: '/home' },
      hint: 'scroll to fly in',
      nav: true,
      atmosphere: true,
      diveScroll: 1.5,
      connScroll: 0.9,
      sections: SECTIONS,
      connectors: CONNECTORS,
    });

    // The engine renders plain <a> elements (it is framework-agnostic), so
    // in-app links would trigger a full page reload. Intercept same-origin
    // internal hrefs and hand them to the router instead.
    const onClick = (e) => {
      const a = e.target.closest('a');
      if (!a || !host.contains(a)) return;
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('/')) return;
      if (a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      navigate(href);
    };
    host.addEventListener('click', onClick);

    return () => {
      host.removeEventListener('click', onClick);
      destroy();
    };
  }, [navigate]);

  // The engine sets its own fixed-position layers and a tall scroll track, and
  // reads these custom properties for theming. Scoping them to this container
  // keeps them from leaking into the rest of the site.
  return (
    <>
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ${
          isVideoReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <img src="/assets/landing/scene1.webp" alt="Loading" className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <img src="/assets/Logo_C_Alpha.png" alt="Pixel Island" className="h-16 w-auto object-contain animate-pulse" />
          <h2 className="text-gold font-sans tracking-[0.2em] uppercase text-sm font-semibold">Initializing Pixel Island</h2>
        </div>
      </div>

      <div
        ref={hostRef}
        style={{
        '--sw-bg': '#0A0A0A',
        '--sw-ink': '#FFFFFF',
        '--sw-ink-soft': '#9CA3AF',
        '--sw-accent': '#D4AF37',
        '--sw-font-display': "'Outfit', sans-serif",
        '--sw-font-body': "'Inter', sans-serif",
      }}
    />
    </>
  );
};

export default Landing;
