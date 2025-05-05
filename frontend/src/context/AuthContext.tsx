import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';
// User type definition
interface User {
    id: Number;
    name: string;
    email: string;
    role: string;
    mobile: string;
}

// Type for the context
interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    isLoading: boolean,

}

// Context creation
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

// AuthProvider component
const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);
    axios.defaults.withCredentials = true;

    const fetchUser = async () => {
        try {
            const res = await axios.get<{ user: User }>('http://localhost:5000/api/auth/me');
            setUser(res.data.user)
            setIsAuthenticated(true)
        } catch (error) {
            setIsAuthenticated(false)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchUser()
    }, []);

    const login = async (credentials: { email: string; password: string }) => {
        await axios.post('http://localhost:5000/api/auth/login', credentials, {
            withCredentials: true,
        });
        await fetchUser();
    };

    const logout = async () => {
        await axios.post('http://localhost:5000/api/auth/logout', {}, {
            withCredentials: true,
        });
        setIsAuthenticated(false)
        setUser(null);
        window.location.href = '/?logout=true'


    };

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
export { AuthProvider };