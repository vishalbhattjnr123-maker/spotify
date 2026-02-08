import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Player from "./Player";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col bg-black text-white overflow-hidden">
      <div className="flex flex-1 overflow-hidden p-2 gap-2">
        <Sidebar />
        
        <div className="flex-1 flex flex-col bg-[#121212] rounded-lg overflow-hidden relative">
            <Navbar />
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#555] scrollbar-track-transparent pb-24">
               <Outlet />
            </div>
        </div>
      </div>
      <Player />
    </div>
  );
};

export default Layout;
