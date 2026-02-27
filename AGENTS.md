# AGENTS.md

This file provides guidelines for agentic coding systems working in the samson-ai repository.

## Build, Lint, and Test Commands

### Root Level

- `bun run backend:dev` - Start backend development server with hot reload
- `bun run frontend:dev` - Start frontend development server
- `bun run email` - Start email template development server
- `bun run build:frontend` - Build frontend for production
- `bun run start:backend` - Start backend production server
- `bun run test:backend` - Run backend tests

### Frontend (packages/frontend/)

- `bun run dev` - Start Vite dev server
- `bun run build` - Build for production
- `bun run lint` - Run ESLint
- `bun run preview` - Preview production build

### Backend (packages/backend/)

- `bun run dev` - Start Hono server with Bun hot reload
- `bun run start` - Start production server
- `bun run test` - Run all tests
- `bun test tests/<file>` - Run single test file
- `bun test --watch` - Run tests in watch mode

### AI Agent (packages/ai/)

- `mastra dev` - Start Mastra development server
- `mastra build` - Build Mastra agent

### Email (packages/transactional/)

- `bun run dev` - Start email template dev server
- `bun run build` - Build email templates

### Database (Drizzle ORM)

Run from packages/backend/:

- `bunx drizzle-kit generate` - Generate migrations
- `bunx drizzle-kit migrate` - Run migrations
- `bunx drizzle-kit push` - Push schema to database
- `bunx drizzle-kit studio` - Open Drizzle Studio
- `bunx drizzle-kit introspect` - Introspect database

### Code Quality

- ESLint configured in root and per-package
- Prettier for formatting (configured in root/prettier.config.js)
- Run `prettier --write .` to format all files

## Code Style Guidelines

### TypeScript

- Strict mode enabled everywhere
- Use TypeScript for all files (.ts for logic, .tsx for React components)
- Type inference is preferred over explicit types when clear
- Use Zod schemas for runtime validation (shared/index.ts has examples)
- Extract types from Zod schemas using `z.infer<Schema>`

### Imports

- Use path aliases: `@/` for package-relative paths
- Examples: `import { auth } from "@/auth"`, `import { db } from "@db/index"`
- Shared types via `import { onBoardingSchema } from "shared"`
- Absolute imports over relative where possible
- Organize imports: external libraries first, then internal, then types

### Formatting (Prettier)

- Single quotes: `'string'`
- 2 spaces indentation
- Semicolons required
- Trailing commas (ES5 style): `{ a, b, }`

### Naming Conventions

- Variables/Functions: camelCase (`getUserById`, `workoutSettings`)
- Components: PascalCase (`RouteComponent`, `RootComponent`)
- Constants: UPPER_SNAKE_CASE (`LOCALDOMAIN`)
- Types/Interfaces: PascalCase (`User`, `onBoardingState`)
- Database tables: camelCase (`workoutSettings`, `workoutSchedule`)
- File names: kebab-case for components (`age-select.tsx`, `cardio-equipment.tsx`)

### Error Handling

- Use try/catch blocks for async operations
- Log errors with `console.error()`
- Re-throw errors to propagate up (see workers/createroutine.worker.ts:101-103)
- Return early for validation failures
- Use Zod validation schemas for input validation

### Frontend Specifics

- React 19 with React Router (@tanstack/react-router)
- Components use `createFileRoute()` for routing
- Form handling with react-hook-form + Zod validation
- State management: Zustand with persist middleware (state/onboarding.tsx)
- Styling: Tailwind CSS v4 + daisyui components
- Use className prop for styling, daisyui classes preferred

### Backend Specifics

- Hono web framework
- BullMQ for background jobs/workers
- Database: Drizzle ORM with PostgreSQL
- Authentication: better-auth
- Use `nanoid()` for ID generation
- WebSocket support via Bun's ServerWebSocket
- CORS enabled for frontend communication

### Database Schema

- Use Drizzle's `pgTable` for table definitions
- Export insert/update schemas via `drizzle-zod`: `createInsertSchema()`, `createUpdateSchema()`
- Schema files in packages/backend/src/db/schema/index.ts and packages/backend/auth-schema.ts
- References use onDelete: "cascade" for cleanup

### AI Agent (Mastra)

- Agents defined in packages/ai/src/mastra/agents/
- Instructions string in agent config
- Tools can be added to agent configuration
- Model: Google Gemini 2.0 Flash

### Testing

- Tests use Bun's built-in test runner (`bun:test`)
- Test files go in `packages/backend/tests/` directory
- Test files follow pattern: `<feature>.test.ts`
- Use `mock.module()` to mock external dependencies (db, auth, queues)
- Use `mock()` to create mock functions
- Use `beforeEach()` to clear mocks between tests
- Use `expect().toHaveBeenCalled()` for assertion

Example test structure:

```typescript
import { describe, test, expect, beforeEach, mock } from 'bun:test';

const mockGetSession = mock(() => {}) as any;

mock.module('../auth', () => ({
  auth: { api: { getSession: mockGetSession } },
}));

const { app } = await import('../src/index');

describe('POST /endpoint', () => {
  beforeEach(() => {
    mockGetSession.mockClear();
  });

  test('returns 401 if not authenticated', async () => {
    mockGetSession.mockResolvedValue(null);
    const res = await app.request('/endpoint', { method: 'POST' });
    expect(res.status).toBe(401);
  });
});
```

### Workspace Structure

- Monorepo with packages/ai, packages/backend, packages/frontend, packages/shared, packages/transactional
- Shared code in packages/shared/index.ts (Zod schemas, types)
- Use workspace: "\*" for internal package dependencies

### Environment Variables

- Use `Bun.env.VARIABLE_NAME` pattern
- Type cast when needed: `Bun.env.SAMSON_URL as string`
- .env files in each package directory

### Comments

- Add TODO comments for future work (see workers/createroutine.worker.ts:45-46)
- Keep comments minimal; let code be self-documenting
