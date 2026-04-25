import React, { useState, useEffect } from 'react';
import { Play, Youtube } from 'lucide-react';

// ─── Config ──────────────────────────────────────────────────────────────────
const CHANNEL_ID  = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || 'UChKUUUekhtqUQqfX2Mkj7Mg';
const CACHE_KEY   = 'yt_feed_v2';
const CACHE_TTL   = 20 * 60 * 1000; // 20 minutes
const MAX_VIDEOS  = 10;

// rss2json is a dedicated RSS→JSON service – much faster than allorigins, no quota
const RSS_URL     = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const API_URL     = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}&count=${MAX_VIDEOS}`;

interface Video { id: string; title: string; }

// ─── Single Video Card ────────────────────────────────────────────────────────
const VideoCard: React.FC<Video> = ({ id, title }) => {
    const [playing, setPlaying] = useState(false);
    const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

    return (
        <div className="min-w-[260px] w-[75vw] md:w-auto md:min-w-0 snap-center flex-shrink-0 md:flex-shrink group">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300 border border-gold/10 bg-black">
                {playing ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                    />
                ) : (
                    <>
                        <img
                            src={thumb}
                            alt={title}
                            loading="lazy"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Dark overlay on hover */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {/* Play button */}
                        <button
                            onClick={() => setPlaying(true)}
                            aria-label={`Play ${title}`}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <span className="w-14 h-14 bg-[#FF0000] rounded-full flex items-center justify-center pl-1 shadow-xl transform scale-90 group-hover:scale-105 transition-transform duration-200">
                                <Play className="w-6 h-6 text-white" />
                            </span>
                        </button>
                    </>
                )}
            </div>
            <p className="mt-2 text-sm font-semibold text-gold-deep line-clamp-2 leading-snug group-hover:text-gold transition-colors">
                {title}
            </p>
        </div>
    );
};

// ─── Skeleton Loader ──────────────────────────────────────────────────────────
const Skeleton = () => (
    <div className="min-w-[260px] w-[75vw] md:w-auto flex-shrink-0 md:flex-shrink animate-pulse">
        <div className="aspect-video rounded-xl bg-gold/10" />
        <div className="mt-2 h-4 bg-gold/10 rounded w-3/4" />
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const LatestPropertyVideos: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            // 1. Try cache first (instant render)
            try {
                const raw = sessionStorage.getItem(CACHE_KEY);
                if (raw) {
                    const { ts, data } = JSON.parse(raw);
                    if (Date.now() - ts < CACHE_TTL) {
                        setVideos(data);
                        setLoading(false);
                        return;
                    }
                }
            } catch { /* ignore */ }

            // 2. Fetch live from rss2json
            try {
                const res  = await fetch(API_URL);
                const json = await res.json();

                if (json.status !== 'ok' || !json.items?.length) throw new Error('bad response');

                const parsed: Video[] = json.items.map((item: any) => ({
                    id:    item.link.split('v=')[1]?.split('&')[0] || '',
                    title: item.title,
                })).filter((v: Video) => v.id);

                setVideos(parsed);
                try {
                    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: parsed }));
                } catch { /* storage full */ }
            } catch {
                setVideos([]);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    if (!loading && videos.length === 0) return null;

    return (
        <section className="py-10 md:py-14 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 text-center md:text-left">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-red-100">
                            <Youtube className="w-4 h-4" /> Latest Uploads
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gold-deep">
                            Kushi Busy YouTube Channel
                        </h2>
                        <p className="text-gold-dark mt-1 font-medium">Newest property tours — auto-updated.</p>
                    </div>
                    <a
                        href="https://www.youtube.com/@KUSHIBUSY"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FF0000] hover:bg-[#CC0000] text-white font-bold rounded-full transition-colors shadow-lg shadow-red-500/20 active:scale-95 flex-shrink-0"
                    >
                        <Youtube className="w-4 h-4" /> Subscribe Now
                    </a>
                </div>

                {/* Grid / scroll */}
                <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-visible md:pb-0 snap-x snap-mandatory hide-scrollbars">
                    {loading
                        ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} />)
                        : videos.map(v => <VideoCard key={v.id} id={v.id} title={v.title} />)
                    }
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
};

export default LatestPropertyVideos;
