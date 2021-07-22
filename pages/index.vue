<template>
  <div class="w-100 d-flex justify-content-center align-items-center">
    <h1 v-if="!isLoggedIn">home</h1>
    <gameInput
      v-if="questions.length === 0 && isLoggedIn && userAnswers.length === 0"
    />
    <mainGame v-if="questions.length > 0" />
    <h1 v-if="userAnswers.length > 0">output</h1>
  </div>
</template>

<script>
import gameInput from "../components/gameInput.vue";
import mainGame from "../components/mainGame.vue";
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
    mainGame
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
    }
  }
};
</script>

<style></style>
