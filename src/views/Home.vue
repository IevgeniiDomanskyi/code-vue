<template>
  <div class="home">
    <sidebar />
    <map-content />
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import data from '../assets/json/data.json'
  import Sidebar from '../components/Sidebar'
  import MapContent from '../components/MapContent'

  export default {
    name: 'Home',

    components: {
      Sidebar,
      MapContent,
    },

    created() {
      this.analyticsSet(data.analytics)
      this.featuresSet(data.features)
    },

    methods: {
      ...mapMutations([
        'analyticsSet',
        'featuresSet',
      ]),
    },
  }
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
    display: flex;
    flex-direction: row;
  }
</style>