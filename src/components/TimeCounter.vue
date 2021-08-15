<template>
  <div>
    <p>{{ m | pad }}:{{ s | pad }}</p>
    <v-progress-linear :value="percent"></v-progress-linear>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  toRefs,
  onMounted,
  onUnmounted,
  computed,
  watch,
  nextTick,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TimeCounter',
  filters: {
    pad(value: number | string) {
      return Math.floor(Number(value) / 10) ? value : `0${value}`
    },
  },
  props: {
    expireTime: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    const { expireTime } = toRefs(props)
    const percent = ref(0)
    const second = ref(expireTime.value / 1000)
    const m = computed(() => Math.floor(second.value / 60))
    const s = computed(() => second.value % 60)
    let interval: NodeJS.Timer | null = null

    const run = () => {
      second.value = expireTime.value / 1000
      percent.value = 0
      clearInterval(interval!)
      if (second.value <= 0) return
      nextTick(() => {
        interval = setInterval(() => {
          second.value--
          percent.value = 100 - (second.value * 100) / (expireTime.value / 1000)
          if (second.value <= 0) {
            clearInterval(interval!)
            context.emit('expired', true)
          }
        }, 1000)
      })
    }

    onMounted(() => {
      run()
    })

    onUnmounted(() => {
      clearInterval(interval!)
    })

    watch(expireTime, (value) => {
      if (expireTime) run()
    })

    return {
      percent,
      m,
      s,
    }
  },
})
</script>
