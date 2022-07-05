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
          :rules="[val => (val && val.length > 0) || 'Campo obrigatório!']"
        />

        <q-input
          label="Telefone"
          v-model="form.telefone"
          :rules="[val => (val && val.length > 0) || 'Campo obrigatório!']"
          mask="(##) #####-####"
          unmasked-value
        />

        <div class="row justify-center q-col-gutter-md q-pa-sm">
            <q-color v-model="form.corPrimaria" class="col-md-5 col-sm-12 col-xs-12" />

            <q-color v-model="form.corSecundaria" class="col-md-5 col-sm-12 col-xs-12" />
        </div>

        <q-btn
          :label="atualizar ? 'Atualizar' : 'Salvar'"
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
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
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
    const router = useRouter()
    const route = useRoute()
    const { setConfig } = useConfig()
    const { post, getById, update } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const atualizar = computed(() => route.params.id)

    const handleSubmit = async () => {
      try {
        if (atualizar.value) {
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

    const handleConfig = async () => {
      try {
        form.value = await getById('config', atualizar.value)
      } catch (e) {
        notifyError(e.message)
      }
    }

    onMounted(() => {
      if (atualizar.value) {
        handleConfig()
      }
    })

    return {
      form,
      handleSubmit,
      atualizar
    }
  }
})
</script>
