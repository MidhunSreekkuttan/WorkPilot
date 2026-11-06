import { FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-canvas/80 border-b border-outline-variant/40">
      <div className="flex items-center justify-between px-4 sm:px-8 py-3 mx-auto max-w-[1440px]">

        {/* Center/Left: Search Bar */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="relative flex items-center w-full h-10 rounded-lg bg-surface-container-lowest border 
            border-outline-variant/50 focus-within:border-brand-orange focus-within:ring-1 focus-within:ring-brand-orange 
              transition-all overflow-hidden shadow-inner">
            <div className="pl-3.5 flex items-center justify-center text-text-muted">
              <FaSearch className="text-sm" />
            </div>
            <input
              className="w-full h-full pl-2.5 pr-4 bg-transparent text-text-main text-body-md focus:outline-none 
                placeholder:text-text-placeholder"
              type="text"
              placeholder="Search workspaces, tasks, or members..."
            />
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          <button
            onClick={toggleTheme}
            className="text-text-muted hover:text-text-main transition-colors p-2 rounded-full hover:bg-surface-container 
              cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <FaMoon className="text-lg" /> : <FaSun className="text-lg" />}
          </button>

          <button className="relative text-text-muted hover:text-text-main transition-colors p-2 rounded-full
             hover:bg-surface-container cursor-pointer">
            <IoMdNotificationsOutline className="text-2xl" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-orange border border-panel animate-pulse" />
          </button>

          <div className="h-7 w-px bg-outline-variant/40 mx-1 hidden sm:block" />

          {/* Profile Dropdown Trigger */}
          <button className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer pl-1">
            <img
              className="w-8 h-8 rounded-full ring-2 ring-surface-container object-cover"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
              alt="Profile"
            />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;