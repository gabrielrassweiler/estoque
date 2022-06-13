<template>
  <q-page padding>
    <q-form class="row justify-center" style="top: 20vh;" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center">Login</p>

      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-lg">
        <q-input
          label="Email"
          v-model="form.email"
          type="email"
        />
        <q-input
          label="Senha"
          v-model="form.password"
          type="password"
        />

        <div class="full-width q-pt-md">
          <q-btn
            label="Login"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />
        </div>
        <q-btn
          label="Registrar-se"
          color="primary"
          class="full-width q-gutter-y-sm"
          flat
          rounded
          to="/registrar"
        />
        <q-btn
          label="Esqueceu a senha ?"
          color="primary"
          class="full-width"
          flat
          rounded
          to="/esqueceu-senha"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  setup () {
    const form = ref({
      email: '',
      password: ''
    })
    const router = useRouter()
    const { login, verificaLogado } = useAuthUser()
    const $q = useQuasar()

    onMounted(() => {
      if (verificaLogado()) {
        router.replace({ name: 'me' })
      }
    })

    const handleLogin = async () => {
      try {
        await login(form.value)
        await router.push({ name: 'me' })
      } catch (error) {
        $q.dialog({
          title: 'Erro',
          message: error.message.toLowerCase() === 'invalid login credentials' ? 'Senha incorreta!' : error.message,
          color: 'primary'
        })
      }
    }

    return {
      form,
      handleLogin
    }
  }
})
</script>
