<template>
  <v-card>
    <v-card-title class="headline">비밀번호 변경 페이지</v-card-title>
    <v-card-text>
      <v-form v-model="valid" lazy-validation>
        <v-text-field v-model="newPassword" label="New Password" required />
        <v-text-field
          v-model="confirmPassword"
          label="Confirm Password"
          required
        />
        <v-btn :loading="loading" :disabled="loading" @click="changePassword"
          >비밀번호 변경하기</v-btn
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
    const newPassword = ref('')
    const confirmPassword = ref('')
    const changePassword = () => {
      console.log('change password')
      loading.value = true
      setTimeout(() => {
        loading.value = false
        router.push({ path: '/' })
      }, 1000)
    }
    return {
      valid,
      loading,
      newPassword,
      confirmPassword,
      changePassword,
    }
  },
})
</script>
