<template>

  <Profile />
</template>


<script setup >

definePageMeta({
  layout: "menu",
  middleware: ["auth"],
})
useHead({
  title: "Nuxt3 Basic | Profile",
  meta: [
    // hid is used as unique identifier. Do not use `vmid` for it as it will not work
    {
      hid: "Nuxt3 Basic | Profile",
      name: "Nuxt3 Basic | Profile",
      content: "Nuxt3 Basic | Profile",
    },
  ],
})
</script>
