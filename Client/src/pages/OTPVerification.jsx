// src/pages/OTPVerification.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaKey } from "react-icons/fa";
import background from "../assets/Forex_First_Page.jpeg";

const API_URL = "https://stock-prediciton-rp3w.onrender.com";

export default function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  // Redirect to forgot-password if no email
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/reset-password`, { email, otp });
      if (res.data.success) {
        navigate("/reset-password", { state: { email } });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
    setLoading(false);
  };

  const handleResend = async () => {
    try {
      await axios.post(`${API_URL}/auth/resend-otp`, { email });
      alert("OTP resent to your email!");
    } catch {
      alert("Failed to resend OTP. Try again later.");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center animate-pulse-slow"
        style={{ backgroundImage: `url(${background})` }}
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Navbar */}
      <nav className="relative z-10 flex justify-center p-6">
        <h1 className="text-4xl font-extrabold text-green-400 drop-shadow-lg tracking-widest animate-glow">
          Trend<span className="text-white">Titan</span>
        </h1>
      </nav>

      {/* OTP Card */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-black/50 p-8 rounded-3xl border border-green-400/40 shadow-[0_0_25px_rgba(34,197,94,0.6)] animate-fadeIn backdrop-blur-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-400 tracking-wide animate-pulse">
            Verify OTP
          </h2>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleVerifyOTP} className="space-y-5">
            <div className="relative group">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 pl-12 border border-green-400/50 rounded-xl bg-black/40 placeholder-green-300 text-white focus:outline-none focus:ring-2 focus:ring-green-400 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.7)] transition"
                required
              />
              <FaKey className="absolute left-4 top-3.5 text-green-400" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-black bg-green-400 hover:bg-green-500 transition transform hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.7)] animate-bounce"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <div className="mt-4 text-center text-green-300 text-sm">
            Didn't receive OTP?{" "}
            <span
              className="text-green-400 hover:underline cursor-pointer"
              onClick={handleResend}
            >
              Resend
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

