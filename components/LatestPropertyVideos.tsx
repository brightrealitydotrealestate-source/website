import React, { useState, useEffect } from 'react';
import { Play, Youtube } from 'lucide-react';

// ─── Hardcoded latest uploads from @KUSHIBUSY ───────────────────────────────
// Update these IDs whenever you want to refresh the feed.
// Get video IDs from YouTube Studio or the channel page URL: ?v=VIDEO_ID
const HARDCODED_VIDEO_IDS = [
    'o2v_gGXFoEg',
    'Pjy3IsCKNMg',
    'oqsWOiJp6iA',
    '9VNLmjHcMqo',
    'mJQz8ZXBMFA',
    'C0NZ0t7FLJY',
    'VXAuJMsXW2E',
    'zfMbGMxGXKM',
    'FxHJJi92IQw',
    'r_jwX1JDPBM',
];

interface Video { id: string; }

const VideoCard: React.FC<Video> = ({ id }) => {
    const [clicked, setClicked] = useState(false);
    const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    const url   = `https://www.youtube.com/watch?v=${id}`;

    return (
        <div className="min-w-[260px] w-[75vw] md:w-auto md:min-w-0 snap-center group flex-shrink-0 md:flex-shrink">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 border border-gold/10">
                {clicked ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                        title="YouTube video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                    />
                ) : (
                    <>
                        <img
                            src={thumb}
                            alt="Property video"
                            loading="lazy"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Play button */}
                        <div
                            onClick={() => setClicked(true)}
                            className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                        >
                            <div className="w-14 h-14 bg-[#FF0000] rounded-full flex items-center justify-center pl-1 shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-200">
                                <Play className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        {/* Open in YouTube link */}
                        <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="absolute inset-0 z-10"
                            aria-label="Watch on YouTube"
                            onClick={(e) => { e.preventDefault(); setClicked(true); }}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

const LatestPropertyVideos: React.FC = () => (
    <section className="py-10 md:py-14 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 gap-4 text-center md:text-left">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-red-100">
                        <Youtube className="w-4 h-4" /> Latest Uploads
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gold-deep">
                        Kushi Busy YouTube Channel
                    </h2>
                    <p className="text-gold-dark mt-2 font-medium">Watch our newest comprehensive property tours and updates.</p>
                </div>
                <a
                    href="https://www.youtube.com/@KUSHIBUSY"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FF0000] hover:bg-[#CC0000] text-white font-bold rounded-full transition-colors shadow-lg shadow-red-500/20 active:scale-95"
                >
                    Subscribe Now
                </a>
            </div>

            {/* Videos — horizontal scroll on mobile, grid on desktop */}
            <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-visible md:pb-0 snap-x snap-mandatory hide-scrollbars">
                {HARDCODED_VIDEO_IDS.map((id) => (
                    <VideoCard key={id} id={id} />
                ))}
            </div>

            {/* View More */}
            <div className="mt-10 flex justify-center">
                <a
                    href="https://www.youtube.com/@KUSHIBUSY"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#FF0000] border-2 border-[#FF0000] hover:bg-[#FF0000] hover:text-white font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 active:scale-95 group"
                >
                    <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    View More Uploads
                </a>
            </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
            .hide-scrollbars::-webkit-scrollbar { display: none; }
            .hide-scrollbars { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
    </section>
);

export default LatestPropertyVideos;
