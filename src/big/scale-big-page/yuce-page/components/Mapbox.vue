<template>
  <div :id="uid" class="mapbox" />
</template>

<script>
import mapBoxGl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'

let map

export default {
  data() {
    return {
      uid: `map${this._uid}`,
      options: [
        { label: '街道图', value: 'streets-v11' },
        { label: '卫星图', value: 'satellite-v9' }
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      mapBoxGl.setRTLTextPlugin(
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.0/mapbox-gl-rtl-text.js'
      )
      map = new mapBoxGl.Map({
        container: this.uid,
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [104.07, 30.67],
        zoom: 5,
        accessToken:
          'pk.eyJ1Ijoid296aGkiLCJhIjoiY2tqMHcxdXdyMXpzaTJxcWpwcDVjMnFmNiJ9.qeEuNTOfW4qerIvORZ6ZhA'
        // pitch: 60, //视野倾斜，0-60
        // bearing: -17.6,//视野旋转角度
      })

      map.on('load', () => {
        const language = new MapboxLanguage({ defaultLanguage: 'zh' })
        console.log(language)
        map.addControl(language)
      })
    },
    handleSelect(item) {
      map.setStyle('mapbox://styles/mapbox/' + item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("https://api.tiles.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css");
.mapbox {
  width: 100%;
  height: 100%;
}
</style>
