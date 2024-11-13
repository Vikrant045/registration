"use client";
import React from "react";
import Link from "next/link";

const SideBar = ({ isOpen, onClose }) => {
  return (
    <aside
      className={`fixed md:relative top-0 left-0 h-full bg-gray-800 text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:w-full transition-transform duration-300 ease-in-out z-20`}
    >
      <div className="flex items-center justify-between md:hidden p-4 bg-gray-900">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button className="text-gray-300" onClick={onClose}>
          ✖
        </button>
      </div>
      <nav className="p-4">
        <ul>
          <li className="mb-4">
            <Link href="/dashboard">
              <p className="hover:text-gray-300">Dashboard Home</p>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/dashboard/analytics">
              <p className="hover:text-gray-300">Analytics</p>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/dashboard/users">
              <p className="hover:text-gray-300">Users</p>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/dashboard/settings">
              <p className="hover:text-gray-300">Settings</p>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;


