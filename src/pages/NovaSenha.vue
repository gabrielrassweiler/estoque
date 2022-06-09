<template>
  <q-page padding>
    <q-form class="row justify-center" style="top: 20vh;" @submit.prevent="handleNovaSenha">
      <p class="col-12 text-h5 text-center">Nova senha</p>

      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-lg">
        <q-input
          label="Nova senha"
          v-model="senha"
          type="password"
        />
        <q-input
          label="Confirme a nova senha"
          v-model="confirmaSenha"
          type="password"
        />

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
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'NovaSenha',
  setup () {
    const { updateSenha } = useAuthUser()
    const senha = ref('')
    const confirmaSenha = ref('')
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const token = route.query.token

    const handleNovaSenha = async () => {
      if (senha.value !== confirmaSenha.value) {
        $q.dialog({
          title: 'Erro',
          message: 'As senhas informadas não coincidem',
          color: 'primary'
        })

        return
      }

      try {
        await updateSenha(token, senha.value)
        $q.notify({
          message: 'Nova senha cadastrada com sucesso!',
          color: 'primary'
        })
        await router.replace({ name: 'login' })
      } catch (error) {
        $q.dialog({
          title: 'Erro',
          message: error.message,
          color: 'primary'
        })
      }
    }

    return {
      senha,
      confirmaSenha,
      handleNovaSenha
    }
  }
})
</script>
