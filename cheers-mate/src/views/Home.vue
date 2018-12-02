<template>
  <section class="home-page-container">
    <div class="home">
      <!-- <router-link tag="div" to="/cheer/create" class="add-cheer"> -->
        <!-- <h4><i class="fas fa-plus"></i> Create a Cheer</h4> -->
      <!-- </router-link> -->
      <!-- <h1>Look for events near you</h1> -->
      <cheer-filter></cheer-filter>
      <div class="links-container flex">
        <div class="flex link column">
          <i class="fas fa-heart circle"></i>
          <h3>Categories</h3>
        </div>
        <div class="flex link column">
          <i class="fas fa-calendar-check circle" @click="sortByDate" v-scroll-to="'#list'"></i>
          <h3>Date</h3>
        </div>
        <div class="flex link column">
          <i class="fas fa-gift circle"></i>
          <h3>Surprise me!</h3>
        </div> 
      </div>
    </div>
    <cheer-list></cheer-list>

  </section>
</template>

<script>
// @ is an alias to /src
import cheerList from './cheers/cheer-list.vue'
import cheerFilter from '../components/cheer-filter.vue'


export default {
  name: 'home',
  components: {
    cheerList,
    cheerFilter
  },
  methods: {
    sortByDate() {
      const filter = {
        sortBy: 'date',
      }
      this.$store.dispatch({ type: "loadFilter", filter });
    }
  }
};


</script>