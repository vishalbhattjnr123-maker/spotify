function Browings() {
  // document.body.style.overflow = "auto"; // Removing this side-effect as it might interfere with Layout
  const categories = [
    { title: "Music", img: "/src/assets/pics/50.jpeg", color: "bg-[#E13300]" },
    { title: "Podcasts", img: "/src/assets/pics/51.jpeg", color: "bg-[#1E3264]" },
    { title: "Live Events", img: "/src/assets/pics/52.jpg", color: "bg-[#8D67AB]" },
    { title: "Made For You", img: "/src/assets/pics/50.jpeg", color: "bg-[#148A08]" },
    { title: "New Releases", img: "/src/assets/pics/51.jpeg", color: "bg-[#E91429]" },
    { title: "Hindi", img: "/src/assets/pics/52.jpg", color: "bg-[#B02897]" },
  ];

  return (
    <div className="p-6 text-white pb-24">
      <h2 className="text-2xl font-bold mb-6">Start browsing</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
        <div className="relative overflow-hidden rounded-lg aspect-[1.6/1] bg-[#E13300] p-4 cursor-pointer hover:scale-[1.02] transition-transform">
          <span className="font-bold text-2xl">Music</span>
          <img src="/src/assets/pics/50.jpeg" alt="Music" className="absolute -right-4 -bottom-2 w-24 h-24 rotate-[25deg] shadow-lg" />
        </div>
        <div className="relative overflow-hidden rounded-lg aspect-[1.6/1] bg-[#1E3264] p-4 cursor-pointer hover:scale-[1.02] transition-transform">
          <span className="font-bold text-2xl">Podcasts</span>
          <img src="/src/assets/pics/51.jpeg" alt="Podcasts" className="absolute -right-4 -bottom-2 w-24 h-24 rotate-[25deg] shadow-lg" />
        </div>
        <div className="relative overflow-hidden rounded-lg aspect-[1.6/1] bg-[#8D67AB] p-4 cursor-pointer hover:scale-[1.02] transition-transform">
          <span className="font-bold text-2xl">Live Events</span>
          <img src="/src/assets/pics/52.jpg" alt="Events" className="absolute -right-4 -bottom-2 w-24 h-24 rotate-[25deg] shadow-lg" />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Browse all</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {categories.map((cat, i) => (
           <div key={i} className={`relative overflow-hidden rounded-lg aspect-[1.6/1] ${cat.color} p-4 cursor-pointer hover:scale-[1.02] transition-transform`}>
              <span className="font-bold text-2xl break-words max-w-[80%] inline-block">{cat.title}</span>
              <img src={cat.img} alt={cat.title} className="absolute -right-4 -bottom-2 w-24 h-24 rotate-[25deg] shadow-lg" />
           </div>
        ))}
        {/* Repeating for demo density */}
         {categories.map((cat, i) => (
           <div key={`dup-${i}`} className={`relative overflow-hidden rounded-lg aspect-[1.6/1] ${cat.color} p-4 cursor-pointer hover:scale-[1.02] transition-transform`}>
              <span className="font-bold text-2xl break-words max-w-[80%] inline-block">{cat.title}</span>
              <img src={cat.img} alt={cat.title} className="absolute -right-4 -bottom-2 w-24 h-24 rotate-[25deg] shadow-lg" />
           </div>
        ))}
      </div>
    </div>
  );
}

export default Browings;
