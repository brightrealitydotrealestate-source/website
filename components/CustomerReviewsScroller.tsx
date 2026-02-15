import React from 'react';
import { Star } from 'lucide-react';

const CustomerReviewsScroller: React.FC = () => {
    const reviews = [
        "Arun - Very Good Guiding & Easier Documentation",
        "Priya Saran. - Excellent Service, Hassle-Free Registration",
        "Karthik R. - Trustworthy & Professional Team",
        "Lakshmi V. - Best Real Estate Experience in Chennai",
        "Suresh M. - Quick & Transparent Property Deals",
        "Divya K. - Highly Recommended for First-Time Buyers",
        "Rajesh P. - Exceptional Support Throughout the Process",
        "Meena G. - Very Reliable & Auspicious Company",
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
                    {reviews.map((review, index) => (
                        <div
                            key={`review-1-${index}`}
                            className="inline-flex items-center px-8 text-gold-deep whitespace-nowrap"
                        >
                            <Star size={16} className="mr-2 flex-shrink-0 text-gold fill-gold" />
                            <span className="font-sans font-semibold text-sm md:text-base tracking-wide">
                                {review}
                            </span>
                            <span className="ml-6 text-gold/40 text-xl">•</span>
                        </div>
                    ))}
                </div>

                {/* Duplicate Set of Items (Identical to First) */}
                <div className="flex shrink-0">
                    {reviews.map((review, index) => (
                        <div
                            key={`review-2-${index}`}
                            className="inline-flex items-center px-8 text-gold-deep whitespace-nowrap"
                        >
                            <Star size={16} className="mr-2 flex-shrink-0 text-gold fill-gold" />
                            <span className="font-sans font-semibold text-sm md:text-base tracking-wide">
                                {review}
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

export default CustomerReviewsScroller;
