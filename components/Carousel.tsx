import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SLIDES, COMPANY_INFO } from '../constants';

const Carousel: React.FC = () => {
  // Clone first slide to end and last slide to start for infinite loop effect
  // [Last, 1, 2, 3, First]
  const extendedSlides = [
    SLIDES[SLIDES.length - 1],
    ...SLIDES,
    SLIDES[0]
  ];

  const [currentIndex, setCurrentIndex] = useState(1); // Start at index 1 (the first real slide)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const transitionRef = useRef<number | null>(null);

  // Touch support
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const TRANSITION_DURATION = 700;
  const MIN_SWIPE_DISTANCE = 50;

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index + 1); // Adjust for the cloned first slide
  };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Handle transition end to snap back if needed
  useEffect(() => {
    if (!isTransitioning) return;

    const timeout = setTimeout(() => {
      setIsTransitioning(false);

      // If we are at the cloned last slide (index N + 1), snap to real first slide (index 1)
      if (currentIndex === extendedSlides.length - 1) {
        setCurrentIndex(1);
      }
      // If we are at the cloned first slide (index 0), snap to real last slide (index N)
      else if (currentIndex === 0) {
        setCurrentIndex(extendedSlides.length - 2);
      }
    }, TRANSITION_DURATION);

    return () => clearTimeout(timeout);
  }, [currentIndex, isTransitioning, extendedSlides.length]);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Helper to determine the "active" dot index
  const getRealIndex = (index: number) => {
    if (index === 0) return SLIDES.length - 1;
    if (index === extendedSlides.length - 1) return 0;
    return index - 1;
  };

  return (
    <div
      className="relative w-full aspect-video overflow-hidden group shadow-2xl rounded-lg bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides Container */}
      <div
        className="flex h-full w-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? `transform ${TRANSITION_DURATION}ms ease-in-out` : 'none'
        }}
      >
        {extendedSlides.map((slide, index) => (
          <div key={`${slide.id}-${index}`} className="min-w-full h-full relative">
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />

            {/* Glossy Fade: Top */}
            <div className="absolute top-0 left-0 right-0 h-16 md:h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

            {/* Glossy Fade: Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-24 md:h-40 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

            {/* Optional Slide Caption */}
            <div className={`absolute bottom-12 md:bottom-16 left-4 md:left-20 text-cream transition-opacity duration-1000 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold drop-shadow-xl text-white mb-2 md:mb-3">
                {slide.name}
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl font-sans tracking-wide text-gold-light drop-shadow-md font-medium">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow - Hidden on mobile/tablet */}
      <button
        onClick={prevSlide}
        className="hidden lg:block absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-gold-light transition-all duration-300 transform hover:scale-125 drop-shadow-lg opacity-0 group-hover:opacity-100"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={48} strokeWidth={1.5} />
      </button>

      {/* Right Arrow - Hidden on mobile/tablet */}
      <button
        onClick={nextSlide}
        className="hidden lg:block absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-gold-light transition-all duration-300 transform hover:scale-125 drop-shadow-lg opacity-0 group-hover:opacity-100"
        aria-label="Next Slide"
      >
        <ChevronRight size={48} strokeWidth={1.5} />
      </button>

      {/* Glossy Dot Indicators - 50% smaller */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-500 shadow-lg ${getRealIndex(currentIndex) === index
              ? 'bg-gradient-to-br from-gold-light to-gold-DEFAULT scale-125 shadow-[0_0_15px_rgba(229,196,122,0.6)]'
              : 'bg-white/20 border border-white/40 backdrop-blur-md hover:bg-white/40'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;