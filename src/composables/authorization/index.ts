import {computed, createApp, watch} from 'vue'

import useStorage from '@/composables/storage'
import AuthorizationModal from './AuthorizationModal.vue'

export const REDIRECT_URI = location.origin + '/callback.html'
export const enum StorageKey {
  AppId = 'app_id',
  AppSecret = 'app_secret',
  AccessToken = 'access_token',
  RefreshToken = 'refresh_token',
  ExpiresIn = 'expires_in',
  UserId = 'user_id',
}

const {get, set} = useStorage()

const appId = get(StorageKey.AppId)
const appSecret = get(StorageKey.AppSecret)
const accessToken = get(StorageKey.AccessToken)
const refreshToken = get(StorageKey.RefreshToken)
const userId = get(StorageKey.UserId)
const expiresIn = computed({
  get: () => Number(get(StorageKey.ExpiresIn).value),
  set: (value: number) => set(StorageKey.ExpiresIn, String(value)),
})

function authorize (): Promise<void> {
  return new Promise(resolve => {
    const el = document.createElement('div')
    document.body.append(el)

    const modal = createApp(AuthorizationModal)
    modal.mount(el)

    const stop = watch(accessToken, value => {
      if (value) {
        stop()
        modal.unmount(el)
        document.body.removeChild(el)
        resolve()
      }
    })
  })
}

function refresh () {}

function _fetch (input: Request | string, init: RequestInit = {}): Promise<Response> {
  return fetch(input, {
    ...init,
    headers: {
      ...init.headers,
      'Authorization': `Bearer ${accessToken.value}`,
    },
  })
}

export default function useAuthorization () {
  return {
    appId,
    appSecret,
    accessToken,
    refreshToken,
    userId,
    expiresIn,

    authorize,
    refresh,
    fetch: _fetch,
  }
}
