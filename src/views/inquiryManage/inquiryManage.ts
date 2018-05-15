import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import api_Inquiry from '../../api/api_Inquiry'
declare var $: any;
declare var bootbox: any;
import pagination from '../../components/pagination'


@Component({
    template: require('./inquiryManage.html'),
    components:{
        pagination
    },
})

export default class InquiryManageComponent extends Vue {
   
    Records=1;

    showRecords=true;
    skip=0;
    count=10;
    currentPage = 1;
    
    seeks=true;
    statusList=[
        {text:"全部",value:""},
        {text:"报价中",value:"2,4,5,6,7"},//
        // {text:"退回下单",value:"3"},
        {text:"已报价",value:"8"},
        {text:"已中标",value:"9"},//
        {text:"未中标",value:"10"},//
        {text:"中标待定",value:"11"},
        {text:"询价终结",value:"12"},//
    ]
   
    inquiryParameter={
        code:"",
        childCode:"",
        status:this.statusList[0].value,
        startTime:"",
        endTime:"",
        sendAddress:"",
        receiveAddress:""
    }
     mounted(){
        let routerName = this.$route.path;
        if(window.localStorage.getItem(String(routerName))){
            this.inquiryParameter = JSON.parse(window.localStorage.getItem(String(routerName)))
        }else{
            this.inquiryParameter={
                code:"",
                childCode:"",
                status:this.statusList[0].value,
                startTime:"",
                endTime:"",
                sendAddress:"",
                receiveAddress:""
            };
        }
        if(window.localStorage.getItem(String(routerName + 'Page'))){
            let pageData = JSON.parse(window.localStorage.getItem(String(routerName + 'Page')));
            this.skip = pageData.skip;
            this.count = pageData.count;
        }else{
            this.skip = 0;
            this.count = 10;
        }
    
        $('p').remove('.VuePagination__count');
        $('#inquiryManage_inquiryStartTime').datetimepicker({onChangeDateTime:(dp,$input)=>{this.inquiryParameter.startTime=$input.val()}});
        $("#inquiryManage_inquiryEndTime").datetimepicker({onChangeDateTime:(dp,$input)=>{this.inquiryParameter.endTime=$input.val()}});

         var $table = $('#inquiryManage_table').bootstrapTable({
                // url: "index.php",//数据源
                dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                clickToSelect:true,
                singleSelect:true,
                cardView:false,
                sidePagination: "client",//服务端分页
                buttonsAlign: "left",//按钮对齐方式 子询价编号 发货地址 送货地址 货物名称 货物数量 所需车长 询价时间 紧急程度 询价状态
                columns: [
                    
                    {field: "inquiryId",title: "总询价编号",width: 20,align: "center"},
                    {field: "inquiryChildId",title: "子询价编号", order: "desc"},
                    {field: "originAddress",title: "发货地址",titleTooltip: "this is name"},
                    {field: "destinationAddress",title: "送货地址",},
                    {field: "goodsName",title: "货物名称",},
                    {field: "quantityOfGoods",title: "货物数量",},
                    {field: "carLength",title: "所需车长",},
                    {field: "creationTime",title: "下单时间",},
                    {field: "statusStr",title: "询价状态",},
                    {field: "responseTime",title: "紧急程度",},
                    {
                        field: 'template',
                        title: '操作',
                        formatter: function operateFormatter(value, row, index) {
                            var aa=` <a title='查看详情' href="javascript:void(0)" class='orderDetail'><i class='glyphicon glyphicon-eye-open text-info'></i></a>`;
                            var bb=`<a href="javascript:void(0)" title='编辑' class='editDetail'><i class='glyphicon glyphicon-edit text-info'></i></a>`;
                            switch(row.statusStr){
                                case'报价中':return aa;
                                case'已中标':return aa;
                                case'未中标':return aa;
                                case'询价终结':return aa;
                               default:return bb;
                            }
                        },
                        events: {
                            'click .orderDetail': function (e, value, row, index) {
                                this.$router.push('inquiryCheck/?id=' + row.id + '&status=' + row.status);
                            },
                            'click .editDetail':function(e,value,row,index){
                                this.$router.push('inquiryCheck/?id=' + row.id + '&status=' + row.status);
                            },
                        },
                    }
                ],
                data: [],
                onClickRow: function(row, $element) {
                    //$element是当前tr的jquery对象
                    // $element.css("background-color", "green");
                },//单击row事件
                actionFormatter:function(value, row, index){
                    // console.info('tyv')
                },
                locale: "zh-CN"//中文支持,
            });
        //表格 初始 加载数据
        this.load(this.inquiryParameter,this.skip,this.count);
    }
    load(inquiryParameter,skip,count){
        api_Inquiry.Inquiry.getInquiryList(inquiryParameter.code,inquiryParameter.childCode,inquiryParameter.sendAddress,inquiryParameter.receiveAddress,inquiryParameter.status,inquiryParameter.startTime,inquiryParameter.endTime,skip,count).then(
            (res)=>{
                if(res.length==0){ this.seeks=true; return false}
                var data=res.data;
                // //应付报价、退回报价、应收报价、待审核、退回审核
                for(var i=0;i<data.length;i++){
                    if(data[i].status=="3"){//为3退回下单则不显示
                        data.splice(i,1);
                        i--;
                        continue;
                    }
                    var temp=this.statusList.filter(t=>t.value.indexOf(data[i].status)>-1)[0];
                    data[i].statusStr=temp?temp.text:"";
                }
                $('#inquiryManage_table').bootstrapTable('load', data);
                this.seeks=true;
                var total=Number(res.total);
                this.Records=total==0?0.5:total;
                this.showRecords=total==0?false:true;
            },function(rej){
                this.seeks=true;
            }
        );
    }
    query(){
       this.seeks=false;
       this.skip = 0;
       this.currentPage = 1;
    //    this.$broadcast('reset');
       this.localHistory(this.$route);
       this.localPage(this.skip,this.count,this.currentPage);
       this.load(this.inquiryParameter,this.skip,this.count);
    }

    //存储搜索条件
    localHistory(state){
        if(state){
            let routerName = state.path;
            if(routerName.search("inquiry")>0){
                window.localStorage.setItem(String(routerName),JSON.stringify(this.inquiryParameter));
            };
        }
    }

    //存储页数
    localPage(skip,count,currentPage){
        var routerName = this.$route.path;
        window.localStorage.setItem(String(routerName+'Page'),JSON.stringify({skip:skip,count:count,currentPage:currentPage}));
    }
   
    tableData=[];
   

    package:string = 'vue-typescript';
    repo:string = 'https://github.com/itsFrank/vue-typescript';
        /* 分页 */
        pageChange=(event)=>{
            this.skip = event.pageIndex;
            this.count = event.pageSize;
            this.currentPage = event.currentPage;
            this.localPage(this.skip,this.count,this.currentPage)
            this.load(this.inquiryParameter,this.skip,this.count);
        }
}
