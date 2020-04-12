<template>
  <div class="_w-collection-cover rounded-md shadow hover:shadow-md transition duration-100 ease-linear">
    <img :src="subject.images.common" alt="" class="rounded-t-md">
    <div class="h-1 bg-gray-300"><div class="h-1 bg-red-400" :style="{width: `${progress * 100}%`}"></div></div>
    <div class="p-2 text-sm bg-gray-100 rounded-b-md">
      <p class="truncate">{{ subject.name }}</p>
      <p v-show="subject.name_cn" class="mt-2 text-gray-600 truncate">{{ subject.name_cn }}</p>
    </div>
  </div>
</template>

<script lang="ts">
  import {computed, defineComponent, PropType} from 'vue'

  import {numberVal} from '@/components/Debugger.vue'

  export default defineComponent({
    name: 'CollectionCover',

    props: {
      data: {
        type: Object as PropType<UserVideoCollectionMedium>,
        required: true,
      },
    },

    setup (props) {
      const subject = computed(() => props.data.subject)
      const progress = computed(() => props.data.ep_status / subject.value.eps)

      return {
        subject,
        progress,

        numberVal,
      }
    },
  })
</script>

<style scoped>
  ._w-collection-cover {
    width: 150px;
  }
</style>
