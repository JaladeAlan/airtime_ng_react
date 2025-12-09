import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import toast from "react-hot-toast";
import handleApiError from "../../utils/handleApiError"; 
import logo from "../../assets/logo.png";
import phones from "../../assets/login.png";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  // Handle input updates
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit and backend auth
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/users/auth/login.php", form);

      if (res.data.status) { 
        const token = res.data.data.token; 
        localStorage.setItem("token", token);

        toast.success("Login successful!");
        navigate("/dashboard");   
      } else {
        toast.error(res.data.text || "Invalid email or password.");
      }
    } catch (err) {
      handleApiError(err, (msg) => {
        setError(msg);
        toast.error(msg);
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="min-h-screen w-full grid md:grid-cols-[55%_45%] bg-white">
      {/* Left Side — Login Form */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-white"
      >
        <div className="flex justify-start">
          <img
            src={logo}
            alt="Airtime.ng Logo"
            className="h-10 w-auto mb-8 object-contain"
          />
        </div>

        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Login With Email
        </h2>

        {/* Display local error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#134E4A]"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#134E4A]"
          />

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-[#134E4A] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#134E4A] text-white py-3 rounded-lg font-medium transition ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#0d3a38]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Not yet a user?{" "}
          <Link
            to="/register"
            className="text-[#134E4A] font-medium hover:underline"
          >
            Create Account
          </Link>
        </p>
      </motion.div>

      {/* Right Side — Image */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="hidden md:flex items-center justify-center bg-[#f9fafb]"
      >
        <img
          src={phones}
          alt="App Preview"
          className="w-[80%] max-w-lg object-contain drop-shadow-2xl"
        />
      </motion.div>
    </section>
  );
}
