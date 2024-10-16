import React, { useRef, useState } from "react";
import {
  FaVolumeMute,
  FaVolumeUp,
  FaForward,
  FaBackward,
  FaExpand,
} from "react-icons/fa";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true); // Track mute state

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleMuteUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted; // Toggle mute state
      setIsMuted(videoRef.current.muted); // Update local mute state
    }
  };

  const handleForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 5; // Forward 5 seconds
    }
  };

  const handleBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 5; // Backward 5 seconds
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((currentTime / duration) * 100);
    }
  };

  // Format time in MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className="relative w-full h-80" // Set a fixed height
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Element */}
      <div
        className="relative rounded-xl shadow-lg bg-gray-800"
        style={{
          border: "10px solid #111",
          borderRadius: "15px",
        }}
      >
        <video
          ref={videoRef}
          src="/videos/animatedVideo.mp4"
          className="w-full h-full rounded-lg" // Full height for the video
          autoPlay
          loop
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
        />

        {/* Controls Overlay */}
        {showControls && (
          <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 p-2 flex items-center justify-between">
            {/* Current time and total time */}
            <div className="text-white">
              <span>{formatTime(videoRef.current?.currentTime || 0)} / </span>
              <span>{formatTime(videoRef.current?.duration || 0)}</span>
            </div>

            {/* Backward and Forward Buttons */}
            <div className="flex items-center">
              <button
                onClick={handleBackward}
                className="text-white text-2xl mx-2"
              >
                <FaBackward />
              </button>
              <button
                onClick={handlePlayPause}
                className="text-white text-2xl mx-2"
              >
                {videoRef.current?.paused ? "▶" : "⏸"}
              </button>
              <button
                onClick={handleForward}
                className="text-white text-2xl mx-2"
              >
                <FaForward />
              </button>
            </div>

            {/* Mute and Fullscreen Buttons */}
            <div className="flex items-center">
              <button
                onClick={handleMuteUnmute}
                className="text-white text-2xl mx-2"
              >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
              <button
                onClick={handleFullscreen}
                className="text-white text-2xl mx-2"
              >
                <FaExpand />
              </button>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <input
          type="range"
          className="absolute bottom-0 left-0 right-0 h-1 bg-gray-500"
          value={progress}
          onChange={(e) => {
            const value = e.target.value;
            const newTime = (value / 100) * videoRef.current.duration;
            videoRef.current.currentTime = newTime;
            setProgress(value);
          }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;