<template>
  <div
    class="body w-100 d-flex justify-content-center align-items-center background-game"
  >
    <h1 v-if="!isLoggedIn">
      go <nuxt-link class="link-dark" to="/">home</nuxt-link>
    </h1>
    <div
      v-else
      class="d-flex flex-column w-100 justify-content-center align-items-center"
    >
    <h3>point: {{info.point}}</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      info: {}
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.login;
    }
  },
  mounted() {
    const loading = this.$vs.loading({
      // background: "dark",
      color: "#fff",
      type: "points"
    });
    axios({
      method: "get",
      url: "http://localhost:5000/api/v1/users/get",
      headers: {
        "auth-token": localStorage.getItem("token")
          ? localStorage.getItem("token")
          : sessionStorage.getItem("token")
          ? sessionStorage.getItem("token")
          : null
      }
    }).then(result => {
      if (result.status === 200) {
        if (result.data) {
          loading.close();
          this.info = result.data;
        } else {
          console.log("Error in get data from get user data");
        }
      } else {
        console.log("Eroor in fetch get user info");
      }
    });
  }
};
</script>

<style></style>
