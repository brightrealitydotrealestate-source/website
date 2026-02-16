import React from 'react';
import {
    MapPinned,
    Car,
    BookOpen,
    Ban,
    ShieldCheck,
    FileText,
    Headset,
<<<<<<< HEAD
    HeartHandshake,
    Star
=======
    HeartHandshake
>>>>>>> 70af73cd5e1c2bda10e3b8ccc50863fb6058d301
} from 'lucide-react';

const ServiceHighlights: React.FC = () => {
    const services = [
        { icon: MapPinned, label: "Free Site Visit" },
        { icon: Car, label: "Free Cab Facility" },
        { icon: BookOpen, label: "A-Z Guiding" },
        { icon: Ban, label: "No Hidden Charges" },
        { icon: ShieldCheck, label: "100% Authentic" },
        { icon: FileText, label: "Clear Documentation" },
        { icon: Headset, label: "24/7 Support" },
        { icon: HeartHandshake, label: "Post-Purchase Care" },
    ];

    return (
        <section className="py-8 bg-cream border-b border-gold/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

<<<<<<< HEAD
                {/* Floating Glossy Badge */}
                <div className="flex justify-center mb-8">
                    <div
                        className="animate-float inline-flex items-center justify-center relative px-12 py-4 rounded-full text-gold-deep font-semibold text-sm md:text-base tracking-wide border border-gold/20 backdrop-blur-md cursor-default select-none text-center min-h-[60px]"
                        style={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            boxShadow: `
                                0 4px 20px rgba(217, 177, 4, 0.15),
                                0 2px 8px rgba(0, 0, 0, 0.06)
                            `
                        }}
                    >
                        {/* Scattered Stars - Left */}
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-full">
                            <Star size={12} className="text-gold fill-gold absolute top-2 left-0 animate-pulse-slow" />
                            <Star size={10} className="text-gold fill-gold absolute bottom-3 left-4 animate-wiggle" />
                            <Star size={14} className="text-gold fill-gold absolute top-1/2 -translate-y-1/2 -left-2 animate-float" />
                            <Star size={12} className="text-gold fill-gold absolute top-4 right-1 animate-pulse-slow delay-300" />
                            <Star size={10} className="text-gold fill-gold absolute bottom-2 -left-1 animate-float delay-500" />
                        </div>

                        <span className="text-center mx-4 max-w-[280px] md:max-w-full leading-tight">Why We Are The Best Real Estate Company Around Over All Tamil Nadu</span>

                        {/* Scattered Stars - Right */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-full">
                            <Star size={12} className="text-gold fill-gold absolute top-2 right-0 animate-pulse-slow" />
                            <Star size={10} className="text-gold fill-gold absolute bottom-3 right-4 animate-wiggle" />
                            <Star size={14} className="text-gold fill-gold absolute top-1/2 -translate-y-1/2 -right-2 animate-float" />
                            <Star size={12} className="text-gold fill-gold absolute top-4 left-1 animate-pulse-slow delay-300" />
                            <Star size={10} className="text-gold fill-gold absolute bottom-2 -right-1 animate-float delay-500" />
                        </div>
                    </div>
                </div>

                {/* Responsive Grid View with Staggered Layout */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pb-12">
                    {services.map((service, index) => {
                        // Staggered offset for desktop layout (Static Wave)
                        const offsetClass = [
                            'md:translate-y-0',
                            'md:translate-y-12',
                            'md:translate-y-4',
                            'md:translate-y-16',
                            'md:translate-y-16',
                            'md:translate-y-2',
                            'md:translate-y-12',
                            'md:translate-y-6'
                        ][index % 8];

                        // Staggered delay for the continuous wave animation
                        // Increasing delay to create a "wave" passing through
                        const waveDelayClass = [
                            'delay-100', 'delay-300', 'delay-500', 'delay-700',
                            'delay-200', 'delay-400', 'delay-600', 'delay-100'
                        ][index % 8];

                        // Varied icon animations
                        const iconAnimation = [
                            'animate-pulse-slow',
                            'animate-wiggle',
                            'animate-float',
                            'animate-pulse-slow',
                            'animate-wiggle',
                            'animate-float',
                            'animate-pulse-slow',
                            'animate-wiggle'
                        ][index % 8];

                        return (
                            <div
                                key={index}
                                className={`bg-white/80 backdrop-blur-sm border border-gold/20 p-4 md:p-6 rounded-xl shadow-lg hover:shadow-gold/20 hover:scale-105 transition-all duration-500 group flex flex-col items-center justify-center text-center gap-2 md:gap-3 cursor-default animate-float-slow ${offsetClass} ${waveDelayClass}`}
                            >
                                <div className="p-2 md:p-3 bg-gradient-to-br from-peach/20 to-gold/10 rounded-full group-hover:from-gold group-hover:to-gold-light transition-colors duration-300">
                                    <service.icon
                                        size={28}
                                        className={`text-gold-deep group-hover:text-white transition-colors duration-300 md:w-8 md:h-8 ${iconAnimation}`}
                                        strokeWidth={1.5}
                                    />
                                </div>
                                <span className="font-serif font-bold text-gold-deep text-sm md:text-lg group-hover:text-gold transition-colors duration-300 leading-tight">
                                    {service.label}
                                </span>
                            </div>
                        );
                    })}
=======
                {/* Responsive Grid View (2 cols mobile, 4 cols desktop) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white/80 backdrop-blur-sm border border-gold/20 p-4 md:p-6 rounded-xl shadow-lg hover:shadow-gold/20 hover:scale-105 transition-all duration-300 group flex flex-col items-center justify-center text-center gap-2 md:gap-3 cursor-default"
                        >
                            <div className="p-2 md:p-3 bg-gradient-to-br from-peach/20 to-gold/10 rounded-full group-hover:from-gold group-hover:to-gold-light transition-colors duration-300">
                                <service.icon
                                    size={28}
                                    className="text-gold-deep group-hover:text-white transition-colors duration-300 animate-pulse-slow md:w-8 md:h-8"
                                    strokeWidth={1.5}
                                />
                            </div>
                            <span className="font-serif font-bold text-gold-deep text-sm md:text-lg group-hover:text-gold transition-colors duration-300 leading-tight">
                                {service.label}
                            </span>
                        </div>
                    ))}
>>>>>>> 70af73cd5e1c2bda10e3b8ccc50863fb6058d301
                </div>

            </div>
        </section>
    );
};

export default ServiceHighlights;
