import Vue from "vue";
export type VForm = Vue & {
  validate: () => boolean;
  reset: () => void;
  resetValidation: () => void;
};
