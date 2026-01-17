
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
        // Mock Login Implementation
        const mockUser = {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin"
        };

        if (
          credentials?.email === "admin@example.com" &&
          credentials?.password === "password123"
        ) {
          return mockUser;
        }

        // Return null if validation fails
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