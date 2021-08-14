import {
  Module,
  VuexModule,
  VuexAction,
  VuexMutation,
} from 'nuxt-property-decorator'
import { $axios } from '~/utils/accessor/module'
import { IUser } from '~/types/store'
import { storageKey } from '~/utils/constant'

@Module({
  name: 'user',
  namespaced: true,
  stateFactory: true,
})
export default class User extends VuexModule {
  resetPassword: IUser['resetPassword'] = null
  isLoggedIn: IUser['isLoggedIn'] = false

  // ------------ actions -------------
  @VuexAction({ rawError: true })
  fetchRequestAuthCode(email: string): Promise<ResponseType.ResetPassword.Get> {
    return $axios.$get<ResponseType.ResetPassword.Get>('/api/reset-password', {
      params: {
        email,
      },
    })
  }

  @VuexAction({ rawError: true })
  fetchReRequestAuthCode(): Promise<ResponseType.ResetPassword.Get> {
    if (!this.resetPassword?.email) {
      return Promise.reject(new Error('이메일 없습니다.'))
    }
    return this.fetchRequestAuthCode(this.resetPassword.email)
  }

  @VuexAction({ rawError: true })
  fetchVerityAuthCode(
    data: RequestType.ResetPassword.Post,
  ): Promise<ResponseType.ResetPassword.Post> {
    return $axios.$post<ResponseType.ResetPassword.Post>(
      '/api/reset-password',
      data,
    )
  }

  @VuexAction({ rawError: true })
  fetchChangePassword(data: RequestType.ResetPassword.Patch): Promise<void> {
    return $axios.$patch('/api/reset-password', data)
  }

  @VuexAction({ rawError: true })
  async fetchLogin(
    data: RequestType.Login.Post,
  ): Promise<ResponseType.Login.Post> {
    try {
      const response = await $axios.$post<ResponseType.Login.Post>(
        '/api/login',
        data,
      )
      window.localStorage.setItem(storageKey.accessToken, response.accessToken)
      this.setIsLoggedIn(true)
      return response
    } catch (e) {
      window.localStorage.removeItem(storageKey.accessToken)
      throw e
    }
  }

  // ------------ mutation -------------
  @VuexMutation
  setResetPassword(data: IUser['resetPassword']) {
    this.resetPassword = data
  }

  @VuexMutation
  setIsLoggedIn(isLoggedIn: IUser['isLoggedIn']) {
    this.isLoggedIn = isLoggedIn
  }
}

export function initResetPassword(): IUser['resetPassword'] {
  return {
    email: '',
    issueToken: '',
    remainMillisecond: 0,
  }
}
