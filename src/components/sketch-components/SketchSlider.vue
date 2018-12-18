<template lang="pug">
.slider
  label(
    :for="attr.value"
  ) {{ attr.value }}
  input(
    type="range"
    @input="onInput"
    :id="attr.value"
    :value="attr.value"
    :min="attr.min || 0"
    :max="attr.max || 100"
  )
</template>

<script>
export default {
  name: 'SketchSlider',

  props: {
    attr: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  methods: {
    onInput (e) {
      const { target } = e
      const { value } = target
      this.$emit('onValue', value)
    }
  }
}
</script>

<style lang="scss">
.slider {
  input {
    width: 100%;
  }

  input[type="range"]::-webkit-slider-thumb{
    width: 50px; /*Desired width*/
    height: 50px; /*Desired height*/
    border: none;
  }

  label {
    font-size: 2rem;
  }
}
</style>
