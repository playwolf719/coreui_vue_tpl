<template>
  <el-form ref="form" :model="form" label-width="40px" label-position="left">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item  label="任务名称" label-width="80px">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item  label="任务描述" label-width="80px">
          <el-input v-model="form.desc"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-for="(input, index) in inputs" :gutter="5">
      <el-col :span="6">
        <el-form-item  label="字段" >
          <el-input v-model="input.name" :span="24"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item  label="描述" >
          <el-input v-model="input.desc"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item  >
          <el-checkbox v-model="input.required" >必填</el-checkbox>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item  >
          <el-button @click="delField(index)" >删除</el-button>
        </el-form-item>
      </el-col>
      <el-col  :span="6" >
        <el-form-item   style="text-align:center;">
          <font v-if="input.tip" color="red" size="2">{{input.tip}}</font>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="3">
        <el-button @click="addField" >增加字段</el-button>
        <el-button @click="reset" >重置</el-button>
        <el-button @click="create" >发布</el-button>
      </el-col>
    </el-row>
   </el-form>
</template>

<script>
var e_field= {
        name: '',
        desc:'',
        required:true,
        tip:''
      }
var e_form = {
        name: '',
        desc: '',
      }
export default {
  data() {
    return {
      form: this.$jQuery.extend(true, {}, e_form),
      inputs:[]
    }
  },
  methods: {
    addField(){
      var newObject = this.$jQuery.extend(true, {}, e_field);
      this.inputs.push(newObject)
    },
    create(){
      console.log("create")
      if (this.validate()){

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
      var flag = true
      for ( var key in tmp_arr) {
        console.log(tmp_arr[key],tmp_arr[key].name)
        if(this.$mycommon.isEmpty(tmp_arr[key].name)){
          tmp_arr[key].tip = "字段名称不得为空！"
          flag = false
        }
        this.inputs.push(tmp_arr[key])
      }
      return flag
    }

  }
}
</script>
