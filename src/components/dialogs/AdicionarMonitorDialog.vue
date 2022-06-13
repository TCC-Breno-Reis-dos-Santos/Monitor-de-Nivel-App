<template>
  <q-dialog ref="dialogRef" @hide="limpaForm">
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6">
          Adição de um Monitor
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <MonitorForm @form-submit="formSubmit" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";

import MonitorForm from "components/forms/MonitorForm.vue";

export default {
  name: "AdicionarMonitorDialog",
  components: {
    MonitorForm,
  },
  emits: ["adicionado"],
  setup() {
    const dialogRef = ref(null);
    return {
      dialogRef,
    };
  },
  data: () => ({
  }),
  methods: {
    formSubmit(monitor) {
      this.$emit("adicionado", monitor);
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
