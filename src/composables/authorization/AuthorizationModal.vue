<template>
  <div class="fixed inset-0 _bg-opacity">
    <div class="absolute inset-0 m-auto _size-modal border-2 border-red-400 bg-white rounded-md overflow-hidden shadow-lg">
      <form v-if="viewState === ViewState.Init" class="h-full p-4 flex flex-col justify-between" @submit.prevent="viewState = ViewState.PendingAuthorize">
        <label>
          <span class="text-red-400">App ID</span>
          <input v-model="appId" type="text" class="block w-full form-input font-mono">
        </label>
        <label>
          <span class="text-red-400">App Secret</span>
          <input v-model="appSecret" type="text" class="block w-full form-input font-mono">
        </label>
        <button class="p-4 bg-red-400 rounded text-white cursor-pointer">Go Authorize</button>
      </form>

      <iframe v-if="viewState === ViewState.PendingAuthorize" :src="iframeSrc" class="w-full h-full" />

      <p v-if="viewState === ViewState.Finishing" class="h-full tracking-widest text-red-400 uppercase flex items-center justify-center">Finishing</p>
    </div>
  </div>
</template>

<script lang="ts">
  import {computed, defineComponent, onUnmounted, ref, watch} from 'vue'
  import {parseQuery, stringifyQuery} from 'vue-router'

  import useAuthorization, {REDIRECT_URI} from '.'

  const BGM_AUTHORIZE_URL = 'https://bgm.tv/oauth/authorize'

  export default defineComponent({
    name: 'AuthorizationModal',

    setup () {
      const viewState = ref(ViewState.Init as ViewState)
      const {appId, appSecret, accessToken, refreshToken, userId, lastRefresh} = useAuthorization()

      const iframeSrc = computed(() => {
        const query = stringifyQuery({
          client_id: appId.value,
          response_type: 'code',
          redirect_uri: REDIRECT_URI,
        })
        return `${BGM_AUTHORIZE_URL}?${query}`
      })

      // Authorization code
      // Used only during initializing authorization, so just use a local state to store it
      const code = ref(null as string | null)

      function onMessage ({data}: MessageEvent) {
        const _code = typeof data === 'string' ? parseQuery(data).code as string : null
        if (_code) {
          code.value = _code
          window.removeEventListener('message', onMessage)
          viewState.value = ViewState.Finishing
        }
      }

      onUnmounted(() => window.removeEventListener('message', onMessage))

      // A simple FSM (sort of?) for modal view
      // TODO: Might have a better way to handle this process
      watch(viewState, value => {
        switch (value) {
          case ViewState.PendingAuthorize: {
            window.addEventListener('message', onMessage)
            return
          }
          case ViewState.Finishing: {
            function send () {
              return fetch(`/oauth/access_token`, {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'},
                body: stringifyQuery({
                  grant_type: 'authorization_code',
                  client_id: appId.value,
                  client_secret: appSecret.value,
                  code: code.value,
                  redirect_uri: REDIRECT_URI,
                }),
              })
            }

            send()
              .then(res => {
                if (!res.ok) {
                  // Retry once to deal with the confusing 500 issue
                  // See https://bgm.tv/group/topic/350650
                  console.warn(`Received ${res.status}. Retry...`)
                  return send()
                } else {
                  return res
                }
              })
              .then(res => res.json())
              .then(data => {
                accessToken.value = data.access_token
                refreshToken.value = data.refresh_token
                userId.value = data.user_id
                lastRefresh.value = Date.now()
              })
            return
          }
        }
      }, {immediate: true})

      return {
        viewState,
        ViewState,
        iframeSrc,

        appId,
        appSecret,
      }
    },
  })

  enum ViewState {
    Init,
    PendingAuthorize,
    Finishing,
  }
</script>

<style scoped>
  ._bg-opacity {
    background: rgba(0, 0, 0, 0.5);
  }

  ._size-modal {
    width: 500px;
    height: 500px;
  }
</style>
