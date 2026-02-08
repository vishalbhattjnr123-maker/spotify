import Artists from "../components/Artists";
import Charts from "../components/Charts";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="flex flex-col p-6 bg-gradient-to-b from-[#202020] to-[#121212] min-h-full">
         <Charts />
         <Artists />
         <div className="h-[1px] bg-[#2a2a2a]" />
         <Footer />
    </div>
  );
}

export default Home;
