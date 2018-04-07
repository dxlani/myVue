<template>
  <div id="app">
     <navbar></navbar>
     <div class="marginLeft">
      <app-header v-bind:title="title"></app-header> 
      <router-view ></router-view>
      <app-footer></app-footer> 
     </div>
     
    
  </div>
</template>


 <style src="./App.css" lang="css" ></style>



