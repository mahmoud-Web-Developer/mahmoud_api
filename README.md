# the_flow API

## Authentication
- `POST /auth/signup` — Register a new user
- `POST /auth/login` — Login and receive JWT

## Services
- `GET /services` — List all services

## Portfolio
- `GET /portfolio` — List all portfolio items

## News
- `GET /news` — List latest news

## Contact Requests
- `POST /contact-requests` — Submit a contact request

## Meetings
- `GET /meetings/slots` — Get available timeslots
- `POST /meetings` — Schedule a meeting

## Briefs
- `POST /briefs` — Submit a new brief

## Dashboard
- `GET /dashboard` — Get dashboard data

## Requests
- `POST /requests/contact` — Start new contact request
- `POST /requests/meeting` — Start new meeting request
- `POST /requests/brief` — Start new brief request

---

All endpoints accept and return JSON. Some endpoints may require JWT authentication in the `Authorization: Bearer <token>` header.

---

## Deployment on Glitch

1. **Upload all project files to Glitch** (except `node_modules`).
2. **Set up the start script in `package.json`:**
   ```json
   "scripts": {
     "start": "node server.js"
   }
   ```
3. **Create a `.env` file in Glitch** and add:
   ```
   PORT=3000
   JWT_SECRET=your_jwt_secret_here
   ```
4. **Glitch will auto-install dependencies and start your app.**
5. **Use the public Glitch URL as your API base URL.**

---

## Uploading to GitHub

1. **Install [Git](https://git-scm.com/downloads) if you don't have it.**
2. **Open a terminal in your project folder and run:**
   ```bash
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
3. **Replace `<your-repo-url>` with your GitHub repository URL.**
4. **Your project (including all folders) will be uploaded to GitHub.**
