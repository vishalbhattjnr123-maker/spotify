import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";

const API_URL = "http://127.0.0.1:5000";

function ArtistPage() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroImageUrl, setHeroImageUrl] = useState(null);
  
  // Global Player Context
  const { playSong, currentSong, isPlaying, togglePlay } = usePlayer();

  useEffect(() => {
    async function loadArtistAndSongs() {
      try {
        const [artistRes, songsRes] = await Promise.all([
          fetch(`${API_URL}/artists/${id}`),
          fetch(`${API_URL}/artists/${id}/songs`),
        ]);
        
        if (!artistRes.ok) throw new Error("Artist not found");
        const artistObj = await artistRes.json();
        setArtist(artistObj);

        if (!songsRes.ok) throw new Error("Songs fetch failed");
        const songsData = await songsRes.json();
        setSongs(songsData);
        
        if (songsData.length > 0) {
          setHeroImageUrl(`${API_URL}/cover/${songsData[0]._id}`);
        } else {
          setHeroImageUrl(null);
        }
      } catch (err) {
        console.error("Artist page load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadArtistAndSongs();
  }, [id]);

  const handlePlayPause = (song) => {
      if (currentSong && currentSong._id === song._id) {
          togglePlay();
      } else {
          playSong(song);
      }
  };

  const isCurrentSongPlaying = (songId) => {
      return isPlaying && currentSong && currentSong._id === songId;
  };

  return (
    <div className="p-6 bg-gradient-to-b from-[#404040] to-[#121212] min-h-full text-white">
        <Link to="/" className="text-[#b3b3b3] hover:text-white font-bold mb-4 inline-block">
            ← Back
        </Link>

        {loading ? (
            <div className="mt-4">Loading artist...</div>
        ) : (
            <>
                {/* Hero Header */}
                <div className="relative w-full h-[250px] md:h-[300px] rounded-xl overflow-hidden shadow-lg bg-[#282828] mb-8">
                    <img
                        src={heroImageUrl || "/src/assets/pics/2.avif"}
                        alt="artist-cover"
                        className="w-full h-full object-cover brightness-75"
                    />
                    <div className="absolute bottom-6 left-6 z-10">
                        <div className="flex items-center gap-2 text-[#1DB954] font-bold text-sm mb-2">
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-check-fill" viewBox="0 0 16 16">
                                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zM13.298 7.5l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L10 9.5l2.454-2.7a.5.5 0 0 1 .753.649l.063.051z"/>
                             </svg>
                             Verified Artist
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-4 drop-shadow-md">
                            {artist?.name || "Unknown Artist"}
                        </h1>
                        <div className="text-[#ccc] text-sm font-medium mb-4">
                            Monthly listeners • 1,234,567
                        </div>
                         <div className="flex gap-4">
                            <button
                                onClick={() => songs.length > 0 && playSong(songs[0])}
                                className="bg-[#1DB954] text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                            >
                                PLAY
                            </button>
                             <button className="bg-transparent border border-[#727272] text-white px-6 py-2 rounded-full font-bold hover:border-white hover:scale-105 transition-all">
                                FOLLOWING
                             </button>
                         </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-4">Popular</h2>
                
                {songs.length === 0 ? (
                    <div className="text-[#b3b3b3]">No songs found for this artist.</div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {songs.map((song) => (
                          <div
                            key={song._id}
                            className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors group cursor-pointer relative"
                            onClick={() => handlePlayPause(song)}
                          >
                             <div className="relative mb-4">
                                <img
                                    src={song.coverImage ? `${API_URL}/cover/${song._id}` : "/src/assets/pics/2.avif"}
                                    alt={song.songName}
                                    className="w-full aspect-square object-cover rounded shadow-lg"
                                />
                                <div className={`absolute bottom-2 right-2 w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center text-black shadow-xl transition-all duration-300 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ${isCurrentSongPlaying(song._id) ? 'opacity-100 translate-y-0' : ''}`}>
                                    {isCurrentSongPlaying(song._id) ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="ml-1">
                                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                                        </svg>
                                    )}
                                </div>
                             </div>
                             
                             <h3 className="font-bold text-white truncate mb-1">{song.songName}</h3>
                             <p className="text-sm text-[#b3b3b3] truncate">{artist?.name}</p>
                          </div>
                        ))}
                    </div>
                )}
            </>
        )}
    </div>
  );
}

export default ArtistPage;
