import { createContext, useState, useRef, useContext, } from "react";

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [nextSong, setNextSong] = useState(null);
  const [prevSong, setPrevSong] = useState(null);
  const audioRef = useRef(new Audio());

  const fetchAdjacentSongs = async (songId) => {
      try {
          const [n, p] = await Promise.all([
             fetch(`http://127.0.0.1:5000/songs/${songId}/next`).then(res => res.ok ? res.json() : null),
             fetch(`http://127.0.0.1:5000/songs/${songId}/previous`).then(res => res.ok ? res.json() : null)
          ]);
          setNextSong(n);
          setPrevSong(p);
      } catch (e) {
          console.error("Failed to fetch adjacent songs", e);
      }
  }

  const playSong = async (song) => {
    if (currentSong?._id === song._id) {
       togglePlay();
       return;
    }
    
    // New song
    setCurrentSong(song);
    setIsPlaying(true);
    setNextSong(null); // Reset while fetching
    setPrevSong(null);
    
    // Audio source processing
    const audioUrl = `http://127.0.0.1:5000/audio/${song._id}`;
    
    audioRef.current.src = audioUrl;
    audioRef.current.loop = isLooping; // Maintain loop state
    audioRef.current.play().catch(e => console.error("Playback failed:", e));

    // Fetch adjacent songs in background
    fetchAdjacentSongs(song._id);
  };

  const playNext = () => {
      if (nextSong) playSong(nextSong);
  };

  const playPrev = () => {
      if (prevSong) playSong(prevSong);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.error("Playback failed:", e));
      setIsPlaying(true);
    }
  };

  const toggleLoop = () => {
    const newLoopState = !isLooping;
    setIsLooping(newLoopState);
    if (audioRef.current) {
        audioRef.current.loop = newLoopState;
    }
  };

  const setPlayerVolume = (vol) => {
      if (audioRef.current) {
          audioRef.current.volume = vol;
      }
  };

  return (
    <PlayerContext.Provider value={{ currentSong, isPlaying, isLooping, playSong, togglePlay, toggleLoop, setPlayerVolume, playNext, playPrev, nextSong, prevSong, audioRef }}>
      {children}
    </PlayerContext.Provider>
  );
};
