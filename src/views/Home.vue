<template>
  <div class="_el mx-auto py-10 flex flex-col" style="width: 800px;">
    <div class="border border-gray-300 rounded-md overflow-hidden">
      <button class="block w-full px-3 py-2 underline" @click="authorize">Authorize</button>
      <pre class="_max-h-pre p-4 _text-code _leading-code border-t border-gray-300 bg-gray-100 overflow-auto">{{ JSON.stringify(authorizationData, null, 2) }}</pre>
    </div>

    <div class="border border-gray-300 rounded-md overflow-hidden">
      <button class="block w-full px-3 py-2 underline" @click="getProgress">Get Progress</button>
      <pre class="_max-h-pre p-4 _text-code _leading-code border-t border-gray-300 bg-gray-100 overflow-auto">{{ JSON.stringify(progressData, null, 2) }}</pre>
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

      const progressData = ref(null as any)

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
          progressData.value = await fetch(`/api/user/${userId.value}/progress`).then(res => res.json())
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
