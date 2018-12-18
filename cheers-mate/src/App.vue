<template>
  <section class="app-container">
    <header :class="{homeNav: $route.name === 'home'}">
      <nav-bar></nav-bar>
    </header>
    <main>
      <router-view/>
    </main>
    <footer>
      <footer-cmp></footer-cmp>
    </footer>
  </section>
</template>

<script>
import userService from './services/user-service.js';
import navBar from './components/nav-bar.vue';
import footerCmp from './components/footer-cmp.vue';

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

  }, 
  components: {
    navBar,
    footerCmp,
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
header.homeNav {
  position: absolute;
    background-color: #fbfaf82a;
}
      @media(max-width:700px) {
        header.homeNav {
        background-color: var(--main);

        }
      }
</style>
