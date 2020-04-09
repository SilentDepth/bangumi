import {computed, reactive} from 'vue'

const local = reactive(getStorageItems(localStorage))
const session = reactive(getStorageItems(sessionStorage))
const originMap = new Map([
  [local, localStorage],
  [session, sessionStorage],
])

const localProxy = createProxy(local)
const sessionProxy = createProxy(session)

function getStorageItems (storageObj: Storage) {
  const data = {} as {[key: string]: string}
  for (const key of Object.keys(storageObj)) {
    const value = storageObj.getItem(key)
    if (value) {
      data[key] = value
    }
  }
  return data
}

function createProxy (target: typeof local) {
  return new Proxy(target, {
    get (target, property: string) {
      return target[property]
    },
    set (target, property: string, value: string) {
      target[property] = value
      originMap.get(target)!.setItem(property, value)
      return true
    },
    deleteProperty (target, property: string) {
      delete target[property]
      originMap.get(target)!.removeItem(property)
      return true
    },
  })
}

function set (key: string, value: string, session: boolean = false) {
  (session ? sessionProxy : localProxy)[key] = value
}

export default function useStorage () {
  return {
    local: localProxy,
    session: sessionProxy,

    get: (key: string, session: boolean = false) => computed({
      get: () => (session ? sessionProxy : localProxy)[key],
      set: value => set(key, value, session),
    }),

    set,

    remove (key: string, session: boolean = false) {
      delete (session ? sessionProxy : localProxy)[key]
    },
  }
}
