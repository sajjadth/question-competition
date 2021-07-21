<template>
  <div class="w-100 d-flex justify-content-center align-items-center">
    <h1 v-if="!isLoggedIn">home</h1>
    <selectGame v-if="questions.length === 0 && isLoggedIn" />
    <mainGame v-if="questions.length > 0" />
  </div>
</template>

<script>
import selectGame from "../components/selectGame.vue";
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
    selectGame,
    mainGame
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.login;
    },
    questions() {
      return this.$store.state.questions;
    }
  }
};
</script>

<style></style>
