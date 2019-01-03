<template>
    <b-row>
      <b-col sm="12">
        <b-card>
          <b-form>
            <b-form-group
              label="任务名称"
              label-for="horizEmail"
              description=""
              :label-cols="2"
              :horizontal="true">
              <b-col sm="6"><b-form-input id="horizEmail" type="text" placeholder="" autocomplete="" v-model="form.name" @blur.native = "validate"></b-form-input></b-col>
              <b-col sm="4" ><font v-if="form.name_tip" color="red" size="2">{{form.name_tip}}</font></b-col>
            </b-form-group>
            <b-form-group
              label="任务描述"
              label-for="horizPass"
              description=""
              :label-cols="2"
              :horizontal="true">
              <b-col sm="6"><b-form-input id="horizPass" type="text" placeholder=""  v-model="form.desc" @blur.native = "validate" ></b-form-input></b-col>
              <b-col sm="4" ><font v-if="form.desc_tip" color="red" size="2">{{form.desc_tip}}</font></b-col>
            </b-form-group>
            <b-row >
              <b-col sm="4" offset-sm="4" ><font v-if="form.field_tip" color="red" size="2">{{form.field_tip}}</font></b-col>
            </b-row>
            <b-card v-for="(input, index) in inputs" >

              <b-row>
                <b-col sm="2">
                  <b-form-group label="字段名" >
                    <b-form-input type="text"  placeholder="" v-model="input.name"  @blur.native = "validate"   ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="3">
                  <b-form-group label="描述">
                    <b-form-input type="text" placeholder="" v-model="input.desc" @blur.native = "validate"></b-form-input>
                  </b-form-group>
                </b-col>

                <b-col sm="2">
                  <b-form-group
                    label="必填" >
                    <b-form-checkbox-group stacked name="Checkboxes" :plain="true"  v-model="input.checked" >
                      <b-form-checkbox value="1">是</b-form-checkbox>
                    </b-form-checkbox-group>
                  </b-form-group>
                </b-col>
                <b-col sm="2">
                  <b-form-group
                    label="操作"
                    >
                    <b-button size="sm" variant="danger" @click="delField(index)" ><i class="fa fa-trash-alt"></i> 删除</b-button>
                  </b-form-group>
                </b-col>
                <b-col sm="3" class="tip-style">
                  <font v-if="input.tip" color="red" size="2">{{input.tip}}</font>
                </b-col>
              </b-row>
            </b-card>
            <div slot="footer">
              <b-button  size="sm"  @click="addField" variant="primary" ><i class="fa fa-plus" /> 增加字段</b-button>
              <b-button size="sm" variant="primary" @click="create"><i class="fa fa-dot-circle-o"></i> 发布</b-button>
              <b-button size="sm" variant="danger" @click="reset"><i class="fa fa-ban"></i> 重置</b-button>
            </div>
          </b-form>
        </b-card>
      </b-col>

    <b-modal title="提示" class="modal-info" v-model="dangerModal" @ok="dangerModal = false" ok-variant="info">{{dangerMsg}}
    </b-modal>
    </b-row>
</template>
<style>
.tip-style{
  padding:15px;
}
</style>
<script>
var e_form = {
        name: '',
        desc: '',
        name_tip:"",
        desc_tip:"",
        field_tip:""
      }
var e_field= {
        name: '',
        desc:'',
        checked:[],
        tip:''
      }
var name_tip = "名称不得为空！"
var field_tip = "必须添加自定义字段！"
export default {
  data() {
    return {
      form: this.$jQuery.extend(true, {}, e_form),
      inputs:[],
      dangerModal:false,
      dangerMsg:""
    }
  },
  methods: {
    addField(){
      var newObject = this.$jQuery.extend(true, {}, e_field);
      this.inputs.push(newObject)
    },
    after_create_data(data){
      this.dangerMsg = data.msg
      this.dangerModal = true
      this.$router.push('list')
    },
    create(){
      if (this.validate()){
        var postBody = {
          "oper":"create",
          "ent":"task",
          "info":{
            "name":this.form.name,
            "desc":this.form.desc,
            "field_list":this.inputs
          }
        }
        this.$mycommon.postCommonInter(this,postBody,"create",this.after_create_data)
      }
    },
    delField(index){
      this.inputs.splice(index,1)
    },
    reset(){
      var len = this.inputs.length
      this.inputs = []
      this.form = this.$jQuery.extend(true, {}, e_form)
      for (const x of Array(len).keys()) {
        this.inputs.push(this.$jQuery.extend(true, {}, e_field))
      }
    },
    validate(){
      var tmp_arr = this.inputs
      this.inputs = []
      this.form.name_tip = ""
      this.form.desc_tip = ""
      this.form.field_tip = ""
      var flag = true
      var name_list = []
      for ( var key in tmp_arr) {
        if(this.$mycommon.isEmpty(tmp_arr[key].name)){
          tmp_arr[key].tip = name_tip
          flag = false
        }else if (name_list.indexOf(tmp_arr[key].name) >= 0){
          tmp_arr[key].tip = "字段名不得重复！"
          flag = false
        }else{
          tmp_arr[key].tip = ""
        }
        name_list.push(tmp_arr[key].name)
        this.inputs.push(tmp_arr[key])
      }
      if(this.$mycommon.isListEmpty(this.inputs) ){
        this.form.field_tip = field_tip
        flag = false
      }
      if(this.$mycommon.isEmpty(this.form.name)){
        this.form.name_tip = name_tip
        flag = false
      }
      if(this.$mycommon.isEmpty(this.form.desc)){
        this.form.desc_tip = "描述不得为空！"
        flag = false
      }
      return flag
    }
  }
}
</script>
