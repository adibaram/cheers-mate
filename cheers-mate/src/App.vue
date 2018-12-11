<template>
  <section class="create-cheer-page">
    <header>
      <div class="container">
        <router-link to="/" tag="div">
          <h1 class="main-logo">Cheers🍻</h1>
        </router-link>
        <!-- <el-menu :default-active="activeIndex" background-color="#faf9f7" text-color="#e6a23c" class="el-menu-demo links" mode="horizontal" menu-trigger="click">
        <el-submenu index="1" class="links">
            <template slot="title">Menu</template>
            <el-menu-item index="1-1" router="/cheer/create"><router-link class="auth-link" to="/cheer/create">Create a cheer</router-link></el-menu-item>
            <el-submenu index="1-2">
              <template slot="title"><div class="links sign" v-if="!currUser">
            <router-link class="auth-link" to="/signup">Sign up</router-link>
            <router-link class="auth-link" to="/login">Log in</router-link>
          </div>
          <div class="links logout" v-else>
              <span style="cursor:pointer;" class="el-dropdown-link">Hello {{currUser.nickname}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            </div></template>
              <el-menu-item index="1-2-1"><span @click="goProfile">Profile</span></el-menu-item>
              <el-menu-item index="1-2-2">Other</el-menu-item>
              <el-menu-item index="1-2-3"><span @click="logout">Logout</span></el-menu-item>
            </el-submenu>
        </el-submenu>
        </el-menu>
        <section class="links">   
        </section> -->

        <section class="links">
          <router-link class="auth-link" to="/cheer/create">Create a cheer</router-link>
          
          <div class="links sign" v-if="!currUser">
            <router-link class="auth-link" to="/signup">Sign up</router-link>
            <router-link class="auth-link" to="/login">Log in</router-link>
          </div>
          <div class="links logout" v-else>
            <el-dropdown>
              <span style="cursor:pointer;" class="el-dropdown-link logged-in-greet">Hello {{currUser.nickname}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><span @click="goProfile">Profile</span></el-dropdown-item>
                <el-dropdown-item>Other</el-dropdown-item>
                <el-dropdown-item><span @click="logout">Logout</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            </div>
        </section>
          <!-- <div class="auth-link" @click="logout">logout</div>
          <span>Hello,
            <br>
            {{currUser.nickname}}
          </span> -->

      </div>
    </header>
    <router-view/>
    <footer>

    </footer>
  </section>
</template>

<script>
import userService from './services/user-service.js';

export default {
  sockets: {
    connect() {
      console.log("socket connected");
    },
    customEmit(data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    },
    renderMsg(msg) {
      this.msgToShow = msg;
    },
    userAttended({userId}) {
      console.log('DEBUG::userId', userId);
      userService.getById(userId)
        .then(({user ,cheers}) => {
          const newCheer = cheers[cheers.length-1]; 
          const h = this.$createElement;
          this.$notify({
            title: 'Attendance',
            dangerouslyUseHTMLString: true,
            message: `<span class="notification-content" ><a class="user-link" href="/user/${user._id}">${user.nickname}</a> attended to cheer: <a class="cheer-link" href="/cheer/${newCheer._id}">${newCheer.locationName}</a>!<span>`,
            offset: 50,
          });
        })
        .catch(err=>console.log('DEBUG:userAttended socket App.vue:userId,err', userId,err))
    },

  },
  data: () => ({
    msgToShow: null,
    logedInUser: []
  }),
  computed: {
    currUser() {
      this.logedInUser = this.$store.getters.getUser;
      return this.$store.getters.getUser;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch({ type: "logout" });
      this.$router.push(`/`)
    },
    goProfile() {
      this.$router.push(`/user/${this.logedInUser._id}`)
    },
  },
  created() {

    console.log(
      "DEBUG:store created:sessionStorage.getItem(user)",
      sessionStorage.getItem("user")
    );
    if (sessionStorage.getItem("user"))
      this.$store.dispatch({
        type: "login",
        user: JSON.parse(sessionStorage.getItem("user"))
      });
    else if (localStorage.getItem("user"))
      this.$store.dispatch({
        type: "login",
        user: JSON.parse(localStorage.getItem("user"))
      });

  }
};
</script>



<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
