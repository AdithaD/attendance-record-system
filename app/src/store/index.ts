import { createStore } from "vuex";
import TopicData from "./Topic";

interface State {
  topics: Array<TopicData>;
  testName: string;
  testDate: Date | null;
}

export const store = createStore<State>({
  state: {
    testName: "",
    testDate: null,
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
      state.testName = "";
      state.testDate = null;
    },
    updateTestName(state, value) {
      state.testName = value;
    },
    updateTestDate(state, value) {
      state.testDate = value;
    },
  },
  getters: { getTopics: (state) => state.topics },
  actions: {},
  modules: {},
});
