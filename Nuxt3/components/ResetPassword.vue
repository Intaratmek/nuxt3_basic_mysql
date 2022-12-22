<!-- Please remove this file from your project -->
<template>
  <div>
    <propsBack title="ลืมรหัสผ่าน" />
    <div class=" min-h-screen flex items-center bg-transparent dark:bg-gray-800 dark:text-gray-200 p-4">

      <div class="m-auto  p-4 w-full max-w-sm bg-white rounded-lg  border-gray-200 sm:p-6 md:p-8 dark:bg-gray-800">

        <div class="space-y-6 mt-[35px]">

          <div>
            <div class="rounded-lg max-w-fit m-auto ">

              <nuxt-img format="webp" sizes="sm:100vw md:50vw lg:400px" src="/key.png" alt="Logo"
                class="relative select-none w-20 z-10 m-auto p-2 rounded-lg pointer-events-none" />
            </div>
            <form v-if="!No" @submit.prevent="CheckHBD()">
              <label for="id"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">รหัสเข้าใช้งาน</label>
              <input v-model="formReset.ID" autocomplete="off" type="text" name="id" id="email" aria-required="true"
                aria-invalid="true"
                class="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="รหัสเข้าใช้งาน" required />

              <label for="date" class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-gray-300">วันเดือนปี
                เกิด</label>
              <input v-model="formReset.HBD" autocomplete="off" type="date" name="date" id="date"
                placeholder="วันเดือนปี เกิด"
                class="bg-gray-50 border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required />

              <button type="submit"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                ตรวจสอบ
              </button>
            </form>
            <form v-if="No" @submit.prevent="ResetPasswordNew()">
              <label for="id"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">รหัสเข้าใช้งาน</label>
              <span class="font-bold text-gray-500">{{ formReset.ID }}</span>

              <label for="password"
                class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password
                ใหม่</label>
              <input v-model="formReset.Password" autocomplete="off" type="password" name="password" id="password"
                placeholder="Password ใหม่"
                class="bg-gray-50 border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required />

              <button type="submit"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                เปลี่ยน Password
              </button>
              <button @click="(No = null)" type="button"
                class="mt-4 w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                ยกเลิก
              </button>
            </form>
            <div class="rounded-lg shadow p-2 mt-2">
              <span class="text-gray-500 text-xs">* กรณีที่ไม่สามารถจำข้อมูลได้ กรุณาแจ้งผู้ดูแลระบบ</span>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const { $swal } = useNuxtApp();
const formReset = ref({ ID: '', Password: '', HBD: '' })
const No = ref();
const router = useRouter();
const CheckHBD = async () => {
  if (formReset.value.ID != '' && formReset.value.HBD != '') {
    await $fetch(`${config.public.server}/api/Forget`, {
      method: 'POST',
      body: {
        ID: formReset.value.ID,
        HBD: formReset.value.HBD,
      }
    })
      .then((res) => {
        let { Status, data } = res
        if (Status == 1) {
          No.value = data;
        } else {
          $swal.fire({
            title: 'ผิดพลาด !!',
            html: '<span class="text-base m-1">กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง</span>',
            icon: 'warning',
            confirmButtonText: 'ยืนยัน'
          })
        }

      })
      .catch((error) => {

      })
  } else {
    $swal.fire({
      title: 'Error!',
      html: '<span class="text-base m-1">กรุณากรอกข้อมูลให้ครบถ้วน</span>',
      icon: 'error',
      confirmButtonText: 'ยืนยัน'
    })
  }
}

const ResetPasswordNew = async () => {
  if (No.value && formReset.value.Password) {
    await $fetch(`${config.public.server}/api/ForgetPassword`, {
      method: 'POST',
      body: {
        No: No.value,
        Password: formReset.value.Password,
      }
    })
      .then((res) => {
        let { Status } = res
        if (Status == 1) {
          router.replace({ path: "/" });
          $swal.fire({
            title: 'Success !!',
            html: '<span class="text-base m-1">เปลี่ยนรหัสผ่านใหม่สำเร็จ สามารถเข้าใช้งานได้ทันที</span>',
            icon: 'success',
            confirmButtonText: 'ยืนยัน'
          })
        } else {
          $swal.fire({
            title: 'Error !!',
            html: '<span class="text-base m-1">ผิดพลาด</span>',
            icon: 'error',
            confirmButtonText: 'ยืนยัน'
          })
        }
      })
  } else {
    $swal.fire({
      title: 'Error!',
      html: '<span class="text-base m-1">กรุณากรอกข้อมูลให้ครบถ้วน</span>',
      icon: 'error',
      confirmButtonText: 'ยืนยัน'
    })
  }
}

onMounted(() => {
  if (process.client && window) {
    window.history.scrollRestoration = "auto";
  }
})
</script>
