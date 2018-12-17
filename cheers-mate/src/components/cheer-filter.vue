<template>
<section class="filter-container">
  <!-- <h2>Look for new people to drink with</h2> -->
  <h2>Find new people to drink with</h2>
    <!-- <h2>Look for events to join</h2> -->
    <div>
      <h4>Look by location</h4>
      <input class="filter-input" placeholder="Tel Aviv" v-model="locationName" @input="updateFilter">
    </div>
    <div>
      <h4>Date</h4>
      <input class="filter-input" onfocus="this.type='date'" type="text" v-model="date" @change="updateFilter">
    </div>


    <div class="filter-buttons">
      <el-button type="warning" v-scroll-to="'#list'" @click.native="updateFilter" icon="el-icon-search" >Search</el-button>

      <!-- <router-link to="/map">
      <el-button type="info" icon="el-icon-location-outline">Look Around</el-button>
      </router-link> -->
    </div> 

</section>
</template>

<script>
const moment = require('moment');

export default {
  data() {
    return {
      locationName: '',
      date: moment().format('DD / MM / YYYY'), 
    };
  },

  methods: {
    updateFilter() {
      let filter = this.filter;
      filter.locationName = this.locationName;
      this.$store.dispatch({ type: "loadFilter", filter });
    },

  },

  computed: {
    filter() {
      return {
        fromDate: moment(this.date).format('X'),
        toDate: moment(this.date).add(24,'hours').format('X'),
      }
    },
  },
};
</script>

<style scoped lang="scss">

input {
  width: 100%;
  border-radius: 5px;
}

.el-button--warning:hover {
  opacity: 1;
}


</style>
