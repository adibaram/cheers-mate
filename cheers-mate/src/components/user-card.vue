<template>
<div class="user-card-container" :class="{prevImgCont: $route.name === 'home'}">

            <!-- <el-card :body-style="{ padding: '0px' }"> -->
            <img :src="(user.img)? user.img : 'https://via.placeholder.com/100x100'" :class="{prevImg: $route.name === 'home'}" class="image" />
            <!-- <div style="padding: 14px;">
                <span>{{user.nickname}}</span>
                <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">Operating button</el-button>
                </div>
            </div> -->
            <!-- </el-card> -->

</div>
        
</template>

<style scoped lang="scss">
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100px;
    height: 100px;
    display: block;
    border-radius: 50%;
    object-fit: cover;
  }

  .prevImg {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  .prevImgCont {
      display: flex;
      flex-direction: row;
      
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

<script>
export default {
    props: {
        user: {
            type: Object,
            default: {},
        }
    },
    data() {
        return {
            currentDate: new Date()
        };
    }
}
</script>