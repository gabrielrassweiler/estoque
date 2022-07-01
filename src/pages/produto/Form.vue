<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p>Formulário de Produto</p>
      </div>

      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
        <q-input
          label="Nome"
          v-model="form.name"
          :rules="[val => (val && val.length > 0) || 'Campo obrigatório!']"
        />

        <q-input
          label="Imagem"
          stack-label
          type="file"
          v-model="imagem"
          accept="image/*"
        />

        <q-editor v-model="form.descricao" min-height="5rem" />

        <q-input
          label="Quantidade"
          v-model="form.quantidade"
          type="number"
          :rules="[val => !!val || 'Campo obrigatório!']"
        />

        <q-input
          label="Preço"
          v-model="form.preco"
          type="float"
          prefix="R$"
          :rules="[val => !!val || 'Campo obrigatório!']"
        />

        <q-select
          v-model="form.categoria_id"
          :options="opcoesCategoria"
          label="Categoria"
          option-value="id"
          option-label="name"
          map-options
          emit-value
          :rules="[val => !!val || 'Campo obrigatório!']"
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
          :to="{ name: 'produto' }"
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
import useAuthUser from 'src/composables/UseAuthUser'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'form-produto',
  setup () {
    const form = ref({
      name: '',
      descricao: '',
      quantidade: 0,
      preco: 0,
      categoria_id: '',
      img_url: ''
    })
    const opcoesCategoria = ref([])
    const imagem = ref([])
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update, list, uploadImg } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const { user } = useAuthUser()
    const atualizar = computed(() => route.params.id)

    const handleSubmit = async () => {
      try {
        if (imagem.value.length) {
          form.value.img_url = await uploadImg(imagem.value[0], 'produtos')
        }

        if (atualizar.value) {
          await update('produto', form.value)
        } else {
          await post('produto', form.value)
        }

        notifySuccess('Salvo com sucesso!')
        await router.push({ name: 'produto' })
      } catch (e) {
        notifyError(e.message)
      }
    }

    const handleProduto = async () => {
      try {
        form.value = await getById('produto', atualizar.value)
      } catch (e) {
        notifyError(e.message)
      }
    }

    const handleListCategorias = async () => {
      opcoesCategoria.value = await list('categoria', user.value.id)
    }

    onMounted(() => {
      handleListCategorias()
      if (atualizar.value) {
        handleProduto()
      }
    })

    return {
      form,
      handleSubmit,
      atualizar,
      opcoesCategoria,
      imagem
    }
  }
})
</script>
