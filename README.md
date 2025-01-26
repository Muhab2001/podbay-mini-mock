# Podbay mini-mock
This project uses iTunes Search API, Fastify, Kysley and a NextJS 15 - all with TypeScript - as mock for the [podbay](https://podbay.fm/) podcast feature of the website.

The structure is a mono-repo

# How to run
1. run a local Postgres instance using either a homebrew service for MacOS users, or windows background service, or use a local Docker container with a persistent volume

2. install back-end dependencies (make sure to have node v22 installed):
```shell
cd back-end
npm install
```

3. run all the DB migrations
```bash
# assuming you are already in back-end directory
cd database
tsx migrator.ts # OR npx tsx migrator.ts
```

4. bring up the back-end dev server
```bash
# assuming you are already in back-end directory
cd ../
npm run start
```

5. open a new terminal in the repo root and install front-end dependencies
```bash
cd front-end
npm install
```

6. spin up the dev server
```bash
npm run dev
```

6. open the mock in your [browser](http://localhost:3000/home/)
