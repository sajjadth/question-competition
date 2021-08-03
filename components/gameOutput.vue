<template>
  <div class="d-flex flex-column justify-content-center alignitems-center">
    <div
      v-if="isDone"
      id="done"
      class="p-2 w-100 d-flex flex-column justify-content-center align-items-center"
    >
      <p>
        yout answerd {{ results.result }} and your point is {{ results.point }}
      </p>
      <vs-button color="danger" block @click="$store.commit('close')"
        >close</vs-button
      >
    </div>
    <!-- <vs-button flat v-if="!active" @click="active = !active"
      >see details</vs-button
    >
    <vs-button flat v-else @click="active = !active">close details</vs-button>
    <vs-alert
      solid
      closable
      v-model="active"
      class="m-1"
      v-for="(result, i) in results.results"
      :key="i"
      :color="result.correct ? 'success' : 'danger'"
    >
      <template #icon>
        <svg
          v-if="result.correct"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          style="fill: #ffffff;transform: ;msFilter:;"
        >
          <path
            d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"
          ></path>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          style="fill: #ffffff;transform: ;msFilter:;"
        >
          <path
            d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"
          ></path>
        </svg>
      </template>
      <template #title color>
        <p v-if="result.correct">correct</p>
        <p v-else>incorrect</p>
      </template>
      <p>{{ result.question }}</p>
      <p>yout answer: {{ result.yourAnswer }}</p>
    </vs-alert> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isDone: false
    };
  },
  computed: {
    answers() {
      return this.$store.state.userAnswers;
    },
    results() {
      return this.$store.state.userResults;
    }
  },
  mounted() {
    this.isDone = false;
    const loading = this.$vs.loading({
      // background: "dark",
      // color:"#fff",
      type: "points",
      text: "processing..."
    });
    axios({
      method: "post",
      url: "http://localhost:5000/api/v1/questions/compare",
      headers: {
        "auth-token": localStorage.getItem("token")
          ? localStorage.getItem("token")
          : sessionStorage.getItem("token")
          ? sessionStorage.getItem("token")
          : ""
      },
      data: this.answers
    }).then(result => {
      if (result.status === 200) {
        this.$store.commit("getUserResults", result.data);
        this.isDone = true;
        loading.close();
      } else {
        this.isDone = true;
        console.log("error in fetch compare");
      }
    });
  }
};
</script>

<style></style>
