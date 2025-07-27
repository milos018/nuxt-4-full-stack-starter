import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { user } from './db.schema.auth'

// Example resource schema - customize this for your specific needs
export const resourceSchema = pgTable('resource', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  description: text(),
  status: text().notNull().default('active'), // active, inactive, archived
  userId: uuid().notNull().references(() => user.id, { onDelete: 'cascade' }),

  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
})

// Add your domain-specific schemas here
// Example patterns:
// - Projects, Tasks, Comments (Project Management)
// - Products, Orders, Reviews (E-commerce)
// - Posts, Comments, Likes (Social Media)
// - Documents, Folders, Permissions (Document Management)
