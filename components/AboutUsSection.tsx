import React, { useState, useRef, useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, Building2, ArrowRight } from 'lucide-react';
import { ABOUT_US_IMAGE, ABOUT_US_FOUNDER_IMAGE } from '../constants';

interface AboutUsSectionProps {
    isHomePage?: boolean;
    defaultTab?: 'company' | 'founder';
}

const AboutUsSection: React.FC<AboutUsSectionProps> = ({ isHomePage = false, defaultTab = 'company' }) => {
    const [activeTab, setActiveTab] = useState<'company' | 'founder'>(defaultTab);
    const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
    const navigate = useNavigate();

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
        const inactiveClass = "opacity-0 translate-y-8 pointer-events-none blur-sm z-0 absolute top-0 left-0 w-full";

        const wrapperClass = `w-full transition-all duration-700 ease-in-out absolute top-0 left-0 pb-4 ${isActive ? activeClass : inactiveClass}`;

        return (
            <div
                ref={domRef}
                className={wrapperClass}
            >
                {/* Sub-heading */}
                <h4 className={`text-gold font-bold tracking-widest uppercase mb-2 text-xs md:text-sm ${baseTransition} ${isActive ? activeClass : inactiveClass}`} style={{ transitionDelay: '0ms' }}>
                    {type === 'company' ? "Hello, dear friends" : "Vanakkam Anbu Makkaleyy!"}
                </h4>

                {/* Main Heading */}
                <h2 className={`text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gold-deep mb-4 md:mb-5 leading-tight ${baseTransition} ${isActive ? activeClass : inactiveClass}`} style={{ transitionDelay: '100ms' }}>
                    {type === 'company' ? (
                        <>Bright Realty is located in Vadapalani <span className="text-gold-dark">  An Exceptional Real Estate Company</span></>
                    ) : (
                        <>Mr. Nazeer Ahamed S., <span className="text-gold-dark"> Founder of Bright Reality</span></>
                    )}
                </h2>

                {/* Body Text — clipped on homepage with fade */}
                <div className={`relative ${baseTransition} ${isActive ? activeClass : inactiveClass}`} style={{ transitionDelay: '200ms' }}>
                    <div
                        className={`text-base md:text-lg text-gold-deep/80 leading-relaxed font-sans`}
                        style={isHomePage ? {
                            maxHeight: '22rem',
                            overflow: 'hidden',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
                            maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)'
                        } : {}}
                    >
                        {type === 'company' ? (
                            <>
                                <p className="mb-4 md:mb-5">
                                    Welcome to Bright Reality, Chennai's trusted real estate partner. As top real estate agents, we provide services anywhere across Chennai's urban and suburban areas. Whether you want to buy an independent house, are looking for apartments and flats, or searching for plots and villas in prime locations like Avadi, Poonamallee, Tambaram, and beyond—whatever you need, you can get in touch with us. Check out the latest property tours on the Kushi Busy YouTube Channel!
                                </p>
                                <p className="mb-5 md:mb-6">
                                    So, if you have any doubts regarding buying a house or a plot, or specific doubts regarding the Patta (land deed) or EC (Encumbrance Certificate), if you contact Us, We will resolve your doubts.
                                </p>
                                {!isHomePage && (
                                    <>
                                        <p className="mb-5 md:mb-6">
                                            Bright Reality, is a company with good experience. It is being run by experienced professionals. We have successfully completed over one lakh (100,000) registrations. So, Our company has earned a reputation for being an auspicious ('Kairasi') company.
                                        </p>
                                        <p className="mb-5 md:mb-6">
                                            We strictly market only 100% legally cleared properties. Every plot in our portfolio is meticulously vetted and approved by the CMDA (Chennai Metropolitan Development Authority) or DTCP (Directorate of Town and Country Planning), making us the top destination for CMDA and DTCP approved plots in Chennai, fully registered under RERA.
                                        </p>
                                        <p className="mb-5 md:mb-6">
                                            By ensuring every project has a valid RERA ID and approved layout, we guarantee that your investment is safe from legal hurdles, protected by government regulations, and ready for immediate bank loan processing. We don't just sell land; we sell a secure future.
                                        </p>
                                        <p className="mb-5 md:mb-6">
                                            We don't just pick any location; we pick the future hubs of Chennai. Our experts focus exclusively on emerging corridors Which has rapidly developing infrastructure, high demand for residential and commercial properties, and a strong potential for future growth. By choosing Bright Realty, you are investing in "A-Grade" locations that are designed for maximum capital appreciation, ensuring that your property value grows while providing the auspicious comfort and connectivity your family deserves.
                                        </p>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <p className="mb-4 md:mb-5">
                                    Mr. Nazeer Ahamed S., is dedicated to the service of helping individuals acquire land, particularly those who do not yet own property. He provides essential guidance on small-scale investments tailored to the needs of the common people. He is known for his ability to clearly explain the complexities of property transactions and documentation, ensuring that every client fully understands the process.
                                </p>
                                <p className="mb-5 md:mb-6">
                                    Beyond his real estate services, he has created employment opportunities for countless individuals, empowering many to rise as entrepreneurs and achieve financial independence.
                                </p>
                                {!isHomePage && (
                                    <>
                                        <p className="mb-5 md:mb-6">
                                            You may approach him for a wide range of properties, including villas, apartments, independent houses, and land ranging from small investment plots to luxury housing sites. With extensive experience and unwavering dedication, he is a prominent figure in the real estate sector, having facilitated approximately one lakh plots registrations and earned the trust of thousands of satisfied customers.
                                        </p>
                                        <p className="mb-5 md:mb-6">
                                            The Kushi Busy YouTube channel, operating in strategic partnership with Bright Reality, serves as a premier real estate platform specializing in the diverse property landscape of Chennai and its surrounding Northern and Southern suburbs. We offer an extensive portfolio that caters to every demographic, ranging from affordable entry-level plots to high-end luxury villas, apartments, and independent houses.
                                        </p>
                                        <p className="mb-5 md:mb-6">
                                            By prioritizing high-definition production and crystal-clear visual storytelling, we provide our rapidly growing audience with a transparent view of the market. Our content is specifically curated to highlight high-growth locations, ensuring that our viewers can easily identify and invest in properties with the strongest future appreciation potential.
                                        </p>
                                        <p className="mb-5 md:mb-6">
                                            Under the expert leadership of Mr. Nazeer Ahamed. S, Director of Bright Reality, our mission is to simplify the complex process of buying and selling real estate. We act as a professional bridge between sellers and seekers, providing a powerful advertising platform for property owners while offering a seamless, guided experience for aspiring homeowners.
                                        </p>
                                        <p className="mb-5 md:mb-6">
                                            By focusing on quality, clarity, and future development trends, Kushi Busy empowers individuals to make informed investment decisions. We invite you to join the Kushi Busy community and leverage our expertise to secure your ideal property and ensure long-term growth.
                                        </p>
                                    </>
                                )}
                            </>
                        )}
                    </div>

                    {/* CSS mask handles the fade — no overlay div needed */}
                </div>

                {/* Footer tagline — only on dedicated page */}
                {!isHomePage && (
                    <div className={`flex items-center space-x-4 mt-6 ${baseTransition} ${isActive ? activeClass : inactiveClass}`} style={{ transitionDelay: '300ms' }}>
                        <div className="h-1 w-12 md:w-16 bg-gold"></div>
                        <span className="font-serif italic text-gold-dark text-lg md:text-xl">An Opportunity to enrich yourself.</span>
                    </div>
                )}

                {/* CTA Button */}
                <div className={`mt-6 md:mt-8 mb-2 flex justify-center ${baseTransition} ${isActive ? activeClass : inactiveClass}`} style={{ transitionDelay: isHomePage ? '250ms' : '400ms' }}>
                    <button
                        onClick={() => {
                            if (isHomePage) {
                                navigate(`/aboutus?tab=${type}`);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            } else {
                                handleTabChange(type === 'company' ? 'founder' : 'company', true);
                            }
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold to-gold-light text-white font-semibold text-sm md:text-base shadow-lg hover:shadow-gold/40 hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                        {isHomePage ? (
                            // On homepage: CTA is always "Learn More About [current tab]"
                            type === 'company' ? (
                                <><Building2 className="w-4 h-4" /> Learn More About Company <ArrowRight className="w-4 h-4" /></>
                            ) : (
                                <><User className="w-4 h-4" /> Learn More About Founder <ArrowRight className="w-4 h-4" /></>
                            )
                        ) : (
                            // On dedicated page: CTA switches to the other tab
                            type === 'company' ? (
                                <><User className="w-4 h-4" /> Meet Our Founder <ArrowRight className="w-4 h-4" /></>
                            ) : (
                                <><Building2 className="w-4 h-4" /> About the Company <ArrowRight className="w-4 h-4" /></>
                            )
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
                
                {!isHomePage && (
                    <div className="text-center mb-10 md:mb-16 mt-4">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gold-deep mb-6">
                            The Story of <span className="text-gold">Bright Reality</span>
                        </h1>
                        <p className="text-base md:text-lg text-gold-dark max-w-3xl mx-auto font-medium leading-relaxed px-4">
                            From a visionary startup to Chennai's premier property consultancy, we have fundamentally dedicated our existence to ensuring you acquire authentic, 100% legal, and appreciating real estate.
                        </p>
                    </div>
                )}

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
