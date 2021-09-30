import { createStore } from "vuex";
import Topic from "./Topic";

interface State {
  topics: Array<Topic>;
}

export const store = createStore<State>({
  state: {
    topics: [],
  },
  mutations: {
    addTopic(state, topic: Topic) {
      state.topics.push(topic);
      console.log(`added`, topic);
    },
    deleteTopic(state, topic: Topic) {
      state.topics.splice(state.topics.indexOf(topic), 1);
    },
    clearTempTest(state) {
      state.topics.splice(0, state.topics.length);
    },
  },
  getters: { getTopics: (state) => state.topics },
  actions: {},
  modules: {},
});
