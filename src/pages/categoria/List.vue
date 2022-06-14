<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Categoria"
        :rows="categorias"
        :columns="columns"
        row-key="name"
        class="col-12"
        :loading="carregando"
        loading-label="Carregando..."
      >
        <template v-slot:top>
          <span class="text-h6">Categoria</span>
          <q-space />
          <q-btn
            icon="add"
            label="Novo"
            color="primary"
            dense
            :to="{ name: 'form-categoria' }"
          />
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
  </q-page>
</template>

<script>
import { useRouter } from 'vue-router'

const columns = [
  { name: 'name', field: 'name', label: 'Nome', align: 'left', sortable: true },
  { name: 'acoes', field: 'acoes', label: 'Ações', align: 'right', sortable: true }
]

import { defineComponent, onMounted, ref } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'categoria',
  setup () {
    const categorias = ref([])
    const carregando = ref(true)
    const { list } = useApi()
    const { notifyError } = useNotify()
    const router = useRouter()

    const handleListCategories = async () => {
      try {
        carregando.value = true
        categorias.value = await list('categoria')
        carregando.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (categoria) => {
      router.push({ name: 'form-categoria', params: { id: categoria.id } })
    }

    onMounted(() => {
      handleListCategories()
    })

    return {
      categorias,
      columns,
      carregando,
      handleEdit
    }
  }
})
</script>
