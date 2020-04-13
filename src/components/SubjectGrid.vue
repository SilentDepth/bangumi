<template>
  <div>
    <ul class="_w-cols-6 grid grid-cols-6 gap-5 items-end">
      <li v-for="it of data">
        <template v-if="!hasSlot">
          <img :src="it.image" alt="" class="rounded-t-md">
          <div class="p-2 text-sm bg-gray-100 rounded-b-md">
            <p :title="it.name" class="truncate">{{ it.name }}</p>
            <p v-show="it.name_cn" :title="it.name_cn" class="mt-2 text-gray-600 truncate">{{ it.name_cn }}</p>
          </div>
        </template>
        <component v-else :is="slotComponent({item: it})" />
      </li>
      <li class="self-stretch border-2 border-dashed border-gray-300 rounded-md text-gray-300 hover:text-gray-600 cursor-not-allowed flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 fill-current">
          <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
        </svg>
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
