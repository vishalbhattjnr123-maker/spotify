import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Logg() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 
  const API_URL = "https://spotify-v5ue.onrender.com"; 
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter your username/email and password!");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      console.log("Login Success:", data);
      
      login(data.user);

      alert(data.message);
      navigate("/");
    } catch (err) {
      console.error("Login Error:", err);
      alert(err.message || "Server error!");
    }
  };

  return (
    <div className="bg-[#121212] min-h-screen flex flex-col justify-center items-center font-sans text-white p-8">
      <div className="w-full max-w-[734px] bg-[#121212] rounded-lg flex flex-col items-center">
        <div className="mb-8">
          <img
            className="w-12 h-12"
            src="/Spotify-Icon-Logo.wine.svg"
            alt="Spotify Logo"
          />
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold mb-10 text-center tracking-tight">Log in to Spotify</h1>

        <div className="w-full max-w-[324px] flex flex-col gap-2.5">
          <button className="flex items-center justify-center gap-3 w-full border border-[#878787] rounded-full py-3 hover:border-white hover:scale-105 transition-all font-bold text-sm bg-transparent text-white">
            <img src="https://img.icons8.com/color/48/google-logo.png" className="w-5 h-5" alt="Google" /> 
            Continue with Google
          </button>
          <button className="flex items-center justify-center gap-3 w-full border border-[#878787] rounded-full py-3 hover:border-white hover:scale-105 transition-all font-bold text-sm bg-transparent text-white">
            <img src="https://img.icons8.com/fluency/48/facebook-new.png" className="w-5 h-5" alt="Facebook" /> 
            Continue with Facebook
          </button>
          <button className="flex items-center justify-center gap-3 w-full border border-[#878787] rounded-full py-3 hover:border-white hover:scale-105 transition-all font-bold text-sm bg-transparent text-white">
            <img src="https://img.icons8.com/ios-filled/50/mac-os.png" className="w-5 h-5 invert" alt="Apple" /> 
            Continue with Apple
          </button>
          <button className="flex items-center justify-center gap-3 w-full border border-[#878787] rounded-full py-3 hover:border-white hover:scale-105 transition-all font-bold text-sm bg-transparent text-white">
             Continue with phone number
          </button>
        </div>

        <div className="w-full max-w-[324px] my-8 flex items-center gap-4">
          <div className="h-[1px] bg-[#292929] flex-1"></div>
          {/* <span className="text-sm font-bold opacity-0 hidden">OR</span> */}
          <div className="h-[1px] bg-[#292929] flex-1"></div>
        </div>

        <div className="w-full max-w-[324px] flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Email or username</label>
            <input
              type="text"
              placeholder="Email or username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 bg-[#121212] border border-[#878787] rounded text-white placeholder-[#878787] hover:border-white focus:border-white focus:outline-none transition-colors text-base"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 bg-[#121212] border border-[#878787] rounded text-white placeholder-[#878787] hover:border-white focus:border-white focus:outline-none transition-colors text-base"
            />
          </div>

          <div className="mt-4">
             <button 
                className="w-full bg-[#1DB954] text-black font-bold py-3.5 rounded-full hover:scale-105 hover:bg-[#1ed760] transition-transform text-sm uppercase tracking-widest"
                onClick={handleLogin}
             >
                Log In
             </button>
          </div>
          
           <div className="text-center mt-4">
              <a href="#" className="text-sm text-white hover:underline underline-offset-2 font-medium">Forgot your password?</a>
           </div>

           <div className="mt-8 pt-8 border-t border-[#292929] text-center">
              <p className="text-[#a7a7a7] text-sm mb-4">Don't have an account?</p>
              <Link to="/Signn" className="text-[#a7a7a7] hover:text-white hover:underline font-bold uppercase tracking-widest text-sm block">Sign up for Spotify</Link>
           </div>
        </div>
      </div>
      
      <div className="mt-auto text-[10px] text-[#a7a7a7] py-8 text-center px-4 w-full bg-[#121212]">
        This site is protected by re CAPTCHA and the Google&nbsp;
        <a href="#" className="underline hover:text-[#1DB954]">Privacy Policy</a> and&nbsp;
        <a href="#" className="underline hover:text-[#1DB954]">Terms of Service</a> apply.
      </div>
    </div>
  );
}

export default Logg;
