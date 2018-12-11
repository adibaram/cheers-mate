<template>
  <section class="home-page-container">
    <loading-modal></loading-modal>
    <div class="home">
      <!-- <router-link tag="div" to="/cheer/create" class="add-cheer"> -->
        <!-- <h4><i class="fas fa-plus"></i> Create a Cheer</h4> -->
      <!-- </router-link> -->
      <cheer-filter></cheer-filter>
      <!-- <h1 class="head-txt">Wanna meet new mates to drink with?</h1> -->
      <!-- <div class="links-container flex">
        <div class="flex link column">
          <i class="fas fa-heart circle" @click="sortBy('category')" v-scroll-to="'#list'"></i>
          <h3>Categories</h3>
        </div>
        <div class="flex link column">
          <i class="fas fa-calendar-check circle" @click="sortBy('date')" v-scroll-to="'#list'"></i>
          <h3>Date</h3>
        </div>
        <div class="flex link column">
          <i class="fas fa-gift circle"></i>
          <h3>Surprise me!</h3>
        </div> 
      </div> -->
    </div>
    <cheer-list></cheer-list>

  </section>
</template>

<script>
// @ is an alias to /src
import cheerList from './cheers/cheer-list.vue'
import cheerFilter from '../components/cheer-filter.vue'
import loadingModal from '../components/loading-modal.vue';


export default {
  name: 'home',
  components: {
    cheerList,
    cheerFilter,
    loadingModal
  },
  methods: {
    sortBy(sorter) {
      const filter = {
        sortBy: sorter,
      }
      this.$store.dispatch({ type: "loadFilter", filter });
    }
  },
  
};


</script>