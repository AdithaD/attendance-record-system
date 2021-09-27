<template>
  <div class="relative h-screen flex bg-gray-800 overflow-hidden">
    <Sidebar class="" />
    <router-view class="overflow-y-scroll" />
  </div>
</template>

<script>
import Sidebar from "./views/Sidebar.vue";

export default {
  components: {
    Sidebar,
  },
};
</script>
