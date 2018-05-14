import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import api_cspInquiry from '../../api/api_cspInquiry'
declare var bootstrapTable: any;
declare var $: any;
declare var bootbox: any;

@Component({
    template: require('./inquiryReleaseManage.html')
})
export default class InquiryReleaseManageComponent extends Vue {
    Records=1;
    showRecords=true;
    currentPage;
    skip:number;
    count:number;
    seeks = true;
    stateDropDown=[{text:'全部',value:''},{text:'未处理',value:"0"},{text:'已处理',value:"1"},{text:'终结',value:"2"}] 

    query = {
        startTime:'',
        endTime:'',
        startAddress:'',
        endAddress:'',
        inquiryId:'',
        inquiryChildId:'',
        inquiryState:this.stateDropDown[0].value,
    }
    /**列表数据 */
    inquiryReleaseData=[];
    
    mounted(){
        let routerName = this.$route.path;
        if(window.localStorage.getItem(String(routerName))){
            this.query = JSON.parse(window.localStorage.getItem(String(routerName)));
        }else{
            this.query = {
                startTime:'',
                endTime:'',
                startAddress:'',
                endAddress:'',
                inquiryId:'',
                inquiryChildId:'',
                inquiryState:this.stateDropDown[0].value,
            }
        }
        if(window.localStorage.getItem(String(routerName + 'Page'))){
            let pageData = JSON.parse(window.localStorage.getItem(String(routerName + 'Page')));
            this.skip = pageData.skip;
            this.count = pageData.count;
        }else{
            this.skip = 0;
            this.count = 10;
        }
        // this.$on('pageIndexChange', function(event) {
        //     this.count = event.pageSize;
        //     this.skip = event.pageIndex;
        //     this.currentPage = event.currentPage;
        //     this.localPage(this.skip,this.count,this.currentPage)
        //     this.load(this.skip,this.count);
        // });
        
        $('#inquiryReleaseManage_startTime').datetimepicker({
      
        });
        $("#inquiryReleaseManage_endTime").datetimepicker({
            // lang:"zh", //语言选择中文 注：旧版本 新版方法：$.datetimepicker.setLocale('ch');
            // format:"Y-m-d H:i:s",      //格式化日期
            // timepicker:true,    //关闭时间选项
            // hours12: false,  //24h
        });
        var $table = $('#inquiryReleaseManage_table').bootstrapTable({
                dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                clickToSelect:true,
                singleSelect:true,
                sidePagination: "client",//服务端分页
                buttonsAlign: "left",//按钮对齐方式 子询价编号 发货地址 送货地址 货物名称 货物数量 所需车长 询价时间 紧急程度 询价状态
                columns: [
                    {field: "select",title: "",checkbox: true,width: 20,align: "center",valign: "middle"},
                    {field: "cspInquiryId",title: "总询价编号", sortable: true,order: "desc"},
                    {field: "cspInquiryChildId",title: "子询价编号",sortable: true},
                    {field: "startAddress",title: "发货地址",sortable: true,},
                    {field: "endAddress",title: "送货地址",sortable: true,},
                    {field: "goodsName",title: "货物名称",sortable: true,},
                    {field: "goodsNum",title: "货物数量",sortable: true,},
                    {field: "carLength",title: "所需车长",sortable: true,},
                    {field: "cspInquiryTime",title: "询价时间",sortable: true,},
                    {field: "responseTime",title: "紧急程度",sortable: true,},
                    {field: "status",title: "询价状态",sortable: true,},
                    {
                        field: 'template',
                        title: '操作',
                        formatter: function operateFormatter(value, row, index) {
                            // Chris=='待处理' Dan=="已处理"
                            var aa=`<a title='终结订单' class="endOrder"><i class='glyphicon glyphicon-minus-sign primary text-primary m-l-xs'></i></a>`;
                            var bb=`<a class="detailOrder" href='#!/app/inquiry/inquiryAdd/?id=${row.id}&name=detail' title='详情'><i class='glyphicon glyphicon-eye-open m-l-xs primary text-info'></i></a>`;
                            var cc=`<a href='#!/app/inquiry/inquiryAdd/?id=${row.id}&name=edit' title='编辑'><i class='glyphicon glyphicon-edit m-l-xs primary text-info'></i></a>`;
                            var dd=`<a class='remove' title='删除' href='javascript:void(0);'><i class='glyphicon glyphicon-trash  primary text-danger m-l-xs'></i></a>`;
                            switch(row.status){
                                case'未处理':return aa+``+bb+``+dd;
                                case'已处理':return cc;
                                default:return bb;
                            }
                        },
                        events: {
                            'click .endOrder':  (e, value, row, index)=> {
                                bootbox.confirm("是否终结该订单？",(bootboxResult)=>{
                                    if(bootboxResult){
                                        api_cspInquiry.cspInquiry.editCspInquiry(row.id).then((res)=>{
                                            this.load(this.skip,this.count);
                                        },(rej)=>{});
                                    }else{
                                        return;
                                    }
                                })
                            },
                            'click .remove':(e,value,row,index)=>{
                                bootbox.confirm("是否删除该订单？",(bootboxResult)=>{
                                    if(bootboxResult){
                                        api_cspInquiry.cspInquiry.deleteCspInquiry(row.id).then((res)=>{
                                            if(res.success){
                                                if(this.inquiryReleaseData.length == 1){
                                                    console.log(this.currentPage);
                                                    this.currentPage = this.currentPage -1;
                                                    // this.$broadcast('changeCurrentPage',{currentPage:this.currentPage});
                                                    this.skip = (this.currentPage - 1)*10;
                                                    this.load(this.skip,this.count);
                                                }else{
                                                    this.load(this.skip,this.count);
                                                }
                                            }
                                        });
                                    }else{
                                        return;
                                    }
                                })
                            },
                        },
                    }
                ],
                data: [],
                //单击row事件
                onClickRow: (row, $element)=> {
                    if(!row["select"]){
                        $('#inquiryReleaseManage_toOrderAdd').removeAttr('disabled');
                    }else{
                        $('#inquiryReleaseManage_toOrderAdd').attr('disabled', 'true');
                    }
                },
                //单击单选框时触发的操作
                onCheck:function(row){
                    $('#inquiryReleaseManage_toOrderAdd').removeAttr('disabled');
                },
                //取消单选框
                onUncheck:function(row){
                    $('#inquiryReleaseManage_toOrderAdd').attr('disabled', 'true');
                },
                actionFormatter:function(value, row, index){
                    // console.info('tyv')
                },
                locale: "zh-CN"//中文支持,
            });
        //表格 初始 加载数据 'MM/YYYY':
        this.load(this.skip,this.count);
     }
   
    //请求数据
    load(skip,count){
        api_cspInquiry.cspInquiry.getCspInquiryList(this.query.inquiryId,this.query.inquiryChildId,this.query.inquiryState,this.query.startTime,this.query.endTime,this.query.startAddress,this.query.endAddress,skip,count)
        .then((res)=>{
            this.inquiryReleaseData = res.data;       
            $('#inquiryReleaseManage_table').bootstrapTable('load', this.inquiryReleaseData);
            this.seeks=false;
            var totalItems=res.total;
            this.Records= totalItems==0?0.5:totalItems;
            this.showRecords=totalItems==0?false:true;
        },function(rej){
            this.seeks=false;
        });
    }
    //查询调用
    queryUsers(){
        bootbox.alert('sssssssssssssssssssss')
        this.seeks=true;
        this.skip = 0;
        this.currentPage = 1;
        // this.$broadcast('reset');
        this.localHistory(this.$route);
        this.localPage(this.skip,this.count,this.currentPage);
        this.load(this.skip,this.count);
    }

    //存储搜索条件
    localHistory(state){
        if(state){
            let routerName = state.path;
            if(routerName.search("inquiry")>0){
                window.localStorage.setItem(String(routerName),JSON.stringify(this.query));

            };
        }
    }

    //存储页数
    localPage(skip,count,currentPage){
        var routerName = this.$route.path;
        window.localStorage.setItem(String(routerName+'Page'),JSON.stringify({skip:skip,count:count,currentPage:currentPage}));
    }
    
    //询价单新增
    LinckToInquiryAdd(){
        var rowSelected;
        rowSelected=$('#inquiryReleaseManage_table').bootstrapTable('getSelections')[0];
        if($('#inquiryReleaseManage_table').bootstrapTable('getSelections').length>0){
            this.$router.push('inquiryAdd/?id='+rowSelected.id+'&name=copy');
        }else{
            this.$router.push('inquiryAdd/?id='+'&name=add');
        }
    }
    
    //订单新增按钮点击触发
    LinckToOrderAdd(){
        var rowSelectedToOrder;
        rowSelectedToOrder=$('#inquiryReleaseManage_table').bootstrapTable('getSelections')[0];
        if($('#inquiryReleaseManage_table').bootstrapTable('getSelections').length>0){
            this.$router.push('../../app/order/orderReleaseAdd/?id='+rowSelectedToOrder.id+'&name=copyInquiryRelease');
        }
    }

}
