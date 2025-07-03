/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "./Pagination";
import { useGetAllOrderQuery } from "@/redux/features/order/order.api";
import Loading from "../shared/Loading";

const ITEMS_PER_PAGE = 15;

const FoodBusesDetailsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isFetching } = useGetAllOrderQuery(undefined);

  const orders: any = data?.data?.orders;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedOrders = orders?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (isFetching) {
    return <Loading />;
  }
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Total order</h2>
      <div className="bg-white rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Food Truck Name</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Payment type</TableHead>
              <TableHead>PRICE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders?.map((order: any) => (
              <TableRow key={order?.id}>
                <TableCell>{order?.driver?.fullName}</TableCell>
                <TableCell>{order?.customer?.fullName}</TableCell>
                <TableCell>{order?.totalQty}</TableCell>
                <TableCell>{order?.paymentType}</TableCell>
                <TableCell>${order?.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={Math.ceil(orders?.length / ITEMS_PER_PAGE)}
        />
      </div>
    </div>
  );
};

export default FoodBusesDetailsTable;
