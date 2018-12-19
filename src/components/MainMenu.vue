<template lang="pug">
  nav.menu(
    :class="{'menu--show': show}"
  )
    .menu__icon(
      @click="show = !show"
    )
      .menu__bar
      .menu__bar
      .menu__bar

    .menu__content
      .menu__links
        .menu__link(
          v-for="sketch in sketches"
          @click="show = false"
        )
          router-link(
            :to="sketch.name"
          ) {{ formatSketchName(sketch.name) }}
</template>

<script>
import * as sketches from '@/sketches'

export default {
  name: 'MainMenu',

  data () {
    return {
      show: false,
      sketches
    }
  },

  methods: {
    formatSketchName (sketchName) {
      const parts = sketchName.split('_')
      for (let i = 0; i < parts.length; i++) {
        parts[i] = this.capitalize(parts[i])
      }
      return parts.join(' - ')
    },

    capitalize (string) {
      if (typeof string !== 'string') return ''
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }
}
</script>

<style lang="scss">
@import '../styles/settings.sass';

.menu {
  position: fixed;
  z-index: 100;

  &__icon {
    cursor: pointer;
    position: fixed;
    z-index: 10;
    top: 0;
    right: 0;
    width: $main-margin;
    height: $main-margin;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: white;
    border-radius: 100%;
    margin: 1rem;
    padding: 1.1em 0.8em 1.1em 0.8em;
    mix-blend-mode: difference;
  }

  &__bar {
    width: 100%;
    height: 4px;
    background: black;
  }

  &__content {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    opacity: 0;
    will-change: opacity;
    transition: opacity 0.3s ease-in-out;
    width: 100vw;
    height: 100vh;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__link {
    font-size: 3em;
    text-align: center;
    display: block;
  }

  &--show {
    .menu__content {
      opacity: 1;
      pointer-events: auto;
    }
  }
}
</style>
