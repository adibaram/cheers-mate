<template>
    <section>
      <el-card
        class="card cheer-preview-container"
        :body-style="{ padding: '10px' }"
        @click.native="$router.push(`/cheer/${cheer._id}`)"
      >
        <img src="@/assets/img/bgs/mates.jpeg" class="image">
        <div style="padding: 14px;">
          <span class="location">
            <i class="fas fa-map-marker-alt"></i>
            {{cheer.locationName}}
          </span>
          <br>
          <span v-if="cheer.attendees">Spots: {{cheer.attendees.length}} of {{cheer.spots}}</span>
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
  methods: {
    date({ date }) {
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
  }
};
</script>

<style scoped>
.card {
  cursor: pointer;
  height: 100%;
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

</style>
