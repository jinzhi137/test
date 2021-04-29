<template>
    <div id="bridgeInf" style="width='500px' height='300px'">
        <el-table
            :data="tableData"
            style="width: 100%"
            :default-sort = "{prop: 'bridgeName', order: 'descending'}"
            >
            <el-table-column
            prop="bridgeName"
            label="桥名称"
            sortable
            width="180">
            </el-table-column>
            <el-table-column
            prop="bridgeId"
            label="数据id"
            sortable
            width="180">
            </el-table-column>
            <el-table-column
            prop="bridgeLoc"
            label="桥梁坐标"
            sortable
            width="180"
            >
            </el-table-column>
            <el-table-column
            prop="bridgeInf"
            label="桥梁信息"
            sortable
            width="500">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
  export default {
    methods: {

 
    },
    
    created()
    {
        sessionStorage.clear();
        const _this=this
        this.$axios({
        url:'http://121.196.98.32:8080/api/bridge/alldata',
        methods:'get',
        data:{},
        }).then(res=>{
            //console.log(res)
            _this.tableData=res.data.data
        })
            
    },
    data() {
      return {
        totalarray:null,
        tableData: [{
            bridgeId: "",
            bridgeInf: "",
            bridgeLoc: "",
            bridgeName: ""
        }
        ]
      }
    }
  }
</script>