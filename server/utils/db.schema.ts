import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { user } from './db.schema.auth'

export const resourceSchema = pgTable('resource', {
  id: uuid().primaryKey().defaultRandom(),
  status: text().notNull(),
  nextBilledAt: timestamp().notNull(),
  cancelAt: timestamp(),
  cancelAtPeriodEnd: boolean().notNull().default(false),
  userId: uuid().notNull().references(() => user.id),

  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
})
