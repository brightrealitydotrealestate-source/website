import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { GALLERY_ITEMS } from '../constants';
import SEO from '../components/SEO';

// Enhanced Data Structure
interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
}

// Uniform Square Tile Component with Smooth Animations
const GalleryMediaItem: React.FC<{
  item: GalleryItem;
  onClick: () => void;
}> = ({ item, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // For video, we try to seek to a random point to generate a thumbnail
  useEffect(() => {
    if (item.type === 'video' && videoRef.current) {
      const vid = videoRef.current;
      vid.currentTime = 5; // Seek to 5 seconds to get a "random shot"
    }
  }, [item.type]);

  return (
    <div
      className="relative group overflow-hidden rounded-xl shadow-lg border border-gold/20 cursor-pointer bg-cream aspect-square"
      onClick={onClick}
    >
      {/* Skeleton Loader - No Animation */}
      <div
        className={`absolute inset-0 bg-gray-200/50 z-10 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
      />

      {item.type === 'video' ? (
        <div className={`relative w-full h-full ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <video
            ref={videoRef}
            src={item.src}
            className="w-full h-full object-cover"
            muted
            preload="metadata"
            playsInline
            onLoadedData={() => setIsLoaded(true)}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/40 backdrop-blur-sm p-4 rounded-full border border-white/60 shadow-xl">
              <Play fill="white" className="text-white w-6 h-6 md:w-8 md:h-8" />
            </div>
          </div>
        </div>
      ) : (
        <img
          src={item.src}
          alt={item.alt}
          className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          onLoad={() => setIsLoaded(true)}
        />
      )}

      {/* Hover Overlay - No Animation */}
      <div className="absolute inset-0 bg-gold-deep/60 opacity-0 group-hover:opacity-100 flex items-center justify-center z-20">
        <span className="text-cream border border-cream px-6 py-2 uppercase tracking-widest text-sm font-semibold hover:bg-cream hover:text-gold-deep">
          View Full
        </span>
      </div>
    </div>
  );
};

const Gallery: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showOverlays, setShowOverlays] = useState(true);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const touchStartDistance = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const overlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Lock body scroll when lightbox is open - Enhanced
  useEffect(() => {
    if (lightboxOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Lock scroll and prevent pull-to-refresh
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';
    };
  }, [lightboxOpen]);

  // Auto-hide overlays after 3 seconds
  useEffect(() => {
    if (lightboxOpen) {
      // Show overlays when lightbox opens
      setShowOverlays(true);

      // Clear any existing timer
      if (overlayTimerRef.current) {
        clearTimeout(overlayTimerRef.current);
      }

      // Set timer to hide overlays after 3 seconds
      overlayTimerRef.current = setTimeout(() => {
        setShowOverlays(false);
      }, 3000);
    }

    return () => {
      if (overlayTimerRef.current) {
        clearTimeout(overlayTimerRef.current);
      }
    };
  }, [lightboxOpen, currentIdx]); // Reset timer when image changes

  const openLightbox = (index: number) => {
    setCurrentIdx(index);
    setLightboxOpen(true);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setShowOverlays(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setShowOverlays(true);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    // Instant navigation - no delays
    const newIdx = (currentIdx + 1) % GALLERY_ITEMS.length;
    setCurrentIdx(newIdx);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    // Instant navigation - no delays
    const newIdx = (currentIdx - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setCurrentIdx(newIdx);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (GALLERY_ITEMS[currentIdx].type === 'video') return;

    e.preventDefault();
    const delta = e.deltaY * -0.01;
    const newScale = Math.min(Math.max(1, scale + delta), 5);
    setScale(newScale);

    if (newScale === 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  // Touch swipe handlers for lightbox navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    // Prevent pull-to-refresh and other default touch behaviors
    e.preventDefault();

    if (e.touches.length === 2) {
      // Pinch to zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      touchStartDistance.current = distance;
    } else if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      if (scale > 1) {
        isDragging.current = true;
        dragStart.current = {
          x: e.touches[0].clientX - position.x,
          y: e.touches[0].clientY - position.y
        };
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Prevent pull-to-refresh and scrolling
    e.preventDefault();

    if (e.touches.length === 2 && GALLERY_ITEMS[currentIdx].type !== 'video') {
      // Pinch to zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );

      if (touchStartDistance.current > 0) {
        const scaleChange = distance / touchStartDistance.current;
        const newScale = Math.min(Math.max(1, scale * scaleChange), 5);
        setScale(newScale);
        touchStartDistance.current = distance;

        if (newScale === 1) {
          setPosition({ x: 0, y: 0 });
        }
      }
    } else if (e.touches.length === 1) {
      touchEndX.current = e.touches[0].clientX;

      if (isDragging.current && scale > 1) {
        setPosition({
          x: e.touches[0].clientX - dragStart.current.x,
          y: e.touches[0].clientY - dragStart.current.y
        });
      }
    }
  };

  const handleTouchEnd = () => {
    if (isDragging.current) {
      isDragging.current = false;
      return;
    }

    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && scale === 1) {
      nextImage();
    }
    if (isRightSwipe && scale === 1) {
      prevImage();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
    touchStartDistance.current = 0;
  };

  // Mouse drag for panning when zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1 && GALLERY_ITEMS[currentIdx].type !== 'video') {
      isDragging.current = true;
      dragStart.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Reset zoom on double click
  const handleDoubleClick = () => {
    if (GALLERY_ITEMS[currentIdx].type === 'video') return;

    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2);
    }
  };

  return (
    <div className="pt-24 md:pt-32 pb-8 md:pb-12 min-h-screen bg-cream">
      <SEO
        title="Gallery - Our Projects"
        description="View our gallery of luxury villas, plots, and real estate projects in Chennai and Avadi."
        canonical="https://www.kushibusy.in/gallery"
      />
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 relative">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gold-deep mb-3 md:mb-4">
            Our Portfolio
          </h1>

          {/* Glossy Gradient Separator */}
          <div className="h-[2px] w-32 md:w-48 bg-gradient-to-r from-transparent via-gold-light to-transparent opacity-80 mx-auto"></div>

          <p className="mt-3 md:mt-4 text-gold-dark text-base md:text-lg font-sans px-4">
            A glimpse into the luxury and opulence we provide.
          </p>
        </div>

        {/* Uniform Square Grid Layout - Optimized for All Devices */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {GALLERY_ITEMS.map((item, index) => (
            <GalleryMediaItem
              key={index}
              item={item}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>
      </div>

      {/* True Modal Lightbox - Full Screen Overlay via Portal */}
      {lightboxOpen && createPortal(
        <div
          className="fixed inset-0 z-[999999] bg-black/70 backdrop-blur-md"
          style={{
            touchAction: 'none',
            overscrollBehavior: 'none',
            WebkitOverflowScrolling: 'auto'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          {/* Close Button - Enhanced Visibility */}
          <button
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white bg-black/50 hover:bg-gold-deep p-3 md:p-4 rounded-full backdrop-blur-sm transition-all duration-300 z-[10001] shadow-2xl border-2 border-white/30 hover:border-gold-light"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X size={28} className="md:w-8 md:h-8" strokeWidth={2.5} />
          </button>

          {/* Navigation Arrows - Desktop Only - Enhanced */}
          <button
            className="absolute left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-gold-deep p-3 md:p-4 rounded-full backdrop-blur-sm transition-all duration-300 z-[10000] hidden md:flex items-center justify-center shadow-2xl border-2 border-white/30 hover:border-gold-light"
            onClick={prevImage}
            aria-label="Previous"
          >
            <ChevronLeft size={32} className="lg:w-10 lg:h-10" strokeWidth={2.5} />
          </button>

          <button
            className="absolute right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-gold-deep p-3 md:p-4 rounded-full backdrop-blur-sm transition-all duration-300 z-[10000] hidden md:flex items-center justify-center shadow-2xl border-2 border-white/30 hover:border-gold-light"
            onClick={nextImage}
            aria-label="Next"
          >
            <ChevronRight size={32} className="lg:w-10 lg:h-10" strokeWidth={2.5} />
          </button>

          {/* Media Container with Zoom Support */}
          <div
            className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onDoubleClick={handleDoubleClick}
          >
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{
                cursor: scale > 1 ? 'move' : 'default'
              }}
            >
              {GALLERY_ITEMS[currentIdx].type === 'video' ? (
                <video
                  controls
                  autoPlay
                  className="max-w-full max-h-full w-auto h-auto object-contain shadow-2xl rounded-lg"
                  src={GALLERY_ITEMS[currentIdx].src}
                  onClick={handleVideoClick}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={GALLERY_ITEMS[currentIdx].src}
                  alt={GALLERY_ITEMS[currentIdx].alt}
                  className="max-w-full max-h-full w-auto h-auto object-contain shadow-2xl rounded-lg"
                  style={{
                    transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                    transformOrigin: 'center center'
                  }}
                  draggable={false}
                />
              )}
            </div>
          </div>

          {/* Zoom Indicator - Auto-hiding */}
          {false && scale > 1 && GALLERY_ITEMS[currentIdx].type !== 'video' && (
            <div
              className={`absolute top-4 left-4 md:top-6 md:left-6 text-white bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm text-sm md:text-base font-sans z-[10000] border border-white/30 transition-opacity duration-500 ${showOverlays ? 'opacity-100' : 'opacity-0'
                }`}
            >
              {Math.round(scale * 100)}%
            </div>
          )}

          {/* Image Info - Bottom Center - Auto-hiding */}
          <div
            className={`absolute bottom-16 sm:bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 text-white/90 font-sans tracking-wide text-xs sm:text-sm md:text-base bg-black/50 px-4 sm:px-6 py-2 sm:py-3 rounded-full backdrop-blur-sm max-w-[90vw] text-center border border-white/30 transition-opacity duration-500 ${showOverlays ? 'opacity-100' : 'opacity-0'
              }`}
          >
            {currentIdx + 1} / {GALLERY_ITEMS.length} — {GALLERY_ITEMS[currentIdx].alt}
          </div>

          {/* Swipe Instruction - Mobile Only - Auto-hiding */}
          {false && <div className="md:hidden absolute bottom-4 sm:bottom-6 left-0 w-full flex justify-center z-[10000]">
            <div
              className={`bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full text-white text-sm font-sans border border-white/30 transition-opacity duration-500 ${showOverlays ? 'opacity-100' : 'opacity-0'
                }`}
            >
              ← Swipe to navigate →
            </div>
          </div>}
        </div>,
        document.body
      )}
    </div>
  );
};

export default Gallery;