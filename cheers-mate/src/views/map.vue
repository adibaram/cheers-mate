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
      <div v-html="infoContent"></div>
    </gmap-info-window>
 

      <GmapMarker
        :key="index"
        v-for="(cheer, index) in cheers"
        :position="cheer.position.coordinates"
        :icon="{ url : require('../assets/imgs/cheer-marker.png')}"
        :clickable="true"
        @click="toggleInfo(cheer)"
      />
    </GmapMap>
  </section>
</template>



<script>
import { Vue2GoogleMap } from "vue2-google-maps";
import loadingModal from '../components/loading-modal.vue';

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
          return (`<section class="info-window">
                      <div class="info-header">${cheer.locationName}</div>
                      <div class="info-content">
                          <p>${cheer.date}</p>
                      </div>
                   </section>`);
    },
    loadCheers() {
      this.$store.dispatch({ type: "loadCheers" });
    },
    findCurrLocation() {
      this.$store.dispatch({ type: "findCurrPosition" });
    }
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

<style>
</style>
