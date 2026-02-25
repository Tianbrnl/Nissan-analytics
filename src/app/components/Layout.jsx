import React, { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router";
import {
  LayoutDashboard,
  FileText,
  CheckSquare,
  TrendingUp,
  FileDown,
  Menu,
  X,
  GitBranch,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Check authentication
  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  // Auto-collapse sidebar on small laptop screens
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280 && window.innerWidth >= 1024) {
        setIsExpanded(false);
      } else if (window.innerWidth >= 1280) {
        setIsExpanded(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const menuItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    {
      path: "/vehicle-reports",
      label: "Vehicle & Reservation Reports",
      icon: FileText,
    },
    {
      path: "/applications",
      label: "Applications & Approvals",
      icon: CheckSquare,
    },
    {
      path: "/vehicle-sales",
      label: "Vehicle Sales Per Group",
      icon: TrendingUp,
    },
    { path: "/pipeline", label: "Pipeline", icon: GitBranch },
    { path: "/release-plan", label: "Release Plan", icon: FileDown },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#C3002F] text-white rounded-lg"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          ${isExpanded ? "w-60" : "w-[70px]"}
          bg-[#1C1C1C] flex flex-col
          transition-all duration-300 ease-in-out
          fixed lg:relative h-full z-40
          overflow-x-hidden
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div
          className={`p-6 border-b border-gray-700 flex items-center ${isExpanded ? "justify-between" : "justify-center"}`}
        >
          {isExpanded ? (
            <>
              <div>
                <h1 className="font-bold text-xl text-[#C3002F]">Nissan</h1>
                <p className="text-sm text-gray-400 mt-1">Analytics System</p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="hidden lg:block p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
                title="Collapse sidebar"
              >
                <ChevronLeft className="w-5 h-5 text-gray-400" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsExpanded(true)}
              className="hidden lg:block p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
              title="Expand sidebar"
            >
              <ChevronRight className="w-5 h-5 text-[#C3002F]" />
            </button>
          )}
        </div>

        <nav className="flex-1 p-4 overflow-y-auto overflow-x-hidden">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative
                      ${isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}
                      ${!isExpanded ? "justify-center" : ""}
                      group
                    `}
                    title={!isExpanded ? item.label : ""}
                  >
                    {/* Red highlight bar for active item */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C3002F] rounded-r"></div>
                    )}
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-[#C3002F]" : "text-gray-400"}`}
                    />
                    {isExpanded && (
                      <span className="text-sm">{item.label}</span>
                    )}

                    {/* Tooltip for collapsed state */}
                    {!isExpanded && (
                      <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div
          className={`p-4 border-t border-gray-700 ${!isExpanded ? "text-center" : ""}`}
        >
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors group relative ${
              !isExpanded ? "justify-center" : ""
            }`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isExpanded && <span className="text-sm font-medium">Logout</span>}

            {!isExpanded && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                Logout
              </div>
            )}
          </button>
        </div>

        <div
          className={`p-4 border-t border-gray-700 ${!isExpanded ? "text-center" : ""}`}
        >
          {isExpanded ? (
            <div className="text-xs text-gray-500">
              <p>© 2026 Automotive Sales</p>
              <p className="mt-1">Executive Dashboard</p>
            </div>
          ) : (
            <div className="text-xs text-gray-500">©</div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
