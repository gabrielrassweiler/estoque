<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p>Formulário de Configuração</p>
      </div>

      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
        <q-input
          label="Nome da loja"
          v-model="form.nome"
        />

        <q-input
          label="Telefone"
          v-model="form.telefone"
          mask="(##) #####-####"
          unmasked-value
          class="q-mb-lg"
        />

        <div class="row justify-center q-col-gutter-md q-pa-sm">
            <q-color v-model="form.corPrimaria" class="col-md-5 col-sm-12 col-xs-12" />

            <q-color v-model="form.corSecundaria" class="col-md-5 col-sm-12 col-xs-12" />
        </div>

        <q-btn
          label="Salvar"
          color="primary"
          class="full-width"
          rounded
          type="submit"
        />

        <q-btn
          label="Cancelar"
          color="primary"
          class="full-width"
          rounded
          flat
          :to="{ name: 'me' }"
        />

      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useAuthUser from 'src/composables/UseAuthUser'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import useConfig from 'src/composables/UseConfig'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'form-config',
  setup () {
    const form = ref({
      nome: '',
      telefone: '',
      corPrimaria: '',
      corSecundaria: ''
    })
    const { user } = useAuthUser()
    const router = useRouter()
    const { setConfig } = useConfig()
    const { post, list, update } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const handleSubmit = async () => {
      try {
        if (form.value.id) {
          await update('config', form.value)
        } else {
          await post('config', form.value)
        }

        setConfig(form.value.corPrimaria, form.value.corSecundaria)
        notifySuccess('Salvo com sucesso!')
        await router.push({ name: 'me' })
      } catch (e) {
        notifyError(e.message)
      }
    }

    const handleBuscaConfig = async () => {
      try {
        const config = await list('config', user.value.id)
        form.value = config[0]
      } catch (e) {
        notifyError(e.message)
      }
    }

    onMounted(() => {
      handleBuscaConfig()
    })

    return {
      form,
      handleSubmit
    }
  }
})
</script>
