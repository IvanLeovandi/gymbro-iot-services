import NextAuth from "next-auth/next";
import { ConnectDB } from "database/db-util";
import { compare } from 'bcryptjs'
import CredentialsProvider from "next-auth/providers/credentials"
import { redirect } from "next/dist/server/api-utils";
export default NextAuth({
  session: {
      strategy: "jwt",
  },
  providers: [
      CredentialsProvider({
          type: "credentials",
          credentials: {},
          async authorize(credentials, res) {
              const client = await ConnectDB();
              const usersCollection = client.db().collection("User");

              const { username, password } = credentials;
              console.log(credentials)
              if (!username) {
                  throw new Error("Username is required");
              }

              const user = await usersCollection.findOne({ username });

              if (!user) {
                  throw new Error("User does not exist");
              }
              
              if (!password) {
                  throw new Error("Password is required");
              }

              
              const isPasswordValid = (password === user.password);

              if (!isPasswordValid) {
                  throw new Error("Invalid password");
              }

              return user;

          }
      })
  ],
  pages: {
      signIn: "/authentication/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
      async jwt({ token, user }) {
          if (user && user._id) {
              token._id = user._id;
          }

          if (user) {
              token.role = user.role;
              token.email = user.email;
          }
          return token;
      },  
      async session({ session, token }) {
          if (token._id) {
              session.user._id = token._id;
              session.user.role = token.role;
              session.user.email = token.email;
          }
        
          return session;
      },
  }
})