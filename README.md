# HASHTAGSX Store

Customer-facing website (Vite + React). Orders are sent to the separate `hashtagsx-api` project.

## Deploy on Vercel
1. Push this folder to its own GitHub repo.
2. Vercel > Add New Project > import the repo. Framework is detected as Vite (build `npm run build`, output `dist`).
3. Add environment variable `VITE_API_URL` = your API address (for example `https://hashtagsx-api.onrender.com`).
4. Deploy. If you change `VITE_API_URL` later, redeploy.

## Run locally
```
npm install
npm run dev
```
Locally, requests to `/api` are proxied to `http://localhost:3001` (run the API there).
