<template>
  <h1>Tres</h1>
  <div class="setup">
    <div class="settings-input">
      <input
        type="text"
        placeholder="Enter player name"
        @keyup.enter="addPlayer"
        v-model="newPlayer"
      />
      <button @click="addPlayer">add player</button>
      <div class="player" v-for="(player, index) in players" :key="player.id">
        <div class="player-options">
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
            v-model="player.earnedScore"
            type="number"
            placeholder="Enter score"
            @keyup.enter="addScore(player)"
          />

          <vue-feather @click="addScore(player)" type="plus"></vue-feather>
          <vue-feather
            @click="
              removePlayer(index);
              notify();
            "
            type="trash-2"
          ></vue-feather>
          <vue-feather type="edit" @click="editScore(player)"></vue-feather>
        </div>
      </div>
      <div>
        <button @click="finishRound()">add to everyone</button>
      </div>
    </div>

    <div class="settings-input">
      <input
        v-model="amount"
        type="number"
        placeholder="Enter points threshold"
        @keyup.enter="setMaxScore"
      />
      <button @click="setMaxScore">set threshold</button>
      <div>Maximum points: {{ maxScore }}</div>
      <button @click="newGame">new game</button>
      <button @click="clearGame">clear game</button>
    </div>
    <div class="round">{{ round }}</div>
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
  <ModalWindow v-if="gameOver">
    <button @click="toggleModal">close</button>
    <div style="color: black" v-for="(winner, index) in winners" :key="index">
      <div>Winner is:{{ winner.name }}: {{ winner.score }}</div>
    </div>
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
      notification: false,
      gameOver: false,
      winners: [],
    };
  },
  methods: {
    addPlayer() {
      if (this.newPlayer.length === 0) return;
      this.players.push({
        id: this.id++,
        name: this.newPlayer,
        score: 0,
        earnedScore: "",
        isEditing: false,
        isLoser: false,
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
        player.isLoser = true;
        this.toggleModal();
        this.pushToWin();
      }
    },

    addScore(player) {
      if (player.score + player.earnedScore < 0);
      else if (player.score + player.earnedScore >= this.maxScore) {
        player.score += player.earnedScore;
        player.isLoser = true;
        this.toggleModal();
        this.pushToWin();
      } else player.score += player.earnedScore;
      player.earnedScore = "";
    },

    setMaxScore() {
      if (this.amount <= 0) return;
      this.maxScore = this.amount;
      this.amount = "";
    },

    finishRound() {
      this.players = this.players.map((player) => {
        player.score += player.earnedScore;
        player.earnedScore = "";
        return player;
      });
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

    clearGame() {
      this.players = [];
      this.maxScore = 500;
      this.round = 1;
    },

    toggleModal() {
      this.gameOver = !this.gameOver;
    },

    pushToWin() {
      this.winners = this.players.filter((player) => !player.isLoser);
    },

    sorter(x, y) {
      if (x > y) return -1;
      if (x == y) return 0;
      return 1;
    },
  },
};
</script>

<style></style>
