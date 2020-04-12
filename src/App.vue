<template>
  <UserMenu />
  <RouterView />
</template>

<script lang="ts">
  import {defineComponent} from 'vue'

  import UserMenu from '@/components/UserMenu.vue'

  export default defineComponent({
    name: 'App',

    components: {
      UserMenu,
    },
  })
</script>

<style lang="scss" src="./assets/css/base.scss"></style>
