<template>
  <div>
    <h3 class="text-center">register</h3>
    <form @submit.prevent="submit" autocomplete="off">
      <div
        class="d-flex flex-row justify-content-center align-items-center w-100 m-auto"
      >
        <vs-input
          label-placeholder="first name"
          block
          class="input-m"
          v-model="firstName"
        ></vs-input>
        <vs-input
          label-placeholder="last name"
          block
          class="input-m"
          v-model="lastName"
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
        ></vs-input>
      </div>
      <div
        class="d-flex flex-row justify-content-center align-items-center w-100"
      >
        <vs-input
          label-placeholder="password"
          block
          class="input-m"
          v-model="password"
          id="password"
          :progress="getProgress"
          type="password"
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
        <vs-button type="submit" success flat block>submit</vs-button>
      </div>
    </form>
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
      error: ""
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
          if (result.status === 200) {
            if (result.data.success === true) {
              console.log("ok");
            } else {
              console.log("not ok");
            }
          } else {
            console.log("error in register user");
          }
        });
      } else {
        console.log("err");
        this.error = "password not match";
      }
    }
  }
};
</script>

<style></style>
