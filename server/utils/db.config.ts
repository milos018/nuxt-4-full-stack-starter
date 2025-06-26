import process from 'node:process'
import { drizzle } from 'drizzle-orm/node-postgres'
import 'dotenv/config'

export const db = drizzle({
  connection: {
    connectionString: process.env.NUXT_DATABASE_URL!,
  },
})
