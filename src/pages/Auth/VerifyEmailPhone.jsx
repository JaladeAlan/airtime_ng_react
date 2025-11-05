import { useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import handleApiError from "../../utils/handleApiError";
import logo from "../../assets/logo.png";
import phones from "../../assets/login.png";

export default function VerifyEmailPhone() {
  const [formData, setFormData] = useState({
    email: "",
    email_otp: "",
    phone: "",
    phone_otp: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmailOtp = async () => {
    if (!formData.email) {
      toast.error("Enter email first");
      return;
    }
    try {
      const res = await api.post("/users/auth/send_email_otp.php", {
        email: formData.email,
      });
      toast.success(res.data.message || "Email OTP sent!");
    } catch (err) {
      handleApiError(err, "Error sending email OTP");
    }
  };

  const sendPhoneOtp = async () => {
    if (!formData.phone) {
      toast.error("Enter phone number first");
      return;
    }
    try {
      const res = await api.post("/users/auth/send_phone_otp.php", {
        phone: formData.phone,
      });
      toast.success(res.data.message || "Phone OTP sent!");
    } catch (err) {
      handleApiError(err, "Error sending phone OTP");
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
    } catch (err) {
      handleApiError(err, "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#FBF5DD] to-[#F8F8F9] flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-[30px] shadow-md w-full max-w-4xl overflow-hidden">
        {/* Left: Verification form */}
        <div className="w-full md:w-1/2 p-8 md:p-10">
          <img src={logo} alt="Airtime.ng Logo" className="h-8 mb-8" />
          <h2 className="text-2xl font-bold text-[#003049] mb-6">
            Verify Email and Phone Number
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email OTP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Verify Email Address
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#003049]"
                />
                <button
                  type="button"
                  onClick={sendEmailOtp}
                  className="bg-[#003049] text-white px-4 rounded-lg hover:bg-[#00243a]"
                >
                  Send OTP
                </button>
              </div>
              <input
                type="text"
                name="email_otp"
                placeholder="Enter OTP"
                value={formData.email_otp}
                onChange={handleChange}
                className="mt-3 w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#003049]"
              />
            </div>

            {/* Phone OTP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Verify Phone Number
              </label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#003049]"
                />
                <button
                  type="button"
                  onClick={sendPhoneOtp}
                  className="bg-[#003049] text-white px-4 rounded-lg hover:bg-[#00243a]"
                >
                  Send OTP
                </button>
              </div>
              <input
                type="text"
                name="phone_otp"
                placeholder="Enter OTP"
                value={formData.phone_otp}
                onChange={handleChange}
                className="mt-3 w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#003049]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#003049] text-white py-3 rounded-lg hover:bg-[#00243a] transition font-semibold"
            >
              {loading ? "Verifying..." : "Continue"}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Have an account?{" "}
              <a href="/login" className="text-[#003049] font-medium hover:underline">
                Login Here
              </a>
            </p>
          </form>
        </div>

        {/* Right: illustration */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-b from-[#FBF5DD] to-[#F8F8F9] items-center justify-center">
          <img src={phones} alt="Phones illustration" className="w-3/4 object-contain" />
        </div>
      </div>
    </section>
  );
}
