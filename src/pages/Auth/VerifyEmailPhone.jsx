import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/api";
import handleApiError from "../../utils/handleApiError";
import logo from "../../assets/logo.png";
import phones from "../../assets/login.png";
import "react-toastify/dist/ReactToastify.css";

export default function VerifyEmailPhone() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { email: passedEmail, phone: passedPhone } = location.state || {};

  const [formData, setFormData] = useState({
    email: passedEmail || "",
    email_otp: "",
    phone: passedPhone || "",
    phone_otp: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (passedEmail || passedPhone) {
      setFormData((prev) => ({
        ...prev,
        email: passedEmail || prev.email,
        phone: passedPhone || prev.phone,
      }));
    }
  }, [passedEmail, passedPhone]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const sendEmailOtp = async () => {
    if (!formData.email) return toast.error("Enter email first");
    try {
      const res = await api.post("/users/auth/verify_email.php", {
        email: formData.email,
      });
      toast.success(res.data.message || "Email OTP sent!");
    } catch (err) {
      handleApiError(err, (msg) => toast.error(msg));
    }
  };

  const sendPhoneOtp = async () => {
    if (!formData.phone) return toast.error("Enter phone number first");
    try {
      const res = await api.post("/users/auth/verify_phone.php", {
        phone: formData.phone,
      });
      toast.success(res.data.message || "Phone OTP sent!");
    } catch (err) {
      handleApiError(err, (msg) => toast.error(msg));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/users/auth/verify_otp.php", {
        email: formData.email,
        email_otp: formData.email_otp,
        phone: formData.phone,
        phone_otp: formData.phone_otp,
      });

      toast.success(res.data.message || "Verification successful!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      handleApiError(err, (msg) => toast.error(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#FBF5DD] to-[#F8F8F9] flex items-center justify-center px-4 py-10">
      <div className="flex flex-col md:flex-row bg-white rounded-[28px] shadow-lg w-full max-w-5xl overflow-hidden">
        
        {/* LEFT: Verification Form */}
        <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-8">
            <img src={logo} alt="Airtime.ng Logo" className="h-8 object-contain" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[#003049] mb-8">
            Verify Email and Phone Number
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Verification */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Verify Email Address
              </label>

              {formData.email && (
                <p className="text-xs text-[#FFD700] mb-1">
                  Email: <span className="font-medium">{formData.email}</span>
                </p>
              )}

              <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg overflow-hidden mt-2">
                <input
                  type="text"
                  name="email_otp"
                  placeholder="Enter OTP"
                  value={formData.email_otp}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={sendEmailOtp}
                  className="px-3 py-1.5 bg-[#E6F4F1] text-[#003049] font-semibold text-xs rounded-md m-2 hover:bg-[#d9ebe7] transition"
                >
                  Send OTP
                </button>
              </div>
            </div>

            {/* Phone Verification */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Verify Phone Number
              </label>

              {formData.phone && (
                <p className="text-xs text-[#FFD700] mb-1">
                  Phone: <span className="font-medium">{formData.phone}</span>
                </p>
              )}

              <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg overflow-hidden mt-2">
                <input
                  type="text"
                  name="phone_otp"
                  placeholder="Enter OTP"
                  value={formData.phone_otp}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={sendPhoneOtp}
                  className="px-3 py-1.5 bg-[#E6F4F1] text-[#003049] font-semibold text-xs rounded-md m-2 hover:bg-[#d9ebe7] transition"
                >
                  Send OTP
                </button>
              </div>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#003049] text-white py-3 rounded-lg font-semibold hover:bg-[#00243a] transition-all"
            >
              {loading ? "Verifying..." : "Continue"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Have an account?{" "}
              <Link
                to="/login"
                className="text-[#003049] font-medium hover:underline"
              >
                Login Now
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT: Image Section */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-b from-[#FBF5DD] to-[#F8F8F9] items-center justify-center">
          <img
            src={phones}
            alt="Verification Illustration"
            className="w-4/5 object-contain"
          />
        </div>
      </div>
    </section>
  );
}
