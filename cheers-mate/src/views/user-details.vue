<template>
    <section class="user-details-container">
        <div class="user-header flex">
            <img  v-if="user" :src="(user.img)? user.img : require('@/assets/img/users/user.png')" max-height="150px" class="user-image">
            <h1>{{user.fullName}}, {{user.age}}</h1>
        </div>

        <div class="user-details-cheers">
        <h1 v-if="!userCheers.length">No events to show yet</h1>

            <h1>Upcoming events</h1>
            <section class="cards" v-for="cheer in userCheers" :key="cheer._id">
                <div class="cheer-card" v-if="cheer.date > currDate">
                    <cheer-preview :cheer="cheer"></cheer-preview>
                </div>
            </section>

            <section class="cards" v-for="cheer in userCheers" :key="cheer._id">
                <div class="cheer-card" v-if="cheer.date < currDate">
                <h1>Past events</h1>
                    <cheer-preview :cheer="cheer"></cheer-preview>
                </div>
            </section>
        </div>
        <pre>{{user}}</pre>

        <div class="user-contact"></div>
    </section>
</template>

<script>

import userService from "../services/user-service.js";
import cheerPreview from "../components/cheer-preview.vue";

export default {
  created() {
    this.loadUser();
  },
  data() {
    return {
      user: {},
      userCheers: [],
      currDate: Date.now()
    };
  },
  methods: {
    loadUser() {
      var userId = this.$route.params.userId;
      userService.getById(userId).then(res => {
        this.user = res.user;
        this.userCheers = res.cheers;
        console.log(res.cheers);
        console.log(this.currDate);

      });
    }
  },
  components: {
    cheerPreview
  }
};
</script>
    
<style lang="scss" scoped>
    .cheer-card {
        width: 250px;
        height: 300px;    
    }
</style>
    
