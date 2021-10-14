<template>
  <div id="users">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">

      <el-form-item label="模型標識名">
        <el-input v-model="formInline.vid" placeholder="模型標識名"></el-input>
      </el-form-item>

      <el-form-item label="模型中文名">
        <el-select v-model="formInline.displayname" placeholder="模型中文名">
          <el-option v-for="item in displaynameList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="模型類型">
        <el-select v-model="formInline.modeltype" placeholder="模型類型">
          <el-option v-for="item in modeltypeList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="更新日期">
        <el-date-picker v-model="selectDate" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>

    </el-form>

    <el-table :data="tableData" style="width: 100%" v-loading="loading2" element-loading-text="拼命加载中" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="vid" label="模型标识名" width="180"></el-table-column>
      <el-table-column prop="displayname" label="模型中文名"></el-table-column>
      <el-table-column prop="modeltype" label="模型類型"></el-table-column>
      <el-table-column prop="date" label="更新日期" width="180"></el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <template scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small"  @click="showEditDialog(scope.$index)">编辑</el-button>
          <el-button type="text" size="small"  @click="removeData(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
        <div class="r_btn">
          <el-button type="primary" @click="batchRemove">批量删除</el-button>
        </div>
        <div class="r_page">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5,10,15, 20,25,30]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
        </div>
    </div>

    <!-- Form -->
    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="模型標識名" :label-width="formLabelWidth">
          <el-input v-model="form.vid" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="模型中文名" :label-width="formLabelWidth">
          <el-input v-model="form.displayname" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="模型類型" :label-width="formLabelWidth">
          <el-input v-model="form.modeltype" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<style type="text/css" scoped>
  .block {
    margin-top: 20px;
    width: 100%;
  }
  .block .r_btn {
    float: left;
    width: 90px;
  }
  .block .r_page {
     float: right;
  }
</style>
<script type="text/javascript">
  import {getModelList} from '../../api'

  export default {
    data() {
      return {
        tableData: [],
        formInline: {
          name: '',
          id:''
        },
        currentPage:1,
        total:0,
        pageSize:5,
        nameList:["intent_entity_common", "intent_entity_special_one"],
        displaynameList:["通用", "定制一"],
        modeltypeList:["intent", "entity"],
        pickerOptions0: {
            disabledDate(time) {
              return time.getTime() < Date.now() - 8.64e7;
            }
        },
        selectDate:'',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        form: {
            name: '',
            address: '',
            id:''
        },
        loading2: false,
        options: [],
        selectedOptions: [],
        multipleSelection: []
      }
    },
    mounted() {
      this.$store.dispatch('showHeader');
      this.loadData();
    },
    methods: {
      //加载数据
      loadData() {
        this.loading2 = true;
        var params = {
          page: this.currentPage,
          pageSize: this.pageSize
        };
        getModelList(params).then(function(result){
          this.tableData = result.data.tableData;
          this.total = result.data.total;
          this.loading2 = false;
        }.bind(this)).catch(function (error) {
            this.loading2 = false;
            console.log(error);
        }.bind(this));
      },
      //查询
      onSubmit() {
        console.log(this.selectedOptions[1]);
        this.loadData();
      },
      //改变分页大小
      handleSizeChange(val) {
        this.pageSize = val;
      },
      //跳转页数
      handleCurrentChange(val) {
        this.currentPage = val;
        this.loadData();
      },
      //打开编辑窗口
      showEditDialog(row){
        var data = this.tableData[row];
        this.form.id = data.id;
        this.form.name = data.name;
        this.form.address = data.address;
        this.dialogFormVisible = true;
      },
      update(){
        if (this.form.name == "") {
          this.$message.error('姓名不能为空');
          return;
        }
        this.$message({
               message: '修改成功',
               type: 'success'
        });
        this.dialogFormVisible = false;
      },
      removeData(row) {
        var data = this.tableData[row];
        this.$confirm('确定要删除"'+data.name+'"?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      batchRemove() {
        this.multipleSelection.forEach(row => {
           console.log(row.id);
        });

      }
    }
  }
</script>
