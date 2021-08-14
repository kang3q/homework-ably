import { useRouter } from '@nuxtjs/composition-api'
import { userStore } from '~/store'

export default () => {
  const router = useRouter()

  const doLogout = async (path = '/login') => {
    try {
      await userStore.fetchLogout()
      path && router.push({ path: '/login' })
    } catch (e) {
      console.error(e)
    }
  }

  return {
    doLogout,
  }
}
