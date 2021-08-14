// vue-shim.d.ts
declare module '*.vue' {
  import Vue from 'vue'
  import { defineComponent } from '@nuxtjs/composition-api'
  export const Component: ReturnType<typeof defineComponent>
  export default Vue
}
