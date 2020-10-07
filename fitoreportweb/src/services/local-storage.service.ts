export const getSavedState = function(key: string) {
  const item = window.localStorage.getItem(key);
  if (item !== null && item !== undefined) {
    return JSON.parse(item);
  } else {
    return null;
  }
};

export const saveState = function(key: string, state: any) {
  if (state === undefined) {
    throw "No se puede guardar 'undefined' como estado para " + key;
  }
  window.localStorage.setItem(key, JSON.stringify(state));
};

export const removeState = function(key: string) {
  window.localStorage.removeItem(key);
};

export default { getSavedState, saveState, removeState };
