<template>
  <div class="fixed top-0 right-0 m-4 bg-red-400 rounded-md text-white overflow-hidden">
    <div :class="['flex items-center', isCollapsed ? 'p-0.5' : 'p-1']">
      <button class="rounded overflow-hidden flex" @click="onClickMenuButton">
        <img v-if="user" :src="user.avatar.medium" :alt="user.nickname" :class="isCollapsed ? 'w-10 h-10' : 'w-12 h-12'">
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 m-2 fill-white">
          <path d="M20 22H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2zm-8-9a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"/>
        </svg>
      </button>
      <p v-if="user" v-show="!isCollapsed" class="mx-2 whitespace-no-wrap flex flex-col">
        <span>{{ user.nickname }}</span>
        <code class="mt-1 text-sm text-red-100">@{{ user.username }}</code>
      </p>
    </div>
    <div v-if="user" v-show="!isCollapsed" class="border-t border-red-300">
      <button class="block w-full p-3 hover:bg-blue-500" @click="clear">清除验证数据</button>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, ref, watch} from 'vue'

  import useAuthorization from '@/composables/authorization'
  import useBgmApi from '@/composables/bgm-api'

  export default defineComponent({
    name: 'UserMenu',

    setup () {
      const menuRoot = ref(null as Element | null)
      const isCollapsed = ref(true)

      const {accessToken, userId, authorize, retrieveStatus, refresh, clear: clearAuth} = useAuthorization()

      function onClickMenuButton () {
        if (!userId.value) {
          authorize()
        } else {
          isCollapsed.value = false

          const onClickAway = (ev: MouseEvent) => {
            let p = ev.target as Element | null
            do {
              if (p === menuRoot.value) return
              p = p!.parentElement
            } while (p !== null)

            isCollapsed.value = true
            document.removeEventListener('click', onClickAway, true)
          }
          document.addEventListener('click', onClickAway, true)
        }
      }

      ;(async () => {
        if (!accessToken.value) return
        await retrieveStatus()
        await refresh()
      })()

      const {getUser} = useBgmApi(accessToken)
      const user = ref(null as User | null)
      const clear = () => {
        clearAuth()
        user.value = null
      }

      watch(userId, async value => value && (user.value = await getUser(value)), {immediate: true})

      return {
        menuRoot,
        isCollapsed,

        onClickMenuButton,

        user,
        clear,
      }
    },
  })
</script>
