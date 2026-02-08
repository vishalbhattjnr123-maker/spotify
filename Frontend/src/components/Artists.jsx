import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const API_URL = "https://spotify-v5ue.onrender.com";

function Artists() {
  const [artists, setArtists] = useState([]);
  const [loadingArtists, setLoadingArtists] = useState(true);

  useEffect(() => {
    async function loadArtists() {
      try {
        const res = await fetch(`${API_URL}/artists`);
        const data = await res.json();
        setArtists(data);
      } catch (err) {
        console.error("Artists fetch error:", err);
      } finally {
        setLoadingArtists(false);
      }
    }
    loadArtists();
  }, []);

  return (
    <div className="bg-[#181818] p-4 rounded-lg">
      <h4 className="text-2xl font-bold mb-4 text-white hover:underline cursor-pointer inline-block">Artists</h4>

      {loadingArtists ? (
        <div className="text-white">Loading artists...</div>
      ) : (
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
            {artists.map((artist) => (
              <SwiperSlide key={artist._id}>
                <Link
                  to={`/artist/${artist._id}`}
                  className="block p-4 rounded-md bg-[#181818] hover:bg-[#282828] transition-colors group text-decoration-none"
                >
                  <div className="relative mb-4">
                    <img
                      src={`${API_URL}/artists/${artist._id}/avatar`}
                      onError={(e) => {
                        e.currentTarget.src = "/src/assets/pics/2.avif";
                      }}
                      alt={artist.name}
                      className="w-full aspect-square object-cover rounded-full shadow-lg group-hover:shadow-xl transition-shadow"
                    />
                    <div className="absolute bottom-2 right-2 w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center text-black shadow-xl transition-all duration-300 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                        </svg>
                    </div>
                  </div>
                  <div className="font-bold text-white truncate mb-1 text-center">{artist.name}</div>
                  <p className="text-[#b3b3b3] text-sm text-center">Artist</p>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
}

export default Artists;
