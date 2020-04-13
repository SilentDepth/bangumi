<template>
  <div class="_el mx-auto py-10 flex flex-col">
    <section class="flex flex-col items-center">
      <h1 v-if="!myCollections" class="text-xl text-gray-500">读取进度数据...</h1>
      <template v-else>
        <h1 class="text-xl text-red-400">我正在看 {{ myCollections.length }} 部作品</h1>
        <SubjectGrid :data="myCollections.sort((a, b) => a.lasttouch - b.lasttouch)" class="mx-auto mt-5">
          <template #default="{item: it}">
            <CollectionCover :data="it" />
          </template>
        </SubjectGrid>
      </template>
    </section>
  </div>
</template>

<script lang="ts">
  import {defineComponent, ref, watch} from 'vue'

  import SubjectGrid from '@/components/SubjectGrid.vue'
  import CollectionCover from '@/components/CollectionCover.vue'
  import useAuthorization from '@/composables/authorization'
  import useBgmApi from '@/composables/bgm-api'

  export default defineComponent({
    name: 'HomeView',

    components: {
      SubjectGrid,
      CollectionCover,
    },

    setup () {
      const {isAuthorized, userId} = useAuthorization()
      const {getUserCollection} = useBgmApi()
      const myCollections = ref(undefined as UserCollectionMedium[] | undefined)

      watch(isAuthorized, async value => {
        if (value) {
          myCollections.value = await getUserCollection(userId.value, 'watching')
          console.log(myCollections.value)
        }
      }, {immediate: true})


      return {
        myCollections,

        // async getProgress () {
        //   const progress = await fetch(`/api/user/${userId.value}/progress`).then(res => res.json())
        //
        //   const fetchSubject = (id: string) => fetch(`/api/subject/${id}`)
        //   for (const {subject_id} of progress) {
        //     const subject = await fetchSubject(subject_id)
        //       .then(res => res.ok ? res : fetchSubject(subject_id))
        //       .then(res => res.json())
        //       .catch(reason => ({name: reason}))
        //     progressData.value.push({
        //       id: subject.id,
        //       name: subject.name,
        //       name_cn: subject.name_cn,
        //       image: subject.images.common,
        //     })
        //   }
        // },
      }
    },
  })
</script>
