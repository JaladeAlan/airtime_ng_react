import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../utils/api";
import handleApiError from "../../utils/handleApiError";

import logo from "../../assets/logo.png";
import phones from "../../assets/login.png";

export default function ForgotPassword() {
  const navigate = useNavigate(); 
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    reset_code: "",
    new_password: "",
    confirm_new_password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSendResetCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/users/auth/forgot_password.php", {
        email: formData.email,
      });
      toast.success(res.data.message || "Reset code sent to your email!");
      setStep(2);
    } catch (err) {
      handleApiError(err, setError);
      toast.error(err?.response?.data?.message || "Failed to send reset code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/users/auth/forgot_password_verify.php", {
        email: formData.email,
        reset_code: formData.reset_code,
      });
      toast.success(res.data.message || "Code verified successfully!");
      setStep(3);
    } catch (err) {
      handleApiError(err, setError);
      toast.error(err?.response?.data?.message || "Failed to verify code");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.new_password !== formData.confirm_new_password) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/users/auth/forgot_password_set.php", {
        email: formData.email,
        new_password: formData.new_password,
        confirm_new_password: formData.confirm_new_password,
      });
      toast.success(res.data.message || "Password reset successful!");
      // Reset form
      setStep(1);
      setFormData({
        email: "",
        reset_code: "",
        new_password: "",
        confirm_new_password: "",
      });
      // Redirect to login
      setTimeout(() => navigate("/login"), 3000); 
    } catch (err) {
      handleApiError(err, setError);
      toast.error(err?.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="min-h-screen bg-gradient-to-r from-[#FBF5DD] to-[#F8F8F9] flex items-center justify-center px-4">
        <div className="flex flex-col md:flex-row bg-white rounded-[30px] shadow-md w-full max-w-4xl overflow-hidden">
          <div className="w-full md:w-1/2 p-8 md:p-10">
            <img src={logo} alt="Airtime.ng Logo" className="h-8 mb-8" />

            {step === 1 && (
              <>
                <h2 className="text-2xl font-bold text-[#003049] mb-6">
                  Forgot Password?
                </h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSendResetCode} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enter your email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#003049]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#003049] text-white py-3 rounded-lg hover:bg-[#00243a] transition font-semibold"
                  >
                    {loading ? "Sending..." : "Send Reset Code"}
                  </button>
                </form>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-2xl font-bold text-[#003049] mb-6">
                  Enter OTP
                </h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleVerifyCode} className="space-y-5">
                  <p className="text-gray-600 text-sm">
                    We sent a 6-digit code to <strong>{formData.email}</strong>.
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enter Code
                    </label>
                    <input
                      type="text"
                      name="reset_code"
                      maxLength={6}
                      value={formData.reset_code}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setFormData({ ...formData, reset_code: value });
                        setError("");
                      }}
                      required
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none 
                                focus:ring-2 focus:ring-[#003049] tracking-widest text-center"
                    />

                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#003049] text-white py-3 rounded-lg hover:bg-[#00243a] transition font-semibold"
                  >
                    {loading ? "Verifying..." : "Verify Code"}
                  </button>
                </form>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-2xl font-bold text-[#003049] mb-6">
                  Reset Password
                </h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleResetPassword} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="new_password"
                      value={formData.new_password}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#003049]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirm_new_password"
                      value={formData.confirm_new_password}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#003049]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#003049] text-white py-3 rounded-lg hover:bg-[#00243a] transition font-semibold"
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                </form>
              </>
            )}
          </div>

          <div className="hidden md:flex w-1/2 bg-gradient-to-b from-[#FBF5DD] to-[#F8F8F9] items-center justify-center">
            <img src={phones} alt="Phones illustration" className="w-3/4" />
          </div>
        </div>
      </section>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
}
