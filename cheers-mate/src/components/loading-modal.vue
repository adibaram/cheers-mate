<template>
    <section v-if="isLoading" class="loading-modal-container">
        <div class="loading-background"></div>
        <div class="loading-img">
            <img src="../assets/imgs/loadingbeer.gif" alt="Loading.." />
        </div>
    </section>
</template>

<script>
export default {
    computed: {
        isLoading() {
            return this.$store.getters.getIsLoading;
        }
    }
}
</script>

<style scoped lang="scss">
.loading-modal-container {
    // .loading-background {
    //     height: inherit;
    //     width: inherit;
    // }
    position: fixed;
    top: 90px;
    height: calc(100vh - 90px);
    width: 100vw;
    background-color: rgba(85, 78, 78, 0.6);

    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 700px) {
        .loading-modal-container {
            top: 50px;
            height: calc(100vh - 50px);
        }
    }
}  
</style>
