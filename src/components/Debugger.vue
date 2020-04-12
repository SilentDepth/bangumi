<template>
  <div class="fixed" style="left: 20px; top: 20px; z-index: 999;">
    <input v-model="numberVal" type="number" class="form-input form-text" />
  </div>
</template>

<script lang="ts">
  import {defineComponent, ref} from 'vue'

  export const numberVal = ref(null as number | null)

  export default defineComponent({
    name: 'Debugger',

    setup () {
      return {
        numberVal,
      }
    },
  })
</script>
