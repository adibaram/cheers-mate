<template>
    <section class="cheer-preview-container">
        <h3>{{cheer.locationName}}</h3>
        <h5>{{cheer.location}}</h5>
        <h4 v-if="cheer.attendees">Spots: {{cheer.attendees.length}} of {{cheer.spots}}</h4>
    </section>

    



</template>

<script>
export default {
    props: {
        cheer: {
            type: Object,
            default: {},
        }
    },


}
</script>

<style scoped>
    .cheer-preview-container {
        padding: 20px;
        background-color: wheat;
    }
</style>
