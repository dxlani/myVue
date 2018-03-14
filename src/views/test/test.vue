<template>
  <div  id="test">
    <h1>{{ message }}</h1>
    <button class="btn btn-xs btn-primary" @click="onClick">Click!</button>
    <button class="btn btn-xs "><i class="fa fa-reply"></i><router-link to="/">跳转到登录页面</router-link></button>
    
  </div>
</template> 
 <style src="./test.css" lang="css" scoped></style>



