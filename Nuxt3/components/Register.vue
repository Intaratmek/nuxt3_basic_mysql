<!-- Please remove this file from your project -->
<template>
  <div>
    <propsBack title="ลงทะเบียน" />

    <div class=" min-h-screen flex items-center bg-transparent dark:bg-gray-800 dark:text-gray-200 p-4">

      <div class="m-auto  p-4 w-full max-w-sm bg-white rounded-lg  border-gray-200 sm:p-6 md:p-8 dark:bg-gray-800">

        <div class="space-y-6 mt-[35px]">

          <form @submit.prevent="submitRG()">
            <div class="rounded-lg max-w-fit m-auto ">

              <nuxt-img format="webp" sizes="sm:100vw md:50vw lg:400px" src="/edit.png" alt="Logo"
                class="relative select-none w-20 z-10 m-auto p-2 rounded-lg pointer-events-none" />

            </div>

            <label for="id"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">รหัสเข้าใช้งาน</label>
            <input v-model="formRg.Id" autocomplete="off" type="text" name="id" id="email" aria-required="true"
              aria-invalid="true"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="รหัสเข้าใช้งาน" required />


            <label for="password"
              class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-gray-300">รหัสผ่าน</label>
            <input v-model="formRg.Password" autocomplete="off" type="password" name="password" id="password"
              placeholder="รหัสผ่าน"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required />

            <label for="password2"
              class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-gray-300">รหัสผ่านอีกครั้ง</label>
            <input v-model="formRg.Password2" autocomplete="off" type="password" name="password2" id="password2"
              placeholder="รหัสผ่านอีกครั้ง"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required />

            <label for="name"
              class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-gray-300">ชื่อผู้ใข้งาน</label>
            <input v-model="formRg.Name" autocomplete="off" type="text" name="name" id="name"
              placeholder="ชื่อผู้ใข้งาน"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required />

            <label for="date" class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-gray-300">วันเดือนปี
              เกิด</label>
            <input v-model="formRg.HBD" autocomplete="off" type="date" name="date" id="date"
              placeholder="วันเดือนปี เกิด"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required />

            <button type="submit"
              class="w-full text-white my-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              ลงทะเบียน
            </button>
            <div class="rounded-lg shadow p-2">
              <span class="text-gray-500 text-xs">* วันเดือนปีเกิด ใช้ในกรณีที่ลืมรหัสผ่าน</span>
              <br />
              <span class="text-gray-500 text-xs">* การลงทะเบียนต้องรอการอนุมัติเพื่อเข้าใช้งานระบบ</span>
            </div>
          </form>


        </div>
      </div>

    </div>

  </div>

</template>

<script setup >

const { $swal } = useNuxtApp()
const formRg = ref({ Id: '', Password: '', Password2: '', Name: '', HBD: '' })
const config = useRuntimeConfig()
const router = useRouter();

// instead of process.env you will now access config.public.apiBase
//console.log(config.public.key)
onMounted(() => {

  if (process.client && window) {
    window.history.scrollRestoration = "auto";
  }
})


const submitRG = async () => {
  if (formRg.value.Id != '' && formRg.value.Password != '' && formRg.value.Password2 != '' && formRg.value.Name != '' && formRg.value.HBD != '') {
    if (formRg.value.Password == formRg.value.Password2) {
      await $fetch(`${config.public.server}/api/Register`, {
        method: 'POST',
        body: {
          ID: formRg.value.Id,
          Password: formRg.value.Password,
          NAME: formRg.value.Name,
          HBD: formRg.value.HBD,
        }
      })
        .then((res) => {
          let { data, Status } = res
          if (Status == 'OK') {
            router.replace({ path: "/" });
            $swal.fire({
              title: 'Success !!',
              html: '<span class="text-base m-1">สมัครเข้าใช้งานระบบสำเร็จ รออนุมัติการใช้งานจาก แอดมิน</span>',
              icon: 'success',
              confirmButtonText: 'ยืนยัน'
            })
          } else if (Status == 'Not OK') {
            $swal.fire({
              title: 'ผิดพลาด !!',
              html: '<span class="text-base m-1">รหัสเข้าใช้งานนี้มีในระบบแล้ว</span>',
              icon: 'warning',
              confirmButtonText: 'ยืนยัน'
            })
          } else {

          }
        })
    } else {
      $swal.fire({
        title: 'ผิดพลาด !!',
        html: '<span class="text-base m-1">กรุณากรอกรหัสเข้าใช้งานให้ตรงกัน</span>',
        icon: 'error',
        confirmButtonText: 'ยืนยัน'
      })
    }
  } else {
    $swal.fire({
      title: 'Error!',
      html: '<span class="text-base m-1">กรุณากรอกข้อมูลให้ครบถ้วน</span>',
      icon: 'error',
      confirmButtonText: 'ยืนยัน'
    })
  }
}
</script>

