import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

import Link from "next/link";

import { NavItemType } from "@/utils/types";

const navItems: NavItemType[] = [
    { href: "/about", label: "About Us" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/contact", label: "Contact" }
];

const Footer: React.FC = () => {
    return (
        <footer className="bg-lime-900 text-white py-8">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center md:space-x-16 space-y-8 md:space-y-0">
                    <div className="text-center md:text-left space-y-4">
                        <h3 className="text-2xl font-bold text-lime-200">Quick Links</h3>
                        <ul className="space-y-2">
                            {navItems.map((item, index) => (
                                <Link key={index} href={item.href} className="block text-white hover:text-lime-100 transition duration-300">
                                    {item.label}
                                </Link>
                            ))}
                        </ul>
                    </div>
                    <div className="text-center md:text-center space-y-4">
                        <h3 className="text-2xl font-bold text-lime-200">Booking Rooms</h3>
                        <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
                    </div>
                    <div className="flex justify-center space-x-6">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-lime-100 transition duration-300">
                            <FaFacebookF className="w-6 h-6" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-lime-100 transition duration-300">
                            <FaTwitter className="w-6 h-6" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-lime-100 transition duration-300">
                            <FaInstagram className="w-6 h-6" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-lime-100 transition duration-300">
                            <FaLinkedinIn className="w-6 h-6" />
                        </a>
                    </div>
                </div>
                <div className="mt-8 text-center text-sm text-gray-400">
                    <p>Designed with love by Your Company</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
