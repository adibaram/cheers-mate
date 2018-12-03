<template>
    <section class="signup-page-container">
        <form @submit.prevent="createUser" class="flex column">
            <label> Full Name
                <input v-model="newUser.fullName" type="text" required>
            </label>
            <label> Nickname
                <input v-model="newUser.nickname" type="text" required>
            </label>
            <label> Email
                <input v-model="newUser.email" type="text">
            </label>
            <label> Password
                <input v-model="newUser.password" type="password" required>
            </label>
            <label> Age
                <input type="number" v-model="newUser.age" min="1" max="200">
            </label>
            <label> Gender
                <select v-model="newUser.gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="unknown">None of the above</option>
                </select>
            </label>
            <label> Your photo
                <input type="file" ref="img">
            </label>
            <button type="submit" class="signup">Sign Up</button>
        </form>     
    </section>    
</template>

<script>

import userService from '../services/user-service.js'
import {uploadImg} from '../services/cloudinary-service.js';

export default {
    data() {
        return {
            newUser: {
                nickname: '',
                email: '',
                password: '',
                fullName: '', 
                gender: '',
                age: null,
                img: null,
            },
        }
    },
    methods: {
        createUser() {
            console.log('creating user');
            uploadImg(this.$refs.img)
                .then(url => {
                    console.log('DEBUG::url', url);
                    this.newUser.img = url;
                    console.log('DEBUG::this.newUser', this.newUser);
                    this.$store.dispatch({type: 'signup', user: this.newUser})
                        .then(()=> this.$router.push('/'))
                        .catch(err=>{
                            console.log('DEBUG:CANT CREATE USER:err', err);
                        })
                })
                .catch(err => {
                    console.log('DEBUG:CANT UPLOAD IMG:err', err);
                })

            // userService.add(this.newUser)
            //     .then(user => this.$router.push('/'))
        }
    }
}
</script>

<style scoped lang="scss">
.signup-page-container form{
    text-align: center;
}
    button.signup {
        width: 100px;
        margin: 0 auto;
    }
</style>
