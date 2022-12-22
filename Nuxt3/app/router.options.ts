import { RouterConfig } from "@nuxt/schema";
import { useCounterStore } from "@/stores/counter";

if (process.client) {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "auto";
    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener("beforeunload", () => {
      window.history.scrollRestoration = "auto";
      localStorage.setItem(
        "barreset",
        JSON.stringify({
          name: window.location.pathname,
          bar: { left: window.pageXOffset, top: window.pageYOffset },
        })
      );

      /*
      localStorage.setItem('scrollpos2',window.scrollY)
      */
    });
    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener("load", () => {
      window.history.scrollRestoration = "auto";

      /*
      var scrollpos = localStorage.getItem('scrollpos2');
      if(scrollpos){
              window.scrollTo(0,scrollpos)
      }
      */
    });
  }
}
// https://router.vuejs.org/api/#routeroptions

export default <RouterConfig>{
  scrollBehavior: (to, from, savedPosition) => {
    const counter = useCounterStore();
    let position;

    position = savedPosition || { left: 0, top: 0 };
   
    // scroll to hash, useful for using to="#some-id" in NuxtLink
    // ex: <NuxtLink to="#top"> To Top </ NuxtLink>
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }

    // The remainder is optional but maybe useful as well

    // if link is to same page, scroll to top with smooth behavior
    if (to === from) {
      return {
        left: 0,
        top: 0,
        behavior: "smooth",
      };
    }

    // this will use saved scroll position on browser forward/back navigation
    return new Promise((resolve) => {
      resolve(position);
      counter.bar = position;
    });
  },
};
