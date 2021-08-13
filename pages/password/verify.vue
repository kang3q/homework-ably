<style scoped></style>
<template>
  <v-card>
    <v-card-title class="headline">인증 코드 검증 페이지</v-card-title>
    <v-card-text>
      counter mm:ss
      <v-form v-model="valid" lazy-validation>
        <v-text-field v-model="code" label="code" required />
        <v-btn :loading="loading" :disabled="loading" @click="send"
          >인증코드 검증</v-btn
        >
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Verify',
  setup(props, context) {
    const router = useRouter()
    const valid = ref(false)
    const loading = ref(false)
    const code = ref('')
    const send = () => {
      console.log('send code')
      loading.value = true
      setTimeout(() => {
        loading.value = false
        router.push({ path: '/password/change' })
      }, 1000)
    }
    return {
      valid,
      loading,
      code,
      send,
    }
  },
})
</script>
