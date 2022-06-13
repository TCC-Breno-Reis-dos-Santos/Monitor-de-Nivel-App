<template>
  <q-table :columns="columns" :rows="rows" @row-click="preparaEAbreDialogDeDetalhamento" flat dense virtual-scroll
    v-model:pagination="pagination" :rows-per-page-options="[0]">
    <template v-slot:top>
      <div class="row fit justify-end">
        <q-btn round icon="refresh" color="positive" @click="atualizaTabelaComDadosDosMonitores"></q-btn>
      </div>
    </template>
    <template v-slot:body-cell-acao="props">
      <q-td :props="props">
        <div class="q-gutter-xs">
          <q-btn round flat color="primary" size="sm" icon="edit"
            @click.stop="preparaEAbreDialogDeEdicao(props.row, props.rowIndex)"></q-btn>
          <q-btn round flat color="negative" size="sm" icon="delete"
            @click.stop="preparaEAbreDialogDeDelecao(props.row, props.rowIndex)"></q-btn>
        </div>
      </q-td>
    </template>
    <template v-slot:body-cell-bombeando="props">
      <q-td :props="props">
        <q-icon v-if="props.row.bombeando == null" name="block" color="negative" size="sm"></q-icon>
        <q-icon v-if="props.row.bombeando == 'LIGADO'" name="bolt" color="positive" size="sm"></q-icon>
        <q-icon v-if="props.row.bombeando == 'DESLIGADO'" name="do_not_disturb_on" color="warning" size="sm"></q-icon>
      </q-td>
    </template>
    <template v-slot:body-cell-estado="props">
      <q-td :props="props">
        <q-icon v-if="props.row.estado == null" name="block" color="negative" size="sm"></q-icon>
        <q-chip v-else
          :color="props.row.estado == 'CHEIO' ? 'positive' : props.row.estado == 'MEDIANO' ? 'warning' : 'negative'"
          text-color="white">
          {{
              props.row.estado
          }}</q-chip>
      </q-td>
    </template>
    <template v-slot:body-cell-nivel="props">
      <q-td :props="props">
        <q-icon v-if="props.row.nivel == null" name="block" color="negative" size="sm"></q-icon>
        <div class="text-weight-bold">{{ props.row.nivel }}</div>
      </q-td>
    </template>
  </q-table>
  <AdicionarMonitorDialog v-model="abrirAdicionarMonitorDialog" @adicionado="populaTabelaComNovoMonitor" />
  <EditarMonitorDialog v-model="abrirEditarMonitorDialog" :monitorAEditar="propsDeEdicao.monitor"
    :indice="propsDeEdicao.indice" @editado="alteraTabelaComMonitorEditado" />
  <DeletarMonitorDialog v-model="abrirDeletarMonitorDialog" :monitorADeletar="propsDeDelecao.monitor"
    :indice="propsDeDelecao.indice" @deleta="deletaMonitorDaTabela" />
  <DetalhesDoMonitorDialog v-model="abrirDetalhesDoMonitorDialog" :monitor="monitorClicado"></DetalhesDoMonitorDialog>
  <q-btn @click="abrirAdicionarMonitorDialog = !abrirAdicionarMonitorDialog" class="fixed-bottom-right q-mr-md q-mb-md"
    size="lg" round icon="add" color="primary">
  </q-btn>
</template>

<script>
import AdicionarMonitorDialog from "components/dialogs/AdicionarMonitorDialog.vue";
import EditarMonitorDialog from "components/dialogs/EditarMonitorDialog.vue"
import DeletarMonitorDialog from "components/dialogs/DeletarMonitorDialog.vue";
import DetalhesDoMonitorDialog from "components/dialogs/DetalhesDoMonitorDialog.vue";

import { GerenciadorDeRequisicoesDeMonitor } from "../../data/gerenciadorDeRequisicoesDeMonitor.js";

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

import Cookies from "js-cookie";

export default {
  name: "MonitoresTable",
  components: {
    AdicionarMonitorDialog,
    EditarMonitorDialog,
    DeletarMonitorDialog,
    DetalhesDoMonitorDialog
  },
  data: () => ({
    abrirAdicionarMonitorDialog: false,
    abrirEditarMonitorDialog: false,
    abrirDeletarMonitorDialog: false,
    propsDeEdicao: {
      indice: -1,
      monitor: null,
    },
    propsDeDelecao: {
      indice: -1,
      monitor: null,
    },

    monitorClicado: null,
    abrirDetalhesDoMonitorDialog: false,

    pagination: {
      rowsPerPage: 0
    },
    rows: [],
    columns: [
      {
        name: "nome", label: "NOME", align: "center", field: "nome"
      },
      {
        name: "ip", label: "IP", align: "center", field: "ip"
      },
      {
        name: "nivel", label: "NÍVEL (%)", align: "center", field: "nivel"
      },
      {
        name: "estado", label: "ESTADO", align: "center", field: "estado"
      },
      {
        name: "bombeando", label: "BOMBEANDO", align: "center", field: "bombeando"
      },
      {
        name: "acao", label: "AÇÃO", align: "center"
      }
    ],
  }),
  created() {
  },
  mounted() {
    this.verificaSeTemMonitoresEmCookie();
    this.atualizaTabelaComDadosDosMonitores();
  },
  methods: {
    async populaTabelaComNovoMonitor(novoMonitor) {
      this.rows.push(novoMonitor);
      this.atualizaTabelaComDadosDosMonitores();

      // Cookies.set("monitores", JSON.stringify(this.rows));
      await Storage.set({ key: "monitores", value: JSON.stringify(this.rows) });
    },
    async alteraTabelaComMonitorEditado(monitorEditado, indice) {
      this.rows[indice] = monitorEditado;
      this.atualizaTabelaComDadosDosMonitores();

      // Cookies.set("monitores", JSON.stringify(this.rows));
      await Storage.set({ key: "monitores", value: JSON.stringify(this.rows) });
    },
    async deletaMonitorDaTabela(indice) {
      this.rows.splice(indice, 1);
      this.atualizaTabelaComDadosDosMonitores();

      // Cookies.set("monitores", JSON.stringify(this.rows));
      await Storage.set({ key: "monitores", value: JSON.stringify(this.rows) });
    },
    preparaEAbreDialogDeEdicao(monitor, indice) {
      this.abrirDetalhesDoMonitorDialog = false;
      this.propsDeEdicao.monitor = monitor;
      this.propsDeEdicao.indice = indice;
      this.abrirEditarMonitorDialog = true;
    },
    preparaEAbreDialogDeDelecao(monitor, indice) {
      this.abrirDetalhesDoMonitorDialog = false;
      this.propsDeDelecao.monitor = monitor;
      this.propsDeDelecao.indice = indice;
      this.abrirDeletarMonitorDialog = true;
    },
    preparaEAbreDialogDeDetalhamento(evt, row, index) {
      console.log(row);
      this.monitorClicado = row;
      this.abrirDetalhesDoMonitorDialog = !this.abrirDetalhesDoMonitorDialog;

    },
    async verificaSeTemMonitoresEmCookie() {
      // let monitoresSalvos = Cookies.get("monitores");
      let monitoresSalvos = await Storage.get({ key: "monitores" });
      if (JSON.parse(monitoresSalvos.value) == null) return;
      this.rows = JSON.parse(monitoresSalvos.value);
    },
    async atualizaTabelaComDadosDosMonitores() {
      for (let monitor of this.rows) {
        monitor.nivel = await this.requisitaNivel(monitor.ip);
        monitor.estado = await this.requisitaEstado(monitor.ip);
        monitor.bombeando = await this.requisitaBombeando(monitor.ip);
      }
    },

    async requisitaNivel(ip) {
      let gerenciadorDeRequisicoesDeMonitor = new GerenciadorDeRequisicoesDeMonitor(ip);

      let respostaNivel = await gerenciadorDeRequisicoesDeMonitor.pegaNivel();
      if (respostaNivel.status == 200) {
        return respostaNivel.data;
      }
      else if (respostaNivel.status >= 400 && respostaNivel.status < 500) {
        return null;
      }
      else if (respostaNivel.status >= 500) {
        return null;
      }
    },

    async requisitaEstado(ip) {
      let gerenciadorDeRequisicoesDeMonitor = new GerenciadorDeRequisicoesDeMonitor(ip);

      let respostaEstado = await gerenciadorDeRequisicoesDeMonitor.pegaEstado();
      if (respostaEstado.status == 200) {
        return respostaEstado.data;
      }
      else if (respostaEstado.status >= 400 && respostaEstado.status < 500) {
        return null;
      }
      else if (respostaEstado.status >= 500) {
        return null;
      }
    },

    async requisitaBombeando(ip) {
      let gerenciadorDeRequisicoesDeMonitor = new GerenciadorDeRequisicoesDeMonitor(ip);

      let respostaBombeando = await gerenciadorDeRequisicoesDeMonitor.pegaBombeando();
      if (respostaBombeando.status == 200) {
        return respostaBombeando.data;
      }
      else if (respostaBombeando.status >= 400 && respostaBombeando.status < 500) {
        return null;
      }
      else if (respostaBombeando.status >= 500) {
        return null;
      }
    }
  },
}
</script>
