<template>
  <section>
    <header>
      <div class="container">
        <router-link to="/" tag="div">
          <h1 class="main-logo">Cheers🍻</h1>
        </router-link>
        <div class="links" v-if="!currUser">
          <router-link class="auth-link" to="/signup">Sign up</router-link>
          <router-link class="auth-link" to="/login">Log in</router-link>
        </div>
        <div class="links logout" v-else>
          <el-dropdown>
            <span class="el-dropdown-link">Hello {{currUser.nickname}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Profile</el-dropdown-item>
              <el-dropdown-item>Other Shit</el-dropdown-item>
              <el-dropdown-item><span @click="logout">Logout</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <div class="auth-link" @click="logout">logout</div>
          <span>Hello,
            <br>
            {{currUser.nickname}}
          </span> -->
        </div>
      </div>
    </header>
    <router-view/>
  </section>
</template>

<script>
export default {
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    customEmit: function(data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    }
  },
  computed: {
    currUser() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch({ type: "logout" });
    }
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
