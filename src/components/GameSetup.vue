<template>
  <div class="setup">
    <h1>Tres</h1>
    <div class="settings-input">
      <input
        type="text"
        placeholder="Enter player name"
        @keyup.enter="addPlayer"
        v-model="newPlayer"
      />
      <button @click="addPlayer">add player</button>
    </div>
    <div v-for="(player, index) in players" :key="player.id">
      <div class="player">
        <div>{{ player.name }}:</div>
        <div v-if="!player.isEditing">{{ player.score }}</div>
        <input
          v-else
          @keyup.enter="editingDone(player)"
          type="number"
          placeholder="Score"
          v-model="player.score"
        />
        <input
          v-model="additionalScore"
          type="number"
          placeholder="Enter score"
          @keyup.enter="addScore(player)"
        />
        <button @click="addScore(player)">add score</button>
      </div>
      <button
        @click="
          removePlayer(index);
          notify();
        "
      >
        remove player
      </button>
      <button @click="editScore(player)">edit score</button>
    </div>
    <button
      @click="
        addToAll();
        increment();
      "
    >
      add to everyone
    </button>
    <div class="settings-input">
      <input
        v-model="amount"
        type="number"
        placeholder="Enter points threshold"
        @keyup.enter="setMaxScore"
      />
      <button @click="setMaxScore">set threshold</button>
    </div>
    <div>Maximum points: {{ maxScore }}</div>
    <div>{{ round }}</div>
    <button @click="newGame">new game</button>
    <button @click="clearGame">clear game</button>
  </div>
  <!-- <div v-if="showModal" class="modal">
    <div class="window">
      <span v-if="player.isWinner">{{ player.name }} won!</span>
      <button @click="showModal = false">close</button>
    </div>
  </div> -->
  <div v-if="notification" class="notification">
    <span>Player deleted</span>
  </div>
  <ModalWindow v-if="isShownGameResult">
    <button @click="toggleModal">close</button>
  </ModalWindow>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      newPlayer: "",
      players: [],
      amount: "",
      maxScore: 500,
      round: 1,
      additionalScore: "",
      notification: false,
      isShownGameResult: true,
    };
  },
  methods: {
    addPlayer() {
      if (this.newPlayer.length === 0) return;
      this.players.push({
        id: this.id++,
        name: this.newPlayer,
        score: 0,
        isEditing: false,
        isWinner: false,
      });
      this.newPlayer = "";
    },

    removePlayer(index) {
      this.players.splice(index, 1);
    },

    notify() {
      this.notification = true;
      setInterval(() => {
        this.notification = false;
      }, 1500);
    },

    editScore(player) {
      player.isEditing = true;
    },
    editingDone(player) {
      player.isEditing = false;
      if (player.score >= this.maxScore) {
        player.isWinner = true;
        this.showModal;
      }
    },

    addScore(player) {
      if (player.score + this.additionalScore < 0);
      else if (player.score + this.additionalScore >= this.maxScore) {
        player.score += this.additionalScore;
        player.isWinner = true;
        this.showModal = true;
      } else player.score += this.additionalScore;
      this.additionalScore = "";
    },
    setMaxScore() {
      if (this.amount <= 0) return;
      this.maxScore = this.amount;
      this.amount = "";
    },

    increment() {
      this.round++;
    },

    newGame() {
      this.round = 1;
      this.players = this.players.map((player) => {
        player.score = 0;
        return player;
      });
      // for (let i = 0; i < this.players.length; i++) {
      //   this.players[i].score = 0;
      // }
    },

    addToAll() {
      this.players = this.players.map((player) => {
        player.score += this.additionalScore;
        return player;
      });
      this.additionalScore = "";
    },

    clearGame() {
      this.players = [];
      this.maxScore = 500;
      this.round = 1;
    },

    toggleModal() {
      this.isShownGameResult = !this.isShownGameResult;
    },
  },
};
</script>

<style></style>
