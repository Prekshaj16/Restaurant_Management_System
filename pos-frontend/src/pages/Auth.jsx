import React, { useEffect, useState } from "react";
import restaurant from "../assets/images/restaurant-img.jpg"
import logo from "../assets/images/logo.png"
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

const Auth = () => {

  useEffect(() => {
    document.title = "POS | Auth"
  }, [])

  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-[#1a1a1a]">
      {/* Left Section - Hidden on small screens, visible from md up */}
      <div className="hidden md:flex md:w-1/2 lg:w-[60%] relative items-center justify-center bg-cover">
        {/* BG Image */}
        <img 
          className="w-full h-full object-cover absolute inset-0" 
          src={restaurant} 
          alt="Restaurant Image"
        />

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>

        {/* Quote at bottom */}
        <blockquote className="absolute bottom-10 px-6 md:px-10 lg:px-16 mb-10 text-base sm:text-lg md:text-xl lg:text-2xl italic text-white max-w-[90%] md:max-w-[80%] mx-auto">
          "Serve customers the best food with prompt and friendly service in a
          welcoming atmosphere, and they'll keep coming back."
          <br />
          <span className="block mt-3 md:mt-4 text-yellow-400 text-sm md:text-base lg:text-lg">- Founder of Restro</span>
        </blockquote>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 lg:w-[40%] min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 flex flex-col justify-center">
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-2 mb-6 md:mb-8">
          <img 
            src={logo} 
            alt="Restro Logo" 
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 border-2 rounded-full p-1"
          />
          <h1 className="text-base sm:text-lg font-semibold text-[#f5f5f5] tracking-wide">
            Restro
          </h1>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-semibold text-yellow-400 mb-6 sm:mb-8 md:mb-10">
          {isRegister ? "Employee Registration" : "Employee Login"}
        </h2>

        {/* Auth Form Container */}
        <div className="w-full max-w-[340px] sm:max-w-[400px] mx-auto">
          {isRegister ? <Register setIsRegister={setIsRegister} /> : <Login />}
        </div>

        {/* Switch Auth Mode */}
        <div className="flex justify-center mt-4 sm:mt-6">
          <p className="text-xs sm:text-sm text-[#ababab]">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
            {" "}
            <a 
              onClick={() => setIsRegister(!isRegister)} 
              className="text-yellow-400 font-semibold hover:underline cursor-pointer hover:text-yellow-300 transition-colors duration-200"
            >
              {isRegister ? "Sign in" : "Sign up"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
