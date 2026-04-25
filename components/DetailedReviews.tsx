import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

const REVIEWS_DATA = [
    { name: "Deva", comment: "Very Good Guiding & Easier Documentation" },
    { name: "Iyyanar", comment: "Excellent Service, Hassle-Free Registration" },
    { name: "Rajkumar", comment: "Trustworthy & Professional Team, Recently Bought a New Villa With Help of Bright Reality" },
    { name: "Samundeswari", comment: "Best Real Estate Experts in Chennai" },
    { name: "Shankar", comment: "Quick & Transparent Property Deals" },
    { name: "Arun Balaji", comment: "Highly Recommended for First-Time Buyers" },
    { name: "Subbama", comment: "Exceptional Support Throughout the Process" },
    { name: "Johnson", comment: "I Bought a New Villa Through Bright Reality, Very Reliable & Auspicious Company" },
    { name: "Chithra", comment: "Very Good Service, Help Me Through out Registration Process" },
    { name: "LK Sakila", comment: "I Really Happy, Bought My New Plot In Minimal Budget" },
];

const ReviewCard = ({ name, comment }: { name: string, comment: string }) => (
    <div className="flex-shrink-0 w-[300px] md:w-[400px] h-[220px] md:h-[200px] bg-white rounded-2xl shadow-xl border border-gold/10 p-6 mx-4 relative overflow-hidden group hover:shadow-gold/20 transition-all duration-300">
        <div className="absolute top-4 right-4 text-gold/10 group-hover:text-gold/20 transition-colors">
            <Quote size={40} className="transform rotate-180" />
        </div>
        <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
                <h4 className="font-bold text-gold-deep text-lg capitalize">{name}</h4>
                <div className="flex items-center gap-1 mt-1">
                    <ShieldCheck size={14} className="text-green-600" />
                    <span className="text-[10px] font-bold text-green-600 tracking-wider uppercase bg-green-50 px-2 py-0.5 rounded-full">Verified Review</span>
                </div>
            </div>
            <div className="flex gap-1 bg-cream px-2 py-1 rounded-full shadow-inner border border-gold/5">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="text-gold fill-gold" />)}
            </div>
        </div>
        <p className="text-gold-deep/80 italic font-medium relative z-10 text-sm md:text-base leading-relaxed line-clamp-3">"{comment}"</p>
    </div>
);

const DetailedReviews: React.FC = () => {

    return (
        <section className="py-16 md:py-20 bg-gradient-to-b from-cream to-white relative overflow-hidden">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center space-x-2 mb-4 bg-white px-6 py-2 rounded-full shadow-[0_0_15px_rgba(217,177,4,0.15)] border border-gold/20">
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} className="text-gold fill-gold" />)}
                    </div>
                    <span className="font-bold text-gold-deep">5.0 / 5.0 Rating</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gold-deep mb-4">What Our Clients Say</h2>
                <p className="text-base text-gold-dark max-w-2xl mx-auto font-medium px-4">Hundreds of families have trusted Bright Reality with their most important investments. Read their verified experiences.</p>
            </div>

            {/* Scrollers */}
            <div className="relative w-full">
                {/* Gradient Fades for depth */}
                <div className="absolute top-0 left-0 h-full w-20 md:w-40 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 h-full w-20 md:w-40 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none"></div>

                {/* Single Row - all 10 reviews scrolling left */}
                <div className="flex mt-4 animate-scroll w-max">
                    <div className="flex shrink-0">
                        {REVIEWS_DATA.map((review, i) => (
                            <React.Fragment key={`r1-${i}`}><ReviewCard name={review.name} comment={review.comment} /></React.Fragment>
                        ))}
                    </div>
                    {/* Duplicate for seamless infinite loop */}
                    <div className="flex shrink-0">
                        {REVIEWS_DATA.map((review, i) => (
                            <React.Fragment key={`r2-${i}`}><ReviewCard name={review.name} comment={review.comment} /></React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Custom Animation definition if tailwind config isn't aware of reverse scroll */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes scroll-reverse {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .animate-scroll-reverse {
                    animation: scroll-reverse 40s linear infinite;
                }
            `}} />
        </section>
    );
};

export default DetailedReviews;
