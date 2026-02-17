import React, { useState, useRef, useLayoutEffect } from 'react';
import { User, Building2, ArrowRight } from 'lucide-react';
import { ABOUT_US_IMAGE, ABOUT_US_FOUNDER_IMAGE } from '../constants';

const AboutUsSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'company' | 'founder'>('company');
    const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);

    const companyRef = useRef<HTMLDivElement>(null);
    const founderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Height Adjustment Effect
    useLayoutEffect(() => {
        const updateHeight = () => {
            const activeRef = activeTab === 'company' ? companyRef : founderRef;
            if (activeRef.current) {
                setContainerHeight(activeRef.current.offsetHeight);
            }
        };

        updateHeight();

        const resizeObserver = new ResizeObserver(() => {
            updateHeight();
        });

        if (companyRef.current) resizeObserver.observe(companyRef.current);
        if (founderRef.current) resizeObserver.observe(founderRef.current);

        return () => resizeObserver.disconnect();
    }, [activeTab]);

    // Scroll to top of About Us section
    const scrollToSection = () => {
        const section = document.getElementById('about-section');
        if (section) {
            const headerOffset = 100; // Navbar height
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleTabChange = (nextTab: 'company' | 'founder', shouldScroll: boolean = false) => {
        if (shouldScroll) {
            scrollToSection();
        }
        setActiveTab(nextTab);
    };

    // Shared Image Content (Dynamic Cross-Fade)
    const renderImage = () => (
        <div className="w-full md:w-5/12 relative group h-full md:mt-8">
            <div className="aspect-square overflow-hidden rounded-full shadow-2xl relative z-10 border-4 border-gold/20 h-full w-full">
                {/* Company Image */}
                <img
                    src={ABOUT_US_IMAGE}
                    alt="About Bright Reality"
                    className={`absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 ease-in-out ${activeTab === 'company' ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                />
                {/* Founder Image */}
                <img
                    src={ABOUT_US_FOUNDER_IMAGE}
                    alt="Founder of Bright Reality"
                    className={`absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 ease-in-out ${activeTab === 'founder' ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                />
            </div>
        </div>
    );

    // Content Block Component (Preserving user's text content)
    const ContentBlock = ({ type, isActive, domRef }: { type: 'company' | 'founder', isActive: boolean, domRef: React.RefObject<HTMLDivElement> }) => {
        // Shared transition classes
        const baseTransition = "transition-all duration-700 ease-out transform";
        const activeClass = "opacity-100 translate-y-0 pointer-events-auto blur-0 z-10";
        const inactiveClass = "opacity-0 translate-y-8 pointer-events-none blur-sm z-0 absolute top-0 left-0 w-full"; // inactive is absolute

        // Active state uses relative for measurement but we want BOTH to be absolute for smooth height animation?
        // Actually, for the height animation to work best with Cross-Fade, BOTH can be absolute, and the parent sets the height.
        // Let's make BOTH absolute or relative depending on desired behavior.
        // If we make BOTH absolute, we need to ensure the parent has explicit height.
        const wrapperClass = `w-full transition-all duration-700 ease-in-out absolute top-0 left-0 pb-4 ${isActive ? activeClass : inactiveClass}`;

        return (
            <div
                ref={domRef}
                className={wrapperClass}
            >
                {/* Sub-heading - No Delay */}
                <h4 className={`text-gold font-bold tracking-widest uppercase mb-2 text-xs md:text-sm ${baseTransition} ${isActive ? activeClass : inactiveClass}`} style={{ transitionDelay: '0ms' }}>
                    {type === 'company' ? "Hello, dear friends" : "Vanakkam Anbu Makkaleyy!"}
                </h4>

                {/* Main Heading - 100ms Delay */}
                <h2 className={`text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gold-deep mb-4 md:mb-5 leading-tight ${baseTransition} ${isActive ? activeClass : inactiveClass}`} style={{ transitionDelay: '100ms' }}>
                    {type === 'company' ? (
                        <>Bright Realty is located in Vadapalani <span className="text-gold-dark">  An Exceptional Real Estate Company</span></>
                    ) : (
                        <>Mr. Nazeer Ahamed S., <span className="text-gold-dark"> Founder of Bright Reality</span></>
                    )}
                </h2>

                {/* Body Text - 200ms Delay */}
                <div className={`text-base md:text-lg text-gold-deep/80 leading-relaxed font-sans ${baseTransition} ${isActive ? activeClass : inactiveClass}`} style={{ transitionDelay: '200ms' }}>
                    {type === 'company' ? (
                        <>
                            <p className="mb-4 md:mb-5">
                                At Bright Reality, we provide services for you anywhere around Chennai. Whether you are looking for a land plot, a villa, a flat, an individual house, or even a resale house—whatever you need, you can get in touch with Us.
                            </p>
                            <p className="mb-5 md:mb-6">
                                So, if you have any doubts regarding buying a house or a plot, or specific doubts regarding the Patta (land deed) or EC (Encumbrance Certificate), if you contact Us, We will resolve your doubts.
                            </p>
                            <p className="mb-5 md:mb-6">
                                Bright Reality, is a company with good experience. It is being run by experienced professionals. We have successfully completed over one lakh (100,000) registrations. So, Our company has earned a reputation for being an auspicious ('Kairasi') company.
                            </p>
                            <p className="mb-5 md:mb-6">
                                We strictly market only 100% legally cleared properties. Every plot in our portfolio is meticulously vetted and approved by the CMDA (Chennai Metropolitan Development Authority) or DTCP (Directorate of Town and Country Planning), and fully registered under RERA.
                            </p>
                            <p className="mb-5 md:mb-6">
                                By ensuring every project has a valid RERA ID and approved layout, we guarantee that your investment is safe from legal hurdles, protected by government regulations, and ready for immediate bank loan processing. We don’t just sell land; we sell a secure future.
                            </p>
                            <p className="mb-5 md:mb-6">
                                We don’t just pick any location; we pick the future hubs of Chennai. Our experts focus exclusively on emerging corridors Which has rapidly developing infrastructure, high demand for residential and commercial properties, and a strong potential for future growth. By choosing Bright Realty, you are investing in "A-Grade" locations that are designed for maximum capital appreciation, ensuring that your property value grows while providing the auspicious comfort and connectivity your family deserves.
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="mb-4 md:mb-5">
                                Mr. Nazeer Ahamed S., is dedicated to the service of helping individuals acquire land, particularly those who do not yet own property. He provides essential guidance on small-scale investments tailored to the needs of the common people. He is known for his ability to clearly explain the complexities of property transactions and documentation, ensuring that every client fully understands the process.
                            </p>
                            <p className="mb-5 md:mb-6">
                                Beyond his real estate services, he has created employment opportunities for countless individuals, empowering many to rise as entrepreneurs and achieve financial independence.
                            </p>
                            <p className="mb-5 md:mb-6">
                                You may approach him for a wide range of properties, including villas, apartments, independent houses, and land ranging from small investment plots to luxury housing sites. With extensive experience and unwavering dedication, he is a prominent figure in the real estate sector, having facilitated approximately one lakh plots registrations and earned the trust of thousands of satisfied customers.
                            </p>
                        </>
                    )}
                </div>

                {/* Footer - 300ms Delay */}
                <div className={`flex items-center space-x-4 ${baseTransition} ${isActive ? activeClass : inactiveClass}`} style={{ transitionDelay: '300ms' }}>
                    <div className="h-1 w-12 md:w-16 bg-gold"></div>
                    <span className="font-serif italic text-gold-dark text-lg md:text-xl">An Opportunity to enrich yourself.</span>
                </div>

                {/* CTA to switch to other division */}
                <div className={`mt-6 md:mt-8 mb-2 flex justify-center ${baseTransition} ${isActive ? activeClass : inactiveClass}`} style={{ transitionDelay: '400ms' }}>
                    <button
                        onClick={() => handleTabChange(type === 'company' ? 'founder' : 'company', true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold to-gold-light text-white font-semibold text-sm md:text-base shadow-lg hover:shadow-gold/40 hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                        {type === 'company' ? (
                            <><User className="w-4 h-4" /> Meet Our Founder <ArrowRight className="w-4 h-4" /></>
                        ) : (
                            <><Building2 className="w-4 h-4" /> About the Company <ArrowRight className="w-4 h-4" /></>
                        )}
                    </button>
                </div>
            </div>
        );
    };

    return (
        // Reduced vertical padding as requested (py-6 md:py-10 instead of py-10 md:py-14)
        <section id="about-section" className="pt-10 pb-14 md:pt-16 md:pb-20 bg-white relative overflow-hidden">
            {/* Background decorative blob */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-peach/10 -skew-x-12 transform translate-x-20 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

                {/* Toggle Badge Container */}
                <div className="flex flex-col items-center mb-6 md:mb-8 relative z-20 w-full">

                    {/* MAIN BADGE */}
                    <div className="inline-flex bg-white/80 backdrop-blur-md rounded-full p-1 md:p-1.5 shadow-[0_4px_20px_rgba(217,177,4,0.15),0_2px_8px_rgba(0,0,0,0.06)] border border-gold/20 relative">
                        <div
                            className="absolute top-1 bottom-1 md:top-1.5 md:bottom-1.5 rounded-full bg-gradient-to-r from-gold to-gold-light shadow-md transition-all duration-500 ease-in-out z-0"
                            style={{
                                left: activeTab === 'company' ? '4px' : '50%',
                                width: 'calc(50% - 4px)',
                            }}
                        />

                        <button
                            onClick={() => handleTabChange('company', true)}
                            className={`relative z-10 flex items-center justify-center gap-1.5 md:gap-2 px-4 py-1.5 md:px-6 md:py-2 rounded-full text-xs md:text-base font-semibold transition-colors duration-300 whitespace-nowrap ${activeTab === 'company' ? 'text-white' : 'text-gold-deep/70 hover:text-gold-deep'
                                }`}
                        >
                            <Building2 className="w-4 h-4 md:w-[18px] md:h-[18px] flex-shrink-0" />
                            Company
                        </button>
                        <button
                            onClick={() => handleTabChange('founder', true)}
                            className={`relative z-10 flex items-center justify-center gap-1.5 md:gap-2 px-4 py-1.5 md:px-6 md:py-2 rounded-full text-xs md:text-base font-semibold transition-colors duration-300 whitespace-nowrap ${activeTab === 'founder' ? 'text-white' : 'text-gold-deep/70 hover:text-gold-deep'
                                }`}
                        >
                            <User className="w-4 h-4 md:w-[18px] md:h-[18px] flex-shrink-0" />
                            Founder
                        </button>
                    </div>

                    {/* Tip Text */}
                    <div className="mt-3 text-[10px] md:text-sm text-gold-dark/70 font-medium text-center px-4">
                        {activeTab === 'company'
                            ? 'Tap "Founder" to learn about the visionary behind Bright Reality'
                            : 'Tap "Company" to explore what Bright Reality offers'
                        }
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-20">
                    {/* Image Column - Static */}
                    {renderImage()}

                    {/* Text Column - Adaptive Height via JS Animation */}
                    <div
                        ref={containerRef}
                        className="w-full md:w-7/12 relative transition-[height] duration-700 ease-in-out overflow-hidden"
                        style={{ height: containerHeight ? `${containerHeight}px` : 'auto' }}
                    >
                        {/* Render BOTH blocks. Controlled via Absolute Positioning & Opacity */}
                        <ContentBlock type="company" isActive={activeTab === 'company'} domRef={companyRef} />
                        <ContentBlock type="founder" isActive={activeTab === 'founder'} domRef={founderRef} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;
