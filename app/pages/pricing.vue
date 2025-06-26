<script setup lang="ts">
definePageMeta({
  auth: false,
  layout: 'landing',
})
</script>

<template>
  <UPageBody>
    <UPageFeature
      class="max-w-md mx-auto"
      title="Pricing"
      description="For all your personal and business needs"
    />

    <UPricingPlan
      class="max-w-md mx-auto"
      title="Monthly"
      description="For all your personal and business needs"
      price="EUR 6.99"
      :features="[
        'Unlimited transactions',
        'Unlimited categories',
        'Unlimited accounts',
        'Unlimited business accounts',
        'Unlimited business clients',
        'Unlimited business invoices',
      ]"
      :button="{
        label: 'Sign up',
        to: '/auth/signup',
      }"
      highlight
    />
  </UPageBody>
</template>
