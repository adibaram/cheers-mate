(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0587846c"],{"20d6":function(t,e,s){"use strict";var n=s("5ca1"),a=s("0a49")(6),i="findIndex",r=!0;i in[]&&Array(1)[i](function(){r=!1}),n(n.P+n.F*r,"Array",{findIndex:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),s("9c6c")(i)},5507:function(t,e,s){},"55ce":function(t,e,s){},"63a3":function(t,e,s){"use strict";var n=s("5507"),a=s.n(n);a.a},"83bc":function(t,e,s){},c0bc:function(t,e,s){"use strict";var n=s("83bc"),a=s.n(n);a.a},d6c5:function(t,e,s){"use strict";var n=s("55ce"),a=s.n(n);a.a},d9c0:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"cheer-details-container"},[s("loading-modal"),s("section",{staticClass:"title-attendance-container"},[s("div",{staticClass:"name-date dark",style:t.backgroundImg},[s("div",{staticClass:"date"},[s("span",[t._v(t._s(t.date))])]),s("span",{staticClass:"location-name"},[t._v(t._s(t.cheer.locationName))]),s("br"),s("br"),t.cheer.attendees?s("span",{staticClass:"attens-num"},[t._v(t._s(t.cheer.attendees.length)+" mates comming!")]):t._e()]),s("div",{staticClass:"attending-share"},[s("div",{staticClass:"spot-attendance"},[t.userIsGoing?s("div",{staticClass:"is-going"},[s("h4",{staticClass:"txt"},[t._v("\n            You are attending to this cheer!\n            "),t.cheer.attendees?s("span",{staticClass:"spots-left"},[t._v("Spots left: "+t._s(t.spotsLeft))]):t._e()]),s("el-button",{staticClass:"btn",attrs:{size:"small",type:"warning",icon:"el-icon-close",plain:""},on:{click:function(e){t.userAttending(!1)}}},[t._v("Cancel")])],1):s("div",{staticClass:"is-going"},[s("h4",{staticClass:"txt"},[t._v("\n            Are You Going?\n            "),t.cheer.attendees?s("span",{staticClass:"spots-left"},[t._v(t._s(t.spotsLeft)+" Spots left")]):t._e()]),s("el-button",{staticClass:"btn",attrs:{size:"small",type:"warning",icon:"el-icon-check"},on:{click:function(e){t.userAttending(!0)}}}),s("el-button",{staticClass:"btn",attrs:{size:"small",type:"warning",icon:"el-icon-close",plain:""},on:{click:function(e){t.userAttending(!1)}}})],1),s("div",{staticClass:"share"},[s("social-sharing",{inlineTemplate:{render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("network",{attrs:{network:"facebook"}},[s("i",{staticClass:"fab fa-facebook-square"})]),s("network",{attrs:{network:"linkedin"}},[s("i",{staticClass:"fab fa-linkedin"})]),s("network",{attrs:{network:"twitter"}},[s("i",{staticClass:"fab fa-twitter-square"})]),s("network",{attrs:{network:"whatsapp"}},[s("i",{staticClass:"fab fa-whatsapp-square"})])],1)},staticRenderFns:[]}})],1)]),s("div",{staticClass:"categories"},[s("h1",[t._v("We are going to talk about")]),t._l(t.cheer.category,function(e){return t.cheer.category?s("h2",{key:e},[t._v("\n          "+t._s(e)+"\n          "),s("br")]):s("h1",[t._v("Everything")])})],2)])]),s("section",{staticClass:"main-info-container"},[s("div",{staticClass:"description-attendees"},[s("section",{staticClass:"cheer-attendees"},[t.cheer.attendees&&t.cheer.attendees.length?s("h3",[t._v(" Attendees ("+t._s(t.cheer.attendees.length)+")")]):s("h3",[t._v("Be the first one to join!")]),s("div",{staticClass:"attendees"},t._l(t.cheer.attendees,function(e){return s("div",{key:e._id},[s("user-card",{staticClass:"user-card",attrs:{user:e},nativeOn:{click:function(s){t.$router.push("/user/"+e._id)}}})],1)}))])])]),s("chat-room",{attrs:{msgs:t.msgs}}),s("button",{staticClass:"chat-toggle",on:{click:t.toggleChat}}),s("section",{staticClass:"cheer-location flex column"},[s("div",{staticClass:"address"},[s("div",{staticClass:"icon"},[s("i",{staticClass:"fas fa-map-marker-alt"}),t._v("\n        "+t._s(t.cheer.address)+"\n      ")])]),s("div",{staticClass:"map"},[s("img",{attrs:{src:t.mapPic,alt:"map"}})])])],1)},a=[],i=(s("20d6"),s("cadf"),s("551c"),s("097d"),s("2670")),r=s("1a56"),c=(s("2d82"),s("2929")),o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"chat"},[s("section",{ref:"chatList",staticClass:"chat-msg-list"},[s("h1",[t._v("Let's start talking")]),s("div",{staticClass:"clean-list"},[t._l(t.msgs,function(e){return s("chat-msg",{key:e.at,staticClass:"msg",class:t.myMsg(e)},[s("span",{staticClass:"msg-from",attrs:{slot:"from"},slot:"from"},[t._v(t._s(e.from))]),s("span",{attrs:{slot:"txt"},slot:"txt"},[t._v(t._s(e.txt))])])}),s("span",{ref:"endOfChat",attrs:{id:"end-of-chat"}})],2)]),s("form",{ref:"chat",on:{submit:function(e){return e.preventDefault(),t.sendMsg(e)}}},[s("input",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:"#end-of-chat",expression:"'#end-of-chat'"}],ref:"newMsgInput",attrs:{type:"text"}}),t._m(0)])])},l=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("button",[s("i",{staticClass:"chat-send fas fa-location-arrow"})])}],h=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"msg-container"},[s("div",{staticClass:"msg"},[t._t("from"),t._v(":\n        "),t._t("txt")],2)])},d=[],u={},f=u,g=(s("63a3"),s("2877")),m=Object(g["a"])(f,h,d,!1,null,"12512510",null);m.options.__file="chat-msg.vue";var p=m.exports,v={props:{msgs:{type:Array,default:function(){return[]}}},methods:{sendMsg:function(){var t=this.$refs.newMsgInput,e=t.value;if(e.trim()){var s=this.$route.params.cheerId,n=this.$store.getters.getUser,a=n?n.nickname:"Guest",i=n?n._id:"",r={userId:i,txt:e,at:Date.now(),from:a};this.$socket.emit("newChatMsg",{msg:r,cheerId:s}),t.value="",this.scrollToEnd()}},scrollToEnd:function(){var t=this.$refs.chatList;t.scrollTop=t.scrollHeight-t.clientHeight},myMsg:function(t){if(this.$store.getters.getUser&&t.from===this.$store.getters.getUser.nickname)return"my-msg"}},watch:{"msgs.length":function(t,e){var s=this;console.log({length:t,prevLength:e}),0===e&&this.$nextTick().then(function(){return s.scrollToEnd()})}},components:{chatMsg:p}},_=v,C=(s("c0bc"),Object(g["a"])(_,o,l,!1,null,"6f8deda5",null));C.options.__file="chat-room.vue";var k=C.exports,b=s("c1df"),w={data:function(){return{cheer:{position:{coordinates:{}}}}},created:function(){this.loadCheer(),this.$socket.emit("joinRoom",this.$route.params.cheerId),this.$store.dispatch({type:"setLoading",isLoading:!0}),window.scrollTo(0,0)},methods:{loadCheer:function(){var t=this,e=this.$route.params.cheerId;i["a"].getById(e).then(function(e){return console.log("this cheer:",e),t.$store.dispatch({type:"setLoading",isLoading:!1}),t.cheer=e})},userAttending:function(t){var e,s=this.$route.params.cheerId,n=this.$store.getters.getUser;if(n)if(e=n._id,t)this.$socket.emit("userAttending",{userId:e,cheerId:s});else{var a=this.cheer.attendees.findIndex(function(t){return t._id===e});a>=0&&i["a"].removeAttendance(s).then(this.loadCheer)}else this.$router.push("/login")},toggleChat:function(){this.$el.querySelector(".chat").classList.toggle("open")}},computed:{date:function(){return b(this.cheer.date).format("dddd, LL")},relativeDate:function(){return b(this.cheer.date).fromNow()},spotsLeft:function(){return this.cheer.spots-this.cheer.attendees.length},time:function(){return b(this.cheer.date).format("hh:mm A")},mapPic:function(){return"https://maps.googleapis.com/maps/api/staticmap?center=".concat(this.cheer.position.coordinates.lat,",").concat(this.cheer.position.coordinates.lng,"&markers=color:red%7Clabel:C%7C").concat(this.cheer.position.coordinates.lat,",").concat(this.cheer.position.coordinates.lng,"&zoom=16&size=600x400&key=AIzaSyDSpb5jrUSIDb124D7Qpjd4XJQ6d8oVPW0")},msgs:function(){var t=this.cheer.msgs;return t},userIsGoing:function(){var t,e=this.$store.getters.getUser;if(!e||!this.cheer.attendees)return!1;t=e._id;var s=this.cheer.attendees.findIndex(function(e){return e._id===t});return s>=0},backgroundImg:function(){return this.cheer.img?"background-image: url(".concat(this.cheer.img,")"):"background-image: url(https://moneycrashers-sparkchargemedia.netdna-ssl.com/wp-content/uploads/2017/08/bachelor-party-bar-drinks-1024x576.jpg)"}},components:{userCard:r["a"],loadingModal:c["a"],chatRoom:k},sockets:{gotNewChatMsg:function(t){this.cheer.msgs?this.cheer.msgs.push(t):this.cheer.msgs=[t]},updateCheer:function(){this.loadCheer()}}},y=w,$=(s("d6c5"),Object(g["a"])(y,n,a,!1,null,"7f12848c",null));$.options.__file="cheer-details.vue";e["default"]=$.exports}}]);
//# sourceMappingURL=chunk-0587846c.84bd58f3.js.map