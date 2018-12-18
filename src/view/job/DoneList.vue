<template>
<div>

<b-row>
      <b-col md="6" >
        <b-form-group horizontal label="过滤" >
          <b-input-group>
            <b-form-select v-model="selected" :options="options" @input="selectChange" />
            <b-form-input v-model="filter" placeholder="" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">清除</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
</b-row>
    <b-table striped hover :items="items" :fields="fields" @sort-changed="sortChanged"  :no-local-sorting="bool_true">
      <template slot="oper" slot-scope="data">
        <a href="#"   @click="chkUserDoneList(data.item.task_id)"  title="用户完成情况"><i class="fa fa-list" /></a>
      </template>
    </b-table>

    <b-pagination size="sm" :total-rows="total_count" v-model="cur_page" :per-page="count" align="center" @input="pageChanged">
    </b-pagination>
    <b-modal title="提示" class="modal-info" v-model="dangerModal" @ok="dangerModal = false" ok-variant="info">{{dangerMsg}}
      </b-modal>
    </div>
</template>

<script>
import mycommon from '@/lib/mycommon.js'

export default {
  name: 'list',
  data: () => {
    return {
      fields: {
        task_id: {
          label: '任务ID',
          sortable: true
        },
        task_name: {
          label: '任务名称',
          sortable: false
        },
        num: {
          label: '完成的工作数量',
          sortable: true
        },
        oper:{
          label: '操作',
        }
      },
      selected:"task_id",
      options: [
        { value: "task_id", text: '任务ID' },
      ],
      items: [
      ],
      filter: null,
      dangerMsg:"",
      dangerModal:false,
      cur_page:1,
      total_count:0,
      count:5,
      is_auth:0,
      offset:0,
      sortBy:"task_id",
      sortDesc:true,
      bool_true:true,
      filter_where:""
    }
  },
  watch : {
    filter:{
        handler: function (val, oldVal) {
          this.filter_where = ""
          if(val ){
            this.filter_where = this.selected + " = " +val
          }
          this.load_data()
        }
    }
  },
  methods:{
    selectChange(ctx){
      console.log(ctx)
      this.filter = null
    },
    sortChanged(ctx){
      this.sortBy = ctx.sortBy
      if (this.sortBy){
        this.sortDesc = ctx.sortDesc
        this.load_data()
      }
    },
    pageChanged(page){
      this.offset = (page-1)*this.count
      this.load_data()
    },
    chkUserDoneList(tid){
      this.$router.push({ name: '用户工作完成情况', params: { taskId: tid }})
    },
    mytest(data){
      var arr = JSON.parse(data)
      return arr;
    },
    load_data(){
      var postBody = {
        "oper":"querydonedata",
        "ent":"job",
        "info":{
          "count":this.count,
          "offset":this.offset,
        }
      }
      if (this.filter_where){
        postBody["info"]["where"] = this.filter_where
      }
      if (this.sortBy){
        postBody["info"]["order_by"] = [
            {
              "field":this.sortBy,
              "sort":this.sortDesc?"desc":"asc",
            }
        ]
      }
      this.$mycommon.postCommonInter(this,postBody);
    },
  },
  mounted(){
    this.uid = this.$mycommon.getUinfo()["id"]
    this.load_data();
  },

}
</script>
