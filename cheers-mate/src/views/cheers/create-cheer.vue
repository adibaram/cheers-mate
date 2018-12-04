
<template>
  <section class="add-form">
    <!-- STEP 1 -->
    <section class="step1" v-if="stepNum===1">
      <h5>STEP 1 OF 3</h5>
      <label>
        <h1>Where Do you want to meet up?</h1>
        <gmap-autocomplete @place_changed="setPlace"></gmap-autocomplete>
      </label>
      <label>
        <h1>For how many people?</h1>
        <input type="number" v-model="newCheer.spots">
      </label>
      <el-button type="warning" @click="submitFirstStep">Next Step</el-button>
    </section>
    <!-- STEP 2 -->
    <section calss="step2" v-if="stepNum===2">
      <h5>STEP 2 OF 3</h5>
      <h1>What will you talk about?</h1>
      <input
        v-model="categoryTxt"
        type="text"
        placeholder="Search for a topic"
        @input="getCategories"
      >
      <div class="categories-holder flex flex-wrap">
        <div
          class="category-select"
          v-for="category in categories"
          :key="category.name"
        >{{category.name}}</div>
      </div>
    </section>
    <!-- STEP 3 -->
    <section class="step3" v-if="stepNum===3">
      <h5>STEP 3 OF 3</h5>
      <h1>Pick a date and you're done!</h1>
      <el-date-picker
        v-model="value2"
        type="datetime"
        placeholder="Select date and time"
        :picker-options="pickerOptions1"
      ></el-date-picker>
    </section>
  </section>
</template>

<script>
import categoriesService from "../../services/categories-service.js";
import googleService from "../../services/google-service.js";

export default {
  data() {
    return {
      stepNum: 1,
      categoryTxt: "",
      place: "",
      newCheer: {}
    };
  },
  methods: {
    submitFirstStep() {
        if (!this.place) return;
        this.cheer.locationName = this.place.formatted_address
        debugger
    },
    getCategories() {
      categoriesService.query(this.categoryTxt).then(res => {
        this.categories = res;
      });
    },
    setPlace(place) {
      this.place = place;
      console.log("DEBUG::this.place", this.place);
    }
  },
  created() {
    this.getCategories();
  }
};
</script>

<style>
.category-select {
  padding: 10px;
  margin: 10px;
  border: 1px lightgrey solid;
  border-radius: 20px;
  cursor: pointer;
}

.category-select:hover {
  background-color: rgba(211, 211, 211, 0.249);
}

input {
  width: 500px;
  height: 50px;
  border-radius: 30px;
}

.add-form {
  margin: 15px;
}
</style>
