<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>Estoque</q-toolbar-title>

        <div>
          <q-toggle
            v-model="dark"
            unchecked-icon="brightness_5"
            checked-icon="nightlight_round"
            color="white"
            icon-color="grey"
            @click="$q.dark.toggle()"
          />
        </div>
        <q-btn-dropdown flat color="white" icon="person">
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label @click="handleLogout">Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useRouter } from 'vue-router'
import useAuthUser from 'src/composables/UseAuthUser'
import { useQuasar } from 'quasar'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const dark = ref(false)
    const leftDrawerOpen = ref(false)
    const { logout } = useAuthUser()
    const router = useRouter()
    const $q = useQuasar()

    const handleLogout = async () => {
      $q.dialog({
        title: 'Logout',
        message: 'Deseja realmente sair ?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        await logout()
        await router.replace({ name: 'login' })
      })
    }

    return {
      dark,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      handleLogout
    }
  }
})
</script>
