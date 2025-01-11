'use client';

import { AuthProvider } from "@/context/authContext";
import { FC, ReactNode } from "react";
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