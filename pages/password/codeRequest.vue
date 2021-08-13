<template>
  <v-card>
    <v-card-title class="headline">인증 코드 발급 요청 페이지</v-card-title>
    <v-card-text>
      <v-form v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="[
            (v) => !!v || 'E-mail is required',
            (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          ]"
          label="E-mail"
          required
        />
        <v-btn :loading="loading" :disabled="loading" @click="request"
          >인증코드 발송</v-btn
        >
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CodeRequest',
  setup(props, context) {
    const router = useRouter()
    const valid = ref(false)
    const loading = ref(false)
    const email = ref('')
    const request = () => {
      console.log('request code')
      loading.value = true
      setTimeout(() => {
        loading.value = false
        router.push({ path: '/password/verify' })
      }, 1000)
    }
    return {
      valid,
      loading,
      email,
      request,
    }
  },
})
</script>
