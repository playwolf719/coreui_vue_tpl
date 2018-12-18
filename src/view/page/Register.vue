<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form>
                <h1>注册账户</h1>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" class="form-control" placeholder="用户名" autocomplete="username" v-model="form.name"  />
                </b-input-group>
                <b-row v-if="form.name_tip" >
                  <b-col  ><font color="red" size="2">{{form.name_tip}}</font></b-col>
                </b-row>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" class="form-control" placeholder="密码" autocomplete="new-password" v-model="form.password"  />
                </b-input-group>
                <b-row v-if="form.password_tip" >
                  <b-col  ><font color="red" size="2">{{form.password_tip}}</font></b-col>
                </b-row>

                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" class="form-control" placeholder="重复密码" autocomplete="new-password" v-model="form.password_rep" />
                </b-input-group>
                <b-row v-if="form.password_rep_tip" >
                  <b-col  ><font color="red" size="2">{{form.password_rep_tip}}</font></b-col>
                </b-row>

                <b-button variant="success" block @click="submit">注册</b-button>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>

    <b-modal title="提示" class="modal-info" v-model="dangerModal" @ok="exitModel" ok-only ok-variant="info">{{dangerMsg}}
    </b-modal>
  </div>
</template>

<script>
var e_form = {
        name: '',
        password: '',
        password_rep:"",
        name_tip: '',
        password_tip: '',
        password_rep_tip: '',
      }
var e_password_rep_tip = "两次输入不一致！"
var e_password_tip = "密码不得为空且长度不得小于6！"
var e_name_tip = "账户名不得为空！"
export default {
  name: 'Register',
  data() {
    return {
      form: this.$jQuery.extend(true, {}, e_form),
      dangerModal: false,
      dangerMsg: "",
      code:1,
    }
  },
  watch : {
      form : {
        handler: function (val, oldVal) {
          if(val.name){
            val.name_tip = ""
          }else{
            val.name_tip = e_name_tip
          }
          if(val.password && val.password.length>=6){
            val.password_tip = ""
            if(val.password_rep!=val.password){
              val.password_rep_tip = e_password_rep_tip
            }else{
              val.password_rep_tip = ""
            }
          }else{
            val.password_tip = e_password_tip
          }
        },
        deep: true
      }
  },
  methods: {
    exitModel(){
      this.dangerModal = false
      this.dangerMsg = ""
      console.log(this.code)
      if(this.code==0){
        this.$mycommon.delCookie("token")
        this.$router.push('login')
       }
    },
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
      if(!this.$mycommon.isEmpty(this.form.password) && this.form.password!=this.form.password_rep ){
        this.form.password_rep_tip = e_password_rep_tip
        flag = false
      }
      return flag
    },
    submit(){
      if (this.validate()){
        var postBody = {
          "oper":"register",
          "ent":"user",
          "info":{
            "name":this.form.name,
            "password":this.form.password
          }
        }
        this.$axios.post('/dh/index', postBody)
        .then(response => {
          var data = response.data
          console.log(data)
          if(data.code){
            this.dangerModal = true
            this.dangerMsg = data.msg
          }else{
            this.dangerModal = true
            this.dangerMsg = data.msg
            this.code = data.code
          }
        })
        .catch(e => {
           this.dangerModal = true
           this.dangerMsg = "请稍后再试！"
          console.log(e);
        })
      }
    }
  }
}
</script>
