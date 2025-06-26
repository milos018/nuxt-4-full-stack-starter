<script setup lang="ts">
import { signupSchema } from '~~/shared/auth'

const { start, finish } = useLoadingIndicator()

function DEFAULT_SIGNUP() {
  return {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
}

const {
  defineField,
  handleSubmit,
  resetForm,
  errors,
  values,
} = useForm({
  validationSchema: toTypedSchema(signupSchema),
  initialValues: DEFAULT_SIGNUP(),
})

const [name, nameProps] = defineField('name')
const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')
const [confirmPassword, confirmPasswordProps] = defineField('confirmPassword')

const { signUp, user, fetchSession } = useAuth()
const { signIn } = useAuth()

const onSubmit = handleSubmit(async (values) => {
  try {
    await signUp.email({
      email: values.email,
      password: values.password,
      name: values.name,
    })

    await fetchSession()

    if (user.value) {
      navigateTo('/app')
    }
  }
  catch (error) {
    console.error(error)
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
      Sign Up
    </h1>

    <UButton
      color="primary"
      class="w-full"
      @click="signInGoogle()"
    >
      <UIcon name="i-simple-icons-google" />
      Sign up with Google
    </UButton>

    <USeparator />

    <UForm :state="values" class="max-w-sm mx-auto w-full flex flex-col gap-y-6" @submit="onSubmit()">
      <UFormField label="Name" name="name" v-bind="nameProps" :error="errors.name">
        <UInput v-model="name" placeholder="Name" class="w-full" />
      </UFormField>

      <UFormField label="Email" name="email" v-bind="emailProps" :error="errors.email">
        <UInput v-model="email" placeholder="Email" class="w-full" />
      </UFormField>

      <UFormField label="Password" name="password" v-bind="passwordProps" :error="errors.password">
        <UInput v-model="password" type="password" placeholder="Password" class="w-full" />
      </UFormField>

      <UFormField label="Confirm Password" name="confirmPassword" v-bind="confirmPasswordProps" :error="errors.confirmPassword">
        <UInput v-model="confirmPassword" type="password" placeholder="Confirm Password" class="w-full" />
      </UFormField>

      <USeparator class="w-full mb-3" />

      <UButton type="submit" class="w-full">
        Sign up
      </UButton>

      <UButton type="reset" variant="outline" color="neutral" class="w-full" @click="resetForm()">
        Reset
      </UButton>
    </UForm>
  </UPageBody>
</template>
