import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://spotify-v5ue.onrender.com";

function Sidebar() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    async function loadArtists() {
      try {
        const res = await fetch(`${API_URL}/artists`);
        const data = await res.json();
        setArtists(data);
      } catch (err) {
        console.error("Sidebar artists fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadArtists();
  }, []);

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`h-full bg-[#121212] rounded-lg flex flex-col transition-all duration-300 ${
        isExpanded ? "w-[280px] lg:w-[350px]" : "w-[72px]"
      } hidden md:flex`}
    >
      {/* Header Section */}
      <div className="p-4 shadow-xl">
        <div className="flex items-center justify-between mb-4 text-[#b3b3b3]">
          <div
            className={`flex items-center gap-2 font-bold hover:text-white cursor-pointer transition-colors ${
              !isExpanded && "justify-center w-full"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-collection-play-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7 6a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 7 6" />
              <path d="M8.176 1.113a.5.5 0 0 0-.352 0l-4.504 1.877c-.44.183-.72.617-.72 1.096v6.914c0 .479.28.913.72 1.096l4.504 1.877c.11.046.229.046.352 0l4.504-1.877c.44-.183.72-.617.72-1.096V4.086c0-.479-.28-.913-.72-1.096zM15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
            </svg>
            {isExpanded && <span>Your Library</span>}
          </div>

          {isExpanded && (
            <div className="flex items-center gap-2">
              <button className="hover:bg-[#1a1a1a] p-2 rounded-full transition-colors hover:text-white">
                <span className="text-xl leading-none">+</span>
              </button>
              <button
                 onClick={() => setIsExpanded(false)}
                 className="hover:bg-[#1a1a1a] p-2 rounded-full transition-colors hover:text-white"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"/>
                  </svg>
              </button>
            </div>
          )}
        </div>

        {/* Filters/Tags */}
        {isExpanded && (
           <div className="flex gap-2 overflow-x-auto no-scrollbar mb-2">
            <button className="px-3 py-1 bg-[#232323] hover:bg-[#2a2a2a] rounded-full text-sm text-white transition-colors whitespace-nowrap">
              Artists
            </button>
            <button className="px-3 py-1 bg-[#232323] hover:bg-[#2a2a2a] rounded-full text-sm text-white transition-colors whitespace-nowrap">
              Playlists
            </button>
          </div>
        )}

        {/* Search & Recents */}
         {isExpanded ? (
          <div className="flex items-center justify-between mt-2">
             <div className="relative group">
                 <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`p-1 text-[#b3b3b3] hover:text-white transition-colors ${isSearchOpen ? 'text-white' : ''}`}
                 >
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                     </svg>
                 </button>
                  {isSearchOpen && (
                      <input 
                        type="text" 
                        autoFocus
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="absolute left-8 top-0 bg-[#2a2a2a] text-white text-sm rounded px-2 py-1 outline-none w-32 border border-transparent focus:border-[#444]"
                      />
                  )}
             </div>
             <div className="flex items-center gap-1 text-[#b3b3b3] text-sm hover:text-white cursor-pointer transition-colors scale-90 origin-right">
                <span>Recents</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                </svg>
             </div>
          </div>
         ) : (
            <div className="flex justify-center mt-2 cursor-pointer hover:bg-[#1a1a1a] p-2 rounded-lg" onClick={() => setIsExpanded(true)}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#b3b3b3" className="hover:fill-white transition-colors" viewBox="0 0 16 16">
                     <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"/>
                 </svg>
             </div>
         )}
      </div>

      {/* List Section */}
      <div className="flex-1 overflow-y-auto hover:overflow-y-auto scrollbar-thin scrollbar-thumb-[#555] scrollbar-track-transparent">
        {loading ? (
          <div className="p-4 text-[#b3b3b3] text-sm">Loading...</div>
        ) : (
          <div className="px-2 pb-4">
            {filteredArtists.map((artist) => (
              <Link
                to={`/artist/${artist._id}`}
                key={artist._id}
                className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a] transition-colors group ${
                     !isExpanded && "justify-center"
                }`}
              >
                <img
                  src={`${API_URL}/artists/${artist._id}/avatar`}
                  alt={artist.name}
                  onError={(e) => (e.currentTarget.src = "/src/assets/pics/2.avif")} // Fallback logic preserved
                  className={`rounded-full object-cover shadow-sm ${
                      isExpanded ? "w-12 h-12" : "w-10 h-10"
                  }`}
                />
                {isExpanded && (
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-white font-medium truncate group-hover:text-white transition-colors">
                      {artist.name}
                    </span>
                    <span className="text-[#b3b3b3] text-sm truncate group-hover:text-white transition-colors">
                      Artist
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
