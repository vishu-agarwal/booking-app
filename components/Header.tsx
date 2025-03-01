"use client";

import React from "react";
import { toast } from "react-toastify";
import { FaHome, FaClipboardList, FaPlus, FaSignInAlt, FaUserPlus, FaDoorOpen, FaList, FaSignOutAlt } from "react-icons/fa";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import NavItem from "./NavItem";

import { useAuth } from "@/context/authContext";

import { destroySession } from "@/app/actions/destroySession";

import { NavItemType } from "@/utils/types";

import logo from '@/assets/images/logo.webp';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Booking Rooms" }) => {
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { setLoading } = useAuth();

  const handleLogout = async () => {
    setLoading(true);
    const { success, error } = await destroySession();
    if (success) {
      setLoading(false);
      setIsAuthenticated(false);
      router.push("/login");
      toast.success(success);
    }
    if (error) {
      toast.error(error);
    }
  };

  const navItems: NavItemType[] = isAuthenticated
    ? [
      { href: "/", label: "Home", icon: FaHome },
      { href: "/rooms", label: "Rooms", icon: FaList },
      { href: "/rooms/add", label: "Add Rooms", icon: FaPlus },
      { href: "/bookings", label: "Bookings", icon: FaClipboardList },
      { href: "/rooms/my", label: "My Rooms", icon: FaDoorOpen },
      { href: "", label: "Sign Out", icon: FaSignOutAlt },

    ]
    : [
      { href: "/", label: "Home", icon: FaHome },
      { href: "/rooms", label: "Rooms", icon: FaList },
      { href: "/login", label: "Login", icon: FaSignInAlt },
      { href: "/register", label: "Register", icon: FaUserPlus },
    ];

  return (
    <header className="bg-gradient-to-r from-lime-600 to-lime-900 text-white shadow-lg">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href={"/"} className="flex items-center space-x-2 text-lg hover:text-lime-100 transition duration-300">
            <Image src={logo} alt={title} className="w-12 h-12 rounded-full" />
          </Link>
        </div>

        <nav className="hidden md:flex space-x-8">
          {navItems.map((item, index) =>
            item.show !== false ? (
              <NavItem handleLogout={handleLogout} key={index} href={item.href} label={item.label} icon={item.icon} />
            ) : null
          )}
        </nav>

        <div className="md:hidden">
          <button className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="md:hidden bg-lime-800 py-4">
        <ul className="space-y-4 px-4">
          {navItems.map((item, index) =>
            item.show !== false ? (
              <li key={index}>
                <NavItem key={index} href={item.href} label={item.label} icon={item.icon} />
              </li>
            ) : null
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
