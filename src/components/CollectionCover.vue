<template>
  <div class="rounded-md shadow">
    <img :src="subject.images.common" alt="" class="rounded-t-md">
    <div class="h-1 bg-gray-300"><div class="h-1 bg-red-400" :style="{width: `${progress * 100}%`}"></div></div>
    <div class="p-2 text-sm bg-gray-100 rounded-b-md">
      <p :title="subject.name" class="truncate">{{ subject.name }}</p>
      <p v-show="subject.name_cn" :title="subject.name_cn" class="mt-2 text-gray-600 truncate">{{ subject.name_cn }}</p>
    </div>
  </div>
</template>

<script lang="ts">
  import {computed, defineComponent, PropType} from 'vue'

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
      }
    },
  })
</script>
