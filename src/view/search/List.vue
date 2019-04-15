<template>
<div>

<b-row>

  <b-col md="6" >
    <multiselect v-model="guifan_selected" :options="guifan_options"  @select="gfSelected" :preserve-search="true" placeholder="规范" label="name" track-by="name" :preselect-first="true" :allow-empty="false"  >
    </multiselect>
  </b-col>


  <b-col md="6" >
    <b-form-group horizontal  >
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
      <!--<template slot="content" slot-scope="data">-->
        <!--<div v-for="(input, index) in data.value" ><strong>{{input["name"]}}:</strong> {{input["value"]}}</div>-->
      <!--</template>-->
      <template slot="oper" slot-scope="data">
        <a href="#"   @click="delItem(data.item._id)"  ><i class="fa fa-trash" /></a>
      </template>
    </b-table>

    <b-pagination size="sm" :total-rows="total_count" v-model="cur_page" :per-page="count" align="center" @input="pageChanged">
    </b-pagination>


    <b-modal title="提示" class="modal-info" v-model="dangerModal" @ok="dangerModal = false" ok-variant="info">{{dangerMsg}}
      </b-modal>



  <b-modal title="删除中" class="modal-info" v-model="infoModal" @ok="infoModal = false" hide-header-close no-close-on-backdrop ok-variant="info" hide-footer >
    <div class="text-center">
      <b-spinner label="Spinning" />
    </div>
  </b-modal>

    </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script>
import mycommon from '@/lib/mycommon.js'

export default {
  name: 'list',
  data: () => {
    return {
      fields: {
        _source: {
          label: '条目',
          formatter: (value, key, item) => {
            return value["tiaomu"]
          }
        },
        _source1: {
          label: '规范',
          formatter: (value, key, item) => {
            return "《"+item["_source"]["guifan"]+"》"
          }
        },
        oper:{
          label: '操作',
        }
      },
      selected:"tiaomu",
      options: [
        { value: "tiaomu", text: '条目' },
      ],
      guifan_selected:{ id: "all", name: '全部' },
      guifan_options:[
        { id: "all", name: '全部' },
        {id:"人民防空地下室设计规范",name:"人民防空地下室设计规范"},
        {id:"住宅建筑",name:"住宅建筑"},
        {id:"住宅设计",name:"住宅设计"},
        {id:"建筑设计防火规范",name:"建筑设计防火规范"},
        {id:"无障碍设计规范",name:"无障碍设计规范"},
        {id:"民用建筑设计通则",name:"民用建筑设计通则"},
        {id:"车库建筑设计规范",name:"车库建筑设计规范"},
      ],
      items: [
      ],
      filter: "",
      dangerMsg:"",
      infoModal:false,
      dangerModal:false,
      cur_page:1,
      total_count:0,
      count:10,
      is_auth:0,
      offset:0,
      sortBy:"id",
      sortDesc:true,
      bool_true:true,
      filter_where:""
    }
  },
  watch : {
    filter:{
        handler: function (val, oldVal) {
          this.filter_where = ""
          var flag = false;
          if(val){
            if(this.selected == "task_id" && !isNaN(val) ){
              flag = true;
              this.filter_where = this.selected + " = " +val
            }
          }
          this.load_data()
        }
    }
  },
  methods:{
    gfSelected(res){
      this.guifan_selected = res
      this.load_data()
    },
    selectChange(ctx){
      this.filter = ""
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
    delItem(id){
      var postBody = {
        "oper":"del_one_cont",
        "ent":"search",
        "info":{
          "index":this.selected,
          "id":id
        }
      }
      this.$mycommon.postCommonInter(this,postBody,"update",this.after_del);
    },
    after_del(){
      this.infoModal = true
      var that = this
      setTimeout(function(){ that.infoModal = false;that.load_data() }, 2000);
    },
    mytest(data){
      var arr = JSON.parse(data)
      return arr;
    },
    load_data(){
      var postBody = {
        "oper":"query8cond",
        "ent":"search",
        "info":{
          "count":this.count,
          "offset":this.offset,
          "index":this.selected,
          "guifan":this.guifan_selected["id"],
          "cond":this.filter
        }
      }
      this.$mycommon.postCommonInter(this,postBody,"custom",this.after_load_data);
    },
    after_load_data(ret){
      var myThis = this
      myThis.items = ret.data.data_list
      myThis.cur_page = ret.data.cur_page
      myThis.offset = ret.data.offset
      myThis.total_count = ret.data.total_count
      myThis.count = ret.data.count
    }
  },
  mounted(){
    this.uid = this.$mycommon.getUinfo()["id"]
    this.load_data();
  },

}
</script>
