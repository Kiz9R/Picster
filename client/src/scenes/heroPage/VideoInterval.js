import React, { useEffect, useRef } from "react";
import HeroV from "assets/HeroV.mp4";

export default function VideoInterval() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Set Video Framerate
    const framerate = 25;
    // Calculate interval duration for fluid playback
    const intervalDuration = 1000 / framerate;

    const interval = setInterval(() => {
      // Use requestAnimationFrame for smooth playback
      const intervalPlay = () => {
        videoRef.current.currentTime =
          videoRef.current.currentTime + intervalDuration / 1000; // add interval in seconds
      };
      window.requestAnimationFrame(intervalPlay);
    }, intervalDuration); // every 40 milliseconds == 25 frames per second

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <video ref={videoRef} muted loop>
        <source src={HeroV} type="video/mp4" />
      </video>
    </>
  );
}
