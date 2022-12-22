export default defineNuxtRouteMiddleware((to, from) => {
  const route = useRoute();
  const user = useCookie("user");
  const path = route.fullPath;
  if (process.client) {
    if (user.value) {
    } else {
      return route.name != "Home" ? navigateTo(`/?r=${path}`) : navigateTo(`/`);
    }
  }
});
