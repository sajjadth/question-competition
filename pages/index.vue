<template>
  <div class="w-100 d-flex justify-content-center align-items-center">
    <h1 v-if="!isLoggedIn">home</h1>
    <gameInput v-if="status === 0 && isLoggedIn" />
    <mainGame v-if="status === 1  && isLoggedIn" />
    <gameOutput v-if="status === 2  && isLoggedIn" />
  </div>
</template>

<script>
import gameInput from "../components/gameInput.vue";
import mainGame from "../components/mainGame.vue";
import gameOutput from "../components/gameOutput.vue";
export default {
  head() {
    return {
      title: "Home"
    };
  },
  data() {
    return {
      isStarted: false
    };
  },
  components: {
    gameInput,
    mainGame,
    gameOutput
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.login;
    },
    questions() {
      return this.$store.state.questions;
    },
    userAnswers() {
      return this.$store.state.userAnswers;
    },
    userResults() {
      return this.$store.state.userResults;
    },
    status() {
      return this.$store.state.status;
    }
  }
};
</script>

<style></style>
