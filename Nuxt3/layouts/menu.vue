<!-- Please remove this file from your project -->
<template>
    <div>
        <nav :class="scrollPosition > 0 ? 'shadow' : ''"
            class="fixed p-2  w-full text-gray-600 dark:text-gray-200 flex items-center  z-50  transition-all rounded bg-white border">
            <div class="container flex flex-wrap justify-between items-center mx-auto ">
                <div class="flex items-start ml-3">
                    <div class="mx-1 cursor-pointer flex items-center rounded  p-1  font-extrabold text-black"
                        @click="router.push('/Home')">
                        <nuxt-img format="webp" sizes="sm:100vw md:50vw lg:400px" src="/favicon.ico" alt="Logo"
                            class="relative select-none w-10 h-10 z-10 m-auto rounded-full  pointer-events-none cursor-pointer " />
                    </div>

                    <div class="mx-1 block lg:hidden p-1">
                        <div v-if="counter.Userdata"
                            @click="(counter.menu ? counter.menu = false : counter.menu = true)"
                            class="relative select-none h-10  z-10  m-auto    cursor-pointer  rounded-lg transition-all">
                            <svg width="40" height="40" viewBox="0 0 16 16" class="justify-center inline-block">
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <path
                                        :d="counter.menu ? 'M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'
                                        : 'M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'"
                                        fill="currentColor"></path>
                                </g>
                            </svg>
                        </div>
                        <div v-else
                            class="relative select-none h-10 w-10 z-10  m-auto  rounded pointer-events-none bg-gray-200 animate-pulse ">

                        </div>
                    </div>
                </div>
                <div class="flex items-center"></div>
                <div class="flex items-end">
                    <div class="mx-1">
                        <Menu v-if="counter.Userdata" as="div" class="w-[80px] relative text-right">
                            <MenuButton>
                                <nuxt-img format="webp" sizes="sm:100vw md:50vw lg:400px"
                                    :provider="$unlock(counter.Userdata).IMG ? 'imagekit' : 'imgix'"
                                    :src="$unlock(counter.Userdata).IMG ? $unlock(counter.Userdata).IMG : '/user.png'"
                                    alt="Logo" @error="UserImgError()"
                                    class="relative select-none  z-10 w-[40px] h-[40px] m-auto  rounded-full pointer-events-none  " />
                            </MenuButton>
                            <transition enter-active-class="transition duration-100 ease-out"
                                enter-from-class="transform scale-95 opacity-0"
                                enter-to-class="transform scale-100 opacity-100"
                                leave-active-class="transition duration-75 ease-in"
                                leave-from-class="transform scale-100 opacity-100"
                                leave-to-class="transform scale-95 opacity-0">
                                <MenuItems
                                    class=" select-none absolute right-0 mt-2 w-[300px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div class="px-1 py-1">
                                        <MenuItem v-slot="{ active }">
                                        <button @click="(router.push('/Profile'), counter.menu = false)" :class="[
                                            active ? 'bg-gray-100 ' : 'text-gray-700',
                                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                        ]">
                                            <div class="flex items-center text-left">
                                                <nuxt-img format="webp" sizes="sm:100vw md:50vw lg:400px"
                                                    v-if="counter.Userdata"
                                                    :provider="$unlock(counter.Userdata).IMG ? 'imagekit' : 'imgix'"
                                                    :src="$unlock(counter.Userdata).IMG ? $unlock(counter.Userdata).IMG : '/user.png'"
                                                    alt="Logo"
                                                    class="relative select-none  z-10 w-[40px] h-[40px] m-auto  rounded-full pointer-events-none " />
                                                <span v-if="counter.Userdata"
                                                    class="ml-2 font-semibold text-base text-gray-600 break-all truncate w-[220px]">{{
                                                            ($unlock(counter.Userdata).NAME)
                                                    }}</span>
                                            </div>
                                        </button>
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                        <button @click="logout()" :class="[
                                            active ? 'bg-gray-100 ' : 'text-gray-700',
                                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                        ]">

                                            <div class=" flex items-center">
                                                <div v-if="counter.Userdata"
                                                    class="relative select-none h-8  z-8  m-auto  cursor-pointer text-gray-600  rounded-lg">
                                                    <svg width="32" height="32" viewBox="0 0 16 16"
                                                        class="justify-center inline-block">
                                                        <g stroke="none" stroke-width="1" fill="none"
                                                            fill-rule="evenodd">
                                                            <path
                                                                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                                                                fill="currentColor"></path>
                                                            <path
                                                                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                                                                fill="currentColor"></path>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <span v-if="counter.Userdata" class="ml-2   text-base">ออกจากระบบ</span>

                                            </div>
                                        </button>
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </transition>
                        </Menu>
                        <div v-else
                            class="relative select-none w-[40px] h-[40px] z-10  m-auto  rounded-full pointer-events-none bg-gray-200 animate-pulse ">
                        </div>

                    </div>
                </div>
            </div>
        </nav>

        <div style="z-index: 100" class="max-w-8xl mx-auto px-4 " v-if="counter.Userdata">
            <!-- 
            <div :class="
    counter.menu == true
        ? ''
        : 'hidden lg:block '
            "
                class="rounded w-full no-scrollbar pt-1 dark:bg-gray-900 bg-white dark:text-gray-200 fixed z-20 inset-0 top-[3.0rem]  right-auto lg:w-[20rem] pb-20 px-2 overflow-y-auto">
                <nav id="nav" class=" select-none lg:text-sm lg:leading-6 relative mt-6 " style="z-index: 80">
                    MUNU
                </nav>
            </div>
 -->
            <div class="">
                <div class="pt-20 ">
                    <div class="mb-16 md:mb-2 md:mt-0 mt-4 ">
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import CryptoJS from "crypto-js";
import { useCounterStore } from '@/stores/counter'
const { $swal, $io, $unlock, $lock } = useNuxtApp();
const router = useRouter();
const config = useRuntimeConfig();
const counter = useCounterStore();
const route = useRoute()
const user = useCookie('user', {
    maxAge: 604800,
});
const No = ref()
const scrollPosition = ref();
const logout = () => {
    user.value = null
    counter.Userdata = ""
    router.replace({ path: "/" });
}
const updateScroll = () => {
    scrollPosition.value = window.scrollY;
}
const menuclose = () => {
    setTimeout(() => {
        counter.menu = false
    }, 300);
}
const UserImgError = () => {
    let Datauser = $unlock(counter.Userdata);
    Datauser.IMG = '/user.png';
    counter.Userdata = $lock(Datauser);
    user.value = $lock(Datauser);
}
const path = route.fullPath;
onMounted(() => {
    $io.on("EditNameGet", (res) => {
        let Datauser = $unlock(counter.Userdata);
        Datauser.NAME = res
        counter.Userdata = $lock(Datauser);
        user.value = $lock(Datauser);
    });
    $io.on("EditIMGGet", (res) => {
        let Datauser = $unlock(counter.Userdata);
        Datauser.IMG = res;
        counter.Userdata = $lock(Datauser);
        user.value = $lock(Datauser);
    });
    $io.on("EditPasswordGet", (res) => {
        user.value = counter.Userdata
        setTimeout(() => {
            counter.login().then((res) => {
            }).catch((error) => {
                route.name != 'Home' ? router.replace(`/?r=${path}`) : router.replace(`/`);
            })
        }, 1000);
    });
    $io.on("Checkuser", (res) => {
        counter.login().then((res) => {
        }).catch((error) => {
            route.name != 'Home' ? router.replace(`/?r=${path}`) : router.replace(`/`);
        })
    });
    if (user.value) {
        counter.login().then((res) => {
            $io.emit("join", $unlock(counter.Userdata).No);
            No.value = $unlock(counter.Userdata).No
        }).catch((error) => {
            route.name != 'Home' ? router.replace(`/?r=${path}`) : router.replace(`/`);
        })
    } else {
        route.name != 'Home' ? router.replace(`/?r=${path}`) : router.replace(`/`);
    }
    scrollPosition.value = window.scrollY;
    window.addEventListener("scroll", updateScroll);
})


onBeforeUnmount(() => {
    window.removeEventListener("scroll", updateScroll);
    $io.emit("logout", No.value)
    $io.off("EditNameGet");
    $io.off("EditIMGGet");
    $io.off("EditPasswordGet");
    $io.off("Checkuser");
})
</script>
