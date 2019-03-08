<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">用户:{{cname}}&nbsp;&nbsp;
    </template>\
    <template slot="dropdown">
      <b-dropdown-item @click="logout"><i class="fa fa-lock"  />注销</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { itemsCount: 42,name:"" }
  },
  computed: {
    cname(){
      return this.$mycommon.getUinfo()["name"]
    }
  },
  methods: {
    logout(){
      console.log("logout")
      this.$mycommon.delCookie('token');
      this.$mycommon.delCookie('uinfo');
      this.$router.push({ path: '/page/login' })
    }
  },

}
</script>
