/*
* common/js/queue.js
* 队列对象
*/ 

var us = require('../../lib/underscore.js');
var queue = function(name) {  //构造方法
  this.name = name;
  this.callbackArray = [];
};

//原型方法
queue.prototype = {
  getName: function() {
    return this.name;
  },

  add: function() {
    this.callbackArray.push({
      //传递时，最后一个参数为函数调用体
      callback: us.last(arguments),
      args:arguments   //函数传入参数
    });
  },

  fire: function() {
    var fireObj = this.callbackArray.shift();  //获取当前队列中第一个对象
    fireObj.callback(fireObj.args);  //执行
  },

  getSize: function() {
    return this.callbackArray.length;
  },
};

var queues = {
  wxAjaxQueue: new queue('wxAjaxQueue')
};

var handle = {
  getQueue: function(name) {
    if(queues[name]){
      return queues[name];
    }
  }
};


module.exports = handle;