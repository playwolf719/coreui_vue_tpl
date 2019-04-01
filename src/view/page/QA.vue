<template>
  <div class="app flex-row">
    <div class="container" >
      <b-card style="margin-top: 50px;" title="儿童问答">

        <b-row class="mt-2">
          <b-col sm="8">
            <b-form-textarea  placeholder="问题"  v-model="ques" />
          </b-col>
          <b-col sm="4">
            <b-button @click="submit">提交</b-button>
            <b-button @click="ques='' ; source=''">重置</b-button>
          </b-col>
        </b-row>


        <b-card class="mycard" v-if="source">

          <b-card class="mycard">
            <b-row class="mt-2" >
              <b-col sm="2"><b>source</b></b-col>
              <b-col sm="10">{{ source }}</b-col>
            </b-row>
          </b-card>


          <b-card class="mycard" v-for="(value,key) in info">
            <b-row class="mt-2" >
              <b-col sm="2"><b>{{ key }}</b></b-col>
              <b-col sm="10">{{ value }}</b-col>
            </b-row>
          </b-card>





        </b-card>

      </b-card>
    </div>


    <b-modal title="提示"  class="modal-info" v-model="dangerModal" @ok="dangerModal = false" hide-header-close ok-only @keydown.native.enter="handleEnter" ok-variant="info">{{dangerMsg}}
    </b-modal>

  </div>
</template>

<script>
    export default {
      name: "QA",
      data: () => {
        return {
          ques:"",
          dangerMsg:"",
          dangerModal:false,
          source:"",
          info:{},

        }
      },

      methods:{
        submit(){
          if(this.ques){
            this.$axios.get('/demo/ask?query='+this.ques).then(
              response => {
                var ret = response.data
                console.log(ret)
                if(ret.code){
                  this.dangerMsg = ret.msg
                  this.dangerModal = true
                }else {
                  var data = ret.data
                  this.source = data._source
                  this.info = data.info
                }
              }
            )
          }
        }
      }
    }
</script>

<style scoped>
.mycard{
  margin-top: 20px;
}
</style>
