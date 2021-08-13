import { Context } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

let $axios: NuxtAxiosInstance

export function initializeAxios(axios: NuxtAxiosInstance, context: Context) {
  axios.defaults.timeout = 1000 * 60 * 3

  axios.interceptors.request.use(
    (config: AxiosRequestConfig) => config,
    (error: AxiosError) => onRejected(error)
  )

  axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => onRejected(error)
  )

  $axios = axios
}

function onRejected(error: AxiosError): Promise<AxiosError> {
  const message =
    error.response?.data?.error?.message ||
    '네트워크 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.'
  const status = error.response?.status
  alert(`[${status}] ${message}`)
  return Promise.reject(error)
}

export { $axios }
