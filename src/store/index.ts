// eslint-disable-next-line import/named
import { Store, ActionTree, ActionContext } from 'vuex'
import { Context } from '@nuxt/types'
import { initialiseStores } from '~/utils/accessor/store'
import { State } from '~/types/store'
import { userStore } from '~/store'
import { storageKey } from '~/utils/constant'

const initializer = (store: Store<any>) => initialiseStores(store)
export const plugins = [initializer]

export * from '~/utils/accessor/store'

interface Actions<S, R> extends ActionTree<S, R> {
  nuxtClientInit(actionContext: ActionContext<S, R>, context: Context): void
}

export const actions: Actions<State, any> = {
  nuxtClientInit() {
    const accessToken = window.localStorage.getItem(storageKey.accessToken)
    if (accessToken) {
      userStore.setAccessToken(accessToken)
    }
  },
}
