<script setup lang="ts">
const config = useRuntimeConfig()
const { user } = useAuth()
</script>

<template>
  <UPage>
    <UHeader>
      <template #title>
        {{ config.public.appName }}
      </template>

      <template #right>
        <UColorModeButton />

        <UButton
          label="Pricing"
          color="neutral"
          variant="ghost"
          to="/pricing"
          aria-label="Pricing"
          class="hidden md:block"
        />

        <UButton
          :label="user ? 'Dashboard' : 'Login / Signup'"
          :color="user ? 'primary' : 'neutral'"
          :variant="user ? 'solid' : 'ghost'"
          :to="user ? '/app' : '/auth'"
          trailing-icon="i-lucide-arrow-right"
          aria-label="Login"
          class="hidden md:flex items-center"
        />
      </template>

      <template #body>
        <UNavigationMenu
          orientation="vertical"
          :items="[
            [
              {
                label: 'Home',
                to: '/',
              },
              {
                label: 'Pricing',
                to: '/pricing',
              },
            ],
            [
              {
                label: 'Login',
                to: '/auth',
              },
              {
                label: 'Signup',
                to: '/auth/signup',
              },
            ],
          ]"
        />
      </template>
    </UHeader>

    <UMain class="relative p-4">
      <NuxtPage />
    </UMain>
  </UPage>
</template>
