<template>
    <section class="cheer-details-container">
        <section class="title-attendance-container">
            <div class="name-date">
                <div class="date">
                    <span>{{relativeDate}} //// {{date}}</span>
                </div>
                <span>{{cheer.locationName}}</span>
            </div>
            
            <div class="spot-attendance">
                <div class="spots-left" v-if="cheer.attendees">Spots left: {{spotsLeft}}</div>
            </div>
        </section>
        
        <section class="main-info-container">
            <div class="description-attendees">
                <div class="cover-image">
                    <img src="https://via.placeholder.com/250x100" alt="">
                </div>
                <div class="cheer-description">
                    Details:
                    {{cheer.desc}}
                </div>
                <section class="cheer-attendances">
                    <h3>Attendance:</h3>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in cheer.attendees" :key="">
                                <td v-for="prop in user" :key="">{{prop}}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>

            <div class="date-time-map">
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
                    <img src="https://via.placeholder.com/250x150" alt="map">
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
                .then(cheer => this.cheer = cheer.cheer);
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
        }
    }
};
</script>

<style>

</style>
