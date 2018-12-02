

<template>
    <section class="login-page-container">
        <form @submit.prevent="checkUser" class="flex column">
            <label> User Name
                <input v-model="user.nickname" type="text" required>
            </label>
            <label> Password
                <input v-model="user.password" type="password" required>
            </label>
            <button class="login">Login</button>
        </form>
    </section>
</template>

<script>

import authService from '../services/auth-service.js'
export default {
    data() {
        return {
            user: {
                nickname: '',
                password: ''
            }
        }
    },

    methods: {
        checkUser() {
            let user = this.user;
            this.$store.dispatch({type: 'login', user})
                .then(()=> this.$router.push('/'))
                .catch(err => {
                    console.log('err', err);
                })


            // authService.checkUser(this.user)
            //     .then(user => {
            //         console.log('logged in')
            //         this.$store.dispatch({type: 'login', user})
            //         this.$router.push('/');
            //     })
            //     .catch( err => {
            //         console.log('err', err);
            //     })
        }
    }
}

</script>

<style>
    .login button {
        width: 100px;
    }
</style>
