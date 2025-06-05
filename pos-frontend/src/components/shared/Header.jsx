import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { RiMenu3Fill } from "react-icons/ri";
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
    <header className="relative bg-[#1a1a1a]">
      <div className="flex justify-between items-center py-3 px-4 sm:py-4 sm:px-8">
        {/* LOGO */}
        <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
          <img src={logo} className="h-7 w-7 sm:h-8 sm:w-8" alt="restro logo" />
          <h1 className="text-base sm:text-lg font-semibold text-[#f5f5f5] tracking-wide">
            Restro
          </h1>
        </div>

        {/* SEARCH - Hidden on mobile, shown as overlay when search icon is clicked */}
        <div className="hidden md:flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-5 py-2 w-[40%] lg:w-[500px]">
          <FaSearch className="text-[#f5f5f5]" />
          <input
            type="text"
            placeholder="Search"
            className="bg-[#1f1f1f] outline-none text-[#f5f5f5] w-full"
          />
        </div>

        {/* Mobile Search Icon */}
        <button 
          className="md:hidden text-[#f5f5f5] p-2"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <FaSearch size={20} />
        </button>

        {/* LOGGED USER DETAILS - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {userData.role === "Admin" && (
            <div onClick={() => navigate("/dashboard")} className="bg-[#1f1f1f] rounded-[15px] p-2 sm:p-3 cursor-pointer">
              <MdDashboard className="text-[#f5f5f5] text-xl sm:text-2xl" />
            </div>
          )}
          <div className="bg-[#1f1f1f] rounded-[15px] p-2 sm:p-3 cursor-pointer">
            <FaBell className="text-[#f5f5f5] text-xl sm:text-2xl" />
          </div>
          <div className="flex items-center gap-3 cursor-pointer">
            <FaUserCircle className="text-[#f5f5f5] text-3xl sm:text-4xl" />
            <div className="flex flex-col items-start">
              <h1 className="text-sm sm:text-md text-[#f5f5f5] font-semibold tracking-wide">
                {userData.name || "TEST USER"}
              </h1>
              <p className="text-xs text-[#ababab] font-medium">
                {userData.role || "Role"}
              </p>
            </div>
            <IoLogOut
              onClick={handleLogout}
              className="text-[#f5f5f5] ml-2"
              size={32}
            />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-[#f5f5f5] p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <RiMenu3Fill size={24} />
        </button>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#1a1a1a] p-4 z-50">
          <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-4 py-2">
            <FaSearch className="text-[#f5f5f5]" />
            <input
              type="text"
              placeholder="Search"
              className="bg-[#1f1f1f] outline-none text-[#f5f5f5] w-full"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#1a1a1a] border-t border-[#2a2a2a] py-4 z-50">
          <div className="flex flex-col space-y-4 px-4">
            {userData.role === "Admin" && (
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 text-[#f5f5f5] py-2"
              >
                <MdDashboard size={20} />
                <span>Dashboard</span>
              </button>
            )}
            <button className="flex items-center gap-3 text-[#f5f5f5] py-2">
              <FaBell size={20} />
              <span>Notifications</span>
            </button>
            <div className="flex items-center gap-3 py-2">
              <FaUserCircle className="text-[#f5f5f5] text-2xl" />
              <div>
                <h2 className="text-[#f5f5f5] font-semibold">
                  {userData.name || "TEST USER"}
                </h2>
                <p className="text-xs text-[#ababab]">
                  {userData.role || "Role"}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-[#f5f5f5] py-2"
            >
              <IoLogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
