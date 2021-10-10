import { createStore } from "vuex";
import TopicData from "./Topic";

interface State {
  topics: Array<TopicData>;
}

export const store = createStore<State>({
  state: {
    topics: [],
  },
  mutations: {
    addTopic(state, topic: TopicData) {
      state.topics.push(topic);
    },
    deleteTopic(state, topic: TopicData) {
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
