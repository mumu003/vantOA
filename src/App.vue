<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return{}
    
  }
};
</script>

<style lang="scss">
// #app {
//   font-family: "Avenir", Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }

/* 底部导航 */
nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 75px;
  z-index: 1000;
  border-top: 1px solid #ccc;
  ul{
    height: 75px;
  }
  li {
    float: left;
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
  }
  svg {
    width: 32px;
    height: 32px;
  }
  span {
    display: block;
    color: #7d7e80;
    font-size: 16px;
    text-align: center;
  }
   li.router-link-exact-active span{
    color: #1989fa !important;
  }
  .router-link-exact-active  svg path{
    fill: #1989fa;
  }
}
</style>
