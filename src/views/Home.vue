<template>
  <div class="_el mx-auto py-10 flex flex-col" style="width: 800px;">
    <div class="border border-gray-300 rounded-md overflow-hidden">
      <button class="block w-full px-3 py-2 underline" @click="authorize">Authorize</button>
      <pre class="_max-h-pre p-4 _text-code _leading-code border-t border-gray-300 bg-gray-100 overflow-auto">{{ JSON.stringify(authorizationData, null, 2) }}</pre>
    </div>

    <div class="border border-gray-300 rounded-md overflow-hidden">
      <button class="block w-full px-3 py-2 underline" @click="getProgress">Get Progress</button>
      <div class="bg-gray-100 flex flex-wrap -ml-px">
        <div v-for="subject of progressData" :key="subject.id" class="flex-grow-0 flex-shrink w-1/2 p-5 border-t border-l border-gray-300 flex items-center">
          <img :src="subject.image" alt="" class="flex-none mr-4">
          <p class="flex-1">
            <span class="text-lg">{{ subject.name }}</span>
            <br>
            <span class="inline-block pt-3 text-gray-700">{{ subject.name_cn }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, ref, computed} from 'vue'

  import useAuthorization from '@/composables/authorization'

  export default defineComponent({
    name: 'Home',

    setup () {
      const {accessToken, refreshToken, expiresIn, userId, authorize, fetch} = useAuthorization()

      const progressData = ref([] as any[])

      return {
        authorizationData: computed(() => ({
          accessToken: accessToken.value,
          refreshToken: refreshToken.value,
          expiresIn: expiresIn.value,
          userId: userId.value,
        })),
        authorize,

        progressData,

        async getProgress () {
          const progress = await fetch(`/api/user/${userId.value}/progress`).then(res => res.json())

          const fetchSubject = (id: string) => fetch(`/api/subject/${id}`)
          for (const {subject_id} of progress) {
            const subject = await fetchSubject(subject_id)
              .then(res => res.ok ? res : fetchSubject(subject_id))
              .then(res => res.json())
              .catch(reason => ({name: reason}))
            progressData.value.push({
              id: subject.id,
              name: subject.name,
              name_cn: subject.name_cn,
              image: subject.images.common,
            })
          }
        },
      }
    },
  })
</script>

<style lang="scss" scoped>
  ._el {
    > :not(:first-child) {
      @apply mt-10;
    }
  }

  ._text-code {
    font-size: 13px;
  }

  ._leading-code {
    line-height: 21px;
  }

  ._max-h-pre {
    max-height: 400px;
  }
</style>
