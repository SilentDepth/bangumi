<template>
  <button class="m-4 px-3 py-2 border border-gray-300 bg-gray-100 rounded" @click="set('msg', 'hello world')">Test</button>
  <section class="m-4 p-4 border border-gray-300 rounded-md">
    <p class="mb-4 text-gray-600 font-medium">LOCAL</p>
    <pre>{{ JSON.stringify(local, null, 2) }}</pre>
  </section>
</template>

<script lang="ts">
  import {defineComponent} from 'vue'

  import useStorage from '@/composables/storage'

  export default defineComponent(() => {
    const {local, session, get, set} = useStorage()

    return {
      local,
      session,

      set,
    }
  })
</script>
