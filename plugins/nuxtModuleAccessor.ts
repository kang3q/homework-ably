import { Plugin, Context } from '@nuxt/types'
import { initializeAxios } from '@/utils/accessor/module/api'

const accessor: Plugin = (context: Context) => {
  initializeAxios(context.$axios, context)
}

export default accessor
