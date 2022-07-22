<template>
  <q-page>
    <div class="row justify-center q-gutter-x-lg">
      <img class="imagem-fundo" src="../assets/wave.svg" alt="imagem" />

      <div class="col-md-4 col-sm-7 col-xs-10 d-text">
        <p class="text-h6" :style="$q.dark.isActive ? 'color: #e6e6e6;' : 'color: #383838;'">Gerencie seu estoque e loja</p>
        <p class="text-h5 text-weight-bold" style="color: #2c9c6a">Faça login ou cadastre-se agora mesmo!</p>

        <img class="imagem-estoque" src="../assets/animacao.svg" alt="imagem-estoque" />
      </div>

      <q-card class="col-md-4 col-sm-7 col-xs-10 card-main" bordered :style="$q.dark.isActive ? 'box-shadow: 0 1px 15px #383838;' : 'box-shadow: 0 1px 15px #cfcfcf;'">
        <q-card-section class="q-mt-lg q-mb-lg">
          <q-form @submit.prevent="handleLogin">
            <p class="col-12 text-h6 text-center text-uppercase" :style="$q.dark.isActive ? 'color: #e6e6e6;' : 'color: #383838;'">Login</p>

            <div>
              <div class="q-gutter-y-lg q-mt-lg q-mb-lg" style="padding: 0 30px">
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
                <q-btn
                  label="Login"
                  color="primary"
                  class="full-width"
                  outline
                  rounded
                  type="submit"
                />
              </div>

              <div style="padding: 0 30px">
                <q-btn
                  label="Registrar-se"
                  color="primary"
                  class="full-width q-gutter-y-sm q-mt-lg"
                  flat
                  rounded
                  to="/registrar"
                />
                <q-btn
                  label="Esqueceu a senha ?"
                  color="primary"
                  class="full-width q-mt-sm"
                  flat
                  rounded
                  to="/esqueceu-senha"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
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
        $q.loading.show()
        await login(form.value)
        await router.push({ name: 'me' })
        $q.loading.hide()
      } catch (error) {
        $q.loading.hide()
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

<style scoped>
  .imagem-fundo {
    position: fixed;
    bottom: 0;
    margin: auto;
    width: 105%;
    height: 50%;
    object-fit: cover;
  }

  .imagem-estoque {
    position: relative;
    width: 75%;
  }

  .d-text {
    position: relative;
    top: 10vh;
    text-align: center;
  }

  .card-main {
    top: 11vh;
    height: 500px;
    margin-bottom: 160px;
  }
</style>
