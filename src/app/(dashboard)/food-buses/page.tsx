/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import FoodTruckTable from "@/components/tables/FoodBusesTable";
import useWebSocket from "@/hooks/useWebSocket";
import { seletCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";

export default function FoodBuses() {
  const authToken: any = useAppSelector(seletCurrentToken);
  const [currentPage, setCurrentPage] = useState(1);

  const { drivers } = useWebSocket("wss://api.craveit.site/", authToken);

  const itemsPerPage = 15;

  const trucks: any = drivers;

  // Calculate total pages
  const totalPages = Math.ceil(trucks?.length / itemsPerPage);

  // Get current page items
  const currentTrucks = trucks?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      <FoodTruckTable
        trucks={currentTrucks}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
