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

```txt
googleFormLiteClone/
├── client/   # React application (Vite)
└── server/   # GraphQL API (Apollo Server)
```

---

## ⚙️ Setup & Run

> Requires Node.js 18+ and npm 9+.

### 1. Install dependencies

```bash
npm install
```

### 2. Run both client and server

```bash
npm run dev
```

This will start:

- Client: `http://localhost:5173`
- Server: `http://localhost:4000`

### 3. Run separately

```bash
npm run dev:client
npm run dev:server
```

---

## 🔧 GraphQL Codegen

Generate TypeScript types from the GraphQL schema:

```bash
cd client
npm run codegen
```

---

## 📌 Features

### Homepage (`/`)

- Displays all created forms
- Create new form
- View form
- View responses

### Form Builder (`/forms/new`)

- Create a form with title and description
- Add questions with different types:
  - `TEXT`
  - `MULTIPLE_CHOICE`
  - `CHECKBOX`
  - `DATE`
- Add and remove options for choice-based questions
- Client-side validation before submit

### Form Filler (`/forms/:id/fill`)

- Dynamic rendering of questions
- Input type depends on question type
- Client-side validation before submit
- Submit responses to the GraphQL server

### Responses (`/forms/:id/responses`)

- View all submitted responses
- Answers are mapped to their corresponding questions

---

## 🧠 Architecture Highlights

- Separation of concerns:
  - Pages handle layout
  - Hooks contain business logic
  - Validation and normalization are moved to utility files
  - Components are focused on UI
- RTK Query for data fetching, caching, and cache invalidation
- GraphQL Codegen for strongly typed API operations
- In-memory backend store for forms and responses

---

## ⚠️ Notes

- Data is stored in memory and resets when the server restarts.
- Authentication is not included, as it was not required by the task.

---

## 💡 Possible Improvements

- Add persistent database storage
- Add authentication
- Improve UI/UX with animations or drag and drop
- Add required/optional toggle per question
- Add pagination for responses

---

⚠️ Requires Node.js 18+ and npm 9+ (for workspace support)

## 👨‍💻 Author

Maksym Markush
