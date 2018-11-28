<template>
    <section class="cheer-details-container">
        <section class="title-attendance-container">
            <div class="name-date">
                <div class="date">
                    <span>{{relativeDate}} //// {{date}}</span>
                </div>
                <span>Location Name {{cheer.locationName}}</span>
            </div>
            
            <div class="spot-attendance">
                <div class="spots-left" v-if="cheer.attendance">Spots left: {{spotsLeft}}</div>
            </div>
        </section>
        
        <section class="main-info-container">
            <div class="cheer-description">
                Cheer Subject:
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
                        <tr v-for="user in cheer.attendance" :key="">
                            <td v-for="prop in user" :key="">{{prop}}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
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
                .then(cheer => this.cheer = cheer);
        },
    },
    computed: {
        date() {
            return moment(this.cheer.date).format('MMMM Do YYYY');
        },
        relativeDate() {
            return moment(this.cheer.date).fromNow();
        },
        spotsLeft() {
            return this.cheer.spots - this.cheer.attendance.length
        }
    }
};
</script>

<style>

</style>
