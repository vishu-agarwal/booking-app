import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { checkAuth } from "./app/actions/checkAuth";

export async function middleware(request: NextRequest): Promise<NextResponse> {
    const { isAuthenticated } = await checkAuth();

    const { pathname } = request.nextUrl;
    console.log("pathname--", pathname);

    // Public Routes: /login, /register
    if (!isAuthenticated && (pathname === "/login" || pathname === "/register")) {
        return NextResponse.next();
    }

    // Protected Routes: /bookings, /rooms/add, /rooms/my, /bookings/:id
    if (!isAuthenticated && (pathname.startsWith("/bookings") || pathname.startsWith("/rooms/add") || pathname.startsWith("/rooms/my"))) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
        return NextResponse.redirect(new URL("/rooms", request.url));
    }

    // Public Routes that don't require authentication
    if (isAuthenticated && (pathname === "/rooms" || pathname.startsWith("/rooms/") || pathname === "/")) {
        return NextResponse.next();
    }

    // Default case: if none of the above, continue as normal
    return NextResponse.next();
}

export const config = {
    matcher: ["/bookings", "/bookings/:id", "/rooms/add", "/rooms/my", "/rooms", "/rooms/:id", "/", "/login", "/register"],
}