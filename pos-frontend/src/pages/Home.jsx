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
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left Section */}
        <div className="flex-1 lg:flex-[3] overflow-hidden">
          {/* Greeting */}
          <Greetings />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-4 sm:px-6 md:px-8 mt-4 sm:mt-6">
            <MiniCard 
              title="Total Earnings" 
              icon={<BsCashCoin />} 
              number={512} 
              footerNum={1.6} 
            />
            <MiniCard 
              title="In Progress" 
              icon={<GrInProgress />} 
              number={16} 
              footerNum={3.6} 
            />
          </div>

          {/* Recent Orders */}
          <div className="mt-4 sm:mt-6 px-4 sm:px-6 md:px-8">
            <RecentOrders />
          </div>
        </div>

        {/* Right Section - Popular Dishes */}
        <div className="lg:flex-[2] mt-4 lg:mt-0 lg:mr-4">
          <div className="px-4 sm:px-6 md:px-8 lg:px-0">
            <PopularDishes />
          </div>
        </div>
      </div>

      <BottomNav />
    </section>
  );
};

export default Home;
