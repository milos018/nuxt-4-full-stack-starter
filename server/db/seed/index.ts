import process from 'node:process'
import { db } from '~~/server/utils/db.config'

import {
  countrySchema,
} from '~~/server/utils/db.schema'
import { seedCountries } from './seed.countries'

const seeds = [
  {
    table: countrySchema,
    data: seedCountries(),
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
          .values({
            ...item,
          })
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
