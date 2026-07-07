import { NextResponse } from "next/server";

export function proxy(request) {
    const { pathname } = request.nextUrl;

    // Set pathname header for layout detection
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-next-pathname", pathname);

    // Allow login page and auth API
    if (pathname === "/admin/login" || pathname.startsWith("/api/auth")) {
        return NextResponse.next({
            request: { headers: requestHeaders },
        });
    }

    // Protect /admin routes — check for session cookie
    if (pathname.startsWith("/admin")) {
        const sessionToken =
            request.cookies.get("authjs.session-token")?.value ||
            request.cookies.get("__Secure-authjs.session-token")?.value;

        if (!sessionToken) {
            const loginUrl = new URL("/admin/login", request.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next({
        request: { headers: requestHeaders },
    });
}

export const config = {
    matcher: [
        // Match all paths except static files
        "/((?!_next/static|_next/image|favicon.ico|images|audio|models).*)",
    ],
};
