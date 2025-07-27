# Template Setup Guide

This guide will help you customize this Nuxt 3 Full Stack Starter template for your specific project needs.

## Quick Start

1. **Clone and Install**
   ```bash
   git clone <repository-url> my-project
   cd my-project
   pnpm install
   ```

2. **Configure Environment Variables**
   Create a `.env` file with:
   ```env
   # Application
   NUXT_APP_NAME="Your App Name"
   NUXT_APP_DESCRIPTION="Your app description"

   # Database
   NUXT_DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

   # Google OAuth (optional)
   NUXT_GOOGLE_CLIENT_ID="your-client-id"
   NUXT_GOOGLE_CLIENT_SECRET="your-client-secret"
   NUXT_GOOGLE_REDIRECT_URI="http://localhost:5011/auth/google"
   ```

3. **Set Up Database**
   ```bash
   pnpm db:generate
   pnpm db:push
   pnpm db:seed  # Optional: adds example data
   ```

4. **Start Development**
   ```bash
   pnpm dev
   ```

## Customization Areas

### 1. Application Branding

The app name and description are configured via environment variables and accessible throughout the app:

- **Landing Page**: `app/pages/index.vue` - Update hero content
- **App Layout**: `app/pages/app.vue` - Sidebar header
- **Landing Layout**: `app/layouts/landing.vue` - Navigation header

### 2. Database Schema

The template includes a generic `resourceSchema` in `server/utils/db.schema.ts`. To customize:

1. **Modify the schema** for your domain:
   ```typescript
   export const projectSchema = pgTable('project', {
     id: uuid().primaryKey().defaultRandom(),
     name: text().notNull(),
     dueDate: timestamp(),
     priority: text().notNull().default('medium'),
     // ... your fields
   })
   ```

2. **Generate migrations**:
   ```bash
   pnpm db:generate
   pnpm db:push
   ```

3. **Update types** in `shared/resource.ts`

### 3. API Routes

The template includes generic CRUD routes in `server/api/resource/`. To customize:

1. **Copy the pattern** for your entities
2. **Update validation schemas** using Zod
3. **Maintain consistent error handling**

Example patterns in `server/.cursor/rules/api-routes.mdc`

### 4. UI Customization

- **Colors**: Edit `app/app.config.ts`
- **Components**: Uses Nuxt UI Pro - check their docs for customization
- **Layouts**: Modify `app/layouts/` for different page structures

### 5. Authentication

The template uses Better Auth with:
- Email/password authentication
- Google OAuth (configurable)
- Protected routes via middleware

To add providers, edit `server/utils/auth.ts`

## Domain-Specific Examples

### E-commerce Setup
```typescript
// server/utils/db.schema.ts
export const productSchema = pgTable('product', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  price: decimal({ precision: 10, scale: 2 }).notNull(),
  inventory: integer().notNull().default(0),
  // ...
})

export const orderSchema = pgTable('order', {
  // ...
})
```

### Project Management Setup
```typescript
// server/utils/db.schema.ts
export const projectSchema = pgTable('project', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  status: text().notNull().default('planning'),
  // ...
})

export const taskSchema = pgTable('task', {
  projectId: uuid().references(() => projectSchema.id),
  // ...
})
```

### Blog/CMS Setup
```typescript
// server/utils/db.schema.ts
export const postSchema = pgTable('post', {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  content: text().notNull(),
  published: boolean().default(false),
  // ...
})
```

## Deployment Checklist

- [ ] Update all environment variables
- [ ] Configure production database
- [ ] Set up OAuth redirect URIs
- [ ] Update `nuxt.config.ts` for production
- [ ] Configure your hosting platform
- [ ] Set up monitoring/logging
- [ ] Configure backups

## Common Patterns

### Adding a New Entity

1. **Create schema** in `server/utils/db.schema.ts`
2. **Generate types** in `shared/[entity].ts`
3. **Create API routes** in `server/api/[entity]/`
4. **Add UI pages** in `app/pages/`
5. **Update navigation** in `app/pages/app.vue`

### Adding Features

- **Billing**: See `examples/billing-schema.example.ts`
- **File uploads**: Add to API routes with multer/formidable
- **Email**: Configure with Resend/SendGrid
- **Background jobs**: Add with Nitro tasks

## Resources

- [Nuxt Documentation](https://nuxt.com/docs)
- [Nuxt UI Pro](https://ui.nuxt.com/pro)
- [Drizzle ORM](https://orm.drizzle.team)
- [Better Auth](https://www.better-auth.com)
- [Zod Validation](https://zod.dev)
