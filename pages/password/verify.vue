<style scoped></style>
<template>
  <v-card>
    <v-card-title class="headline">인증 코드 검증 페이지</v-card-title>
    <v-card-text>
      counter mm:ss
      <v-form ref="$form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="code"
          label="code"
          required
          :rules="[(v) => !!v || 'Code is required']"
        />
        <v-btn :loading="loading" :disabled="loading" @click="send"
          >인증코드 검증</v-btn
        >
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api'
import { userStore } from '@/store'
import { VFormComponent } from '@/types/app'
import { isValidate } from '@/utils/vutity'

export default defineComponent({
  name: 'Verify',
  beforeRouteEnter(to, from, next) {
    userStore.resetPassword ? next() : next('/')
  },
  setup(props, context) {
    const router = useRouter()
    const $form = ref<VFormComponent | null>(null)
    const valid = ref(false)
    const loading = ref(false)
    const code = ref('171009')

    const send = async () => {
      if (!isValidate($form.value)) return
      if (!userStore.resetPassword) return
      loading.value = true
      const { email, issueToken } = userStore.resetPassword
      try {
        const { confirmToken } = await userStore.fetchVerityAuthCode({
          authCode: code.value,
          email,
          issueToken,
        })
        userStore.setResetPassword({ ...userStore.resetPassword, confirmToken })
        loading.value = false
        router.push({ path: '/password/change' })
      } catch (e) {
        console.error(e)
      }
    }
    return {
      $form,
      valid,
      loading,
      code,
      send,
    }
  },
})
</script>
