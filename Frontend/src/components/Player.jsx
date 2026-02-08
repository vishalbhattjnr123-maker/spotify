import React, { useEffect, useState, useCallback, useRef } from "react";
import { usePlayer } from "../context/PlayerContext";

const API_URL = "http://127.0.0.1:5000";

function Player() {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    isLooping,
    toggleLoop,
    setPlayerVolume,
    playNext,
    playPrev,
    audioRef,
  } = usePlayer();

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isHovering, setIsHovering] = useState(false);

  /* ================= AUDIO EVENTS ================= */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setVolume(audio.volume || 1);

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      if (!isLooping) playNext();
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioRef, isLooping, playNext]);

  /* ================= SEEK +10 SEC ================= */
  const seekPlus10 = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const newTime = Math.min(audio.currentTime + 10, audio.duration);
    audio.currentTime = newTime;
    setProgress(newTime);
  }, [audioRef]);

  /* Keyboard → ArrowRight = +10 sec */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") seekPlus10();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [seekPlus10]);

  /* ================= CONTROLS ================= */
  const handleSeek = (e) => {
    const time = Number(e.target.value);
    if(audioRef.current) {
        audioRef.current.currentTime = time;
        setProgress(time);
    }
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    setPlayerVolume(vol);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-[90px] bg-[#181818] border-t border-[#282828] px-4 flex items-center justify-between z-50">
      
      {/* LEFT: Song Info */}
      <div className="flex items-center gap-4 w-[30%] min-w-[180px]">
        <img
          src={`${API_URL}/cover/${currentSong._id}`}
          alt="cover"
          className="h-14 w-14 rounded shadow-md object-cover"
          onError={(e) => (e.target.src = "/src/assets/pics/2.avif")}
        />
        <div className="flex flex-col justify-center overflow-hidden">
          <div className="text-white hover:underline cursor-pointer text-sm font-medium truncate">
            {currentSong.songName}
          </div>
          <div className="text-[#b3b3b3] text-xs hover:underline cursor-pointer hover:text-white truncate">
            {currentSong.artist?.name || "Unknown Artist"}
          </div>
        </div>
        <button className="text-[#b3b3b3] hover:text-white ml-2 hidden sm:block">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
           </svg>
        </button>
      </div>

      {/* CENTER: Controls & Progress */}
      <div className="flex flex-col items-center max-w-[40%] w-full gap-1">
        
        {/* Playback Buttons */}
        <div className="flex items-center gap-6 mb-1">
           <button 
             className={`text-[#b3b3b3] hover:text-white transition-colors ${isLooping ? 'text-[#1db954]' : ''}`}
             onClick={toggleLoop}
             title="Enable Repeat"
           >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
              </svg>
           </button>

           <button 
             className="text-[#b3b3b3] hover:text-white transition-colors"
             onClick={playPrev}
             title="Previous"
           >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                 <path d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.54-.313 1.232.066 1.233.696v7.384c0 .63-.692 1.01-1.233.696L5 8.752V12a.5.5 0 0 1-1 0zm7.5.633L5.696 8l5.804 3.367z"/>
              </svg>
           </button>

           <button 
             className="bg-white rounded-full p-2 hover:scale-105 transition-transform text-black flex items-center justify-center w-8 h-8"
             onClick={togglePlay}
             title={isPlaying ? "Pause" : "Play"}
           >
              {isPlaying ? (
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
                 </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="ml-0.5">
                   <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                </svg>
              )}
           </button>

           <button 
             className="text-[#b3b3b3] hover:text-white transition-colors"
             onClick={playNext}
             title="Next"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.298 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.696L11.5 8.752V12a.5.5 0 0 0 1 0zM5 4.633 10.804 8 5 11.367z"/>
             </svg>
           </button>
           
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full text-xs font-medium text-[#b3b3b3]">
          <span>{formatTime(progress)}</span>
          <div 
            className="flex-1 h-1 bg-[#4d4d4d] rounded-full relative group cursor-pointer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
             <div 
               className={`absolute top-0 left-0 h-full rounded-full ${isHovering ? 'bg-[#1db954]' : 'bg-white'}`}
               style={{ width: `${(progress / duration) * 100}%` }}
             ></div>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={progress}
                onChange={handleSeek}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* RIGHT: Volume & Extras */}
      <div className="flex items-center justify-end gap-3 w-[30%] min-w-[180px]">
         <div className="flex items-center gap-2 group">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-[#b3b3b3] group-hover:text-white" viewBox="0 0 16 16">
               <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
               <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89l.706.706z"/>
               <path d="M8.707 11.182A4.48 4.48 0 0 0 10.025 8a4.48 4.48 0 0 0-1.318-3.182L8 5.525A3.48 3.48 0 0 1 8.992 8a3.49 3.49 0 0 1-.992 2.475l.707.707zM5.825 11.854A.5.5 0 0 1 5.5 12H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1.5a.5.5 0 0 1 .54.04l3.5 2.5a.5.5 0 0 1 0 .82l-3.5 2.5a.5.5 0 0 1-.215.094z"/>
            </svg>
            <div className="w-24 h-1 bg-[#4d4d4d] rounded-full relative cursor-pointer">
               <div 
                 className="absolute top-0 left-0 h-full bg-white rounded-full group-hover:bg-[#1db954]"
                 style={{ width: `${volume * 100}%` }}
               ></div>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
         </div>
      </div>

    </div>
  );
}

export default Player;
