<template>
  <div class="home flex">
    <router-link tag="div" to="/cheer/create" class="add-cheer">
      <h4><i class="fas fa-plus"></i> Create a Cheer</h4>
      </router-link>
    <!-- <router-link class="find-cheer">
      <h4><i class="fas fa-search"></i> Find a Cheer</h4>
    </router-link> -->
  </div>
  
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  }
}
</script>