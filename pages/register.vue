<template>
  <div class="mx-2 p-2 bg-white mb-5">
    <h3 class="text-center">register</h3>
    <form @submit.prevent="submit" autocomplete="off">
      <div
        class="d-flex flex-sm-row flex-column justify-content-center align-items-center m-auto"
      >
        <vs-input
          label-placeholder="first name"
          block
          class="input-m"
          v-model="firstName"
          required
        ></vs-input>
        <vs-input
          label-placeholder="last name"
          block
          class="input-m"
          v-model="lastName"
          required
        ></vs-input>
      </div>
      <div
        class="d-flex flex-row justify-content-center align-items-center w-100"
      >
        <vs-input
          label-placeholder="username"
          block
          class="input-m"
          v-model="username"
          required
        ></vs-input>
      </div>
      <div
        class="d-flex flex-row justify-content-center align-items-center w-100"
      >
        <vs-input
          label-placeholder="email"
          block
          class="input-m"
          v-model="email"
          type="email"
          required
        ></vs-input>
      </div>
      <div
        class="d-flex flex-sm-row flex-column justify-content-center align-items-center w-100"
      >
        <vs-input
          label-placeholder="password"
          block
          class="input-m"
          v-model="password"
          id="password"
          :progress="getProgress"
          type="password"
          required
        >
          <template v-if="getProgress === 100" #message-success
            >Secure password</template
          >
        </vs-input>
        <vs-input
          label-placeholder="confirm yout password"
          block
          class="input-m"
          type="password"
          v-model="passwordConfirm"
          required
        >
          <template v-if="passwordConfirm === ''" #message></template>
          <template v-else-if="!passwordMatch" #message-danger
            >Password does not match</template
          >
          <template v-else #message-success>Password match</template>
        </vs-input>
      </div>
      <div class="d-flex flex-row justify-content-center align-items-center">
        <p class="register-footer text-center">
          By clicking submit, you are indicating that you have read and<br />
          acknowledge the
          <a class="link-primary pointer" @click="terms = true"
            >Terms of Service</a
          >
          and
          <a class="link-primary pointer" @click="privacy = true"
            >Privacy Notice</a
          >.
        </p>
      </div>
      <div
        class="d-flex flex-row justify-content-center align-items-center w-100"
      >
        <vs-button
          type="submit"
          flat
          color="rgb(84, 160, 255)"
          block
          ref="button"
          :loading="isLoading"
          >submit</vs-button
        >
      </div>
    </form>
    <div
      class="d-flex flex-row justify-content-center align-items-center w-100"
    >
      <vs-button
        class="mt-2 w-100"
        to="/login"
        transparent
        color="rgb(84, 160, 255)"
        block
      >
        Have an account?
      </vs-button>
    </div>
    <!-- Terms of Service -->
    <vs-dialog scroll overflow-hidden blur width="600px" v-model="terms">
      <template #header>
        <h3>
          Terms of Service
        </h3>
      </template>
      <div class="con-content">
        <p>
          Vuesax (pronounced / vjusacksː /, as view sacks) is a framework of UI
          components created with Vuejs to make projects easily and with a
          unique and pleasant style, vuesax is created from scratch and designed
          for all types of developers from the frontend lover to the backend who
          wants to easily create their visual approach to the end-user We are
          focused on streamlining the work of the programmer by giving
          components created in their entirety and with independent
          customization and very easy to implement, so creativity is in our
          hands but we do not neglect that each project is different both
          visually and in its ecosystem Vuesax does not have a design line such
          as other component frameworks based on Material Design, we believe
          that there are already emaciated frameworks that look visually and in
          UI / UX and we don't want to be one more of the bunch, apart from that
          we love to create and design new experiences and surprise you with new
          elements or details that we can only do by being visually free.
        </p>
      </div>
    </vs-dialog>
    <!-- Privacy Notice -->
    <vs-dialog scroll overflow-hidden blur width="600px" v-model="privacy">
      <template #header>
        <h3>
          Privacy Notice
        </h3>
      </template>
      <div class="con-content">
        <p>
          Vuesax (pronounced / vjusacksː /, as view sacks) is a framework of UI
          components created with Vuejs to make projects easily and with a
          unique and pleasant style, vuesax is created from scratch and designed
          for all types of developers from the frontend lover to the backend who
          wants to easily create their visual approach to the end-user We are
          focused on streamlining the work of the programmer by giving
          components created in their entirety and with independent
          customization and very easy to implement, so creativity is in our
          hands but we do not neglect that each project is different both
          visually and in its ecosystem Vuesax does not have a design line such
          as other component frameworks based on Material Design, we believe
          that there are already emaciated frameworks that look visually and in
          UI / UX and we don't want to be one more of the bunch, apart from that
          we love to create and design new experiences and surprise you with new
          elements or details that we can only do by being visually free.
        </p>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
// import api from "../logic/api";
import axios from "axios";
export default {
  head() {
    return {
      title: "Register"
    };
  },
  data() {
    return {
      terms: false,
      privacy: false,
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      error: "",
      isLoading: false
    };
  },
  computed: {
    passwordMatch() {
      return this.password === this.passwordConfirm;
    },
    getProgress() {
      let progress = 0;

      if (/\d/.test(this.password)) {
        progress += 20;
      }
      if (/(.*[A-Z].*)/.test(this.password)) {
        progress += 20;
      }
      if (/(.*[a-z].*)/.test(this.password)) {
        progress += 20;
      }
      if (this.password.length >= 6) {
        progress += 20;
      }
      if (/[^A-Za-z0-9]/.test(this.password)) {
        progress += 20;
      }
      return progress;
    }
  },
  methods: {
    submit() {
      if (this.passwordMatch) {
        this.isLoading = true;
        const user = {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
          password: this.password
        };
        axios({
          method: "post",
          url: "http://localhost:5000/api/v1/users/register",
          data: user
        }).then(result => {
          this.isLoading = false;
          if (result.status === 200) {
            if (result.data.success === true) {
              this.openNotification(
                "top-right",
                "success",
                "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' style='fill: #ffffff;transform: ;msFilter:;'><path d='M10 15.586L6.707 12.293 5.293 13.707 10 18.414 19.707 8.707 18.293 7.293z'></path></svg>",
                6000,
                "done",
                "you successfully registered now you can use your username and password to login"
              );
              this.$router.push("/login");
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
            console.log("error in register user");
          }
        });
      } else {
        console.log("err");
        this.error = "password not match";
      }
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

<style></style>
