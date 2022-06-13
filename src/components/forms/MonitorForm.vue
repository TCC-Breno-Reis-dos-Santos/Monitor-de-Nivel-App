<template>
  <q-form @submit="formSubmit">
    <q-input v-model="monitorForm.nome" class="q-mb-md" placeholder="Nome" type="text"
      :rules="[val => val.length != 0 || 'Campo obrigatório']">
      <template v-slot:append>
        <q-icon name="water_drop"></q-icon>
      </template>
    </q-input>
    <q-input v-model="monitorForm.ip" class="q-mb-md" placeholder="IP" type="text"
      :rules="[val => val.length != 0 || 'Campo obrigatório', val => validaIPMethod(val) || 'IP inválido']">
      <template v-slot:append>
        <q-icon name="language"></q-icon>
      </template>
    </q-input>
    <q-btn label="confirmar" color="positive" type="submit" icon-left="check" />
  </q-form>
</template>

<script>
import { validaIP } from "../../validators/validadoresDeInputs.js";

export default {
  name: "AdicionarMonitorForm",
  props: {
    nome: String,
    ip: String,
  },
  emits: ["form-submit"],
  data: (props) => ({
    monitorForm: {
      nome: props.nome != null ? props.nome : "",
      ip: props.ip != null ? props.ip : "",
    }
  }),
  methods: {
    formSubmit() {
      this.$emit("form-submit", this.monitorForm);
    },
    validaIPMethod(ipText) {
      return validaIP(ipText);
    },
  }
}
</script>
