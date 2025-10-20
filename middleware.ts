import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkSession } from "@/lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const { pathname } = req.nextUrl;

  if (!accessToken && refreshToken) {
    const sessionValid = await checkSession();

    if (!sessionValid) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  if (privateRoutes.some((route) => pathname.startsWith(route))) {
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
