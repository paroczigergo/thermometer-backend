import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { mongoDbConnectionForAdapter } from '../../../lib/mongodb'


export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(mongoDbConnectionForAdapter()),
  providers: [
      GoogleProvider({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET
      }),
  ],
  callbacks: {
      async session({ session }) {
        return session;
      }
    }
}

export default NextAuth(authOptions)