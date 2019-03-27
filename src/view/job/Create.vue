<template>
    <b-row>
      <b-col sm="12">
        <b-card>
          <b-form>

            <b-form-group
              label="任务名称"
              description=""
              :label-cols="2"
              :horizontal="true" >
              <b-col sm="6" class="padtmp">{{ this.name }}</b-col>
            </b-form-group>
            <b-form-group
              label="任务描述"
              description=""
              :label-cols="2"
              :horizontal="true" >
              <b-col sm="6" class="padtmp">{{ this.desc }}</b-col>
            </b-form-group>


            <b-card v-for="(input, index) in field_list" >

              <b-row>
                <b-col sm="2">
                  <b-form-group label="字段名" >
                    {{ input.name }}
                  </b-form-group>
                </b-col>
                <b-col sm="3">
                  <b-form-group label="描述">
                    {{ input.desc }}</b-form-group>
                </b-col>

                <b-col sm="3">
                  <b-form-group label="值">
                    <b-form-textarea  type="text" placeholder="" :rows="2" :max-rows="6"  ref="myTest" v-model="input.value" @blur.native = "validate" ></b-form-textarea>
                  </b-form-group>
                </b-col>

                <b-col sm="3" class="tip-style">
                <br/>
                  <font v-if="input.tip" color="red" size="2">{{input.tip}}</font>
                </b-col>
              </b-row>
            </b-card>

            <div slot="footer">
              <b-button size="sm" variant="primary" @click="create"><i class="fa fa-dot-circle-o"></i> 发布</b-button>
              <b-button size="sm" variant="danger" @click="reset"><i class="fa fa-ban"></i> 重置</b-button>
            </div>

          </b-form>
        </b-card>
      </b-col>

    <b-modal title="提示"  class="modal-info" v-model="dangerModal" @ok="handleEnter" hide-header-close ok-only @keydown.native.enter="handleEnter" ok-variant="info">{{dangerMsg}}
      </b-modal>
    </b-row>
</template>

<script>

export default {
  name: 'Do',

  data: () => {
    return {
      name:"",
      desc:"",
      dangerMsg:"",
      dangerModal:false,
      field_list:[],
      origin_list:[]
    }
  },
  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods:{
    handleEnter(){
      this.dangerModal = false
      this.$nextTick(() => this.$refs["myTest"][0].focus())
    },
    after_load_data(ret){
      var data = ret.data
      if (data.data_list){
        var one = data.data_list[0]
        this.name = one.name
        this.desc = one.desc
        this.origin_list = JSON.parse(one.field_list)
        for (var x in this.origin_list){
          this.origin_list[x]["value"] = ""
          if (this.origin_list[x].defVal){
            this.origin_list[x]["value"] = this.origin_list[x].defVal
          }
        }
        this.field_list = this.$jQuery.extend(true, [], this.origin_list);
      }
    },
    after_create_data(ret){
      this.dangerMsg = "一条记录已生成，继续做任务！"
      this.dangerModal = true
      this.reset()
    },
    create(){
      if(this.validate()){
        var tid = this.$route.params.taskId
        var uinfo = this.$mycommon.getUinfo()
        var postBody = {
          "oper":"insert",
          "ent":"job",
          "info":{
            "task_id":tid,
            "user_id":uinfo["id"],
            "content":this.field_list
          }
        }
        this.$mycommon.postCommonInter(this,postBody,"create",this.after_create_data)
      }
    },
    reset(){
      this.field_list = this.$jQuery.extend(true, [], this.origin_list);
    },
    validate(){
      var flag = true
      var index = 0
      for (var x in this.field_list){
        if (this.field_list[x]["checked"].length && this.field_list[x]["value"]==""){
          this.field_list[x]["tip"] = "值不得为空！"
        }else{
          this.field_list[x]["tip"] = ""
          index = index + 1
        }
      }
      if (index!=Object.keys(this.field_list).length){
          flag = false
      }
      return flag
    }
  },
  mounted(){
    var tid = this.$route.params.taskId
    var postBody = {
      "oper":"query",
      "ent":"task",
      "info":{
        "where":"id = "+tid
      }
    }
    this.$mycommon.postCommonInter(this,postBody,"one",this.after_load_data)
  }
}

</script>
<style>
.padtmp {
  padding:"5px";
}
</style>
