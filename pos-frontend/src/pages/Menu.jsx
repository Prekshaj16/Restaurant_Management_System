import React, { useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import { MdRestaurantMenu } from "react-icons/md";
import MenuContainer from "../components/menu/MenuContainer";
import CustomerInfo from "../components/menu/CustomerInfo";
import CartInfo from "../components/menu/CartInfo";
import Bill from "../components/menu/Bill";
import { useSelector } from "react-redux";

const Menu = () => {
  useEffect(() => {
    document.title = "POS | Menu"
  }, [])

  const customerData = useSelector((state) => state.customer);

  return (
    <section className="bg-[#1f1f1f] min-h-[calc(100vh-5rem)] pb-16 sm:pb-0">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left Section */}
        <div className="flex-1 lg:flex-[3] overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 md:px-10 py-4 space-y-4 sm:space-y-0">
            <div className="flex items-center gap-4">
              <BackButton />
              <h1 className="text-xl sm:text-2xl text-[#f5f5f5] font-bold tracking-wide">
                Menu
              </h1>
            </div>
            
            {/* Customer Info Header */}
            <div className="flex items-center gap-3 cursor-pointer bg-[#1a1a1a] p-2 sm:p-3 rounded-lg">
              <MdRestaurantMenu className="text-[#f5f5f5] text-2xl sm:text-3xl" />
              <div className="flex flex-col">
                <h1 className="text-sm sm:text-base text-[#f5f5f5] font-semibold tracking-wide">
                  {customerData.customerName || "Customer Name"}
                </h1>
                <p className="text-xs text-[#ababab] font-medium">
                  Table: {customerData.table?.tableNo || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="px-4 sm:px-6 md:px-10">
            <MenuContainer />
          </div>
        </div>

        {/* Right Section - Cart & Bill */}
        <div className="fixed bottom-16 left-0 right-0 lg:static lg:flex-1 bg-[#1a1a1a] lg:mt-4 lg:mr-4 lg:rounded-lg">
          <div className="max-h-[60vh] lg:max-h-[calc(100vh-6rem)] overflow-y-auto">
            {/* Customer Info */}
            <CustomerInfo />
            <hr className="border-[#2a2a2a] border-t-2" />
            {/* Cart Items */}
            <CartInfo />
            <hr className="border-[#2a2a2a] border-t-2" />
            {/* Bills */}
            <Bill />
          </div>
        </div>
      </div>

      <BottomNav />
    </section>
  );
};

export default Menu;
