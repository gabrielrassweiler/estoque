<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-md-4 col-xs-12 col-sm-6">
        <card-dashboard
          label="Categoria(s)"
          table="categoria"
          icon="category"
        />
      </div>

      <div class="col-md-4 col-xs-12 col-sm-6">
        <card-dashboard
          label="Produto(s)"
          table="produto"
          icon="inventory"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    CardDashboard: defineAsyncComponent(() => import('src/components/CardDashboard.vue'))
  },
  setup () {

  }
})
</script>
