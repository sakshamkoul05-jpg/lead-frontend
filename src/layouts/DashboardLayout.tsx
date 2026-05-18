import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, LogOut, Moon, Sun } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useDarkMode } from "../hooks/useDarkMode";

const DashboardLayout = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const { isDark, toggle } = useDarkMode();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-zinc-800">
          <h1 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">
            SmartLeads
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-500 mt-0.5">CRM Dashboard</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive("/")
                ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400"
                : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
            }`}
          >
            <LayoutDashboard size={17} />
            Dashboard
          </Link>
        </nav>

        {/* User section */}
        <div className="px-3 py-4 border-t border-slate-200 dark:border-zinc-800 space-y-1">
          <button
            onClick={toggle}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
            {isDark ? "Light mode" : "Dark mode"}
          </button>

          <div className="px-3 py-2 flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700 dark:text-zinc-300 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-slate-400 dark:text-zinc-500 capitalize">{user?.role}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <LogOut size={17} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
