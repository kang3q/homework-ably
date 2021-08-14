<template>
  <v-card>
    <v-card-title class="headline">인증 코드 발급 요청 페이지</v-card-title>
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
        <v-btn :loading="loading" :disabled="loading" @click="request"
          >인증코드 발송</v-btn
        >
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
  name: 'Step1',
  setup(props, context) {
    const router = useRouter()
    const $form = ref<VFormComponent | null>(null)
    const valid = ref(false)
    const loading = ref(false)
    const email = ref('')

    const request = async () => {
      if (!isValidate($form.value)) return
      loading.value = true
      try {
        const { issueToken, remainMillisecond } =
          await userStore.fetchRequestAuthCode(email.value)
        userStore.setResetPassword({
          email: email.value,
          remainMillisecond,
          issueToken,
        })
        loading.value = false
        router.push({ path: '/changePassword/step2' })
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
      request,
    }
  },
})
</script>
