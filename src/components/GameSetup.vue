<template>
  <div class="setup">
    <h1>Duo</h1>
    <div class="settings-input">
      <input
        type="text"
        placeholder="Enter player name"
        @keyup.enter="addPlayer"
        v-model="newPlayer"
      />
      <button @click="addPlayer">submit</button>
    </div>
    <div v-for="(player, index) in players" :key="player.id">
      <div>{{ player.name }} {{ player.score }}</div>
      <button @click="removePlayer(index)">remove player</button>
      <button @click="editScore(index)">Edit score</button>
    </div>
    <div class="settings-input">
      <input
        v-model="amount"
        type="number"
        placeholder="Enter points threshold"
      />
      <button @click="setMaxScore">Set threshold</button>
    </div>
    <div>{{ maxScore }}</div>
    <p>1</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      newPlayer: "",
      players: [],
      amount: 0,
      maxScore: 500,
    };
  },
  methods: {
    addPlayer() {
      if (this.newPlayer.length === 0) return;
      this.players.push({
        id: this.id++,
        name: this.newPlayer + ":",
        score: 0,
      });
      this.newPlayer = "";
    },

    removePlayer(index) {
      this.players.splice(index, 1);
    },

    editScore(index) {
      this.newPlayer = this.players[index].score;
    },
    setMaxScore() {
      if (this.amount <= 0) return;
      this.maxScore = this.amount;
    },
  },
};
</script>

<style></style>
