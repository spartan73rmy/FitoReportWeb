<template>
  <div>
    <h1>AGROQUIMICOS "GUERRERO"</h1>
    <h3>ING. ELVIN MISAEL GALVAN GUERRERO</h3>
    <h5>
      LIC. ANTONIO CASTRO NO.9 COL SANTA ROSA C.P. 60360 LOS REYES DE SALGADO,
      MICH
    </h5>
    <h2><b>REPORTE FITOSANITARIO</b></h2>

    <table style="width: 100%">
      <tr>
        <td>Lugar y Fecha:{{ report.lugar }}</td>
      </tr>
      <tr>
        <td>Nombre del produtor:{{ report.productor }}</td>
      </tr>
      <tr>
        <td>Ubicacion:{{ report.ubicacion }}</td>
      </tr>
      <tr>
        <td>Nombre del predio:{{ report.predio }}</td>
      </tr>
      <tr>
        <td>Cultivo:{{ report.cultivo }}</td>
      </tr>
      <tr>
        <td>Etapa Fenologica:{{ report.etapaFenologica }}</td>
      </tr>
      <tr>
        <td>Enfermedades:{{ e }}</td>
      </tr>
      <tr>
        <td>Plagas:{{ p }}</td>
      </tr>
    </table>

    <br />
    <table>
      <tr>
        <td>Observaciones:{{ report.observaciones }}</td>
      </tr>
    </table>

    <br />
    <br />

    <h2>Aspersión Foliar</h2>
    <p style="text-align: left">
      RECOMENDACION: Para cada ( {{ report.litros }} ) Litros de agua
    </p>
    <b-table
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      sort-icon-left
      responsive="sm"
    ></b-table>

    <br /><br />
    <h3>ELVIN MISAEL GALVAN GUERRERO</h3>
    <h4>Ingeniero Agronomo Fruticultor</h4>
    <img
      style="float: right"
      width="200"
      height="200"
      src="https://borealtech.com/wp-content/uploads/2018/10/codigo-qr-1024x1024.jpg"
      alt="web-img"
    />
    <p><b>No. De CEDULA:</b></p>

    <p>
      <b>354 110 2486</b>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { reporteClient } from "@/services/api/api.service";
import { GetReporteResponse, ProductoDTO2 } from "@/services/api/api";
import { forIn } from "lodash";

export default Vue.extend({
  name: "Details",
  components: {},
  data: function() {
    return {
      snackbar: true,
      p: "",
      e: "",
      report: {} as GetReporteResponse,
      sortBy: "nombre",
      sortDesc: false,
      fields: [
        { label: "Cantidad", key: "cantidad", sortable: true },
        { label: "Producto", key: "nombre", sortable: true },
        {
          label: "Ingrediente Activo",
          key: "ingredienteActivo",
          sortable: true,
        },
        { label: "Concentracion", key: "concentracion", sortable: true },
        {
          label: "Intervalo de seguridad",
          key: "intervaloSeguridad",
          sortable: true,
        },
      ],
      items: [] as ProductoDTO2[],
    };
  },
  computed: {
    isLoading(): boolean {
      return !this.report.idReport;
    },
  },
  methods: {
    async fetchData() {
      if (this.$route.params.id) {
        const idReport = parseInt(this.$route.params.id);
        await reporteClient.get(idReport).then((reporte) => {
          this.report = reporte;
          if (reporte.productos) this.items = reporte.productos;
          if (reporte.plagas)
            this.p = reporte.plagas.map((o) => o.nombre).join(", ");
          if (reporte.enfermedades)
            this.e = reporte.enfermedades.map((o) => o.nombre).join(", ");
        });
      }
    },
  },

  mounted(): void {
    this.fetchData();
  },
});
</script>
