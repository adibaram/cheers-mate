<template>
    <section class="nav-bar flex container">
      <div class="nav flex container">
        <router-link to="/" tag="div">
          <h1 class="main-logo"> Cheers🍻</h1>
        </router-link>

        <section class="links">
            <!-- <el-button type="info"  icon="el-icon-location-outline">Around Me</el-button> -->
            <router-link icon="el-icon-location-outline" class="auth-link" to="/map"><i class="fas fa-map-marked-alt"></i></router-link>
          <router-link class="auth-link" to="/cheer/create">Create cheer</router-link>
          
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
      </div>
    </section>


</template>

<script>
import userService from "../services/user-service.js";

export default {
  data() {
    return {
      msgToShow: null,
      logedInUser: []
    };
  },
  computed: {
    currUser() {
      this.logedInUser = this.$store.getters.getUser;
      return this.$store.getters.getUser;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch({ type: "logout" });
      this.$router.push(`/`);
    },
    goProfile() {
      this.$router.push(`/user/${this.logedInUser._id}`);
    }
  },
  created() {
    console.log('nav barrrrrrr');
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

<style lang="scss" scoped>
 .fa-map-marked-alt {
     font-size: 25px;
     margin: 0 5px;
 }
</style>
