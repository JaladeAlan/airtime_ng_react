import { useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("users/auth/register.php", formData);
      toast.success(res.data.message || "Registration successful!");
      setFormData({
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
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              type={
                key.includes("password")
                  ? "password"
                  : key === "email"
                  ? "email"
                  : "text"
              }
              name={key}
              placeholder={key.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              value={formData[key]}
              onChange={handleChange}
              required={key !== "referrer"}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1E3A8A] outline-none"
            />
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1E3A8A] text-white py-2 rounded-lg hover:bg-[#172a6d] transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
}
