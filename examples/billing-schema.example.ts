import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { user } from '../server/utils/db.schema.auth'

// Example billing/subscription schema
export const subscriptionSchema = pgTable('subscription', {
  id: uuid().primaryKey().defaultRandom(),
  status: text().notNull(), // active, cancelled, past_due, etc.
  nextBilledAt: timestamp().notNull(),
  cancelAt: timestamp(),
  cancelAtPeriodEnd: boolean().notNull().default(false),
  userId: uuid().notNull().references(() => user.id, { onDelete: 'cascade' }),

  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
})
