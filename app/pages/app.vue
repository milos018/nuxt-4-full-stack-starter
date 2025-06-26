<script setup lang="ts">
import { useCountries } from '~/queries/countries'

definePageMeta({
  name: 'app-home',
})

const { fetchSession } = useAuth()
await fetchSession()

const { countries } = useCountries()

function useNavigation() {
  return {
    personalLinks: computed(() => [
      [
        {
          label: 'Home',
          icon: 'i-lucide-house',
          to: '/app',
          exact: true,
        },
      ],
      [
        {
          label: 'Account settings',
          icon: 'i-lucide-settings',
          to: '/app/settings',
        },
      ],
    ]),
    businessLinks: computed(() => [
      ...(countries.value && countries.value?.length > 1
        ? [{
            label: 'Dashboard',
            icon: 'i-lucide-layout-dashboard',
            to: '/app/business',
            exact: true,
          }]
        : []),
      ...(countries.value ?? [])?.map(country => ({
        label: country.label,
        to: '/app/business',
        defaultOpen: true,
        children: [
          {
            label: 'Home',
            to: `/app/business`,
            icon: 'i-lucide-layout-panel-left',
            exact: true,
          },
        ],
      })),
    ]),
    userMenuItems: computed(() => [
      [
        {
          label: 'Profile',
          icon: 'i-lucide-user',
          onSelect: () => navigateTo('/app/settings/profile'),
        },
        {
          label: 'Billing',
          icon: 'i-lucide-credit-card',
          onSelect: () => navigateTo('/app/settings/billing'),
        },
        {
          label: 'Settings',
          icon: 'i-lucide-cog',
          onSelect: () => navigateTo('/app/settings'),
        },
      ],
      [
        {
          label: 'New personal account',
          icon: 'i-lucide-plus',
          onSelect: () => navigateTo('/app/settings/account?open=true'),
        },
        {
          label: 'New business',
          icon: 'i-lucide-plus',
          onSelect: () => navigateTo('/app/settings/business?open=true'),
        },
      ],
      [
        {
          label: 'Logout',
          icon: 'i-lucide-log-out',
          onSelect: () => handleLogout(),
        },
      ],
    ]),
  }
}

const { personalLinks, businessLinks, userMenuItems } = useNavigation()

const tabItems = ref([
  {
    label: 'Personal',
    icon: 'i-lucide-user',
  },
  {
    label: 'Business',
    icon: 'i-lucide-briefcase',
  },
])

const currentTab = ref(String(0))
const route = useRoute()

onMounted(() => {
  route.path.startsWith('/app/business') ? currentTab.value = '1' : currentTab.value = '0'
})

watch(currentTab, (newTab) => {
  if (newTab === '0') {
    navigateTo('/app')
  }
  else if (countries.value && countries.value?.length === 1) {
    navigateTo(`/app/business`)
  }
  else {
    navigateTo('/app/business')
  }
})


const { signOut, user } = useAuth()

function handleLogout() {
  signOut()
  navigateTo('/auth')
}

const isSidebarOpen = ref(false)
const isSlideoverOpen = ref(false)

watch(() => route.path, () => {
  isSidebarOpen.value = false
  isSlideoverOpen.value = false
})
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar
      v-model:open="isSidebarOpen"
      class="min-w-[280px]"
    >
      <template #header>
        Budgett
      </template>

      <UTabs
        v-model="currentTab"
        color="secondary"
        :items="tabItems"
        size="sm"
      />

      <UNavigationMenu
        v-if="currentTab === '0'"
        :items="personalLinks"
        orientation="vertical"
      />

      <UNavigationMenu
        v-if="currentTab === '1'"
        :items="businessLinks"
        orientation="vertical"
      />

      <template #footer>
        <UDropdownMenu
          :ui="{
            content: 'w-[247px]',
          }"
          :items="userMenuItems"
        >
          <UButton :label="`${user?.name} (${user?.email})`" icon="i-lucide-menu" color="neutral" variant="outline" class="p-2 w-full" />
        </UDropdownMenu>
      </template>
    </UDashboardSidebar>

    <NuxtPage />

    <!-- transaction form -->
    <USlideover
      v-model:open="isSlideoverOpen"
      title="New transaction"
      description=" "
      :ui="{
        body: 'p-0 sm:p-0',
      }"
    >
      <template #body>
        form
      </template>
    </USlideover>
  </UDashboardGroup>
</template>
