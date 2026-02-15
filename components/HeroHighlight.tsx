import React, { useEffect, useState, useRef } from 'react';
import { Award, TrendingUp, Users, Star, MapPin, Building2, UserCheck } from 'lucide-react';

const HeroHighlight: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="w-full relative z-30 px-4 mt-6 mb-8 md:mt-8 md:mb-10">

            {/* Floating Badge Container - Widened to max-w-7xl to match slider */}
            <div className="max-w-7xl mx-auto relative group">

                {/* Main Badge Card */}
                <div
                    className={`
            relative bg-white/95 backdrop-blur-xl
            rounded-[2rem] p-6 md:p-8 shadow-2xl border border-gold/20 
            overflow-hidden transform transition-all duration-1000 ease-out
            hover:shadow-gold/20 hover:-translate-y-1
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
          `}
                >

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-peach/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    {/* Animated Texture */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 relative z-10">

                        {/* Left Content - Branding */}
                        <div className="flex-shrink-0 text-center lg:text-left lg:max-w-md">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-4">
                                <Star className="w-3.5 h-3.5 text-gold-dark animate-spin-slow" />
                                <span className="text-xs font-bold text-gold-dark tracking-[0.2em] uppercase">Premium Real Estate</span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gold-deep mb-3 leading-tight">
                                Tamil Nadu's Leading <br className="hidden lg:block" /> Real Estate Brand
                            </h1>
                            <p className="text-gold-deep/70 text-sm md:text-base font-medium tracking-wide leading-relaxed">
                                Transforming Dreams into Reality with <span className="text-gold-dark font-bold">Bright Beginnings.</span>
                            </p>
                        </div>

                        {/* Right Content - 4 Grid Stats */}
                        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

                            {/* Stat 1: Onroad Plots */}
                            <StatCard
                                icon={MapPin}
                                count={100}
                                suffix="+"
                                label="Onroad Plots"
                                delay={100}
                            />

                            {/* Stat 2: Amenities */}
                            <StatCard
                                icon={Building2}
                                count={50}
                                suffix="+"
                                label="World Class Amenities"
                                delay={200}
                            />

                            {/* Stat 3: Highly Experienced */}
                            <StatCard
                                icon={UserCheck}
                                iconColor="text-gold-dark"
                                customContent={
                                    <div className="flex flex-col items-center text-center">
                                        <span className="text-lg font-bold text-gold-deep leading-tight mb-1">Highly</span>
                                        <span className="text-xs text-gold-deep/60 font-semibold uppercase tracking-wider">Experienced Professionals</span>
                                    </div>
                                }
                                delay={300}
                            />

                            {/* Stat 4: Happy Families */}
                            <StatCard
                                icon={Users}
                                count={100000}
                                suffix="+"
                                label="Happy Families"
                                delay={400}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface StatCardProps {
    icon: React.ElementType;
    count?: number;
    suffix?: string;
    label?: string;
    delay: number;
    iconColor?: string;
    customContent?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, count, suffix, label, delay, iconColor, customContent }) => {
    return (
        <div
            className={`
        flex flex-col items-center justify-center p-4 rounded-xl
        bg-cream/50 border border-gold/10 hover:border-gold/40 hover:bg-white
        transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5
        group h-full min-h-[140px] animate-fade-in-up
      `}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="p-3 bg-white rounded-full shadow-md mb-3 group-hover:scale-110 transition-transform duration-300 ring-1 ring-gold/10">
                <Icon className={`w-6 h-6 ${iconColor || 'text-gold-DEFAULT'}`} />
            </div>

            {customContent ? (
                customContent
            ) : (
                <>
                    <span className="text-2xl md:text-3xl font-bold text-gold-deep leading-none mb-1">
                        <CountUp end={count || 0} suffix={suffix} duration={2000} />
                    </span>
                    <span className="text-xs text-gold-deep/60 font-semibold uppercase tracking-wider text-center">
                        {label}
                    </span>
                </>
            )}
        </div>
    );
};

// Internal CountUp Component
const CountUp: React.FC<{ end: number; suffix?: string; duration?: number }> = ({ end, suffix = '', duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const nodeRef = useRef<HTMLSpanElement>(null);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.1 }
        );

        if (nodeRef.current) {
            observer.observe(nodeRef.current);
        }

        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [hasStarted, end, duration]);

    return (
        <span ref={nodeRef}>
            {count.toLocaleString()}{suffix}
        </span>
    );
};

export default HeroHighlight;
