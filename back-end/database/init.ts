

import { Database } from './schemas/full_db';
import  pg from 'pg';
const {Pool} = pg
import { Kysely, PostgresDialect } from "kysely";



export const initDB = () => {
    
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
    
    
    return new Kysely<Database>({
        dialect
    })
    
}