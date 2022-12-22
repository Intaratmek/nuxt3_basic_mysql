<template>

  <Home />
</template>


<script setup >

definePageMeta({
  layout: "menu",
  middleware: ["auth"],
})
useHead({
  title: "Nuxt3 Basic | หน้าแรก",
  meta: [
    // hid is used as unique identifier. Do not use `vmid` for it as it will not work
    {
      hid: "Nuxt3 Basic | หน้าแรก",
      name: "Nuxt3 Basic | หน้าแรก",
      content: "Nuxt3 Basic | หน้าแรก",
    },
  ],
})
</script>
