# Supabase in This Repository

This project stores schema changes as SQL migrations in `supabase/migrations`.

## First-time Setup

1. Install Supabase CLI.
2. Ensure Docker is running (for local Supabase stack).
3. Run:

```bash
npm run db:start
npm run db:reset
```

This will apply all migrations and execute `supabase/seed.sql`.

## Link to Remote Project

```bash
npm run db:login
npm run db:link -- --project-ref <your-project-ref>
```

After linking, push local migrations:

```bash
npm run db:push
```

## Create New Migration

```bash
npm run db:new -- add_orders_index
```

Then edit the generated SQL file in `supabase/migrations`.

## Generate TypeScript Types

From local DB:

```bash
npm run db:types:local
```

From linked remote project:

```bash
npm run db:types:linked
```

## Team Rules

- Never edit production tables directly without creating a migration file.
- Migration files are append-only; do not rewrite old migrations after they are applied in shared environments.
- Keep seed data idempotent (`on conflict`) so resets are predictable.
