<template>
  <div class="w-100">
    <div
      class="w-100 d-flex flex-column justify-content-center align-items-center"
    >
      <div
        class="w-100 d-flex justify-content-center align-items-center body background-home"
      >
        <h1 class="site-title d-flex justify-content-center align-items-center">
          welcome to <br />
          question competition
        </h1>
      </div>
      <div class="w-100 row">
        <div
          class="d-flex col-sm-6 h-100 justify-content-center align-items-center"
        >
          <div id="home-background-1" class="w-100 vh-100"></div>
        </div>
        <div
          class="d-flex col-sm-6 vh-100 justify-content-center align-items-center"
        >
          <h1>play</h1>
        </div>
      </div>
      <div class="w-100 row">
        <div
          class="d-flex col-sm-6 vh-100 justify-content-center align-items-center"
        >
          <h1>play with freinds</h1>
        </div>
        <div
          class="d-flex col-sm-6 h-100 justify-content-center align-items-center"
        >
          <div id="home-background-2" class="w-100 vh-100"></div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
export default {
  components: {
    Footer
  },
  head() {
    return {
      title: "Home"
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.login;
    }
  }
};
</script>

<style></style>
