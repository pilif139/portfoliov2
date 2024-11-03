# Portfolio

I'm using Next.js 14, TypeScript, TailwindCSS, drizzle orm.

Development database is postgresql running in docker container.

Auth is made with help of [lucia-auth](https://lucia-auth.com/sessions/cookies/nextjs).

I'm planning to deploy it on Vercel and use their file storage and postgres.

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
│   ├── app
│   ├── components
│   │   ├── ui - reusable generic components 
│   ├── db
│   │   ├── schema - folder with all models
│   │   ├── db.ts - db connection and drizzle orm setup
│   ├── lib
│   │   ├── auth - auth and sessions logic
│   ├── server - server logic
│   │   ├── auth - server actions for auth
│   │   ├── post - server actions for post
```

## TODO

- [ ] Add file storage from Vercel
- [ ] Project page
- [ ] Blog page
- [ ] About me page
- [ ] Contact page

  **Admin panel**

- [ ] Add user management
- [ ] Create new project, blog
- [ ] Managing content of projects and blogs
- [ ] In a create view add file upload
- [ ] Add tags to project, blog
- [ ] Edit project, blog
- [ ] Delete project, blog
