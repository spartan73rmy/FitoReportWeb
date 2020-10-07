export const required = (v: string) => !!v || "El campo es requerido";

export const email = (v: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(v) || "No es un email valido";
};

export const minLength = (n: number) => (v: string) =>
  v.length < n || "El campo debe ser menor a " + n + " caracteres";

export const maxLength = (n: number) => (v: string) =>
  v.length <= n || "El campo debe ser menor a " + n + " caracteres";

export const between = (a: number, b: number) => (v: string) =>
  (v.length < b && v.length >= a) ||
  `El campo debe estar entre ${a} y ${b} caracteres`;

export const equalTo = (a: any) => (v: any) =>
  a === v || `El campo debe coincidir`;

export const lessThanOrEqual = (a: any) => (v: any) =>
  a >= v || `El campo debe ser menor o igual`;

export const lessThan = (a: any) => (v: any) =>
  a > v || `El campo debe ser menor`;

export const greaterThan = (a: any) => (v: any) =>
  a < v || `El campo debe ser mayor`;

export const integer = (v: string) => {
  const r = parseInt(v);
  if (isNaN(r)) return "No es un numero";
  const re = /^-?\d+$/g;
  return (r === parseFloat(v) && re.test(v)) || "No es un numero entero";
};

export default {
  email,
  required,
  minLength,
  maxLength,
  between,
  equalTo,
  lessThanOrEqual,
  lessThan,
  greaterThan,
  integer
};
