"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive bar chart"

const chartConfig = {
  views: {
    label: "Page Views",
  },
  student: {
    label: "student",
    color: "hsl(var(--chart-1))",
  },
  parents: {
    label: "parents",
    color: "hsl(var(--chart-2))",
  },
  teacher: {
    label: "teacher",
    color: "hsl(var(--chart-3))",
  },
  pendinguser: {
    label: "pendinguser",
    color: "hsl(var(--chart-4))",
  },
  admin:{
    label: "admin",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export type VisitRecord = {
  date: string;
  student: number;
  parents: number;
  teacher: number;
  pendinguser: number;
  admin: number;
}

export interface VisitorBarChartProps {
  chartData: VisitRecord[]
}

export function VisitorBarChart({chartData}:VisitorBarChartProps) {
  console.log(chartData)
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("student")

  const total = React.useMemo(
    () => ({
      student: chartData.reduce((acc, curr) => acc + curr.student, 0),
      parents: chartData.reduce((acc, curr) => acc + curr.parents, 0),
      teacher: chartData.reduce((acc, curr) => acc + curr.teacher, 0),
      pendinguser: chartData.reduce((acc, curr) => acc + curr.pendinguser, 0),
      admin: chartData.reduce((acc, curr) => acc + curr.admin, 0),
    }),
    []
  )

  return (
    <div className="flex w-full h-auto">
      <Card className="w-full h-auto">
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Bar Chart- Visited</CardTitle>
            <CardDescription>
              Showing total visitors for the last 1 months
            </CardDescription>
          </div>
          <div className="flex-1 flex w-full">
            {["student", "parents","teacher"].map((key) => {
              const chart = key as keyof typeof chartConfig;
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-1 py-1 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-1 sm:py-1"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-xs text-muted-foreground">
                    {chartConfig[chart].label}
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
          >
            <BarChart
              width={300}
              height={400}
              accessibilityLayer
              data={chartData}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
