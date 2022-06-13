<template>
  <q-dialog>
    <q-card class="full-width">
      <q-card-section>
        <div class="row fit items-center">
          <div class="text-h5">Monitor: <span class="text-weight-bold">{{ monitor.nome }}</span></div>
          <q-space></q-space>
          <div>
            <q-toggle v-model="trava" checked-icon="lock" unchecked-icon="lock_open" color="negative">

            </q-toggle>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section>
          <div :class="'text-h2 text-weight-bolder ' + 'text-' + corDoNivel">{{ monitor.nivel }}%</div>
        </q-card-section>
        <q-separator vertical />
        <q-card-section>
          <div clas="text-body1"><span class="text-weight-bold">IP: </span>{{ monitor.ip }}</div>
          <div clas="text-body1"><span class="text-weight-bold">ESTADO: </span>{{ monitor.estado }}</div>
          <div clas="text-body1"><span class="text-weight-bold">BOMBEANDO: </span>{{ monitor.bombeando }}</div>
        </q-card-section>
      </q-card-section>
      <q-card-section>
        <q-linear-progress stripe rounded size="xl" :value="monitor.nivel / 100" color="primary" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "DetalhesDoMonitorDialog",
  setup() {

  },
  props: {
    monitor: Object,
  },
  data: () => ({
    trava: false,
  }),
  computed: {
    corDoNivel() {
      if (this.monitor.estado == "CHEIO") return "positive";
      else if (this.monitor.estado == "MEDIANO") return "warning";
      else return "negative";
    }
  },
}
</script>
