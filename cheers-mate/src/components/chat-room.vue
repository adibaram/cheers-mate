<template>
  <section class="chat">
    <section class="chat-msg-list" ref="chatList">
      <h1>Let's start talking</h1>
      <ul class="clean-list">
        <li v-for="msg in msgs" :key="msg.at" class="msg">{{msg.from}}: {{msg.txt}}</li>
        <span ref="endOfChat" id="end-of-chat"> </span>
      </ul>
    </section>
    <form @submit.prevent="sendMsg" ref="chat">
      <input v-scroll-to="'#end-of-chat'" ref="newMsgInput" type="text">
      <button><i class="chat-send fas fa-location-arrow"></i></button>
    </form>
  </section>
</template>

<script>
export default {
    props: {
        msgs: {
            type: Array,
            default: ()=>[],
        }
    },
    mounted() {
        // this.scrollToEnd();
        window.refs = this.$refs
    },
    methods: {
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
        scrollToEnd() {   	
            const elChatList = this.$refs.chatList;
            elChatList.scrollTop = elChatList.scrollHeight - elChatList.clientHeight;
        },
    },
    watch: {
        'msgs.length'(length, prevLength) {
            console.log({length, prevLength})
            if (prevLength === 0) this.$nextTick().then(() => this.scrollToEnd())
        }
    }
};
</script>

<style scoped lang="scss">
    .chat {
        border: 1px solid rgba(128, 128, 128, 0.157);
        border-radius: 10px;
        // width: 400px;
        width: 40%;
        margin-left: 100px;
        padding: 15px;
        margin: 20px;
        height: 50vh;

        display:flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #fff;
        form {
            display: flex;
            justify-content: center;
            align-items: center;
            input {
                border-radius: 5px;
                padding: 10px;
                height: 44px;
                
                &:focus {
                    outline: 0;
                }
            }
            button {
                border-radius: 50%;
                height: 44px;
                width: 44px;
                text-align: center;
                border: 0;
                background-color: #e6a23c;
                &:active {
                    background-color: darken(#e6a23c,10%);
                }
                &:focus {
                    outline: 0;
                }
            }

            .chat-send {
                transform: rotate(45.5deg);
                font-size: 17px;
                color: var(--main);
            }
        }
        .chat-msg-list {
            height: inherit;
            overflow-y: auto;
            word-break: break-all;
            &:hover {
                overflow-y: scroll;
            }
            .msg {
                margin: 0px 5px 10px 0px;
            }
        }
    }

    @media (max-width: 750px) {
        .chat {
            opacity: 0;
            position: fixed;
            top: 0;
            right: -100%;
            transition: .5s;
            height: 96%;
            width: 96%;

            &.open {
                opacity: 1;
                // top: 50px;
                margin: 2%;
                right:unset;
                z-index: 1;
            }
        }
    }
</style>
