<script setup lang="ts">
const { fetchSession } = useAuth()
fetchSession()
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
