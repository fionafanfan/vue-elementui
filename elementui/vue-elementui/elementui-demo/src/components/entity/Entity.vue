<template>
  <div id="users">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">

      <el-form-item label="">
        <el-input v-model="formInline.searchtext" placeholder="實體類型標識名"></el-input>
      </el-form-item>

      <el-form-item label="搜索类别">
        <el-select v-model="formInline.searchtype" placeholder="實體類型標識名">
          <el-option v-for="item in searchtypeList" :key="item" :label="item" :value="item"></el-option>
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
      <el-table-column prop="entity_type" label="實體類型標識名" width="180"></el-table-column>
      <el-table-column prop="displayname" label="實體類型中文名"></el-table-column>
      <el-table-column prop="standword" label="實體標準詞"></el-table-column>
      <el-table-column prop="synonyms" label="實體同義詞"></el-table-column>
      <el-table-column prop="updatetime" label="更新日期" width="180"></el-table-column>
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
       <el-form-item label="實體類型標識名" :label-width="formLabelWidth">
          <el-input readonly="true" v-model="form.entity_type" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="實體標準詞" :label-width="formLabelWidth">
          <el-input readonly="true" v-model="form.standword" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="實體同義詞" :label-width="formLabelWidth">
          <el-input v-model="form.synonyms" auto-complete="off"></el-input>
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
  import {getEntityList} from '../../api'

  export default {
    data() {
      return {
        tableData: [],
        formInline: {
          entity_type: '',
          wordtype:'',
          searchtext:'',
          searchtype:''
        },
        searchtypeList:["所有","實體類型標識名","實體標準詞","實體同義詞"],
        currentPage:1,
        total:0,
        pageSize:15,
        pickerOptions0: {
            disabledDate(time) {
              return time.getTime() < Date.now() - 8.64e7;
            }
        },
        selectDate:'',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        form: {
          entity_type: '',
          wordtype:''
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
        var vid = localStorage.getItem('vid','intent_entity_common');
        var params = {
          page: this.currentPage,
          pageSize: this.pageSize,
          searchtext: this.formInline.searchtext,
          searchtype: this.formInline.searchtype,
          vid:vid
        };
        getEntityList(params).then(function(result){
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
        this.form.entity_type = data.entity_type;
        this.form.standword = data.standword;
        this.form.synonyms = data.synonyms;
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
