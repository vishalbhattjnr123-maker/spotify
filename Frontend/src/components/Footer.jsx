function Footer() {
  const footerData = [
    {
      title: "Company",
      links: ["About", "Jobs", "For the Record"],
    },
    {
      title: "Communities",
      links: ["For Artists", "Developers", "Advertising", "Investors", "Vendors"],
    },
    {
      title: "Useful links",
      links: ["Support", "Free Mobile App", "Popular by Country", "Import your music"],
    },
    {
      title: "Spotify Plans",
      links: ["Premium Individual", "Premium Duo", "Premium Family", "Premium Student", "Spotify Free"],
    },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "#",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
          viewBox="0 0 16 16">
          <path d="M8 0C5.8 0 5.6.01 4.7.05c-.9.04-1.48.17-1.99.37a3.9 3.9 0 0 0-1.42.92A3.9 3.9 0 0 0 .42 2.76C.22 3.27.09 3.85.05 4.7.01 5.55 0 5.83 0 8c0 2.17.01 2.44.05 3.3.04.85.17 1.43.37 1.94.2.53.48.97.92 1.42.45.44.89.72 1.42.92.51.2 1.09.33 1.94.37C5.55 15.99 5.83 16 8 16s2.44-.01 3.3-.05c.85-.04 1.43-.17 1.94-.37.53-.2.97-.48 1.42-.92.44-.45.72-.89.92-1.42.2-.51.33-1.09.37-1.94.04-.86.05-1.13.05-3.3s-.01-2.44-.05-3.3c-.04-.85-.17-1.43-.37-1.94a3.9 3.9 0 0 0-.92-1.42A3.9 3.9 0 0 0 13.24.42c-.51-.2-1.09-.33-1.94-.37C10.44.01 10.17 0 8 0z" />
        </svg>
      ),
    },
    {
      name: "Telegram",
      href: "#",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
          viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.3 5.9q-1.17.48-4.67 2.01c-.57.22-.6.44-.6.44.03.24.28.34.69.47l.18.05c.41.13.96.29 1.24.29.39.01.87-.32 3.37-2.23.05-.01.12-.02.17.02s.04.12.04.14c-.03.13-1.23 1.24-1.85 1.82-.2.18-.33.31-.36.34a8 8 0 0 1-.19.19c-.38.36-.66.64.01 1.09.33.22.59.39.85.57.28.2.57.39.94.63.14.09.27.18.4.27.33.23.63.45 1 .41.22-.02.44-.22.55-.82.27-1.42.79-4.49.91-5.75a1.4 1.4 0 0 0-.01-.31.34.34 0 0 0-.11-.22.53.53 0 0 0-.31-.09c-.3.01-.76.17-2.98 1.09" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "#",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
          viewBox="0 0 16 16">
          <path d="M16 8.05c0-4.45-3.58-8.05-8-8.05C3.58 0-.00 3.6-.00 8.05c0 4.02 2.93 7.35 6.75 7.95v-5.63h-2V8.05H6.75V6.28c0-2.02 1.2-3.13 3.02-3.13.88 0 1.79.16 1.79.16v1.98h-1c-.99 0-1.3.62-1.3 1.26v1.51h2.22l-.35 2.33H9.25V16c3.82-.6 6.75-3.93 6.75-7.95" />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      href: "#",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
          viewBox="0 0 16 16">
          <path d="M13.6 2.3A7.9 7.9 0 0 0 8 0a7.93 7.93 0 0 0-7.93 7.93c0 1.4.36 2.76 1.06 3.97L0 16l4.2-1.1a7.9 7.9 0 0 0 3.8.96A7.93 7.93 0 0 0 16 8a7.9 7.9 0 0 0-2.4-5.7zM8 14.5a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.5.65.67-2.43-.16-.25A6.56 6.56 0 0 1 1.9 7.9c0-3.62 2.96-6.58 6.59-6.58a6.56 6.56 0 0 1 4.66 1.93 6.56 6.56 0 0 1 1.93 4.66c0 3.64-2.96 6.59-6.59 6.59" />
        </svg>
      ),
    },
  ];

  const bottomLinks = [
    "Legal",
    "Safety & Privacy Center",
    "Privacy Policy",
    "Cookies",
    "About Ads",
    "Accessibility",
  ];

  return (
    <footer className="bg-[#121212] pt-16 px-8 w-full">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-wrap gap-16">
          {footerData.map((col, index) => (
            <div className="flex flex-col gap-4" key={index}>
              <h4 className="font-bold text-white text-base">{col.title}</h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-[#b3b3b3] hover:text-white hover:underline text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex gap-4 self-start">
          {socialLinks.map((social, i) => (
            <a 
              key={i} 
              href={social.href} 
              aria-label={social.name}
              className="w-10 h-10 bg-[#292929] rounded-full flex items-center justify-center text-white hover:bg-[#727272] transition-colors"
            >
              {social.svg}
            </a>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-[#292929] mb-6"></div>

      <div className="flex flex-wrap justify-between items-center gap-4 pt-4">
        <div className="flex flex-wrap gap-6">
          {bottomLinks.map((link, i) => (
            <a key={i} href="#" className="text-[#b3b3b3] hover:text-white text-xs">
              {link}
            </a>
          ))}
        </div>
        <span className="text-[#b3b3b3] text-xs">© 2025 Spotify AB</span>
      </div>
    </footer>
  );
}

export default Footer;
