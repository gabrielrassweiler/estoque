<template>
  <q-page padding>
    <q-form class="row justify-center" style="top: 20vh;" @submit.prevent="handleEsqueceuSenha">
      <p class="col-12 text-h5 text-center">Resetar senha</p>

      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-lg">
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
