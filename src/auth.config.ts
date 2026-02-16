import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/studentlogin",
    },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).id = token.id;
            }
            return session;
        },
    },
    providers: [], // Providers are added in the non-edge auth.ts
    trustHost: true,
} satisfies NextAuthConfig;
