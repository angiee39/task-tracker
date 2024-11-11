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
    matcher: ['/tasks/:path*', '/account/:path*'],
};

// export function middleware(request: any) {
//     console.log("middleware running")
//     return NextResponse.next();
// }