<template>
  <q-page padding class="row">
    <q-card flat class="col-12">
      <q-card-section>
        <div class="text-h4">Lista de Monitores <q-icon name="opacity"></q-icon>
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section class="full-height">
        <MonitoresTable />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import MonitoresTable from "components/tables/MonitoresTable.vue";

export default defineComponent({
  name: 'IndexPage',
  components: {
    MonitoresTable
  }
})
</script>
