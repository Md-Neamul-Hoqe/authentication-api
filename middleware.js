import { NextResponse } from "next/server";

export function middleware(req) {
    const path = req.nextUrl.pathname;

    // console.log('path in middleware: ', path);

    const isPublicPath = path === '/signin' || path === '/signup'

    const token = req.cookies.get('token')?.value || ''

    console.log('Token in middleware: ', token);

    if (isPublicPath && token) return NextResponse.redirect(new URL(`/`, req.nextUrl))

    if (!isPublicPath && !token) return NextResponse.redirect(new URL('/signin', req.nextUrl))
}

export const config = {
    matcher: [ '/', '/signin', '/signup' ]
}