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
          <table>
            <tr>
              <td>{{ player.name }}:</td>
              <td>{{ player.score }}</td>
              <td></td>
            </tr>
          </table>
          <input
            v-if="!player.isEditing"
            v-model="player.earnedScore"
            type="number"
            placeholder="Enter score and press next round to add"
          />
          <input
            v-else
            @keyup.enter="editingDone(player)"
            type="number"
            placeholder="Edit score and press enter to submit"
            v-model="player.earnedScore"
          />

          <vue-feather
            @click="
              suspend();
              notify();
            "
            type="trash-2"
          ></vue-feather>
          <vue-feather type="edit" @click="editScore(player)"></vue-feather>
        </div>
      </div>
      <div>
        <button @click="finishRound()">next round</button>
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
      <button @click="restart = true">new game</button>
      <button @click="clearGame">clean restart</button>
    </div>
    <div class="round">{{ round }}</div>
  </div>

  <div v-if="notification" class="notification">
    <span>Player deleted</span>
  </div>
  <ModalWindow v-if="gameOver">
    <vue-feather @click="toggleModal" type="x" />
    <div v-for="(winner, index) in winners" :key="index">
      <h2>Winners</h2>
      <div>{{ winner.name }}: {{ winner.score }}</div>
      <h2>Loser</h2>
      <div>{{ loser.name }}: {{ loser.score }}</div>
    </div>
  </ModalWindow>
  <ModalWindow v-if="upForDeletion">
    <h2>Remove player?</h2>
    <button @click="removePlayer(index)">yes</button>
    <button @click="upForDeletion = false">!yes</button>
  </ModalWindow>
  <ModalWindow v-if="restart">
    <h2>Do you want to clear score and start a new game?</h2>
    <button @click="newGame">yes</button>
    <button @click="restart = false">yesn`t`</button>
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
      upForDeletion: false,
      restart: false,
      winners: [],
      loser: [],
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

    suspend() {
      this.upForDeletion = true;
    },

    removePlayer(index) {
      this.players.splice(index, 1);
      this.upForDeletion = false;
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
      player.score = player.earnedScore;
      player.earnedScore = "";
      if (player.score >= this.maxScore) {
        player.isLoser = true;
        this.toggleModal();
        this.pushToWin();
      }
    },

    setMaxScore() {
      if (this.amount <= 0) return;
      this.maxScore = this.amount;
      this.amount = "";
    },

    finishRound() {
      this.players = this.players.map((player) => {
        if (player.earnedScore < 0) return;
        player.score += player.earnedScore;
        player.earnedScore = "";
        if (player.score + player.earnedScore >= this.maxScore) {
          player.isLoser = true;
          this.toggleModal();
          this.pushToWin();
        }
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
      this.restart = false;
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
      this.loser = this.players.filter((player) => player.isLoser);
    },

    // sorter(x, y) {
    //   if (x > y) return -1;
    //   if (x == y) return 0;
    //   return 1;
    // },
  },
};
</script>

<style></style>
