<template>
  <div id="app">
  <div class="cont">
   <div class="header">
     <div class="logo-inner">
       <h1>POZDNO</h1>
     </div>
     <div class="navbar">
       <nav>
         <div class="link"><router-link to='/'>все курсы</router-link></div>
         <div class="link"><router-link to='/info'>Информация</router-link></div>
         <div class="link"><router-link to='/account'>личный кабинет</router-link></div>
       </nav>
     </div>
   </div>
    <router-view/>
  </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; 
}
.cont {
    max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
