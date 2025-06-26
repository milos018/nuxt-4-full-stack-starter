import { countries as countriesList } from 'countries-list'

export function seedCountries() {
  return Object.entries(countriesList)
    .map(([key, value]) => ({
      label: value.name,
      iso2: key,
      phoneCode: value.phone[0],
      currency: value.currency[0],
    }))
}
