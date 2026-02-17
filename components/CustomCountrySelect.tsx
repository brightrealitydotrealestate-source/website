import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search } from 'lucide-react';
import { getCountryCallingCode } from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

interface CountrySelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    labels?: { [key: string]: string };
}

const CustomCountrySelect = ({ value, onChange, options, align = 'left', ...rest }: CountrySelectProps & { align?: 'left' | 'right' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Focus search input when opening
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
        if (!isOpen) {
            setSearchQuery('');
        }
    }, [isOpen]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (country: string) => {
        onChange(country);
        setIsOpen(false);
    };

    const filteredOptions = options.filter(option =>
        (option.label && option.label.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (option.value && option.value.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const FlagComponent = value ? flags[value as keyof typeof flags] : null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={toggleDropdown}
                className={`
          flex items-center justify-center gap-2 px-2 py-3 bg-transparent transition-all duration-300 h-full
          focus:outline-none hover:bg-gold/5 rounded-lg mr-2
        `}
                style={{ height: '100%', minHeight: '50px', borderRight: '0px solid rgba(217, 177, 4, 0.3)' }}
            >
                <div className="flex items-center justify-center">
                    {value ? (
                        <span className="text-gold-deep font-semibold text-sm">
                            +{getCountryCallingCode(value as any)}
                        </span>
                    ) : (
                        <span className="text-gold-deep text-xs">🌐</span>
                    )}
                </div>
                <ChevronDown size={14} className={`text-gold/70 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className={`
                    absolute top-[calc(100%+2px)] z-50 w-[280px] max-h-[300px] bg-white rounded-xl shadow-xl border border-gold/20 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 origin-top
                    ${align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'}
                `}>

                    <div className="p-3 border-b border-gold/10 bg-cream/30 sticky top-0 z-10 backdrop-blur-sm">
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-dark/50" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search country..."
                                className="w-full pl-9 pr-3 py-2 bg-white border border-gold/20 rounded-lg text-sm text-gold-deep focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50 placeholder:text-gold-dark/30"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </div>

                    <div className="overflow-y-auto flex-1 p-1 custom-scrollbar">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => {
                                if (!option.value) return null; // Skip dividers or invalid options
                                const isSelected = option.value === value;
                                const OptionFlag = flags[option.value as keyof typeof flags];
                                const callingCode = getCountryCallingCode(option.value as any);

                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => handleSelect(option.value)}
                                        className={`
                      w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm transition-all duration-200 group
                      ${isSelected
                                                ? 'bg-gold/10 text-gold-deep font-semibold'
                                                : 'text-gold-dark hover:bg-peach/20 hover:text-gold-deep'
                                            }
                    `}
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            {OptionFlag ? (
                                                <span className="w-6 h-4 shadow-sm rounded-[2px] flex-shrink-0 flex items-center justify-center overflow-hidden">
                                                    <OptionFlag title={option.label} />
                                                </span>
                                            ) : (
                                                <span className="w-6 text-center flex-shrink-0">🏳️</span>
                                            )}
                                            <span className="truncate">{option.label}</span>
                                        </div>

                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <span className={`text-xs font-mono ${isSelected ? 'text-gold-dark' : 'text-gold-dark/40 group-hover:text-gold-dark/70'}`}>
                                                +{callingCode}
                                            </span>
                                            {isSelected && <Check size={14} className="text-gold" />}
                                        </div>
                                    </button>
                                );
                            })
                        ) : (
                            <div className="p-4 text-center text-sm text-gold-dark/50 italic">
                                No countries found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomCountrySelect;
