import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query"
import { login } from "../../https/index"
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
 
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value});
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      loginMutation.mutate(formData);
    }

    const loginMutation = useMutation({
      mutationFn: (reqData) => login(reqData),
      onSuccess: (res) => {
          const { data } = res;
          console.log(data);
          const { _id, name, email, phone, role } = data.data;
          dispatch(setUser({ _id, name, email, phone, role }));
          navigate("/");
      },
      onError: (error) => {
        const { response } = error;
        enqueueSnackbar(response.data.message, { variant: "error" });
      }
    })

    return (
      <form onSubmit={handleSubmit} className="space-y-5 w-full">
        <div>
          <label className="block text-[#ababab] mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium">
            Email Address
          </label>
          <div className="flex items-center rounded-lg p-2.5 sm:p-3 px-3 sm:px-4 bg-[#1f1f1f] hover:bg-[#2a2a2a] focus-within:bg-[#2a2a2a] transition-colors duration-200">
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email"
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
              value={formData.password}
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password"
              className="bg-transparent flex-1 text-white placeholder-gray-500 focus:outline-none text-sm sm:text-base w-full"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#F6B100] text-[#f5f5f5] rounded-lg py-2.5 sm:py-3 mt-6 hover:bg-yellow-600 active:bg-yellow-700 transition-colors duration-200 text-sm sm:text-base font-medium"
        >
          Sign In
        </button>
      </form>
    );
}

export default Login;
