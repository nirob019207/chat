"use client";

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useCustomerChartQuery } from "@/redux/features/dashboard/dashboard.api";
import { seletCustomerChartDuration } from "@/redux/features/dashboard/dashboardSlice";
import { useAppSelector } from "@/redux/hooks";

export default function CustomersChart() {
  const chartDuration = useAppSelector(seletCustomerChartDuration);
  const {
    data: customerData,
    isLoading,
    error,
  } = useCustomerChartQuery([{ name: "types", value: chartDuration }]);

  const chartData = customerData?.data?.data;

  // Show loading state
  if (isLoading) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <p>Loading chart data...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <p className="text-red-500">Error loading chart data</p>
      </div>
    );
  }

  // Show empty state
  if (!chartData || chartData.length === 0) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <p>No chart data available</p>
      </div>
    );
  }

  return (
    <ChartContainer
      config={{
        customers: {
          label: "Total Customer",
          color: "hsl(142.1 76.2% 36.3%)",
        },
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(142.1 76.2% 36.3%)"
                stopOpacity={0.2}
              />
              <stop
                offset="95%"
                stopColor="hsl(142.1 76.2% 36.3%)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="period"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}k`}
          />
          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
          <Area
            type="monotone"
            dataKey="customers"
            stroke="var(--color-customers)"
            fillOpacity={1}
            fill="url(#colorCustomers)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
