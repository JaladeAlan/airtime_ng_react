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
    import api from "../utils/api";
    import toast from "react-hot-toast";
    import logo from "../assets/logo.png";
    import userImg from "../assets/user.png";

    export default function Dashboard() {
      const [showBalance, setShowBalance] = useState(true);
      const [sidebarOpen, setSidebarOpen] = useState(false);
      const [loading, setLoading] = useState(true);
      const [dashboardData, setDashboardData] = useState(null);
      const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
      const [transactionFilter, setTransactionFilter] = useState("All Transactions");

      const navigate = useNavigate();

      // Fetch dashboard data
      useEffect(() => {
        const fetchDashboard = async () => {
          try {
            const res = await api.get("/users/auth/Profile_Details.php");

            if (res.data?.status && res.data?.data?.dashboard?.data) {
              setDashboardData(res.data.data.dashboard.data);
            } else {
              toast.error("Failed to fetch dashboard data");
            }
          } catch (err) {
            toast.error("Error fetching dashboard data");
          } finally {
            setLoading(false);
          }
        };

        fetchDashboard();
      }, []);

      if (loading) {
        return (
          <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
            <p className="text-gray-500">Loading dashboard...</p>
          </div>
        );
      }

      const user = dashboardData?.user;
      const wallet = dashboardData?.wallet;
      const transactions = dashboardData?.recent_transactions || [];
      const totalTransactions =
        dashboardData?.transactions_summary?.total_transactions || 0;

      // Map select options to backend transaction_type values
      const filterMap = {
        "All Transactions": null,
        "Buy Airtime": "airtime",
        "Airtime to Cash": "airtime_to_cash",
        "Bulk Airtime": "bulk_airtime",
        "Wallet Top up": "wallet_topup",
        "Withdrawals": "withdrawal",
      };

      const filteredTransactions = transactions.filter((tx) => {
        const type = filterMap[transactionFilter];
        if (!type) return true;   
        return tx.transaction_type === type;
      });

      // Sidebar items dynamically defined
      const sidebarItems = [
        { label: "Dashboard", icon: <Wallet size={16} />, route: "/dashboard", active: true },
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
            { label: "Account Settings", icon: <Settings size={16} />, route: "/account-settings" },
          ]
        },
      ];

      // Quick Actions dynamically defined
      const quickActions = [
        {
          title: "Airtime to Cash",
          desc: "Convert your airtime to cash instantly",
          icon: <Smartphone size={22} />,
          route: "/airtime-to-cash",
        },
        {
          title: "Buy Airtime",
          desc: "Get bulk airtime at the cheapest rate",
          icon: <Signal size={22} />,
          route: "/buy-airtime",
        },
        {
          title: "Airtime Campaigns",
          desc: "Participate in campaigns to convert airtime to cash",
          icon: <Wifi size={22} />,
          route: "/airtime-campaigns",
        },
      ];

      // Helper to prettify transaction_type
      const prettyTransactionType = (type) => {
        switch (type) {
          case "airtime": return "Buy Airtime";
          case "airtime_to_cash": return "Airtime to Cash";
          case "bulk_airtime": return "Bulk Airtime";
          case "wallet_topup": return "Wallet Top up";
          case "withdrawal": return "Withdrawals";
          default: return type;
        }
      };

      return (
        <div className="flex h-screen bg-[#F8FAFC] text-gray-900 overflow-hidden">
          {/* SIDEBAR */}
          <aside
            className={`fixed md:static top-0 left-0 z-40 h-full w-64 bg-[#16404D] text-white flex flex-col justify-between py-6 px-4 transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            }`}
          >
            <div>
              <img
                src={logo}
                alt="Airtime.ng"
                className="w-36 h-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <div className="relative mt-6 mb-8">
                <button
                  className="md:hidden text-white absolute top-6 right-4"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close sidebar"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="border-b border-gray-600/30 pb-4 mb-6 text-sm">
                <p className="font-medium">{user?.user_level || "Level 1"} ⭐⭐⭐</p>
                {wallet?.upgrade_available && (
                  <button className="text-xs text-[#FBBF24] mt-1">Upgrade Account</button>
                )}
              </div>

              {/* Sidebar Navigation */}
              <nav className="space-y-2 text-sm">
                {sidebarItems.map((item) => {
                  if (item.dropdown) {
                    return (
                      <div key={item.label}>
                        <SidebarItem
                          icon={item.icon}
                          label={item.label}
                          active={accountDropdownOpen}
                          onClick={() => setAccountDropdownOpen((prev) => !prev)}
                        />
                        {accountDropdownOpen && (
                          <div className="ml-6 mt-1 space-y-1">
                            {item.dropdown.map((subItem) => (
                              <SidebarItem
                                key={subItem.label}
                                icon={subItem.icon}
                                label={subItem.label}
                                onClick={() => navigate(subItem.route)}
                                className="text-sm text-gray-200 hover:text-[#FBBF24]"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <SidebarItem
                      key={item.label}
                      icon={item.icon}
                      label={item.label}
                      active={item.active}
                      onClick={() => navigate(item.route)}
                    />
                  );
                })}
              </nav>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="flex items-center gap-2 text-sm mt-auto hover:text-[#FBBF24] transition-colors"
            >
              <LogOut size={16} />
              Log Out
            </button>
          </aside>

         
         

          {/* MAIN CONTENT */}
          <main className="flex-1 flex flex-col h-full overflow-y-auto px-6 lg:px-10 py-6">
            {/* HEADER */}
            <header className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <button
                  className="md:hidden p-2 rounded-md bg-gray-100"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open sidebar"
                >
                  <Menu size={20} />
                </button>
                <h2 className="text-2xl font-semibold">Dashboard</h2>
              </div>

              <div className="flex items-center gap-4">
                <button className="relative p-2 bg-gray-100 rounded-full">
                  <Bell size={18} />
                </button>
                <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1">
                  <img src={userImg} alt="User pic" className="h-8 w-8 rounded-full" />
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

            {/* QUICK ACTIONS */}
            <section className="mb-10">
              <h3 className="text-lg font-medium mb-4">What would you like to do?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickActions.map((action) => (
                  <QuickAction
                    key={action.title}
                    icon={action.icon}
                    title={action.title}
                    desc={action.desc}
                    onClick={() => navigate(action.route)}
                  />
                ))}
              </div>
            </section>

            {/* RECENT TRANSACTIONS */}
            <section className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-md font-semibold">Recent Transactions</h4>
                <select
                  className="text-sm border rounded-lg px-3 py-1"
                  value={transactionFilter}
                  onChange={(e) => setTransactionFilter(e.target.value)}
                >
                  {Object.keys(filterMap).map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              {filteredTransactions.length > 0 ? (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Details</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((tx) => (
                        <tr key={tx.id} className="border-b last:border-0">
                          <td className="px-4 py-3">{prettyTransactionType(tx.transaction_type)}</td>
                          <td className="px-4 py-3">₦{tx.transaction_amount}</td>
                          <td className="px-4 py-3">{tx.transaction_details}</td>
                          <td className="px-4 py-3 capitalize">{tx.transaction_status}</td>
                          <td className="px-4 py-3">{tx.created_at}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <div className="text-5xl mb-4">🧾</div>
                  <p>Sorry! You don’t have any Transaction activities yet…</p>
                  <button
                    className="text-[#F59E0B] text-sm mt-3"
                    onClick={() => navigate("/transactions")}
                  >
                    View Full Transaction History
                  </button>
                </div>
              )}
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
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition ${
            active ? "bg-white/10 text-[#FBBF24]" : "hover:bg-white/10"
          } ${className}`}
        >
          {icon && <span>{icon}</span>}
          <span>{label}</span>
        </button>
      );
    }

    /* QuickAction */
    function QuickAction({ icon, title, desc, onClick }) {
      return (
        <div
          onClick={onClick}
          className="bg-[#E0F2FE]/40 hover:bg-[#E0F2FE]/70 transition rounded-xl p-4 shadow-sm cursor-pointer"
        >
          <div className="flex items-center gap-3 mb-2 text-[#16404D]">
            {icon}
            <h4 className="font-medium">{title}</h4>
          </div>
          <p className="text-sm text-gray-600">{desc}</p>
        </div>
      );
    }
