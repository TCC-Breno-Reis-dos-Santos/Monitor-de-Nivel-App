<template>
  <q-dialog ref="dialogRef">
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6">Deletar Monitor</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="text-body1 q-mb-md">Você deseja mesmo deletar o monitor de nível <span class="text-weight-bold">{{
            monitorADeletar.nome ?? ""
        }}</span> com IP
          <span class="text-weight-bold">{{ monitorADeletar.ip ?? ""
          }}</span>?
        </div>
        <q-btn label="deletar" icon-right="delete" color="negative" @click="confirmarDelecao"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";

export default {
  name: "DeletarMonitorDialog",
  setup() {
    const dialogRef = ref(null);
    return {
      dialogRef,
    };
  },
  props: {
    monitorADeletar: Object,
    indice: Number,
  },
  methods: {
    confirmarDelecao() {
      this.$emit("deleta", this.indice);
      this.$refs.dialogRef.hide();
    }
  },
}
</script>
