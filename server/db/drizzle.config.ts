import process from 'node:process'
import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
  out: './server/db/drizzle',
  schema: [
    './server/utils/db.schema.ts',
    './server/utils/db.schema.auth.ts',
  ],
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NUXT_DATABASE_URL!,
  },
})
