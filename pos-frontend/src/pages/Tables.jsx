import React, { useState, useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTables } from "../https";
import { enqueueSnackbar } from "notistack";

const Tables = () => {
  const [status, setStatus] = useState("all");

  useEffect(() => {
    document.title = "POS | Tables"
  }, [])

  const { data: resData, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      return await getTables();
    },
    placeholderData: keepPreviousData,
  });

  if(isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" })
  }

  const statusTabs = [
    { id: 'all', label: 'All' },
    { id: 'booked', label: 'Booked' }
  ];

  return (
    <section className="bg-[#1f1f1f] min-h-[calc(100vh-5rem)] pb-16 sm:pb-0">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 px-4 sm:px-6 md:px-10 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-xl sm:text-2xl text-[#f5f5f5] font-bold tracking-wide">
            Tables
          </h1>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-2 sm:gap-4">
          {statusTabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setStatus(id)}
              className={`
                px-4 sm:px-5 py-2 rounded-lg text-[#ababab] 
                text-sm sm:text-base font-medium transition-colors
                ${status === id ? "bg-[#383838]" : "hover:bg-[#2a2a2a]"}
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 px-4 sm:px-6 md:px-10 py-4 max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hide">
        {resData?.data.data.map((table) => (
          <TableCard
            key={table._id}
            id={table._id}
            name={table.tableNo}
            status={table.status}
            initials={table?.currentOrder?.customerDetails.name}
            seats={table.seats}
          />
        ))}
      </div>

      <BottomNav />
    </section>
  );
};

export default Tables;
