import React, { useState } from 'react';
import { Send, Map as MapIcon } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import ConfirmationPopup from './ConfirmationPopup';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import CustomCountrySelect from './CustomCountrySelect';

// Wrapper components to pass props to CustomCountrySelect
const CountrySelectLeft = (props: any) => <CustomCountrySelect {...props} align="left" />;
const CountrySelectRight = (props: any) => <CustomCountrySelect {...props} align="left" />;

const ContactSection: React.FC = () => {
    const [formState, setFormState] = useState({
        name: '',
        whatsapp: '',
        mobile: '',
        email: '',
        message: ''
    });
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error' | 'loading'>('success');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailError, setEmailError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleMobileChange = (value: string | undefined) => {
        setFormState(prev => ({ ...prev, mobile: value || '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Show loading state immediately
        setToastMessage("Sending...");
        setToastType('loading');
        setShowConfirmation(true);

        const SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";

        try {
            // Relaxed Email Validation
            if (!formState.email || !formState.email.includes('@')) {
                setEmailError("Please enter a valid email address.");
                throw new Error("Please enter a valid email address.");
            } else {
                setEmailError("");
            }

            // Basic validation
            if (!formState.name || !formState.mobile || !formState.message) {
                throw new Error("Please fill in all required fields.");
            }

            // Verify Mobile Number strictly before sending
            if (formState.mobile && !isValidPhoneNumber(formState.mobile)) {
                throw new Error("Please enter a valid mobile number for the selected country.");
            }
            // If the URL is still the placeholder, we'll simulate a success for testing UI
            if (SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL") {
                console.warn("Google Apps Script URL not set. Simulating success.");
                await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay

                setToastMessage("Thanks For Showing Interest, Will Call You Shortly");
                setToastType('success');
                setFormState({ name: '', whatsapp: '', mobile: '', email: '', message: '' });
                setIsSubmitting(false);
                return;
            }

            // 1. Send request with 'cors' mode to properly handle response
            const response = await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
                body: JSON.stringify({
                    ...formState,
                }),
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            const result = await response.json();

            if (result.status === 'success') {
                setToastMessage("Thanks For Showing Interest, Will Call You Shortly");
                setToastType('success');
                setFormState({ name: '', whatsapp: '', mobile: '', email: '', message: '' });
            } else {
                throw new Error(result.message || "Something went wrong on the server.");
            }

        } catch (error: any) {
            console.error("Error submitting form:", error);
            setToastMessage(error.message || "Something Went Wrong. Please try again later.");
            setToastType('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact-section" className="py-10 md:py-14 bg-peach/20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 md:mb-10">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gold-deep mb-2 md:mb-3">Get In Touch</h2>
                    <p className="text-sm md:text-base text-gold-dark max-w-2xl mx-auto font-medium">Begin your journey to enrichment today. Visit our office or drop us a message.</p>
                </div>

                <div className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-2xl border border-gold/10">

                    {/* Map Side (Left) */}
                    <div className="w-full md:w-1/2 h-[500px] md:h-auto relative order-2 md:order-1">
                        <a
                            href={COMPANY_INFO.googleMapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full h-full relative group"
                        >
                            <iframe
                                src={COMPANY_INFO.mapEmbedSrc}
                                width="100%"
                                height="100%"
                                allowFullScreen={true}
                                loading="eager"
                                className="w-full h-full"
                            ></iframe>

                            {/* Map Overlay Text */}
                            <div className="absolute inset-0 bg-gold-deep/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="bg-gold text-white px-6 py-3 rounded-full font-bold flex items-center shadow-xl transform group-hover:scale-110 transition-transform">
                                    <MapIcon className="mr-2" size={20} /> Open Navigation
                                </div>
                            </div>
                        </a>
                    </div>

                    {/* Form Side (Right) */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 bg-white order-1 md:order-2">
                        <div className="mb-8">
                            <h3 className="text-2xl font-serif text-gold mb-4">Send Us a Message</h3>
                            {/* Glossy Gradient Separator */}
                            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold-light to-transparent opacity-60"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Name */}
                            <div className="group">
                                <label className="block text-sm font-bold text-gold-dark mb-2 uppercase tracking-normal">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formState.name}
                                    onChange={handleInputChange}
                                    className="block w-full px-4 py-3 text-gold-deep bg-peach/10 border border-gold-light/50 rounded-lg focus:outline-none focus:border-gold"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            {/* WhatsApp */}
                            <div className="group phone-input-container">
                                <label className="block text-sm font-bold text-gold-dark mb-2 uppercase tracking-normal">
                                    WhatsApp <span className="text-xs text-gold-dust lowercase font-normal">(Optional)</span>
                                </label>
                                <PhoneInput
                                    international={false}
                                    defaultCountry="IN"
                                    value={formState.whatsapp}
                                    onChange={(value) => {
                                        // Strict validation for Indian numbers (+91)
                                        if (value && value.startsWith('+91')) {
                                            const numberPart = value.slice(3);
                                            if (numberPart.length > 10) return;
                                        }
                                        setFormState(prev => ({ ...prev, whatsapp: value || '' }))
                                    }}
                                    className="flex items-center w-full py-3 pr-4 pl-0 text-gold-deep bg-peach/10 border border-gold-light/50 rounded-lg focus-within:border-gold"
                                    placeholder="Enter WhatsApp number"
                                    limitMaxLength={true}
                                    countrySelectComponent={CountrySelectLeft}
                                />
                            </div>

                            {/* Mobile */}
                            <div className="group phone-input-container">
                                <label className="block text-sm font-bold text-gold-dark mb-2 uppercase tracking-normal">
                                    Mobile Number
                                </label>
                                <PhoneInput
                                    international={false}
                                    defaultCountry="IN"
                                    value={formState.mobile}
                                    onChange={handleMobileChange}
                                    className="flex items-center w-full py-3 pr-4 pl-0 text-gold-deep bg-peach/10 border border-gold-light/50 rounded-lg focus-within:border-gold"
                                    placeholder="Enter mobile number"
                                    limitMaxLength={true}
                                    countrySelectComponent={CountrySelectRight}
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="group relative">
                                <label className="block text-sm font-bold text-gold-dark mb-2 uppercase tracking-normal">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formState.email}
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        if (emailError) setEmailError('');
                                    }}
                                    onBlur={() => {
                                        if (formState.email) {
                                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                            if (!emailRegex.test(formState.email)) {
                                                setEmailError("Please enter a valid email address.");
                                            } else {
                                                setEmailError('');
                                            }
                                        }
                                    }}
                                    className={`block w-full px-4 py-3 text-gold-deep bg-peach/10 border ${emailError ? 'border-red-500' : 'border-gold-light/50'
                                        } rounded-lg focus:outline-none ${emailError ? 'focus:border-red-500' : 'focus:border-gold'
                                        }`}
                                    placeholder="Enter your valid email address"
                                    required
                                />
                                {emailError && (
                                    <p className="text-red-500 text-xs absolute -bottom-5 left-1">{emailError}</p>
                                )}
                            </div>

                            {/* Message */}
                            <div className="group relative">
                                <label className="block text-sm font-bold text-gold-dark mb-2 uppercase tracking-normal">
                                    Message <span className="text-xs text-gold-dust lowercase font-normal">(Max 500 words)</span>
                                </label>
                                <textarea
                                    name="message"
                                    value={formState.message}
                                    onChange={handleInputChange}
                                    rows={4}
                                    maxLength={500}
                                    className="block w-full px-4 py-3 text-gold-deep bg-peach/10 border border-gold-light/50 rounded-lg focus:outline-none focus:border-gold resize-none"
                                    placeholder="How can we enrich you?"
                                    required
                                ></textarea>
                                <p className="text-xs text-right text-gold-dark/60 absolute -bottom-5 right-0">{formState.message.length}/500</p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-gradient-to-r from-gold to-gold-light text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-gold/50 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="mr-2" size={20} /> {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>

                        </form>
                    </div>
                </div>
            </div>

            <ConfirmationPopup
                isOpen={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                message={toastMessage}
                type={toastType}
            />
        </section>
    );
};

export default ContactSection;
