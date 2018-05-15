import { Post, Get, Patch, Put, Delete,ax} from '../http/http'

export default {
    Inquiry:{
        getInquiryList: function (
            inquiryId: string,
            inquiryChildId: string,
            Origin: string,
            Destination: string,
            status: string,
            begin: string,
            end: string,
            skip: number,
            count: number
       ) {
        return Get("Inquiry/getInquiryList",{
            inquiryid:inquiryId,
            inquirychildid:inquiryChildId,
            Origin:Origin,
            Destination:Destination,
            status:status,
            begin:begin,
            end: end,
            skip: skip,
            count: count
        })

        
    },
}
}
