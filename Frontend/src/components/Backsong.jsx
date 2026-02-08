import React from "react";
import Footer from "./Footer";

function Backsong() {
  const songs = [
    { id: 1, title: 'Monica (From "Coolie")', artist: 'Anirudh Ravichander, Subhalakshmi', album: 'Monica (From "Coolie")', date: 'Jul 22, 2025', duration: '3:37', img: '/src/assets/pics/22.jpeg' },
    { id: 2, title: 'Pottala Muttaye', artist: 'Santhosh Narayanan, Vivek', album: 'Pottala Muttaye', date: 'Jul 28, 2025', duration: '3:46', img: '/src/assets/pics/23.jpeg' },
    { id: 3, title: 'Salambala', artist: 'Anirudh Ravichander, Vivek', album: 'Salambala', date: 'Jul 28, 2025', duration: '3:46', img: '/src/assets/pics/salambala-madharaasi-sivakarthikeyan.jpg' },
    { id: 4, title: 'Powerhouse', artist: 'Anirudh Ravichander', album: 'Powerhouse', date: 'Jul 28, 2025', duration: '3:46', img: '/src/assets/pics/Powerhouse-From-Coolie-Tamil-Tamil-2025-20250722095533-500x500.jpg' },
    { id: 5, title: 'Mobsta', artist: 'Anirudh Ravichander, Heisenberg', album: 'Mobsta', date: 'Jul 28, 2025', duration: '3:46', img: '/src/assets/pics/movsta.jpg' },
    { id: 6, title: 'Pottala Muttaye', artist: 'Santhosh Narayanan, Vivek', album: 'Pottala Muttaye', date: 'Jul 28, 2025', duration: '3:46', img: '/src/assets/pics/23.jpeg' },
    { id: 7, title: 'Pottala Muttaye', artist: 'Santhosh Narayanan, Vivek', album: 'Pottala Muttaye', date: 'Jul 28, 2025', duration: '3:46', img: '/src/assets/pics/23.jpeg' },
    { id: 8, title: 'Pottala Muttaye', artist: 'Santhosh Narayanan, Vivek', album: 'Pottala Muttaye', date: 'Jul 28, 2025', duration: '3:46', img: '/src/assets/pics/23.jpeg' },
  ];

  const recommendations = [
    { title: "Kollywood Cream", img: "/src/assets/pics/a.jpg" },
    { title: "Cheer for Chennai", img: "/src/assets/pics/a.jpg" },
    { title: "Trending Now Tamil", img: "/src/assets/pics/cc.jpg" },
    { title: "Top Tamil Tracks of 2024", img: "/src/assets/pics/dd.jpg" },
    { title: "Tamil BAE", img: "/src/assets/pics/eee.jpg" },
    { title: "Tamil Romance", img: "/src/assets/pics/ff.jpg" },
  ];

  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-[#503e4d] to-[#121212] p-6 text-white bg-fixed">
      {/* Header */}
      <div className="flex items-end gap-6 mb-6 mt-4">
        <img 
          src="/src/assets/pics/images.jpeg" 
          alt="Playlist Cover" 
          className="w-52 h-52 object-cover shadow-2xl rounded-sm"
        />
        <div className="flex flex-col gap-2">
           <span className="uppercase text-xs font-bold tracking-wider">Public Playlist</span>
           <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-4">Hot Hits Tamil</h1>
           <div className="flex items-center gap-2 text-sm font-medium text-[#ffffffb3]">
              <img src="/src/assets/pics/Spotify-Icon-Logo.wine.svg" className="w-6 h-6 invert" alt="Spotify" />
              <span className="text-white hover:underline cursor-pointer">Spotify</span>
              <span>•</span>
              <span>1,020,723 saves</span>
              <span>•</span>
              <span className="text-[#ffffffb3]">50 songs, about 3 hr</span>
           </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-8 py-6">
        <button className="w-14 h-14 bg-[#1DB954] rounded-full flex items-center justify-center hover:scale-105 transition-transform text-black shadow-lg">
           <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </button>
        <button className="text-[#b3b3b3] hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
               <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
               <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
        </button>
        <button className="text-[#b3b3b3] hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
               <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
            </svg>
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[16px_4fr_3fr_2fr_minmax(120px,1fr)] gap-4 border-b border-[#ffffff1a] px-4 py-3 text-[#b3b3b3] text-sm uppercase sticky top-[64px] bg-[#121212] z-40 bg-opacity-95 backdrop-blur-md">
         <span>#</span>
         <span>Title</span>
         <span className="hidden md:block">Album</span>
         <span className="hidden lg:block">Date Added</span>
         <span className="text-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/></svg></span>
      </div>

      {/* Table Body */}
      <div className="flex flex-col">
        {songs.map((song, index) => (
           <div key={song.id} className="grid grid-cols-[16px_4fr_3fr_2fr_minmax(120px,1fr)] gap-4 px-4 py-3 hover:bg-[#ffffff10] rounded-md group transition-colors items-center text-[#b3b3b3] text-sm">
              <div className="relative w-4 h-4 flex items-center justify-center">
                 <span className="group-hover:hidden">{index + 1}</span>
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16" className="hidden group-hover:block absolute cursor-pointer">
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                 </svg>
              </div>
              
              <div className="flex items-center gap-4 overflow-hidden">
                 <img src={song.img} alt="Song Cover" className="w-10 h-10 rounded shrink-0" />
                 <div className="flex flex-col overflow-hidden">
                    <span className="text-white font-medium hover:underline cursor-pointer truncate">{song.title}</span>
                    <span className="text-xs hover:underline cursor-pointer hover:text-white truncate">{song.artist}</span>
                 </div>
              </div>

              <span className="hidden md:block hover:underline cursor-pointer hover:text-white truncate">{song.album}</span>
              <span className="hidden lg:block whitespace-nowrap">{song.date}</span>
              <span className="text-center">{song.duration}</span>
           </div>
        ))}
      </div>

      {/* Recommendations */}
      <h2 className="text-2xl font-bold mt-12 mb-6 text-white">You might also like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
         {recommendations.map((rec, i) => (
            <div key={i} className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors group cursor-pointer">
               <div className="relative mb-4">
                  <img src={rec.img} alt={rec.title} className="w-full aspect-square object-cover rounded shadow-lg" />
                  <div className="absolute bottom-2 right-2 w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center text-black shadow-xl transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/></svg>
                  </div>
               </div>
               <h3 className="font-bold text-white text-base truncate mb-1">{rec.title}</h3>
               <p className="text-sm text-[#b3b3b3]">By Spotify</p>
            </div>
         ))}
      </div>

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
}

export default Backsong;
