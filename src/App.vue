<script>
import { RouterView } from "vue-router";
import Notifications from "@/components/Notifications.vue";

export default {
  components: {
    Notifications,
  },
};
</script>

<template>
  <div>
    <RouterView />
    <Notifications />
  </div>
</template>

<style scoped></style>
