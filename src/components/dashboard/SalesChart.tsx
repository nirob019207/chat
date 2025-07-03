/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import barImage from "@/assets/bar.png";
import { type SVGProps, useState } from "react";
import { useSalesChartQuery } from "@/redux/features/dashboard/dashboard.api";
import { useAppSelector } from "@/redux/hooks";
import { seletSalesChartDuration } from "@/redux/features/dashboard/dashboardSlice";

interface CustomBarProps extends SVGProps<SVGRectElement> {
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const CustomBar = (props: CustomBarProps) => {
  const { fill, x, y, width, height } = props;
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <g>
      <image
        href={barImage.src}
        x={x}
        y={y}
        width={width}
        height={height}
        preserveAspectRatio="none"
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? "block" : "none" }}
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={imageLoaded ? fill : "#0d834a"}
        fillOpacity={imageLoaded ? 0.5 : 1}
      />
    </g>
  );
};

export default function SalesChart() {
  const chartDuration = useAppSelector(seletSalesChartDuration);
  const {
    data: salesData,
    isLoading,
    error,
  } = useSalesChartQuery([{ name: "types", value: chartDuration }]);

  // Extract chart data from the API response
  const chartData = salesData?.data?.chartData || [];

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
        sales: {
          label: "Total Sales",
          color: "hsl(142.1 76.2% 36.3%)",
        },
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer className={"w-full"} width="100%" height="100%">
        <BarChart className="w-full" data={chartData}>
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
          />
          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
          <Bar
            className="w-full"
            dataKey="sales"
            fill="var(--color-sales)"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
            shape={(props: any) => (
              <CustomBar
                {...(props as CustomBarProps)}
                fill="var(--color-sales)"
              />
            )}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
