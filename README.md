# PrepAI · Behavioral (BIPA)

Student learning project: a behavioral-interview practice app built one story at a time.

**This repository is the Story 1 scaffold.** You can run a typed Next.js 15 app locally with PrepAI design tokens loaded and a placeholder home screen.

## What this story includes

- Next.js 15 App Router, TypeScript (`strict`), Tailwind CSS, ESLint
- `src/` layout and path alias `@/*`
- shadcn/ui (button + card) for later stories to extend
- Spec §3.2 color tokens and Space Grotesk / Inter / IBM Plex Mono
- A placeholder home page (`PrepAI · Behavioral`)
- `.env.example` with commented placeholders only (unused here)
- Vitest with one token-unit test for CI

## What this story does **not** include

- Question bank, practice screen, or microphone capture
- GPT scoring, Whisper transcription, or TTS
- Dashboard, Prisma / database, or authentication
- Signal Bar / ScoreLabel (next foundation stories)

## Install and run

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You should see the PrepAI heading on a light canvas (`#F6F7FA`) with the primary blue mark.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local dev server (Turbopack) |
| `npm run lint` | ESLint |
| `npm run test` | Vitest (unit) |
| `npm run build` | Production build |
| `npx tsc --noEmit` | Typecheck |

## Design tokens

Canonical hex values live in `src/lib/tokens.ts` and are wired as CSS variables in `src/app/globals.css`. Tailwind utilities such as `bg-bg`, `text-ink`, `bg-primary`, and `font-display` come from those variables.

Fonts (Space Grotesk, Inter, IBM Plex Mono) are self-hosted via Fontsource so `npm run build` does not need to fetch Google Fonts.
