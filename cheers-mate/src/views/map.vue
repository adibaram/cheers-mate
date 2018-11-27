<template>
  <section>
    <GmapMap
      ref="gmapRef"
      :center="position"
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
    <input type="text" v-model.number="position.lat">
    <input type="text" v-model.number="position.lng">
  </section>
</template>



<script>
import { Vue2GoogleMap } from 'vue2-google-maps'

 export default {
    data() {
         return {
             position: {lat:10,lng:100},
             cheers: [
                {position: {lat:32.0714143,lng:34.78723}}
             ]
         }
     },
    methods: {

        getCurrLocation() {
        if(navigator.geolocation) {
            let latlng = {};
            navigator.geolocation.getCurrentPosition(({coords})=>{
                this.moveTo({lat:coords.latitude,lng:coords.longitude})

            })
            }
        },
        moveTo(latlng) {
            console.log('moving to:', latlng);
            this.position.lat = +latlng.lat;
            this.position.lng = +latlng.lng;
        },
        openPreview(cheer) {
        this.$alert('This is a message', 'Title', {
          confirmButtonText: 'OK',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
    },
    mounted() {

         this.$refs.gmapRef.$mapPromise
            .then(() => {
                this.getCurrLocation();
                })
    },
    components: {
        Vue2GoogleMap
    }
    };
</script>

<style>
</style>
