<template>
  <div class="relative min-h-screen flex bg-gray-800">
    <Sidebar />
    <router-view />
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
