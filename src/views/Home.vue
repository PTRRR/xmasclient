<template lang="pug">
  main.sketch
    button.sketch__stop(
      @click="stop"
    ) Stop
    .sketch__container(
      v-if="sketchName"
      ref="sketchContainer"
      @click="onClick"
    )
    h1(
      v-else
    ) No sketches
</template>

<script>
import P5 from 'p5'
import MainMenu from '@/components/MainMenu'
import { gcodeExtentionForP5 } from '@/p5extentions'
import * as sketches from '@/sketches'

export default {
  name: 'home',

  components: { MainMenu },

  data () {
    return {
      p5: null,
      chunkSize: 3000,
      socket: null,
      controllerConfig: {}
    }
  },

  computed: {
    sketchName () {
      return this.$route.params.sketch
    }
  },

  watch: {
    sketchName (name) {
      this.initializeSketch(name)
    }
  },

  mounted () {
    this.socket = new WebSocket('ws://localhost:1234')

    this.socket.addEventListener('open', e => {
      console.log('WEBSOCKET CONNECTION OPENED')
      this.send({ type: 'getConfig' })
    })

    this.socket.addEventListener('message', e => {
      try {
        const message = JSON.parse(e.data)
        const { type, data } = message
        switch (type) {
          case 'getConfig':
            this.controllerConfig = data
            this.initializeSketch(this.sketchName)
            break
          default:
            if (data) {
              console.log(data)
            }
            break
        }
      } catch (e) { }
    })

    // this.initializeSketch(this.sketchName);
  },

  methods: {
    send (message) {
      if (this.socket) {
        this.socket.send(JSON.stringify(message))
      }
    },

    async initializeSketch (name) {
      if (name) {
        const { sketchContainer } = this.$refs
        const { clientWidth, clientHeight } = sketchContainer
        const { maxStepsX, maxStepsY } = this.controllerConfig

        const scaleFactorWidth = maxStepsX / clientWidth
        const scaleFactorHeight = maxStepsY / clientHeight
        const scaleFactor = Math.min(scaleFactorWidth, scaleFactorHeight)

        // Delete all existing canvas
        const { children } = sketchContainer
        for (const child of children) {
          child.remove()
        }

        // Create a new p5 instance
        window.controllerConfig = this.controllerConfig
        this.p5 = new P5(sketches[name], sketchContainer)
        await gcodeExtentionForP5(this.p5)
        this.p5.gcode.setScaleFactor(scaleFactor)
        if (this.p5._renderer) {
          this.p5.draw()
        }
      }
    },

    onClick () {
      const gcode = this.p5.gcode.getString()
      const gcodeCommands = gcode.split('\n')
      let chunk = []
      const MAX_CHUNK_SIZE = 200
      for (const [index, gcodeCommand] of gcodeCommands.entries()) {
        if (index % MAX_CHUNK_SIZE === MAX_CHUNK_SIZE) {
          this.send({
            type: 'feed',
            data: chunk.join('\n')
          })
          chunk = []
        } else {
          chunk.push(gcodeCommand)
        }
      }

      this.send({
        type: 'feed',
        data: chunk.join('\n')
      })
    },

    stop () {
      this.send({ type: 'stop' })
    }
  }
}
</script>

<style lang="scss">
@import "../styles/settings.sass";

.sketch {
  width: 100%;
  height: 100vh;
  padding: $main-margin;
  background: rgb(240, 240, 240);

  &__container {
    width: 100%;
    height: 100%;

    canvas {
      background: white;
    }
  }

  &__stop {
    position: fixed;
    top: 0;
    right: 0;
  }
}
</style>
