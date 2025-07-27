interface Country {
  id: string
  label: string
}

export const useCountries = defineQuery(() => {
  const { state: countries } = useQuery({
    key: ['countries'],
    query: () => $fetch<Country[]>('/api/countries'),
    staleTime: 1000 * 60 * 60 * 24,
  })

  return {
    countries: computed(() => countries.value?.data || []),
  }
})
