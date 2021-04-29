<template>
<div id="forecast">
  <el-button type="primary" @click="paint()" >折线图查看</el-button>
  <el-container class="dataShow_container">
    <el-row>
      <el-table
          :data="data"
          style="width: 100% height:100%"
          v-loading="loading"
          element-loading-text="拼命加载中"
          :default-sort = "{prop: 'dataId', order: 'descending'}"
      >
        <el-table-column
            prop="dataId"
            label="数据id"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            prop="bridgeId"
            label="桥梁id"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            prop="monitorData"
            label="传感器数据"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            prop="monitorId"
            label="传感器id"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            prop="monitorTime"
            label="传感器时间"
            sortable
            width="180">
        </el-table-column>
      </el-table>
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="searchAll">
      </el-pagination>
    </el-row>
  </el-container>
</div>
</template>

<script>
import {getRequest} from "@/utils/api";

export default {
  data() {
    return {
      data: [
        {
          bridgeId: '',
          dataId: '',
          monitorData: '',
          monitorId: '',
          monitorTime: ''
        }
      ],
      pageSize: 100,
      total: 100000,
      loading: false
    }
  },
  methods: {
    searchAll(currentPage){
      sessionStorage.clear();
      const _this = this
      this.loading = true
      getRequest('/sensordata/alldata',{
        page: currentPage,
        size: this.pageSize
      }).then(function(resp){
        _this.loading = false
        if (resp.status === 200 && resp.data.status === 0) {
          _this.data = resp.data.data
          const monitordata=resp.data.data
          _this.$store.commit("SET_MONITORDATA",monitordata)
          console.log("as56d16as1")
        }
        else {
          this.$message({
            type: "error", message: resp.data.msg
          })
        }
      }).catch(resp => {
        _this.loading = false
        this.$message({type: "error", message: '加载失败！'})
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
  created() {
    sessionStorage.clear();
    const _this = this
    this.loading = true
    getRequest('/sensordata/alldata',{
      page: 1,
      size: this.pageSize
    }).then(function(resp){
      _this.loading = false
      if (resp.status === 200 && resp.data.status === 0) {
        _this.data = resp.data.data
        const monitordata=resp.data.data
        
        _this.$store.commit("SET_MONITORDATA",monitordata)
        console.log("as56d16as1")
      }
      else {
        this.$message({
          type: "error", message: resp.data.msg
        })
      }
    }).catch(resp => {
      _this.loading = false
      this.$message({type: "error", message: '加载失败！'})
    })
  },
  

}
</script>

<style scoped>
.dataShow_container{
  height: 100%;
}

</style>