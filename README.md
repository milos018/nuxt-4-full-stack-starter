# Nuxt 3 Full Stack Starter Template

A production-ready template for building full-stack applications with Nuxt 3/4, featuring authentication, database integration, and modern tooling.

## Features

- 🚀 **Latest Nuxt**: Compatible with Nuxt 3 and ready for Nuxt 4
- 🔐 **Authentication**: Built-in auth system with Google OAuth support
- 💾 **Database Integration**: PostgreSQL with Drizzle ORM
- 🎨 **UI Components**: Nuxt UI Pro integration
- 🔍 **Type Safety**: Full TypeScript support
- 📊 **State Management**: Pinia store integration
- ✅ **Form Validation**: VeeValidate with Zod schema validation
- 🧪 **Testing**: Vitest for unit tests and Playwright for E2E testing
- 📱 **Responsive Design**: TailwindCSS for styling
- 🛣️ **Routing**: File-based routing with protected routes
- 🔄 **API Routes**: Server-side API endpoints with TypeScript
- 🌍 **Internationalization**: Built-in country data support

## Project Structure

```
nuxt-3-full-stack-starter/
├── app/                    # Client-side application
│   ├── components/         # Vue components
│   ├── composables/        # Composable functions
│   ├── layouts/           # Page layouts
│   ├── middleware/        # Navigation middleware
│   ├── pages/             # Application pages
│   └── utils/             # Utility functions
├── server/                # Server-side code
│   ├── api/              # API routes
│   └── db/               # Database configuration and schemas
├── shared/               # Shared types and utilities
└── tests/                # Test files
```

## Prerequisites

- Node.js 18.x or later
- PostgreSQL 15.x or later
- pnpm 10.x or later (recommended package manager)

## Getting Started

1. Clone the template:
   ```bash
   git clone https://github.com/yourusername/nuxt-3-full-stack-starter
   cd nuxt-3-full-stack-starter
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration.

4. Set up the database:
   ```bash
   pnpm db:generate  # Generate migrations
   pnpm db:push     # Push schema to database
   pnpm db:seed     # Seed initial data
   ```

5. Start development server:
   ```bash
   pnpm dev
   ```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm typecheck` - Run type checking
- `pnpm lint` - Lint code
- `pnpm test` - Run unit tests
- `pnpm test:e2e` - Run E2E tests
- `pnpm db:generate` - Generate database migrations
- `pnpm db:push` - Push schema to database
- `pnpm db:migrate` - Run database migrations
- `pnpm db:seed` - Seed database with initial data

## Configuration

### Database

Database configuration is managed through `server/db/drizzle.config.ts`. The schema is defined in `server/utils/db.schema.ts`.

### Authentication

Authentication settings can be configured in `server/utils/auth.ts`. The template supports:
- Email/Password authentication
- Google OAuth
- Custom OAuth providers (configurable)

### UI Components

The template uses Nuxt UI Pro for components. You can customize the theme in `app/app.config.ts`.

## Deployment

This template can be deployed to any platform that supports Node.js. Some recommended platforms:

- Vercel
- Netlify
- Digital Ocean
- AWS
- Google Cloud Run

For detailed deployment instructions, see the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this template for any project.
