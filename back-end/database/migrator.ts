import * as dotenv from "dotenv";
dotenv.config({
    path: path.join(import.meta.dirname, "../.env")
});
import { FileMigrationProvider, Migrator } from "kysely";
import { initDB } from "./init";
import { promises as fs } from "fs";
import path from "path";


async function migrateToLatest() {



    const db = initDB()

    const migrator = new Migrator({
        db,
        provider: new FileMigrationProvider({
            fs,
            path,
            migrationFolder: path.join(import.meta.dirname, "/migrations")
        })
    })

    const {error, results} = await migrator.migrateToLatest()

    results?.forEach((it) => {
        if (it.status === 'Success') {
          console.log(`migration "${it.migrationName}" was executed successfully`)
        } else if (it.status === 'Error') {
          console.error(`failed to execute migration "${it.migrationName}"`)
        }
      })
    
      if (error) {
        console.error('failed to migrate')
        console.error(error)
        process.exit(1)
      }
    
      await db.destroy()
}

migrateToLatest()