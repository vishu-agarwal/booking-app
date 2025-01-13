'use client';

import { FC, ReactNode } from "react";

import { AuthProvider } from "@/context/authContext";
interface IAuthWrapperProps {
    children: ReactNode;
};

const AuthWrapper: FC<IAuthWrapperProps> = ({ children }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}

export default AuthWrapper;