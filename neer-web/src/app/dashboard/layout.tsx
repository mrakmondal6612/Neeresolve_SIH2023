"use client";

import Sidebar from "@/components/sidebar";
import { LoaderIcon } from "@/icons";
import { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex min-h-screen bg-default">
      {!loading ? (
        <>
          <Sidebar />
          <div className="relative m-8 flex-1">{children}</div>
        </>
      ) : (
        <div className="m-auto">
          <LoaderIcon size="3rem" />
        </div>
      )}
    </div>
  );
};

export default Layout;
