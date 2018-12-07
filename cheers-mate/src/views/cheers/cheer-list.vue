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
    let filter = {sortBy: 'date'};
    this.$store.dispatch({ type: "loadFilter", filter });
  },
  components: {
    cheerPreview
  }
};
</script>

