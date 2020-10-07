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
        <!-- <td>Lugar y Fecha:{{ this.report.idReport }}</td> -->
      </tr>
      <tr>
        <td>Nombre del produtor:{{ report.produtor }}</td>
      </tr>
      <tr>
        <td>Ubicacion:{{ report.Ubicacion }}</td>
      </tr>
      <tr>
        <td>Nombre del predio:{{ report.predio }}</td>
      </tr>
      <tr>
        <td>Cultivo:{{ report.Cultivo }}</td>
      </tr>
      <tr>
        <td>Etapa Fenologica:{{ report.Etapa }}</td>
      </tr>
      <tr>
        <td>Enfermedades:</td>
      </tr>
      <tr>
        <td>Plagas:</td>
      </tr>
    </table>

    <br />
    <table>
      <tr>
        <td>Observaciones:{{ report.Observaciones }}</td>
      </tr>
    </table>

    <br />
    <br />

    <h2>Aspersión Foliar</h2>
    <p style="text-align: left">
      RECOMENDACION: Para cada ( {{ report.Litros }} ) Litros de agua
    </p>

    <table style="width: 100%">
      <tr>
        <th>Cantidad</th>
        <th>Producto</th>
        <th>Ingrediente Activo</th>
        <th>Concentracion %</th>
        <th>Intervalo de Seguridad</th>
      </tr>
      <tr>
        <td>100</td>
        <td>Cal</td>
        <td>Calcio</td>
        <td>80%</td>
        <td>0 Dias</td>
      </tr>
    </table>

    <br /><br />
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
    <br /><br /><br />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { reporteClient } from "@/services/api/api.service";
import { GetReporteResponse } from "@/services/api/api";

export default Vue.extend({
  name: "Detalles",
  data: function() {
    return {
      report: {} as GetReporteResponse
    };
  },
  computed: {
    isLoading(): boolean {
      return !this.report.idReport;
    }
  },
  methods: {
    async fetchData() {
      await reporteClient.get(1).then(reporte => {
        this.report = reporte;
      });
    }
  },

  mounted(): void {
    this.fetchData();
  }
});
</script>
