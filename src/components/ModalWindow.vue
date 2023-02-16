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
  text-align: center;
  background-color: #fff;
  border-radius: 20px;
  padding: 30px 40px;
  position: relative;
  color: #2a2e48;
}

.modal-content i {
  color: #000;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  border: 1px solid #fff;
}

i:hover {
  border: 1px solid #2a2e48;
}
</style>
