<template>
  <section>
    <div class="home">
      <!-- <router-link tag="div" to="/cheer/create" class="add-cheer"> -->
        <!-- <h4><i class="fas fa-plus"></i> Create a Cheer</h4> -->
      <!-- </router-link> -->
      <!-- <h1>Look for events near you</h1> -->
      <cheer-filter></cheer-filter>
    </div>
    <cheer-list></cheer-list>
  </section>
</template>

<script>
// @ is an alias to /src
import cheerList from './cheers/cheer-list.vue'
import cheerFilter from '../components/cheer-filter.vue'

export default {
  name: 'home',
  components: {
    cheerList,
    cheerFilter
  }
}


</script>