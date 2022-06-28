import { defineStore } from 'pinia'

import { RouteLocationNormalized } from 'vue-router'

const tagsStore = defineStore({
  id: 'Tags',
  state: () => {
    return {
      visitedViews: new Array<RouteLocationNormalized>()
    }
  },
  getters: {
    getVisitedViews: (state) => {
      return state.visitedViews
    }
  },
  actions: {
    addView(view: RouteLocationNormalized) {
      if (this.visitedViews.some(v => v.path === view.path)) return
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        })
      )
    },
    delView(view: RouteLocationNormalized) {
      return new Promise(resolve => {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.path === view.path) {
            this.visitedViews.splice(i, 1)
            break
          }
        }
        resolve([...this.visitedViews])
      })
      
    }
  }
})

export {
  tagsStore
}