import React from 'react';
import { MapPin } from 'lucide-react';

const AvailablePlotsScroller: React.FC = () => {
    const plots = [
        "CMDA Approved Plots in Poonamallee",
        "CMDA Approved Plots in Avadi",
        "Premium Villas in West Tambaram",
        "Residential Plots in Tambaram",
        "DTCP Plots in Guduvanchery",
        "Luxury Apartments in Chengalpattu",
        "Commercial Plots in Tirukazhukundram",
        "DTCP Approved Sites in Maraimalai Nagar",
        "Individual Houses in Padappai",
        "Gated Community Plots in Urapakkam",
        "Gated Villas in Paruthipattu",

    ];

    return (
        <div className="relative pt-4">
            {/* Prominent Trust Badge Overlay */}
            <div className="absolute top-1 sm:top-0 left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-gradient-to-r from-emerald-600 to-green-500 text-white text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 rounded-full shadow-lg border border-white/40 flex items-center gap-2 backdrop-blur-sm whitespace-nowrap shadow-green-500/20">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    100% DTCP & CMDA APPROVED
                </div>
            </div>

            <div
                className="w-full py-4 overflow-hidden relative border-y border-gold/40 backdrop-blur-md shadow-[0_0_15px_rgba(217,177,4,0.15)]"
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
        </div>
    );
};

export default AvailablePlotsScroller;
