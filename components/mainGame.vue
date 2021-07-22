<template>
  <div
    id="question"
    class="d-flex flex-column justify-content-between align-items-center mt-4 m-4 p-sm-4"
  >
    <div class="d-flex w-100 mt-2 justify-content-center align-items-center">
      <vs-pagination
        buttons-dotted
        disabled
        class="w-50"
        v-model="currentQuestion"
        :length="questionsLength"
      />
    </div>
    <div
      id="card"
      class="d-flex flex-column w-100 justify-content-between align-items-center"
    >
      <div class="w-75 d-flex flex-row mb-4">
        <p class="badge badge-secondary badge-pill mr-2">
          {{ questions[currentQuestion - 1].category }}
        </p>
        <p class="badge badge-secondary badge-pill mr-2">
          {{ questions[currentQuestion - 1].difficulty }}
        </p>
      </div>
      <div class="d-flex w-75 justify-content-start align-items-center">
        <h3 class="mb-sm-4 w-100">
          {{ questions[currentQuestion - 1].question }}
        </h3>
      </div>
      <div class="w-75 row" @change="change">
        <vs-radio
          v-model="picked"
          v-for="(answer, i) in questions[currentQuestion - 1].answers"
          :val="answer"
          :key="i"
          class="d-flex justify-content-start align-items-center col-sm-6"
        >
          {{ answer }}
        </vs-radio>
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-center w-100">
      <vs-button
        color="rgb(84, 160, 255)"
        @click="previous"
        :disabled="currentQuestion === 1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"
        >
          <path
            d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"
          ></path>
        </svg>
        Previous
      </vs-button>

      <vs-button
        @click="submit"
        v-if="currentQuestion === questionsLength"
        success
        flat
      >
        submit
      </vs-button>

      <vs-button
        color="rgb(84, 160, 255)"
        @click="next"
        :disabled="currentQuestion === questionsLength"
        >next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          style="fill: #ffffff;transform: ;msFilter:;"
        >
          <path
            d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"
          ></path>
        </svg>
      </vs-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questionsLength: this.$store.state.questions.length,
      currentQuestion: 1,
      question: "",
      picked: "",
      results: []
    };
  },
  computed: {
    questions() {
      return this.$store.state.questions;
    }
  },
  methods: {
    change() {
      this.question = this.questions[this.currentQuestion - 1].question;
      const Result = {
        question: this.question,
        client_answer: this.picked,
        correct_answer_hashed: this.questions[this.currentQuestion - 1]
          .correct_answer_hashed
      };
      if (this.results.length !== 0) {
        if (this.results.find(result => result.question === this.question)) {
          this.results.map(result => {
            if (result.question === this.question) {
              result.client_answer = this.picked;
            }
          });
        } else {
          this.results.push(Result);
        }
      } else {
        this.results.push(Result);
      }
    },
    previous() {
      this.picked = "";
      this.question = "";
      this.currentQuestion = this.currentQuestion - 1;
      this.results.forEach(result => {
        if (
          result.question === this.questions[this.currentQuestion - 1].question
        ) {
          this.picked = result.client_answer;
        }
      });
    },
    next() {
      this.picked = "";
      this.question = "";
      this.currentQuestion = this.currentQuestion + 1;
      this.results.forEach(result => {
        if (
          result.question === this.questions[this.currentQuestion - 1].question
        ) {
          this.picked = result.client_answer;
        }
      });
    },
    submit() {
      this.$store.commit("getUserAnswers", this.results);
    }
  }
};
</script>

<style></style>
