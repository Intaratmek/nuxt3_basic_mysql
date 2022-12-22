// stores/counter.js
import { acceptHMRUpdate, defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => {
    return { Userdata: "", menu: false, bar: "" };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async login() {
      await $fetch(`${useRuntimeConfig().public.server}/api/Auth`, {
        method: "POST",
        body: {
          data: useCookie("user", {
            maxAge: 604800,
          }).value,
        },
      })
        .then((res) => {
          let { data, Status } = res;
          if (Status == 1) {
            this.Userdata = data;
            useCookie("user", {
              maxAge: 604800,
            }).value = data;
          } else {
            this.Userdata = "";
            useCookie("user").value = null;
            throw Status;
          }
        })
        .catch((error) => {
          throw error;
        });
    },
  },
});
