import {createApp} from 'vue'

import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

if (process.env.NODE_ENV === 'development') {
  const el = document.createElement('div')
  document.body.append(el)

  import('@/components/Debugger.vue').then(({default: Debugger}) => {
    createApp(Debugger).mount(el)
  })
}
