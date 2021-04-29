<template>
  <div id="forecast" style="width:500px; height:300px">
    <el-button type="primary" @click="paint()" >折线图查看</el-button>
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
          :formatter="formatter">
      </el-table-column>
    </el-table>

    <el-pagination
        background
        layout="prev, pager, next"
        page-size="100"
        :total="41056"
        @current-change="page">
    </el-pagination>
  </div>
</template>

<script>
export default {
  methods: {
    page(currentPage){
      console.log(currentPage)
      const _this=this
      this.$axios({
        url:'http://121.196.98.32:8080/api/sensordata/alldata?page='+currentPage+'&size=100',
        methods:'get',
        data:{},
      }).then(res=>{
        //console.log(res)
        _this.tableData=res.data.data
        const monitordata=res.data.data
        this.$store.commit("SET_MONITORDATA",monitordata)
      })
    } ,
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
        tooltip: {},
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
  formatter(row, column) {
    console.log(column)
    return row.address;
  },
  created()
  {
    sessionStorage.clear();
    const _this=this
    this.$axios({
      url:'http://121.196.98.32:8080/api/sensordata/alldata?page=1&size=100',
      methods:'get',
      data:{},
    }).then(res=>{
      //console.log(res)
      _this.tableData=res.data.data
      const monitordata=res.data.data
      this.$store.commit("SET_MONITORDATA",monitordata)
    })

  },
  data() {
    return {
      totalarray:null,
      tableData: [{
        bridgeId: "",
        dataId: "",
        monitorData: "",
        monitorId: "",
        monitorTime: "",
      }
      ]
    }
  }
}
</script>