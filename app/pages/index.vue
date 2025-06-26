<script setup lang="ts">
definePageMeta({
  auth: false,
  layout: 'landing',
})
</script>

<template>
  <UPageBody>
    <UPageHero
      title="One place to manage your personal and business finances"
      description="Budgett is a simple and easy-to-use personal finance management tool that helps you track your income, expenses, and savings both for personal and business use."
      :links="[
        {
          label: 'Sign up',
          to: '/auth/signup',
          icon: 'i-lucide-square-play',
        },
      ]"
      class="max-w-5xl mx-auto"
    />
  </UPageBody>
</template>
