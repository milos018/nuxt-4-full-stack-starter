<script setup lang="ts">
import { useCountries } from '~/queries/countries'

const {
  countries,
} = useCountries()

</script>

<template>
  <UDashboardPanel id="app-index">
    <template #header>
      <UDashboardNavbar title="Home">
        <template #leading>
          <Icon name="i-lucide-house" />
        </template>

        <template #right>
          <UButton label="Country" variant="subtle" icon="i-lucide-plus" @click="() => {}" />
        </template>
      </UDashboardNavbar>
    </template>

    <UProgress
      animation="swing"
    />

    <template #body>
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-6 sm:mb-8">
          <Icon name="i-lucide-rocket" class="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-primary mb-3 sm:mb-4" />
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Welcome to Budgett!
          </h2>
          <p class="text-sm sm:text-base text-gray-600">
            Let's get you started with 2 simple steps
          </p>
        </div>

        <div class="space-y-3 sm:space-y-4">
          <!-- Step 1: Create Personal Account -->
          <UCard>
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 p-3 sm:p-4">
              <div class="flex items-center gap-3 sm:gap-4">
                <div class="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm font-medium shrink-0">
                  1
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-gray-900 text-sm sm:text-base">
                    Create Personal Account
                  </h3>
                  <p class="text-xs sm:text-sm text-gray-600 mt-1">
                    Set up your first account to track your finances
                  </p>
                </div>
              </div>
              <UButton
                color="primary"
                class="w-full sm:w-auto shrink-0"
                size="sm"
                to="/app/settings/account?open=true"
              >
                Create Account
              </UButton>
            </div>
          </UCard>

          <!-- Step 2: Add Payment Method -->
          <UCard>
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 p-3 sm:p-4">
              <div class="flex items-center gap-3 sm:gap-4">
                <div class="flex items-center justify-center w-8 h-8 bg-gray-200 text-gray-600 rounded-full text-sm font-medium shrink-0">
                  2
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-gray-500 text-sm sm:text-base">
                    Add Payment Method
                  </h3>
                  <p class="text-xs sm:text-sm text-gray-500 mt-1">
                    Add a payment method to track transactions
                  </p>
                </div>
              </div>
              <UButton
                disabled
                variant="soft"
                class="w-full sm:w-auto shrink-0"
                size="sm"
              >
                Coming Next
              </UButton>
            </div>
          </UCard>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
