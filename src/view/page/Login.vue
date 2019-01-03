<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>数据平台</h1>
                  <p class="text-muted">苏州NLP</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control" placeholder="用户名" autocomplete="username" v-model="form.name"  @blur.native = "validate" />
                  </b-input-group>
                <b-row v-if="form.name_tip" >
                  <b-col  ><font color="red" size="2">{{form.name_tip}}</font></b-col>
                </b-row>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" class="form-control" placeholder="密码" autocomplete="current-password" v-model="form.password" @blur.native = "validate"/>
                  </b-input-group>
                <b-row v-if="form.password_tip" >
                  <b-col  ><font color="red" size="2">{{form.password_tip}}</font></b-col>
                </b-row>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" class="px-4" @click="submit">登录</b-button>
                    </b-col>

                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0" @click="$router.push({ name: '注册'})">去注册</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>

    <b-modal title="提示" class="modal-info" v-model="dangerModal" @ok="dangerModal = false" ok-variant="info">{{dangerMsg}}
    </b-modal>
  </div>
</template>

<script>
var e_form = {
        name: '',
        password: '',
        name_tip: '',
        password_tip: '',
      }
var e_password_tip = "密码不得为空！"
var e_name_tip = "账户名不得为空！"
export default {
  name: 'Login',
  data() {
    return {
      form: this.$jQuery.extend(true, {}, e_form),
      dangerModal:false,
      dangerMsg:""
    }
  },

  methods: {
    validate(){
      var flag = true
      this.form.name_tip = ""
      this.form.password_tip = ""
      if(this.$mycommon.isEmpty(this.form.name)){
        this.form.name_tip = e_name_tip
        flag = false
      }
      if(this.$mycommon.isEmpty(this.form.password)){
        this.form.password_tip = e_password_tip
        flag = false
      }
      return flag
    },
    after_login(data){
      //this.dangerModal = true
      //this.dangerMsg = data.msg
      this.$mycommon.setCookie("token",data.data.token,3500)
      var tmp = JSON.stringify(data.data)
      this.$mycommon.setCookie("uinfo",tmp,3500)
      this.$router.push('/')
    },
    submit(){
      if (this.validate()){
        var postBody = {
          "oper":"login",
          "ent":"user",
          "info":{
            "name":this.form.name,
            "password":this.form.password
          }
        }
        this.$mycommon.postCommonInter(this,postBody,"one",this.after_login)
      }
    }
   }
}
</script>
