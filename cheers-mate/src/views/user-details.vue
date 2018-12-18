<template>
    <section class="user-details-container">
        <div class="user-header flex">
            <img  v-if="user" :src="(user.img)? user.img : require('@/assets/img/users/user.png')" max-height="150px" class="user-image">
            <h1>{{user.fullName}}, {{user.age}}</h1>
        </div>

        <div class="user-details-cheers">
        <h1 v-if="!userCheers.length">No events to show yet</h1>

        <h1 class="events-headline" v-if="upcomingEvents">Upcoming events</h1>
        <section class="cards" v-for="cheer in userCheers" :key="cheer.date" v-if="cheer.date > currDate">
            <div class="cheer-card">
                <cheer-preview :cheer="cheer"></cheer-preview>
            </div>
        </section>

        <h1 class="events-headline" v-if="pastEvents">Past events</h1>
         <section class="cards" v-for="cheer in userCheers" v-if="cheer.date < currDate" :key="cheer._id">
    
                <cheer-preview :cheer="cheer"></cheer-preview>

        </section>
        </div>
        <!-- <pre>{{user}}</pre> -->

        <div class="user-contact"></div>
    </section>
</template>

<script>

import userService from "../services/user-service.js";
import cheerPreview from "../components/cheer-preview.vue";

export default {
  created() {
    this.loadUser()
        .then(res => {
            this.checkEvents();
        })

  },
  data() {
    return {
      user: {},
      userCheers: [],
      currDate: Date.now(),
      pastEvents: false,
      upcomingEvents: false
    };
  },
  methods: {
    loadUser() {
      var userId = this.$route.params.userId;
      return userService.getById(userId).then(res => {
        this.user = res.user;
        this.userCheers = res.cheers;
        console.log(res.cheers);
        console.log(this.currDate);

      });
    },
    checkEvents() {
        for (let i = 0; i < this.userCheers.length; i++ ) {
            let currCheer = this.userCheers[i];
            if (currCheer.date > this.currDate) this.upcomingEvents = true;
            if (currCheer.date < this.currDate) this.pastEvents = true;            
        }
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

    .events-headline {
        margin-left: 18px;
        font-weight: bold;
        text-decoration: underline;
    }

    @media (max-width: 550px) {
        .user-header {
            flex-direction: column;
            
        }

        .user-header h1 {
            font-size: 30px;
        }

        .user-header img {
            max-height: 170px;
        }
    }
</style>
    
