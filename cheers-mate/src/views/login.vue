

<template>
    <section class="login-page-container">
        <form @submit.prevent="checkUser" class="flex column">
            <label> User Name
                <input v-model="user.nickname" type="text" required>
            </label>
            <label> Password
                <input v-model="user.password" type="password" required>
            </label>
            <label> Remember login?
                <input type="checkbox" v-model="rememberPref">
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
            },
            rememberPref: false,
        }
    },

    methods: {
        checkUser() {
            let user = this.user;
            let rememberPref = this.rememberPref;
            this.$store.dispatch({type: 'login', user , rememberPref})
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
