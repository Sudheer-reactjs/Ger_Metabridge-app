import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MetabridgeVideo from '../assets/metabridge-video-new.mp4';

gsap.registerPlugin(ScrollTrigger);

const VideoAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null); // Type for section container
  const videoRef = useRef<HTMLVideoElement>(null); // Type for video element

  useGSAP(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return; // Early return if refs are null

    let ctx = gsap.context(() => {
      video.addEventListener('loadedmetadata', () => {
        video.muted = true;
        video.loop = false;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: `+=${video.duration * 100}%`, // Reduced to 500% for 5s video
            pin: true,
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (self.progress >= 1 || video.currentTime >= video.duration) {
                video.currentTime = video.duration;
              }
            },
          },
        });

        tl.to(video, {
          currentTime: video.duration,
          duration: 1,
          ease: 'none',
        });

        ScrollTrigger.refresh();
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="video-section">
      <video
        ref={videoRef}
        playsInline
        preload="auto"
        src={MetabridgeVideo}
      />
    </section>
  );
};

export default VideoAnimation;