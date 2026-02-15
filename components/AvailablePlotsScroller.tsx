import React from 'react';
import { MapPin } from 'lucide-react';

const AvailablePlotsScroller: React.FC = () => {
    const plots = [
        "CMDA Approved Plots in Poonamallee",
        "CMDA Approved Plots in Avadi",
        "Premium Villas in Porur",
        "Residential Plots in Tambaram",
        "DTCP Plots in Kundrathur",
        "Luxury Apartments in Vadapalani",
        "Commercial Plots in Guindy",
        "CMDA Approved Sites in Chromepet",
        "Individual Houses in Pallavaram",
        "Gated Community Plots in Urapakkam",
        "Gated Villas in Paruthipattu",

    ];

    return (
        <div
            className="w-full py-3 overflow-hidden relative border-y border-gold/40 backdrop-blur-md shadow-[0_0_15px_rgba(217,177,4,0.15)]"
            style={{
                background: 'rgba(255, 255, 255, 0.9)',
            }}
        >
            {/* Animated scrolling content wrapper - Moves left */}
            <div className="flex animate-scroll w-max">
                {/* First Set of Items */}
                <div className="flex shrink-0">
                    {plots.map((plot, index) => (
                        <div
                            key={`plot-1-${index}`}
                            className="inline-flex items-center px-8 text-gold-deep whitespace-nowrap"
                        >
                            <MapPin size={18} className="mr-2 flex-shrink-0 text-gold" />
                            <span className="font-sans font-semibold text-sm md:text-base tracking-wide">
                                {plot}
                            </span>
                            <span className="ml-6 text-gold/40 text-xl">•</span>
                        </div>
                    ))}
                </div>

                {/* Duplicate Set of Items (Identical to First) */}
                <div className="flex shrink-0">
                    {plots.map((plot, index) => (
                        <div
                            key={`plot-2-${index}`}
                            className="inline-flex items-center px-8 text-gold-deep whitespace-nowrap"
                        >
                            <MapPin size={18} className="mr-2 flex-shrink-0 text-gold" />
                            <span className="font-sans font-semibold text-sm md:text-base tracking-wide">
                                {plot}
                            </span>
                            <span className="ml-6 text-gold/40 text-xl">•</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Gradient fade edges - Updated to match new background */}
            <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
            <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
        </div>
    );
};

export default AvailablePlotsScroller;
