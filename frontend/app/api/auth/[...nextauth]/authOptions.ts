import { LOGIN_URL } from "@/lib/apiEndpoints";
import myAxios from "@/lib/axios.config";
import { AuthOptions, ISODateString, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

// Define custom session interface
export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}

// Define custom user interface with token
export interface CustomUser {
  id?: string | null;
  name?: string | null;
  role?:string;
  email?: string | null;
  token?: string | null; // Sanctum token
  created_at?: string | null;
  updated_at?: string | null;
  profile_image?: string | null; // Optional, if you're using it
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // JWT callback to store the token
    async jwt({ token, user, trigger, session }) {
      // When the user logs in, `user` contains the data from authorize()
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          role:user.role,
          email: user.email,
          token: user.token, // Store the Sanctum token here
          created_at: user.created_at,
          updated_at: user.updated_at,
        } as CustomUser;
      }

      // Handle session updates (e.g., profile image)
      if (trigger === "update" && session?.profile_image) {
        const customUser = token.user as CustomUser;
        customUser.profile_image = session.profile_image;
      }

      return token;
    },

    // Session callback to make the token available in the session
    async session({
      session,
      token,
    }: {
      session: CustomSession;
      token: JWT;
      user: User;
    }) {
      session.user = token.user as CustomUser; // Pass the user data (including token) to the session
      return session;
    },
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        try {
          const res = await myAxios.post(LOGIN_URL, credentials);
          const response = res.data;

          const user = response?.user;
          if (user) {
            // Return the user object including the token
            return {
              id: user.id.toString(), // Ensure ID is a string for Next-Auth
              name: user.name,
              role:user.role,
              email: user.email,
              token: user.token, // Pass the Sanctum token
              created_at: user.created_at,
              updated_at: user.updated_at,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
};