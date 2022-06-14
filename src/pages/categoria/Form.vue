<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p>Formulário de Categoria</p>
      </div>

      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
        <q-input
          label="Name"
          v-model="form.name"
          :rules="[val => (val && val.length > 0) || 'Campo obrigatório!']"
        />

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
          :to="{ name: 'categoria' }"
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

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'form-categoria',
  setup () {
    const form = ref({
      name: ''
    })
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const atualizar = computed(() => route.params.id)

    const handleSubmit = async () => {
      try {
        if (atualizar.value) {
          await update('categoria', form.value)
        } else {
          await post('categoria', form.value)
        }

        notifySuccess('Salvo com sucesso!')
        await router.push({ name: 'categoria' })
      } catch (e) {
        notifyError(e.message)
      }
    }

    const handleCategoria = async () => {
      try {
        form.value = await getById('categoria', atualizar.value)
      } catch (e) {
        notifyError(e.message)
      }
    }

    onMounted(() => {
      if (atualizar.value) {
        handleCategoria()
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
