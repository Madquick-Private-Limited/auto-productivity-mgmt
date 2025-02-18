import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FiMoon, FiSun } from "react-icons/fi";
import { MdNotifications } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { useDarkMode } from "../../context/DarkModeContext";

const TopNavbar = ({ isCollapsed, setIsCollapsed }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle the dropdown when clicking on the profile image
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  return (
    <header className="dark:bg-gray-900 bg-gradient-to-tl from-orange-200 to-indigo-200 dark:border-[#552d44] dark:border-2 mx-3 my-2 text-white py-2 shadow-sm">
      <div className="mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl dark:text-pink-600 flex justify-center items-center gap-2 text-purple-600 font-bold">
          <CgNotes />
          Auto Productivity Management
        </h1>

        {/* Right Section - Profile and Actions */}
        <div className="flex dark:text-gray-200 text-gray-800 items-center gap-4">
          <button
            type="button"
            className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
            title="Notifications"
          >
            <MdNotifications size={24} />
            {/* You can add a badge here if needed */}
          </button>

          <button
            type="button"
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
          </button>

          <div className="flex text-right items-center gap-1">
            <div className="hidden sm:flex border-r border-gray-600 pr-2 flex-col text-sm">
              <span className="font-semibold text-md">Hemant Medhsia</span>
              <span className="text-gray-400 text-xs">
                hemantmedhsia@gmail.com
              </span>
            </div>

            {/* Profile Picture */}
            <div className="relative">
              <img
                src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg"
                alt="Profile"
                className="w-11 h-11 rounded-full object-cover cursor-pointer"
                onClick={toggleDropdown}
              />

              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow-lg rounded-md z-50 border border-gray-300 dark:border-gray-700">
                  <ul>
                    <li>
                      <button
                        onClick={() => navigate("/profile")}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                      >
                        Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
