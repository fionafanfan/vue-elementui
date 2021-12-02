<template>
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
  import {getModelDeatilDate} from '../../api'

  export default {
    data() {
      return {
        tableData: [],
        formInline: {
          vid: '',
          modeltype:'',
        },
        currentPage:1,
        total:0,
        pageSize:15,
        modeltypeList:["all","intent","entity"],
        pickerOptions0: {
            disabledDate(time) {
              return time.getTime() < Date.now() - 8.64e7;
            }
        },
        selectDate:'',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        form: {
            vid: '',
            modeltype: ''
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
          vid:this.formInline.vid,
          modeltype:this.formInline.modeltype
        };
        getModelList(params).then(function(result){
          console.log('params>>',params)
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
      //打开新增模型窗口-添加新的模型
      showAddModelDialog(){
        this.form.id = data.id;
        this.form.name = data.name;
        this.dialogFormVisible = true;
      },
      // 查看特定模型的具體數據
      handleClick(row){
          console.log('查看vid--->',row)
          if (row) {
                    localStorage.setItem('vid',row)
                    window.location.href = ('intents', 'intents')
                }

      },
      //打开编辑窗口
      showEditDialog(row){
        var data = this.tableData[row];
        this.form.vid = data.vid;
        var params = {
          vid: this.form.vid
        };
        getModelDeatilDate(params).then(function(result){
          this.form.displayname = result.data.displayname;
          this.form.description = result.data.description;
          this.form.language = result.data.language;
          this.form.isPrivate = result.data.isPrivate;
        }.bind(this)).catch(function (error) {
            this.loading2 = false;
            console.log(error);
        }.bind(this));
        this.dialogFormVisible = true;
      },
      update(){
        if (this.form.displayname == "") {
          this.$message.error('模型中文名不能为空');
          return;
        }
       if (this.form.description == "") {
          this.$message.error('模型描述不能为空');
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
