import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      notifications: [],
      id: 0,
    };
  },
  getters: {
    getNotifications(state) {
      return state.notifications;
    },
  },
  mutations: {
    notify(state, notifyData) {
      state.notifications.push({
        text: notifyData.text,
        type: notifyData.type,
        id: state.id++,
      });
      const id = state.id;
      setTimeout(() => {
        const idx = state.notifications.indexOf((nigga) => nigga.id == id);
        state.notifications.splice(idx, 1);
      }, 1500);
    },
  },
});

export default store;
