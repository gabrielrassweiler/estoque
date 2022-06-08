<template>
  <q-page class="text-center text-body1" padding>
    <p><b>Obrigado por se registrar!</b></p>
    <p>Por favor acesse em seu email ({{ $route.query.email }}) o link disponibilizado para a finalização do seu cadastro</p>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ConfirmacaoEmail'
})
</script>
