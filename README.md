# Podbay mini-mock
This project uses iTunes Search API, Fastify, Kysley and a NextJS UI - all with TypeScript - as mock for the [podbay](https://podbay.fm/) podcast feature of the website.

The structure is a mono-repo

# How to run
1. run a local Postgres instance using either a homebrew service for MacOS users, or windows background service, or use a local Docker container with a persistent volume

2. install back-end dependencies (make sure to use node v22):
```
cd back-end
npm install
```

3. run all the DB migrations
```
cd 
```
