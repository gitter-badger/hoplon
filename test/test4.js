// Generated by LiveScript 1.6.0
var reg, com, print, hoplon, z, l, print_fail, R, p, hop, type_num, type_str, V, out;
reg = require("../dist/registry");
require("../dist/main");
com = reg.com, print = reg.print, hoplon = reg.hoplon;
z = com.z, l = com.l, print_fail = com.print_fail, R = com.R;
p = print_fail('test4.js');
hop = hoplon;
type_num = function(x){
  switch (x) {
  case 'integer':
    return 'int';
  case 'boolean':
    return 'bool';
  default:
    return false;
  }
};
type_str = function(x){
  switch (x) {
  case 'string':
    return 'str';
  default:
    return false;
  }
};
V = hop.ar(1, hop.ma(type_num, function(x){
  return x;
}).def(["FROM UDEF"])).def(null);
out = V('integer');
if (!(out === 'int')) {
  p();
}
out = V(null);
if (!(R.type(out) === 'Array')) {
  p();
}
if (!(out[0] === "FROM UDEF")) {
  p();
}