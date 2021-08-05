<template>
  <div
    v-if="categorys.length > 0"
    class="d-flex flex-column px-sm-3 p-2 py-3 bg-white justify-content-center align-items-center"
  >
    <h4>select</h4>
    <form
      @submit.prevent="submit"
      v-if="categorys.length > 0"
      autocomplete="off"
    >
      <div
        class="mt-4 d-flex flex-column w-100 justify-content-center align-items-center"
      >
        <vs-input
          type="number"
          label-placeholder="Number of Questions"
          v-model="numberOfQuestions"
          block
          required
        ></vs-input>
      </div>
      <div
        class="mt-4 d-flex flex-column w-100 justify-content-center align-items-center"
      >
        <vs-select
          v-if="categorys.length > 0"
          label-placeholder="Select Category"
          v-model="selectCategory"
          block
          filter
          required
        >
          <vs-option label="Any Category" value="any">
            Any Category
          </vs-option>
          <vs-option
            v-for="(category, i) in categorys"
            :key="i"
            :label="category.name"
            :value="category.name"
          >
            {{ category.name }}
          </vs-option>
        </vs-select>
      </div>
      <div
        class="mt-4 d-flex flex-row w-100 justify-content-center align-items-center"
      >
        <vs-select
          placeholder="Select"
          v-model="difficulty"
          block
          label-placeholder="select difficulty"
        >
          <vs-option label="Any difficulty" value="any">
            Any difficulty
          </vs-option>
          <vs-option label="Easy" value="easy">
            Easy
          </vs-option>
          <vs-option label="Medium" value="medium">
            Medium
          </vs-option>
          <vs-option label="Hard" value="hard">
            Hard
          </vs-option>
        </vs-select>
      </div>
      <div
        class="mt-4 d-flex flex-row w-100 justify-content-center align-items-center"
      >
        <vs-select
          placeholder="Select"
          v-model="type"
          block
          label-placeholder="select type"
        >
          <vs-option label="Any type" value="any">
            Any type
          </vs-option>
          <vs-option label="True or False" value="tf">
            True or False
          </vs-option>
          <vs-option label="Multiple Choise" value="mc">
            Multiple Choise
          </vs-option>
        </vs-select>
      </div>
      <div
        class="d-flex flex-column w-100 justify-content-center align-items-center"
      >
        <vs-button
          :loading="isLoading"
          type="submit"
          id="game-btn"
          class="mt-4"
          flat
          block
        >
          start
        </vs-button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      numberOfQuestions: "",
      selectCategory: "",
      categorys: [],
      difficulty: "",
      type: "",
      isLoading: false
    };
  },
  methods: {
    submit() {
      this.isLoading = true;
      // const bUrl = "https://opentdb.com/api.php?&encode=base64"
      const amount = this.numberOfQuestions ? this.numberOfQuestions : "";
      const category = this.selectCategory ? this.selectCategory : "";
      const difficulty = this.difficulty ? this.difficulty : "";
      const type = this.type ? this.type : "";
      const token = localStorage.getItem("openToken")
        ? localStorage.getItem("openToken")
        : sessionStorage.getItem("openToken")
        ? sessionStorage.getItem("openToken")
        : "";
      // const url = bUrl + amount + category + difficulty + type;
      if (
        this.numberOfQuestions === "" ||
        this.selectCategory === "" ||
        this.difficulty === "" ||
        this.type === ""
      ) {
        this.openNotification(
          "top-right",
          "warn",
          "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' style='fill: #ffffff;transform: ;msFilter:;'><path d='M11.001 10H13.001V15H11.001zM11 16H13V18H11z'></path><path d='M13.768,4.2C13.42,3.545,12.742,3.138,12,3.138s-1.42,0.407-1.768,1.063L2.894,18.064 c-0.331,0.626-0.311,1.361,0.054,1.968C3.313,20.638,3.953,21,4.661,21h14.678c0.708,0,1.349-0.362,1.714-0.968 c0.364-0.606,0.385-1.342,0.054-1.968L13.768,4.2z M4.661,19L12,5.137L19.344,19H4.661z'></path></svg>",
          5000,
          "empty input",
          "pleas fill out all fields."
        );
        this.isLoading = false;
      } else {
        axios({
          method: "post",
          url: "http://localhost:5000/api/v1/questions/get",
          headers: {
            "auth-token": localStorage.getItem("token")
              ? localStorage.getItem("token")
              : sessionStorage.getItem("token")
              ? sessionStorage.getItem("token")
              : ""
          },
          data: {
            amount: Number(amount),
            difficulty: difficulty,
            type: type,
            category: category,
            token: token
          }
        }).then(result => {
          this.isLoading = false;
          this.getQuestions(result.data);
          // console.log(result.data);
        });
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
    },
    getQuestions(e) {
      this.$store.commit("setQuestions", e);
    }
  },
  mounted() {
    axios({
      method: "get",
      url: "https://opentdb.com/api_category.php"
    }).then(result => {
      if (result.status === 200) {
        if (result.data.trivia_categories) {
          this.categorys = result.data.trivia_categories;
        } else {
          console.log("cant find any trivia_categories");
        }
      } else {
        console.log("error in fetch category");
      }
    });
  }
};
</script>

<style></style>
