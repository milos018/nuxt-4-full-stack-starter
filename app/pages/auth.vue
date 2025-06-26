<script setup lang="ts">
definePageMeta({
  auth: false,
  layout: false,
})
</script>

<template>
  <UPage>
    <NuxtLoadingIndicator />

    <UPageHeader class="flex justify-center items-center">
      <div class="flex items-center">
        <UButton
          label="Home"
          to="/"
          icon="i-lucide-house"
          variant="ghost"
          color="neutral"
          class="mr-4"
        />

        <USeparator orientation="vertical" class="h-4" />

        <NuxtLink
          to="/auth"
          class="ml-4 text-sm"
        >
          Login
        </NuxtLink>

        <NuxtLink
          to="/auth/signup"
          class="ml-4 text-sm"
        >
          Sign up
        </NuxtLink>
      </div>
    </UPageHeader>

    <NuxtPage />
  </UPage>
</template>

<style scoped>
.router-link-exact-active {
  color: var(--ui-primary);
  font-weight: 600;
}
</style>
