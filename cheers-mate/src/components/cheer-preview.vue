<template>
  <section>
    <el-card
      class="card cheer-preview-container"
      :body-style="{ padding: '10px' }"
      @click.native="$router.push(`/cheer/${cheer._id}`)"
      shadow="hover"
    >
      <img src="@/assets/img/bgs/mates.jpeg" ref="previewImg" class="image">
      <div style="padding: 14px;">
        <span class="location">
          <i class="fas fa-map-marker-alt"></i>
          {{cheer.locationName}}
        </span>
        <br><span class="categories" v-for="cat in cheer.category" :key="cat">{{cat}}</span><br>
        <span><i class="fas fa-users"></i> {{spotsLeft}} seats left</span>
        <div class="bottom clearfix">
          <time class="time">{{ date(cheer) }}</time>
          <!-- <el-button type="text" class="button">Operating button</el-button> -->
        </div>
      </div>
      </el-card>

  </section>
</template>

<script>
const moment = require("moment");

export default {
  props: {  
    cheer: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    if (this.cheer.img && this.cheer.img.length) {
      this.$refs.previewImg.src = this.cheer.img;

    }
  },
  computed: {
    spotsLeft() {
      if(!this.cheer.attendees) return this.cheer.spots;
      else return this.cheer.spots - this.cheer.attendees.length;
    },
    relativeDate() {
      return moment(this.cheer.date).fromNow();
    },
    time() {
      return moment(this.cheer.date).format("hh:mm A");
    }
  },
  methods: {
    date({ date }) {
      return moment(date).format("dddd, ll");
    },
    setImg() {
    return `url(${this.cheer.img})`;
    },
  }
};
</script>

<style scoped lang="scss">
.card {
  cursor: pointer;
  height: 100%;
  // height: 300px;
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
  max-width: 100%;
  display: block;
  max-height: 200px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.categories {
    padding: 2px;
    margin: 3px;
    // border: 1px var(--secondary) solid;
    border-radius: 5px;
    box-shadow: 0 0 4px 0 var(--secondary) inset;
    display: inline-block;


}
</style>
