// Generated by LiveScript 1.6.0
var reg, com, print, hoplon, z, l, print_fail, p, hop, dum1, dum2, V, out;
reg = require("../dist/registry");
require("../dist/main");
com = reg.com, print = reg.print, hoplon = reg.hoplon;
z = com.z, l = com.l, print_fail = com.print_fail;
p = print_fail('test2.js');
hop = hoplon;
dum1 = function(str){
  switch (str) {
  case 'int':
    return 'intger';
  case 'str':
    return 'string';
  }
};
dum2 = function(str){
  switch (str) {
  case 'obj':
    return 'object';
  case 'map':
    return 'map';
  }
};
V = hop.ma(dum2, 'obj_or_map').def(null);
out = V('obj');
if (!(out === 'obj_or_map')) {
  p();
}