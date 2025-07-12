import { reset, seed } from 'drizzle-seed'
import { db, sql } from './connection.ts'
import { schema } from './schema/index.ts'

await reset(db, schema)

await seed(db, schema).refine((f) => {
  return {
    rooms: {
      count: 25,
      columns: {
        name: f.fullName(),
        description: f.loremIpsum(),
      },
      with: {
        questions: 5,
      },
    },
  }
})

await sql.end()
