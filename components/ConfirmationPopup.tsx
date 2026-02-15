
import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X, Loader2 } from 'lucide-react';

interface ConfirmationPopupProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    type?: 'success' | 'error' | 'loading';
    // Title prop is kept for compatibility but not used in the toast design
    title?: string;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
    isOpen,
    onClose,
    message,
    type = 'success'
}) => {
    const isSuccess = type === 'success';
    const isError = type === 'error';
    const isLoading = type === 'loading';

    useEffect(() => {
        if (isOpen && !isLoading) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose, isLoading]);

    if (!isOpen) return null;

    return (
        <>
            {/* Full screen backdrop with blur */}
            <div
                className="fixed inset-0 z-[999] bg-black/10 backdrop-blur-sm transition-opacity duration-300"
                onClick={!isLoading ? onClose : undefined}
            ></div>

            <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[1000] w-[90%] md:w-full md:max-w-fit px-4 animation-slide-down">
                <div
                    className={`
            flex items-center justify-between p-4 rounded-xl shadow-2xl backdrop-blur-md border border-opacity-40
            ${isSuccess
                            ? 'bg-white/95 border-gold/30 shadow-gold/10'
                            : isError
                                ? 'bg-white/95 border-red-500/30 shadow-red-500/10'
                                : 'bg-white/95 border-gold/30 shadow-gold/10' // Loading style
                        }
          `}
                >
                    <div className="flex items-center gap-3 whitespace-normal md:whitespace-nowrap">
                        <div
                            className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                ${isSuccess ? 'bg-gold/20' : isError ? 'bg-red-500/10' : 'bg-gold/10'}
              `}
                        >
                            {isSuccess && <CheckCircle className="text-gold w-5 h-5" strokeWidth={2.5} />}
                            {isError && <AlertCircle className="text-red-500 w-5 h-5" strokeWidth={2.5} />}
                            {isLoading && <Loader2 className="text-gold w-5 h-5 animate-spin" strokeWidth={2.5} />}
                        </div>

                        <p className={`font-medium text-sm md:text-base ${isSuccess || isLoading ? 'text-gold-deep' : 'text-red-600'}`}>
                            {message}
                        </p>
                    </div>

                    {!isLoading && (
                        <button
                            onClick={onClose}
                            className={`ml-6 p-1 rounded-full hover:bg-black/5 transition-colors ${isSuccess ? 'text-gold-deep/60' : 'text-red-500/60'}`}
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>

                <style>{`
          @keyframes slide-down {
            0% { opacity: 0; transform: translate(-50%, -20px); }
            100% { opacity: 1; transform: translate(-50%, 0); }
          }
          .animation-slide-down {
            animation: slide-down 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>
            </div>
        </>
    );
};

export default ConfirmationPopup;
