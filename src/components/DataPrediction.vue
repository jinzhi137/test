<template>
    <div >
        
        <el-select v-model="value1" placeholder="请选择查询大桥id" >
            <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="value2" placeholder="请选择查询传感器类型">
            <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="value3" placeholder="请选择查询传感器位置">
            <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="paint" >折线图查看</el-button>
        <div class="paint">
          <div id="forecast" >  
          </div>
          <div id="forecastMA">
          </div>
        </div>
        
        <el-table :data="tableData" style="width: 100%" border>
        <el-table-column
          v-for="(item,i) in tableCol"
          :key="i"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
        </el-table-column>
        </el-table>
    </div>
    
</template>
<script>
export default {
    data(){
        return{
        options1: [{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }],
        options2: [{
          value: 'A',
          label: '长期温度传感器'
        }, 
        {
          value: 'B',
          label: '长期应力传感器'
        },
        {
          value: 'C',
          label: '长期伸缩缝传感器'
        },
        {
          value: 'D',
          label: '长期沉降传感器'
        },
        {
          value: 'E',
          label: '短期应力传感器'
        },
        {
          value: 'F',
          label: '短期温度传感器'
        },
        {
          value: 'G',
          label: '索力传感器'
        }
        
        ],
        options3: [{
          value: '1',
          label: '位置1'
        }, 
        {
          value: '2',
          label: '位置2'
        },
        {
          value: '3',
          label: '位置3'
        },
        {
          value: '4',
          label: '位置4'
        },
        {
          value: '5',
          label: '位置5'
        },
        {
          value: '6',
          label: '位置6'
        },
        {
          value: '7',
          label: '位置7'
        },
        {
          value: '8',
          label: '位置8'
        },
        {
          value: '9',
          label: '位置9'
        },
        {
          value: '10',
          label: '位置10'
        },
        {
          value: '11',
          label: '位置11'
        },
        {
          value: '12',
          label: '位置12'
        },
        {
          value: '13',
          label: '位置13'
        },{
          value: '14',
          label: '位置14'
        },
        {
          value: '15',
          label: '位置15'
        },
        {
          value: '16',
          label: '位置16'
        },

        

        ],
        value1: '',
        value2: '',
        value3: '',
        tableData:[],
        tableCol: [
        { prop: "monitordata", label: "时间", width: 180 },
        { prop: "monitortime", label: "传感器数据", width: 200 },
        { prop: "forecast",label:"预测数据",width:180 } ,
        { prop: "fortime",label:"预测时间",width:180 }
      ]
        }
    },
    
    created(){
        
        
    },
    mounted(){  
    },
    methods: {
        showChart1(){
            var monitorData= [];//[1,2,3];
            var monitorData2=[];
            var monitorTime= [];
            console.log("2651561651231")
            //console.log(sessionStorage.monitordata)
            //essionStorage.monitordata
            this.tableData=JSON.parse(sessionStorage.getItem("monitordata")) 
            //console.log(this.tableData.real)
            //console.log(this.tableData.pred)
            console.log("2651561651231")
            for( var i=0;i<this.tableData.len.real;i++)
            {
                monitorData.push(this.tableData.real[i].monitorData)
                monitorData2.push(null)
                monitorTime.push(this.tableData.real[i].monitorTime)
            }
            monitorData2.push(this.tableData.real[i-1].monitorData)
            for( let i=0;i<this.tableData.len.pred;i++)
            {
                monitorData2.push(this.tableData.pred[i+this.tableData.len.real].monitorData)
                //monitorData.push(0)
                monitorTime.push(this.tableData.pred[i+this.tableData.len.real].monitorTime)
            }
            // 基于准备好的dom，初始化echarts实例
            let echarts = require('echarts');
            var myChartContainer = document.getElementById('forecast')
            var resizeMyChartContainer = function() {
            myChartContainer.style.height = window.innerHeight * 1 + 'px';
            myChartContainer.style.width =window.innerHeight * 1 + 'px';
            };
            resizeMyChartContainer();
            //console.log(myChartContainer)
            var myChart = this.$echarts.init(myChartContainer)
            // 绘制图表
            let options={
            title: { text: '传感器数据折线图' },
            tooltip: {
              trigger: 'axis'   // axis   item   none三个值
            },
            legned:{
                data:['实际数据','预测数据']
            },
            color:['#8AE09F', '#FA6F53'],
            xAxis: {
                data: monitorTime
            },
            yAxis: {
                 type: 'value',
              splitLine: { //网格线
                show: false
              }

            },
            series: [
                {
                    name: '预测数据',
                    data:  monitorData2,
                    type: 'line',               // 类型为折线图
                    lineStyle: {                // 线条样式 => 必须使用normal属性
                        normal: {
                            color: '#8A15AF',
                        }
                    },
                },
                {
                    name: '实际数据',
                    data:  monitorData,
                    type: 'line',               // 类型为折线图
                    lineStyle: {                // 线条样式 => 必须使用normal属性
                        normal: {
                            color: '#8AE09F',
                        }
                    },
                }
              ]
            }
            myChart.setOption(options,true);
            window.onresize = function () {
                echarts.resize()
            }
        } ,
        showChart2(){
            var monitorData= [];//[1,2,3];
            var monitorData2=[];
            var monitorTime= [];
            console.log("2651561651231")
            //console.log(sessionStorage.monitordata)
            //essionStorage.monitordata
            this.tableData=JSON.parse(sessionStorage.getItem("monitordata")) 
            //console.log(this.tableData.real)
            //console.log(this.tableData.pred)
            console.log("2651561651231")
            for( var i=0;i<this.tableData.len.real;i++)
            {
                monitorData.push(this.tableData.realMA[i].monitorData)
                monitorData2.push(null)
                monitorTime.push(this.tableData.realMA[i].monitorTime)
            }
            monitorData2.push(this.tableData.realMA[i-1].monitorData)
            for( let i=0;i<this.tableData.len.pred;i++)
            {
                monitorData2.push(this.tableData.predMA[i+this.tableData.len.real].monitorData)
                //monitorData.push(0)
                monitorTime.push(this.tableData.predMA[i+this.tableData.len.real].monitorTime)
            }
            // 基于准备好的dom，初始化echarts实例
            let echarts = require('echarts');
            var myChartContainer = document.getElementById('forecastMA')
            var resizeMyChartContainer = function() {
            myChartContainer.style.height = window.innerHeight * 1 + 'px';
            myChartContainer.style.width =window.innerHeight * 1 + 'px';
            };
            resizeMyChartContainer();
            //console.log(myChartContainer)
            var myChart = this.$echarts.init(myChartContainer)
            // 绘制图表
            let options={
            title: { text: '传感器数据折线图' },
            tooltip: {
              trigger: 'axis'   // axis   item   none三个值
            },
            legned:{
                data:['实际数据','预测数据']
            },
            color:['#8AE09F', '#FA6F53'],
            xAxis: {
                data: monitorTime
            },
            yAxis: {
                 type: 'value',
              splitLine: { //网格线
                show: false
              }

            },
            series: [
                {
                    name: '预测数据',
                    data:  monitorData2,
                    type: 'line',               // 类型为折线图
                    lineStyle: {                // 线条样式 => 必须使用normal属性
                        normal: {
                            color: '#8A15AF',
                        }
                    },
                },
                {
                    name: '实际数据',
                    data:  monitorData,
                    type: 'line',               // 类型为折线图
                    lineStyle: {                // 线条样式 => 必须使用normal属性
                        normal: {
                            color: '#8AE09F',
                        }
                    },
                }
              ]
            }
            myChart.setOption(options,true);
            window.onresize = function () {
                echarts.resize()
            }
        },
        paint(){
            this.$nextTick(function(){
            this.showChart1();
            this.showChart2();
            })
            
        },
        show(){
          
          
        },
        search(){
        var _this=this
        sessionStorage.clear();
        this.$axios({
            url:'http://121.196.98.32:1234/scratch.php?SensorId='+_this.value2+_this.value3+'&BridgeId='+_this.value1,
            methods:'get',
            }).then(res=>{
                const monitordata=res.data
                
                this.$store.commit("SET_MONITORDATA",monitordata)
                // this.tableData=JSON.parse(sessionStorage.getItem("monitordata"))
                // //console.log(this.tableData)
                // this.tableData=_this.tableData.real
                console.log("56132132")
                // console.log(this.tableData)  
                console.log(res)
                console.log("56132132")
                var hhh,sss
                hhh=JSON.parse(sessionStorage.getItem("monitordata"))
                console.log(hhh.len.pred)
                sss=hhh.pred
                
                hhh=hhh.real
                this.tableData=[{
                  monitordata:'',
                  monitortime:'',
                  forecast:'',
                  fortime:''
                }]
                for(let i=0;i<res.data.len.pred;i++)
                {
                  this.tableData[i]={
                  monitordata:'',
                  monitortime:'',
                  forecast:'',
                  fortime:''
                  }
                }
                console.log(sss)
                for(let i=0;i<res.data.len.pred;i++)
                {
                  if(i<res.data.len.real)
                  {
                    this.tableData[i].monitordata=hhh[i].monitorData
                    this.tableData[i].monitortime=hhh[i].monitorTime 
                  }  
                  if(i<res.data.len.pred)
                  {
                    this.tableData[i].forecast=sss[i+res.data.len.real].monitorData
                    this.tableData[i].fortime=sss[i+res.data.len.real].monitorTime
                  }     
                }
                console.log(this.tableData)
                
            })
        
    },
    }
}
</script>
<style>
.paint{
  float: left;
}
</style>