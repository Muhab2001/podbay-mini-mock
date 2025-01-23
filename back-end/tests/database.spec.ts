import { sql } from "kysely";
import {db} from '../database/init'

// describe("database_repo", () => {
//     () => {
//         before(async () => {
//           await db.schema.createTable('person')
//             .addColumn('id', 'serial', (cb) => cb.primaryKey())
//             .addColumn('first_name', 'varchar', (cb) => cb.notNull())
//             .addColumn('last_name', 'varchar')
//             .addColumn('gender', 'varchar(50)', (cb) => cb.notNull())
//             .addColumn('created_at', 'timestamp', (cb) =>
//               cb.notNull().defaultTo(sql`now()`)
//             )
//             .execute()
//         })

// }})

(async () => {
  await db.schema.createTable('person')
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('first_name', 'varchar', (cb) => cb.notNull())
    .addColumn('last_name', 'varchar')
    .addColumn('gender', 'varchar(50)', (cb) => cb.notNull())
    .addColumn('created_at', 'timestamp', (cb) =>
      cb.notNull().defaultTo(sql`now()`)
    )
    .execute()
})()