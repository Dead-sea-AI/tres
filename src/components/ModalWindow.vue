<template>
  <div class="modal-wrapper">
    <div class="modal-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.modal-wrapper {
  display: grid;
  justify-items: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.modal-content {
  background-color: #fff;
}
</style>
