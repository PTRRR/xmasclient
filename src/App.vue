<template lang='pug'>
  #app
    main-menu
    router-view
</template>

<script>
import MainMenu from '@/components/MainMenu'
export default {
  components: { MainMenu }
}
</script>

<style lang="scss">
@import './styles/index.scss';
</style>
