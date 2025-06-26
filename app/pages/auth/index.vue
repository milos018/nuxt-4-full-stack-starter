<script setup lang="ts">
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

function DEFAULT_LOGIN() {
  return {
    email: '',
    password: '',
  }
}

const {
  defineField, 
  handleSubmit,
  resetForm, 
  errors, 
  values: formValues,
} = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialTouched: {
    email: false,
    password: false,
  },
  initialValues: DEFAULT_LOGIN(),
})

const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')

const { signIn } = useAuth()
const { start, finish } = useLoadingIndicator()

const responseErrors = ref('')

const onSubmit = handleSubmit(async (values) => {
  start()

  try {
    const { data, error } = await signIn.email({
      email: values.email,
      password: values.password,
    })

    if (error && error.message) {
      responseErrors.value = error.message
    }

    if (data?.user) {
      navigateTo('/app')
    }
  }
  catch (error) {
    console.error(error)
    return navigateTo('/auth')
  }
  finally {
    finish()
  }
})

async function signInGoogle() {
  start()

  try {
    await signIn.social({
      provider: 'google',
      callbackURL: '/app',
    })
  }
  finally {
    finish()
  }
}
</script>

<template>
  <UPageBody class="flex flex-col justify-center h-full items-center p-4 max-w-sm mx-auto">
    <h1 class="text-2xl text-center font-bold">
      Login
    </h1>

    <UButton
      color="primary"
      class="w-full"
      @click="signInGoogle()"
    >
      <UIcon name="i-simple-icons-google" />
      Login with Google
    </UButton>

    <USeparator />

    <UForm
      :state="formValues"
      class="max-w-sm mx-auto w-full flex flex-col gap-y-6" @submit="onSubmit()"
    >
      <UFormField label="Email" name="email" v-bind="emailProps" :error="errors.email">
        <UInput v-model="email" placeholder="Email" class="w-full" />
      </UFormField>

      <UFormField label="Password" name="password" v-bind="passwordProps" :error="errors.password">
        <UInput v-model="password" type="password" placeholder="Password" class="w-full" />
      </UFormField>

      <UAlert v-if="responseErrors" color="error" :title="responseErrors" />

      <UButton type="submit" class="w-full">
        Login
      </UButton>

      <UButton type="reset" variant="outline" color="neutral" class="w-full" @click="resetForm()">
        Reset
      </UButton>

      <USeparator />
    </UForm>
  </UPageBody>
</template>
