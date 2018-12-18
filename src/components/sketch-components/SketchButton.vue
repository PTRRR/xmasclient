<template lang="pug">
.button
  button(
    type="button"
    @click="onInput"
    :id="attr.value"
    :value="attr.value"
  ) {{ attr.value }}
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
.button {
  button {
    width: 100%;
    font-size: 2rem;
    background: rgb(192, 192, 192);
    border: none;
    outline: none;
    box-shadow: none;
    border-radius: 3rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
    color: white;
  }
}
</style>
