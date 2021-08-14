<template>
  <v-card>
    <v-card-title class="headline">비밀번호 변경 페이지</v-card-title>
    <v-card-text>
      <v-form ref="$form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="newPassword"
          type="password"
          label="New Password"
          required
          :rules="[(v) => !!v || '비밀번호를 입력해주세요.']"
        />
        <v-text-field
          v-model="confirmPassword"
          type="password"
          label="Confirm Password"
          required
          :rules="[
            (v) => !!v || '비밀번호를 입력해주세요.',
            (v) => v === newPassword || '비밀번호는 같아야 합니다.',
          ]"
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
import { VFormComponent } from '@/types/app'
import { isValidate } from '@/utils/vuetity'
import { userStore } from '@/utils/accessor/store'

export default defineComponent({
  name: 'Step3',
  beforeRouteLeave(to, from, next) {
    userStore.setResetPassword(null)
    next()
  },
  beforeRouteEnter(to, from, next) {
    userStore.resetPassword?.confirmToken ? next() : next('/')
  },
  setup(props, context) {
    const router = useRouter()
    const $form = ref<VFormComponent | null>(null)
    const valid = ref(false)
    const loading = ref(false)
    const newPassword = ref('')
    const confirmPassword = ref('')

    const changePassword = async () => {
      if (!isValidate($form.value)) return
      if (!userStore.resetPassword?.confirmToken) return
      loading.value = true
      const { email, confirmToken } = userStore.resetPassword
      try {
        await userStore.fetchChangePassword({
          email,
          confirmToken,
          newPassword: newPassword.value,
          newPasswordConfirm: confirmPassword.value,
        })
        loading.value = false
        userStore.setResetPassword(null)
        router.replace({ path: '/' })
      } catch (e) {
        console.error(e)
      }
    }

    return {
      $form,
      valid,
      loading,
      newPassword,
      confirmPassword,
      changePassword,
    }
  },
})
</script>
