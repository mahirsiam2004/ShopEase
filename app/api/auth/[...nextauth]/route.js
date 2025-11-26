
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,        // ← Correct
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // ← Correct
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Demo login - accept any email/password
        if (credentials?.email && credentials?.password) {
          return {
            id: "1",
            name: credentials.email.split('@')[0] || "User", // ← This shows in navbar
            email: credentials.email,
          };
        }
        return null;
      }
    })
  ],

  pages: {
    signIn: '/login',
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;        // ← CRITICAL: Pass name to session
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name; // ← Now navbar shows real name
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };