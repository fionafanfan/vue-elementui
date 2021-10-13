<template>
  <div id="users">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">

      <el-form-item label="意圖標識名">
        <el-input v-model="formInline.name" placeholder="意圖標識名"></el-input>
      </el-form-item>

      <el-form-item label="意圖類型">
        <el-select v-model="formInline.intenttype" placeholder="意圖類型">
          <el-option v-for="item in intenttypeList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否可擴">
        <el-select v-model="formInline.isextend" placeholder="是否可擴">
          <el-option v-for="item in isextendList" :key="item" :label="item" :value="item"></el-option>
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
      <el-table-column prop="name" label="意圖標識名" width="180"></el-table-column>
      <el-table-column prop="displayname" label="意圖中文名"></el-table-column>
      <el-table-column prop="intenttype" label="意圖類型"></el-table-column>
      <el-table-column prop="description" label="意圖描述"></el-table-column>
      <el-table-column prop="isextend" label="是否可擴"></el-table-column>
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
        <el-form-item label="意圖標識名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="意圖中文名" :label-width="formLabelWidth">
          <el-input v-model="form.displayname" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="意圖類型" :label-width="formLabelWidth">
          <el-input v-model="form.intenttype" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="是否可擴" :label-width="formLabelWidth">
          <el-input v-model="form.isextend" auto-complete="off"></el-input>
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
  import {getUserList} from '../../api'

  export default {
    data() {
      return {
           tableData: [
          {'name': 'entity', 'displayname': '實體', 'intenttype': 'other', 'description': '實體意圖，譬如：明天呢，明天 北京呢？這樣的 意為-實體，沒有説明非常明顯的意圖', 'isextend': 2},
          {'name': 'chat', 'displayname': '閑聊', 'intenttype': 'other', 'description': '閑聊，就是偏聊天類的短語', 'isextend': 2},
          {'name': 'unknow', 'displayname': '未知', 'intenttype': 'other', 'description': '就是系統未能識別的意圖', 'isextend': 2},
          {'name': 'unprocess', 'displayname': '不處理', 'intenttype': 'other', 'description': '就是系統有相關語料，但是將相關意圖歸與不處理的意圖', 'isextend': 2},
          {'name': 'ask_menu', 'displayname': '餐單', 'intenttype': 'keyword', 'description': '在餐廳内，詢問餐單，索要餐單，以備後續點單做準備', 'isextend': 1},
          {'name': 'company_address', 'displayname': '公司地址', 'intenttype': 'keyword', 'description': '詢問公司地址，譬如:請問你們公司地址在哪裏？你們公司怎麽過去？', 'isextend': 1},
          {'name': 'company_business_time', 'displayname': '營業時間', 'intenttype': 'keyword', 'description': '詢問公司營業時間，譬如：營業時間；你們上班的時間是多少？', 'isextend': 1},
          {'name': 'company_information', 'displayname': '公司介紹', 'intenttype': 'keyword', 'description': '詢問公司介紹：譬如：公司介紹;介紹下你們公司', 'isextend': 1},
          {'name': 'search_products', 'displayname': '產品', 'intenttype': 'search', 'description': '搜索產品，詢問產品，譬如： 有沒有火鷄賣？有沒有口罩？ 口罩？', 'isextend': 1},
          {'name': 'book', 'displayname': '預約', 'intenttype': 'task', 'description': '預約', 'isextend': 1},
          {'name': 'cancel_book', 'displayname': '取消預約', 'intenttype': 'task', 'description': '取消預約', 'isextend': 1}
          ],
        formInline: {
          name: 'ask_menu',
          id:'1'
        },
        currentPage:1,
        total:1,
        pageSize:5,
        intenttypeList:["other", "keyword", "search","task"],
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
          pageSize: this.pageSize,
          name: this.formInline.name,
          displayname: this.formInline.displayname
        };
        getUserList(params).then(function(result){
          this.tableData = result.data.list;
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
