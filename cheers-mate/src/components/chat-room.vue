<template>
  <section class="chat">
    <section class="chat-msg-list">
      <h1>Let's start talking</h1>
      <ul class="clean-list">
        <li v-if="msgs" v-for="msg in msgs" :key="msg.at" class="msg">{{msg.from}}: {{msg.txt}}</li>
        <span ref="endOfChat" id="end-of-chat"> </span>
      </ul>
    </section>
    <form @submit.prevent="sendMsg" ref="chat">
      <input v-scroll-to="'#end-of-chat'" ref="newMsgInput" type="text">
      <button>send</button>
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
        this.scrollToEnd();
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
            const endOfChat = this.$refs.endOfChat;
            endOfChat.scrollTop = endOfChat.scrollHeight;
        },
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
        height: 50vh;

        display:flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #fff;

        input , button{
            padding: 10px;
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

</style>
