import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/models'
    },
    // {
    //   path: '/login',
    //   component: resolve => require(['../components/user/Login.vue'], resolve)
    // },
    {
      path: '/hometwo',
      component: resolve => require(['../components/HomeSubOne.vue'], resolve),
    },
    {
      path: '/home',
      component: resolve => require(['../components/Home.vue'], resolve),
      children:[
        {
          path: '/',
          component: resolve => require(['../components/Index.vue'], resolve)
        },
        {
          path: '/doc',
          component: resolve => require(['../components/Index.vue'], resolve)
        },
        {
          path: '/models',
          component: resolve => require(['../components/model/Model.vue'], resolve)
        },
        {
          path: '/sys/models',
          component: resolve => require(['../components/model/sysModel.vue'], resolve)
        },
        {
          path: '/intents',
          component: resolve => require(['../components/intent/IntentTypes.vue'], resolve)
        },
        {
          path: '/sys/intents',
          component: resolve => require(['../components/intent/sysIntentTypes.vue'], resolve)
        },
        {
          path: '/intent/data',
          component: resolve => require(['../components/intent/Intent.vue'], resolve)
        },
        {
          path: '/sys/entitys',
          component: resolve => require(['../components/entity/sysEntityType.vue'], resolve)
        },
        {
          path: '/entitys',
          component: resolve => require(['../components/entity/EntityType.vue'], resolve)
        },
        {
          path: '/entity/data',
          component: resolve => require(['../components/entity/Entity.vue'], resolve)
        },
        {
          path: '/users',
          component: resolve => require(['../components/user/Users.vue'], resolve)
        },
        {
          path: '/user/info',
          component: resolve => require(['../components/user/UserInfo.vue'], resolve)
        },
        {
          path: '/elemtest',
          component: resolve => require(['../components/vuetest/VueElemForm.vue'], resolve)
        },
        {
          path: '/elemfileupload',
          component: resolve => require(['../components/vuetest/VueElemFileUpload.vue'], resolve)
        },
        {
          path: '/dialog',
          component: resolve => require(['../components/vuetest/VueElemChatbotTest.vue'], resolve)
        }
      ]
    }
  ]
})
