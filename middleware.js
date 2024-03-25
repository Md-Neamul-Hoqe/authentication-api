import { NextResponse } from "next/server";
import { tokenName } from "./app/utils/constansts";

export function middleware(req) {
    const path = req.nextUrl.pathname;

    // console.log('path in middleware: ', path);

    const isPublicPath = path === '/signin' || path === '/signup'

    /* Get token from cookie */
    const token = req.cookies.get(tokenName)?.value || ''

    /* Redirect from back end */
    if (isPublicPath && token) return NextResponse.redirect(new URL(`/`, req.nextUrl))

    if (!isPublicPath && !token) return NextResponse.redirect(new URL('/signin', req.nextUrl))
}

export const config = {
    matcher: [ '/', '/signin', '/signup' ]
}