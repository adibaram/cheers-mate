<template>
<section>
  <header>
    <div class="container">
      <router-link to="/" tag="div">
        <h1 class="main-logo">Cheers🍻</h1>
      </router-link>
      <div class="links">
        <!-- <router-link to="/cheer">Cheers</router-link> -->
        <!-- <router-link to="/about">About</router-link> -->
      </div>
      <div class="links" v-if="!currUser">
        <router-link class="router" to="/signup">Sign up</router-link>
        <router-link class="router" to="/login">Log in</router-link>
      </div>
      <div class="logout" v-else>
        <span>Hello, {{currUser.nickname}}</span>
        <button @click="logout">logout</button>
      </div>
    </div>
  </header>
  <router-view/>
  </section>
</template>

<script>
export default {
  computed: {
    currUser() {
      return this.$store.getters.getUser
    }
  },
  methods: {
    logout() {
      this.$store.dispatch({type: 'logout'})
    }
  },
  created() {
    console.log('DEBUG:store created:sessionStorage.getItem(user)', sessionStorage.getItem('user'));
    if (sessionStorage.getItem('user')) this.$store.dispatch({type: 'login', user: JSON.parse(sessionStorage.getItem('user'))});
    else if (localStorage.getItem('user')) this.$store.dispatch({type: 'login', user: JSON.parse(localStorage.getItem('user'))});
  }
}
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
