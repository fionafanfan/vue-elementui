<template>
  <div id="users">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">

      <el-form-item label="词典標識名">
        <el-input v-model="formInline.name" placeholder="词典標識名"></el-input>
      </el-form-item>

      <el-form-item label="词典類型">
        <el-select v-model="formInline.wordtype" placeholder="词典類型">
          <el-option v-for="item in wordtypeList" :key="item" :label="item" :value="item"></el-option>
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
      <el-table-column prop="name" label="词典標識名" width="180"></el-table-column>
      <el-table-column prop="displayname" label="词典中文名"></el-table-column>
      <el-table-column prop="wordtype" label="词典類型"></el-table-column>
      <el-table-column prop="isextend" label="是否可擴"></el-table-column>
      <el-table-column prop="samples" label="詞典示例"></el-table-column>
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
        <el-form-item label="詞典標識名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="詞典中文名" :label-width="formLabelWidth">
          <el-input v-model="form.displayname" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="詞典類型" :label-width="formLabelWidth">
          <el-input v-model="form.wordtype" auto-complete="off"></el-input>
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
                {'name': 'menu_name', 'displayname': '餐單種類', 'author': '官方', 'isextend': 1, 'issys': 1, 'wordtype': 'vocab', 'functype': 'slot', 'samples': '早餐；午餐；晚餐等', 'status': 1},
                {'name': 'time_name', 'displayname': '時間種類', 'author': '官方', 'isextend': 1, 'issys': 1, 'wordtype': 'vocab', 'functype': 'slot', 'samples': '', 'status': 1},
                {'name': 'address_name', 'displayname': '地址種類', 'author': '官方', 'isextend': 1, 'issys': 1, 'wordtype': 'vocab', 'functype': 'slot', 'samples': '', 'status': 1},
                {'name': 'product_name', 'displayname': '產品', 'author': '官方', 'isextend': 1, 'issys': 1, 'wordtype': 'vocab', 'functype': 'slot', 'samples': '口罩，勞力士等，明顯是物品或商品之類的詞', 'status': 1},
                {'name': 'information_name', 'displayname': '介紹種類', 'author': '官方', 'isextend': 1, 'issys': 1, 'wordtype': 'vocab', 'functype': 'slot', 'samples': '', 'status': 1},
                {'name': 'menu_context_word', 'displayname': '餐單語義', 'author': '官方', 'isextend': 1, 'issys': 1, 'wordtype': 'vocab', 'functype': 'context', 'samples': '餐單；餐牌；菜單；菜牌等', 'status': 1},
                {'name': 'time_context_word', 'displayname': '時間語義', 'author': '官方', 'isextend': 1, 'issys': 1, 'wordtype': 'vocab', 'functype': 'context', 'samples': '時間；幾點；等', 'status': 1},
                {'name': 'address_context_word', 'displayname': '地址語義', 'author': '官方', 'isextend': 1, 'issys': 1, 'wordtype': 'vocab', 'functype': 'context', 'samples': '地址；地點；地方；哪裏', 'status': 1},
                {'name': 'product_context_word', 'displayname': '找產品語義', 'author': '官方', 'isextend': 1, 'issys': 1, 'wordtype': 'vocab', 'functype': 'context', 'samples': '', 'status': ''},
                {'name': 'information_context_word', 'displayname': '介紹語義', 'author': '官方', 'isextend': 1, 'issys': 1, 'wordtype': 'vocab', 'functype': 'context', 'samples': '簡介；介紹；詳情；等', 'status': 1},
                {'name': 'book_contex_word', 'displayname': '預約語義', 'author': '官方', 'isextend': 1, 'issys': 1, 'wordtype': 'vocab', 'functype': 'context', 'samples': '預約；預定；預訂；book 等', 'status': 2},
                {'name': 'cancel_book_contex_word', 'displayname': '取消預約語義', 'author': '官方', 'isextend': 1, 'issys': 1, 'wordtype': 'vocab', 'functype': 'context', 'samples': '取消預約；取消預定；取消預訂；cancel book;', 'status': 2},
                {'name': 'date_time', 'displayname': '日期和時間', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'other', 'functype': 'slot', 'samples': '11月18号;\n三点;\n上午;\n端午节;\n情人节;\n星期一', 'status': 2},
                {'name': 'number', 'displayname': '數字', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'other', 'functype': 'slot', 'samples': '1-20位数字 支持汉字数字和阿拉伯数字：\n1101;\n一仟二百一拾五', 'status': 2},
                {'name': 'url', 'displayname': '網址', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'regex', 'functype': 'slot', 'samples': '正則', 'status': 2},
                {'name': 'tel', 'displayname': '電話號碼', 'author':'官方', 'isextend': 2, 'issys': 1, 'wordtype': 'regex', 'functype': 'slot', 'samples': '正則', 'status': 2},
                {'name': 'hello', 'displayname': '你好', 'author': '官方', 'isextend': 2,'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'thank', 'displayname': '謝謝', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'please', 'displayname': '請', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype':'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'modal', 'displayname': '語氣詞', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'ask', 'displayname': '詢問', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'yao', 'displayname': '索要', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'give', 'displayname': '給我', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'can', 'displayname': '可以', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'can_check', 'displayname': '可不可以', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'yes', 'displayname': 1, 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'no', 'displayname': '不', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'what', 'displayname': '什麽', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'what_have', 'displayname': '有什麽', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'what_is', 'displayname': '是什麽', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'what_have_check', 'displayname': '有沒有', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'what_is_check', 'displayname': '是不是', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'where', 'displayname': '地點', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'iwant', 'displayname': '我想', 'author': '官方','isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'query', 'displayname': '查詢', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'how', 'displayname': '怎樣', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'Inform', 'displayname': '告訴', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux','samples': '輔助詞', 'status': 1},
                {'name': 'helpme', 'displayname': '幫我', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'you', 'displayname': '你', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'me', 'displayname': '我', 'author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1},
                {'name': 'my', 'displayname': '我的','author': '官方', 'isextend': 2, 'issys': 1, 'wordtype': 'vocab', 'functype': 'aux', 'samples': '輔助詞', 'status': 1}
],
        formInline: {
          name: 'menu_name',
          id:'1'
        },
        currentPage:1,
        total:43,
        pageSize:5,
        isextendList:["是","否"],
        wordtypeList:["vocab", "regex"],
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
          address: this.formInline.address
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
