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
  const [accountNumber, setAccountNumber] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [banks, setBanks] = useState([]);
  const [resolving, setResolving] = useState(false);

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const userImg = "https://ui-avatars.com/api/?name=User&background=random&color=fff";

  // Sidebar items
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

  const user = dashboardData?.user;
  const wallet = dashboardData?.wallet;
  const totalTransactions = dashboardData?.transactions_summary?.total_transactions || 0;
  const withdrawals = dashboardData?.withdrawal_transactions || dashboardData?.recent_withdrawals || [];

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/users/auth/Profile_Details.php");
        if (res.data?.status) setDashboardData(res.data.data.dashboard.data);
        else toast.error("Failed to load dashboard.");
      } catch {
        toast.error("Error loading dashboard.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  // Fetch banks
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await api.get("/users/auth/Get_Bank.php");
        if (res.data?.status && Array.isArray(res.data?.data)) {
          setBanks(res.data.data);
        } else {
          toast.error("Failed to load bank list.");
        }
      } catch {
        toast.error("Error fetching bank list.");
      }
    };
    fetchBanks();
  }, []);

  // Resolve account name after 10-digit account number
  useEffect(() => {
    if (!bankCode || accountNumber.length !== 10) return;

    const timer = setTimeout(async () => {
      setResolving(true);
      try {
        const res = await api.post("/users/auth/Resolve_Bank.php", {
          bank_code: bankCode,
          account_number: accountNumber
        });

        if (res.data?.status && res.data?.data?.account_name) {
          setAccountName(res.data.data.account_name);
        } else {
          setAccountName("");
          toast.error("Unable to verify account.");
        }
      } catch {
        setAccountName("");
        toast.error("Error verifying account.");
      } finally {
        setResolving(false);
      }
    }, 500); // debounce to prevent multiple calls

    return () => clearTimeout(timer);
  }, [bankCode, accountNumber]);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bankCode || !accountNumber || !accountName) return toast.error("Please complete all fields.");

    try {
      const res = await api.post(`${import.meta.env.VITE_API_BASE_URL}/users/auth/Add_Bank.php`, {
        account_name: accountName,
        account_number: accountNumber,
        bank_name: bankName,
        bank_code: bankCode,
        is_default: isDefault ? "1" : "0"
      }, { headers: { Authorization: `Bearer ${token}` } });

      toast.success(res.data?.message || "Bank added successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add bank account. Try again.");
    }
  };

  if (loading) return <CenteredMessage message="Loading..." />;

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar
        user={user}
        wallet={wallet}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarItems={sidebarItems}
        accountDropdownOpen={accountDropdownOpen}
        setAccountDropdownOpen={setAccountDropdownOpen}
        navigate={navigate}
      />

      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/40 z-30 md:hidden" />}

      <main className="flex-1 h-full overflow-y-auto p-6 lg:p-10">
        <DashboardHeader userImg={userImg} user={user} setSidebarOpen={setSidebarOpen} />

        <WalletCard wallet={wallet} totalTransactions={totalTransactions} showBalance={showBalance} setShowBalance={setShowBalance} navigate={navigate} />

        <BankForm
          bankCode={bankCode}
          bankName={bankName}
          setBankCode={setBankCode}
          setBankName={setBankName}
          accountNumber={accountNumber}
          setAccountNumber={setAccountNumber}
          accountName={accountName}
          isDefault={isDefault}
          setIsDefault={setIsDefault}
          banks={banks}
          resolving={resolving}
          handleSubmit={handleSubmit}
        />

        <WithdrawalTable withdrawals={withdrawals} />
      </main>
    </div>
  );
}

const CenteredMessage = ({ message }) => (
  <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
    <p className="text-gray-500">{message}</p>
  </div>
);

const Sidebar = ({ user, wallet, sidebarOpen, setSidebarOpen, sidebarItems, accountDropdownOpen, setAccountDropdownOpen, navigate }) => (
  <aside className={`fixed md:static top-0 left-0 z-40 h-full w-64 bg-[#16404D] text-white flex flex-col justify-between py-6 px-4 transition-all duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
    <div>
      <img src={logo} alt="Logo" className="w-36 h-auto" style={{ filter: "brightness(0) invert(1)" }} />

      <button className="md:hidden text-white absolute top-6 right-4" onClick={() => setSidebarOpen(false)}><X size={24} /></button>

      <div className="border-b border-gray-600/30 pb-4 mt-6 mb-4 text-sm">
        <p className="font-medium">{user?.user_level || "Level 1"} ⭐⭐⭐</p>
        {wallet?.upgrade_available && <button className="text-xs text-[#FBBF24] mt-1">Upgrade Account</button>}
      </div>

      <nav className="space-y-2 text-sm">
        {sidebarItems.map(item => (
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
                    {item.dropdown.map(drop => (
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
              <SidebarItem icon={item.icon} label={item.label} onClick={() => navigate(item.route)} />
            )}
          </div>
        ))}
      </nav>
    </div>

    <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }} className="flex items-center gap-2 text-sm hover:text-[#FBBF24]">
      <LogOut size={16} /> Log Out
    </button>
  </aside>
);

const SidebarItem = ({ icon, label, active, onClick, className = "" }) => (
  <button onClick={onClick} className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition ${active ? "bg-white/10 text-[#FBBF24]" : "hover:bg-white/10"} ${className}`}>
    {icon} {label}
  </button>
);

const DashboardHeader = ({ userImg, user, setSidebarOpen }) => (
  <header className="flex justify-between items-center mb-8">
    <div className="flex items-center gap-3">
      <button className="md:hidden p-2 rounded-md bg-gray-100" onClick={() => setSidebarOpen(true)}>
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
);

const WalletCard = ({ wallet, totalTransactions, showBalance, setShowBalance, navigate }) => (
  <section className="bg-white rounded-2xl shadow-sm p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10">
    <div className="flex-1 min-w-[200px]">
      <h3 className="text-gray-500 text-sm mb-1">Wallet Balance</h3>
      <div className="flex items-center gap-3 mb-3">
        <p className="text-3xl font-bold text-gray-900">₦{showBalance ? wallet?.balance : "•••••••"}</p>
        <button onClick={() => setShowBalance(prev => !prev)} className="text-gray-500 hover:text-gray-700 transition">
          {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>

    <div className="text-center md:text-left flex-1 min-w-[200px]">
      <p className="text-gray-500 text-sm">Total Transactions</p>
      <h4 className="text-2xl font-semibold">{totalTransactions}</h4>
      <button className="text-[#F59E0B] text-sm mt-2 flex items-center gap-1 mx-auto md:mx-0" onClick={() => navigate("/fund-wallet")}>
        Fund Wallet <ArrowRight size={14} />
      </button>
    </div>

    <div className="bg-[#16404D] text-white p-4 rounded-xl flex flex-col items-center text-center min-w-[220px]">
      <p className="text-sm opacity-80 mb-1">Daily Limit</p>
      <div className="font-semibold mb-2">
        ₦{Number(wallet?.limits?.used_today || 0).toLocaleString()} / ₦{Number(wallet?.limits?.daily_transaction_limit || 0).toLocaleString()}
      </div>
      {wallet?.upgrade_available && <button className="bg-[#FBBF24] text-black text-xs px-3 py-1 rounded-md">Upgrade Account</button>}
    </div>
  </section>
);

const BankForm = ({
  bankCode,
  bankName,
  setBankCode,
  setBankName,
  accountNumber,
  setAccountNumber,
  accountName,
  isDefault,
  setIsDefault,
  banks,
  resolving,
  handleSubmit
}) => {
  const canSubmit = bankCode && accountNumber.length === 10 && accountName && !resolving;

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm max-w-xl mx-auto space-y-5 border">
      <h3 className="text-xl font-semibold">Bank Account Details</h3>

      {/* SELECT BANK */}
      <div>
        <label className="block mb-1 font-medium">Select Bank</label>
        <select
          value={bankCode}
          onChange={(e) => {
            setBankCode(e.target.value);
            const selected = banks.find(b => b.code === e.target.value);
            setBankName(selected?.name || "");
          }}
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="">-- Choose Bank --</option>
          {banks.map(bank => (
            <option key={`${bank.id}-${bank.code}`} value={bank.code}>
              {bank.name}
            </option>
          ))}
        </select>
      </div>

      {/* ACCOUNT NUMBER */}
      <div>
        <label className="block mb-1 font-medium">Account Number</label>
        <input
          type="text"
          maxLength={10}
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Enter 10-digit account number"
        />
      </div>

      {/* ACCOUNT NAME */}
      {accountNumber.length === 10 && (
        <div className="mt-3">
          <label className="block mb-1 font-medium">Account Name</label>
          <input
            type="text"
            value={resolving ? "Verifying..." : accountName}
            readOnly
            className={`w-full px-3 py-2 border rounded-lg ${resolving ? "bg-gray-100" : "bg-gray-50"}`}
          />
        </div>
      )}

      {/* DEFAULT CHECKBOX */}
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)} />
        <label>Set as default account</label>
      </div>

      <button
        type="submit"
        className={`w-full py-3 rounded-lg text-lg text-white ${canSubmit ? "bg-[#093645]" : "bg-gray-400 cursor-not-allowed"}`}
        disabled={!canSubmit}
      >
        {resolving ? "Verifying..." : "Add Bank Account"}
      </button>
    </form>
  );
};

const WithdrawalTable = ({ withdrawals }) => (
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
        {withdrawals?.length > 0 ? withdrawals.map(tx => (
          <tr key={tx.id} className="border-b">
            <td className="py-2">{new Date(tx.date).toLocaleDateString()}</td>
            <td className="py-2">₦{Number(tx.amount).toLocaleString()}</td>
            <td className="py-2">{tx.bank_name}</td>
            <td className="py-2 capitalize">{tx.status}</td>
          </tr>
        )) : (
          <tr>
            <td colSpan="4" className="py-4 text-center text-gray-500">No withdrawal transactions found.</td>
          </tr>
        )}
      </tbody>
    </table>
  </section>
);
