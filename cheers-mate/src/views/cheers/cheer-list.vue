<template>
  <section class="cheer-list-container grid" id="list">
  
    <div class="cards" v-for="cheer in cheers" :key="cheer._id">
      <cheer-preview :cheer="cheer"></cheer-preview>
    </div>

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
    let filter = {};
    this.$store.dispatch({ type: "loadFilter", filter });
  },
  components: {
    cheerPreview
  }
};
</script>

<style scoped lang="scss">
.cheer-list-container {
  margin: 20px;
  // display: flex;
  // flex-wrap: wrap;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: auto;
    grid-gap: 1rem;

  .cards {
    width: 250px;
    height: 300px;
    margin-bottom: 10px;
  }

}
</style>
