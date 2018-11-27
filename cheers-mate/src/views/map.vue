<template>
  <section>
    <GmapMap
      ref="gmapRef"
      :center="position"
      :zoom="15"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
      <!-- <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      />-->
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
             position: {lat:10,lng:100}
         }
     },
    methods: {
        getCurrLocation() {
        console.log('finding current location...');
        var geocoder = new google.maps.Geocoder();

        if(navigator.geolocation) {
            let loc = {};
            navigator.geolocation.getCurrentPosition(position=>{
                this.position.lat = +position.coords.latitude;
                this.position.lng = +position.coords.longitude;
            })
            // var latlng = new google.maps.LatLng(loc.lat, loc.lng);
            // geocoder.geocode({'latLng': latlng}, function(results, status) {
            //     console.log('DEBUG::status', status);
            //     if(status == google.maps.GeocoderStatus.OK) {
            //         console.log(results[0]['formatted_address']);
            //     };
            // })
            }
        }
    },
    mounted() {

         this.$refs.gmapRef.$mapPromise
            .then((map) => {
                this.getCurrLocation();
        //         // console.log('DEBUG::this.position', this.position);
        //         // map.panTo(loc);
                })
    },
    components: {
        Vue2GoogleMap
    }
    };
</script>

<style>
    #gmap {
        height: 400px;
        width: 100%;
    }
</style>
