import { Store } from 'vuex'
import { initialiseStores } from '~/utils/accessor/store'

const initializer = (store: Store<any>) => initialiseStores(store)
export const plugins = [initializer]

export * from '~/utils/accessor/store'
