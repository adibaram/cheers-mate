<template>
<section class="filter-container">
    <label>
        <input class="filter-input" placeholder="Look by location" v-model="locationName" @input="updateFilter">
    </label>
    <!-- <label>
        <input type="date" v-model="date" @change="updateFilter">
    </label> -->
    <div class="datepicker-trigger">
      <input
        class="filter-input" 
        type="text"
        id="datepicker-trigger"
        placeholder="Select dates"
        :value="formatDates(dateOne, dateTwo)"
        @change="updateFilter"
      >

      <AirbnbStyleDatepicker
        :trigger-element-id="'datepicker-trigger'"
        :mode="'range'"
        :fullscreen-mobile="true"
        :date-one="dateOne"
        :date-two="dateTwo"
        @date-one-selected="val => { dateOne = val }"
        @date-two-selected="val => { dateTwo = val }"
      />
    </div>
</section>
</template>

<script>
const moment = require('moment');
import format from 'date-fns/format';

export default {
  data() {
    return {
      // filter: {
      //     fromDate: '',
      //     toDate: '',
      // },
      locationName: '',
      date: '',
      dateFormat: 'D MMM',
      dateOne: '',
      dateTwo: '',
      
    };
  },
  methods: {
    updateFilter() {
      let filter = this.filter;
      filter.locationName = this.locationName;
      this.$store.dispatch({ type: "loadFilter", filter });
    },

    formatDates(dateOne, dateTwo) {
      let formattedDates = '';
      if (dateOne) {
        formattedDates = format(dateOne, this.dateFormat);
      }
      if (dateTwo) {
        formattedDates += ' - ' + format(dateTwo, this.dateFormat);
      }
      return formattedDates;
    }
  },

  computed: {
    filter() {
      return {
        fromDate: moment(this.dateOne).format('X'),
        toDate: moment(this.dateTwo).format('X'),
      }
    },
    fromDate() {
      return moment(this.date).format('X');
    },
    toDate() {
      return moment(this.date).add(24,'hours').format('X');
    }
  },

  filters: {
    timest(date) {
      return moment(date).format('X');
    } 
  }
};
</script>

<style lang="scss">

.filter-container {
  width: fit-content;
  padding: 20px;
  /* margin: 0 auto; */

  .filter-input {
    padding: 10px;
    background-color: rgba(228, 224, 224, 0.411);
    font-size: 15px;
    margin: 10px;
  }
}

</style>
