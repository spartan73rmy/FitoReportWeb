import store from "@/store";
import { LOGOUT_ACTION } from "@/store/action-types";
import { ERROR, MESSAGE } from "@/store/mutation-types";
import { AxiosError } from "axios";

interface ResponseError {
  error: string;
  details: object;
}

export interface ResponseException extends AxiosError<ResponseError> {
  a: null;
}

const showError = (message: string, commit: any) => {
  setTimeout(() => {
    return commit("alert/" + ERROR, message, { root: true });
  }, 100);
};

// Catches error connection or any other error (checks if error.response exists)
export const handleError = (error: Error, commit: any) => {
  const aErr = error as ResponseException;
  if (aErr.response) {
    switch (aErr.response.status) {
      // BadRequest
      case 400:
        break;
      // No autorizado
      case 401:
        store.dispatch("cuenta/" + LOGOUT_ACTION);
        break;
      // Forbidden
      case 403:
        break;
      // Not found
      case 404:
        break;
      // Internal server error
      case 500:
        break;
    }
    showError(aErr.response.data.error ?? "Error desconocido", commit);
    throw error;
  } else {
    // Cuando se cancela la subida de un archivo
    if (error.message !== "file") showError("Comprueba tu conexion", commit);
    throw error;
  }
};
export const buildSuccess = (data: any, commit: any) => {
  setTimeout(() => {
    let msg = "";
    if (data && data.notificationMessage) msg = data.notificationMessage;
    return msg ? commit("alert/" + MESSAGE, msg, { root: true }) : true;
  }, 0);
  return data;
};
