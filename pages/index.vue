<template>
  <div class="w-100 d-flex justify-content-center align-items-center">
    <h1 v-if="!isLoggedIn">home</h1>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Home"
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.login;
    },
  }
};
</script>

<style></style>
