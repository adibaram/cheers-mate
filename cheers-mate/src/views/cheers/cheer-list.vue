<template>
  <section id="list" class="cards">
  

      <cheer-preview v-for="cheer in cheers" :key="cheer._id" :cheer="cheer"></cheer-preview>


  </section>
</template>

<script>
import cheerPreview from "../../components/cheer-preview.vue";
import cheerService from "../../services/cheer-service.js";

export default {
  data() {
    return {};
  },
  created() {
    this.loadCheers();
  },
  computed: {
    cheers() {
      return this.$store.getters.getCheers;
    }
  },
  created() {
    let filter = {sortBy: 'date'};
    this.$store.dispatch({ type: "loadFilter", filter });
  },
  updated() {
    this.$store.dispatch({ type: 'setLoading', isLoading: false});
  },
  components: {
    cheerPreview
  }
};

</script>

<style scoped lang="scss">

    .cards {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      // display: -webkit-flex;
      justify-content: center;
      // -webkit-justify-content: center;
      // max-width: 820px;
  }

</style>

