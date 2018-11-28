<template>
<section>
    <label>
        <input placeholder="Look for a Cheer" v-model="filter.locationName" @input="updateFilter">
    </label>
    <!-- <label>
        <input type="date" v-model="filter.date" @change="updateFilter">
    </label> -->
</section>
</template>

<script>
export default {
  data() {
    return {
      filter: {
          date: Date.now()
      }
    };
  },
  methods: {
    updateFilter() {
      let filter = this.filter;
      this.$store.dispatch({ type: "loadFilter", filter });
    }
  }
};
</script>

<style>
</style>
