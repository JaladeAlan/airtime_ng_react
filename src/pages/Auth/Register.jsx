import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import toast from "react-hot-toast";
import handleApiError from "../../utils/handleApiError";

import logo from "../../assets/logo.png";
import phones from "../../assets/login.png";

export default function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    bankname: "",
    accountno: "",
    referrer: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 👈 for redirect

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/users/auth/register.php", formData);
      toast.success(res.data.message || "Registration successful!");

      //  Redirect to Verify page with email + phone
      navigate("/verify", {
        state: {
          email: formData.email,
          phone: formData.phone,
        },
      });
    } catch (err) {
      handleApiError(err, "Registration failed", setError);
      toast.error(error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#FBF5DD] to-[#F8F8F9] flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-[30px] shadow-md w-full max-w-5xl overflow-hidden">
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-10">
          {/* Logo */}
          <div className="mb-8">
            <img src={logo} alt="Airtime.ng Logo" className="h-8 object-contain" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[#003049] mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First + Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#003049]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#003049]"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Create Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#003049]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
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

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#003049]"
              />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
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
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#003049]"
                />
              </div>
            </div>

            {/* Bank Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name
              </label>
              <select
                name="bankname"
                value={formData.bankname}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#003049]"
              >
                <option value="">Choose Bank</option>
                <option value="Access Bank">Access Bank</option>
                <option value="GTBank">GTBank</option>
                <option value="UBA">UBA</option>
                <option value="Zenith Bank">Zenith Bank</option>
              </select>
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Number
              </label>
              <input
                type="text"
                name="accountno"
                value={formData.accountno}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#003049]"
              />
            </div>

            {/* Referrer */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Referrer (Optional)
              </label>
              <input
                type="text"
                name="referrer"
                value={formData.referrer}
                onChange={handleChange}
                placeholder="Enter referral code"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#003049]"
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#003049] text-white py-3 rounded-lg hover:bg-[#00243a] transition font-semibold"
            >
              {loading ? "Registering..." : "Create Account"}
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Have an account?{" "}
              <a href="/login" className="text-[#003049] font-medium hover:underline">
                Login Here
              </a>
            </p>
          </form>
        </div>

        {/* Right Illustration Section */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-b from-[#FBF5DD] to-[#F8F8F9] items-center justify-center">
          <img src={phones} alt="Phones illustration" className="w-3/4 object-contain" />
        </div>
      </div>
    </section>
  );
}
