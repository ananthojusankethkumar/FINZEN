import { NextResponse, type NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionToken = request.cookies.get('firebase-session')

  const isAuthPage = pathname === '/login' || pathname === '/signup'

  if (!sessionToken && !isAuthPage && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  if (sessionToken && isAuthPage) {
     return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}
 
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
}
