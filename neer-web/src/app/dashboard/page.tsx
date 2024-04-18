"use client";

import Topbar from "@/components/topbar";
import { NewsIcon, NotificationIcon, ReportIcon, VideoIcon } from "@/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const [insights, setInsights] = useState({
    totalReports: 0,
    pendingReports: 0,
    resolvedReports: 0,
    rejectedReports: 0,
  });
  const getInsights = async () => {
    const res = await axios.get("http://localhost:5000/api/dashboard/get-home");
    setInsights({
      totalReports:
        +res.data.reviewReports +
        +res.data.solvedReports +
        +res.data.rejectedReports,
      pendingReports: res.data.reviewReports,
      resolvedReports: res.data.solvedReports,
      rejectedReports: res.data.rejectedReports,
    });
  };
  useEffect(() => {
    getInsights();
  }, []);
  return (
    <>
      <Topbar />
      <div className="mt-8 grid grid-cols-2 gap-10">
        <div className="card">
          <Link
            href={"/dashboard/videos"}
            className="inline-block h-full w-full cursor-pointer rounded-3xl border border-transparent bg-[#ddefe0] p-12 transition-all hover:border-white active:scale-95"
            shallow
          >
            <div className="icon mb-8">
              <VideoIcon size="2.5rem" />
            </div>
            <div className="content">
              <h3 className="font-montserrat text-2xl font-bold">
                Total Reports
              </h3>
              <p className="mt-4 font-montserrat text-xl font-bold">
                {insights.totalReports}
              </p>
            </div>
          </Link>
        </div>
        <div className="card">
          <Link
            href={"/dashboard/notifications"}
            className="inline-block h-full w-full cursor-pointer rounded-3xl border border-transparent bg-[#efdada] p-12 transition-all hover:border-white active:scale-95"
            shallow
          >
            <div className="icon mb-8">
              <NotificationIcon size="2.5rem" />
            </div>
            <div className="content">
              <h3 className="font-montserrat text-2xl font-bold">
                Pending Reports
              </h3>
              <p className="mt-4 font-montserrat text-xl font-bold">
                {insights.pendingReports}
              </p>
            </div>
          </Link>
        </div>
        <div className="card">
          <Link
            href={"/dashboard/news"}
            className="inline-block h-full w-full cursor-pointer rounded-3xl border border-transparent bg-[#f4ecdd] p-12 transition-all hover:border-white active:scale-95"
            shallow
          >
            <div className="icon mb-8">
              <NewsIcon size="2.5rem" />
            </div>
            <div className="content">
              <h3 className="font-montserrat text-2xl font-bold">
                Resolved Reports
              </h3>
              <p className="mt-4 font-montserrat text-xl font-bold">
                {insights.resolvedReports}
              </p>
            </div>
          </Link>
        </div>
        <div className="card">
          <Link
            href={"/dashboard/reports"}
            className="inline-block h-full w-full cursor-pointer rounded-3xl border border-transparent bg-[#dee0ef] p-12 transition-all hover:border-white active:scale-95"
            shallow
          >
            <div className="icon mb-8">
              <ReportIcon size="2.5rem" />
            </div>
            <div className="content">
              <h3 className="font-montserrat text-2xl font-bold">
                Rejected Reports
              </h3>
              <p className="mt-4 font-montserrat text-xl font-bold">
                {insights.rejectedReports}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;
