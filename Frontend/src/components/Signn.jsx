import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";

function Signn() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // OTP State
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  // EmailJS settings
  const SERVICE_ID = "service_e9z5978";
  const TEMPLATE_ID = "template_o6mo61t";
  const USER_ID = "Fw-dkdAjrbgVJetRU"; 

  // Step 1: Request OTP & Send Email
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !username || !password || !confirmPassword) {
      alert("Please fill all fields!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      console.log(`[DEBUG] Frontend Requesting OTP - User: ${username}, Pass: ${password}`);

      // 1. Request OTP from Backend
      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP from server");
      }

      console.log("Server OTP Response:", data);
      const otpCode = data.otp; 

      // 2. Send Email via EmailJS
      const templateParams = {
        username,
        email,
        otp: otpCode,
        password,
      };

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        USER_ID
      );

      alert(`OTP sent to ${email}. Please check your inbox.`);
      setIsOtpSent(true); 

    } catch (error) {
      console.error("Signup/Email Error:", error);
      alert(error.message || "Failed to sign up. Try again!");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      alert("Please enter the OTP!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid OTP");
      }

      console.log("OTP Verification Success:", data);
      alert("Account created successfully! Redirecting to login...");
      
      navigate("/Logg"); 
      setIsOtpSent(false);
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setOtp("");

    } catch (error) {
      console.error("OTP Verification Error:", error);
      alert(error.message || "Failed to verify OTP.");
    }
  };

  return (
    <div className="bg-[#121212] min-h-screen flex flex-col justify-center items-center font-sans text-white p-4">
      <div className="w-full max-w-[450px] flex flex-col items-center">
        <div className="mb-8">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
            alt="Spotify"
            className="w-12 h-12"
          />
        </div>

        <h1 className="text-3xl md:text-5xl font-bold mb-10 text-center tracking-tight leading-tight">
          {isOtpSent ? "Enter OTP" : <>Sign up to <br /> start listening</>}
        </h1>

        {!isOtpSent ? (
          // === SIGNUP FORM ===
          <form onSubmit={handleSignup} className="w-full max-w-[324px] flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Email address</label>
              <input
                type="email"
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-3 bg-[#121212] border border-[#878787] rounded text-white placeholder-[#878787] hover:border-white focus:border-white focus:outline-none transition-colors text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="p-3 bg-[#121212] border border-[#878787] rounded text-white placeholder-[#878787] hover:border-white focus:border-white focus:outline-none transition-colors text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-3 bg-[#121212] border border-[#878787] rounded text-white placeholder-[#878787] hover:border-white focus:border-white focus:outline-none transition-colors text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="p-3 bg-[#121212] border border-[#878787] rounded text-white placeholder-[#878787] hover:border-white focus:border-white focus:outline-none transition-colors text-sm"
              />
            </div>

            <button className="w-full bg-[#1DB954] text-black font-bold py-3.5 rounded-full hover:scale-105 hover:bg-[#1ed760] transition-transform text-sm uppercase tracking-widest mt-4" type="submit">
              Next
            </button>
            
            <div className="text-center mt-4 border-t border-[#292929] pt-6">
               <p className="text-[#a7a7a7] text-sm">Have an account? <a href="/Logg" className="text-white hover:underline">Log in</a></p>
            </div>
          </form>
        ) : (
          // === OTP VERIFICATION FORM ===
          <form onSubmit={handleVerifyOtp} className="w-full max-w-[324px] flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Enter 6-Digit OTP</label>
              <input
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
                required
                className="p-3 bg-[#121212] border border-[#878787] rounded text-white text-center text-xl tracking-[0.5em] placeholder-[#878787] hover:border-white focus:border-white focus:outline-none transition-colors"
              />
            </div>

            <button className="w-full bg-[#1DB954] text-black font-bold py-3.5 rounded-full hover:scale-105 hover:bg-[#1ed760] transition-transform text-sm uppercase tracking-widest" type="submit">
              Verify & Create Account
            </button>

            <p 
              onClick={() => setIsOtpSent(false)} 
              className="text-[#b3b3b3] text-sm text-center cursor-pointer hover:text-white hover:underline transition-colors mt-2"
            >
              Wrong email? Go back
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Signn;
