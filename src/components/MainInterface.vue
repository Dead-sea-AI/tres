<template>
  <div class="interface">
    <button @click="displayLegend()">remind me card value</button>
    <div v-if="legendIsShown">
      <ul>
        <li>Numbered cards (0-9) – Face value</li>
        <li>Draw Two/Skip/Reverse – 20 points each</li>
        <li>Wild/Wild Draw Four – 50 points each</li>
        <li>Wild Swap Hands/Wild Customizable cards – 40 points each</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      legendIsShown: false,
    };
  },

  methods: {
    displayLegend() {
      this.legendIsShown = !this.legendIsShown;
    },
  },
};
</script>

<style>
.interface ul {
  margin-left: 300px;
}
</style>
