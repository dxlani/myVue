import { Post, Get, Patch, Put, Delete,ax} from '../http/http'
export default {
   /* login */
   User: {
    login: function (data) {
        return Post('User/login',data)
    },
    contract:function(){
        return Get("User/GetIsContract",{})
    },
    
}
}
