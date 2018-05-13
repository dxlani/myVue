import { Post, Get, Patch, Put, Delete,ax} from '../http/http'

// ax.defaults.baseURL='http://192.168.1.107:777/csp/';
ax.defaults.baseURL = "http://192.168.1.205:5000/csp/"
export default {
    cspInquiry:{
        editCspInquiry: function (id:string) {
        return Put("CspInquiry/editCspInquiry/"+id ,{})
    },
        deleteCspInquiry: function (id:string) {
        return Delete("CspInquiry/deleteCspInquiry/"+id,{})
    },
        getCspInquiryList: function (
        CspInquiryCode: string,
        CspInquiryChildCode: string,
        status: string,
        startTime: string,
        endTime: string,
        startAddress: string,
        endAddress: string,
        skip: number,
        count: number
       ) {
        return Get("CspInquiry/getCspInquiryList?cspinquirycode=" + CspInquiryCode + "&cspInquirychildcode=" + CspInquiryChildCode + '&status=' + status + '&startTime=' + startTime + '&endTime=' + endTime + '&startAddress=' + startAddress + '&endAddress=' + endAddress + '&skip=' + skip + '&count=' + count,{})
    },
}
}
