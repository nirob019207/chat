"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import CustomersChart from "./CustomersChart";
import SalesChart from "./SalesChart";
import SubscriptionList from "./SubscriptionList";
// import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  seletLanguage,
  setCustomerChartDuration,
  setSalesChartDuration,
} from "@/redux/features/dashboard/dashboardSlice";

type Language = "Eng" | "Spa";

const translations = {
  cardTitle: {
    Eng: "Recent Purchase Subscription",
    Spa: "Suscripción de compra reciente",
  },
};

const CommonDashboard = () => {
  const dispatch = useAppDispatch();

  const reduxLanguage = useAppSelector(seletLanguage);

  const language = (reduxLanguage || "Eng") as Language;

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
      <div className="col-span-2 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Sales Report</CardTitle>
            <Select
              onValueChange={(value) => {
                dispatch(setSalesChartDuration(value));
              }}
              defaultValue="monthly"
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select a Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Year</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Active Customers</CardTitle>
            <Select
              onValueChange={(value) => {
                dispatch(setCustomerChartDuration(value));
              }}
              defaultValue="monthly"
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select a Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Year</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <CustomersChart />
          </CardContent>
        </Card>
      </div>
      <Card className="h-fit min-h-[]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-[#1C1A3C] text-[18px] font-semibold leading-normal">
            {translations.cardTitle[language]}
          </CardTitle>
          <Link href={"/subscription-list"}>
            <p className="text-[#817F9B] hover:text-black transition-all duration-300 cursor-pointer text-[14px] font-normal leading-[21px]">
              View All
            </p>
          </Link>
        </CardHeader>
        <CardContent>
          <SubscriptionList />
        </CardContent>
      </Card>
    </div>
  );
};

export default CommonDashboard;
