<template>
  <div>
    <vs-navbar paddingScroll fixed center-collapsed id="navbar">
      <template #left>
        <h3>
          <nuxt-link to="/" class="link-dark">QC</nuxt-link>
        </h3>
      </template>
      <!-- <vs-navbar-item @click="active = '/'" to="/" :active="active === '/'">
        Home
      </vs-navbar-item>
      <vs-navbar-item
        @click="active = '/about'"
        to="/about"
        :active="active === '/about'"
      >
        About
      </vs-navbar-item>
      <vs-navbar-item
        @click="active = '/contact'"
        to="/contact"
        :active="active === '/contact'"
      >
        Contact
      </vs-navbar-item>
      <vs-navbar-item
        @click="active = '/doc'"
        to="/doc"
        :active="active === '/doc'"
      >
        Doc
      </vs-navbar-item> -->
      <template #right v-if="!isLoggedin">
        <vs-button dark transparent to="/login" :active="route === '/login'"
          >Login</vs-button
        >
        <vs-button
          dark
          transparent
          :active="route === '/register'"
          to="/register"
          >register now</vs-button
        >
      </template>
    </vs-navbar>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // active: this.$route.path,
      route: this.$route.path,
      isLoggedin: false
    };
  },
  watch: {
    $route(to, from) {
      this.route = to.path;
      const tokenCheck = localStorage.getItem("token")
        ? true
        : sessionStorage.getItem("token")
        ? true
        : false;
      this.isLoggedin = tokenCheck;
    }
  },
  mounted() {
    const tokenCheck = localStorage.getItem("token")
      ? true
      : sessionStorage.getItem("token")
      ? true
      : false;
    this.isLoggedin = tokenCheck;

    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : sessionStorage.getItem("token")
      ? sessionStorage.getItem("token")
      : null;
    if (this.isLoggedin) {
      axios({
        method: "get",
        url: "http://localhost:5000/api/v1/users/auth",
        headers: { "auth-token": token }
      }).then(result => {
        if (result.status === 200) {
          if (result.data.success) {
            null;
          } else {
            if (result.data.message) {
              localStorage.removeItem("token");
              sessionStorage.removeItem("token");
              this.openNotification(
                "top-right",
                "warn",
                "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' style='fill: #ffffff;transform: ;msFilter:;'><path d='M2 12L7 16 7 13 16 13 16 11 7 11 7 8z'></path><path d='M13.001,2.999c-2.405,0-4.665,0.937-6.364,2.637L8.051,7.05c1.322-1.322,3.08-2.051,4.95-2.051s3.628,0.729,4.95,2.051 s2.051,3.08,2.051,4.95s-0.729,3.628-2.051,4.95s-3.08,2.051-4.95,2.051s-3.628-0.729-4.95-2.051l-1.414,1.414 c1.699,1.7,3.959,2.637,6.364,2.637s4.665-0.937,6.364-2.637c1.7-1.699,2.637-3.959,2.637-6.364s-0.937-4.665-2.637-6.364 C17.666,3.936,15.406,2.999,13.001,2.999z'></path></svg>",
                6000,
                "logged out",
                "your login is expired!"
              );
              this.$router.push("/login");
              this.isLoggedin = false;
            } else {
              console.log("user is log out and i dont now why");
            }
          }
        } else {
          console.log("error in fetch data in auth");
        }
      });
    }
  },
  methods: {
    openNotification(position = null, color, icon, time, title, text) {
      const noti = this.$vs.notification({
        sticky: true,
        color,
        icon,
        duration: time,
        position,
        title: title,
        text: text
      });
    }
  }
};
</script>

<style></style>
