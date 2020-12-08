// Generated by LiveScript 1.6.0
(function(){
  var reg, com, already_created, verify, modflag, print, main, l, z, R, uic, binapi, init, settle, modSettle, tightloop, looper, handle, genfun, props, cat, getter, topcache, entry, pkg, slice$ = [].slice, arrayFrom$ = Array.from || function(x){return slice$.call(x);};
  reg = require("./registry");
  require("./print");
  require("./verify");
  com = reg.com, already_created = reg.already_created, verify = reg.verify, modflag = reg.modflag, print = reg.print, main = reg.main;
  l = com.l, z = com.z, R = com.R, uic = com.uic, binapi = com.binapi;
  init = {
    str: [],
    fns: [],
    def: null,
    fault: false,
    unary: false,
    immutable: false
  };
  settle = function(F, A){
    var ftype, f;
    ftype = F[0], f = F[1];
    switch (ftype) {
    case 'f':
      return f.apply(null, A);
    case 's':
      return f;
    }
  };
  modSettle = function(F, init, A){
    var ftype, f, modArg;
    ftype = F[0], f = F[1];
    switch (ftype) {
    case 'f':
      switch (A.length) {
      case 1:
        return f(init, A[0]);
      case 2:
        return f(init, A[0], A[1]);
      case 0:
        return f(init);
      case 3:
        return f(init, A[0], A[1], A[2]);
      case 4:
        return f(init, A[0], A[1], A[2], A[3]);
      case 5:
        return f(init, A[0], A[1], A[2], A[3], A[4]);
      default:
        modArg = [init].concat(arrayFrom$(A));
        return f.apply(null, modArg);
      }
    case 's':
      return f;
    }
  };
  tightloop = function(state){
    return function(){
      var first, arglen, I, fns, terminate, ref$, fname, data, validator, fin, F, spans, ret, def;
      if (state.unary) {
        first = arguments[0];
        switch (R.type(first)) {
        case 'Arguments':
        case 'Array':
          arglen = first.length;
          break;
        default:
          print.route([['not_array'], state]);
          return undefined;
        }
      } else {
        arglen = arguments.length;
      }
      I = 0;
      fns = state.fns;
      terminate = fns.length;
      while (I < terminate) {
        ref$ = fns[I], fname = ref$.fname, data = ref$.data;
        switch (fname) {
        case 'wh':
          validator = data[0], fin = data[1];
          if (validator.apply(null, arguments)) {
            return settle(fin, arguments);
          }
          break;
        case 'whn':
          validator = data[0], F = data[1];
          if (!validator.apply(null, arguments)) {
            return settle(F, arguments);
          }
          break;
        case 'ar':
          spans = data[0], F = data[1];
          if (spans[arglen]) {
            return settle(F, arguments);
          }
          break;
        case 'arn':
          spans = data[0], F = data[1];
          if (!spans[arglen]) {
            return settle(F, arguments);
          }
          break;
        case 'arwh':
          spans = data[0], validator = data[1], F = data[2];
          if (spans[arglen] && validator.apply(null, arguments)) {
            return settle(F, arguments);
          }
          break;
        case 'ma':
          validator = data[0], fin = data[1];
          ret = validator.apply(null, arguments);
          if (ret) {
            return modSettle(fin, ret, arguments);
          }
          break;
        case 'arma':
          spans = data[0], validator = data[1], fin = data[2];
          ret = validator.apply(null, arguments);
          if (ret) {
            return modSettle(fin, ret, arguments);
          }
          break;
        case 'arwhn':
          spans = data[0], validator = data[1], F = data[2];
          if (spans[arglen] && !validator.apply(null, arguments)) {
            return settle(F, arguments);
          }
          break;
        case 'arnwh':
          spans = data[0], validator = data[1], F = data[2];
          if (!spans[arglen] && validator.apply(null, arguments)) {
            return settle(F, arguments);
          }
          break;
        case 'arnwhn':
          spans = data[0], validator = data[1], F = data[2];
          if (!(spans[arglen] && validator.apply(null, arguments))) {
            return settle(F, arguments);
          }
        }
        I += 1;
      }
      def = state.def;
      if (def) {
        switch (def[0]) {
        case 'f':
          return def[1].apply(def, arguments);
        case 's':
          return def[1];
        }
      }
    };
  };
  looper = function(state){
    var instance, frozen;
    instance = Object.create(main);
    instance[modflag] = state;
    frozen = Object.freeze(instance);
    return frozen;
  };
  handle = {};
  handle.fault = function(self, data, fname){
    var state, FT, neo;
    state = self[modflag];
    FT = ['input', fname, data];
    print.route([FT, state]);
    neo = Object.assign({}, state, {
      fault: FT
    });
    return looper(neo);
  };
  handle.ok = function(self, data, fname){
    var state, fns, neo;
    state = self[modflag];
    if (state.immutable || state.str.length === 0) {
      fns = state.fns.concat({
        fname: fname,
        data: data
      });
      neo = Object.assign({}, state, {
        fns: fns,
        str: state.str.concat(fname)
      });
      return looper(neo);
    } else {
      state.fns.push({
        fname: fname,
        data: data
      });
      state.str.push(fname);
      neo = state;
      return self;
    }
  };
  handle.def = {};
  handle.def.fault = function(){
    return null;
  };
  handle.def.fault[uic] = print.log.def_fault;
  handle.def.ok = function(self, data){
    var state, neo, F;
    state = self[modflag];
    neo = Object.assign({}, state, {
      def: data,
      str: state.str
    });
    F = tightloop(neo);
    if (state.debug) {
      F[uic] = print.log.wrap(neo);
    }
    return F;
  };
  genfun = function(vfun, fname){
    return function(){
      var state, ref$, zone, data;
      state = this[modflag];
      if (state.fault) {
        return this;
      }
      ref$ = vfun(arguments), zone = ref$[0], data = ref$[1];
      return handle[zone](this, data, fname);
    };
  };
  main[uic] = print.log.proto;
  main.def = function(){
    var state, ref$, zone, data;
    state = this[modflag];
    if (state.fault) {
      return handle.def.fault;
    }
    ref$ = verify.def(arguments), zone = ref$[0], data = ref$[1];
    return handle.def.ok(this, data);
  };
  props = ['ma', 'arma', 'wh', 'ar', 'whn', 'arn', 'arwh', 'arnwh', 'arwhn', 'arnwhn'];
  R.reduce(function(ob, prop){
    ob[prop] = genfun(verify.getvfun(prop), prop);
    return ob;
  }, main, props);
  cat = {};
  cat.opt = new Set(['unary', 'immutable', 'debug']);
  cat.methods = new Set(props.concat(["def"]));
  getter = function(arg$, key){
    var path, lock, str, vr, npath, sorted;
    path = arg$.path, lock = arg$.lock, str = arg$.str, vr = arg$.vr;
    if (lock) {
      print.route([['setting', 'path_locked'], [vr, key]]);
      return null;
    }
    if (cat.opt.has(key)) {
      if (R.includes(key, path)) {
        print.route([['setting', 'already_in_path'], [vr, key]]);
        return null;
      } else {
        npath = path.concat(key);
        sorted = R.clone(npath).sort();
        return {
          path: sorted,
          lock: false,
          str: sorted.join("."),
          vr: npath
        };
      }
    } else if (cat.methods.has(key)) {
      return {
        path: path,
        lock: true,
        str: str,
        vr: vr,
        key: key
      };
    } else {
      print.route([['setting', 'not_in_opts'], [vr, key]]);
      return null;
    }
  };
  topcache = {};
  entry = function(data, args){
    var str, has, path, lock, vr, key, ob, i$, len$, ke, put;
    str = data.str;
    has = topcache[str];
    if (has) {
      return has[data.key].apply(has, args);
    }
    path = data.path, lock = data.lock, vr = data.vr, key = data.key;
    ob = {};
    for (i$ = 0, len$ = path.length; i$ < len$; ++i$) {
      ke = path[i$];
      ob[ke] = true;
    }
    put = looper(Object.assign({}, init, ob));
    topcache[str] = put;
    return put[key].apply(put, args);
  };
  pkg = binapi(entry, getter, {
    path: [],
    lock: false,
    vr: [],
    str: [],
    key: null
  }, print.log.prox);
  reg.hoplon = pkg;
  module.exports = pkg;
}).call(this);
