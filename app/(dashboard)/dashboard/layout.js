"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import SideBar from "@/app/components /sidebar/SideBar";
import Cookies from "js-cookie";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter(); // Initialize the router

  // useEffect(() => {
  //   const token = Cookies.get("token"); // Get token from cookies
  //   setToken(token);

  //   // Redirect to login page if token is not present
  //   if (!token) {
  //     router.push("/login"); // Adjust the login path as necessary
  //   }
  // }, [router]); // Dependency array includes router to avoid stale closure

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}


      <div className={`${isSidebarOpen ? "block" : "hidden"} md:block`}>
        <SideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>



      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        {/* Mobile Toggle Button */}
        <button
          className="md:hidden p-2 mb-4 text-gray-800 bg-gray-200 rounded"
          onClick={() => setIsSidebarOpen(true)}
        >
          Open Menu
        </button>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
