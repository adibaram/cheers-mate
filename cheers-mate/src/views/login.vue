

<template>
    <section class="login-page-container container darken-pseudo darken-with-text">
        <form @submit.prevent="checkUser" class="flex column">
            <h3>Login</h3><br>
            <label>
                <input v-model="user.nickname" type="text" placeholder=" User Name" required>
            </label>
            <label>
                <input v-model="user.password" placeholder="Password" type=" password" required>
            </label>
            <label> Remember login?
                <input type="checkbox" v-model="rememberPref">
            </label>
            <button type="submit" class="login">Login</button>
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

<style scoped lang="scss">
    
    button {
        width: 100px;
        justify-content: center;
        color: white;
        background-color: #e6a23c;
        border-color: #e6a23c;
        align-self: center;
        margin-top: 50px;


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
