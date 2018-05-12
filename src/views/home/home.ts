import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import './home.scss'
import api from '../../api/api'
var echarts = require('echarts');


@Component({
    template: require('./home.html'),
  
})

export default class HomeComponent extends Vue {
    // @Prop
    //询价部分
    /**本月总询价量 */
    inquiryTotal:number = null;
    /**询价环比上个月 */
    inquiryPercent:string = '';
    /**询价单环比上个月状态 */
    inquiryPercentStatus:string = '';
    /**承运商报价中 */
    carrierQuotation:number = null;
    /**承运商已报价 */
    carrierQuotedprice:number = null;
    /**承运商已中标 */
    carrierWonbid:number = null;
    /**中标待定 */
    undecidedBid:number = null;
    /**询价终结 */
    inquiryEnd:number = null;
    /**无承运商中标 */
    noBid:number = null;
    //询价单状态构成饼图数据
    inquiryStatusData:any = [];
    //历史询价单数量折线图数据
    /**累计发布询价单数量 */
    inquiryReleaseTotal:number = null;
    /**询价折线图月份 */
    inquiryMonth = [];
    /**询价单数量数组 */
    inquiryData =[];

    //订单部分
    /**本月总订单量 */
    orderTotal:number = null;
    /**订单环比上个月百分比 */
    orderPercent:string = '';
    /**订单环比上个月状态 */
    orderPercentStatus:string = '';
    /**货已送达 */
    alreadyReach:number = null;
    /**已发货 */
    alreadyDelivery:number = null;
    /**待发货 */
    pendDelivery:number = null;
    /**已派车 */
    alreadySendcar:number = null;
    /**派车中 */
    sendingCar:number = null;
    /**订单终结 */
    orderEnd:number = null;
    /*订单处理*/
    orderHandle:number = null;
    
    //订单状态构成饼图数据
    orderStatusData = [];
    //历史订单数量折线图数据
    /**累计发布订单数量 */
    orderReleaseTotal:number = null;
    /**订单折线图月份 */
    orderMonth = [];
    /**订单数量数组 */
    orderData = [];

    mounted(){
        this.inquiryStatusData = [];
        this.inquiryMonth = [];
        this.inquiryData = [];
        this.orderStatusData = [];
        this.orderMonth = [];
        this.orderData = [];

        /**询价单数据 */
        api.Work.getInquiryCount({}).then((res)=>{
            this.inquiryTotal = res.inquiry;
            this.carrierQuotation = res.quote;
            this.carrierQuotedprice = res.successfulQuote;
            this.carrierWonbid = res.successfulBidder;
            this.undecidedBid = res.pending;
            this.inquiryEnd = res.end;
            this.noBid = res.unsuccessfulBidders;
            this.inquiryPercent = res.monthDiffer;
            this.inquiryPercentStatus = res.rateTrend;
        }).then((rej)=>{
            if(this.inquiryPercentStatus == "Up"){
                document.getElementById("inquiryArrow").setAttribute("class","upArrow");//切换为向上绿色箭头
                // document.getElementById("inquiryCompare").setAttribute("class","upColor");
                document.getElementById("inquiryUp").setAttribute("class","is-display");
                document.getElementById("inquiryDown").setAttribute("class","no-display");
            }else{
                document.getElementById("inquiryArrow").setAttribute("class","downArrow");//切换为向下红色箭头
                // document.getElementById("inquiryCompare").setAttribute("class","downColor");
                document.getElementById("inquiryUp").setAttribute("class","no-display");
                document.getElementById("inquiryDown").setAttribute("class","is-display");
            }
        });
        /**询价单图表 */
        api.Work.getInquiryStatus({}).then((res)=>{
            res.inquiryStatusProportion.forEach((itemS) => {
                if(itemS.proportion != 0){
                    this.inquiryStatusData.push({
                        name:itemS.stateName,
                        value:itemS.proportion
                    });
                }
            });
            res.inquiryMonthStatistics.forEach((itemM)=>{
                this.inquiryMonth.push(itemM.month);
                this.inquiryData.push(itemM.num);
            });
            this.inquiryReleaseTotal = res.totalCount;
            
        }).then(()=>{
            this.getInquirypie(this.inquiryStatusData);
            this.getInquiryLine(this.inquiryMonth,this.inquiryData);
        });

        /**订单数据 */
        api.Work.getOrderCount({}).then((res)=>{
            this.orderTotal = res.order;
            this.alreadyReach = res.tchbd;
            this.alreadyDelivery = res.ship;
            this.pendDelivery = res.wftd;
            this.alreadySendcar = res.hsc;
            this.sendingCar = res.itc;
            this.orderEnd = res.oend;
            this.orderHandle = res.dispose
            this.orderPercent = res.monthDiffer;
            this.orderPercentStatus = res.rateTrend;
        }).then(()=>{
            if(this.orderPercentStatus == "Up"){
                document.getElementById("orderArrow").setAttribute("class","upArrow");//切换为向上绿色箭头
                // document.getElementById("orderCompare").setAttribute("class","upColor");
                document.getElementById("orderUp").setAttribute("class","is-display");
                document.getElementById("orderDown").setAttribute("class","no-display");
            }else{
                document.getElementById("orderArrow").setAttribute("class","downArrow");//切换为向下红色箭头
                // document.getElementById("orderCompare").setAttribute("class","downColor");
                document.getElementById("orderUp").setAttribute("class","no-display");
                document.getElementById("orderDown").setAttribute("class","is-display");
            }
        });

        /**订单图表 */
        api.Work.getOrderStatus({}).then((res)=>{
            res.item1.forEach((itemS) => {
                this.orderStatusData.push({
                    name:itemS.stateName,
                    value:itemS.proportion,
                });
            });
            res.item2.forEach((itemM)=>{
                this.orderMonth.push(itemM.time);
                this.orderData.push(itemM.num);
            });
            this.orderReleaseTotal = res.item3;
        }).then(()=>{
            this.getOrderpie(this.orderStatusData);
            this.getOrderLine(this.orderMonth,this.orderData);
        })
    }

    /**询价单状态构成饼图 */
    getInquirypie = function(inquiryStatusData){
        var inquiryPieChart = echarts.init(document.getElementById('inquiryPie'));
        window.addEventListener("resize", function () {
            inquiryPieChart.resize();
        });
        var inquiryPie = {
            tooltip: {
                trigger: 'item',
                // trigger: 'axis',
                formatter: "{b} <br /> {c}%",
                // extraCssText: 'box-shadow: 3px 3px 3px 3px gainsboro',
                // borderColor:'gainsboro',
                // backgroundColor:'white',
                // textStyle:{
                //     align:'center',
                //     color:'rgb(89, 89, 105)',
                // }
                // "{a} <br/>{b} : {c}%"
            },
            legend: {
                bottom: 10,
                x: 'center',
                data: inquiryStatusData,
            },
            series: [{
                name: '',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '44%'],
                data: inquiryStatusData,
                avoidLabelOverlap: false,
                label: {
                    // normal: {
                    //     position:'outside',
                    //     formatter: '{b}\n{c}%',
                    //     borderWidth: 20,
                    //     borderRadius: 4,
                    //     rich: {
                    //         b: {
                    //             color: '#989898',
                    //             fontSize: 12,
                    //             lineHeight: 20
                    //         },
                    //         c: {
                    //             fontSize: 12,
                    //             lineHeight: 20,
                    //             color: '#666'
                    //         }
                    //     }
                    // }
                    normal: {
                        show: false,
                        position:'center',
                        //formatter: '{b}\n{c}%',
                        // borderWidth: 20,
                        // borderRadius: 4,
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '18',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false,
                    },
                    
                },
                // itemStyle: {
                //     normal: {
                //         borderWidth: 4,
                //         borderColor: '#ffffff',
                //     },
                //     emphasis: {
                //         borderWidth: 0,
                //         shadowBlur: 10,
                //         shadowOffsetX: 0,
                //         shadowColor: 'rgba(0, 0, 0, 0.5)'
                //     }
                // }
            }],
            color: ['#49A9EE','#98D87D','#FFD86E','#F3857B','#8996E6','#FF6600'],
        }
        inquiryPieChart.setOption(inquiryPie);
    }
    
    /**历史询价单数量折线图 */
    getInquiryLine = function(x, inquiryData){
        var inquiryLineChart = echarts.init(document.getElementById('inquiryLine'));
        window.addEventListener("resize", function () {
            inquiryLineChart.resize();
        });
        var option = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis',
                formatter: '{b0}<br />{a0} :{c0} ',
                // extraCssText: 'box-shadow: 3px 3px 3px 3px gainsboro',
                // borderColor:'gainsboro',
                // backgroundColor:'white',
                // textStyle:{
                //     align:'center',
                //     color:'rgb(89, 89, 105)',
                // }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisTick:{show:false},
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#dcdcdc',//左边线的颜色
                        width:'1'//坐标线的宽度
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#666',//坐标值得具体的颜色
 
                    },
                    // interval:0,
                    // rotate:-30
                },
                data: x,
            },
            yAxis:{
                name: '',
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#dcdcdc',//左边线的颜色
                        width:'1'//坐标线的宽度
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#666',//坐标值得具体的颜色
                    },
                },
            },
            series: [
                {
                    name:'询价单',
                    type:'line',
                    color: ['#4CAAEE'],
                    data: inquiryData,
                    showAllSymbol: true,
                     showSymbol: false,
                },
            ]
        };
        inquiryLineChart.setOption(option);
    }

    /**订单状态构成饼图 */
    getOrderpie = function(orderStatusData){
        var orderPieChart = echarts.init(document.getElementById('orderPie'));
        window.addEventListener("resize", function () {
            orderPieChart.resize();
        });
        var orderPie = {
            tooltip: {
                trigger: 'item',
                formatter: "{b} <br /> {c}%",
                // extraCssText: 'box-shadow: 3px 3px 3px 3px gainsboro',
                // borderColor:'gainsboro',
                // backgroundColor:'white',
                // textStyle:{
                //     align:'center',
                //     color:'rgb(89, 89, 105)',
                // }
            },
            legend: {
                bottom: 10,
                x: 'center',
                data: orderStatusData,
            },
            series: [{
                name: '',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '44%'],
                data: orderStatusData,
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position:'center',
                        //formatter: '{b}\n{c}%',
                        // borderWidth: 20,
                        // borderRadius: 4,
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '18',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false,
                    }
                },
                // itemStyle: {
                //     normal: {
                //         borderWidth: 4,
                //         borderColor: '#ffffff',
                //     },
                //     emphasis: {
                //         borderWidth: 0,
                //         shadowBlur: 10,
                //         shadowOffsetX: 0,
                //         shadowColor: 'rgba(0, 0, 0, 0.5)'
                //     }
                // }
            }],
             color: ['#49A9EE','#98D87D','#FFD86E','#F3857B','#8996E6','#FF6600','#F07DC7'],
        };
        orderPieChart.setOption(orderPie);
    }

    /**历史订单数量折线图 */
    getOrderLine = function(x, orderData){
        var orderLineChart = echarts.init(document.getElementById('orderLine'));
        window.addEventListener("resize", function () {
            orderLineChart.resize();
        });
        var option = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis',
                formatter: '{b0}<br />{a0} :{c0} ',
                // extraCssText: 'box-shadow: 3px 3px 3px 3px gainsboro',
                // borderColor:'gainsboro',
                // backgroundColor:'white',
                // textStyle:{
                //     align:'center',
                //     color:'rgb(89, 89, 105)',
                // }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,   //从坐标原点开始绘制
                axisTick:{show:false},
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#dcdcdc',//左边线的颜色
                        width:'1'//坐标线的宽度
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#666',//坐标值得具体的颜色
 
                    },
                    // interval:0,
                    // rotate:-30,
                },  
                data: x,
            },
            yAxis: {
                name: '',
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#dcdcdc',//左边线的颜色
                        width:'1'//坐标线的宽度
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#666',//坐标值得具体的颜色
 
                    }
                },
            },
            series: [
                {
                    name:'订单',
                    type:'line',
                    color: ['#4CAAEE'],
                    data: orderData,
                    showAllSymbol: true,
                    showSymbol: false,
                }
            ]
        };
        orderLineChart.setOption(option);
    }
}