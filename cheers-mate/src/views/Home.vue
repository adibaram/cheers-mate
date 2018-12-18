<template>
  <section class="home-page-container">
    <loading-modal></loading-modal>
    <div class="home">

      <cheer-filter></cheer-filter>
      <!-- <h1 class="desc">Find new people to cheer with</h1> -->

    </div>
    <!-- <el-button-group class="display-btns">
        <el-button type="warning" icon="el-icon-menu"></el-button>
        <el-button type="warning" icon="el-icon-location"></el-button>
    </el-button-group> -->

      <!-- <div>
    <el-radio-group text-color="#ffffff" fill="#e6a23c" v-model="radio3">
      <el-radio-button type="warning" label="list"></el-radio-button>
      <el-radio-button type="warning" label="map"></el-radio-button>
    </el-radio-group>
  </div> -->
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
  data() {
    return {
      radio3: 'list'
    }
  },

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

  .display-btns {
      margin: auto;
      padding: 10px;
      display: flex;
      align-content: center;
      flex-wrap: wrap;
      width: fit-content;
  }
</style>
