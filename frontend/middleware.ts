import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export const middleware = async (request: NextRequest) => {
  const cookie = cookies();
  const jwtToken = cookie.get("jwt")?.value;

  const isAuthenticated = await checkAuthentication(jwtToken);

  if (!isAuthenticated) {
    // Auth failed redirect to home page
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
};

const checkAuthentication = async (jwtToken: any) => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  try {
    if (!jwtToken) {
      console.error("JWT token not found in cookies");
      return false;
    }

    const response = await fetch(`${baseUrl}/api/auth/authuser`, {
      method: "POST",
      headers: {
        Cookie: `jwt=${jwtToken};`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    const result = await response.json();

    if (result?.error) {
      console.error("Authentication error:", result.error);
      return false;
    }

    return true;
  } catch (error: any) {
    console.error("Error checking authentication:", error.message);
    return false;
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};
