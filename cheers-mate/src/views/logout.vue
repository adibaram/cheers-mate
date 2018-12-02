<template>
    
</template>

<script>
import authService from '../services/auth-service.js'
export default {
    data() {
        return {

        }
    }, 
    methods: {
        logout() {
            authService.logout(this.user)
                .then(user => {
                    console.log('logged out');
                    this.$router.push('/');
                })
                .catch( err => {
                    console.log('err', err);
                })
        }
    }
}
</script>

<style>

</style>
