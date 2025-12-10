import { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Wallet,
  ArrowRight,
  LogOut,
  Signal,
  Smartphone,
  Wifi,
  Bell,
  ChevronRight,
  Menu,
  X,
  CreditCard,
  DollarSign,
  List,
  Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/api";
import logo from "../../assets/logo.png";

export default function AddBankAccount() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Form states
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  // Dashboard data states
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  // UI states
  const [showBalance, setShowBalance] = useState(true);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const userImg =
    "https://ui-avatars.com/api/?name=User&background=random&color=fff";

  // Fetch all dashboard data + withdrawals from the same endpoint
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/users/auth/Profile_Details.php");

        if (res.data?.status) {
          setDashboardData(res.data.data.dashboard.data);
        } else {
          toast.error("Failed to load dashboard.");
        }
      } catch (err) {
        toast.error("Error loading dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const user = dashboardData?.user;
  const wallet = dashboardData?.wallet;
  const totalTransactions =
    dashboardData?.transactions_summary?.total_transactions || 0;

  const withdrawals =
    dashboardData?.withdrawal_transactions ||
    dashboardData?.recent_withdrawals ||
    [];

  const sidebarItems = [
    { label: "Dashboard", icon: <Wallet size={16} />, route: "/dashboard" },
    { label: "Airtime To Cash", icon: <Smartphone size={16} />, route: "/airtime-to-cash" },
    { label: "Buy Airtime", icon: <Signal size={16} />, route: "/buy-airtime" },
    { label: "Airtime Campaigns", icon: <Wifi size={16} />, route: "/airtime-campaigns" },
    {
      label: "My Account",
      icon: <ChevronRight size={16} />,
      dropdown: [
        { label: "Fund Wallet", icon: <CreditCard size={16} />, route: "/fund-wallet" },
        { label: "Withdraw", icon: <DollarSign size={16} />, route: "/withdraw" },
        { label: "Transaction History", icon: <List size={16} />, route: "/transactions" },
        { label: "Account Settings", icon: <Settings size={16} />, route: "/account-settings" }
      ]
    }
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    if (!accountName || !accountNumber || !bankName || !bankCode) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/auth/Add_Bank.php`,
        {
          account_name: accountName,
          account_number: accountNumber,
          bank_name: bankName,
          bank_code: bankCode,
          is_default: isDefault ? "1" : "0"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success(response.data?.message || "Bank added successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to add bank account. Try again."
      );
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">

      {/* SIDEBAR */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 h-full w-64 bg-[#16404D] text-white flex flex-col justify-between py-6 px-4 transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          <img
            src={logo}
            alt="Logo"
            className="w-36 h-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />

          <button
            className="md:hidden text-white absolute top-6 right-4"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>

          <div className="border-b border-gray-600/30 pb-4 mt-6 mb-4 text-sm">
            <p className="font-medium">{user?.user_level || "Level 1"} ⭐⭐⭐</p>

            {wallet?.upgrade_available && (
              <button className="text-xs text-[#FBBF24] mt-1">Upgrade Account</button>
            )}
          </div>

          <nav className="space-y-2 text-sm">
            {sidebarItems.map((item) => (
              <div key={item.label}>
                {item.dropdown ? (
                  <>
                    <SidebarItem
                      icon={item.icon}
                      label={item.label}
                      active={accountDropdownOpen}
                      onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                    />
                    {accountDropdownOpen && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.dropdown.map((drop) => (
                          <SidebarItem
                            key={drop.label}
                            icon={drop.icon}
                            label={drop.label}
                            onClick={() => navigate(drop.route)}
                            className="text-gray-300 hover:text-[#FBBF24]"
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <SidebarItem
                    icon={item.icon}
                    label={item.label}
                    onClick={() => navigate(item.route)}
                  />
                )}
              </div>
            ))}
          </nav>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="flex items-center gap-2 text-sm hover:text-[#FBBF24]"
        >
          <LogOut size={16} /> Log Out
        </button>
      </aside>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 h-full overflow-y-auto p-6 lg:p-10">

        {/* DASHBOARD HEADER */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-md bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <h2 className="text-2xl font-semibold">Dashboard</h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 bg-gray-100 rounded-full">
              <Bell size={18} />
            </button>

            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1">
              <img src={userImg} className="h-8 w-8 rounded-full" />
              <span className="text-sm text-gray-600">Welcome, {user?.first_name}</span>
            </div>
          </div>
        </header>

        {/* WALLET CARD */}
        <section className="bg-white rounded-2xl shadow-sm p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10">
          {/* Balance */}
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-gray-500 text-sm mb-1">Wallet Balance</h3>

            <div className="flex items-center gap-3 mb-3">
              <p className="text-3xl font-bold text-gray-900">
                ₦{showBalance ? wallet?.balance : "•••••••"}
              </p>

              <button
                onClick={() => setShowBalance((prev) => !prev)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Total Transactions */}
          <div className="text-center md:text-left flex-1 min-w-[200px]">
            <p className="text-gray-500 text-sm">Total Transactions</p>
            <h4 className="text-2xl font-semibold">{totalTransactions}</h4>

            <button
              className="text-[#F59E0B] text-sm mt-2 flex items-center gap-1 mx-auto md:mx-0"
              onClick={() => navigate("/fund-wallet")}
            >
              Fund Wallet <ArrowRight size={14} />
            </button>
          </div>

          {/* Daily Limit */}
          <div className="bg-[#16404D] text-white p-4 rounded-xl flex flex-col items-center text-center min-w-[220px]">
            <p className="text-sm opacity-80 mb-1">Daily Limit</p>

            <div className="font-semibold mb-2">
              ₦{Number(wallet?.limits?.used_today || 0).toLocaleString()} / ₦
              {Number(wallet?.limits?.daily_transaction_limit || 0).toLocaleString()}
            </div>

            {wallet?.upgrade_available && (
              <button className="bg-[#FBBF24] text-black text-xs px-3 py-1 rounded-md">
                Upgrade Account
              </button>
            )}
          </div>
        </section>

        {/* ADD BANK ACCOUNT FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-sm max-w-xl mx-auto space-y-5 border"
        >
          <h3 className="text-xl font-semibold">Bank Account Details</h3>

          <InputField label="Bank Name" value={bankName} onChange={setBankName} />
          <InputField label="Bank Code" value={bankCode} onChange={setBankCode} />
          <InputField label="Account Number" type="number" value={accountNumber} onChange={setAccountNumber} />
          <InputField label="Account Name" value={accountName} onChange={setAccountName} />

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
            className="w-full bg-[#093645] text-white py-3 rounded-lg text-lg"
          >
            Add Bank Account
          </button>
        </form>

        {/* WITHDRAWAL TRANSACTIONS TABLE */}
        <section className="bg-white mt-10 p-6 rounded-xl shadow-sm border max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Withdrawal Transactions</h3>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2">Date</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Bank</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals?.length > 0 ? (
                withdrawals.map((tx) => (
                  <tr key={tx.id} className="border-b">
                    <td className="py-2">{tx.date}</td>
                    <td className="py-2">₦{Number(tx.amount).toLocaleString()}</td>
                    <td className="py-2">{tx.bank_name}</td>
                    <td className="py-2 capitalize">{tx.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    No withdrawal transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

/* SidebarItem */
function SidebarItem({ icon, label, active, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition 
      ${active ? "bg-white/10 text-[#FBBF24]" : "hover:bg-white/10"} ${className}`}
    >
      {icon}
      {label}
    </button>
  );
}

/* InputField */
function InputField({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block mb-1">{label}</label>
      <input
        type={type}
        className="w-full px-3 py-2 border rounded-lg"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
