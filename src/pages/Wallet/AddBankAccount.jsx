import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddBankAccount({ onSuccess }) {
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (!accountName || !accountNumber || !bankName || !bankCode) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/auth/Add_Bank.php`,
        {
          account_name: accountName,
          account_number: accountNumber,
          bank_name: bankName,
          bank_code: bankCode,
          is_default: isDefault ? "1" : "0",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data?.message || "Bank Added Successfully");

      // Notify parent to refresh list
      if (onSuccess) onSuccess();

      // Reset fields
      setAccountName("");
      setAccountNumber("");
      setBankName("");
      setBankCode("");
      setIsDefault(false);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Failed to add bank account. Try again.";
      toast.error(msg);
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-xl border shadow-sm max-w-xl mx-auto space-y-5"
    >
      <h2 className="text-xl font-semibold">Add Bank Account</h2>

      {/* Bank Name */}
      <div>
        <label className="block mb-1">Select Bank</label>
        <input
          type="text"
          placeholder="Enter Bank Name"
          className="w-full px-3 py-2 border rounded-lg"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
        />
      </div>

      {/* Bank Code */}
      <div>
        <label className="block mb-1">Bank Code</label>
        <input
          type="text"
          placeholder="Bank Code"
          className="w-full px-3 py-2 border rounded-lg"
          value={bankCode}
          onChange={(e) => setBankCode(e.target.value)}
        />
      </div>

      {/* Account Number */}
      <div>
        <label className="block mb-1">Account Number</label>
        <input
          type="number"
          placeholder="Enter Account Number"
          className="w-full px-3 py-2 border rounded-lg"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
      </div>

      {/* Account Name */}
      <div>
        <label className="block mb-1">Account Name</label>
        <input
          type="text"
          placeholder="e.g. Johnson Emmanuel"
          className="w-full px-3 py-2 border rounded-lg"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
      </div>

      {/* Default Toggle */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
        />
        <label>Set as default account</label>
      </div>

      <button
        type="submit"
        className="w-full bg-[#093645] text-white py-3 rounded-lg text-lg font-medium"
        disabled={loading}
      >
        {loading ? "Saving..." : "Add Account Number"}
      </button>
    </form>
  );
}
