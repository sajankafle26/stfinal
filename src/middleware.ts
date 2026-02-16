import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    // Check if accessing admin routes
    if (nextUrl.pathname.startsWith("/adminpanel")) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/studentlogin", nextUrl));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/adminpanel/:path*"],
};
