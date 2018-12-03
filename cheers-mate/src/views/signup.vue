<template>
    <section class="signup-page-container container darken-pseudo darken-with-text">

        <form @submit.prevent="createUser" class="signup flex column">
            <h3>New around?</h3><br>
            <label> 
                <input v-model="newUser.fullName" placeholder="Full Name" type="text" required>
            </label>
            <label> 
                <input v-model="newUser.nickname" placeholder="User Name" type="text" required>
            </label>
            <label> 
                <input v-model="newUser.email" placeholder="Email" type="text">
            </label>
            <label> 
                <input v-model="newUser.password" placeholder="Password" type="password" required>
            </label>
            <label class="upload-photo"> Add photo
                <input type="file" ref="img">
            </label>
            <button type="submit">Sign Up</button>
        </form>     
    </section>    
</template>

<script>

import userService from '../services/user-service.js'
import cloudinaryService from '../services/cloudinary-service.js';

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
            cloudinaryService.uploadImg(this.$refs.img)
                .then(url => {
                    console.log('DEBUG::url', url);
                    this.newUser.img = url;
                    this.$store.dispatch({type: 'signup', user: this.newUser})
                        .then(()=> this.$router.push('/'));
                })

            // userService.add(this.newUser)
            //     .then(user => this.$router.push('/'))
        }
    }
}
</script>


<style scoped lang="scss">

    button {
        width: 100px;
        justify-content: center;
        color: white;
        background-color: #e6a23c;
        border-color: #e6a23c;
        align-self: center;
        margin-top:40px;


        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        -webkit-appearance: none;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        -webkit-transition: .1s;
        transition: .1s;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
    }

    button:hover {
        background: #ebb563;
        border-color: #ebb563;
        color: #fff;
    }

    input {
        width: 300px;
        height: 30px;
        border-radius: 5px;
        opacity: 0.9;
        padding-left: 10px;
    }


  
</style>