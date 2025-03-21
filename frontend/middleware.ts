import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
  const user = req.nextauth?.token?.user;
  // Check if the user is authenticated
  if (!user) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow access to /dashboard for admin and manager
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (user.role !== "admin" && user.role !== "manager") {
      // Redirect to 401 Unauthorized page if the user doesn't have admin or manager role
      return NextResponse.redirect(new URL("/401", req.url));
    }
  }
  
  // Restrict access to /dashboard/user to admin only
  if (req.nextUrl.pathname === "/dashboard/user" && user.role !== "admin") {
    return NextResponse.redirect(new URL("/401", req.url));
  }

  // Allow the request to continue if the role and route are correct
  return NextResponse.next();
});

// Apply the middleware to the /dashboard and /dashboard/user routes
export const config = {
  matcher: ["/dashboard", "/dashboard/user"],
};
