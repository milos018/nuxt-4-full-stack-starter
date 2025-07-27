import process from 'node:process'
import { db } from '~~/server/utils/db.config'

import {
  resourceSchema,
} from '~~/server/utils/db.schema'

const seeds = [
  {
    table: resourceSchema,
    data: [
      {
        id: '1',
        name: 'Example Resource 1',
        description: 'This is an example resource for testing',
        status: 'active',
        userId: '1',
      },
      {
        id: '2',
        name: 'Example Resource 2',
        description: 'Another example resource',
        status: 'active',
        userId: '2',
      },
    ],
  },
]

async function seedDb() {
  try {
    for (let i = 0; i < seeds.length; i++) {
      const { table, data } = seeds[i]

      // First insert main categories
      for (let j = 0; j < data.length; j++) {
        const item = data[j]

        await db
          .insert(table)
          .values(item)
          .onConflictDoNothing()
          .returning()
      }
    }
  }
  catch (error) {
    console.error(error as Error)
  }
  finally {
    process.exit(0)
  }
}

seedDb()
