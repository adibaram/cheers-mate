<template>
  <div id="app">
<<<<<<< HEAD
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/cheer">Cheer Details</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/map">Map</router-link>
=======
    <div id="nav" class="flex">
       <h1>Cheer App</h1>
       <div class="links">
        <router-link to="/">Home</router-link> |
        <router-link to="/cheer">Cheers</router-link> |
        <router-link to="/about">About</router-link> 
      </div>
      <div>
        <router-link to="/signup">Sign up</router-link> |
        <router-link to="/login">Log in</router-link>
      </div>
>>>>>>> 03d3fb957485bdbd25ba187937d34930771ce8d0
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
