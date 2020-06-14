<template>
  <div class="sidebar">
    Category:
    <a-select
      style="width: 100%"
      placeholder="Select category..."
      allowClear
      @change="onCategoryChange"
    >
      <a-select-option
        v-for="category in categories"
        :key="category"
        :value="category"
      >
        {{ category }}
      </a-select-option>
    </a-select>

    <a-divider />

    Floor Area:
    <a-slider
      :default-value="[area.min, area.max]"
      :min="area.min"
      :max="area.max"
      :marks="area.marks"
      range
      @change="onAreaChange"
    />

    <a-divider />

    Suburb:
    <a-auto-complete
      :data-source="suburbs"
      :filter-option="filterOption"
      style="width: 100%"
      placeholder="Input suburb here"
      allowClear
      @select="onSuburbChange"
      @change="onSuburbClear"
    />
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'Sidebar',

    data() {
      return {
        categories: [],
        area: {
          min: 0,
          max: 0,
          marks: {},
        },
        suburbs: [],
      }
    },

    computed: {
      ...mapState({
        features: state => state.map.features,
      }),
    },

    created() {
      console.log(this.features[0])
      this.init()
    },

    methods: {
      ...mapMutations([
        'filterSet',
      ]),

      filterOption(input, option) {
        return option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
      },

      init() {
        this.categories = []
        this.suburbs = []

        let area = []
        for (let feature of this.features) {
          const info = feature.properties.project

          this.categories.push(info.Category)
          area.push(info['Floor Area'] * 1)

          this.suburbs.push(info.Suburb)
        }

        this.categories = this.categories.filter(this.arrayUnique).sort()
        
        area = area.filter(this.arrayUnique).sort()
        this.area.min = area[0]
        this.area.max = area[area.length - 1]
        this.area.marks[this.area.min] = this.area.min
        this.area.marks[this.area.max] = this.area.max
        this.onAreaChange([this.area.min, this.area.max])

        this.suburbs = this.suburbs.filter(this.arrayUnique).sort()
      },

      arrayUnique(value, index, self) { 
        return self.indexOf(value) === index
      },

      onCategoryChange(val) {
        this.filterSet({
          field: 'category',
          value: val,
        })
      },

      onAreaChange(val) {
        this.filterSet({
          field: 'area',
          value: val,
        })
      },

      onSuburbChange(val) {
        this.filterSet({
          field: 'suburb',
          value: val,
        })
      },

      onSuburbClear(val) {
        if ( ! val) {
          this.filterSet({
            field: 'suburb',
            value: val,
          })
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .sidebar {
    width: 300px;
    padding: 15px;
  }
</style>