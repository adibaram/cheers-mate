<template>
    <section class="cheer-details-container">
        {{cheer}}
    </section>
</template>

<script>
// IMPORTS
import cheerService from '../../services/cheer-service.js';

export default {
    data() {
        return {
            cheer: {}, 
            /* {
                _id: utilService.makeId(),
                date,
                location,
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
    }
}
</script>

<style>

</style>
