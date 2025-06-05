import React, { useState, useEffect } from "react";
import { MdTableBar, MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import Metrics from "../components/dashboard/Metrics";
import RecentOrders from "../components/dashboard/RecentOrders";
import Modal from "../components/dashboard/Modal";

const buttons = [
  { label: "Add Table", icon: <MdTableBar />, action: "table" },
  { label: "Add Category", icon: <MdCategory />, action: "category" },
  { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const tabs = ["Metrics", "Orders", "Payments"];

const Dashboard = () => {
  useEffect(() => {
    document.title = "POS | Admin Dashboard"
  }, [])

  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Metrics");

  const handleOpenModal = (action) => {
    if (action === "table") setIsTableModalOpen(true);
  };

  return (
    <div className="bg-[#1f1f1f] min-h-[calc(100vh-5rem)] pb-16 sm:pb-0">
      <div className="container mx-auto flex flex-col space-y-4 py-4 sm:py-6 md:py-8 px-4">
        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full justify-start">
          {buttons.map(({ label, icon, action }) => {
            return (
              <button
                key={action}
                onClick={() => handleOpenModal(action)}
                className="flex-1 sm:flex-none bg-[#1a1a1a] hover:bg-[#262626] px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 rounded-lg text-[#f5f5f5] font-medium text-xs sm:text-sm flex items-center gap-2 justify-center transition-colors"
              >
                {icon}
                <span className="hidden sm:inline">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 sm:gap-3 w-full overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => {
            return (
              <button
                key={tab}
                className={`
                  flex-1 sm:flex-none px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 rounded-lg text-[#f5f5f5] font-medium text-xs sm:text-sm whitespace-nowrap transition-colors
                  ${activeTab === tab ? "bg-[#262626]" : "bg-[#1a1a1a] hover:bg-[#262626]"}
                `}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="overflow-x-hidden overflow-y-auto">
        {activeTab === "Metrics" && <Metrics />}
        {activeTab === "Orders" && <RecentOrders />}
        {activeTab === "Payments" && (
          <div className="text-white p-4 sm:p-6 container mx-auto">
            Payment Component Coming Soon
          </div>
        )}
      </div>

      {isTableModalOpen && <Modal setIsTableModalOpen={setIsTableModalOpen} />}
    </div>
  );
};

export default Dashboard;
