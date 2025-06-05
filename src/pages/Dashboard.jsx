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
      <div className="container mx-auto flex flex-col space-y-6 py-6 px-4 sm:px-6 lg:px-8">
        {/* Action Buttons */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3">
          {buttons.map(({ label, icon, action }) => (
            <button
              key={action}
              onClick={() => handleOpenModal(action)}
              className="flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#262626] px-4 py-3 rounded-xl text-[#f5f5f5] font-medium text-sm transition-colors w-full sm:w-auto"
            >
              <span className="text-xl">{icon}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                flex-none px-5 py-2.5 rounded-lg text-[#f5f5f5] font-medium 
                text-sm whitespace-nowrap transition-colors
                ${activeTab === tab 
                  ? "bg-[#262626] shadow-lg" 
                  : "bg-[#1a1a1a] hover:bg-[#262626]"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="overflow-x-hidden">
          {activeTab === "Metrics" && (
            <div className="animate-fadeIn">
              <Metrics />
            </div>
          )}
          {activeTab === "Orders" && (
            <div className="animate-fadeIn">
              <RecentOrders />
            </div>
          )}
          {activeTab === "Payments" && (
            <div className="animate-fadeIn text-[#f5f5f5] p-6 bg-[#1a1a1a] rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Payment Analytics</h2>
              <p className="text-[#999]">Payment analytics coming soon...</p>
            </div>
          )}
        </div>
      </div>

      {isTableModalOpen && <Modal setIsTableModalOpen={setIsTableModalOpen} />}
    </div>
  );
};

export default Dashboard; 