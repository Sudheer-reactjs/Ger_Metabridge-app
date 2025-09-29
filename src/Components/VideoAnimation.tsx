import { useEffect, useRef, useState } from 'react';
import MetabridgeVideo from "../assets/metabridge-video-new.mp4"

export default function VideoScrubSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress through the container
      // When top of container is at bottom of screen: progress = 0
      // When bottom of container is at top of screen: progress = 1
      const scrollStart = -rect.top;
      const scrollRange = containerHeight - windowHeight;
      const scrollProgress = Math.max(0, Math.min(1, scrollStart / scrollRange));

      // Update video time based on scroll progress
      if (video.duration) {
        const targetTime = scrollProgress * video.duration;
        video.currentTime = targetTime;
      }
    };

    const handleLoadedMetadata = () => {
      setIsVideoLoaded(true);
      handleScroll(); // Initial call to set correct frame
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    window.addEventListener('scroll', handleScroll);
    
    // Call once on mount
    handleScroll();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Video Scrubbing Section */}
      <div 
        ref={containerRef}
        className="relative"
        style={{ height: '300vh' }} // 3x viewport height for scroll duration
      >
        {/* Sticky video container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            preload="auto"
            muted
            playsInline
            src={MetabridgeVideo}
          />
          
          {/* Optional: Loading overlay */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="text-white text-xl">Loading video...</div>
            </div>
          )}

          {/* Optional: Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
            <div className="mb-2">Scroll to play</div>
            <div className="animate-bounce">↓</div>
          </div>
        </div>
      </div>

      {/* Next Section */}
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center text-white p-8">
          <h2 className="text-4xl font-bold mb-4">Next Section</h2>
          <p className="text-xl text-gray-300">
            Your content continues here smoothly after the video
          </p>
        </div>
      </div>

      {/* Additional sections */}
      <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-700 flex items-center justify-center">
        <div className="text-center text-white p-8">
          <h2 className="text-4xl font-bold mb-4">More Content</h2>
          <p className="text-xl text-gray-300">
            Keep scrolling for more sections
          </p>
        </div>
      </div>
    </>
  );
}