<template>
  <div>
    <p><NuxtLink to="/">トップに戻る</NuxtLink></p>
    <div v-if="imageUrl">
      <l-map
        ref="myMap" 
        style="height: calc(60vh)"
        :center="center"
        :crs="crs"
        :min-zoom="-25"
      >
        <l-image-overlay :url="imageUrl" :bounds="bounds" @ready="ready"></l-image-overlay>
        <template v-for="(line, index) in lines">
          <span :key="index">
            <l-polyline
              v-if="line.layerType === 'polyline'"
              :lat-lngs="line.latlngs"
              color="blue"
            />
            <l-polygon
              v-if="['polygon', 'rectangle'].includes(line.layerType)"
              :lat-lngs="line.latlngs"
              :color="line.layerType === 'polygon' ? 'green' : 'red'"
            />
          </span>
        </template>
      </l-map>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import L, { LatLng, Polyline } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'

export default Vue.extend({
  data () {
    return {
      center: L.latLng([0, 0]),
      bounds: L.latLngBounds(L.latLng([0, 0]), L.latLng([0, 0])),
      crs: L.CRS.Simple,
    };
  },
  methods: {
    async ready () {
      // @ts-ignore
      const map = this.$refs?.myMap?.mapObject;
      // @ts-ignore
      this.bounds = await this.$leafletHelper.getBounds(this.imageUrl)
      this.center = this.bounds.getCenter()
      map.fitBounds(this.bounds)
      this.addDrawToolbar()
    },
    addDrawToolbar () {
      // @ts-ignore
      const map = this.$refs?.myMap?.mapObject;
      const drawnItems = new L.FeatureGroup().addTo(map)
      map.addLayer(drawnItems)
      // @ts-ignore
      const drawControl = new L.Control.Draw(this.$leafletHelper.drawToolBarOptions(drawnItems))
      map.addControl(drawControl)
      // @ts-ignore
      this.$leafletHelper.setDrawPolylineTooltipLocal()

      const self = this
      // @ts-ignore
      map.on(L.Draw.Event.CREATED, function (event: any) {
        const layer: Polyline = event.layer
        const layerType = event.layerType
        const latlngs = layer.getLatLngs() as L.LatLng[]

        self.$store.dispatch('addLine', { layerType, latlngs })
      })
    }
  },
  async fetch(): Promise<void> {
    const images = this.$store.state.images 
    if (!images.length) {
      await this.$store.dispatch('fetchRandomCat')
    }
  },
  computed: {
    imageUrl () {
      return this.$store.state.images[0]
    },
    lines () {
      return this.$store.state.lines
    }
  }
})
</script>
