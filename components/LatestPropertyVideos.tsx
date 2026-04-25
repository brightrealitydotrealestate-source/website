import React, { useState, useEffect } from 'react';
import { Play, Youtube } from 'lucide-react';

// ─── Config ──────────────────────────────────────────────────────────────────
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || 'UChKUUUekhtqUQqfX2Mkj7Mg';
// The "Uploads" playlist ID is identical to the Channel ID but starts with UU instead of UC
const UPLOADS_PLAYLIST_ID = CHANNEL_ID.replace(/^UC/, 'UU');

const CACHE_KEY = 'yt_feed_v5';
const CACHE_TTL = 20 * 60 * 1000; // 20 minutes

// ─── Native YouTube API URL (Cost: 1 Quota Unit vs 100 for search) ───────────
const API_URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=15&playlistId=${UPLOADS_PLAYLIST_ID}&key=${API_KEY}`;

interface Video {
    id: string;
    title: string;
    url: string;
    thumbnail?: string;
}

// ─── Graceful Fallback ────────────────────────────────────────────────────────
// If the API ever fails, times out, or quota is exceeded, the section will gracefully
// fall back to these verified videos instead of completely hiding.
const FALLBACK_VIDEOS: Video[] = [
    { id: 'Cfhga2inTQc', title: 'Propshell\'s Mega "SHA BOO THREE" Offer!', url: 'https://youtube.com/watch?v=Cfhga2inTQc', thumbnail: 'https://i.ytimg.com/vi/Cfhga2inTQc/0.jpg' },
    { id: 'Q5aJ3DTrTcw', title: 'Own a Premium Plot for Just ₹16 Lakhs!', url: 'https://youtube.com/watch?v=Q5aJ3DTrTcw', thumbnail: 'https://i.ytimg.com/vi/Q5aJ3DTrTcw/0.jpg' },
    { id: 'egObyVGH6CY', title: 'பெருங்களத்தூரில் மிகக் குறைந்த விலையில்', url: 'https://youtube.com/shorts/egObyVGH6CY', thumbnail: 'https://i.ytimg.com/vi/egObyVGH6CY/0.jpg' },
    { id: 'YqfD-01T2vY', title: 'DTCP Approved Plots for Sale in Padappai', url: 'https://youtube.com/watch?v=YqfD-01T2vY', thumbnail: 'https://i.ytimg.com/vi/YqfD-01T2vY/0.jpg' },
    { id: 'UoO5BqUfIuk', title: 'தாம்பரம் GST-க்கு மிக அருகில்! Budget friendly', url: 'https://youtube.com/watch?v=UoO5BqUfIuk', thumbnail: 'https://i.ytimg.com/vi/UoO5BqUfIuk/0.jpg' },
    { id: 'yY7cE6lZcM0', title: '🔥 செங்கல்பட்டில் 5 லட்சத்தில் மனை', url: 'https://youtube.com/watch?v=yY7cE6lZcM0', thumbnail: 'https://i.ytimg.com/vi/yY7cE6lZcM0/0.jpg' },
    { id: 'o2v_gGXFoEg', title: 'Premium Plots & Independent Houses in Avadi', url: 'https://youtube.com/watch?v=o2v_gGXFoEg', thumbnail: 'https://i.ytimg.com/vi/o2v_gGXFoEg/0.jpg' }
];

// ─── Single Video Card ────────────────────────────────────────────────────────
const VideoCard: React.FC<Video> = ({ id, title, url, thumbnail }) => {
    const thumbUrl = thumbnail || `https://i.ytimg.com/vi/${id}/0.jpg`;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-[260px] w-[75vw] md:w-auto md:min-w-0 snap-center flex-shrink-0 md:flex-shrink group cursor-pointer block"
            aria-label={`Watch ${title} on YouTube`}
        >
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300 border border-gold/10 bg-black">
                <img
                    src={thumbUrl}
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Play className="w-12 h-12 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] fill-white" strokeWidth={0} />
                </div>
            </div>
            <p className="mt-2 text-sm font-semibold text-gold-deep line-clamp-2 leading-snug group-hover:text-gold transition-colors">
                {title}
            </p>
        </a>
    );
};

// ─── Skeleton Loader ──────────────────────────────────────────────────────────
const Skeleton = () => (
    <div className="min-w-[260px] w-[75vw] md:w-auto flex-shrink-0 md:flex-shrink animate-pulse">
        <div className="aspect-video rounded-xl bg-gold/10" />
        <div className="mt-2 h-4 bg-gold/10 rounded w-3/4" />
        <div className="mt-1 h-4 bg-gold/10 rounded w-1/2" />
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const LatestPropertyVideos: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            // 1. Try cache first
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

            // 2. Fetch Native YouTube Data API
            try {
                if (!API_KEY) throw new Error("Missing YouTube API Key");

                const res = await fetch(API_URL);
                if (!res.ok) throw new Error('API request failed');

                const data = await res.json();
                if (!data.items || data.items.length === 0) throw new Error('no entries');

                const parsed: Video[] = data.items.map((item: any) => {
                    const videoId = item.snippet.resourceId.videoId;
                    // Grab exact thumbnail from API, fallback to medium/default if high missing
                    const thumbObj = item.snippet.thumbnails;
                    const fetchedThumb = thumbObj?.high?.url || thumbObj?.medium?.url || thumbObj?.default?.url;

                    return {
                        id: videoId,
                        title: item.snippet.title,
                        url: `https://youtube.com/watch?v=${videoId}`,
                        thumbnail: fetchedThumb
                    };
                });

                setVideos(parsed);

                try {
                    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: parsed }));
                } catch { /* storage full */ }
            } catch (err) {
                console.warn("YouTube API failed, using graceful fallback content:", err);
                // PROPER FIX: Never hide! Graceful degradation to fallback array
                setVideos(FALLBACK_VIDEOS);
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
                <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-red-100">
                            <Youtube className="w-4 h-4" /> Latest Uploads
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gold-deep">
                            Kushi Busy YouTube Channel
                        </h2>
                        <p className="text-gold-dark/70 mt-1 text-sm font-medium tracking-wide">
                            Explore verified property walkthroughs, plot reviews &amp; real estate insights — Bright Reality Real Estate.
                        </p>
                    </div>
                    <a
                        href="https://www.youtube.com/@KUSHIBUSY"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FF0000] hover:bg-[#CC0000] text-white font-bold rounded-full transition-colors shadow-lg shadow-red-500/20 active:scale-95 flex-shrink-0 mt-1"
                    >
                        <Youtube className="w-4 h-4" /> Subscribe Now
                    </a>
                </div>

                {/* Grid / scroll */}
                <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-visible md:pb-0 snap-x snap-mandatory hide-scrollbars">
                    {loading
                        ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} />)
                        : videos.map(v => <VideoCard key={v.id} id={v.id} title={v.title} url={v.url} thumbnail={v.thumbnail} />)
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
                        View All Videos
                    </a>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .hide-scrollbars::-webkit-scrollbar { display: none; }
                .hide-scrollbars { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </section>
    );
};

export default LatestPropertyVideos;
