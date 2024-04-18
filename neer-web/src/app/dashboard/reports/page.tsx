"use client";

import Topbar from "@/components/topbar";
import { LoaderIcon } from "@/icons";
import axios from "axios";
import { useEffect, useState } from "react";


/* eslint-disable @next/next/no-img-element */
const Slides = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [reports, setReports] = useState<any[]>([]);
  const getReports = async () => {
    const res = await axios.get(`http://localhost:5000/api/dashboard/get-reports`, {
      
    });
    setReports(res.data);
  }
  useEffect(() => {
    getReports();
  }, []);
  return (
    <>
      <Topbar title="Analytics" />
      <section className="mt-8 flex justify-between gap-4">
        {!loading ? (
          <div className="charts flex flex-col gap-4">
            <div className="card">
              <div className="flex justify-between items-center">
                <h3 className="font-montserrat text-2xl font-bold">
                  In Review
                </h3>
                <p className="font-montserrat text-sm">
                  {reports.length}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {
                  reports.map((report, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <p className="font-montserrat text-sm">
                        {report.title}
                      </p>
                      <p className="font-montserrat text-sm">
                        {report.category}
                      </p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <LoaderIcon size="3rem" />
          </div>
        )}
      </section>
    </>
  );
};

export default Slides;
