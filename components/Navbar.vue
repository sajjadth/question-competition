<template>
  <div>
    <vs-navbar paddingScroll fixed center-collapsed id="navbar">
      <template #left>
        <h3 @click="route = '/'">
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
      <template #right>
        <vs-button
          dark
          transparent
          to="/login"
          :active="route === '/login'"
          @click="route = '/login'"
          >Login</vs-button
        >
        <vs-button
          success
          flat
          :active="route === '/register'"
          @click="route = '/register'"
          to="/register"
          >register now</vs-button
        >
      </template>
    </vs-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // active: this.$route.path,
      route: this.$route.path
    };
  }
};
</script>

<style></style>
