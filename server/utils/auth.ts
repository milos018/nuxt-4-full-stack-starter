import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import dotenv from 'dotenv'
import { db } from '~~/server/utils/db.config'
import { account, session, user, verification } from './db.schema.auth'

const nuxtConfig = useRuntimeConfig()
dotenv.config()

export const auth = betterAuth({
  appName: useRuntimeConfig().public.appName || 'My App',
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),

  user: {
    deleteUser: {
      enabled: true,
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: nuxtConfig.public.googleClientId as string,
      clientSecret: nuxtConfig.googleClientSecret as string,
    },
  },

  advanced: {
    database: {
      generateId: false,
    },
  },
})
