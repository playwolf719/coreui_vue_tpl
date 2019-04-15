<template>
    <div>


      <b-row class="mt-2" >
        <b-col md="2">
          <label >规范</label>
        </b-col>
        <b-col md="6">
          <multiselect v-model="theIndex" @select="" :options="indexOption"   :preserve-search="true" placeholder="" label="name" track-by="id" :show-no-results="false"  :allow-empty="false" deselect-label=""   >
            <span slot="noOptions">输入规范名</span>
          </multiselect>
        </b-col>
      </b-row>

      <!--<b-row>-->
        <!--<b-col md="2">-->
          <!--<label >输入样例</label>-->
        <!--</b-col>-->
        <!--<b-col md="6">-->
          <!--{{ tip }}-->
        <!--</b-col>-->
      <!--</b-row>-->

      <b-row class="mt-2">
        <b-col md="2">
          <label >内容</label>
        </b-col>
        <b-col sm="6">
          <b-form-textarea  placeholder="内容" v-model="desc_str" rows="4" max-rows="6"/>
        </b-col>
        <b-col v-if="descErr" sm="4">
          <font color="red">{{ descErr }}</font>
        </b-col>
      </b-row>


      <b-row class="mt-2" >
        <b-col>
          <b-button @click="submit" >提交</b-button>
          <b-button @click="reset"   >重置</b-button>
        </b-col>
      </b-row>



      <b-modal title="提示"  class="modal-info" v-model="dangerModal" @ok="" hide-header-close ok-only @keydown.native.enter="" ok-variant="info">{{dangerMsg}}
      </b-modal>
    </div>
</template>

<script>
    export default {
      name: "Create",
      data() {
        return {
          desc: "",
          desc_str: "",
          tip:'{"name":"规范名称"}',
          descErr:"",
          indexOption:[
            {id:"人民防空地下室设计规范",name:"人民防空地下室设计规范"},
            {id:"住宅建筑",name:"住宅建筑"},
            {id:"住宅设计",name:"住宅设计"},
            {id:"建筑设计防火规范",name:"建筑设计防火规范"},
            {id:"无障碍设计规范",name:"无障碍设计规范"},
            {id:"民用建筑设计通则",name:"民用建筑设计通则"},
            {id:"车库建筑设计规范",name:"车库建筑设计规范"},],
          theIndex:{id:"人民防空地下室设计规范",name:"人民防空地下室设计规范"},
          dangerMsg:"",
          dangerModal:false
        }
      },
      watch : {
        desc:{
          handler: function (val, oldVal) {
            if(val){
              if(!this.$mycommon.isJsonString(val)){
                this.descErr = "必须为json格式"
              }else {
                this.descErr = ""
              }
            }
          }
        }
      },
      methods:{
        reset(){
          this.desc_str = ""
        },
        submit(){
          if(this.validate()){
            var postBody = {
              "oper":"add_one_cont",
              "ent":"search",
              "info":{
                "index":"tiaomu",
                "data":{
                  "guifan":this.theIndex["id"],
                  "tiaomu":this.desc_str
                }
              }
            }
            this.$mycommon.postCommonInter(this,postBody,"create",this.after_create_data)
          }
        },
        after_create_data(){
          // this.$router.push('list')
          this.dangerMsg = "插入成功！"
          this.dangerModal = true
          this.reset()
        },
        validate(){
          // if(this.descErr){
          //   return
          // }
          if(!this.desc_str){
            this.descErr = "不得为空"
            return
          }
          return true
        }
      }


    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>
