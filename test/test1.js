// Generated by LiveScript 1.6.0
var reg, com, print, hoplon, z, l, R, c, print_fail, pf, hop, V1, retorn, V2, empty_array;
reg = require("../dist/registry");
require("../dist/main");
com = reg.com, print = reg.print, hoplon = reg.hoplon;
z = com.z, l = com.l, R = com.R, c = com.c, print_fail = com.print_fail;
pf = print_fail("test1.js");
hop = hoplon;
V1 = hop.arpar(1, function(){
  return [false, "hello"];
}, function(){
  return "world";
}, function(){
  return false;
}).def("foobar");
retorn = V1(1);
if (!(retorn === "foobar")) {
  pf(".arpar / normal validator function");
}
V2 = hop.arpar(1, function(){
  return [false];
}, function(){}, function(){
  return arguments[0];
}).def();
empty_array = V2(1);
if (!(R.type(empty_array) === 'Array')) {
  pf(".arpar error handling not being done correctly");
}