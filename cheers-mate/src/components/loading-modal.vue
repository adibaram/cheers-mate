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

    position: fixed;
    top: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(85, 78, 78, 0.6);

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
}  
</style>
