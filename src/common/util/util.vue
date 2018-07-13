<script>
  import Vue from 'vue'
  
  // exports.install = function(Vue, options) {}
  
  //全局变量：
  Vue.prototype.Test = "Test";

  //全局方法：调用方式：this.objCopy()
  //object uri =>string url 
  Vue.prototype.urlDecode = function (_url, _data) {
    _url += (_url.indexOf("?") != -1) ? "" : "?";
    for (var k in _data) {
      _url += ((_url.indexOf("=") != -1) ? "&" : "") + k + "=" + encodeURI(_data[k]);
    }
    return _url;
  };

  //对象深拷贝
  Vue.prototype.objCopy = function(_obj){
    return JSON.parse(JSON.stringify(_obj))
  };

  //对象：根据键值返回键
  Vue.prototype.getObjKey = function(_value,_obj){
    for(let key in _obj){
      if(_obj[key]===_value){
        return key;
      }
    }
  }

  //判断某元素是否在数组中
  Vue.prototype.in_array = function (_arr, _ele){
    for(let i=0;i<_arr.length;i++){
      if(_arr[i]===_ele){
        return true;
      }
    }
    return false;
  }

  //返回对象元素在数组中的idx
  Vue.prototype.getIdx = function (_ele, _arr){
    for(let i=0;i<_arr.length;i++){
      if(JSON.stringify(_arr[i])===JSON.stringify(_ele)){
        return i;
      }
    }
    return false;
  }

  //element ui 消息通知，待完成：封装成不定参数
  Vue.prototype.tips = function (_type='error', _message='操作错误'){
    this.$message({
      type: _type,
      message: _message,
    })
  }

  //根据key和数组对象返回新数组
  Vue.prototype.getArrByKey = function(_key,_arr){
    if(!_arr.length){
      return false;
    }
    let newArr = [];
    for(let i=0;i<_arr.length;i++){
      newArr.push(_arr[i][_key]);
    }
    return newArr;
  }

  //数组扁平化
  Vue.prototype.flattenDepth = function(array, depth=1) {

    let result = [];
    array.forEach (item => {
      let d = depth;
      if(Array.isArray(item) && d > 0){
        result.push(...(this.flattenDepth(item, --d)))
      } else {
        result.push(item);
      }
    })
    return result;
  }

  //数组对象去重
  Vue.prototype.uniqueArrObj = function(_arr) {
    let newArr = [];
    for(var i=0;i<_arr.length;i++){
	　　var flag = true;
	　　for(var j=0;j<newArr.length;j++){
　　　　if(_arr[i].id == newArr[j].id){
　　　　　flag = false;
    　　};
    　}; 
    　if(flag){
    　　newArr.push(_arr[i]);
		　};
    };
    return newArr;
  }

  export default{}
</script>