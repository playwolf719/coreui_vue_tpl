<template>
<div>

    <b-table striped hover :items="items" :fields="fields" @sort-changed="sortChanged"  :no-local-sorting="bool_true">
      <template slot="field_list" slot-scope="data">
         <div v-for="(input, index) in data.value" ><strong>字段{{index+1}}：</strong> {{input["name"]}}</div>
      </template>
      <template slot="oper" slot-scope="data">
        <a href="#"   @click="doTask(data.item.id)"  ><i class="fa fa-edit" title="做任务" /></a>
        <a href="#"  v-if="is_auth" @click="delTask(data.item.id)"  ><i class="fa fa-trash" /></a>
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
        id: {
          label: 'ID',
          sortable: true
        },
        name: {
          label: '名称',
          sortable: true
        },
        desc: {
          label: '描述',
          sortable: true
        },
        field_list: {
          label: '字段描述',
          formatter: "mytest"
        },
        create_time: {
          label: '创建时间',
          formatter: (value, key, item) => {
            return mycommon.timeStamp2String(value*1000)
          },
          sortable: true
        },
        oper:{
          label: '操作',
        }
      },
      items: [
      ],
      dangerMsg:"",
      dangerModal:false,
      cur_page:1,
      total_count:0,
      count:10,
      is_auth:0,
      offset:0,
      sortBy:"id",
      sortDesc:true,
      bool_true:true
    }
  },
  methods:{
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
    delTask(id){
      var postBody = {
        "oper":"update",
        "ent":"task",
        "info":{
          "status":1,
          "ct_where":"id = "+id+" and status=0"
        }
      }
      this.$mycommon.postCommonInter(this,postBody,"update",this.load_data);
    },
    doTask(id){
      this.$router.push({ name: '做任务', params: { taskId: id }})
    },
    mytest(data){
      var arr = JSON.parse(data)
      return arr;
    },
    load_data(){
      var postBody = {
        "oper":"query",
        "ent":"task",
        "info":{
          "count":this.count,
          "offset":this.offset,
          "where":"status=0"
        }
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
    this.is_auth = this.$mycommon.isAuth()
    this.load_data();
  },

}
</script>
