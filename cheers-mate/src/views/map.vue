<template>
  <section>
    <loading-modal></loading-modal>
    <GmapMap
      ref="gmapRef"
      :center="currPosition"
      :zoom="15"
      map-type-id="terrain"
      style="width: 100%; height: 600px">

      <gmap-info-window
      v-if="infoOpened"
      :options="infoOptions" 
      :position="currCheer.position.coordinates"
      :opened="infoOpened" 
      @closeclick="infoOpened=false; infoCurrentKey=null"
      
      >
      <div v-html="infoContent" @click="goToCheer(infoCurrentKey)" class="map-modal"></div>
    </gmap-info-window>
 

      <GmapMarker
        :key="index"
        v-for="(cheer, index) in cheers"
        :position="cheer.position.coordinates"
        :icon="{ url : require('../assets/imgs/cheer-marker.png')}"
        :clickable="true"
        @click="toggleInfo(cheer)"
      />

      <GmapMarker         
        :position="currPosition"
        :icon="{ url : require('../assets/imgs/self-marker.png')}"
        :clickable="false" />

    </GmapMap>
  </section>
</template>



<script>
import { Vue2GoogleMap } from "vue2-google-maps";
import loadingModal from '../components/loading-modal.vue';
const moment = require('moment');

export default {
  data() {
    return {
      currCheer: {},
      infoOpened: false,
      infoCurrentKey: null,
      infoContent: '',
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -30
        }
      },
    };
  },
  computed: {
    cheers() {
      return this.$store.getters.getCheers;
    },
    currPosition() {
      return this.$store.getters.getCurrPosition;
    },
  },
  methods: {
    toggleInfo: function(cheer) {
      console.log('toggleInfo');
      if (this.infoCurrentKey == cheer._id) {
        this.infoOpened = !this.infoOpened
        this.currCheer = {};
      } else {
        this.currCheer = cheer;
        this.infoContent = this.getInfoWindowContent(cheer);
        this.infoCurrentKey = cheer._id
        this.infoOpened = true
      }
    },
    getInfoWindowContent(cheer) {
          var categoriesStr = cheer.category[0];
          if (cheer.category.length > 1) categoriesStr += ' & more...';
          return (`<section class="info-window">
                      <div class="info-header">Let's talk about ${categoriesStr}</span></div>
                      <div class="info-content">
                          <div class="seats-location">
                            <div><i class="fas fa-map-marker-alt"></i> ${cheer.locationName}</div>
                            <div><i class="fas fa-users"></i> ${cheer.attendees.length} of ${cheer.spots}</div>
                          </div>
                          <p><i class="far fa-clock"></i>${moment(cheer.date).format('dddd, ll')}</p>
                      </div>
                   </section>`);
    },
    loadCheers() {
      this.$store.dispatch({ type: "loadCheers" });
    },
    findCurrLocation() {
      this.$store.dispatch({ type: "findCurrPosition" });
    },
    goToCheer(cheerId) {
      console.log('DEBUG::cheerId', cheerId);
      this.$router.push(`/cheer/${cheerId}`);
    },
  },
  created(){
      this.$store.dispatch({ type: 'setLoading', isLoading: true});
  },
  mounted() {
    this.$refs.gmapRef.$mapPromise.then(() => {
      this.loadCheers();
      this.findCurrLocation();
    });
  },
  updated() {
      this.$store.dispatch({ type: 'setLoading', isLoading: false});
  },
  components: {
    Vue2GoogleMap,
    loadingModal
  }
};
</script>

<style lang="scss" scoped>

</style>
