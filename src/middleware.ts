import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    if (!token) {
      return NextResponse.redirect("/auth");
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (!token) return false;
        return token.role === "admin";
      },
    },
  },
);

export const config = { matcher: ["/admin"] };
