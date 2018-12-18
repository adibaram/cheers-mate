
<template>


  <section class="add-form">
    <!-- STEP 1 -->
    <section id="step1" class="step1">
      <div>
        <img src="@/assets/img/icons/placeholder.png" height="80px">
        <h5>STEP 1 OF 3</h5>
      </div>

        <h1>Select a cool bar for your meet up</h1>
        <gmap-autocomplete @place_changed="setPlace"></gmap-autocomplete>

        <h1>For how many people?</h1>
        <input type="number" v-model="newCheer.spots">

      <el-alert
        class="fill-alert"
        v-if="showErr"
        title="Error"
        type="error"
        description="Please select a location"
        show-icon>
      </el-alert>      
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
        <div>
          <img src="@/assets/img/icons/chat.png" height="80px">
          <h5>STEP 2 OF 3</h5>
        </div>
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
      <section class="step3" v-if="stepNum>2">
        <div>
          <img src="@/assets/img/icons/calendar.png" height="80px">
          <h5>STEP 3 OF 3</h5>
        </div>
        <h1>Pick a date and you're done!</h1>
        <el-date-picker v-model="newCheer.date"
                        type="datetime"
                        class="el-date-picker"
                        format="dd/MM HH:mm"
                        placeholder="Select date and time"
                        :picker-options="pickerOptions"></el-date-picker>
        <el-button class="next-step-btn" type="warning" @click="submitCheer">Cheers!</el-button>
      </section>
    </section>
    <input type="file" ref="gURLtoCloudinary" hidden>
  </section>
</template>

<script>
// 
import categoriesService from "../../services/categories-service.js";
import cheerService from "../../services/cheer-service.js";

export default {
  data() {
    return {
      stepNum: 1,
      showErr: false,
      newCheer: {
        date: Date.now(),
        locationName: '',
        cheerCreator: '',
        position: {
          type: "Point",
          coordinates: {
            lat: 0,
            lng: 0
          }
        },
        address: '',
        desc: '',
        category: [],
        spots: 20,
        img: '',
        msgs: []
      },
      categoryTxt: '',
      place: '',
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
      console.log(this.place.geometry)

      if (this.place.geometry === undefined) { 
        this.showErr = true;
        return
      } else {
        this.showErr = false;
      }

      this.newCheer.locationName = this.place.name;
      this.newCheer.address = this.place.formatted_address;
      this.newCheer.position.coordinates.lat = this.place.geometry.location.lat();
      this.newCheer.position.coordinates.lng = this.place.geometry.location.lng();
      this.newCheer.cheerCreator = this.$store.getters.getUser;
      delete this.newCheer.cheerCreator.password;
      this.newCheer.spots = +this.newCheer.spots;
      this.newCheer.attendees = [];
      this.stepNum++;
      this.newCheer.img = this.place.photos[0].getUrl();
      
    },
    submitSecondStep() {
      this.stepNum++;
    },
    submitCheer() {
      cheerService.add(this.newCheer)
        .then(cheer =>{
          // USER MSG
          this.$notify({
              title: 'Cheer Created Successfully!',
              message: 'Going to cheer\'s page...',
              type: 'success',
              offset: 50,
          });
          this.$router.push(`/cheer/${cheer._id}`)
        })
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
      console.log({place})
      // debugger
      console.log({place, 'place.photos[0].getUrl()': place.photos[0].getUrl()});
      this.place = place;
      this.showErr = false;
      console.log("DEBUG::this.place", this.place);
    }
  },
  created() {
    this.getCategories();
    if (!this.$store.getters.getUser) this.$router.push('/login');
  }
};
</script>