<template>
  <UserMenu />
  <RouterView v-if="isAuthorized" />
</template>

<script lang="ts">
  import {defineComponent} from 'vue'

  import UserMenu from '@/components/UserMenu.vue'
  import useAuthorization from '@/composables/authorization'

  export default defineComponent({
    name: 'App',

    components: {
      UserMenu,
    },

    setup () {
      const {isAuthorized} = useAuthorization()

      return {
        isAuthorized,
      }
    },
  })
</script>

<style lang="scss" src="./assets/css/base.scss"></style>
