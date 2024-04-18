/* eslint-disable @next/next/no-img-element */
"use client";

import { LoaderIcon } from "@/icons";
import Topbar from "@/components/topbar";
import { useEffect, useState } from "react";
import { LineChart, Card, Title, DonutChart } from "@tremor/react"
import axios from "axios";

const News = () => {
  const [loading, setLoading] = useState(false);
  const [lineChartData, setLineChartData] = useState([]);
  const [insights, setInsights] = useState<{ 
    category: string;
    count: number;
   }[]>([]);
  const getLineChartData = async () => {
    const startDate = new Date(new Date().setDate(new Date().getDate() - 7))
      .toISOString()
      .slice(0, 10);
    const endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10);
    const res = await axios.post("http://localhost:5000/api/dashboard/get-report-count/", {
      startDate,
      endDate,
    });
    setLineChartData(res.data);
  };
  const getInsights = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard/get-home");
      const resultFormatted = Object.keys(res.data).map((key: string) => ({
        category: key,
        count: res.data[key] as number,
      }));
      setInsights(resultFormatted);
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  };
  useEffect(() => {
    getLineChartData();
    getInsights();
  }, []);
  return (
    <>
      <Topbar title="Analytics" />
      <main className="mt-8 flex flex-col gap-4 rounded-lg">
        {!loading ? (
          <div className="charts flex flex-col gap-4">
            {
              lineChartData.length > 0 &&
              <Card>
              <Title>
                Reports
              </Title>
              <LineChart
                className="mt-6"
                index="date"
                data={lineChartData}
                categories={["Registered Report Count", "Solved Report Count"]}
                colors={["emerald", "gray"]}
                yAxisWidth={40}
              />
            </Card>}
            {
              insights.length > 0 &&
              <Card>
              <Title>
                Reports
              </Title>
              <DonutChart
                className="mt-6"
                category="count"
                data={insights}
                index="category"
                colors={["slate", "violet", "indigo"]}
              />
            </Card>}
          </div>
        ) : (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <LoaderIcon size="3rem" />
          </div>
        )}
      </main>
    </>
  );
};

export default News;
