
import { useEffect, useRef, useCallback } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

import 'videojs-hls-quality-selector/src/plugin'

// Use the Player type from videojs
type Player = ReturnType<typeof videojs>;

interface VideoJsOptions {
    controls?: boolean;
    responsive?: boolean;
    fluid?: boolean;
    autoplay?: boolean;
    preload?: string;
    height?: number;
    width?: string | number;
    aspectRatio?: string;
    muted?: boolean;
    poster?: string;
    maxWidth?: string | number;
    playbackRates?: number[];
    sources?: Array<{
        src: string;
        type: string;
    }>;
    [key: string]: unknown; // allow additional props
}

export default function VideoJS({ options, onReady }: { options: VideoJsOptions, onReady?: (player: Player) => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<Player>(null);

    // Build video options
    const buildVideoOptions = useCallback(() => ({
        controls: options?.controls ?? true,
        autoplay: options?.autoplay ?? false,
        preload: options?.preload ?? 'metadata',
        height: options?.height ?? 400,
        width: options?.width ?? '100%',
        fluid: options?.fluid ?? true,
        responsive: options?.responsive ?? true,
        aspectRatio: options?.aspectRatio ?? '16:9',
        muted: options?.muted ?? true,
        playsinline: true,
        poster: options?.poster,
        sources: options?.sources,
        html5: {
            vhs: {
                enableLowInitialPlaylist: true
            }
        },
        playbackRates: options?.playbackRates || [0.5, 1, 1.25, 1.5, 2],
    }), [options]);

    // Initialize player effect
    useEffect(() => {
        // Only initialize if we don't have a player and container exists
        if (!playerRef.current && containerRef.current) {
            const containerElement = containerRef.current;

            // Create video element dynamically
            const videoElement = document.createElement("video");
            videoElement.classList.add('video-js');
            videoElement.classList.add('vjs-big-play-centered');

            // Append to container
            containerElement.appendChild(videoElement);

            try {
                // Initialize Video.js player
                const player = videojs(videoElement, buildVideoOptions(), () => {

                    // // Initialize quality selector plugin
                    // if (player.hlsQualitySelector) {
                    //     player.hlsQualitySelector({
                    //         displayCurrentQuality: true
                    //     });
                    // }

                    // Call onReady callback
                    if (onReady && typeof onReady === 'function') {
                        onReady(player);
                    }
                });

                // Store player reference
                if (player) {
                    playerRef.current = player;
                }

            } catch (error) {
                console.error('VideoJS: Failed to initialize player', error);
            }
        }
        // Update existing player if options changed
        else if (playerRef.current) {
            const player = playerRef.current;
            const newOptions = buildVideoOptions();

            try {
                // Update source if changed
                const currentSrc = player.currentSrc();
                const newSrc = newOptions.sources && newOptions.sources[0].src;

                if (newSrc && newSrc !== currentSrc) {
                    player.src(newOptions.sources);
                }

                // Update other properties
                player.muted(newOptions.muted);
                player.autoplay(newOptions.autoplay);
                player.poster(newOptions.poster);

            } catch (error) {
                console.error('VideoJS: Error updating player', error);
            }
        }
    }, [options, onReady, buildVideoOptions]);

    // Cleanup effect
    useEffect(() => {
        return () => {
            if (playerRef.current && !playerRef.current.isDisposed()) {
                try {
                    playerRef.current.dispose();
                } catch (error) {
                    console.error('VideoJS: Error during cleanup', error);
                } finally {
                    playerRef.current = null;
                }
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="video-container"
            style={{
                width: '100%',
                maxWidth: options?.maxWidth || '100%',
                backgroundColor: '#000',
                minHeight: options?.height || 150
            }}
            data-testid="videojs-container"
        />
    );
}