import React, { useState } from "react";
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
    <header className="relative bg-[#1a1a1a] shadow-lg w-full">
      <div className="flex justify-between items-center py-2 px-3 sm:py-3 sm:px-4 md:py-4 md:px-6 lg:px-8">
        {/* LOGO */}
        <div 
          onClick={() => navigate("/")} 
          className="flex items-center gap-1.5 sm:gap-2 cursor-pointer z-20"
        >
          <img 
            src={logo} 
            className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 transition-transform hover:scale-105" 
            alt="restro logo" 
          />
          <h1 className="text-base sm:text-lg md:text-xl font-semibold text-[#f5f5f5] tracking-wide">
            Restro
          </h1>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-[#f5f5f5] z-20"
        >
          {isMenuOpen ? (
            <IoClose size={24} />
          ) : (
            <RiMenu3Fill size={24} />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          {userData.role === "Admin" && (
            <button 
              onClick={() => navigate("/dashboard")} 
              className="bg-[#262626] hover:bg-[#2a2a2a] rounded-full p-2.5 lg:p-3 transition-colors"
            >
              <MdDashboard className="text-[#f5f5f5] text-lg lg:text-xl" />
            </button>
          )}
          <button className="bg-[#262626] hover:bg-[#2a2a2a] rounded-full p-2.5 lg:p-3 transition-colors">
            <FaBell className="text-[#f5f5f5] text-lg lg:text-xl" />
          </button>
          <div className="flex items-center gap-2 lg:gap-3 bg-[#262626] hover:bg-[#2a2a2a] rounded-full pl-3 pr-3 lg:pr-4 py-1.5 lg:py-2 transition-colors">
            <FaUserCircle className="text-[#f5f5f5] text-xl lg:text-2xl" />
            <div className="flex flex-col">
              <h2 className="text-xs lg:text-sm text-[#f5f5f5] font-medium">
                {userData.name || "TEST USER"}
              </h2>
              <p className="text-[10px] lg:text-xs text-[#999]">
                {userData.role || "Role"}
              </p>
            </div>
            <button 
              onClick={handleLogout}
              className="ml-1 lg:ml-2 hover:text-red-500 transition-colors"
            >
              <IoLogOut className="text-[#f5f5f5] text-lg lg:text-xl" />
            </button>
          </div>
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
            absolute top-[3.5rem] sm:top-[4rem] right-0 w-[280px] sm:w-[320px] bg-[#1a1a1a] h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)]
            transform transition-transform duration-300 ease-in-out overflow-y-auto
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex flex-col p-4">
            <div className="flex items-center gap-3 p-3 sm:p-4 border-b border-[#2a2a2a]">
              <FaUserCircle className="text-[#f5f5f5] text-2xl sm:text-3xl" />
              <div>
                <h2 className="text-sm sm:text-base text-[#f5f5f5] font-medium">
                  {userData.name || "TEST USER"}
                </h2>
                <p className="text-xs sm:text-sm text-[#999]">
                  {userData.role || "Role"}
                </p>
              </div>
            </div>
            
            <nav className="mt-4 flex flex-col gap-1 sm:gap-2">
              {userData.role === "Admin" && (
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-[#f5f5f5] p-2.5 sm:p-3 hover:bg-[#262626] rounded-lg transition-colors"
                >
                  <MdDashboard size={18} className="sm:text-xl" />
                  <span className="text-sm sm:text-base">Dashboard</span>
                </button>
              )}
              <button 
                className="flex items-center gap-3 text-[#f5f5f5] p-2.5 sm:p-3 hover:bg-[#262626] rounded-lg transition-colors"
              >
                <FaBell size={18} className="sm:text-xl" />
                <span className="text-sm sm:text-base">Notifications</span>
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 text-[#f5f5f5] p-2.5 sm:p-3 hover:bg-[#262626] rounded-lg transition-colors mt-auto"
              >
                <IoLogOut size={18} className="sm:text-xl" />
                <span className="text-sm sm:text-base">Logout</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
