
var mycommon_base = {
  isEmpty(str) {
    return (!str || 0 === str.length);
  },
  isListEmpty(theList){
    if (typeof theList !== 'undefined' && theList.length == 0) {
      return true
    }
    if (typeof theList === 'undefined'){
      return false
    }
    return false
  },
  setCookie(cname,cvalue,exseconds){
    var d = new Date();
    d.setTime(d.getTime()+(exseconds*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
  },
  getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
    }
    return "";
  },

  delCookie( name ) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  },
  timeStamp2String (time){
        var datetime = new Date();
         datetime.setTime(time);
         var year = datetime.getFullYear();
         var month = datetime.getMonth() + 1;
         var date = datetime.getDate();
         var hour = datetime.getHours();
         var minute = datetime.getMinutes();
         var second = datetime.getSeconds();
         var mseconds = datetime.getMilliseconds();
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
  },
  postCommonInter(myThis,postBody,cate="list",callback=undefined){
    var cate_list = ["list","update","insert","logicDel","one"]
    if (callback===undefined) {
      if (cate_list.indexOf(cate)==-1) {
        throw "[postCommonInter]cate out of range";
      }
    }
    myThis.$axios.post('/dh/index', postBody)
    .then(response => {
      var ret = response.data
      console.log(ret)
      if(ret.code){
        myThis.dangerModal = true
        myThis.dangerMsg = ret.msg
        if (ret.code==10400){
          myThis.$router.push('/')
        }
      }else{
        if (callback===undefined) {
          if (cate == "list") {
            myThis.items = ret.data.data_list
            myThis.cur_page = ret.data.cur_page
            myThis.offset = ret.data.offset
            myThis.total_count = ret.data.total_count
            myThis.count = ret.data.count
          }
        }else {
          callback(ret)
        }
      }
    })
    .catch(e => {
        console.log(e);
        myThis.dangerModal = true
        myThis.dangerMsg = "请稍后再试！"
    })
  }
}

var mycommon_mid = {
  getUinfo(){
    return JSON.parse(mycommon_base.getCookie("uinfo"))
  },
  isAuth(){
    var uinfo = JSON.parse(mycommon_base.getCookie("uinfo"))
    if(uinfo["cate"] in [1,2]){
      return true
    }
    return false
  },
}

var mycommon= Object.assign({}, mycommon_base, mycommon_mid);

export default mycommon
