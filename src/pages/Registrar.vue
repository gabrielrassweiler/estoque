<template>
  <q-page padding>
    <q-form class="row justify-center form" style="top: 20vh;" @submit.prevent="handleRegistrar">
      <p class="col-12 text-h5 text-center">Registrar-se</p>

      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-lg">
        <q-input
          label="Nome"
          v-model="form.name"
        />
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
            label="Registrar"
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
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Registrar',
  setup () {
    const form = ref({
      name: '',
      email: '',
      password: ''
    })
    const router = useRouter()
    const { registrar } = useAuthUser()
    const $q = useQuasar()

    const handleRegistrar = async () => {
      try {
        await registrar(form.value)
        await router.push({
          name: 'ConfirmacaoEmail',
          query: { email: form.value.email }
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
      form,
      handleRegistrar
    }
  }
})
</script>
