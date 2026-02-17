# Collabora Docs — by CodeBros

Collabora Docs is a lightweight, real-time collaborative document editor built for hackathon-style development. This mono-repo contains a TypeScript Node.js backend (API + realtime via Socket.IO + Prisma) and a React + Vite frontend (Tailwind, Quill editor, and real-time collaboration client).

**Repository layout**
- **collabora-docs-api/**: Backend API written in TypeScript using Express, Prisma (Postgres), and Socket.IO.
- **collabora-docs-web/**: Frontend single-page app built with React, Vite, TypeScript, Tailwind CSS and Quill for rich text editing.

**Key features**
- Real-time collaborative editing using Socket.IO and Quill.
- User authentication and project/document management.
- Prisma ORM with migrations for database schema.

**Tech stack**
- Backend: Node.js, TypeScript, Express, Socket.IO, Prisma
- Frontend: React, TypeScript, Vite, Tailwind CSS, React-Quill

**Prerequisites**
- Node.js (v16+ recommended)
- npm or yarn
- A running Postgres database for the backend (or configure Prisma to your DB of choice)

**Quick start**

1) Backend (development)

Change into the backend folder, install dependencies and start the dev server (uses `nodemon`):

```bash
cd collabora-docs-api
npm install
npm run dev
```

Notes:
- To run Prisma migrations during development use `npm run migrate` inside `collabora-docs-api`.
- Production start builds TypeScript and runs the generated `dist` files: `npm run build` then `npm start`.

2) Frontend (development)

Change into the frontend folder, install dependencies and run the Vite dev server:

```bash
cd collabora-docs-web
npm install
npm run dev
```

Visit the Vite dev URL (typically http://localhost:5173) to open the app.

**Environment**
- Backend: create a `.env` inside `collabora-docs-api` with necessary variables (DB connection, JWT secret, etc.). See `collabora-docs-api/src` for precise env keys used by the app.

**Database / Prisma**
- Schema is at `collabora-docs-api/src/prisma/schema.prisma` and Prisma config is present in the backend package.json. Run migrations locally with:

```bash
cd collabora-docs-api
npm run migrate
```

**Repository files to look at**
- Backend entry: collabora-docs-api/src/app.ts
- Frontend entry: collabora-docs-web/src/main.tsx

**Contributing**
- Open issues or PRs for fixes and improvements. Follow existing code style and run linters/tests where present.

**License**
- MIT

