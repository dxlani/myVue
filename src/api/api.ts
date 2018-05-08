import { Post, Get, Patch, Put,Delete,ax} from '../http/http'

export default {
    getPackage(data) {
        return Get('posts',data)
    },
    postPackage(data) {
        return Post('posts',data)
    },
    patchPackage(data) {
        return Patch('posts/1',data)
    },
    putPackage(data) {
        return Put('posts/1',data)
    },
    deletePackage(data) {
        return Delete('posts/1')
    },

}
