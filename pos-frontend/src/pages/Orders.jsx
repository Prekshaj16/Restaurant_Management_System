import React, { useState, useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import OrderCard from "../components/orders/OrderCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getOrders } from "../https";
import { enqueueSnackbar } from "notistack";

const Orders = () => {
  const [status, setStatus] = useState("all");

  useEffect(() => {
    document.title = "POS | Orders"
  }, [])

  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getOrders();
    },
    placeholderData: keepPreviousData,
  });

  if(isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" })
  }

  const statusTabs = [
    { id: 'all', label: 'All' },
    { id: 'progress', label: 'In Progress' },
    { id: 'ready', label: 'Ready' },
    { id: 'completed', label: 'Completed' }
  ];

  return (
    <section className="bg-[#1f1f1f] min-h-[calc(100vh-5rem)] pb-16 sm:pb-0">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 px-4 sm:px-6 md:px-10 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-xl sm:text-2xl text-[#f5f5f5] font-bold tracking-wide">
            Orders
          </h1>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {statusTabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setStatus(id)}
              className={`
                whitespace-nowrap px-3 sm:px-5 py-2 rounded-lg text-[#ababab] 
                text-sm sm:text-base font-medium transition-colors
                ${status === id ? "bg-[#383838]" : "hover:bg-[#2a2a2a]"}
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 px-4 sm:px-6 md:px-10 py-4">
        {resData?.data.data.length > 0 ? (
          resData.data.data.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center text-gray-500 py-8">
            No orders available
          </div>
        )}
      </div>

      <BottomNav />
    </section>
  );
};

export default Orders;
