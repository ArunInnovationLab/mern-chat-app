"use server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

import toast from "react-hot-toast";

// This function can be marked `async` if using `await` inside
export const middleware = async (request: NextRequest) => {
  const isAuthenticated = await checkAuthentication(request);

  if (!isAuthenticated) {
    // Optional: Show a toast notification on redirect (if needed)
    toast.error("Authentication failed. Redirecting to home.");
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
};

// Function to check authentication
const checkAuthentication = async (request: NextRequest) => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  try {

    const response = await fetch(`${baseUrl}/api/auth/authuser`, {
      method: "POST",
      credentials: "include",
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
    toast.error("An error occurred while checking authentication.");
    return false;
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};
