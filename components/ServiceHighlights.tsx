import React from 'react';
import {
    MapPinned,
    Car,
    BookOpen,
    Ban,
    ShieldCheck,
    FileText,
    Headset,
    HeartHandshake
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
                </div>

            </div>
        </section>
    );
};

export default ServiceHighlights;
