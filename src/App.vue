<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
     
  </div>
</template>

<script lang="ts">
export default {
  name: 'App'
}
</script>

<style>
/*通用*/
*{
    box-sizing:border-box;
}
a{color:#001825;text-decoration:none;}
body {
    font: 14px "microsoft yahei", Arial, Helvetica, sans-serif;
    color:#666;
    margin:0px;
    padding:0px;
}
ul,li,p,h1,h2,h3,h4,h5,h6,dl,dt,dd {
    margin:0px;
    padding:0px;
    border:none;
    list-style:none;
}
input {border:none;outline:none}
.lf   {float:left;}
.rt  {float:right;}
.clear  {clear:both;}

</style>
