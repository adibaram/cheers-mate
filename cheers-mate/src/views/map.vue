<template>
  <section>
    <!-- <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
    </label> -->
    <GmapMap
      ref="gmapRef"
      :center="currPosition"
      :zoom="15"
      map-type-id="terrain"
      style="width: 100%; height: 600px"
    >
      <GmapMarker
        :key="index"
        v-for="(cheer, index) in cheers"
        :position="cheer.position"
        :icon="{ url : require('../assets/imgs/cheer-marker.png')}"
        :clickable="true"
        @click="openPreview(cheer)"
      />
    </GmapMap>
  </section>
</template>



<script>
import { Vue2GoogleMap } from "vue2-google-maps";

export default {
  data() {
    return {};
  },
  computed: {
    cheers() {
      return this.$store.getters.getCheers;
    },
    currPosition() {
      return this.$store.getters.getCurrPosition;
    }
  },
  methods: {
    // getCurrLocation() {
    //     this.moveTo(currPosition);
    // },
    // moveTo(latlng) {
    //     console.log('moving to:', latlng);
    //     this.position.lat = +latlng.lat;
    //     this.position.lng = +latlng.lng;
    // },
    openPreview(cheer) {
      this.$alert(cheer.desc, cheer.locationName, {
        confirmButtonText: "OK",
        callback: action => {
          this.$message({
            type: "info",
            message: `action: ${action}`
          });
        }
      });
    },
    loadCheers() {
      this.$store.dispatch({ type: "loadCheers" });
    },
    findCurrLocation() {
      this.$store.dispatch({ type: "findCurrPosition" });
    }
  },
  mounted() {
    this.$refs.gmapRef.$mapPromise.then(() => {
      this.loadCheers();
      this.findCurrLocation();
    });
  },
  components: {
    Vue2GoogleMap
  }
};
</script>

<style>
</style>
