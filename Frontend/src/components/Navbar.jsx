import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  return (
    <nav className="h-[64px] bg-black w-full flex items-center justify-between px-4 sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center gap-4">
        <Link to="/">
             <img
            src="/src/assets/pics/Spotify-Icon-Logo.wine.svg"
            alt="Spotify"
            className="w-8 h-8 md:w-10 md:h-10 object-contain invert spotifynew" 
          />
        </Link>
      </div>

      {/* Center: Home & Search (Desktop) */}
      <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl mx-4">
        <Link to="/" className="p-3 bg-[#1f1f1f] rounded-full hover:scale-105 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-house-door-fill text-white" viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
             </svg>
        </Link>

        <div className="flex-1 relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b3b3b3] group-focus-within:text-white">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                 <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
             </svg>
          </div>
          <input
            type="text"
            placeholder="What do you want to play?"
            className="w-full bg-[#1f1f1f] text-white rounded-full py-3 pl-10 pr-10 outline-none focus:ring-2 focus:ring-white/20 hover:bg-[#2a2a2a] transition-colors placeholder-[#b3b3b3]"
          />
           <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 border-l border-[#555] pl-2">
             <Link to="/Browingss" className="text-[#b3b3b3] hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                </svg>
             </Link>
           </div>
        </div>
      </div>

      {/* Right: Actions & Auth */}
      <div className="flex items-center gap-2 md:gap-4">
        <Link to="/Premimum" className="hidden sm:block text-[#b3b3b3] hover:text-white font-bold text-sm hover:scale-105 transition-transform">
           Explore Premium
        </Link>
        {!user && (
          <Link to="/Plus" className="flex items-center gap-1 text-[#b3b3b3] hover:text-white font-bold text-sm text-decoration-none">
              <span className="border border-[#b3b3b3] rounded-full w-5 h-5 flex items-center justify-center hover:border-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v12l4-4h-3V3h-2v8H8l4 4zM5 19h14v2H5z"/></svg>
              </span>
              <span className="hidden lg:inline">Upload Songs</span>
          </Link>
        )}

        {user ? (
           <div className="flex items-center gap-4 ml-2">
             <span className="hidden md:inline text-white font-bold text-sm">Hi, {user.username}</span>
             <div className="w-8 h-8 bg-[#535353] rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
                 {user.username.charAt(0).toUpperCase()}
             </div>
             <button 
               onClick={handleLogout} 
               className="bg-white text-black text-sm font-bold px-4 py-2 rounded-full hover:scale-105 transition-transform"
             >
                Log out
             </button>
           </div>
        ) : (
            <>
               <Link to="/Logg">
                  <button className="bg-white text-black font-bold text-sm px-6 py-3 rounded-full hover:scale-105 transition-transform">
                      Log in
                  </button>
               </Link>
            </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
