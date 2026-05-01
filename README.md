# 📝 Google Forms Lite Clone

A simplified Google Forms clone built as a monorepo using React, TypeScript, Redux Toolkit, and GraphQL.

---

## 🚀 Tech Stack

### Frontend (client)

- React + TypeScript
- Redux Toolkit (RTK Query)
- React Router
- Tailwind CSS
- GraphQL Code Generator
- graphql-request

### Backend (server)

- Node.js
- Apollo Server (GraphQL)
- In-memory data store

---

## 📦 Project Structure

googleFormLiteClone/
client/ # React application (Vite)
server/ # GraphQL API (Apollo Server)

---

## ⚙️ Setup & Run

### 1. Install dependencies

```bash
npm install
2. Run both client and server
npm run dev
This will start:
Client → http://localhost:5173
Server → http://localhost:4000

3. Run separately (optional)
npm run dev:client
npm run dev:server

🔧 GraphQL Codegen (client)
Generate TypeScript types from GraphQL schema:
cd client
npm run codegen

📌 Features
🏠 Homepage (/)
Displays all created forms
Create new form
View form
View responses
🛠 Form Builder (/forms/new)
Create form (title + description)
Add questions:
TEXT
MULTIPLE_CHOICE
CHECKBOX
DATE
Add/remove options for choice-based questions
Validation before submit
✍️ Form Filler (/forms/:id/fill)
Dynamic rendering of questions
Input types based on question type
Validation before submit
Submit responses

📊 Responses (/forms/:id/responses)
View all submitted responses
Answers mapped to their corresponding questions

🧠 Architecture Highlights
Separation of concerns
Pages → layout only
Hooks → business logic
Utils → validation & normalization
Components → pure UI
RTK Query
Data fetching
Caching
Automatic refetching using tags
GraphQL Codegen
Strong typing
Safer API integration

⚠️ Notes
Data is stored in memory (resets on server restart)
No authentication (as per task requirements)
💡 Possible Improvements
Add database (persistent storage)
Add authentication
Improve UI/UX (animations, drag & drop)
Add required fields validation per question
Pagination for responses

> ⚠️ Requires Node.js 18+ and npm 9+ (for workspace support)
```
