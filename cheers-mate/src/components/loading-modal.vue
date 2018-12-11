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
    background-color: rgba(255, 255, 255, 0.6);

    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
