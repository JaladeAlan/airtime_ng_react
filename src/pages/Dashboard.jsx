import { useState } from "react";
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
} from "lucide-react";
import logo from "../assets/logo.png";
import user from "../assets/user.png";

export default function Dashboard() {
  const [showBalance, setShowBalance] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-gray-900 overflow-hidden">
      {/* SIDEBAR */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 h-full w-64 bg-[#16404D] text-white flex flex-col justify-between py-6 px-4 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* LOGO */}
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

          {/* USER INFO */}
          <div className="border-b border-gray-600/30 pb-4 mb-6 text-sm">
            <p className="font-medium">User Level 1 ⭐⭐⭐</p>
            <button className="text-xs text-[#FBBF24] mt-1">
              Upgrade Account
            </button>
          </div>

          {/* NAVIGATION */}
          <nav className="space-y-2 text-sm">
            <SidebarItem icon={<Wallet size={16} />} label="Dashboard" active />
            <SidebarItem icon={<Smartphone size={16} />} label="Airtime To Cash" />
            <SidebarItem icon={<Signal size={16} />} label="Buy Airtime" />
            <SidebarItem icon={<Wifi size={16} />} label="Airtime Campaigns" />
            <SidebarItem icon={<ChevronRight size={16} />} label="My Account" />
          </nav>
        </div>

        {/* LOGOUT BUTTON */}
        <button className="flex items-center gap-2 text-sm mt-auto hover:text-[#FBBF24] transition-colors">
          <LogOut size={16} />
          Log Out
        </button>
      </aside>

      {/* BACKDROP (Mobile) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
        />
      )}

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
            <button className="relative p-2 bg-gray-100 rounded-full" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1">
              <img src={user} alt="User pic" className="h-8 w-8 rounded-full" />
              <span className="text-sm text-gray-600">Welcome, Tunde</span>
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
                ₦{showBalance ? "40,000.00" : "•••••••"}
              </p>
              <button
                onClick={() => setShowBalance((prev) => !prev)}
                className="text-gray-500 hover:text-gray-700 transition"
                aria-label={showBalance ? "Hide balance" : "Show balance"}
              >
                {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Total Transactions */}
          <div className="text-center md:text-left flex-1 min-w-[200px]">
            <p className="text-gray-500 text-sm">Total Transactions</p>
            <h4 className="text-2xl font-semibold">0</h4>
            <button className="text-[#F59E0B] text-sm mt-2 flex items-center gap-1 mx-auto md:mx-0">
              Fund Wallet <ArrowRight size={14} />
            </button>
          </div>

          {/* Daily Limit */}
          <div className="bg-[#16404D] text-white p-4 rounded-xl flex flex-col items-center text-center min-w-[220px]">
            <p className="text-sm opacity-80 mb-1">Daily Limit</p>
            <div className="font-semibold mb-2">₦10,000 / ₦20,000</div>
            <button className="bg-[#FBBF24] text-black text-xs px-3 py-1 rounded-md">
              Upgrade Account
            </button>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="mb-10">
          <h3 className="text-lg font-medium mb-4">
            What would you like to do?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickAction
              icon={<Smartphone size={22} />}
              title="Airtime to Cash"
              desc="Convert your airtime to cash instantly"
            />
            <QuickAction
              icon={<Signal size={22} />}
              title="Buy Airtime"
              desc="Get Bulk airtime at the cheapest rate"
            />
            <QuickAction
              icon={<Wifi size={22} />}
              title="Airtime Campaigns"
              desc="Convert your airtime to cash instantly"
            />
          </div>
        </section>

        {/* TRANSACTIONS TABLE (EMPTY) */}
        <section className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-semibold">Recent Transactions</h4>
            <select className="text-sm border rounded-lg px-3 py-1">
              <option>All Transactions</option>
            </select>
          </div>

          <div className="text-center py-10 text-gray-500">
            <div className="text-5xl mb-4">🧾</div>
            <p>Sorry! You don’t have any Transaction activities yet…</p>
            <button className="text-[#F59E0B] text-sm mt-3">
              View Full Transaction History
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

/* SidebarItem */
function SidebarItem({ icon, label, active }) {
  return (
    <button
      className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition ${
        active ? "bg-white/10 text-[#FBBF24]" : "hover:bg-white/10"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

/* QuickAction */
function QuickAction({ icon, title, desc }) {
  return (
    <div className="bg-[#E0F2FE]/40 hover:bg-[#E0F2FE]/70 transition rounded-xl p-4 shadow-sm cursor-pointer">
      <div className="flex items-center gap-3 mb-2 text-[#16404D]">
        {icon}
        <h4 className="font-medium">{title}</h4>
      </div>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}
