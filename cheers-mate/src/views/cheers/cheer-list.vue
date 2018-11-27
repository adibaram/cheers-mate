<template>
    <section class="cheer-list-container">
        <cheer-preview class="card" v-for="cheer in cheers" 
                    :key="cheer._id" :cheer="cheer" 
                    @click.native="$router.push(`/cheer/${cheer._id}`)"
        >{{cheer.locationName}}</cheer-preview>
    </section>
</template>

<script>
import cheerPreview from '../../components/cheer-preview.vue';
import cheerService from '../../services/cheer-service.js';

export default {
    data() {
        return {
            cheers: [],
        }
    },
    created() {
        this.loadCheers();
    },
    methods: {
        loadCheers() {
            return cheerService.query()
                .then(cheers => {
                    this.cheers = cheers;
                    console.log(cheers);
                });
        }
    },

    components: {
        cheerPreview,
    }
}
</script>

<style>

</style>
