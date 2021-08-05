<template>
  <div
    class="d-flex flex-column p-3 m-2 justify-content-center align-items-center bg-white"
  >
    <div
      id="min-width"
      class="d-flex flex-column justify-content-center align-items-center"
    >
      <h3>login</h3>
      <form class="w-100" @submit.prevent="submit" autocomplete="off">
        <div class="d-flex w-100 justify-content-center align-items-center">
          <vs-input
            v-model="username"
            class="mt-4"
            block
            required
            label-placeholder="username"
          ></vs-input>
        </div>
        <div class="d-flex w-100 justify-content-center align-items-center">
          <vs-input
            v-model="password"
            class="mt-4"
            block
            required
            label-placeholder="password"
            icon-after
            :visiblePassword="showPassword"
            type="password"
            @click-icon="showPassword = !showPassword"
          >
            <template #icon>
              <!-- show -->
              <svg
                v-if="!showPassword"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
              >
                <path
                  d="M14,12c-1.095,0-2-0.905-2-2c0-0.354,0.103-0.683,0.268-0.973C12.178,9.02,12.092,9,12,9c-1.642,0-3,1.359-3,3 c0,1.642,1.358,3,3,3c1.641,0,3-1.358,3-3c0-0.092-0.02-0.178-0.027-0.268C14.683,11.897,14.354,12,14,12z"
                ></path>
                <path
                  d="M12,5c-7.633,0-9.927,6.617-9.948,6.684L1.946,12l0.105,0.316C2.073,12.383,4.367,19,12,19s9.927-6.617,9.948-6.684 L22.054,12l-0.105-0.316C21.927,11.617,19.633,5,12,5z M12,17c-5.351,0-7.424-3.846-7.926-5C4.578,10.842,6.652,7,12,7 c5.351,0,7.424,3.846,7.926,5C19.422,13.158,17.348,17,12,17z"
                ></path>
              </svg>
              <!-- hide -->
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
              >
                <path
                  d="M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757C12.568 16.983 12.291 17 12 17c-5.351 0-7.424-3.846-7.926-5 .204-.47.674-1.381 1.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379-.069.205-.069.428 0 .633C2.073 12.383 4.367 19 12 19zM12 5c-1.837 0-3.346.396-4.604.981L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657.069-.205.069-.428 0-.633C21.927 11.617 19.633 5 12 5zM16.972 15.558l-2.28-2.28C14.882 12.888 15 12.459 15 12c0-1.641-1.359-3-3-3-.459 0-.888.118-1.277.309L8.915 7.501C9.796 7.193 10.814 7 12 7c5.351 0 7.424 3.846 7.926 5C19.624 12.692 18.76 14.342 16.972 15.558z"
                ></path>
              </svg>
            </template>
          </vs-input>
        </div>
        <div class="d-flex w-100 justify-content-between align-items-center">
          <vs-checkbox
            v-model="isRemember"
            class="mt-2 "
            color="rgb(84, 160, 255)"
          >
            remember me
          </vs-checkbox>
        </div>
        <div class="d-flex w-100 justify-content-between align-items-center">
          <vs-button
            type="submit"
            class="mt-2"
            color="rgb(84, 160, 255)"
            block
            flat
            :loading="isLoading"
            >login</vs-button
          >
        </div>
      </form>
      <div
        class="d-flex w-100 flex-row justify-content-center align-items-center"
      >
        <vs-button
          class="mt-2 w-50"
          transparent
          color="rgb(84, 160, 255)"
          block
        >
          forgot password?
        </vs-button>
        <vs-button
          class="mt-2 w-50"
          to="/register"
          transparent
          color="rgb(84, 160, 255)"
          block
        >
          Don't have an account?
        </vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      isLoading: false,
      showPassword: false,
      isRemember: false
    };
  },
  methods: {
    submit() {
      this.isLoading = true;
      const user = {
        username: this.username,
        password: this.password
      };
      axios({
        method: "post",
        url: "http://localhost:5000/api/v1/users/login",
        data: user
      }).then(result => {
        if (result.status === 200) {
          this.isLoading = false;
          if (result.data.success) {
            if (this.isRemember) {
              localStorage.setItem("token", result.data.token);
              localStorage.setItem("openToken", result.data.openToken);
              this.openNotification(
                "top-right",
                "success",
                "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' style='fill: #ffffff;transform: ;msFilter:;'><path d='M10.998 16L15.998 12 10.998 8 10.998 11 1.998 11 1.998 13 10.998 13z'></path><path d='M12.999,2.999c-2.405,0-4.665,0.937-6.364,2.637L8.049,7.05c1.322-1.322,3.08-2.051,4.95-2.051s3.628,0.729,4.95,2.051 S20,10.13,20,12s-0.729,3.628-2.051,4.95s-3.08,2.051-4.95,2.051s-3.628-0.729-4.95-2.051l-1.414,1.414 c1.699,1.7,3.959,2.637,6.364,2.637s4.665-0.937,6.364-2.637C21.063,16.665,22,14.405,22,12s-0.937-4.665-2.637-6.364 C17.664,3.936,15.404,2.999,12.999,2.999z'></path></svg>",
                6000,
                "logged in",
                "you successfully logged in."
              );
              this.$store.commit("loginCheck");
              this.$router.push("/game");
            } else {
              sessionStorage.setItem("token", result.data.token);
              sessionStorage.setItem("openToken", result.data.openToken);
              this.openNotification(
                "top-right",
                "success",
                "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' style='fill: #ffffff;transform: ;msFilter:;'><path d='M10.998 16L15.998 12 10.998 8 10.998 11 1.998 11 1.998 13 10.998 13z'></path><path d='M12.999,2.999c-2.405,0-4.665,0.937-6.364,2.637L8.049,7.05c1.322-1.322,3.08-2.051,4.95-2.051s3.628,0.729,4.95,2.051 S20,10.13,20,12s-0.729,3.628-2.051,4.95s-3.08,2.051-4.95,2.051s-3.628-0.729-4.95-2.051l-1.414,1.414 c1.699,1.7,3.959,2.637,6.364,2.637s4.665-0.937,6.364-2.637C21.063,16.665,22,14.405,22,12s-0.937-4.665-2.637-6.364 C17.664,3.936,15.404,2.999,12.999,2.999z'></path></svg>",
                6000,
                "logged in",
                "you successfully logged in."
              );
              this.$store.commit("loginCheck");
              this.$router.push("/game");
            }
          } else {
            this.openNotification(
              "top-right",
              "danger",
              "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' style='fill: #ffffff;transform: ;msFilter:;'><path d='M11.001 10H13.001V15H11.001zM11 16H13V18H11z'></path><path d='M13.768,4.2C13.42,3.545,12.742,3.138,12,3.138s-1.42,0.407-1.768,1.063L2.894,18.064 c-0.331,0.626-0.311,1.361,0.054,1.968C3.313,20.638,3.953,21,4.661,21h14.678c0.708,0,1.349-0.362,1.714-0.968 c0.364-0.606,0.385-1.342,0.054-1.968L13.768,4.2z M4.661,19L12,5.137L19.344,19H4.661z'></path></svg>",
              8000,
              "Error",
              result.data.message
            );
          }
        } else {
          console.log("error in login");
        }
      });
    },
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
