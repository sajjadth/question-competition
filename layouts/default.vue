<template>
  <div
    id="main"
    class="d-flex flex-column w-100 justify-content-center align-items-center"
  >
    <div
      id="header"
      class="d-flex w-100 justify-content-center align-items-center"
    >
      <Navbar />
    </div>
    <div
      id="body"
      class="d-flex flex-column w-100 justify-content-center align-items-center"
    >
      <Nuxt />
    </div>
  </div>
</template>

<script>
import "../assets/style.sass";
import Navbar from "../components/Navbar.vue";
export default {
  components: { Navbar }
};
</script>

<style></style>
