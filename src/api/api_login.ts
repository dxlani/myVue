import { Post, Get, Patch, Put, Delete,ax} from '../http/http'

// ax.defaults.baseURL='http://192.168.1.107:777/csp/';
ax.defaults.baseURL = "http://192.168.1.205:5000/csp/"
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
