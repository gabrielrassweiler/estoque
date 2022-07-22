<template>
  <q-page>
    <div class="row justify-center" style="position: relative; top: 11vh;">
      <q-card class="col-md-4 col-sm-6 col-xs-10" bordered :style="$q.dark.isActive ? 'box-shadow: 0 1px 15px #383838;' : 'box-shadow: 0 1px 15px #cfcfcf;'">
        <q-card-section class="q-mt-lg q-mb-lg">
          <q-form @submit.prevent="handleEsqueceuSenha">
            <p class="col-12 text-h6 text-center text-uppercase" :style="$q.dark.isActive ? 'color: #e6e6e6;' : 'color: #383838;'">Resetar senha</p>

            <div class="q-gutter-y-lg q-mt-lg q-mb-lg" style="padding: 0 30px">
              <q-input
                label="Email"
                v-model="email"
                type="email"
              >
                <q-tooltip>O link para cadastrar nova senha será enviado para o email informado</q-tooltip>
              </q-input>

              <div class="full-width q-pt-md">
                <q-btn
                  label="Enviar"
                  color="primary"
                  class="full-width"
                  outline
                  rounded
                  type="submit"
                />
              </div>
              <q-btn
                label="Voltar"
                color="primary"
                class="full-width"
                flat
                rounded
                to="/login"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'EsqueceuSenha',
  setup () {
    const { resetaSenha } = useAuthUser()
    const email = ref('')
    const $q = useQuasar()

    const handleEsqueceuSenha = async () => {
      try {
        await resetaSenha(email.value)
        $q.dialog({
          title: 'Enviado',
          message: 'Link para resetar a senha enviado para o email: ' + email.value,
          color: 'primary'
        })
      } catch (error) {
        $q.dialog({
          title: 'Erro',
          message: error.message,
          color: 'primary'
        })
      }
    }

    return {
      email,
      handleEsqueceuSenha
    }
  }
})
</script>
