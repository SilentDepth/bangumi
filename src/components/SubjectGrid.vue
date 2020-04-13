<template>
  <div>
    <ul class="_w-cols-6 grid grid-cols-6 gap-5 items-end">
      <li v-for="it of data" class="">
        <template v-if="!hasSlot">
          <img :src="it.image" alt="" class="rounded-t-md">
          <div class="p-2 text-sm bg-gray-100 rounded-b-md">
            <p :title="it.name" class="truncate">{{ it.name }}</p>
            <p v-show="it.name_cn" :title="it.name_cn" class="mt-2 text-gray-600 truncate">{{ it.name_cn }}</p>
          </div>
        </template>
        <component v-else :is="slotComponent({item: it})" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import {defineComponent, PropType} from 'vue'

  export default defineComponent({
    name: 'SubjectGrid',

    props: {
      data: {
        type: Array as PropType<SubjectGridItem[] | unknown[]>,
        required: true,
      },
    },

    setup (_, {slots}) {
      return {
        hasSlot: typeof slots.default === 'function',
        slotComponent: (props: unknown) => ({render: () => slots.default!(props)})
      }
    },
  })

  export interface SubjectGridItem {
    image: string
    name: string
    name_cn?: string
  }
</script>

<style scoped>
  ._w-cols-6 {
    width: 1000px; /* 150px * 6 + 20px * 5 */
  }
</style>
