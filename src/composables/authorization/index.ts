import {computed, createApp, watch} from 'vue'

import useStorage from '@/composables/storage'
import AuthorizationModal from './AuthorizationModal.vue'
import {stringifyQuery} from 'vue-router'

const ONE_DAY = 1000 * 60 * 60 * 24
export const REDIRECT_URI = location.origin + '/callback.html'
export const enum StorageKey {
  AppId = 'app_id',
  AppSecret = 'app_secret',
  AccessToken = 'access_token',
  RefreshToken = 'refresh_token',
  LastRefresh = 'last_refresh',
  UserId = 'user_id',
}

const {get, set, clear: clearStorage} = useStorage()

const appId = get(StorageKey.AppId)
const appSecret = get(StorageKey.AppSecret)
const accessToken = get(StorageKey.AccessToken)
const refreshToken = get(StorageKey.RefreshToken)
const userId = get(StorageKey.UserId)
const lastRefresh = computed({
  get: () => Number(get(StorageKey.LastRefresh).value),
  set: (value: number) => set(StorageKey.LastRefresh, String(value)),
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

interface TokenStatus {
  access_token: string
  client_id: string
  expires: number
  scope: null
  user_id: string
}

async function retrieveStatus () {
  const data: TokenStatus = await fetch('/oauth/token_status', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'},
    body: stringifyQuery({access_token: accessToken.value}),
  }).then(res => res.json())
  userId.value = data.user_id
}

interface RefreshTokenResponse {
  access_token: string
  expires_in: number
  token_type: 'Bearer'
  scope: null
  refresh_token: string
}

async function refresh () {
  if (Date.now() - lastRefresh.value < ONE_DAY) return

  const data: RefreshTokenResponse = await fetch('/oauth/access_token', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'},
    body: stringifyQuery({
      grant_type: 'refresh_token',
      client_id: appId.value,
      client_secret: appSecret.value,
      refresh_token: refreshToken.value,
      redirect_uri: REDIRECT_URI,
    }),
  }).then(res => res.json())
  accessToken.value = data.access_token
  refreshToken.value = data.refresh_token
  lastRefresh.value = Date.now()
}

function clear () {
  clearStorage()
}

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
    lastRefresh,

    authorize,
    retrieveStatus,
    refresh,
    clear,

    fetch: _fetch,
  }
}
