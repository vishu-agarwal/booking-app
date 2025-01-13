import { createContext, ReactNode, Suspense, useContext, useEffect, useState } from "react";

import RoomBookingLoader from "@/components/RoomBookingLoader";

import { checkAuth } from "@/app/actions/checkAuth";

import { User } from "@/utils/types";

interface AuthContextType {
    isAuthenticated: boolean;
    currentUser: User;
    loading: boolean;
    login: () => void;
    logout: () => void;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User>({
        name: "",
        email: "",
        id: ""
    });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                const { isAuthenticated, user } = await checkAuth();
                setIsAuthenticated(isAuthenticated!);
                setCurrentUser(user!);
            } catch (error) {
                console.error("Error checking authentication:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthStatus();
    }, []);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setCurrentUser({
            name: "",
            email: "",
            id: ""
        });
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                currentUser,
                setCurrentUser,
                loading,
                setLoading,
                login,
                logout,
            }
            }
        >
            {loading ?
                <main className="mx-auto max-w-screen-2xl px-2 py-4 sm:px-4 lg:px-4 flex-grow content-center">
                    <RoomBookingLoader />
                </main>
                :
                <Suspense fallback={<RoomBookingLoader />} >
                    {children}
                </Suspense>
            }
        </AuthContext.Provider >
    );
};

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export { AuthProvider, useAuth };
