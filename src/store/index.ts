import {
  createStore,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  createLogger,
} from "vuex";
import { State, state } from "./state";
import { Mutations, mutations } from "./mutations";
import { Actions, actions } from "./actions";
import { Getters, getters } from "./getters";
export const store = createStore<State>({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
  modules: {},

  plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
});

export function useStore(): Store {
  return store as Store;
}

export type Store = Omit<VuexStore<State>, "getters" | "commit" | "dispath"> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    option?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};