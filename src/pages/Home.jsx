import React, { useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import Greetings from "../components/home/Greetings";
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import MiniCard from "../components/home/MiniCard";
import RecentOrders from "../components/home/RecentOrders";
import PopularDishes from "../components/home/PopularDishes";

const Home = () => {
  useEffect(() => {
    document.title = "POS | Home"
  }, [])

  return (
    <section className="bg-[#1f1f1f] min-h-[calc(100vh-5rem)] pb-16 sm:pb-0">
      <div className="flex flex-col lg:flex-row lg:gap-6 h-full">
        {/* Left Section */}
        <div className="flex-1 lg:flex-[3] overflow-hidden">
          {/* Greeting */}
          <div className="px-4 sm:px-6 lg:px-8">
            <Greetings />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 sm:px-6 lg:px-8 mt-6">
            <MiniCard 
              title="Total Earnings" 
              icon={<BsCashCoin className="text-green-500" />} 
              number={512} 
              footerNum={1.6} 
              className="bg-[#1a1a1a] hover:bg-[#262626] transition-colors"
            />
            <MiniCard 
              title="In Progress" 
              icon={<GrInProgress className="text-blue-500" />} 
              number={16} 
              footerNum={3.6}
              className="bg-[#1a1a1a] hover:bg-[#262626] transition-colors" 
            />
          </div>

          {/* Recent Orders */}
          <div className="mt-6 px-4 sm:px-6 lg:px-8">
            <div className="bg-[#1a1a1a] rounded-xl p-4 sm:p-6">
              <RecentOrders />
            </div>
          </div>
        </div>

        {/* Right Section - Popular Dishes */}
        <div className="lg:flex-[2] mt-6 lg:mt-0 px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1a1a1a] rounded-xl p-4 sm:p-6 h-full">
            <PopularDishes />
          </div>
        </div>
      </div>

      <BottomNav />
    </section>
  );
};

export default Home; 