import * as dotenv from "dotenv";
dotenv.config();
import { Database } from "./schemas/dummy";
import  pg from 'pg';
const {Pool} = pg
import { Kysely, PostgresDialect } from "kysely";


const dialect =new PostgresDialect({
    pool: new Pool({
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        password: process.env.DB_PASS,
        max: 10
    })
})


export const db = new Kysely<Database>({
    dialect
})
