<template>
  <div class="map-content">
    <MglMap :accessToken="accessToken" :mapStyle="mapStyle" :center="coordinates" :zoom="14" @load="onMapLoaded">
      <MglMarker
        v-for="(feature, index) in filteredFeatures"
        :key="index"
        :coordinates="feature.geometry.coordinates" :color="feature.properties.color"
      />
    </MglMap>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import Mapbox from "mapbox-gl"
  import { MglMap, MglMarker, MglGeojsonLayer } from "vue-mapbox"

  export default {
    name: 'MapContent',

    components: {
      MglMap,
      MglMarker,
      MglGeojsonLayer,
    },

    data() {
      return {
        map: null,
        mapbox: null,
        accessToken: 'pk.eyJ1IjoiZGl2LWFydCIsImEiOiJja2JmMnRkNmEwcmVmMnBtMnNpNnRocTFkIn0.DmX714_28lw4SODcQFpV6g',
        mapStyle: 'mapbox://styles/mapbox/streets-v11',
        coordinates: [151.209152, -33.875305],
      };
    },

    computed: {
      ...mapState({
        features: state => state.map.features,
      }),

      ...mapGetters([
        'filteredFeatures',
      ]),

      bounds() {
        let bounds = []
        for (const feature of this.features) {
          bounds.push(feature.geometry.coordinates)
        }
        
        return bounds
      },
    },

    created() {
      this.mapbox = Mapbox
    },

    watch: {
      
    },

    methods: {
      onMapLoaded(event) {
        this.map = event.map
        
        this.map.fitBounds(this.bounds, { padding: 20, maxZoom: 14 })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .map-content {
    flex: 1;
  }
</style>