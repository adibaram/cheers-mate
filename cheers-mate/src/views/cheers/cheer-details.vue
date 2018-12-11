<template>
    <section class="cheer-details-container">
        <loading-modal></loading-modal>
        <section class="title-attendance-container">
            
            <div class="name-date dark" :style="backgroundImg">
                <div class="date">
                    <span>{{date}}</span>
                </div>
                <span class="location-name">{{cheer.locationName}}</span>
                <br><br><span v-if="cheer.attendees" class="attens-num">{{cheer.attendees.length}} mates comming!</span>
            </div>
    
            
            <div class="attending-share">
                <div class="spot-attendance">
                    <div class="is-going" v-if="!userIsGoing">
                        <h4 class="txt">
                            Are You Going?
                            <span class="spots-left" v-if="cheer.attendees">{{spotsLeft}} Spots left</span>
                        </h4>
                        <el-button class="btn" size="small" type="warning" icon="el-icon-check" @click="userAttending(true)" ></el-button>
                        <el-button class="btn" size="small" type="warning" icon="el-icon-close" @click="userAttending(false)" plain></el-button>
                    </div>
                    <div class="is-going" v-else >
                        <h4 class="txt">
                            You are attending to this cheer!
                            <span class="spots-left" v-if="cheer.attendees">Spots left: {{spotsLeft}}</span>
                        </h4>
                        <el-button class="btn" size="small" type="warning" icon="el-icon-close" @click="userAttending(false)" plain>Cancel</el-button>

                    </div>
                    <div class="share">
                        <span> </span>
                        <i class="fab fa-facebook-square"></i>
                        <i class="fab fa-twitter-square"></i>
                        <i class="fab fa-linkedin"></i>
                    </div>

                    <div class="categories">
                        <h1>We are going to talk about </h1>
                        <h2 v-if="cheer.category" v-for="category in cheer.category" :key="category">{{category}}<br></h2>
                        <h1 v-else>Everything</h1>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="main-info-container">
            <div class="description-attendees">
                <!-- <div class="cover-image">
                    <img :src="(cheer.img)? cheer.img : 'https://via.placeholder.com/250x100'" alt="">
                </div> -->
                <!-- <div class="cheer-description">
                    <h3>Details:</h3>
                    {{cheer.desc}}
                </div> -->
                <section class="cheer-attendees">
                    <h3 v-if="cheer.attendees && cheer.attendees.length"> Attendees:</h3>
                    <h3 v-else>Be the first one to join!</h3>
                    <div class="attendees">
                        <div v-for="user in cheer.attendees" :key="user._id">
                            <user-card class="user-card" :user="user" @click.native="$router.push(`/user/${user._id}`)"></user-card>
                            <!-- <td v-for="prop in user" :key="">{{prop}}</td> -->
                        </div>
                    </div>
                </section>
            </div>

            <!-- <div class="date-time-map" v-if="cheer.position">
                <div class="date-time">
                    <div class="icon"><i class="far fa-clock"></i></div>
                    <div class="info">
                        <div class="date">{{date}}</div>
                        <div>{{time}}</div>
                    </div>
                </div> -->

                <section class="chat">
                    <section class="chat-msg-list">
                    <h1>Let's start talking</h1>
                        <ul class="clean-list">
                            <li v-if="cheer.msgs" v-for="msg in msgs" :key="msg.at">
                                {{msg.from}}: {{msg.txt}}
                            </li>
                        </ul>
                    </section>
                        <form @submit.prevent="sendMsg" ref="chat" >
                            <input ref="newMsgInput" type="text">
                            <button>send</button>
                        </form>
                </section>

        </section>
            <div class="address">
                 <div class="icon"><i class="fas fa-map-marker-alt"></i>{{cheer.address}}</div>
                 <!-- <div class="info">
                    <div class="street">{{cheer.address}}</div>
                    <div class="city">{{cheer.position}}</div>
                </div> -->
                </div>
            <div class="map">
                <img :src="mapPic" alt="map"/>
            </div>        
    </section>
</template>

<script>
// IMPORTS
import cheerService from '../../services/cheer-service.js';
import userCard from '../../components/user-card.vue';
import userService from '../../services/user-service.js';
import loadingModal from '../../components/loading-modal.vue';

const moment = require('moment');

export default {
    data() {
        return {
            cheer: {
                position: {
                    coordinates:{}
                }
            }, 
        }
    },
    created() {
        this.loadCheer();
        this.$socket.emit('joinRoom', this.$route.params.cheerId);
        this.$store.dispatch({ type: 'setLoading', isLoading: true});


    },

    methods: {
        loadCheer() {
            var cheerId = this.$route.params.cheerId;
            cheerService.getById(cheerId)
                .then(res => {
                    console.log('this cheer:', res)
                    this.$store.dispatch({ type: 'setLoading', isLoading: false});

                    return this.cheer = res;
                });
        },
        userAttending(isAttending) {
            const cheerId = this.$route.params.cheerId;
            const currUser = this.$store.getters.getUser;
            var userId;
            if(currUser) {
                userId = currUser._id;
                if (isAttending) {
                    this.$socket.emit('userAttending',{userId, cheerId})
                } else {
                    const idx = this.cheer.attendees.findIndex(user=>user._id === userId)
                    if (idx >= 0) {
                        cheerService.removeAttendance(cheerId)
                            .then(()=>this.loadCheer());
                        
                    }
                }
            } else {
                this.$router.push('/login');
            }
        },
        sendMsg() {
            // GET MSG
            const msgInput = this.$refs.newMsgInput;
            const txt = msgInput.value;
            if (!txt.trim()) return;

            // DECLARATION
            const cheerId = this.$route.params.cheerId;
            const currUser = this.$store.getters.getUser;
            const from = (currUser)? currUser.nickname : 'Guest';
            const userId = (currUser)? currUser._id : '';
            const msg = {
                userId, 
                txt, 
                at: Date.now(), 
                from
            };

            // LET THE WORLD KNOW
            this.$socket.emit('newChatMsg' , {msg,cheerId});
            msgInput.value = '';

        },

    },
    computed: {
        date() {
            return moment(this.cheer.date).format('dddd, LL');
        },
        relativeDate() {
            return moment(this.cheer.date).fromNow();
        },
        spotsLeft() {
            return this.cheer.spots - this.cheer.attendees.length
        },
        time() {
            return moment(this.cheer.date).format('hh:mm A');
        },
        mapPic() {
            return `https://maps.googleapis.com/maps/api/staticmap?center=${this.cheer.position.coordinates.lat},${this.cheer.position.coordinates.lng}&markers=color:red%7Clabel:C%7C${this.cheer.position.coordinates.lat},${this.cheer.position.coordinates.lng}&zoom=16&size=600x400&key=AIzaSyDSpb5jrUSIDb124D7Qpjd4XJQ6d8oVPW0`
        },
        msgs() {
            var msgs = this.cheer.msgs;
            // msgs.forEach(msg=> {
            //     userService.getById(msg.userId).then(user=> msg.from = user.nickname); 
            // })
            return msgs;
        },
        userIsGoing() {
            const currUser = this.$store.getters.getUser;
            var userId;
            if(currUser && this.cheer.attendees) userId = currUser._id;
            else return false;
            const idx = this.cheer.attendees.findIndex(user=>user._id === userId);
            if (idx >= 0) return true;
            else return false;

        },
        backgroundImg() {
            if (!this.cheer.img) return `background-image: url(https://moneycrashers-sparkchargemedia.netdna-ssl.com/wp-content/uploads/2017/08/bachelor-party-bar-drinks-1024x576.jpg)`;
            else return `background-image: url(${this.cheer.img})`;
        },
        enableChat() {
            return (!this.$store.getters.getUser)? true : false;   
        }
    },

    components: {
        userCard,
        loadingModal,
    },

    sockets: {
        gotNewChatMsg(msg) {
            if (!this.cheer.msgs) this.cheer.msgs = [msg];
            else this.cheer.msgs.push(msg);
        },
        updateCheer(){
            this.loadCheer();
        }
    }
};
</script>

<style scoped lang="scss">

    .chat {
        border: 1px solid rgba(128, 128, 128, 0.157);
        border-radius: 10px;
        width: 400px;
        margin-left: 100px;
        padding: 30px;
        margin: 20px;

        display:flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #fff;

        input , button{
            padding: 10px;
        }
    }

    .attendees {
        display: flex;
        flex-wrap: wrap;
    }

    .main-info-container {
        display: flex;
        justify-content: space-between;
        max-width: 90vw;
    }

    .chat-msg-list {
        max-height: 400px;
        overflow-y: scroll;
    }

</style>
