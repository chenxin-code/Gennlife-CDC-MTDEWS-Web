<template>
  <div :id="uid" />
</template>

<script>
let i = 0
function getColor() {
  const colors = [
    '#FC49A3', // pink
    '#CC66FF', // purple-ish
    '#66CCFF', // sky blue
    '#66FFCC', // teal
    '#00FF00', // lime green
    '#FFCC66', // light orange
    '#FF6666', // salmon
    '#FF0000', // red
    '#FF8000', // orange
    '#FFFF66', // yellow
    '#00FFFF' // turquoise
  ]

  const color = colors[i]
  i = (i + 1) % colors.length

  return color
}

import {
  Scene
  // PolygonLayer,
  // LineLayer,
  //  Popup
} from '@antv/l7'
import { Mapbox } from '@antv/l7-maps'
export default {
  data() {
    return {
      uid: `map${this._uid}` // 组件id
    }
  },
  mounted() {
    fetch('http://localhost:1235/api/tilesets/taiwan/tilejson')
      .then(response => response.json())
      .then(tilejson => {
        console.log(tilejson, 'res')

        const style = {
          version: 8,
          sources: {
            source: {
              type: 'vector',
              url: 'http://localhost:1235/api/tilesets/taiwan/tilejson'
            }
          },
          layers: [
            // {
            //   id: "background",
            //   type: "background",
            //   paint: {
            //     "background-color": "hsl(55, 1%, 20%)"
            //   }
            // }
          ]
        }

        tilejson.vector_layers.forEach(layer => {
          const color = getColor()
          const layers = [
            {
              id: layer.id + '-polygon',
              type: 'fill',
              source: 'source',
              'source-layer': layer.id,
              filter: ['==', '$type', 'Polygon'],
              paint: {
                'fill-color': color,
                'fill-opacity': 0.1
              }
            },
            {
              id: layer.id + '-polygon-outline',
              type: 'line',
              source: 'source',
              'source-layer': layer.id,
              filter: ['==', '$type', 'Polygon'],
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': color,
                'line-width': 1,
                'line-opacity': 0.75
              }
            },
            {
              id: layer.id + '-line',
              type: 'line',
              source: 'source',
              'source-layer': layer.id,
              filter: ['==', '$type', 'LineString'],
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': color,
                'line-width': 1,
                'line-opacity': 0.75
              }
            },
            {
              id: layer.id + '-point',
              type: 'circle',
              source: 'source',
              'source-layer': layer.id,
              filter: ['==', '$type', 'Point'],
              paint: {
                'circle-color': color,
                'circle-radius': 2.5,
                'circle-opacity': 0.75
              }
            }
          ]

          style.layers = style.layers.concat(layers)
        })

        // const center = tilejson.center || [0, 0, 1];

        new Scene({
          id: this.uid,
          map: new Mapbox({
            // style: "http://localhost:1234/api/styles/world/",
            // style: "http://localhost:1234/api/styles/admin/",
            // style: {
            //   version: 8,
            //   sources: {
            //     admin: {
            //       type: "vector",
            //       url: "http://localhost:1235/api/tilesets/admin/tilejson"
            //     }
            //     // taiwan: {
            //     //   type: 'vector',
            //     //   url: 'http://localhost:1235/api/tilesets/taiwan/tilejson'
            //     // }
            //   },
            //   layers: [
            //     {
            //       id: "admin",
            //       type: "line",
            //       source: "admin",
            //       "source-layer": "admin"
            //     }
            //     // {
            //     //   id: 'taiwan',
            //     //   type: 'raster', // "fill", "line", "symbol", "circle", "heatmap", "fill-extrusion", "raster", "hillshade", "background", "sky".
            //     //   source: 'taiwan',
            //     //   'source-layer': 'taiwan'
            //     // }
            //   ]
            // },
            style,
            attributionControl: false,
            hash: false,
            center: [121.146801, 23.747355]
          })
        })
      })

    // const polygonLayer = new PolygonLayer({});
    // scene.addLayer(polygonLayer);
    // scene.render();
  }
}
</script>

<style lang="scss" scoped></style>
