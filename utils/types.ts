export interface NavItemType {
    href: string;
    label: string;
    icon?: React.ElementType<React.SVGProps<SVGSVGElement>>; // Proper typing for icons
    show?: boolean
    handleLogout?: () => void;
}

export interface RoomsType {
    $id: string;
    user_id: string;
    name: string;
    description: string;
    sqft: number;
    capacity: number;
    location: string;
    address: string;
    amenities: string;
    availability: string;
    price_per_hour: number;
    image: string[];
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface SessionResponse {
    success?: string;
    error?: string;
    isAuthenticated?: boolean;
    isLoading?: boolean;
    user?: User
}

export interface State {
    error?: string;
    success?: string;
    isLoading: boolean;
}

export interface LoginState extends State {
    email:string;
    password:string;
}

export interface BookingRoom {
    $id: string;
    check_in: string;
    check_out: string;
    room_id: RoomsType;
    user_id: string;
}

export interface PreviousState {
    userId?: string;
    lastLogin?: Date;
}