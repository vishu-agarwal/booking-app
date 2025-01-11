import React from "react";
import Link from "next/link";
import { NavItemType } from "@/utils/types";

const NavItem: React.FC<NavItemType> = ({ href, label, icon: Icon, handleLogout }) => {
    return (
        <>
            {
                label === "Sign Out" ?
                    <p onClick={handleLogout}
                        className="flex items-center space-x-2 text-lg hover:text-cyan-300 transition duration-300 cursor-pointer"
                    >
                        {Icon && <Icon className="w-6 h-6" />}
                        <span>Sign Out</span>
                    </p>
                    :
                    <Link href={href} className="flex items-center space-x-2 text-lg hover:text-cyan-300 transition duration-300">
                        {Icon && <Icon className="w-6 h-6" />}
                        <span>{label}</span>
                    </Link>
            }
        </>
    );
};

export default NavItem;
