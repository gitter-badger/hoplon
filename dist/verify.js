// Generated by LiveScript 1.6.0
(function(){
  var reg, com, verify, print, sig, z, R, V, betterTypeof, slice$ = [].slice, arrayFrom$ = Array.from || function(x){return slice$.call(x);};
  reg = require("./registry");
  com = reg.com, verify = reg.verify, print = reg.print, sig = reg.sig;
  z = com.z, R = com.R;
  V = verify;
  betterTypeof = function(x){
    var type;
    type = typeof x;
    if (type === 'object') {
      if (Array.isArray(x)) {
        return 'array';
      } else if (x === null) {
        return 'null';
      } else {
        return 'object';
      }
    } else {
      return type;
    }
  };
  reg.betterTypeof = betterTypeof;
  V.def = function(args){
    var f;
    f = args[0];
    switch (betterTypeof(f)) {
    case 'function':
      return ['ok', ['f', f]];
    default:
      return ['ok', ['s', f]];
    }
  };
  V.num = function(num){
    var i$, len$, v;
    if (typeof num === 'number') {
      return 'num';
    } else if (Array.isArray(num)) {
      for (i$ = 0, len$ = num.length; i$ < len$; ++i$) {
        v = num[i$];
        if (!(typeof v === 'number')) {
          return 'fault.array';
        }
      }
      return 'array';
    } else {
      return 'fault';
    }
  };
  V.ar = function(args){
    var num, fun, ret;
    if (args.length > 2) {
      return ['fault', 'many_args'];
    }
    if (args.length < 2) {
      return ['fault', 'few_args'];
    }
    num = args[0], fun = args[1];
    ret = [];
    switch (V.num(num)) {
    case 'num':
      ret.push(['n', num]);
      break;
    case 'array':
      ret.push(['a', num]);
      break;
    case 'fault':
      return ['fault', 'first'];
    case 'fault.array':
      return ['fault', 'array'];
    }
    switch (betterTypeof(fun)) {
    case 'function':
      ret.push(['f', fun]);
      break;
    default:
      ret.push(['s', fun]);
    }
    return ['ok', ret];
  };
  V.wh = function(args){
    var validator, ap, ret;
    if (args.length > 2) {
      return ['fault', 'many_args'];
    }
    if (args.length < 2) {
      return ['fault', 'few_args'];
    }
    validator = args[0], ap = args[1];
    ret = [];
    switch (betterTypeof(validator)) {
    case 'function':
      ret.push(['f', validator]);
      break;
    default:
      return ['fault', 'first'];
    }
    switch (betterTypeof(ap)) {
    case 'function':
      ret.push(['f', ap]);
      break;
    default:
      ret.push(['s', ap]);
    }
    return ['ok', ret];
  };
  V.ma = function(argObj){
    var args, ret, i$, len$, I;
    args = arrayFrom$(argObj);
    if (args.length === 0) {
      return ['fault', 'few_args'];
    }
    args = R.flatten(args);
    ret = [];
    for (i$ = 0, len$ = args.length; i$ < len$; ++i$) {
      I = args[i$];
      switch (betterTypeof(I)) {
      case 'function':
        ret.push(['f', I]);
        break;
      default:
        return ['fault', 'typeError'];
      }
    }
    return ['ok', ret];
  };
  V.arwh = function(args){
    var num, validator, ap, ret, type;
    if (args.length > 3) {
      return ['fault', 'many_args'];
    }
    if (args.length < 3) {
      return ['fault', 'few_args'];
    }
    num = args[0], validator = args[1], ap = args[2];
    ret = [];
    switch (V.num(num)) {
    case 'num':
      ret.push(['n', num]);
      break;
    case 'array':
      ret.push(['a', num]);
      break;
    case 'fault':
      return ['fault', 'first'];
    case 'fault.array':
      return ['fault', 'array'];
    }
    switch (betterTypeof(validator)) {
    case 'function':
      ret.push(['f', validator]);
      break;
    default:
      return ['fault', 'second'];
    }
    type = betterTypeof(ap);
    switch (type) {
    case 'function':
      ret.push(['f', ap]);
      break;
    default:
      ret.push(['s', ap]);
    }
    return ['ok', ret];
  };
  V.getvfun = function(fname){
    switch (fname) {
    case 'wh':
    case 'whn':
      return V.wh;
    case 'ar':
    case 'arn':
      return V.ar;
    case 'arwh':
    case 'arnwh':
    case 'arwhn':
    case 'arnwhn':
      return V.arwh;
    case 'ma':
      return V.ma;
    case 'def':
      return V.def;
    }
  };
}).call(this);
