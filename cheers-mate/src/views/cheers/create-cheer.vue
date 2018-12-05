
<template>
  <section class="add-form">
    <!-- STEP 1 -->
    <section id="step1" class="step1">
      <h5>STEP 1 OF 3</h5>
      <label>
        <h1>Where Do you want to meet up?</h1>
        <gmap-autocomplete @place_changed="setPlace"></gmap-autocomplete>
      </label>
      <label>
        <h1>For how many people?</h1>
        <input type="number" v-model="newCheer.spots">
      </label>
      <el-button
        class="next-step-btn"
        v-scroll-to="'#step2'"
        type="warning"
        @click="submitFirstStep"
        v-if="stepNum===1"
      >Next Step</el-button>
    </section>
    <!-- STEP 2 -->
    <section id="step2">
      <section v-if="stepNum>1" class="step2">
        <h5>STEP 2 OF 3</h5>
        <h1>What will you talk about?</h1>
        <input
          v-model="categoryTxt"
          type="text"
          placeholder="Search for a topic"
          @input="getCategories"
        >
        <div class="categories-holder flex flex-wrap">
          <label v-for="category in categories" :key="category.name">
            <input type="checkbox" :value="category.name" v-model="newCheer.category" hidden>
            <div
              class="category-select"
              :class="{categoryactive : newCheer.category.find((val)=>category.name===val)}"
            >{{category.name}}</div>
          </label>
        </div>

        <!-- <div class="btn-holder" v-if="stepNum===2"> -->
        <!-- <el-button class="next-step-btn" type="warning" @click="prevStep">Prev Step</el-button> -->
        <el-button
          class="next-step-btn"
          type="warning"
          @click="submitSecondStep"
          v-if="stepNum===2"
          v-scroll-to="'#step3'"
        >Next Step</el-button>
        <!-- </div> -->
      </section>
    </section>
    <!-- STEP 3 -->
    <section id="step3">
      <section class="step3" >
        <h5>STEP 3 OF 3</h5>
        <h1>Pick a date and you're done!</h1>
        <el-date-picker v-model="newCheer.date"
                        type="date"
                        placeholder="Select date and time"
                        :picker-options="pickerOptions"></el-date-picker>
        <el-button class="next-step-btn" type="warning" @click="submitCheer">Cheers!</el-button>
      </section>
    </section>
  </section>
</template>

<script>
// v-if="stepNum>2"
import categoriesService from "../../services/categories-service.js";
import cheerService from "../../services/cheer-service.js";

export default {
  data() {
    return {
      stepNum: 1,
      newCheer: {
        date: Date.now(),
        locationName: "",
        position: {
          type: "Point",
          coordinates: {
            lat: 0,
            lng: 0
          }
        },
        address: "",
        desc: "",
        category: [],
        spots: 20,
        img: ""
      },
      categoryTxt: "",
      place: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "Today",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "Tomorrow",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "In Two Days",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 2);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  methods: {
    submitFirstStep() {
      this.newCheer.locationName = this.place.name;
      this.newCheer.address = this.place.formatted_address;
      this.newCheer.position.coordinates.lat = this.place.geometry.location.lat();
      this.newCheer.position.coordinates.lng = this.place.geometry.location.lng();
      this.newCheer.img = this.place.photos[0].getUrl();
      this.stepNum++;
    },
    submitSecondStep() {
      this.stepNum++;
    },
    submitCheer() {
      // cheerService.add(this.newCheer)
      //   .then(cheer =>{
      //     this.$route.push(`/cheer/${cheer._id}`)
      //   })
      console.log("DEBUG::this.newCheer", this.newCheer);
    },
    prevStep() {
      this.stepNum--;
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