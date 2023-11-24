<template>
  <div class="container">
    <lottie :options="defaultOptions" @animCreated="handleAnimation" />

    <line-chart class="charts" />

    <!-- <div>
      <p>Speed: x{{ animationSpeed }}</p>
      <input
        type="range"
        value="1"
        min="0"
        max="3"
        step="0.5"
        v-on:change="onSpeedChange"
        v-model="animationSpeed"
      />
    </div>
    <button v-on:click="stop">stop</button>
    <button v-on:click="pause">pause</button>
    <button v-on:click="play">play</button> -->
  </div>
</template>

<script>
import Lottie from 'vue-lottie'
// import * as favAnmData from "@/assets/json/data.json";
// import * as favAnmData from "@/assets/json/data1.json";
import * as favAnmData from '@/assets/json/data2.json'
// import * as favAnmData from "@/assets/json/data3.json";
// import * as favAnmData from '@/assets/json/data4.json'

import LineChart from './LineChart'

export default {
  components: {
    Lottie,
    LineChart
  },
  data() {
    return {
      defaultOptions: { animationData: favAnmData.default },
      animationSpeed: 0.1
    }
  },
  mounted() {},
  methods: {
    handleAnimation: function(anim) {
      console.log(anim)
      this.anim = anim
    },

    stop: function() {
      this.anim.stop()
    },

    play: function() {
      this.anim.play()
    },

    pause: function() {
      this.anim.pause()
    },

    onSpeedChange: function() {
      this.anim.setSpeed(this.animationSpeed)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  position: relative;

  .charts {
    position: absolute;
    // z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80% !important;
    height: 80% !important;
  }
}
</style>
