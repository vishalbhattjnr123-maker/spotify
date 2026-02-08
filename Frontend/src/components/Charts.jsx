import React, { useState, useEffect } from "react";
import { usePlayer } from "../context/PlayerContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const API_URL = "http://127.0.0.1:5000";

function Charts() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { playSong, currentSong, isPlaying, togglePlay } = usePlayer();

  useEffect(() => {
    async function loadSongs() {
      try {
        const res = await fetch(`${API_URL}/songs`);
        const data = await res.json();
        setSongs(data.reverse());
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSongs();
  }, []);

  const handlePlayPause = (song) => {
    if (currentSong && currentSong._id === song._id) {
      togglePlay();
    } else {
      playSong(song);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center text-xl mt-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="mb-8 px-4">
      {songs.length > 0 && (
        <h4 className="text-2xl font-bold text-white mb-6">
          Uploaded Songs
        </h4>
      )}

      <Swiper
        spaceBetween={24}
        slidesPerView={2}
        navigation
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
        modules={[]}
        className="mySwiper"
      >
        {songs.map((song) => (
          <SwiperSlide key={song._id}>
            {/* ================= CARD ================= */}
            <div
              onClick={() => handlePlayPause(song)}
              className="
                bg-[#181818]
                p-3
                rounded-xl
                hover:bg-[#282828]
                transition-colors
                cursor-pointer
                group
                w-full
                aspect-[3/4]
                flex
                flex-col
              "
            >
              {/* ================= IMAGE ================= */}
              <div className="relative mb-4">
                <img
                  src={
                    song.coverImage
                      ? `${API_URL}/cover/${song._id}`
                      : "/src/assets/pics/2.avif"
                  }
                  alt={song.songName}
                  className="
                    w-full
                    aspect-square
                    object-cover
                    rounded-2xl
                    shadow-2xl
                    scale-[1.05]
                    transition-transform
                    duration-300
                    group-hover:scale-[1.08]
                  "
                />

                {/* ================= PLAY BUTTON ================= */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayPause(song);
                  }}
                  style={{
                    borderRadius: "9999px", // force circle (swiper override fix)
                  }}
                  className={`
                    swiper-no-swiping
                    absolute
                    bottom-1      
                    right-3
                    w-12
                    h-12
                    bg-[#1DB954]

                    flex
                    items-center
                    justify-center
                    text-black

                    border-0       
                    outline-none

                    shadow-2xl
                    transition-all
                    duration-300
                    ease-out

                    translate-y-3
                    opacity-0
                    scale-90

                    group-hover:translate-y-0
                    group-hover:opacity-100
                    group-hover:scale-100

                    ${
                      currentSong?._id === song._id && isPlaying
                        ? "opacity-100 translate-y-0 scale-100"
                        : ""
                    }
                  `}
                >
                  {currentSong?._id === song._id && isPlaying ? (
                    /* PAUSE ICON */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5" />
                    </svg>
                  ) : (
                    /* PLAY ICON */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="ml-1"
                    >
                      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                    </svg>
                  )}
                </button>
              </div>

              {/* ================= TEXT ================= */}
              <div
                className="font-bold text-white text-lg truncate mb-1"
                title={song.songName}
              >
                {song.songName}
              </div>

              <p
                className="text-sm text-[#b3b3b3] truncate"
                title={song.artist?.name || "Unknown Artist"}
              >
                {song.artist?.name || "Unknown Artist"}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Charts;
