This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Supabase Setup

1. Copy `.env.example` to `.env.local`.
2. Isi variabel ini dari Supabase Dashboard > Project Settings > API:
	- `NEXT_PUBLIC_SUPABASE_URL` = Project URL
	- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon public key
	- `SUPABASE_SERVICE_ROLE_KEY` = service role key (hanya server)
3. Restart dev server setelah mengubah env.

Catatan penting:
- Publishable key / anon public key dipakai untuk browser dan request user biasa.
- Service role key dipakai hanya di server route atau job backend, jangan expose ke client.

## Supabase Migration Workflow

Repo ini sudah memakai migration folder di `supabase/migrations`.

Prerequisite:
- Install Supabase CLI: https://supabase.com/docs/guides/cli

Command utama:
- `npm run db:start` untuk menyalakan local stack Supabase
- `npm run db:reset` untuk apply semua migration + seed dari awal
- `npm run db:new -- <nama_migration>` untuk membuat file migration baru
- `npm run db:push` untuk push migration ke project yang sudah di-link
- `npm run db:types:local` untuk generate type dari local database
- `npm run db:types:linked` untuk generate type dari project Supabase yang di-link

Direkomendasikan untuk project besar:
- Semua perubahan schema wajib via migration file (jangan edit tabel manual tanpa migration)
- Setiap merge PR backend, update juga file `src/lib/types/database.ts`
- Jalankan `npm run db:reset` secara berkala di local untuk memastikan migration tetap reproducible

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
