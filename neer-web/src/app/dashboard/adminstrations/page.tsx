/* eslint-disable @next/next/no-img-element */
"use client";

import Topbar from "@/components/topbar";
import { LoaderIcon } from "@/icons";
import { useState } from "react";

const Videos = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Topbar title="Add Adminstation" />
      <main className="mt-8 flex flex-col gap-4 rounded-lg bg-white">
        {!loading ? (
          <h2>Add Adminstation</h2>
        ) : (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <LoaderIcon size="3rem" />
          </div>
        )}
      </main>
    </>
  );
};

export default Videos;
