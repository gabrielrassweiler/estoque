import { formatMoney } from 'src/utils/format'
import { ref } from 'vue'

const columnsProduto = [
  { name: 'img_url', field: 'img_url', label: 'Imagem', align: 'left', sortable: false },
  { name: 'name', field: 'name', label: 'Nome', align: 'left', sortable: true, style: 'width: 30%' },
  { name: 'quantidade', field: 'quantidade', label: 'Quantidade', align: 'left', sortable: true },
  { name: 'preco', field: 'preco', label: 'Preço', align: 'left', sortable: true, format: (val) => formatMoney(val) },
  { name: 'acoes', field: 'acoes', label: 'Ações', align: 'right', sortable: false }
]

const initialPagination = ref({
  page: 1,
  rowsPerPage: 5
})

export {
  columnsProduto,
  initialPagination
}
