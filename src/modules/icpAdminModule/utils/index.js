var utils = {
  toQueryPair:function(key, value) {
    if (typeof value == 'undefined') {
      return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  },
  toQueryString:function(obj) {
    var ret = [];
    for (var key in obj) {
      key = encodeURIComponent(key);
      var values = obj[key];
      if (values && values.constructor == Array) { //数组 
        var queryValues = [];
        for (var i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else { //字符串 
        ret.push(this.toQueryPair(key, values));
      }
    }
    return ret.join('&');
  },
  rawhtml:function(val){
    return val.replace(/(^\r\n$)|(\n)/g, '<br/>').replace(/([\s\t])/g, '&nbsp;')
  },
  getQueryString:function(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
  },
  /**
 * 
 * @param {*} cur 当前页数
 * @param {*} pageSize 分页数，决定开始num
 * @param {*} totalNum 总页数，决定结束
 */
 getInterval:function(cur,pageSize,totalNum){
  var start = Math.floor(cur/pageSize)*pageSize;
  var end = start+pageSize;
  if(end>totalNum){
    end = totalNum
  }
  var arr = [];
  for(var i=start;i<end;i++){
    if(i>0){
      arr.push(i);
    }
  }
  return arr
} 
}
export default utils