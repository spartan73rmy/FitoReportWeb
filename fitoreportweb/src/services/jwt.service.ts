import {
  getSavedState,
  saveState,
  removeState
} from "@/services/local-storage.service";
const ID_TOKEN_KEY = "auth.token";

export const getToken = (): string => {
  return getSavedState(ID_TOKEN_KEY);
};

export const saveToken = (token: string) => {
  saveState(ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
  removeState(ID_TOKEN_KEY);
};

export default { getToken, saveToken, destroyToken };
