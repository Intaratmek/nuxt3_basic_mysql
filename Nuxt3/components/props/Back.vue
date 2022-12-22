<!-- Please remove this file from your project -->
<template>
  <div :class="scrollPosition > 0 ? 'shadow' : ''"
    class="fixed p-2  w-full text-gray-600 dark:text-gray-200 flex items-center bg-white z-50 transition-all rounded">

    <div class="ml-1 max-w-fit cursor-pointer hover:bg-gray-200 p-2 rounded-full "
      @click="(hasHistory() ? $router.go(-1) : $router.push('/'))">
      <svg width="30" height="30" viewBox="0 0 16 16" class="justify-center inline-block">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <path
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            fill="currentColor"></path>
        </g>
      </svg>
    </div>

    <div class="ml-2"><span class="font-semibold text-xl">{{ props.title }}</span></div>


  </div>


</template>


<script setup lang="ts">
const props = defineProps(['title'])
const scrollPosition = ref();
const hasHistory = () => { return window.history.length > 2 }

const updateScroll = () => {
  scrollPosition.value = window.scrollY;
}

onMounted(() => {
  scrollPosition.value = window.scrollY;
  window.addEventListener("scroll", updateScroll);
})
onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateScroll);
})
</script>
