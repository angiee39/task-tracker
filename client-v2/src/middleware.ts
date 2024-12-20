import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token');
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}
export const config = {
    // matcher: ['/account', '/tasks', '/logs'],
    matcher: ['/account/:path*', '/tasks/:path*', '/logs/:path*'],
};
