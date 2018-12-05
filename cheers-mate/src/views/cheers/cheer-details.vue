<template>
    <section class="cheer-details-container">
        <section class="title-attendance-container">
            <div class="name-date">
                <div class="date">
                    <span>{{date}}</span>
                </div>
                <span class="location-name">{{cheer.locationName}}</span>
            </div>
            
            <div class="attending-share">
                <div class="spot-attendance">
                    <div class="is-going">
                        <h4 class="txt">
                            Are You Going?
                            <span class="spots-left" v-if="cheer.attendees">Spots left: {{spotsLeft}}</span>
                        </h4>
                        <el-button class="btn" size="small" type="primary" icon="el-icon-check"></el-button>
                        <el-button class="btn" size="small" type="primary" icon="el-icon-close" plain></el-button>
                    </div>
                    <div class="share">
                        <span>Share: </span>
                        <i class="fab fa-facebook-square"></i>
                        <i class="fab fa-twitter-square"></i>
                        <i class="fab fa-linkedin"></i>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="main-info-container">
            <div class="description-attendees">
                <div class="cover-image">
                    <img :src="(cheer.img)? cheer.img : 'https://via.placeholder.com/250x100'" alt="">
                </div>
                <div class="cheer-description">
                    <h3>Details:</h3>
                    {{cheer.desc}}
                </div>
                <section class="cheer-attendees">
                    <h3 v-if="cheer.attendees"> Attendees:</h3>
                    <h3 v-else>Be the first one to join!</h3>
                    <div class="attendees">
                        <div v-for="user in cheer.attendees" :key="user._id">
                            <user-card class="user-card" :user="user" @click.native="$router.push(`/user/${user._id}`)"></user-card>
                            <!-- <td v-for="prop in user" :key="">{{prop}}</td> -->
                        </div>
                    </div>
                </section>
            </div>

            <div class="date-time-map" v-if="cheer.position">
                <div class="date-time">
                    <div class="icon"><i class="far fa-clock"></i></div>
                    <div class="info">
                        <div class="date">{{date}}</div>
                        <div>{{time}}</div>
                    </div>
                </div>
                <div class="address">
                    <div class="icon"><i class="fas fa-map-marker-alt"></i></div>
                    <div class="info">
                        <div class="street">{{cheer.position}}</div>
                        <div class="city">{{cheer.position}}</div>
                    </div>
                </div>
                <div class="map">
                    <img :src="mapPic" alt="map"/>
                </div>
            </div>
            
        </section>

        <br>
        <br>
        <hr>
        <hr>
        {{cheer}}
    </section>
</template>

<script>
// IMPORTS
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
};
</script>

<style >
 
</style>
