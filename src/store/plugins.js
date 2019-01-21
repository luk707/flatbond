import createLogger from "vuex/dist/logger";
import { STORAGE_KEY } from "./mutations";

const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  });
};

export default (process.env.NODE_ENV !== "production"
  ? [createLogger(), localStoragePlugin]
  : [localStoragePlugin]);
