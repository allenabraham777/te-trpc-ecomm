## Tech stack

-   [Next.js](https://nextjs.org)
-   [NextAuth.js](https://next-auth.js.org)
-   [Prisma](https://prisma.io)
-   [Tailwind CSS](https://tailwindcss.com)
-   [tRPC](https://trpc.io)

## Setting up the application

- Clone the repo

```
git clone https://github.com/allenabraham777/te-trpc-ecomm.git
```

- Navigate to project directory

```
cd te-trpc-ecomm
```

- Install dependencies

```
npm install
```

- Create a .env file and add the following variables
  - DATABASE_URL
  - JWT_SECRET

```
DATABASE_URL="XXXXXXXXXXXX"
JWT_SECRET="XXXXXXXXXXX"
```

- Sync the database

```
npm run db:push
```

You can access the prisma studio by `npm run db:studio`

- Start the dev server

```
npm run dev
```

Vist http://localhost:3000 to access the webapp
