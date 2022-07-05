<template>
  <q-dialog
    :full-width="$q.platform.is.mobile"
    :model-value="mostrarDetalhes"
    @before-hide="handleFechar"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">Detalhes</div>
      </q-card-section>

      <q-card-section>
        <q-img
          :src="produto.img_url"
          :ratio="4/3"
          style="min-width: 300px"
        />
      </q-card-section>

      <q-card-section>
        <div class="text-h6">{{ produto.name }}</div>

        <div class="text-subtitle2">{{ formatMoney(produto.preco) }}</div>

        <div class="text-body2" v-html="produto.descricao"></div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Cancelar"
          color="primary"
          v-close-popup
          outline
        />
        <q-btn
          v-if="config.telefone"
          label="Fazer pedido"
          color="green"
          icon="whatsapp"
          @click="handleEnviarWhatsapp"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { formatMoney } from 'src/utils/format'
import { openURL } from 'quasar'
import UseApi from 'src/composables/UseApi'

export default defineComponent({
  name: 'DialogProdutoDetalhes',
  props: {
    mostrarDetalhes: {
      type: Boolean,
      required: true
    },
    produto: {
      type: Object
    }
  },
  setup (props, { emit }) {
    const { config } = UseApi()
    const msg = 'Olá, fiquei interessado no produto: '

    const handleFechar = () => {
      emit('fecharDialog')
    }

    const handleEnviarWhatsapp = () => {
      openURL(encodeURI(`https://api.whatsapp.com/send?phone=55${config.telefone}&text=${msg} - ${props.produto.name} - ${formatMoney(props.produto.preco)}`))
    }

    return {
      formatMoney,
      handleFechar,
      handleEnviarWhatsapp,
      config
    }
  }
})
</script>
