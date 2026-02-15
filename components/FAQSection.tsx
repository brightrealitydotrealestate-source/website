
import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

const FAQSection: React.FC = () => {
    const [openId, setOpenId] = useState<number | null>(null);

    const toggleFAQ = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    const faqItems: FAQItem[] = [
        {
            id: 1,
            question: "How do I book a free site visit?",
            answer: "Booking a site visit is simple! You can contact us via the form above, call our support number, or message us on WhatsApp. We provide free cab facilities for your convenience to visit our premium plots."
        },
        {
            id: 2,
            question: "What documents do I need for property registration?",
            answer: "We assist you with all necessary documentation. Typically, you'll need ID proof (Aadhar/PAN), address proof, and photos. Our documentation experts will guide you through the entire Patta and EC process to ensure a hassle-free registration."
        },
        {
            id: 3,
            question: "Are there any hidden charges involved?",
            answer: "Absolutely not. At Bright Reality, we pride ourselves on transparency. The price we quote is the price you pay. There are zero hidden fees for our services, documentation support, or site visits."
        },
        {
            id: 4,
            question: "Do you offer post-purchase support?",
            answer: "Yes, our relationship doesn't end with the sale. We offer comprehensive post-purchase care, including assistance with property maintenance, fencing, and future resale support if you choose to liquidate your investment."
        }
    ];

    return (
        <section className="py-12 md:py-16 bg-cream border-t border-gold/10 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-peach/10 rounded-full filter blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-10 md:mb-14">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <HelpCircle size={20} className="text-gold" />
                        <h4 className="text-gold font-bold tracking-widest uppercase text-xs md:text-sm">Common Questions</h4>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gold-deep mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-sm md:text-base text-gold-dark max-w-2xl mx-auto font-medium">
                        Everything you need to know about investing with Bright Reality.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqItems.map((item) => (
                        <div
                            key={item.id}
                            className={`
                group rounded-xl border transition-all duration-300 overflow-hidden
                ${openId === item.id
                                    ? 'bg-white border-gold shadow-lg shadow-gold/10 scale-[1.01]'
                                    : 'bg-white/60 border-gold/20 hover:border-gold/50 hover:bg-white'
                                }
              `}
                        >
                            <button
                                onClick={() => toggleFAQ(item.id)}
                                className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
                            >
                                <span className={`
                  font-serif text-lg md:text-xl font-medium pr-8 transition-colors duration-300
                  ${openId === item.id ? 'text-gold-deep' : 'text-gold-deep/80 group-hover:text-gold-deep'}
                `}>
                                    {item.question}
                                </span>
                                <span className={`
                  flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border transition-all duration-300
                  ${openId === item.id
                                        ? 'bg-gold text-white border-gold rotate-180'
                                        : 'bg-peach/20 text-gold-deep border-gold/20 group-hover:border-gold group-hover:text-gold'
                                    }
                `}>
                                    {openId === item.id ? <Minus size={18} /> : <Plus size={18} />}
                                </span>
                            </button>

                            <div
                                className={`
                  transition-all duration-300 ease-in-out
                  ${openId === item.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}
                `}
                            >
                                <div className="p-5 md:p-6 pt-0 border-t border-dashed border-gold/20">
                                    <p className="text-base text-gold-deep/70 leading-relaxed font-sans">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FAQSection;
