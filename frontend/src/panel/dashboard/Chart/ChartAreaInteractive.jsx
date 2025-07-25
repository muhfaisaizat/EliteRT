import React, { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Pemasukan",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Pengeluaran",
    color: "var(--chart-2)",
  },
};


const ChartAreaInteractive = ({chartDataDB}) => {
  const [timeRange, setTimeRange] = useState("90d");
  const mappedChartData = chartDataDB.map((item) => ({
  date: item.tanggal,
  desktop: item.pemasukan,
  mobile: item.pengeluaran,
}));
 const filteredData = mappedChartData.filter((item) => {
  const date = new Date(item.date);
  const now = new Date();

  if (timeRange === "this_month") {
    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth()
    );
  }

  let daysToSubtract = 90;
  if (timeRange === "30d") {
    daysToSubtract = 30;
  } else if (timeRange === "7d") {
    daysToSubtract = 7;
  } else if (timeRange === "1y") {
    daysToSubtract = 365;
  }

  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - daysToSubtract);
  return date >= startDate;
});
  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Rekap Pemasukan & Pengeluaran</CardTitle>
          <CardDescription>
  {timeRange === "this_month"
    ? "Menampilkan data bulan ini"
    : timeRange === "1y"
    ? "Menampilkan data 1 tahun terakhir"
    : `Menampilkan data ${timeRange === "90d" ? "3 bulan terakhir" : timeRange === "30d" ? "30 hari terakhir" : "7 hari terakhir"}`}
</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="1y" className="rounded-lg">
    Last 1 year
  </SelectItem>
  <SelectItem value="this_month" className="rounded-lg">
    This month
  </SelectItem>
  <SelectItem value="90d" className="rounded-lg">
    Last 3 months
  </SelectItem>
  <SelectItem value="30d" className="rounded-lg">
    Last 30 days
  </SelectItem>
  <SelectItem value="7d" className="rounded-lg">
    Last 7 days
  </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default ChartAreaInteractive
