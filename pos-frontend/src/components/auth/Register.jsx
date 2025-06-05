import React, { useState } from "react";
import { register } from "../../https";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

const Register = ({setIsRegister}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelection = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  const registerMutation = useMutation({
    mutationFn: (reqData) => register(reqData),
    onSuccess: (res) => {
      const { data } = res;
      enqueueSnackbar(data.message, { variant: "success" });
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
      });
      
      setTimeout(() => {
        setIsRegister(false);
      }, 1500);
    },
    onError: (error) => {
      const { response } = error;
      const message = response.data.message;
      enqueueSnackbar(message, { variant: "error" });
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 w-full">
      <div>
        <label className="block text-[#ababab] mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium">
          Full Name
        </label>
        <div className="flex items-center rounded-lg p-2.5 sm:p-3 px-3 sm:px-4 bg-[#1f1f1f] hover:bg-[#2a2a2a] focus-within:bg-[#2a2a2a] transition-colors duration-200">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="bg-transparent flex-1 text-white placeholder-gray-500 focus:outline-none text-sm sm:text-base w-full"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-[#ababab] mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium">
          Email Address
        </label>
        <div className="flex items-center rounded-lg p-2.5 sm:p-3 px-3 sm:px-4 bg-[#1f1f1f] hover:bg-[#2a2a2a] focus-within:bg-[#2a2a2a] transition-colors duration-200">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="bg-transparent flex-1 text-white placeholder-gray-500 focus:outline-none text-sm sm:text-base w-full"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-[#ababab] mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium">
          Phone Number
        </label>
        <div className="flex items-center rounded-lg p-2.5 sm:p-3 px-3 sm:px-4 bg-[#1f1f1f] hover:bg-[#2a2a2a] focus-within:bg-[#2a2a2a] transition-colors duration-200">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="bg-transparent flex-1 text-white placeholder-gray-500 focus:outline-none text-sm sm:text-base w-full"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-[#ababab] mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium">
          Password
        </label>
        <div className="flex items-center rounded-lg p-2.5 sm:p-3 px-3 sm:px-4 bg-[#1f1f1f] hover:bg-[#2a2a2a] focus-within:bg-[#2a2a2a] transition-colors duration-200">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            className="bg-transparent flex-1 text-white placeholder-gray-500 focus:outline-none text-sm sm:text-base w-full"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-[#ababab] mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium">
          Role
        </label>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => handleRoleSelection("Admin")}
            className={`p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200
              ${
                formData.role === "Admin"
                  ? "bg-yellow-400 text-gray-900 shadow-lg scale-[1.02]"
                  : "bg-[#1f1f1f] text-white hover:bg-[#2a2a2a]"
              }`}
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelection("Employee")}
            className={`p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200
              ${
                formData.role === "Employee"
                  ? "bg-yellow-400 text-gray-900 shadow-lg scale-[1.02]"
                  : "bg-[#1f1f1f] text-white hover:bg-[#2a2a2a]"
              }`}
          >
            Employee
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#F6B100] text-[#f5f5f5] rounded-lg py-2.5 sm:py-3 mt-6 hover:bg-yellow-600 active:bg-yellow-700 transition-colors duration-200 text-sm sm:text-base font-medium"
      >
        Sign Up
      </button>
    </form>
  );
};

export default Register;
