<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>{{ config.nome ? config.nome : 'Estoque' }}</q-toolbar-title>

        <div>
          <q-toggle
            v-model="dark"
            unchecked-icon="brightness_5"
            checked-icon="nightlight_round"
            color="white"
            icon-color="grey"
            @click="handleMode"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import useApi from 'src/composables/UseApi'

export default defineComponent({
  name: 'PublicLayout',
  setup () {
    const { getConfig, config } = useApi()
    const $q = useQuasar()
    const dark = ref(localStorage.getItem('darkMode') === 'true' ?? 'false')
    if (localStorage.getItem('darkMode') === 'true') {
      $q.dark.set(true)
    }

    onMounted(() => {
      getConfig()
    })

    const handleMode = () => {
      if (!dark.value) {
        localStorage.setItem('darkMode', 'false')
        $q.dark.set(false)
      } else {
        localStorage.setItem('darkMode', 'true')
        $q.dark.set(true)
      }
    }

    return {
      dark,
      handleMode,
      config
    }
  }
})
</script>
