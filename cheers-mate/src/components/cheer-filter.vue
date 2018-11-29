<template>
<section>
    <label>
        <input placeholder="Look for a Cheer" v-model="locationName" @input="updateFilter">
    </label>
    <label>
        <input type="date" v-model="date" @change="updateFilter">
    </label>
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

<style>
</style>
