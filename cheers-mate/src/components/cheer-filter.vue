<template>
<section class="filter-container">
  <h2>Look for new people to drink with</h2>
    <!-- <h2>Look for events to join</h2> -->
    <div>
        <input class="filter-input" placeholder="Look by location" v-model="locationName" @input="updateFilter">
    </div>
    <div>
        <input class="filter-input" placeholder="Date" onfocus="(this.type='date')" type="text" v-model="date" @change="updateFilter">
    </div>


    <div class="filter-buttons">
      <el-button type="warning" v-scroll-to="'#list'" @click.native="updateFilter" >Search</el-button>

      <router-link to="/map">
      <el-button type="info">Look Around</el-button>
      </router-link>
    </div> 

</section>
</template>

<script>
const moment = require('moment');

export default {
  data() {
    return {
      // filter: {
      //     fromDate: '',
      //     toDate: '',
      // },
      locationName: '',
      date: '',
      // dateFormat: 'D MMM',
      // dateOne: '',
      // dateTwo: '',
      
    };
  },

  methods: {
    updateFilter() {
      let filter = this.filter;
      filter.locationName = this.locationName;
      this.$store.dispatch({ type: "loadFilter", filter });
    },

    // formatDates(dateOne, dateTwo) {
    //   let formattedDates = '';
    //   if (dateOne) {
    //     formattedDates = format(dateOne, this.dateFormat);
    //   }
    //   if (dateTwo) {
    //     formattedDates += ' - ' + format(dateTwo, this.dateFormat);
    //   }
    //   // this.updateFilter();
    //   return formattedDates;
    // }
  },

  computed: {
    filter() {
      return {
        fromDate: moment(this.date).format('X'),
        toDate: moment(this.date).add(24,'hours').format('X'),
      }
    },
    // fromDate() {
    //   return moment(this.date).format('X');
    // },
    // toDate() {
    //   return moment(this.date).add(24,'hours').format('X');
    // }
  },
};
</script>

<style scoped lang="scss">

input {
  height: 30px;
  width: 300px;
  border-radius: 5px;
}

.el-button--warning:hover {
  opacity: 1;
}


</style>
