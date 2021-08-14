<template>
  <v-card>
    <v-card-title class="headline">로그인</v-card-title>
    <v-card-text>
      <v-form ref="$form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          label="E-mail"
          required
          :rules="[
            (v) => !!v || 'E-mail is required',
            (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          ]"
        />
        <v-text-field
          v-model="password"
          type="password"
          label="Password"
          required
          :rules="[(v) => !!v || '비밀번호를 입력해주세요.']"
        />
        <v-btn :loading="loading" :disabled="loading" @click="onLogin"
          >로그인</v-btn
        >
        <nuxt-link to="/changePassword" style="text-decoration: none">
          <v-btn>비밀번호 변경</v-btn>
        </nuxt-link>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api'
import { userStore } from '~/utils/accessor/store'
import { VFormComponent } from '~/types/app'
import { isValidate } from '~/utils/vuetity'

export default defineComponent({
  name: 'Login',
  setup(props, context) {
    const router = useRouter()
    const $form = ref<VFormComponent | null>(null)
    const valid = ref(false)
    const loading = ref(false)
    const email = ref('ably368@dummy.com')
    const password = ref('')

    const onLogin = async () => {
      if (!isValidate($form.value)) return
      loading.value = true
      try {
        await userStore.fetchLogin({
          email: email.value,
          password: password.value,
        })
        loading.value = false
        router.push({ path: '/' })
      } catch (e) {
        loading.value = false
        console.error(e)
      }
    }

    return {
      $form,
      valid,
      loading,
      email,
      password,
      onLogin,
    }
  },
})
</script>
