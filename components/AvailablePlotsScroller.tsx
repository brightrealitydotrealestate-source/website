import React from 'react';
import { MapPin } from 'lucide-react';

const AvailablePlotsScroller: React.FC = () => {
    const plots = [
        "DTCP Approved Plots in Poonamallee",
        "CMDA Approved Plots in Avadi",
        "Premium Villas in Porur",
        "Residential Plots in Tambaram",
        "DTCP Plots in Kundrathur",
        "Luxury Apartments in Vadapalani",
        "Commercial Plots in Guindy",
        "CMDA Approved Sites in Chromepet",
        "Individual Houses in Pallavaram",
        "Gated Community Plots in Urapakkam",
    ];

    return (
        <div className="w-full bg-cream py-3 overflow-hidden relative border-y border-gold/20">
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

            {/* Gradient fade edges - Updated to match cream background */}
            <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-cream to-transparent pointer-events-none z-10"></div>
            <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-cream to-transparent pointer-events-none z-10"></div>
        </div>
    );
};

export default AvailablePlotsScroller;
