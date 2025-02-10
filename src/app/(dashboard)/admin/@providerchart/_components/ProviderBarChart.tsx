'use client'
import React from 'react';
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const buildChartConfig = (data: { _count: number, provider: string }[]): ChartConfig => {
  const config: ChartConfig = { count: { label: "Count" } };
  
  data.forEach((item, index) => {
    config[item.provider] = {
      label: item.provider.charAt(0).toUpperCase() + item.provider.slice(1),
      color: `hsl(var(--chart-${index + 1}))`, // use index to ensure unique colors
    };
  });

  return config;
}

const buildChartData = (data: { _count: number, provider: string }[]) => {
  return data.map(item => ({
    provider: item.provider,
    count: item._count,
    fill: `var(--color-${item.provider})`,
  }));
}

export interface BarChartProps {
    data: { _count: number, provider: string }[];
}

const ProviderBarChart = ({data}:BarChartProps) => {
    const chartData = buildChartData(data);
    const chartConfig = buildChartConfig(data);
    return (
        <Card className='flex flex-col h-full'>
          <CardHeader>
            <CardTitle>Bar Chart - Providers</CardTitle>
            <CardDescription>Provider Distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                width={400}
                height={500}
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  left: 0,
                }}
              >
                <YAxis
                  dataKey="provider"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label || value}
                />
                <XAxis dataKey="count" type="number" hide />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="count" layout="vertical" radius={5} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )
}

export default ProviderBarChart;