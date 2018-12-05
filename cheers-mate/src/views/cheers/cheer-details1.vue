<template>
    <section class="cheer-container">
        <div class="cheer-header">
            <span class="location-name">{{cheer.locationName}}</span>
        </div>
        <div class="cheer-body flex">
            <div class="cheer-detailes"></div>
            <div class="cheer-chat"></div>
        </div>


    </section>
</template>

<script>

import cheerService from '../../services/cheer-service.js';
import userCard from '../../components/user-card.vue';
const moment = require('moment');

export default {
    data() {
        return {
            cheer: {}, 
            /* {
                _id: utilService.makeId(),
                date,
                position,
                locationName: _getLocationName(location),
                attendance,
                desc,
                spots,
                language,


            } */
        }
    },
    created() {
        this.loadCheer();
    },
    methods: {
        loadCheer() {
            var cheerId = this.$route.params.cheerId;
            cheerService.getById(cheerId)
                .then(res => {
                    return this.cheer = res
                });
        },
    },
    computed: {
        date() {
            return moment(this.cheer.date).format('dddd, LL');
        },
        relativeDate() {
            return moment(this.cheer.date).fromNow();
        },
        spotsLeft() {
            return this.cheer.spots - this.cheer.attendees.length
        },
        time() {
            return moment(this.cheer.date).format('hh:mm A');
        },
        mapPic() {
            return `https://maps.googleapis.com/maps/api/staticmap?center=${this.cheer.position.coordinates.lat},${this.cheer.position.coordinates.lng}&markers=color:red%7Clabel:C%7C${this.cheer.position.coordinates.lat},${this.cheer.position.coordinates.lng}&zoom=16&size=600x400&key=AIzaSyDSpb5jrUSIDb124D7Qpjd4XJQ6d8oVPW0`
        }
    },

    components: {
        userCard,
    }
}
</script>

<style>

</style>
