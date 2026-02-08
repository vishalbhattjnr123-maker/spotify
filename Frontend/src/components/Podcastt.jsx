import React from "react";

function Podcastt() {
  // 👉 Podcasts / Extra Cards
  const Podcasts = [
    {
      title: "Jhol",
      subtitle: "Episode • Maanu, Annural Khalid",
      img: "/src/assets/pics/20.jpg",
      playText: "Continue playing",
      footer: { date: "Jul 31", time: "3 min 34 sec", tag: "Jhol" },
    },
    {
      title: "Digital India: Aadhaar Card, DigiLocker, China, Hacking...",
      subtitle: "Video • Raj Shamani's Figuring Out",
      img: "/src/assets/pics/21.jpeg",
      footer: {
        date: "Aug 27",
        time: "1 hr",
        extra:
          "Guest Suggestion Form: https://forms.gle/bnaeY3FpoFU9ZjA47",
      },
    },
    {
      title: "Digital India: Aadhaar Card, DigiLocker, China, Hacking...",
      subtitle: "Video • Raj Shamani's Figuring Out",
      img: "/src/assets/pics/21.jpeg",
      footer: {
        date: "Aug 27",
        time: "1 hr",
        extra:
          "Guest Suggestion Form: https://forms.gle/bnaeY3FpoFU9ZjA47",
      },
    },
       {
      title: "Digital India: Aadhaar Card, DigiLocker, China, Hacking...",
      subtitle: "Video • Raj Shamani's Figuring Out",
      img: "/src/assets/pics/21.jpeg",
      footer: {
        date: "Aug 27",
        time: "1 hr",
        extra:
          "Guest Suggestion Form: https://forms.gle/bnaeY3FpoFU9ZjA47",
      },
    },
    
  ];

  return (
    <div className="p-6">
      <h5 className="text-2xl font-bold mb-6 text-white">Podcasts</h5>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Podcasts.map((pod, i) => (
          <div
            key={i}
            className="group relative cursor-pointer"
          >
            {i === 0 ? (
              <div className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors h-full flex flex-col justify-between">
                <div>
                   <div className="mb-4 relative">
                      <img src={pod.img} alt="Thumbnail" className="w-full aspect-square object-cover rounded shadow-lg" />
                      <div className="absolute bottom-2 right-2 flex items-center gap-2">
                          <button className="bg-black/70 text-white rounded-full p-2 hover:scale-105 transition-transform">
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/></svg>
                          </button>
                      </div>
                   </div>
                   <h2 className="font-bold text-white text-lg mb-1 truncate">{pod.title}</h2>
                   <p className="text-[#b3b3b3] text-sm mb-4 truncate">{pod.subtitle}</p>
                </div>
                
                <div className="flex items-center justify-between text-[#b3b3b3] text-xs">
                  <div>
                    <span>{pod.footer.date}</span> • <span>{pod.footer.time}</span>
                  </div>
                   <div className="bg-[#2a2a2a] px-2 py-1 rounded text-white font-bold text-[10px] uppercase tracking-wider">{pod.footer.tag}</div>
                </div>
              </div>
            ) : (
              <div className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors h-full flex flex-col">
                <div className="mb-4">
                  <img src={pod.img} alt="Digital Thumbnail" className="w-full aspect-video object-cover rounded shadow-lg" />
                </div>
                <div className="flex-1">
                   <h2 className="font-bold text-white text-base mb-1 line-clamp-2">{pod.title}</h2>
                   <p className="text-[#b3b3b3] text-sm mb-2 truncate">{pod.subtitle}</p>
                </div>
                <div className="text-[#b3b3b3] text-xs mt-auto">
                  <div className="mb-1">
                      <span>{pod.footer.date}</span> • <span>{pod.footer.time}</span>
                  </div>
                  {/* <small className="block truncate">{pod.footer.extra}</small> */}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Podcastt;
