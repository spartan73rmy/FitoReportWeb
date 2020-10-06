export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://fitoreport.com" //TODO add URL
    : "https://localhost:5001";
import * as Api from "@/services/api/api";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
});
export const cuentaClient = new Api.CuentaClient(baseUrl, axiosInstance);
export const archivoClient = new Api.ArchivosClient(baseUrl, axiosInstance);
export const usuarioClient = new Api.UsuariosClient(baseUrl, axiosInstance);
export const reporteClient = new Api.ReporteClient(baseUrl, axiosInstance);
export const plagaClient = new Api.PlagaClient(baseUrl, axiosInstance);
export const etapaClient = new Api.EtapaFenologicaClient(
  baseUrl,
  axiosInstance
);
export const enfermedadClient = new Api.EnfermedadClient(
  baseUrl,
  axiosInstance
);

export default {
  cuentaClient,
  archivoClient,
  usuarioClient,
  reporteClient,
  plagaClient,
  enfermedadClient,
  etapaClient,
  axios,
};
