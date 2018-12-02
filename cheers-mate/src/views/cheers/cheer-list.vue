<template>
    <section id="list">
      <!-- <cheer-filter></cheer-filter> -->
        
        <!-- <el-autocomplete
            v-model="state4"
            :fetch-suggestions="querySearchAsync"
            placeholder="Search Cheer"
            @select="handleSelect"
        ></el-autocomplete> -->

        
        <!-- <div class="cheer-list-container">
        <cheer-preview class="card" v-for="cheer in cheers" 
                    :key="cheer._id" :cheer="cheer" 
                    @click.native="$router.push(`/cheer/${cheer._id}`)"
        >{{cheer.locationName}}</cheer-preview>
        </div> -->

    
        <el-row>
            <el-col v-for="cheer in cheers" :key="cheer._id" >
                <cheer-preview :cheer="cheer"></cheer-preview>
            </el-col>
        </el-row>

        

    </section>
</template>

<script>
import cheerPreview from "../../components/cheer-preview.vue";
import cheerService from "../../services/cheer-service.js";
import cheerFilter from '../../components/cheer-filter.vue';
const moment = require('moment');

export default {
  data() {
    return {
      currentDate: new Date()
    };
  },
  created() {
    this.loadCheers();
  },
  computed:{
    cheers() {
      return this.$store.getters.getCheers;
    }
  },
  methods: {
    date({date}) {
      return moment(date).format("dddd, LL");
    },
    relativeDate() {
      return moment(this.cheer.date).fromNow();
    },
    spotsLeft() {
      return this.cheer.spots - this.cheer.attendees.length;
    },
    time() {
      return moment(this.cheer.date).format("hh:mm A");
    }
  },
  created() {
    let filter = {};
    this.$store.dispatch({type:'loadFilter', filter  })
  },
  components: {
    cheerPreview,
    cheerFilter
  }
};
</script>

<style>
.card {
  cursor: pointer;
  max-width:33%;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

input {
  height: 30px;
  width: 300px;
  border-radius: 5px;
}

span .location {
}

</style>
