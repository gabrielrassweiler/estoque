<template>
  <q-page padding>
    <div class="row">
      <q-select
        v-model="categoriaId"
        label="Categoria"
        class="col-12"
        :options="opcoesCategoria"
        option-label="name"
        option-value="id"
        map-options
        emit-value
        clearable
        outlined
        dense
        @update:model-value="handleListProducts(route.params.id)"
      />

      <q-table
        grid
        :rows="produtos"
        :columns="columnsProduto"
        row-key="id"
        class="col-12"
        :loading="carregando"
        loading-label="Carregando..."
        :filter="filter"
      >
        <template v-slot:top>
          <span class="text-h6">Produtos</span>
          <q-space />
          <q-input
            v-model="filter"
            placeholder="Pesquise..."
            class="q-mr-sm"
            debounce="300"
            outlined
            dense
          >
            <template v-slot:append>
              <q-icon name="search"></q-icon>
            </template>
          </q-input>
        </template>

        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card
              class="cursor-pointer"
              v-ripple:primary
              @click="handleMostrarDetalhes(props.row)"
            >
              <q-card-section class="text-center">
                <q-img :src="props.row.img_url" :ratio="4/3" />

                <div class="text-h6">{{ props.row.name }}</div>
                <div class="text-subtitle2">{{ formatMoney(props.row.preco) }}</div>
              </q-card-section>
            </q-card>
          </div>
        </template>

      </q-table>
    </div>

    <dialog-produto-detalhes
      :mostrarDetalhes="mostrarModal"
      :produto="detalhesProduto"
      @fecharDialog=false
    />
  </q-page>
</template>

<script>
import { columnsProduto } from 'pages/produto/table'
import { defineComponent, onMounted, ref } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { useRoute } from 'vue-router'
import { formatMoney } from 'src/utils/format'
import DialogProdutoDetalhes from 'components/DialogProdutoDetalhes.vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'produtoPublico',
  components: {
    DialogProdutoDetalhes
  },
  setup () {
    const produtos = ref([])
    const filter = ref('')
    const carregando = ref(true)
    const mostrarModal = ref(false)
    const detalhesProduto = ref({})
    const opcoesCategoria = ref([])
    const categoriaId = ref('')
    const { list } = useApi()
    const { notifyError } = useNotify()
    const route = useRoute()

    const handleMostrarDetalhes = (produto) => {
      detalhesProduto.value = produto
      mostrarModal.value = true
    }

    const handleListProducts = async (userId) => {
      try {
        carregando.value = true
        produtos.value = categoriaId.value
          ? await list('produto', userId, 'categoria_id', categoriaId.value)
          : await list('produto', userId)
        carregando.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleListCategorias = async (userId) => {
      try {
        opcoesCategoria.value = await list('categoria', userId)
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      if (route.params.id) {
        handleListProducts(route.params.id)
        handleListCategorias(route.params.id)
      }
    })

    return {
      produtos,
      columnsProduto,
      carregando,
      formatMoney,
      filter,
      mostrarModal,
      detalhesProduto,
      handleMostrarDetalhes,
      handleListCategorias,
      handleListProducts,
      opcoesCategoria,
      categoriaId,
      route
    }
  }
})
</script>
