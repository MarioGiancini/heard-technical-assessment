# Heard Financial Transaction App

A full-stack CRUD application for managing financial transactions between accounts. Built as part of the Heard technical assessment.

## Tech Stack

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## Features

- Create, read, update, and delete financial transactions
- Manage transactions between different accounts
- Real-time form validation
- Responsive design with modern UI
- Data persistence using SQLite database
- Search and sort functionality
- Toast notifications for user feedback

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn or pnpm

## Getting Started

1. Clone the repository and navigate to the project directory:
```bash
cd transactions-app
```

2. Install the dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up the database:
```bash
# Run database migrations
npm run db:migrate
# or
yarn db:migrate
# or
pnpm db:migrate

# Seed the database with initial data
npm run db:seed
# or
yarn db:seed
# or
pnpm db:seed
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Available Scripts

- `dev` - Starts the development server using Turbopack
- `build` - Creates a production build
- `start` - Starts the production server
- `lint` - Runs ESLint for code linting
- `db:migrate` - Runs Prisma migrations
- `db:seed` - Seeds the database with initial data
- `db:reset` - Resets the database (warning: this will delete all data)
- `db:clean` - Removes the database files and resets migrations

## Project Structure

```
transactions-app/
├── app/                # Next.js app router
│   ├──(app)/           # App pages
│   ├── api/            # API routes
├── components/         # React components
│   ├── layout/         # Layout components
│   ├── pages/          # Page-specific components
│   └── ui/             # Reusable UI components
├── prisma/             # Prisma schema 
│   ├── migrations/     # Database migrations
│   ├── schema.prisma   # Database schema
│   └── seed.ts         # Database seeding script
└── public/             # Static files
```

## Database Schema

The application uses a SQLite database with Prisma as the ORM. The current main (simplified) entities are:

- `Account` - Represents a financial account
  - Fields: id, name, createdAt, updatedAt
  - Relations: fromTransactions, toTransactions

- `Transaction` - Represents a financial transaction
  - Fields: id, title, description, amount, transactionDate, createdAt, updatedAt
  - Relations: fromAccount, toAccount

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Notes
This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/
optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a 
new font family for Vercel.
