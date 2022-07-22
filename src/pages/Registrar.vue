<template>
  <q-page>
    <div class="row justify-center" style="position: relative; top: 11vh;">
      <q-card class="col-md-4 col-sm-6 col-xs-10" bordered :style="$q.dark.isActive ? 'box-shadow: 0 1px 15px #383838;' : 'box-shadow: 0 1px 15px #cfcfcf;'">
        <q-card-section class="q-mt-lg q-mb-lg">
          <q-form @submit.prevent="handleRegistrar">
            <p class="col-12 text-h6 text-center text-uppercase" :style="$q.dark.isActive ? 'color: #e6e6e6;' : 'color: #383838;'">Registrar-se</p>

            <div class="q-gutter-y-lg q-mt-lg q-mb-lg" style="padding: 0 30px">
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
        $q.loading.show()
        await registrar(form.value)
        await router.push({
          name: 'ConfirmacaoEmail',
          query: { email: form.value.email }
        })
        $q.loading.hide()
      } catch (error) {
        $q.loading.hide()
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
