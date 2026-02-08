import React, { useState } from "react";

function Verify() {
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");

  const email = new URLSearchParams(window.location.search).get("email");

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp) {
      setMsg("Enter OTP");
      return;
    }

    try {
      const res = await fetch("https://spotify-v5ue.onrender.com/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.message);
        return;
      }

      // ✅ OTP verified → create user
      await fetch("https://spotify-v5ue.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      alert("Signup successful 🎉");
      window.location.href = "/login";

    } catch (err) {
      console.error(err);
      setMsg("Verification failed");
    }
  };

  return (
    <div className="verify-box">
      <h2>Verify OTP</h2>

      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="submit">Verify</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}

export default Verify;
