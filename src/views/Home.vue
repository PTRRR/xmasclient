<template lang="pug">
  main.sketch
    .sketch__printing(v-show="printing")
      .sketch__printing-inner
        h3.sketch__printing-text Printing...
        button.sketch__printing-stop(@click="stop")
    .sketch__container(
      v-if="sketchName"
      ref="sketchContainer"
    )
    h1(
      v-else
    ) No sketches

    button.sketch__print(@click="onClick")
      svg(viewBox="0 0 400 400")
        polyline(points="348.5 108.75 166 291.25 51.5 176.75")
</template>

<script>
import P5 from 'p5'
import { IP } from '@/ip'
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
      controllerConfig: {},
      printing: false
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
    this.socket = new WebSocket(`ws://${IP}:1234`)

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
          case 'finished-printing':
            console.log('SOCKET MESSAGE:', 'Finished')
            this.printing = false
            break
          default:
            if (type) {
              console.log('SOCKET MESSAGE:', type)
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
        const clientRatio = clientWidth / clientHeight
        const { maxStepsX, maxStepsY } = this.controllerConfig
        const controllerRatio = maxStepsX / maxStepsY

        const scaleFactorWidth = maxStepsX / clientWidth
        const scaleFactorHeight = maxStepsY / clientHeight
        const scaleFactor = controllerRatio > clientRatio
          ? scaleFactorWidth : scaleFactorHeight

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
          console.log('asdlkjh')
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

      this.printing = true
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
  $sk: &;
  width: 100%;
  height: 100vh;
  padding: $main-margin * 0.5;
  background: rgb(240, 240, 240);

  &__printing {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, 0.9);

    #{$sk}__printing-inner {
      text-align: center;
    }

    #{$sk}__printing-text {
      color: black;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    #{$sk}__printing-stop {
      color: white;
      background: #ff0031;
      border: none;
      padding: 1rem;
      border-radius: 100%;
      width: $main-margin;
      height: $main-margin;
      position: relative;

      &:before,
      &:after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 70%;
        height: 4px;
        background: white;
      }

      &:before {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &:after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
  }

  &__container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    canvas {
      max-width: 100%;
      max-height: 100%;
      height: auto;
      background: white;
    }
  }

  &__print {
    position: fixed;
    z-index: 0;
    bottom: 0;
    right: 0;
    width: $main-margin;
    height: $main-margin;
    margin: 1rem;
    background: #00ff6b;
    border: none;
    border-radius: 100%;
    padding: 0.4em;

    polyline {
      fill: transparent;
      stroke: white;
      stroke-width: 30px;
    }
  }
}
</style>
