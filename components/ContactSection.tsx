import React, { useState, useRef } from 'react';
import { Send, Map as MapIcon } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import ConfirmationPopup from './ConfirmationPopup';
import PhoneInput, { isValidPhoneNumber, getCountryCallingCode, getCountries, Country } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en.json';
import 'react-phone-number-input/style.css';
import CustomCountrySelect from './CustomCountrySelect';

// Generate country options for CustomCountrySelect
const countryOptions = getCountries().map((country) => ({
    value: country,
    label: en[country] || country,
}));

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

    const [mobileCountry, setMobileCountry] = useState<Country>('IN');
    const [whatsappCountry, setWhatsappCountry] = useState<Country>('IN');

    const maxLengths: { [key: string]: number } = {
        IN: 10, US: 10, CA: 10, GB: 10, AU: 9,
        DE: 11, FR: 9, IT: 10, ES: 9, SG: 8,
        MY: 10, AE: 9, SA: 9, ZA: 9, NG: 10,
        BR: 11, MX: 10, JP: 10, KR: 10, CN: 11,
    };

    const mobileInputRef = useRef<any>(null);
    const whatsappInputRef = useRef<any>(null);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'mobile' | 'whatsapp') => {
        const rawValue = e.target.value;
        const currentCountry = field === 'mobile' ? mobileCountry : whatsappCountry;

        // Strip everything except digits to maintain control
        const digits = rawValue.replace(/\D/g, '');

        // ✅ STRICT INDIA LOGIC (XXXXX XXXXX)
        if (currentCountry === 'IN') {
            // Block > 10 digits
            if (digits.length > 10) return;

            // Format as XXXXX XXXXX
            let formatted = digits;
            if (digits.length > 5) {
                formatted = digits.slice(0, 5) + ' ' + digits.slice(5);
            }
            setFormState(prev => ({ ...prev, [field]: formatted }));
            return;
        }

        // Other countries: Allow max 15 digits (E.164 standard), no forced spacing
        if (digits.length > 15) return;
        setFormState(prev => ({ ...prev, [field]: digits }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setToastMessage("Sending...");
        setToastType('loading');
        setShowConfirmation(true);

        const SCRIPT_URL =
            import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL ||
            "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";

        try {
            if (!formState.email || !formState.email.includes('@')) {
                setEmailError("Please enter a valid email address.");
                throw new Error("Please enter a valid email address.");
            } else {
                setEmailError("");
            }

            if (!formState.name || !formState.mobile || !formState.message) {
                throw new Error("Please fill in Valid Details.");
            }

            // Combine country code and number for API
            const finalMobile = formState.mobile ? `+${getCountryCallingCode(mobileCountry)} ${formState.mobile}` : '';
            const finalWhatsapp = formState.whatsapp ? `+${getCountryCallingCode(whatsappCountry)} ${formState.whatsapp}` : '';

            // Verify Mobile Number strictly before sending
            // We reconstruct the full E.164 string to check validity
            const fullMobileE164 = `+${getCountryCallingCode(mobileCountry)}${formState.mobile.replace(/\s/g, '')}`;
            if (formState.mobile && !isValidPhoneNumber(fullMobileE164)) {
                // Allow if it's strictly 10 digits for India even if library complains (though it shouldn't)
                if (mobileCountry === 'IN' && formState.mobile.replace(/\s/g, '').length === 10) {
                    // Valid length for India, let it pass if library is finicky
                } else {
                    throw new Error("Please enter a valid mobile number.");
                }
            }

            if (formState.whatsapp) {
                const fullWhatsappE164 = `+${getCountryCallingCode(whatsappCountry)}${formState.whatsapp.replace(/\s/g, '')}`;
                if (!isValidPhoneNumber(fullWhatsappE164)) {
                    if (whatsappCountry === 'IN' && formState.whatsapp.replace(/\s/g, '').length === 10) {
                        // Valid length for India
                    } else {
                        throw new Error("Please enter a valid WhatsApp number.");
                    }
                }
            }

            if (SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL") {
                await new Promise(resolve => setTimeout(resolve, 2000));
                setToastMessage("Thanks For Showing Interest, Will Call You Shortly");
                setToastType('success');
                setFormState({ name: '', whatsapp: '', mobile: '', email: '', message: '' });
                setIsSubmitting(false);
                return;
            }

            const response = await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify({
                    ...formState,
                    mobile: finalMobile,
                    whatsapp: finalWhatsapp,
                    fullMobile: finalMobile, // Send distinct fields if backend needs them
                    fullWhatsapp: finalWhatsapp
                }),
            });

            if (!response.ok) throw new Error(`Server responded with ${response.status}`);

            const result = await response.json();

            if (result.status === 'success') {
                setToastMessage("Thanks For Showing Interest, Will Call You Shortly");
                setToastType('success');
                setFormState({ name: '', whatsapp: '', mobile: '', email: '', message: '' });
            } else {
                throw new Error(result.message || "Something went wrong on the server.");
            }

        } catch (error: any) {
            setToastMessage(error.message || "Something Went Wrong. Please try again later.");
            setToastType('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact-section" className="pt-10 pb-14 md:pt-16 md:pb-20 bg-peach/20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 md:mb-10">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gold-deep mb-2 md:mb-3">Get In Touch</h2>
                    <p className="section-subtitle text-gold-dark max-w-2xl mx-auto font-medium">
                        Begin your journey to enrichment today. Visit our office or drop us a message.
                    </p>
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
                                    className="block w-full px-4 py-3 text-gold-deep bg-peach/10 border border-gold-light/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            {/* WhatsApp */}
                            <div className="group phone-input-container">
                                <label className="block text-sm font-bold text-gold-dark mb-2 uppercase tracking-normal">
                                    WhatsApp <span className="text-xs text-gold-dust lowercase font-normal">(Optional)</span>
                                </label>
                                <div className="relative flex items-center w-full bg-peach/10 border border-gold-light/50 rounded-lg focus-within:ring-2 focus-within:ring-gold focus-within:border-transparent transition-all">
                                    <div className="h-full border-r border-gold/20">
                                        <CustomCountrySelect
                                            value={whatsappCountry}
                                            onChange={(c) => setWhatsappCountry(c as Country)}
                                            options={countryOptions}
                                        />
                                    </div>
                                    <input
                                        type="tel"
                                        value={formState.whatsapp}
                                        onChange={(e) => handlePhoneChange(e, 'whatsapp')}
                                        className="w-full py-3 px-4 bg-transparent focus:outline-none text-gold-deep placeholder-gold-deep/50 font-medium"
                                        placeholder="Enter WhatsApp number"
                                    />
                                </div>
                            </div>

                            {/* Mobile */}
                            <div className="group phone-input-container">
                                <label className="block text-sm font-bold text-gold-dark mb-2 uppercase tracking-normal">
                                    Mobile Number
                                </label>
                                <div className="relative flex items-center w-full bg-peach/10 border border-gold-light/50 rounded-lg focus-within:ring-2 focus-within:ring-gold focus-within:border-transparent transition-all">
                                    <div className="h-full border-r border-gold/20">
                                        <CustomCountrySelect
                                            value={mobileCountry}
                                            onChange={(c) => setMobileCountry(c as Country)}
                                            options={countryOptions}
                                        />
                                    </div>
                                    <input
                                        type="tel"
                                        value={formState.mobile}
                                        onChange={(e) => handlePhoneChange(e, 'mobile')}
                                        className="w-full py-3 px-4 bg-transparent focus:outline-none text-gold-deep placeholder-gold-deep/50 font-medium"
                                        placeholder="Enter mobile number"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="group">
                                <label className="block text-sm font-bold text-gold-dark mb-2 uppercase tracking-normal">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formState.email}
                                    onChange={handleInputChange}
                                    className="block w-full px-4 py-3 text-gold-deep bg-peach/10 border border-gold-light/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                                    placeholder="Enter your valid email address"
                                    required
                                />
                                {emailError && <p className="text-red-500 text-xs mt-1 ml-1">{emailError}</p>}
                            </div>

                            {/* Message */}
                            <div className="group">
                                <label className="block text-sm font-bold text-gold-dark mb-2 uppercase tracking-normal">
                                    Message <span className="text-xs text-gold-dust lowercase font-normal">(Max 500 words)</span>
                                </label>
                                <textarea
                                    name="message"
                                    value={formState.message}
                                    onChange={handleInputChange}
                                    placeholder="How can we enrich you?"
                                    required
                                    rows={4}
                                    className="block w-full px-4 py-3 text-gold-deep bg-peach/10 border border-gold-light/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-gradient-to-r from-gold to-gold-light text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-gold/50 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="mr-2" size={20} />
                                {isSubmitting ? 'Sending...' : 'Send Message'}
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
