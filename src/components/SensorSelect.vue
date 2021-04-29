<template>
    <div id="search" style="width='500px' height='300px'">
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
        <el-table
            :data="tableData"
            style="width: 100%"
            :default-sort = "{prop: 'monitorTime', order: 'descending'}"
            >
            <el-table-column
            prop="bridgeId"
            label="桥id"
            sortable
            width="180">
            </el-table-column>
            <el-table-column
            prop="dataId"
            label="数据id"
            sortable
            width="180">
            </el-table-column>
            <el-table-column
            prop="monitorData"
            label="传感器数据"
            sortable
            width="180"
            >
            </el-table-column>
            <el-table-column
            prop="monitorId"
            label="传感器id"
            sortable
            width="180">
            </el-table-column>
            <el-table-column
            prop="monitorTime"
            label="时间"
            sortable
            width="180"
            >
            </el-table-column>
        </el-table>
        

    </div>
</template>

<script>
  export default {
    
    formatter(row, column) {
        console.log(column)
        return row.address;
    },
    methods: {
        search() {
          sessionStorage.clear()
          const _this=this
          this.$axios({
          url:'http://121.196.98.32:8080/api/sensordata/sensorselect?BridgeId='+_this.value1+'&SensorId='+_this.value2+_this.value3,
          methods:'get',
          data:{},
          }).then(res=>{
              //console.log(res)
              _this.tableData=res.data.data
              const monitordata=res.data.data
              this.$store.commit("SET_MONITORDATA",monitordata)
          })
        
        },
        showChart(){
          var monitorData= [];//[1,2,3];
          var monitorTime= [];
          console.log("2651561651231")
          //console.log(sessionStorage.monitordata)
          //essionStorage.monitordata
          this.tableData=JSON.parse(sessionStorage.getItem("monitordata")) 
          console.log(this.tableData)
          
          console.log("2651561651231")
          for( let i=0;i<this.tableData.length;i++)
          {
              monitorData.push(this.tableData[i].monitorData)
              monitorTime.push(this.tableData[i].monitorTime)
          }
          // 基于准备好的dom，初始化echarts实例
          let echarts = require('echarts');
          var myChartContainer = document.getElementById('search')
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
          xAxis: {
              data: monitorTime
          },
          yAxis: {
               type: 'value',
            splitLine: { //网格线
              show: false
            }
          },
          series: [{
              name: '传感器数据',
              type: 'line',
              data: monitorData
          }]
          }
          myChart.setOption(options,true);
          window.onresize = function () {
              echarts.resize()
          }
        } ,
        paint(){
          this.$nextTick(function(){
            this.showChart();
          })
        } 
    },
    
    data() {
      return {
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
          label: '位置'
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
        value3:'',
        totalarray:null,
        tableData: [{
            bridgeId: "",
            dataId: "",
            monitorData: "",
            monitorId: "",
            monitorTime: "",
        }]
      }
    }
  }
</script>
<style>
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .demonstration {
        display: block;
        color: #8492a6;
        font-size: 14px;
        margin-bottom: 20px;
    }
</style>