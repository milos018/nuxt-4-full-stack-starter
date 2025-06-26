export const useCountries = defineQuery(() => {
  const { state: countries } = useQuery({
    key: ['countries'],
    query: () => $fetch('/api/countries'),
    staleTime: 1000 * 60 * 60 * 24,
  })

  return {
    countries: computed(() => countries.value?.data?.map(country => ({
      id: country.id,
      label: country.label,
    }))),
  }
})
