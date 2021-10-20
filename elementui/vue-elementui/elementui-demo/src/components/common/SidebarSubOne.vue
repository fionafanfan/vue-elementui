<template>
    <div class="sidebar">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="當前模型" :label-width="formLabelWidth">
          <el-input readonly="true"  v-model="formInline.vid" auto-complete="off"></el-input>
       </el-form-item>
    </el-form>
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="light" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}</el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
   import {getModelList} from '../../api'

    export default {
        data() {
            return {
            modelvidList:[],
            formInline:{
            "vid":""
              },
                items: []
            }
        },
        beforeMount() {
            var meuns = sessionStorage.getItem('meuns');
            var qs = require('qs');
            //this.items = qs.parse(menus);
            var params = {
            page: this.currentPage,
            pageSize: this.pageSize
              };
        getModelList(params).then(function(result){
          this.tableData = result.data.tableData;
          var modelvidList = []
          this.tableData.forEach(function (item) {
              if (item.vid) {
                  //console.log('----item>>',item);
                  modelvidList.push(item.vid)
                  return;
              }
            //console.log('----item2>>',item);
          });
          this.modelvidList = modelvidList;
          this.loading2 = false;
        }.bind(this)).catch(function (error) {
            this.loading2 = false;
            console.log(error);
        }.bind(this));
            //this.modelvidList = ["v1","v2"]
            console.log('vid-->',this.modelvidList)
            var vid =localStorage.getItem('vid') ||'intent_entity_common'
            this.formInline = {"vid":vid}
            localStorage.setItem('vid',vid);
            this.items = [
                      {
                      icon: 'el-icon-menu',
                      index: '/models',
                      title: '模型管理'
                      },
                    {
                      icon: 'el-icon-menu',
                      index: '2',
                      title: '意圖管理',
                        subs: [
                        {
                        index: '/intents',
                        title: '意圖類型列表'
                        },
                        {
                        index: '/intent/data',
                        title: '意圖語料列表'
                        }
                        ]
                      },
                      {
                      icon: 'el-icon-menu',
                      index: '2',
                      title: '實體管理',
                        subs: [
                        {
                        index: '/entitys',
                        title: '實體類型列表'
                        },
                        {
                        index: '/entity/data',
                        title: '實體數據列表'
                        }
                        ]
                      },
                      {
                      icon: 'el-icon-menu',
                      index: '/doc',
                      title: '文檔'
                      },
                ]
       },
        computed: {
            onRoutes(){
                console.log(this.$route.path);
                return this.$route.path;
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 200px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
