<template>
  <div>
    <h1 v-if="!isLoggedIn">home</h1>
    <Game v-else />
  </div>
</template>

<script>
import Game from "../components/Game.vue";
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
    Game
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.login;
    }
  }
};
</script>

<style></style>
