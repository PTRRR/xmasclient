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
          ) {{ sketch.name }}
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
  }
}
</script>

<style lang="scss">
@import '../styles/settings.sass';

.menu {
  position: fixed;

  &__icon {
    cursor: pointer;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    width: $main-margin;
    height: $main-margin;
    padding: 0.7rem 0.5rem 0.7rem 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__bar {
    width: 100%;
    height: 3px;
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
