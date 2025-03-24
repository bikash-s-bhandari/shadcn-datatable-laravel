import { LOGIN_URL } from "@/lib/apiEndpoints";
import myAxios from "@/lib/axios.config";
import { AuthOptions, ISODateString, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import apiClient from "@/lib/api-client";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
     
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          accessTokenExpires: Date.now() + 86400 * 1000,
          user: user,
          isImpersonating: user.isImpersonating,
          originalUser: user.originalUser,
        };
      }
    
      if (trigger === "update" && session?.accessToken) {
        
        return { ...token, ...session };
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      session.isImpersonating = token.isImpersonating;
      session.originalUser = token.originalUser;
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
          const response = await apiClient.post("/auth/login", {
            email: credentials?.email,
            password: credentials?.password,
          });
          const { user, token } = response.data;
          return {
            ...user,
            accessToken: token,
            isImpersonating: false,
            originalUser: null,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
};
