<template>
    <section class="signuo-page-container">
        <form @submit.prevent="createUser" class="flex column">
            <label> Full Name
                <input v-model="newUser.fullName" type="text" required>
            </label>
            <label> User Name
                <input v-model="newUser.nickname" type="text" required>
            </label>
            <label> Email
                <input v-model="newUser.email" type="text">
            </label>
            <label> Password
                <input v-model="newUser.password" type="password" required>
            </label>
            <label> Your photo
                <input type="file">
            </label>
            <button type="submit" class="signup">Sign Up</button>
        </form>     
    </section>    
</template>

<script>

import userService from '../services/user-service.js'

export default {
    data() {
        return {
            newUser: {
                nickname: '',
                email: '',
                password: '',
                fullName: '', 
                gender: '',
                age: null
            }
        }
    },
    methods: {
        createUser() {
            console.log('creating user');
            this.$store.dispatch({type: 'signup', user: this.newUser})
                .then(()=> this.$router.push('/'));

            // userService.add(this.newUser)
            //     .then(user => this.$router.push('/'))
        }
    }
}
</script>

<style>
    .signup button {
        width: 100px;
    }
</style>
