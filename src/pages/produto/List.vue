<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Produtos"
        :rows="produtos"
        :columns="columnsProduto"
        row-key="name"
        class="col-12"
        :loading="carregando"
        loading-label="Carregando..."
      >
        <template v-slot:top>
          <span class="text-h6">Produtos</span>

          <q-btn
            label="Minha loja"
            class="q-ml-sm"
            color="primary"
            icon="store"
            size="sm"
            outline
            @click="handleMinhaLoja"
          />

          <q-btn
            label="Copiar link"
            class="q-ml-sm"
            color="primary"
            icon="content_copy"
            size="sm"
            outline
            @click="handleCopiarLinkPublico"
          >
            <q-tooltip>Link público para a sua loja</q-tooltip>
          </q-btn>

          <q-space />
          <q-btn
            v-if="$q.platform.is.desktop"
            icon="add"
            label="Novo"
            color="primary"
            dense
            :to="{ name: 'form-produto' }"
          />
        </template>

        <template v-slot:body-cell-img_url="props">
          <q-td :props="props">
            <q-avatar v-if="props.row.img_url">
              <img :src="props.row.img_url" :alt="props.row.nome" />
            </q-avatar>
            <q-avatar v-else color="grey" text-color="white" icon="hide_image" />
          </q-td>
        </template>

        <template v-slot:body-cell-acoes="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn
              icon="edit"
              color="info"
              size="sm"
              dense
              @click="handleEdit(props.row)"
            >
              <q-tooltip>Alterar</q-tooltip>
            </q-btn>
            <q-btn
              icon="delete"
              color="negative"
              size="sm"
              dense
              @click="handleRemove(props.row)"
            >
              <q-tooltip>Remover</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- Botão apresentado na versão mobile apenas -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        v-if="$q.platform.is.mobile"
        fab
        icon="add"
        color="primary"
        :to="{ name: 'form-produto' }"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { useRouter } from 'vue-router'
import { useQuasar, openURL, copyToClipboard } from 'quasar'
import { columnsProduto } from 'pages/produto/table'
import { defineComponent, onMounted, ref } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import useAuthUser from 'src/composables/UseAuthUser'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'produto',
  setup () {
    const produtos = ref([])
    const carregando = ref(true)
    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const router = useRouter()
    const $q = useQuasar()
    const { user } = useAuthUser()

    const handleListProducts = async () => {
      try {
        carregando.value = true
        produtos.value = await list('produto', user.value.id)
        carregando.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleRemove = async (props) => {
      $q.dialog({
        title: 'Remover',
        message: 'Deseja remover este registro?',
        color: 'primary'
      }).onOk(async () => {
        try {
          await remove('produto', props.id)
          notifySuccess('Registro deletado com sucesso!')
          await handleListProducts()
        } catch (error) {
          notifyError(error.message)
        }
      })
    }

    const handleEdit = (produto) => {
      router.push({ name: 'form-produto', params: { id: produto.id } })
    }

    const handleMinhaLoja = () => {
      const link = router.resolve({ name: 'produto-publico', params: { id: user.value.id } })
      openURL(window.origin + link.href)
    }

    const handleCopiarLinkPublico = () => {
      const link = router.resolve({ name: 'produto-publico', params: { id: user.value.id } })
      const linkExterno = window.origin + link.href

      copyToClipboard(linkExterno)
        .then(() => {
          notifySuccess('Copiado com sucesso!')
        })
        .catch((error) => {
          notifyError(error.message)
        })
    }

    onMounted(() => {
      handleListProducts()
    })

    return {
      produtos,
      columnsProduto,
      carregando,
      handleEdit,
      handleRemove,
      handleMinhaLoja,
      handleCopiarLinkPublico
    }
  }
})
</script>
