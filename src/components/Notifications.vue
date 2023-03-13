<template>
  <div class="notifications">
    <div v-for="(notification, idx) in notifications" :key="idx">
      {{ notification.text }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    notifications() {
      return this.$store.getters.getNotifications;
    },
  },
};
</script>

<style>
.notifications {
  position: fixed;
  right: 0;
  bottom: 0;
}

.notifications div {
  color: #000;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  font-size: 20px;
}
</style>
