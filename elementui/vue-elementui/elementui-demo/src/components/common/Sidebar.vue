<template>
    <div class="sidebar">
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
    export default {
        data() {
            return {
                items: [
                      {
                      icon: 'el-icon-setting',
                      index: '/home',
                      title: '首页'
                      },
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
                      }
                ]
            }
        },
        //beforeMount() {
        //    var meuns = sessionStorage.getItem('meuns');
        //    var qs = require('qs');
        //    this.items = qs.parse(menus);
       // },
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
