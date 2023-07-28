 // middleware.ts
 import { NextResponse, NextRequest } from 'next/server'
 
 import * as jose from 'jose';
import { getToken } from 'next-auth/jwt';
import { jwt } from './utils';
  
 export async function middleware(req: NextRequest) {
  
   if (req.nextUrl.pathname.startsWith('/user')) {
     const token = req.cookies.get('token')?.value || '';
     const previousPage = req.nextUrl.pathname;
     console.log('Pagina Perfil')
     console.log(previousPage)
  
     try {
       await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED));
       return NextResponse.next();
     } catch (error) {
       return NextResponse.redirect(
        new URL(`/auth/login?p=${ previousPage }`, req.url )
       );
     }
   }
  
   if (req.nextUrl.pathname.startsWith('/auth')) {
     const token = req.cookies.get('token')?.value || '';
     const previousPage = req.nextUrl.pathname;
  
     try {
       await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED));
       return NextResponse.redirect(
        new URL(`/auth/login?p=${previousPage}`, req.url)
      );
     } catch (error) {
       return NextResponse.next();
     }
   }

 };
  
 export const config = {
   matcher: [
     '/user/:path*',
     '/auth/:path*'
   ],
 };