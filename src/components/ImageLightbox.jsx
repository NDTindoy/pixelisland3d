import { X } from 'lucide-react';

const ImageLightbox = ({ isOpen, onClose, imageSrc, title }) => {
  if (!isOpen || !imageSrc) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        aria-label="Close image lightbox"
        className="absolute top-6 right-6 text-white/70 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
      >
        <X size={28} />
      </button>

      <div 
        className="relative max-w-7xl max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={imageSrc} 
          alt={title || 'Enlarged View'} 
          className="max-w-full max-h-[82vh] object-contain rounded-xl border border-[#333] shadow-2xl"
        />
        {title && (
          <div className="mt-4 text-center">
            <h3 className="text-white font-bold text-lg md:text-xl tracking-wide">{title}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageLightbox;
