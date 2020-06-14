const map = {
  state: {
    analytics: {},
    features: [],
    filter: {
      category: false,
      area: [],
      suburb: false,
    },
  },

  getters: {
    filteredFeatures: state => {
      return state.features.filter(item => {
        const info = item.properties.project

        let check = true
        if (state.filter.category) {
          check *= info.Category.toLowerCase() == state.filter.category.toLowerCase()
        }

        if (state.filter.area) {
          if (info['Floor Area'] < state.filter.area[0] || info['Floor Area'] > state.filter.area[1]) {
            check *= 0
          }
        }

        if (state.filter.suburb) {
          check *= info.Suburb.toLowerCase() == state.filter.suburb.toLowerCase()
        }

        return check
      })
    },
  },

  mutations: {
    analyticsSet(state, payload) {
      state.analytics = payload
    },

    featuresSet(state, payload) {
      state.features = payload
    },

    filterSet(state, payload) {
      state.filter[payload.field] = payload.value
    },
  },
}

export default map