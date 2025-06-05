import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { RiMenu3Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import logo from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../https";
import { removeUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";

const Header = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      console.log(data);
      dispatch(removeUser());
      navigate("/auth");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="relative bg-[#1a1a1a] shadow-lg">
      <div className="flex justify-between items-center py-3 px-4 sm:py-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <div 
          onClick={() => navigate("/")} 
          className="flex items-center gap-2 cursor-pointer z-20"
        >
          <img 
            src={logo} 
            className="h-8 w-8 sm:h-9 sm:w-9 transition-transform hover:scale-105" 
            alt="restro logo" 
          />
          <h1 className="text-lg sm:text-xl font-semibold text-[#f5f5f5] tracking-wide">
            Restro
          </h1>
        </div>

        {/* SEARCH - Desktop */}
        <div className="hidden md:flex items-center gap-4 bg-[#262626] rounded-full px-5 py-2.5 w-[40%] lg:w-[500px] transition-all focus-within:bg-[#2a2a2a]">
          <FaSearch className="text-[#f5f5f5] opacity-70" />
          <input
            type="text"
            placeholder="Search menu items, orders..."
            className="bg-transparent outline-none text-[#f5f5f5] w-full placeholder:text-[#999]"
          />
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 md:hidden">
          <button 
            className="p-2 hover:bg-[#262626] rounded-full transition-colors"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <FaSearch className="text-[#f5f5f5] text-xl" />
          </button>
          <button 
            className="p-2 hover:bg-[#262626] rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <IoClose className="text-[#f5f5f5] text-2xl" />
            ) : (
              <RiMenu3Fill className="text-[#f5f5f5] text-2xl" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {userData.role === "Admin" && (
            <button 
              onClick={() => navigate("/dashboard")} 
              className="bg-[#262626] hover:bg-[#2a2a2a] rounded-full p-3 transition-colors"
            >
              <MdDashboard className="text-[#f5f5f5] text-xl" />
            </button>
          )}
          <button className="bg-[#262626] hover:bg-[#2a2a2a] rounded-full p-3 transition-colors">
            <FaBell className="text-[#f5f5f5] text-xl" />
          </button>
          <div className="flex items-center gap-3 bg-[#262626] hover:bg-[#2a2a2a] rounded-full pl-3 pr-4 py-2 transition-colors">
            <FaUserCircle className="text-[#f5f5f5] text-2xl" />
            <div className="flex flex-col">
              <h2 className="text-sm text-[#f5f5f5] font-medium">
                {userData.name || "TEST USER"}
              </h2>
              <p className="text-xs text-[#999]">
                {userData.role || "Role"}
              </p>
            </div>
            <button 
              onClick={handleLogout}
              className="ml-2 hover:text-red-500 transition-colors"
            >
              <IoLogOut className="text-[#f5f5f5] text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <div 
        className={`
          absolute top-full left-0 right-0 bg-[#1a1a1a] border-t border-[#2a2a2a] p-4 z-40
          transform transition-transform duration-300 ease-in-out
          ${isSearchOpen ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <div className="flex items-center gap-3 bg-[#262626] rounded-full px-4 py-2.5">
          <FaSearch className="text-[#f5f5f5] opacity-70" />
          <input
            type="text"
            placeholder="Search menu items, orders..."
            className="bg-transparent outline-none text-[#f5f5f5] w-full placeholder:text-[#999]"
            autoFocus
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`
          fixed inset-0 bg-black/50 z-30 md:hidden
          transition-opacity duration-300 ease-in-out
          ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setIsMenuOpen(false)}
      >
        <div 
          className={`
            absolute top-[4rem] right-0 w-64 bg-[#1a1a1a] h-[calc(100vh-4rem)]
            transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex flex-col p-4">
            <div className="flex items-center gap-3 p-4 border-b border-[#2a2a2a]">
              <FaUserCircle className="text-[#f5f5f5] text-3xl" />
              <div>
                <h2 className="text-[#f5f5f5] font-medium">
                  {userData.name || "TEST USER"}
                </h2>
                <p className="text-sm text-[#999]">
                  {userData.role || "Role"}
                </p>
              </div>
            </div>
            
            <nav className="mt-4 flex flex-col gap-2">
              {userData.role === "Admin" && (
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-[#f5f5f5] p-3 hover:bg-[#262626] rounded-lg transition-colors"
                >
                  <MdDashboard size={20} />
                  <span>Dashboard</span>
                </button>
              )}
              <button 
                className="flex items-center gap-3 text-[#f5f5f5] p-3 hover:bg-[#262626] rounded-lg transition-colors"
              >
                <FaBell size={20} />
                <span>Notifications</span>
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 text-[#f5f5f5] p-3 hover:bg-[#262626] rounded-lg transition-colors mt-auto"
              >
                <IoLogOut size={20} />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
