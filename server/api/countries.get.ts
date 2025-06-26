import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

// cache countries in memory
async function queryCountriesList(_db: PostgresJsDatabase) {
  return await db
    .select()
    .from(countrySchema)
    .orderBy(countrySchema.label)
}

type Countries = Awaited<ReturnType<typeof queryCountriesList>>
const cachedCountries: Countries = []

export default eventHandler(async () => {
  try {
    if (cachedCountries.length)
      return cachedCountries

    cachedCountries.push(...await queryCountriesList(db))
    return cachedCountries
  }
  catch (error) {
    if (error instanceof Error) {
      console.error(error)
      throw createError(error)
    }
  }
})
