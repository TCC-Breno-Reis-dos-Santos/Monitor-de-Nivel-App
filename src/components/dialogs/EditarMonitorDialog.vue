<template>
  <q-dialog ref="dialogRef" @hide="limpaForm">
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6">
          Edição de um Monitor
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <MonitorForm :nome="monitorAEditar.nome" :ip="monitorAEditar.ip" @form-submit="formSubmit" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";

import MonitorForm from "components/forms/MonitorForm.vue";

export default {
  name: "EditarMonitorDialog",
  components: {
    MonitorForm,
  },
  emits: ["editado"],
  setup() {
    const dialogRef = ref(null);
    return {
      dialogRef,
    };
  },
  props: {
    indice: Number,
    monitorAEditar: Object,
  },
  data: (props) => ({
  }),
  methods: {
    formSubmit(monitor) {
      this.$emit("editado", monitor, this.indice);
      this.$refs.dialogRef.hide();
    },
    limpaForm() {
      this.monitorForm = {
        nome: "",
        ip: "",
      }
    },
  }
}
</script>
