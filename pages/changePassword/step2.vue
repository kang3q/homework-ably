<style scoped></style>
<template>
  <v-card>
    <v-card-title class="headline">인증 코드 검증 페이지</v-card-title>
    <v-card-text>
      <TimeCounter
        :expire-time="expireTime"
        @expired="(bool) => (isExpired = bool)"
      />
      <v-form ref="$form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="code"
          label="code"
          required
          :rules="[(v) => !!v || 'Code is required']"
        />
        <v-btn :loading="loading" :disabled="loading" @click="onSend"
          >인증코드 검증</v-btn
        >
        <v-btn
          v-if="isExpired"
          :loading="reLoading"
          :disabled="reLoading"
          @click="onReissueCode"
          >인증코드 재발급</v-btn
        >
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useRouter,
} from '@nuxtjs/composition-api'
import { userStore } from '@/store'
import { VFormComponent } from '@/types/app'
import { isValidate } from '@/utils/vuetity'
import TimeCounter from '@/components/TimeCounter.vue'

export default defineComponent({
  name: 'Step2',
  components: { TimeCounter },
  beforeRouteLeave(to, from, next) {
    if (to.path === '/changePassword/step1') {
      userStore.setResetPassword(null)
    }
    next()
  },
  beforeRouteEnter(to, from, next) {
    userStore.resetPassword ? next() : next('/')
  },
  setup(props, context) {
    const router = useRouter()
    const $form = ref<VFormComponent | null>(null)
    const valid = ref(false)
    const loading = ref(false)
    const reLoading = ref(false)
    const code = ref('171009')
    const expireTime = computed(() => {
      if (reLoading.value) return 0
      return userStore.resetPassword?.remainMillisecond ?? 0
    })
    const isExpired = ref(!expireTime.value)

    const onReissueCode = async () => {
      reLoading.value = true
      try {
        const { issueToken, remainMillisecond } =
          await userStore.fetchReRequestAuthCode()
        userStore.setResetPassword({
          ...userStore.resetPassword!,
          remainMillisecond,
          issueToken,
        })
        reLoading.value = false
        isExpired.value = false
      } catch (e) {
        console.error(e)
      }
    }

    const onSend = async () => {
      if (!isValidate($form.value)) return
      if (!userStore.resetPassword) return
      if (isExpired.value) {
        alert('입력 시간이 초과 되었습니다.')
        return
      }
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
        router.replace({ path: '/changePassword/step3' })
      } catch (e) {
        console.error(e)
      }
    }
    return {
      $form,
      valid,
      loading,
      reLoading,
      code,
      expireTime,
      isExpired,
      onSend,
      onReissueCode,
    }
  },
})
</script>
