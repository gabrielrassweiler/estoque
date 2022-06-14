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
            @click="handleMode"
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
        <q-item-label class="text-center" header>Menu</q-item-label>

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
    title: 'Home',
    caption: '',
    icon: 'home',
    routeName: 'me'
  },
  {
    title: 'Categoria',
    caption: '',
    icon: 'category',
    routeName: 'categoria'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const $q = useQuasar()
    const dark = ref(localStorage.getItem('darkMode') === 'true' ?? 'false')
    if (localStorage.getItem('darkMode') === 'true') {
      $q.dark.set(true)
    }

    const leftDrawerOpen = ref(false)
    const { logout } = useAuthUser()
    const router = useRouter()

    const handleLogout = async () => {
      $q.dialog({
        title: 'Logout',
        message: 'Deseja realmente sair ?',
        cancel: true,
        persistent: true,
        color: 'primary'
      }).onOk(async () => {
        await logout()
        // O replace irá tirar o historico de navegação, logo nao tera mais como voltar
        await router.replace({ name: 'login' })
      })
    }

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
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      handleLogout,
      handleMode
    }
  }
})
</script>
