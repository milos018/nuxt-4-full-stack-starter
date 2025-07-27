<script setup lang="ts">
const config = useRuntimeConfig()

definePageMeta({
  auth: false,
  layout: 'landing',
})
</script>

<template>
  <UPageBody>
    <UPageHero
      :title="config.public.appName"
      :description="config.public.appDescription"
      :links="[
        {
          label: 'Get Started',
          to: '/auth/signup',
          icon: 'i-lucide-square-play',
        },
      ]"
      class="max-w-5xl mx-auto"
    />
    <!-- Add your landing page content here -->
    <!-- Examples: Features section, How it works, Testimonials, etc. -->
  </UPageBody>
</template>
