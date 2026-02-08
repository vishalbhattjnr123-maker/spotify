import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Song from "./pages/Song";
import Logg from "./components/Logg";
import Signn from "./components/Signn";
import Podcastt from "./components/Podcastt";
import Pluss from "./pages/Pluss";
import Browingss from "./pages/Browingss";
import ArtistPage from "./pages/Artist";
import { PlayerProvider } from "./context/PlayerContext";
import Layout from "./components/Layout";
import Premimum1 from "./pages/Premimum1";


import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <PlayerProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/song" element={<Song />} />
            <Route path="/artist/:id" element={<ArtistPage />} />
            <Route path="/Logg" element={<Logg />} />
            <Route path="/Signn" element={<Signn />} />
            <Route path="/Podcastt" element={<Podcastt />} />
            <Route path="/Plus" element={<Pluss />} />
            <Route path="/Browingss" element={<Browingss />} />
            <Route path="/Premimum" element={<Premimum1 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PlayerProvider>
    </UserProvider>
  );
}

export default App;
