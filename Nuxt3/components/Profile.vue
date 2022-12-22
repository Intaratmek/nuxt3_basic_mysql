<!-- Please remove this file from your project -->
<template>
    <div>
        <div class="p-2  rounded-lg block text-center" style="text-align: -webkit-center;">
            <span>โปรไฟล์</span>
            <div class=" relative m-auto my-2">
                <nuxt-img format="webp" sizes="sm:100vw md:50vw lg:400px" provider="imagekit"
                    :src="$unlock(counter.Userdata).IMG ? $unlock(counter.Userdata).IMG : '/user.png'" alt="Logo"
                    class="relative select-none h-56 w-[224px] z-10  m-auto  rounded-full pointer-events-none " />
            </div>
            <div
                class="p-2 font-semibold text-xl text-gray-600 bg-gray-200  max-w-full w-max rounded-md mx-auto my-2 break-all truncate">
                {{ $unlock(counter.Userdata).NAME }}
            </div>

        </div>

        <div class="w-full max-w-md px-2 pb-16 sm:px-0 items-center m-auto">

            <TabGroup :selectedIndex="indexOn">
                <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    <Tab as="template" v-slot="{ selected }" @click="router.push({ query: {} })">
                        <button :class="[
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                            'ring-white/0 ring-opacity-60/0 ring-offset-2 ring-offset-blue-400/0   focus:outline-none focus:ring-2',
                            selected
                                ? 'bg-white shadow'
                                : 'text-gray-500 hover:bg-white/[0.12] hover:text-white',
                        ]">
                            ประวัติการล็อคอิน
                        </button>
                    </Tab>
                    <Tab as="template" v-slot="{ selected }" @click="router.push({ query: { 'tab': '1' } })">
                        <button :class="[
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                            'ring-white/0 ring-opacity-60/0 ring-offset-2 ring-offset-blue-400/0   focus:outline-none focus:ring-2',
                            selected
                                ? 'bg-white shadow'
                                : 'text-gray-500 hover:bg-white/[0.12] hover:text-white',
                        ]">
                            การตั้งค่า
                        </button>
                    </Tab>

                </TabList>

                <TabPanels class="mt-2">
                    <TabPanel :class="[
                        'rounded-xl bg-white p-3 ',
                        'ring-white/0 ring-opacity-0 ring-offset-2 ring-offset-blue-400/0 focus:outline-none focus:ring-2',
                    ]">

                    </TabPanel>
                    <TabPanel :class="[
                        'rounded-xl bg-white p-3 ',
                        'ring-white/0 ring-opacity-0 ring-offset-2 ring-offset-blue-400/0 focus:outline-none focus:ring-2',
                    ]">
                        <ul>
                            <li class="relative rounded-md p-3 hover:bg-gray-200 bg-gray-100 my-2 cursor-pointer"
                                @click="openModal2">
                                <div class="flex items-center text-left">
                                    <div class="min-w-[36px] min-h-[36px]">
                                        <nuxt-img format="webp" sizes="sm:100vw md:50vw lg:400px" src="/img.png"
                                            alt="Logo"
                                            class="relative select-none h-9 w-9 z-10  rounded-md pointer-events-none " />
                                    </div>
                                    <span class="ml-2 text-sm font-medium text-gray-600 break-all truncate w-[220px]">
                                        แก้ไขรูปภาพ
                                    </span>
                                </div>
                            </li>
                            <li class="relative rounded-md p-3 hover:bg-gray-200 bg-gray-100 my-2 cursor-pointer"
                                @click="openModal">
                                <div class="flex items-center text-left">
                                    <div class="min-w-[36px] min-h-[36px]">
                                        <nuxt-img format="webp" sizes="sm:100vw md:50vw lg:400px" src="/name.png"
                                            alt="Logo"
                                            class="relative select-none h-9 w-9 z-10  rounded-md pointer-events-none " />
                                    </div>
                                    <span class="ml-2 text-sm font-medium text-gray-600 break-all truncate w-[220px]">
                                        แก้ไขชื่อ
                                    </span>
                                </div>
                            </li>

                            <li class="relative rounded-md p-3 hover:bg-gray-200 bg-gray-100 my-2 cursor-pointer"
                                @click="openModal3">
                                <div class="flex items-center text-left">
                                    <div class="min-w-[36px] min-h-[36px]">
                                        <nuxt-img format="webp" sizes="sm:100vw md:50vw lg:400px" src="/padlock.png"
                                            alt="Logo"
                                            class="relative select-none h-9 w-9 z-10  rounded-md pointer-events-none " />
                                    </div>
                                    <span class="ml-2 text-sm font-medium text-gray-600 break-all truncate w-[220px]">
                                        เปลี่ยนรหัสผ่าน
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </TabPanel>

                </TabPanels>
            </TabGroup>
        </div>
        <TransitionRoot appear :show="isOpen" as="template">
            <Dialog as="div" @close="closeModal" class="relative z-[100]">
                <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
                    enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>
                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                            <DialogPanel
                                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                    แก้ไขชื่อ
                                </DialogTitle>
                                <form @submit.prevent="EditName()">
                                    <div class="mt-2">
                                        <input v-model="Namedata" autocomplete="off" type="text" name="name" id="name"
                                            :placeholder="$unlock(counter.Userdata).NAME"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            required />
                                    </div>

                                    <div class="mt-4 text-center">
                                        <button type="submit"
                                            class="mx-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                            แก้ไข </button>
                                        <button type="button"
                                            class="mx-2 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                            @click="closeModal(), Namedata = ''">
                                            ยกเลิก
                                        </button>
                                    </div>
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

        <TransitionRoot appear :show="isOpen2" as="template">
            <Dialog as="div" @close="closeModal2" class="relative z-[100]">
                <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
                    enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>
                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                            <DialogPanel
                                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                    แก้ไขรูปภาพ
                                </DialogTitle>
                                <div class="relative m-auto my-2  flex cursor-pointer" @click="$refs.inputFile.click()">
                                    <nuxt-img format="webp" sizes="sm:100vw md:50vw lg:400px" provider="imagekit"
                                        :src="image ? image : $unlock(counter.Userdata).IMG ? $unlock(counter.Userdata).IMG : '/user.png'"
                                        alt="Logo"
                                        class="relative select-none h-56 w-[224px] z-10  m-auto rounded-full  " />
                                </div>

                                <div class="mt-4 text-center">
                                    <div v-if="image && image != $unlock(counter.Userdata).IMG">
                                        <button type="button" @click="EditImg()"
                                            class="mx-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                            แก้ไข </button>
                                        <button type="button"
                                            class="mx-2 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                            @click="closeModal2(), image = $unlock(counter.Userdata).IMG ? $unlock(counter.Userdata).IMG : '/user.png'">
                                            ยกเลิก
                                        </button>
                                    </div>
                                    <span class="text-gray-500 text-xs" v-else>คลิกที่รูปเพื่อทำการอัพโหลดรูปภาพ</span>

                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

        <TransitionRoot appear :show="isOpen3" as="template">
            <Dialog as="div" @close="closeModal3" class="relative z-[100]">
                <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
                    enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>
                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                            <DialogPanel
                                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                    เปลี่ยนรหัสผ่าน
                                </DialogTitle>
                                <form @submit.prevent="EditPassword()">
                                    <div class="mt-2">
                                        <label for="name2"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">รหัสผ่านเดิม</label>
                                        <input v-model="Passwrod.Password1" autocomplete="off" type="password"
                                            id="name2" placeholder="รหัสผ่านเดิม"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            required />
                                    </div>
                                    <div class="mt-2">
                                        <label for="password"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">รหัสผ่านใหม่</label>
                                        <input v-model="Passwrod.Password2" autocomplete="off" type="password"
                                            id="password" placeholder=" รหัสผ่านใหม่"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            required />
                                    </div>
                                    <div class="mt-2">
                                        <label for="password2"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">รหัสผ่านใหม่อีกครั้ง</label>
                                        <input v-model="Passwrod.Password2_2" autocomplete="off" type="password"
                                            id="password2" placeholder="รหัสผ่านใหม่อีกครั้ง"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            required />
                                    </div>

                                    <div class="mt-4 text-center">
                                        <button type="submit"
                                            class="mx-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                            แก้ไข </button>
                                        <button type="button"
                                            class="mx-2 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                            @click="closeModal3(), Passwrod.Password1 = '', Passwrod.Password2 = '', Passwrod.Password2_2 = ''">
                                            ยกเลิก
                                        </button>
                                    </div>

                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

        <input @change="imgview" type="file" style="display: none" ref="inputFile" />
    </div>
</template>

<script setup>
import {
    TabGroup, TabList, Tab, TabPanels, TabPanel, TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'

import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore();
const { $io, $unlock, $swal, $Toast, $lock } = useNuxtApp();
const config = useRuntimeConfig();
const router = useRouter();
const route = useRoute()
const indexOn = ref(route.query.tab ? 1 : 0);
const isOpen = ref(false)
const isOpen2 = ref(false)
const isOpen3 = ref(false)
const Namedata = ref('')
const image = ref('')
const Passwrod = ref({ Password1: '', Password2: '', Password2_2: '' })
const user = useCookie('user', {
    maxAge: 604800,
});
const inputFile = ref(null);
//*** Function */
const closeModal = () => {
    isOpen.value = false
}
const openModal = () => {
    isOpen.value = true
}

const closeModal2 = () => {
    isOpen2.value = false
}
const openModal2 = () => {
    isOpen2.value = true
}
const closeModal3 = () => {
    isOpen3.value = false
}
const openModal3 = () => {
    isOpen3.value = true
}

const imgview = (e) => {
    var files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
    } else {
        if (files[0].type == "image/jpeg" || files[0].type == "image/png") {
            var reader = new FileReader();
            reader.onload = (e) => {
                image.value = e.target.result;

            };
            reader.readAsDataURL(files[0]);
        } else {
            $Toast.fire({
                icon: 'error',
                title: 'กรุณาตรวจสอบไฟล์'
            })
            inputFile._value.value = null;
        }
    }
}

const bar = () => {
    if (counter.bar != { left: 0, top: 0 }) {
        setTimeout(() => {
            window.scrollTo(
                counter.bar.left,
                counter.bar.top
            );
            counter.bar = { left: 0, top: 0 }
        }, 1);
    }
    try {
        if (localStorage.getItem("barreset")) {
            if (window.location.pathname == JSON.parse(localStorage.getItem("barreset")).name) {
                setTimeout(() => {
                    window.scrollTo(
                        JSON.parse(localStorage.getItem("barreset")).bar.left,
                        JSON.parse(localStorage.getItem("barreset")).bar.top
                    );
                    localStorage.clear();
                }, 100);
            }
        }
    } catch (error) {

        return 0;
    }
}

const EditName = async () => {
    if ($unlock(counter.Userdata).NAME != Namedata.value) {
        await $fetch(`${config.public.server}/api/EditName`, {
            method: 'POST',
            body: {
                No: $unlock(counter.Userdata).No,
                Name: Namedata.value,
            }
        })
            .then((res) => {
                let { Status } = res
                if (Status == '1') {
                    $io.emit("EditName", { No: $unlock(counter.Userdata).No, data: Namedata.value }).then
                    isOpen.value = false
                    Namedata.value = '';
                    $Toast.fire({
                        icon: 'success',
                        title: 'แก้ไขชื่อสำเร็จ'
                    })
                } else {
                    $swal.fire({
                        title: 'ผิดพลาด !!',
                        html: '<span class="text-base m-1">รายละเอียดผิดพลาด</span>',
                        icon: 'warning',
                        confirmButtonText: 'ยืนยัน'
                    })
                }
            }).catch(() => {
                $swal.fire({
                    title: 'ผิดพลาด !!',
                    html: '<span class="text-base m-1">ไม่สามารถส่งข้อมูลได้</span>',
                    icon: 'warning',
                    confirmButtonText: 'ยืนยัน'
                })

            })
    } else {
        isOpen.value = false;
        Namedata.value = '';
    }
}

const EditImg = async () => {
    if (image.value && image.value != $unlock(counter.Userdata).IMG) {
        await $fetch(`${config.public.server}/api/EditImg`, {
            method: 'POST',
            body: {
                No: $unlock(counter.Userdata).No,
                Img: image.value,
            }
        })
            .then((res) => {
                let { Status, Img } = res
                if (Status == '1') {

                    $io.emit("EditIMG", { No: $unlock(counter.Userdata).No, data: Img }).then
                    isOpen2.value = false
                    image.value = '';
                    $Toast.fire({
                        icon: 'success',
                        title: 'แก้ไขรูปสำเร็จ'
                    })
                } else {
                    $swal.fire({
                        title: 'ผิดพลาด !!',
                        html: '<span class="text-base m-1">รายละเอียดผิดพลาด</span>',
                        icon: 'warning',
                        confirmButtonText: 'ยืนยัน'
                    })
                }
            }).catch(() => {
                $swal.fire({
                    title: 'ผิดพลาด !!',
                    html: '<span class="text-base m-1">ไม่สามารถส่งข้อมูลได้</span>',
                    icon: 'warning',
                    confirmButtonText: 'ยืนยัน'
                })

            })
    } else {
        isOpen2.value = false;
        image.value = $unlock(counter.Userdata).IMG ? $unlock(counter.Userdata).IMG : '/user.png'
    }
}

const EditPassword = async () => {
    if (Passwrod.value.Password1 == $unlock($unlock(counter.Userdata).Password)) {
        if (Passwrod.value.Password2 == Passwrod.value.Password2_2) {
            await $fetch(`${config.public.server}/api/EditPassword`, {
                method: 'POST',
                body: {
                    No: $unlock(counter.Userdata).No,
                    Password: $lock(Passwrod.value.Password2),
                }
            }).then((res) => {
                let { Status } = res
                if (Status == '1') {
                    let Datauser = $unlock(counter.Userdata);
                    Datauser.Password = $lock(Passwrod.value.Password2);
                    counter.Userdata = $lock(Datauser);
                    $io.emit("EditPassword", {
                        No: $unlock(counter.Userdata).No,
                    }).then
                    isOpen3.value = false
                    Passwrod.value.Password1 = ''
                    Passwrod.value.Password2 = ''
                    Passwrod.value.Password2_2 = ''
                    $Toast.fire({
                        icon: 'success',
                        title: 'แก้ไขรหัสผ่านสำเร็จ'
                    })
                } else {
                    $swal.fire({
                        title: 'ผิดพลาด !!',
                        html: '<span class="text-base m-1">รายละเอียดผิดพลาด</span>',
                        icon: 'warning',
                        confirmButtonText: 'ยืนยัน'
                    })
                }
            }).catch(() => {
                $swal.fire({
                    title: 'ผิดพลาด !!',
                    html: '<span class="text-base m-1">ไม่สามารถส่งข้อมูลได้</span>',
                    icon: 'warning',
                    confirmButtonText: 'ยืนยัน'
                })
            })
        } else {
            $Toast.fire({
                icon: 'warning',
                title: 'รหัสผ่านใหม่ไม่ตรงกัน'
            })
        }
    } else {
        $Toast.fire({
            icon: 'error',
            title: 'ข้อมูลไม่ถูกต้อง'
        })
    }
}
//*** Function */

watch(() => route.query, () => {
    indexOn.value = route.query.tab ? 1 : 0;
})

onMounted(() => {
    bar();
})


</script>
 
  