// Generated by LiveScript 1.6.0
(function(){
  var reg, wait, com, print, hoplon, hop, z, l, R, p, bothNum, argE, typeE, add;
  reg = require("../dist/registry");
  require("../dist/main");
  wait = function(t, f){
    return setTimeout(f, t);
  };
  com = reg.com, print = reg.print, hoplon = reg.hoplon;
  hop = hoplon;
  z = com.z, l = com.l, R = com.R;
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
}).call(this);
