 // middleware.ts
 import { NextResponse, NextRequest } from 'next/server'
 
 import * as jose from 'jose';
import { getToken } from 'next-auth/jwt';
  
 export async function middleware(req: NextRequest) {

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if ( req.nextUrl.pathname.startsWith('/user/perfil') ) {

    if ( !session ) {
      const requestedPage = req.nextUrl.pathname;
      const url = req.nextUrl.clone();
      url.pathname = `/auth/login`;
      url.search = `p=${ requestedPage }`
  
      return NextResponse.redirect( url );
    }
  
    return NextResponse.next();

  }

  if ( req.nextUrl.pathname.startsWith('/auth/login') ) {

    if ( session ) {
      // const requestedPage = req.nextUrl.search;
      // console.log(requestedPage);
      const url = req.nextUrl.clone();
      url.pathname = `/`;
      // url.search = `p=${ requestedPage }`
      url.search = ``
  
      return NextResponse.redirect( url );
    }
  
    return NextResponse.next();

  }


  //  const previousPage = req.nextUrl.pathname;
  
  //  if (previousPage.startsWith('/user')) {
  //    const token = req.cookies.get('token')?.value || '';
  
  //    try {
  //      await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED));
  //      return NextResponse.next();
  //    } catch (error) {
  //      return NextResponse.redirect(
  //        new URL(`/auth/login?p=${previousPage}`, req.url)
  //      );
  //    }
  //  }

 };
  
 export const config = {
   matcher: [
     '/user/:path*',
     '/auth/:path*'
   ],
 };