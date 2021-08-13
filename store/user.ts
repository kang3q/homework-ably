import { Module, VuexAction, VuexModule } from 'nuxt-property-decorator'
import { $axios } from '@/utils/accessor/module'

@Module({
  name: 'user',
  namespaced: true,
  stateFactory: true,
})
export default class User extends VuexModule {
  @VuexAction({ rawError: true })
  fetchRequestAuthCode(email: string): Promise<ResponseType.ResetPassword> {
    return $axios.$get<ResponseType.ResetPassword>('/api/reset-password', {
      params: {
        email,
      },
    })
  }
}
