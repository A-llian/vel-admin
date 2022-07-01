import { appStore } from './modules/app'
import { permissionStore } from './modules/permission'
import { tagsStore } from './modules/tags'
import { userStore } from './modules/user'

const store: any = {}

export const registerStore = () => {
	store.appStore = appStore()
	store.permissionStore = permissionStore()
	store.tagsStore = tagsStore()
  store.userStore = userStore()
}

export default store