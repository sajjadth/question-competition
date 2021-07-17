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
      <template #right v-if="!isLoggedIn">
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
      <template #right v-else>
        <nuxt-link to="/profile">
          <vs-avatar>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
            >
              <circle fill="none" cx="12" cy="7" r="3"></circle>
              <path
                d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z"
              ></path>
            </svg>
          </vs-avatar>
        </nuxt-link>
      </template>
    </vs-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      route: this.$route.path,
    };
  },
  watch: {
    $route(to, from) {
      this.route = to.path;
      this.loginCheck
    }
  },
  computed:{
    isLoggedIn() {
      return this.$store.state.login
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
