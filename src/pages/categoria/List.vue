<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Categoria"
        :rows="categorias"
        :columns="columnsCategoria"
        row-key="name"
        class="col-12"
        :loading="carregando"
        loading-label="Carregando..."
      >
        <template v-slot:top>
          <span class="text-h6">Categoria</span>
          <q-space />
          <q-btn
            v-if="$q.platform.is.desktop"
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

    <!-- Botão apresentado na versão mobile apenas -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        v-if="$q.platform.is.mobile"
        fab
        icon="add"
        color="primary"
        :to="{ name: 'form-categoria' }"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { useRouter } from 'vue-router'
import { columnsCategoria } from 'pages/categoria/table'
import { defineComponent, onMounted, ref } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { useQuasar } from 'quasar'
import useAuthUser from 'src/composables/UseAuthUser'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'categoria',
  setup () {
    const categorias = ref([])
    const carregando = ref(true)
    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const router = useRouter()
    const $q = useQuasar()
    const { user } = useAuthUser()

    const handleListCategories = async () => {
      try {
        carregando.value = true
        categorias.value = await list('categoria', user.value.id)
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
          await remove('categoria', props.id)
          notifySuccess('Registro deletado com sucesso!')
          await handleListCategories()
        } catch (error) {
          notifyError(error.message)
        }
      })
    }

    const handleEdit = (categoria) => {
      router.push({ name: 'form-categoria', params: { id: categoria.id } })
    }

    onMounted(() => {
      handleListCategories()
    })

    return {
      categorias,
      columnsCategoria,
      carregando,
      handleEdit,
      handleRemove
    }
  }
})
</script>
