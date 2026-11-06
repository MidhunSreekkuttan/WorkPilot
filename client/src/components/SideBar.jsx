import {
  FaHome,
  FaRegComments,
  FaLayerGroup,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
  FaUserFriends
} from "react-icons/fa";
import { NavLink } from 'react-router-dom'

const NavItem = ({ icon: Icon, label, active }) => {
  return (
    <button
      className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 w-full cursor-pointer ${active
        ? "bg-gradient-to-r from-brand-orange to-brand-orange-dark text-white shadow-orange-glow font-semibold"
        : "text-text-muted hover:text-text-main hover:bg-card"
        }`}
    >
      <Icon className="text-lg shrink-0" />
      <span className="text-body-md tracking-wide">{label}</span>
    </button>
  );
};

const navigations = [
  { label: "Home", icon: FaHome, path: "/dashboard" },
  { label: "Chat", icon: FaRegComments, path: "/chats" },
  { label: "Workspace", icon: FaLayerGroup, path: "/workspace" },
  { label: "Friends", icon: FaUserFriends, path: "/friends" },
];

const SideBar = () => {
  return (
    <aside className="w-54 h-screen bg-panel border-r border-outline-variant/40 flex flex-col px-4 shrink-0 sticky top-0">

      {/* Top Branding[cite: 1] */}
      <div className="flex flex-col items-center mb-10">
        <div className="relative">
          {/* Subtle glow behind logo */}
          <div className="absolute inset-0 bg-brand-cyan/20 blur-lg rounded-full" />
          <img
            src="/workPilot_logo.svg"
            alt="WorkPilot Logo"
            className="w-20 h-20 relative z-10 drop-shadow-md mx-3"
          />
        </div>
        <h2 className="text-headline-md font-display font-extrabold text-text-main tracking-tight">
          WorkPilot
        </h2>
      </div>

      <nav className="flex flex-col gap-2">
        {navigations.map((items) => (
          <NavLink key={items.label}
            to={items.path}
            className="w-full block"
          >
            {({ isActive }) => (
              <NavItem icon={items.icon} label={items.label} active={isActive} />
            )}
          </NavLink>
        ))}
      </nav>

      {/* Flexible spacer to push bottom content down */}
      <div className="flex-1" />

      {/* Bottom Section[cite: 1] */}
      <div className="flex flex-col">
        {/* User Profile Widget[cite: 1] */}
        <div className="flex items-center gap-3 p-3 mb-4 rounded-xl hover:bg-card border border-transparent hover:border-outline-variant/30 cursor-pointer transition-all">
          <div className="relative shrink-0">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
              alt="Alex Chen"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-surface-container"
            />
            {/* Online Indicator[cite: 1] */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-brand-emerald rounded-full border-2 border-panel" />
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <p className="text-label-md text-text-main font-bold truncate leading-tight">
              Alex Chen
            </p>
            <p className="text-body-sm text-text-muted truncate leading-tight mt-0.5">
              Manager
            </p>
          </div>

          <FaChevronDown className="text-text-muted text-[10px] shrink-0" />
        </div>

        {/* Divider[cite: 1] */}
        <hr className="border-t border-outline-variant/40 mb-4 mx-2" />

        {/* System/Action Navigation[cite: 1] */}
        <nav className="flex flex-col gap-1.5">
          <NavItem icon={FaCog} label="Settings" />
          <NavItem icon={FaSignOutAlt} label="Logout" />
        </nav>
      </div>

    </aside>
  );
};

export default SideBar;