# Portfolio

This project taught me how to make a fullstack app with my self-made CMS. For the first time i used third-party storage from vercel to store images.

Development database is postgresql running in docker container.

Authentication is made with help of [lucia-auth](https://lucia-auth.com/sessions/cookies/nextjs).

## tech stack

!["Tech stack"](https://skillicons.dev/icons?i=nextjs,react,ts,postgres,vercel,tailwind&theme=light)

## how to run

```bash
npm install
npm run dev # start dev server
npm run build # build for production
npm run start # start production server

# run postgresql in docker
docker compose up -build # for first time
docker compose up # for next times

#drizzle ORM
npm run db:push # push schema to database
npm run db:generate # generate SQL schema files from models
npm run db:migrate # run migration from generated SQL schema files
npx drizzle-kit studio # open drizzle studio
```

## file structure

```bash
├── src
│   ├── app - nextjs app router
│   ├── components
│   │   ├── ui - reusable generic components
│   ├── db
│   │   ├── schema - folder with all models
│   │   ├── db.ts - db connection and drizzle orm setup
│   ├── lib
│   │   ├── auth - auth and sessions logic
│   ├── hooks - react hooks
│   ├── server - server logic
│   │   ├── auth - server actions for auth
│   │   ├── post - server actions for post
 configs, env etc.
```
