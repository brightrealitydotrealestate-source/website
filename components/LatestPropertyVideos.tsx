import React, { useState, useEffect } from 'react';
import { Play, Youtube } from 'lucide-react';

interface YouTubeVideo {
    id: string;
    title: string;
    thumbnail: string;
    publishedAt: string;
}

const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || 'UChKUUUekhtqUQqfX2Mkj7Mg';
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const LatestPropertyVideos: React.FC = () => {
    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const CACHE_KEY = 'yt_rss_cache';
        const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

        const fetchViaRss = async (): Promise<YouTubeVideo[]> => {
            const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;

            const res = await fetch(proxyUrl);
            if (!res.ok) throw new Error('RSS fetch failed');
            const data = await res.json();

            const parser = new DOMParser();
            const xml = parser.parseFromString(data.contents, 'text/xml');
            const entries = Array.from(xml.querySelectorAll('entry')).slice(0, 10);

            return entries.map((entry) => {
                const videoId = entry.querySelector('videoId')?.textContent
                    || entry.querySelector('id')?.textContent?.split(':').pop() || '';
                return {
                    id: videoId,
                    title: entry.querySelector('title')?.textContent || '',
                    thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                    publishedAt: entry.querySelector('published')?.textContent || '',
                };
            }).filter(v => v.id);
        };

        const load = async () => {
            // 1. Check sessionStorage cache first (instant load)
            try {
                const cached = sessionStorage.getItem(CACHE_KEY);
                if (cached) {
                    const { ts, data } = JSON.parse(cached);
                    if (Date.now() - ts < CACHE_TTL) {
                        setVideos(data);
                        setLoading(false);
                        return;
                    }
                }
            } catch { /* ignore cache errors */ }

            // 2. Fetch fresh from RSS
            try {
                const result = await fetchViaRss();
                setVideos(result);
                // Cache the result
                try {
                    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: result }));
                } catch { /* quota issues */ }
            } catch {
                setVideos([]);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    if (loading) {
        return (
            <div className="w-full max-w-7xl mx-auto px-4 py-10 md:py-14 animate-pulse">
                <div className="h-8 md:h-12 bg-gold/20 rounded-full w-2/3 md:w-1/3 mb-8 mx-auto"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {[1, 2, 3, 4, 5].map((skeleton) => (
                        <div key={skeleton} className="aspect-video bg-gold/10 rounded-xl"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (videos.length === 0) return null;

    return (
        <section className="py-10 md:py-14 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

                {/* Videos Grid */}
                <div className="flex overflow-x-auto pb-6 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:overflow-visible md:pb-0 md:px-0 gap-4 xl:gap-6 snap-x snap-mandatory hide-scrollbars">
                    {videos.map((video) => (
                        <div key={video.id} className="min-w-[280px] w-[80vw] md:w-auto md:min-w-0 snap-center group">
                            <div className="relative aspect-video rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 border border-gold/10">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Play Overlay */}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-12 h-12 bg-[#FF0000] rounded-full flex items-center justify-center pl-1 shadow-lg transform group-hover:scale-110 transition-transform">
                                        <Play className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                {/* Full Hitbox */}
                                <a
                                    href={`https://www.youtube.com/watch?v=${video.id}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="absolute inset-0 z-10"
                                    aria-label={`Watch ${video.title}`}
                                />
                            </div>
                            <h3 className="mt-3 text-sm font-bold text-gold-deep line-clamp-2 leading-tight group-hover:text-gold transition-colors" title={video.title}>
                                {video.title}
                            </h3>
                            {video.publishedAt && (
                                <p className="mt-1 text-xs text-gold-dark/70 font-medium">
                                    {new Date(video.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* View More Uploads Button */}
                <div className="mt-10 md:mt-12 flex justify-center">
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
