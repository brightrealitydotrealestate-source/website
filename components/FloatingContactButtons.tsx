import React, { useState, useEffect, useRef } from 'react';
import { Phone, X, Copy, Check } from 'lucide-react';

// WhatsApp Icon Component
const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

interface FloatingContactButtonsProps {
    phoneNumber: string;
    whatsappNumber?: string;
}

const FloatingContactButtons: React.FC<FloatingContactButtonsProps> = ({
    phoneNumber,
    whatsappNumber
}) => {
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showCallDialog, setShowCallDialog] = useState(false);
    const [copied, setCopied] = useState(false);
    const buttonsRef = useRef<HTMLDivElement>(null);

    // Device detection
    useEffect(() => {
        const checkDevice = () => {
            const width = window.innerWidth;
            const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            setIsMobile(width < 768 || hasTouch);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    // Footer intersection observer (mobile only)
    useEffect(() => {
        if (!isMobile) {
            setIsFooterVisible(false);
            return;
        }

        const footer = document.getElementById('footer');
        if (!footer) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsFooterVisible(entry.isIntersecting);
                });
            },
            {
                threshold: 0.1, // Trigger when 10% of footer is visible
                rootMargin: '0px'
            }
        );

        observer.observe(footer);

        return () => {
            observer.disconnect();
        };
    }, [isMobile]);

    const handlePhoneClick = () => {
        if (isMobile) {
            // Mobile: Direct phone call
            window.location.href = `tel:${phoneNumber}`;
        } else {
            // Desktop: Show popup dialog
            setShowCallDialog(true);
        }
    };

    const handleWhatsAppClick = () => {
        if (whatsappNumber) {
            window.open(`https://wa.me/${whatsappNumber}`, '_blank');
        }
    };

    const handleCopyNumber = async () => {
        try {
            await navigator.clipboard.writeText(phoneNumber);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleCloseDialog = () => {
        setShowCallDialog(false);
        setCopied(false);
    };

    return (
        <>
            {/* Floating Buttons */}
            <div
                ref={buttonsRef}
                className="fixed right-4 md:right-6 bottom-20 z-50 flex flex-col gap-4 transition-opacity duration-500"
                style={{
                    opacity: isFooterVisible ? 0 : 1,
                    pointerEvents: isFooterVisible ? 'none' : 'auto'
                }}
            >
                {/* Phone Call Button with Bubble/Water Drop Effect */}
                <button
                    onClick={handlePhoneClick}
                    className="group relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center active:scale-95 transition-transform overflow-hidden backdrop-blur-md bg-white/20 animate-float hover:animate-none hover:scale-110 transition-all duration-300"
                    aria-label="Call us"
                    style={{
                        boxShadow: `
                            0 8px 32px rgba(0, 0, 0, 0.1),
                            0 2px 8px rgba(0, 0, 0, 0.05),
                            inset 0 1px 2px rgba(255, 255, 255, 0.3),
                            inset 0 -2px 4px rgba(0, 0, 0, 0.05)
                        `
                    }}
                >
                    {/* Glossy shine effect */}
                    <div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)'
                        }}
                    />
                    <Phone size={24} className="relative text-gold z-10" strokeWidth={2.5} />
                </button>

                {/* WhatsApp Button with Bubble/Water Drop Effect */}
                <button
                    onClick={handleWhatsAppClick}
                    className="group relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center active:scale-95 transition-transform overflow-hidden backdrop-blur-md bg-white/20 animate-float hover:animate-none hover:scale-110 transition-all duration-300"
                    aria-label="WhatsApp us"
                    style={{
                        animationDelay: '1.25s', // Stagger the float animation
                        boxShadow: `
                            0 8px 32px rgba(0, 0, 0, 0.1),
                            0 2px 8px rgba(0, 0, 0, 0.05),
                            inset 0 1px 2px rgba(255, 255, 255, 0.3),
                            inset 0 -2px 4px rgba(0, 0, 0, 0.05)
                        `
                    }}
                >
                    {/* Glossy shine effect */}
                    <div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)'
                        }}
                    />
                    <WhatsAppIcon size={26} className="relative text-green-600 z-10" />
                </button>
            </div>

            {/* Call Dialog Popup (Desktop Only) */}
            {showCallDialog && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    onClick={handleCloseDialog}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full relative"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: 'linear-gradient(135deg, #FAFAF5 0%, #F9D8A5 100%)'
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleCloseDialog}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors"
                            aria-label="Close dialog"
                        >
                            <X size={24} className="text-gold-deep" />
                        </button>

                        {/* Phone Icon */}
                        <div className="flex justify-center mb-6">
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden"
                                style={{
                                    background: 'linear-gradient(135deg, #D9B104 0%, #B09257 100%)'
                                }}
                            >
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)'
                                    }}
                                />
                                <Phone size={32} className="text-white relative z-10" strokeWidth={2.5} />
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-gold-deep text-center mb-2">
                            Call Us
                        </h3>

                        {/* Subtitle */}
                        <p className="text-gold-dark text-center mb-6">
                            Call this number for any kind of enquiry
                        </p>

                        {/* Phone Number Display */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mb-6 border border-gold/20">
                            <p className="text-2xl font-bold text-gold-deep text-center tracking-wide">
                                {phoneNumber}
                            </p>
                        </div>

                        {/* Copy Button */}
                        <button
                            onClick={handleCopyNumber}
                            className="w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
                            style={{
                                background: copied
                                    ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                                    : 'linear-gradient(135deg, #D9B104 0%, #B09257 100%)'
                            }}
                        >
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%)'
                                }}
                            />
                            {copied ? (
                                <>
                                    <Check size={20} className="relative z-10" />
                                    <span className="relative z-10">Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Copy size={20} className="relative z-10" />
                                    <span className="relative z-10">Copy Number</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default FloatingContactButtons;
