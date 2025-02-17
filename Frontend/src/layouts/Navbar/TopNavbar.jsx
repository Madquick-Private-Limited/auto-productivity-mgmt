import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const TopNavbar = ({ isCollapsed, setIsCollapsed }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 transition-all duration-300 overflow-hidden ${
        isCollapsed ? "left-16 mx-2 mt-2" : "left-64 ml-2 mt-2"
      } w-full flex flex-wrap text-lg items-center justify-between bg-gradient-to-tl from-orange-200 to-indigo-200 py-2 shadow-md dark:bg-neutral-700`}
      style={{
        width: `calc(100% - ${isCollapsed ? "80px" : "272px"})`,
      }}
    >
      <div className="flex w-full items-center justify-between px-3">
        {/* Hamburger button for mobile view */}
        <button
          className="lg:hidden text-black/50 dark:text-neutral-200"
          type="button"
          aria-controls="navbarSupportedContent1"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setIsCollapsed((prev) => !prev)} // Toggle the collapse state
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {/* Collapsible container */}
        <div className="hidden lg:flex items-center">
          {/* Logo */}
          <a
            className="flex items-center text-neutral-900 dark:text-neutral-200"
            href="#"
          >
            <img
              src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
              style={{ height: "15px" }}
              alt="Logo"
            />
          </a>

          {/* Links */}
          <ul className="ml-5 flex space-x-4 text-black/60 dark:text-white/60">
            <li>
              <a
                href="#"
                className="hover:text-black/80 dark:hover:text-white/80"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-black/80 dark:hover:text-white/80"
              >
                Team
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-black/80 dark:hover:text-white/80"
                onClick={() => logout()}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>

        {/* Right elements */}
        <div className="flex items-center space-x-4">
          {/* User profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center focus:outline-none"
            >
              <img
                src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                alt="User"
                className="rounded-full w-10 h-10"
              />
            </button>
            {/* Dropdown menu */}
            {isDropdownOpen && (
              <ul className="absolute mt-2 right-0 w-48 bg-white shadow-lg rounded-lg dark:bg-gray-800">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);

                      navigate("/");
                    }}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
