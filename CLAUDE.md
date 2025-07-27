# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `pnpm dev` - Start development server on port 5011
- `pnpm build` - Build for production
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm lint` - Check code style
- `pnpm lint:fix` - Auto-fix linting issues

### Database Commands
- `pnpm db:generate` - Generate Drizzle migrations from schema changes
- `pnpm db:push` - Push schema to PostgreSQL database
- `pnpm db:migrate` - Run migrations
- `pnpm db:seed` - Seed database with initial data

### Testing Commands
- `pnpm test` - Run unit tests with Vitest
- `pnpm test:e2e` - Run end-to-end tests with Playwright

## Project Architecture

### Tech Stack
- **Framework**: Nuxt 4 (SSR disabled, SPA mode)
- **UI**: Nuxt UI Pro + TailwindCSS v4
- **Auth**: Better Auth with Google OAuth support
- **Database**: PostgreSQL + Drizzle ORM
- **State**: Pinia + Pinia Colada
- **Forms**: VeeValidate + Zod validation
- **Testing**: Vitest + Playwright

### Directory Structure

#### Client (`/app`)
- `pages/` - File-based routing, protected routes in `/app/*`
- `composables/` - Vue composables, including auth utilities
- `components/` - Reusable Vue components
- `middleware/` - Route middleware (auth.global.ts for authentication)
- `layouts/` - Page layouts (landing layout for public pages)
- `queries/` - API query functions using Pinia Colada

#### Server (`/server`)
- `api/` - API routes following REST conventions:
  - `resource/create.post.ts` - POST endpoints
  - `resource/[id].get.ts` - GET by ID
  - `resource/[id].patch.ts` - PATCH updates
  - `resource/[id].delete.ts` - DELETE endpoints
- `db/` - Database configuration and seeds
- `utils/` - Server utilities:
  - `auth.ts` - Better Auth configuration
  - `auth-z.ts` - Authorization helper (returns userId or throws 401)
  - `db.config.ts` - Drizzle database client
  - `db.schema.ts` - Main database schemas
  - `db.schema.auth.ts` - Auth-related schemas

#### Shared (`/shared`)
- Type definitions and shared utilities between client/server

### Key Patterns

#### API Route Pattern
```typescript
export default eventHandler(async (event) => {
  // 1. Validate request with Zod
  const body = await readValidatedBody(event, schema.parse)

  // 2. Authenticate user
  const userId = await authZ(event)

  // 3. Execute with transaction
  return await db.transaction(async (tx) => {
    // Business logic
  })
})
```

#### Database Schema Pattern
- Use UUID primary keys: `id: uuid().primaryKey().defaultRandom()`
- Always include timestamps: `createdAt`, `updatedAt`
- Foreign keys with cascade: `userId: uuid().references(() => user.id, { onDelete: 'cascade' })`

#### Authentication Flow
- Auth middleware (`auth.global.ts`) checks all routes
- Public routes: `/`, `/auth/*`, `/pricing`
- Protected routes: `/app/*`
- Use `useUser()` composable for client-side auth state
- Use `authZ(event)` for server-side auth checks

### Configuration

#### Environment Variables
Required in `.env`:
- `NUXT_DATABASE_URL` - PostgreSQL connection string
- `NUXT_GOOGLE_CLIENT_ID` - Google OAuth client ID
- `NUXT_GOOGLE_CLIENT_SECRET` - Google OAuth secret
- `NUXT_GOOGLE_REDIRECT_URI` - OAuth redirect URI

#### Runtime Config
Defined in `nuxt.config.ts`:
- Public config accessible client-side
- Private config for server-only secrets

### Development Workflow
1. Schema changes: Edit `server/utils/db.schema*.ts`
2. Generate migration: `pnpm db:generate`
3. Apply changes: `pnpm db:push`
4. Create API route following patterns in `server/api/`
5. Add types to `shared/` if needed
6. Create UI in `app/pages/` or `app/components/`
7. Run tests: `pnpm test` and `pnpm test:e2e`
8. Type check: `pnpm typecheck`
9. Lint: `pnpm lint`
