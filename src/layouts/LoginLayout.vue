<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'LoginLayout',
  setup () {
    const $q = useQuasar()
    if (localStorage.getItem('darkMode') === 'true') {
      $q.dark.set(true)
    }

    return {}
  }
})
</script>
