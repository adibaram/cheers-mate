<template>
    <section class="user-details-container">
        <pre>{{user}}</pre>
        <div class="user-header flex">
            <img :src="(user.img)? user.img : require('@/assets/img/users/user.png')" max-height="150px" class="user-image">
            <h1>{{user.fullName}}, {{user.age}}</h1>
        </div>


    </section>
</template>

<script>
import userService from '../services/user-service.js';

export default {
    created() {
        this.loadUser();
    },
    data() {
        return {
            user: {},
            userCheers: {}
        }
    },
    methods: {
    loadUser() {
        var userId = this.$route.params.userId;
        console.log('loading user');
        userService.getById(userId)
            .then(res => {
                console.log(res)
                return this.user = res.user
                       this.userCheers = res.cheers
         });
        },      
    }
}
</script>
    
<style scoped lang="scss">

</style>
