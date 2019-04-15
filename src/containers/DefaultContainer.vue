<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
      数据平台
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav class="ml-auto">

        <DefaultHeaderDropdownAccnt/>
      </b-navbar-nav>
      <!--<AsideToggler class="d-none d-lg-block" />-->
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>

      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <TheFooter>
      <!--footer-->
      <div class="ml-auto">
        cbdeng<span class="ml-1">&copy;2018</span>
      </div>

    </TheFooter>
  </div>
</template>

<script>
import nav from '@/_nav'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'


var e_task_route = {
  name: '任务',
  url: '/task',
  icon: 'icon-info',
  children: [
    {
      name: '我的任务列表',
      url: '/task/mylist',
      // icon: 'icon-puzzle'
    },
    {
      name: '公共任务列表',
      url: '/task/list',
      // icon: 'icon-list',
    },
  ]
}


var e_job_route = {
  name: '工作',
  url: '/job',
  icon: 'icon-puzzle',
  children: [
    {
      name: '我的工作列表',
      url: '/job/list',
      // icon: 'icon-list',
    },
  ]
}
var e_search_route = {
  name: '数据检索',
  url: '/search',
  icon: 'icon-cursor',
  children: [
    {
      name: '数据录入',
      url: '/search/create',
      // icon: 'icon-list',
    },
    {
      name: '检索列表',
      url: '/search/list',
      // icon: 'icon-list',
    },
  ]
}

var e_nav_list = [
    {
      name: '首页',
      url: '/',
      icon: 'icon-speedometer',
      badge: {
        // variant: 'primary',
        // text: 'NEW'
      }
    },
  ]

export default {
  name: 'DefaultContainer',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data () {
    return {
      nav: nav.items,
      dangerMsg:"",
      dangerModal:false
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    },
  },
  mounted:function(){
    var uinfo= JSON.parse(this.$mycommon.getCookie("uinfo"))

    var task_route = this.$jQuery.extend(true, {}, e_task_route)
    var job_route = this.$jQuery.extend(true, {}, e_job_route)
    var search_route = this.$jQuery.extend(true, [], e_search_route)
    var nav_list = this.$jQuery.extend(true, [], e_nav_list)
    if ([1, 2,3].indexOf(uinfo.cate) >= 0){
      task_route["children"].push({
          name: '任务发布',
          url: '/task/create',
          // icon: 'icon-cursor'
        })
      job_route["children"].push({
          name: '工作完成情况',
          url: '/job/done_list',
          // icon: 'icon-layers'
        })
      nav_list.push(search_route)
    }
    nav_list.push(task_route)
    nav_list.push(job_route)
    this.nav = nav_list
  },
}
</script>
