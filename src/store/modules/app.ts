import { defineStore } from 'pinia'

const appStore = defineStore({
  id: 'App',
  state: () => {
    return {
      isCollapse: false,
      device: 'desktop'
    }
  },
  getters: {
    getIsCollpase: (state) => {
      return state.isCollapse
    }
  },
  actions: {
    Toogle(collapse: boolean) {
      this.isCollapse = collapse
    },
    Toogle_device(device: string) {
      this.device = device
    }
  }
})

export {
  appStore
}