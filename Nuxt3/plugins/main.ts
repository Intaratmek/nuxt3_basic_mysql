import Swal from "sweetalert2";
import CryptoJS from "crypto-js";
import io from "socket.io-client";
import { useCounterStore } from "@/stores/counter";
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const counter = useCounterStore();

  const unlock = (data) => {
    try {
      var key = config.public.key;
      key = key.substr(7);
      var str = data;
      var encrypted = str;
      var encrypted_json = JSON.parse(atob(encrypted));
      var decrypted = CryptoJS.AES.decrypt(
        encrypted_json.value,
        CryptoJS.enc.Base64.parse(key),
        {
          iv: CryptoJS.enc.Base64.parse(encrypted_json.iv),
        }
      ).toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (error) {
      return 0;
    }
  };

  const lock = (data) => {
    try {
      let iv = CryptoJS.lib.WordArray.random(16),
        key = CryptoJS.enc.Base64.parse(config.public.key.substr(7));
      let options = {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      };
      let encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, options);
      encrypted = encrypted.toString();
      iv = CryptoJS.enc.Base64.stringify(iv);
      let result = {
        iv: iv,
        value: encrypted,
        mac: CryptoJS.HmacSHA256(iv + encrypted, key).toString(),
      };
      result = JSON.stringify(result);
      result = CryptoJS.enc.Utf8.parse(result);
      var data = CryptoJS.enc.Base64.stringify(result);
      return data;
    } catch (error) {
      return 0;
    }
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const reloadber = () => {
    if (counter.bar != { left: 0, top: 0 }) {
      setTimeout(() => {
        window.scrollTo(counter.bar.left, counter.bar.top);
        counter.bar = { left: 0, top: 0 };
      }, 1);
    }
    try {
      if (localStorage.getItem("barreset")) {
        if (
          window.location.pathname ==
          JSON.parse(localStorage.getItem("barreset")).name
        ) {
          setTimeout(() => {
            window.scrollTo(
              JSON.parse(localStorage.getItem("barreset")).bar.left,
              JSON.parse(localStorage.getItem("barreset")).bar.top
            );
            localStorage.removeItem("barreset");
          }, 100);
        }
      }
    } catch (error) {
      return 0;
    }
  };
  const comma = (number) => {
 
    return Number(number).toLocaleString();
  };
  const socket = io(`${config.public.portio}`);
  socket.on("connect", function () {
    console.log(`Connected to server`);
  });
  socket.on("disconnect", function () {
    console.log(`Disconnect to server`);
  });
  nuxtApp.provide("io", socket);
  nuxtApp.provide("swal", Swal);

  nuxtApp.provide("Toast", Toast);
  nuxtApp.provide("unlock", (data) => unlock(data));
  nuxtApp.provide("lock", (data) => lock(data));
  nuxtApp.provide("reloadber", () => reloadber());
  nuxtApp.provide("comma", (data) => comma(data));
});
