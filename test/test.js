// Generated by LiveScript 1.6.0
(function(){
  var reg, com, print, hoplon, z, l, p, bothNum, argE, typeE, add, hop, F1;
  reg = require("../dist/registry");
  require("../dist/main");
  com = reg.com, print = reg.print, hoplon = reg.hoplon;
  z = com.z, l = com.l;
  p = print.fail('test.js');
  bothNum = function(x, y){
    return typeof x === "number" && typeof y === "number";
  };
  argE = function(){
    return z("only accepts 2 arugument");
  };
  typeE = function(){
    return z("argument type has to be number");
  };
  add = function(x, y){
    return x + y;
  };
  hop = hoplon;
  F1 = hop.whn(bothNum, typeE).arn(2, argE).ar(2, add).def(1);
}).call(this);