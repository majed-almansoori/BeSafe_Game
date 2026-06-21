# BeSafe Game

This project contains:

- **Frontend:** React + TypeScript + Vite
- **Backend:** Go API
- **Database:** PostgreSQL

The frontend can be hosted on **Vercel**. The backend is a Go server and should be hosted separately, for example on an EC2 server, Render, Fly.io, Railway, or another VPS/container host.

---

## Project structure

```text
.
├── src/                 # React frontend source code
├── public/              # Static frontend assets
├── backend/             # Go backend + Docker setup
├── package.json         # Frontend scripts/dependencies
├── vite.config.ts       # Vite config
├── vercel.json          # Vercel SPA routing config
└── README.md
```

---

## Requirements

Install these before running the project:

- Node.js **24.x**
- pnpm, npm, or yarn
- Go
- Docker + Docker Compose, if running the backend/database with Docker

The project currently specifies Node.js 24 in `package.json`:

```json
"engines": {
  "node": "24.x"
}
```

---

## Frontend setup

From the project root:

```bash
pnpm install
```

If you do not use pnpm, you can use npm:

```bash
npm install
```

---

## Run the frontend locally

```bash
pnpm dev
```

or:

```bash
npm run dev
```

The frontend will usually run at:

```text
http://localhost:5173
```

---

## Build the frontend

```bash
pnpm build
```

or:

```bash
npm run build
```

The production files will be created in:

```text
dist/
```

---

## Preview the production build locally

```bash
pnpm preview
```

or:

```bash
npm run preview
```

---

## Backend setup

Go to the backend folder:

```bash
cd backend
```

Create a `.env` file from the template:

```bash
cp .env.template .env
```

Default development values:

```env
BACKEND_PORT=8080
DATABASE_HOST=gav-database
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=somerandomstringfordevelopment
```

---

## Run backend and database with Docker

From the `backend/` folder:

```bash
docker compose up --build
```

The backend should run at:

```text
http://localhost:8080
```

Health check:

```bash
curl http://localhost:8080/health
```

Expected response:

```text
The game is on
```

---

## Frontend/backend connection

The frontend backend URL is defined in:

```text
src/constants.ts
```

Before deploying, replace the production URL with your real deployed backend API URL.

Example:

```ts
export const BACKEND_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://your-backend-domain.com";
```

---

## Deploy frontend to Vercel

### Option 1: Deploy from Vercel dashboard

1. Push the project to GitHub.
2. Go to Vercel.
3. Import the GitHub repository.
4. Use these settings:

```text
Framework Preset: Vite
Build Command: pnpm build
Output Directory: dist
Install Command: pnpm install
Node.js Version: 24.x
```

If using npm instead of pnpm:

```text
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node.js Version: 24.x
```

5. Deploy.

---

### Option 2: Deploy from terminal

Install Vercel CLI:

```bash
npm install -g vercel
```

Login:

```bash
vercel login
```

Deploy preview:

```bash
vercel
```

Deploy production:

```bash
vercel --prod
```

---

## Vercel routing

The project includes this `vercel.json`:

```json
{
  "routes": [{ "src": "/[^.]+", "dest": "/", "status": 200 }]
}
```

This is needed because the frontend uses client-side routing. It sends non-file routes back to `index.html`.

---

## Backend deployment note

Vercel is best used here for the frontend only.

The Go backend uses:

- a long-running HTTP server
- PostgreSQL
- Docker Compose

That setup is better deployed on a backend host such as:

- AWS EC2
- Render
- Railway
- Fly.io
- DigitalOcean
- any VPS with Docker

After deploying the backend, update `src/constants.ts` with the backend URL, then redeploy the frontend on Vercel.

---

## Useful scripts

From the project root:

```bash
pnpm dev       # run frontend locally
pnpm build     # build frontend for production
pnpm preview   # preview production build locally
pnpm lint      # run linting
```

or with npm:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

---

## Common problems

### Vercel says Node.js 18 is discontinued

Set the Vercel project Node.js version to **24.x**.

Also make sure `package.json` contains:

```json
"engines": {
  "node": "24.x"
}
```

---

### Frontend loads, but leaderboard/API does not work

Check that:

1. The backend is running.
2. `src/constants.ts` has the correct production backend URL.
3. The backend CORS settings allow the deployed frontend domain.
4. The database is running and reachable by the backend.

---

### Backend cannot connect to database

Check the values in `backend/.env`:

```env
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=
```

If using Docker Compose locally, the database host should usually be:

```env
DATABASE_HOST=gav-database
```

---

## Deployment checklist

Before production deployment:

- [ ] Frontend builds successfully with `pnpm build` or `npm run build`
- [ ] Backend is deployed and reachable
- [ ] PostgreSQL database is running
- [ ] `src/constants.ts` has the correct production backend URL
- [ ] Backend CORS allows the Vercel domain
- [ ] Vercel uses Node.js 24.x
- [ ] Vercel output directory is `dist`

