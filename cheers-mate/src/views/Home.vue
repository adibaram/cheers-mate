<template>
  <section class="home-page-container">
    <loading-modal></loading-modal>
    <div class="home">

      <cheer-filter></cheer-filter>
      <!-- <h1 class="desc">Find new people to cheer with</h1> -->

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
  
<style lang="scss" scoped>
  .desc {
    color: white;
    font-size: 60px;
  }
</style>
