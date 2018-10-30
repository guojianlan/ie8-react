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
  }
}
export default utils