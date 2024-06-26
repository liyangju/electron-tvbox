var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_index_001 = __commonJS({
  "assets/index-1ee3b3fe.js"(exports, module) {
    /**
    * @vue/shared v3.4.23
    * (c) 2018-present Yuxi (Evan) You and Vue contributors
    * @license MIT
    **/
    /*! #__NO_SIDE_EFFECTS__ */
    // @__NO_SIDE_EFFECTS__
    function makeMap(str, expectsLowerCase) {
      const set2 = new Set(str.split(","));
      return expectsLowerCase ? (val) => set2.has(val.toLowerCase()) : (val) => set2.has(val);
    }
    const EMPTY_OBJ = {};
    const EMPTY_ARR = [];
    const NOOP = () => {
    };
    const NO = () => false;
    const isOn = (key2) => key2.charCodeAt(0) === 111 && key2.charCodeAt(1) === 110 && // uppercase letter
    (key2.charCodeAt(2) > 122 || key2.charCodeAt(2) < 97);
    const isModelListener = (key2) => key2.startsWith("onUpdate:");
    const extend = Object.assign;
    const remove = (arr, el) => {
      const i = arr.indexOf(el);
      if (i > -1) {
        arr.splice(i, 1);
      }
    };
    const hasOwnProperty$d = Object.prototype.hasOwnProperty;
    const hasOwn = (val, key2) => hasOwnProperty$d.call(val, key2);
    const isArray$2 = Array.isArray;
    const isMap$2 = (val) => toTypeString(val) === "[object Map]";
    const isSet$2 = (val) => toTypeString(val) === "[object Set]";
    const isFunction$1 = (val) => typeof val === "function";
    const isString$1 = (val) => typeof val === "string";
    const isSymbol$1 = (val) => typeof val === "symbol";
    const isObject$1 = (val) => val !== null && typeof val === "object";
    const isPromise = (val) => {
      return (isObject$1(val) || isFunction$1(val)) && isFunction$1(val.then) && isFunction$1(val.catch);
    };
    const objectToString$1 = Object.prototype.toString;
    const toTypeString = (value) => objectToString$1.call(value);
    const toRawType = (value) => {
      return toTypeString(value).slice(8, -1);
    };
    const isPlainObject = (val) => toTypeString(val) === "[object Object]";
    const isIntegerKey = (key2) => isString$1(key2) && key2 !== "NaN" && key2[0] !== "-" && "" + parseInt(key2, 10) === key2;
    const isReservedProp = /* @__PURE__ */ makeMap(
      // the leading comma is intentional so empty string "" is also included
      ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
    );
    const cacheStringFunction = (fn2) => {
      const cache = /* @__PURE__ */ Object.create(null);
      return (str) => {
        const hit = cache[str];
        return hit || (cache[str] = fn2(str));
      };
    };
    const camelizeRE = /-(\w)/g;
    const camelize = cacheStringFunction((str) => {
      return str.replace(camelizeRE, (_, c2) => c2 ? c2.toUpperCase() : "");
    });
    const hyphenateRE = /\B([A-Z])/g;
    const hyphenate = cacheStringFunction(
      (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
    );
    const capitalize = cacheStringFunction((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    });
    const toHandlerKey = cacheStringFunction((str) => {
      const s = str ? `on${capitalize(str)}` : ``;
      return s;
    });
    const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
    const invokeArrayFns = (fns, arg) => {
      for (let i = 0; i < fns.length; i++) {
        fns[i](arg);
      }
    };
    const def = (obj, key2, value) => {
      Object.defineProperty(obj, key2, {
        configurable: true,
        enumerable: false,
        value
      });
    };
    const looseToNumber = (val) => {
      const n = parseFloat(val);
      return isNaN(n) ? val : n;
    };
    const toNumber$1 = (val) => {
      const n = isString$1(val) ? Number(val) : NaN;
      return isNaN(n) ? val : n;
    };
    let _globalThis;
    const getGlobalThis = () => {
      return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
    };
    function normalizeStyle(value) {
      if (isArray$2(value)) {
        const res = {};
        for (let i = 0; i < value.length; i++) {
          const item = value[i];
          const normalized = isString$1(item) ? parseStringStyle(item) : normalizeStyle(item);
          if (normalized) {
            for (const key2 in normalized) {
              res[key2] = normalized[key2];
            }
          }
        }
        return res;
      } else if (isString$1(value) || isObject$1(value)) {
        return value;
      }
    }
    const listDelimiterRE = /;(?![^(]*\))/g;
    const propertyDelimiterRE = /:([^]+)/;
    const styleCommentRE = /\/\*[^]*?\*\//g;
    function parseStringStyle(cssText) {
      const ret = {};
      cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
        if (item) {
          const tmp = item.split(propertyDelimiterRE);
          tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
        }
      });
      return ret;
    }
    function normalizeClass(value) {
      let res = "";
      if (isString$1(value)) {
        res = value;
      } else if (isArray$2(value)) {
        for (let i = 0; i < value.length; i++) {
          const normalized = normalizeClass(value[i]);
          if (normalized) {
            res += normalized + " ";
          }
        }
      } else if (isObject$1(value)) {
        for (const name in value) {
          if (value[name]) {
            res += name + " ";
          }
        }
      }
      return res.trim();
    }
    const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
    const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
    function includeBooleanAttr(value) {
      return !!value || value === "";
    }
    const toDisplayString = (val) => {
      return isString$1(val) ? val : val == null ? "" : isArray$2(val) || isObject$1(val) && (val.toString === objectToString$1 || !isFunction$1(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
    };
    const replacer = (_key, val) => {
      if (val && val.__v_isRef) {
        return replacer(_key, val.value);
      } else if (isMap$2(val)) {
        return {
          [`Map(${val.size})`]: [...val.entries()].reduce(
            (entries, [key2, val2], i) => {
              entries[stringifySymbol(key2, i) + " =>"] = val2;
              return entries;
            },
            {}
          )
        };
      } else if (isSet$2(val)) {
        return {
          [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
        };
      } else if (isSymbol$1(val)) {
        return stringifySymbol(val);
      } else if (isObject$1(val) && !isArray$2(val) && !isPlainObject(val)) {
        return String(val);
      }
      return val;
    };
    const stringifySymbol = (v, i = "") => {
      var _a2;
      return (
        // Symbol.description in es2019+ so we need to cast here to pass
        // the lib: es2016 check
        isSymbol$1(v) ? `Symbol(${(_a2 = v.description) != null ? _a2 : i})` : v
      );
    };
    /**
    * @vue/reactivity v3.4.23
    * (c) 2018-present Yuxi (Evan) You and Vue contributors
    * @license MIT
    **/
    let activeEffectScope;
    class EffectScope {
      constructor(detached = false) {
        this.detached = detached;
        this._active = true;
        this.effects = [];
        this.cleanups = [];
        this.parent = activeEffectScope;
        if (!detached && activeEffectScope) {
          this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
            this
          ) - 1;
        }
      }
      get active() {
        return this._active;
      }
      run(fn2) {
        if (this._active) {
          const currentEffectScope = activeEffectScope;
          try {
            activeEffectScope = this;
            return fn2();
          } finally {
            activeEffectScope = currentEffectScope;
          }
        }
      }
      /**
       * This should only be called on non-detached scopes
       * @internal
       */
      on() {
        activeEffectScope = this;
      }
      /**
       * This should only be called on non-detached scopes
       * @internal
       */
      off() {
        activeEffectScope = this.parent;
      }
      stop(fromParent) {
        if (this._active) {
          let i, l;
          for (i = 0, l = this.effects.length; i < l; i++) {
            this.effects[i].stop();
          }
          for (i = 0, l = this.cleanups.length; i < l; i++) {
            this.cleanups[i]();
          }
          if (this.scopes) {
            for (i = 0, l = this.scopes.length; i < l; i++) {
              this.scopes[i].stop(true);
            }
          }
          if (!this.detached && this.parent && !fromParent) {
            const last = this.parent.scopes.pop();
            if (last && last !== this) {
              this.parent.scopes[this.index] = last;
              last.index = this.index;
            }
          }
          this.parent = void 0;
          this._active = false;
        }
      }
    }
    function recordEffectScope(effect, scope = activeEffectScope) {
      if (scope && scope.active) {
        scope.effects.push(effect);
      }
    }
    function getCurrentScope() {
      return activeEffectScope;
    }
    function onScopeDispose(fn2) {
      if (activeEffectScope) {
        activeEffectScope.cleanups.push(fn2);
      }
    }
    let activeEffect;
    class ReactiveEffect {
      constructor(fn2, trigger2, scheduler, scope) {
        this.fn = fn2;
        this.trigger = trigger2;
        this.scheduler = scheduler;
        this.active = true;
        this.deps = [];
        this._dirtyLevel = 4;
        this._trackId = 0;
        this._runnings = 0;
        this._shouldSchedule = false;
        this._depsLength = 0;
        recordEffectScope(this, scope);
      }
      get dirty() {
        if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
          this._dirtyLevel = 1;
          pauseTracking();
          for (let i = 0; i < this._depsLength; i++) {
            const dep = this.deps[i];
            if (dep.computed) {
              triggerComputed(dep.computed);
              if (this._dirtyLevel >= 4) {
                break;
              }
            }
          }
          if (this._dirtyLevel === 1) {
            this._dirtyLevel = 0;
          }
          resetTracking();
        }
        return this._dirtyLevel >= 4;
      }
      set dirty(v) {
        this._dirtyLevel = v ? 4 : 0;
      }
      run() {
        this._dirtyLevel = 0;
        if (!this.active) {
          return this.fn();
        }
        let lastShouldTrack = shouldTrack;
        let lastEffect = activeEffect;
        try {
          shouldTrack = true;
          activeEffect = this;
          this._runnings++;
          preCleanupEffect(this);
          return this.fn();
        } finally {
          postCleanupEffect(this);
          this._runnings--;
          activeEffect = lastEffect;
          shouldTrack = lastShouldTrack;
        }
      }
      stop() {
        var _a2;
        if (this.active) {
          preCleanupEffect(this);
          postCleanupEffect(this);
          (_a2 = this.onStop) == null ? void 0 : _a2.call(this);
          this.active = false;
        }
      }
    }
    function triggerComputed(computed2) {
      return computed2.value;
    }
    function preCleanupEffect(effect2) {
      effect2._trackId++;
      effect2._depsLength = 0;
    }
    function postCleanupEffect(effect2) {
      if (effect2.deps.length > effect2._depsLength) {
        for (let i = effect2._depsLength; i < effect2.deps.length; i++) {
          cleanupDepEffect(effect2.deps[i], effect2);
        }
        effect2.deps.length = effect2._depsLength;
      }
    }
    function cleanupDepEffect(dep, effect2) {
      const trackId = dep.get(effect2);
      if (trackId !== void 0 && effect2._trackId !== trackId) {
        dep.delete(effect2);
        if (dep.size === 0) {
          dep.cleanup();
        }
      }
    }
    let shouldTrack = true;
    let pauseScheduleStack = 0;
    const trackStack = [];
    function pauseTracking() {
      trackStack.push(shouldTrack);
      shouldTrack = false;
    }
    function resetTracking() {
      const last = trackStack.pop();
      shouldTrack = last === void 0 ? true : last;
    }
    function pauseScheduling() {
      pauseScheduleStack++;
    }
    function resetScheduling() {
      pauseScheduleStack--;
      while (!pauseScheduleStack && queueEffectSchedulers.length) {
        queueEffectSchedulers.shift()();
      }
    }
    function trackEffect(effect2, dep, debuggerEventExtraInfo) {
      if (dep.get(effect2) !== effect2._trackId) {
        dep.set(effect2, effect2._trackId);
        const oldDep = effect2.deps[effect2._depsLength];
        if (oldDep !== dep) {
          if (oldDep) {
            cleanupDepEffect(oldDep, effect2);
          }
          effect2.deps[effect2._depsLength++] = dep;
        } else {
          effect2._depsLength++;
        }
      }
    }
    const queueEffectSchedulers = [];
    function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
      pauseScheduling();
      for (const effect2 of dep.keys()) {
        let tracking;
        if (effect2._dirtyLevel < dirtyLevel && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
          effect2._shouldSchedule || (effect2._shouldSchedule = effect2._dirtyLevel === 0);
          effect2._dirtyLevel = dirtyLevel;
        }
        if (effect2._shouldSchedule && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
          effect2.trigger();
          if ((!effect2._runnings || effect2.allowRecurse) && effect2._dirtyLevel !== 2) {
            effect2._shouldSchedule = false;
            if (effect2.scheduler) {
              queueEffectSchedulers.push(effect2.scheduler);
            }
          }
        }
      }
      resetScheduling();
    }
    const createDep = (cleanup, computed2) => {
      const dep = /* @__PURE__ */ new Map();
      dep.cleanup = cleanup;
      dep.computed = computed2;
      return dep;
    };
    const targetMap = /* @__PURE__ */ new WeakMap();
    const ITERATE_KEY = Symbol("");
    const MAP_KEY_ITERATE_KEY = Symbol("");
    function track(target, type2, key2) {
      if (shouldTrack && activeEffect) {
        let depsMap = targetMap.get(target);
        if (!depsMap) {
          targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
        }
        let dep = depsMap.get(key2);
        if (!dep) {
          depsMap.set(key2, dep = createDep(() => depsMap.delete(key2)));
        }
        trackEffect(
          activeEffect,
          dep
        );
      }
    }
    function trigger(target, type2, key2, newValue, oldValue, oldTarget) {
      const depsMap = targetMap.get(target);
      if (!depsMap) {
        return;
      }
      let deps = [];
      if (type2 === "clear") {
        deps = [...depsMap.values()];
      } else if (key2 === "length" && isArray$2(target)) {
        const newLength = Number(newValue);
        depsMap.forEach((dep, key22) => {
          if (key22 === "length" || !isSymbol$1(key22) && key22 >= newLength) {
            deps.push(dep);
          }
        });
      } else {
        if (key2 !== void 0) {
          deps.push(depsMap.get(key2));
        }
        switch (type2) {
          case "add":
            if (!isArray$2(target)) {
              deps.push(depsMap.get(ITERATE_KEY));
              if (isMap$2(target)) {
                deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            } else if (isIntegerKey(key2)) {
              deps.push(depsMap.get("length"));
            }
            break;
          case "delete":
            if (!isArray$2(target)) {
              deps.push(depsMap.get(ITERATE_KEY));
              if (isMap$2(target)) {
                deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            }
            break;
          case "set":
            if (isMap$2(target)) {
              deps.push(depsMap.get(ITERATE_KEY));
            }
            break;
        }
      }
      pauseScheduling();
      for (const dep of deps) {
        if (dep) {
          triggerEffects(
            dep,
            4
          );
        }
      }
      resetScheduling();
    }
    function getDepFromReactive(object2, key2) {
      var _a2;
      return (_a2 = targetMap.get(object2)) == null ? void 0 : _a2.get(key2);
    }
    const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
    const builtInSymbols = new Set(
      /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key2) => key2 !== "arguments" && key2 !== "caller").map((key2) => Symbol[key2]).filter(isSymbol$1)
    );
    const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
    function createArrayInstrumentations() {
      const instrumentations = {};
      ["includes", "indexOf", "lastIndexOf"].forEach((key2) => {
        instrumentations[key2] = function(...args) {
          const arr = toRaw(this);
          for (let i = 0, l = this.length; i < l; i++) {
            track(arr, "get", i + "");
          }
          const res = arr[key2](...args);
          if (res === -1 || res === false) {
            return arr[key2](...args.map(toRaw));
          } else {
            return res;
          }
        };
      });
      ["push", "pop", "shift", "unshift", "splice"].forEach((key2) => {
        instrumentations[key2] = function(...args) {
          pauseTracking();
          pauseScheduling();
          const res = toRaw(this)[key2].apply(this, args);
          resetScheduling();
          resetTracking();
          return res;
        };
      });
      return instrumentations;
    }
    function hasOwnProperty$c(key2) {
      if (!isSymbol$1(key2))
        key2 = String(key2);
      const obj = toRaw(this);
      track(obj, "has", key2);
      return obj.hasOwnProperty(key2);
    }
    class BaseReactiveHandler {
      constructor(_isReadonly = false, _isShallow = false) {
        this._isReadonly = _isReadonly;
        this._isShallow = _isShallow;
      }
      get(target, key2, receiver) {
        const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
        if (key2 === "__v_isReactive") {
          return !isReadonly2;
        } else if (key2 === "__v_isReadonly") {
          return isReadonly2;
        } else if (key2 === "__v_isShallow") {
          return isShallow2;
        } else if (key2 === "__v_raw") {
          if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
          // this means the reciever is a user proxy of the reactive proxy
          Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
            return target;
          }
          return;
        }
        const targetIsArray = isArray$2(target);
        if (!isReadonly2) {
          if (targetIsArray && hasOwn(arrayInstrumentations, key2)) {
            return Reflect.get(arrayInstrumentations, key2, receiver);
          }
          if (key2 === "hasOwnProperty") {
            return hasOwnProperty$c;
          }
        }
        const res = Reflect.get(target, key2, receiver);
        if (isSymbol$1(key2) ? builtInSymbols.has(key2) : isNonTrackableKeys(key2)) {
          return res;
        }
        if (!isReadonly2) {
          track(target, "get", key2);
        }
        if (isShallow2) {
          return res;
        }
        if (isRef(res)) {
          return targetIsArray && isIntegerKey(key2) ? res : res.value;
        }
        if (isObject$1(res)) {
          return isReadonly2 ? readonly(res) : reactive(res);
        }
        return res;
      }
    }
    class MutableReactiveHandler extends BaseReactiveHandler {
      constructor(isShallow2 = false) {
        super(false, isShallow2);
      }
      set(target, key2, value, receiver) {
        let oldValue = target[key2];
        if (!this._isShallow) {
          const isOldValueReadonly = isReadonly(oldValue);
          if (!isShallow(value) && !isReadonly(value)) {
            oldValue = toRaw(oldValue);
            value = toRaw(value);
          }
          if (!isArray$2(target) && isRef(oldValue) && !isRef(value)) {
            if (isOldValueReadonly) {
              return false;
            } else {
              oldValue.value = value;
              return true;
            }
          }
        }
        const hadKey = isArray$2(target) && isIntegerKey(key2) ? Number(key2) < target.length : hasOwn(target, key2);
        const result = Reflect.set(target, key2, value, receiver);
        if (target === toRaw(receiver)) {
          if (!hadKey) {
            trigger(target, "add", key2, value);
          } else if (hasChanged(value, oldValue)) {
            trigger(target, "set", key2, value);
          }
        }
        return result;
      }
      deleteProperty(target, key2) {
        const hadKey = hasOwn(target, key2);
        target[key2];
        const result = Reflect.deleteProperty(target, key2);
        if (result && hadKey) {
          trigger(target, "delete", key2, void 0);
        }
        return result;
      }
      has(target, key2) {
        const result = Reflect.has(target, key2);
        if (!isSymbol$1(key2) || !builtInSymbols.has(key2)) {
          track(target, "has", key2);
        }
        return result;
      }
      ownKeys(target) {
        track(
          target,
          "iterate",
          isArray$2(target) ? "length" : ITERATE_KEY
        );
        return Reflect.ownKeys(target);
      }
    }
    class ReadonlyReactiveHandler extends BaseReactiveHandler {
      constructor(isShallow2 = false) {
        super(true, isShallow2);
      }
      set(target, key2) {
        return true;
      }
      deleteProperty(target, key2) {
        return true;
      }
    }
    const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
    const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
    const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(
      true
    );
    const toShallow = (value) => value;
    const getProto = (v) => Reflect.getPrototypeOf(v);
    function get$1(target, key2, isReadonly2 = false, isShallow2 = false) {
      target = target["__v_raw"];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key2);
      if (!isReadonly2) {
        if (hasChanged(key2, rawKey)) {
          track(rawTarget, "get", key2);
        }
        track(rawTarget, "get", rawKey);
      }
      const { has: has2 } = getProto(rawTarget);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      if (has2.call(rawTarget, key2)) {
        return wrap(target.get(key2));
      } else if (has2.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key2);
      }
    }
    function has(key2, isReadonly2 = false) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key2);
      if (!isReadonly2) {
        if (hasChanged(key2, rawKey)) {
          track(rawTarget, "has", key2);
        }
        track(rawTarget, "has", rawKey);
      }
      return key2 === rawKey ? target.has(key2) : target.has(key2) || target.has(rawKey);
    }
    function size(target, isReadonly2 = false) {
      target = target["__v_raw"];
      !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
      return Reflect.get(target, "size", target);
    }
    function add(value) {
      value = toRaw(value);
      const target = toRaw(this);
      const proto = getProto(target);
      const hadKey = proto.has.call(target, value);
      if (!hadKey) {
        target.add(value);
        trigger(target, "add", value, value);
      }
      return this;
    }
    function set$1(key2, value) {
      value = toRaw(value);
      const target = toRaw(this);
      const { has: has2, get: get2 } = getProto(target);
      let hadKey = has2.call(target, key2);
      if (!hadKey) {
        key2 = toRaw(key2);
        hadKey = has2.call(target, key2);
      }
      const oldValue = get2.call(target, key2);
      target.set(key2, value);
      if (!hadKey) {
        trigger(target, "add", key2, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key2, value);
      }
      return this;
    }
    function deleteEntry(key2) {
      const target = toRaw(this);
      const { has: has2, get: get2 } = getProto(target);
      let hadKey = has2.call(target, key2);
      if (!hadKey) {
        key2 = toRaw(key2);
        hadKey = has2.call(target, key2);
      }
      get2 ? get2.call(target, key2) : void 0;
      const result = target.delete(key2);
      if (hadKey) {
        trigger(target, "delete", key2, void 0);
      }
      return result;
    }
    function clear() {
      const target = toRaw(this);
      const hadItems = target.size !== 0;
      const result = target.clear();
      if (hadItems) {
        trigger(target, "clear", void 0, void 0);
      }
      return result;
    }
    function createForEach(isReadonly2, isShallow2) {
      return function forEach(callback, thisArg) {
        const observed = this;
        const target = observed["__v_raw"];
        const rawTarget = toRaw(target);
        const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
        !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
        return target.forEach((value, key2) => {
          return callback.call(thisArg, wrap(value), wrap(key2), observed);
        });
      };
    }
    function createIterableMethod(method2, isReadonly2, isShallow2) {
      return function(...args) {
        const target = this["__v_raw"];
        const rawTarget = toRaw(target);
        const targetIsMap = isMap$2(rawTarget);
        const isPair = method2 === "entries" || method2 === Symbol.iterator && targetIsMap;
        const isKeyOnly = method2 === "keys" && targetIsMap;
        const innerIterator = target[method2](...args);
        const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
        !isReadonly2 && track(
          rawTarget,
          "iterate",
          isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
        );
        return {
          // iterator protocol
          next() {
            const { value, done } = innerIterator.next();
            return done ? { value, done } : {
              value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
              done
            };
          },
          // iterable protocol
          [Symbol.iterator]() {
            return this;
          }
        };
      };
    }
    function createReadonlyMethod(type2) {
      return function(...args) {
        return type2 === "delete" ? false : type2 === "clear" ? void 0 : this;
      };
    }
    function createInstrumentations() {
      const mutableInstrumentations2 = {
        get(key2) {
          return get$1(this, key2);
        },
        get size() {
          return size(this);
        },
        has,
        add,
        set: set$1,
        delete: deleteEntry,
        clear,
        forEach: createForEach(false, false)
      };
      const shallowInstrumentations2 = {
        get(key2) {
          return get$1(this, key2, false, true);
        },
        get size() {
          return size(this);
        },
        has,
        add,
        set: set$1,
        delete: deleteEntry,
        clear,
        forEach: createForEach(false, true)
      };
      const readonlyInstrumentations2 = {
        get(key2) {
          return get$1(this, key2, true);
        },
        get size() {
          return size(this, true);
        },
        has(key2) {
          return has.call(this, key2, true);
        },
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear"),
        forEach: createForEach(true, false)
      };
      const shallowReadonlyInstrumentations2 = {
        get(key2) {
          return get$1(this, key2, true, true);
        },
        get size() {
          return size(this, true);
        },
        has(key2) {
          return has.call(this, key2, true);
        },
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear"),
        forEach: createForEach(true, true)
      };
      const iteratorMethods = [
        "keys",
        "values",
        "entries",
        Symbol.iterator
      ];
      iteratorMethods.forEach((method2) => {
        mutableInstrumentations2[method2] = createIterableMethod(method2, false, false);
        readonlyInstrumentations2[method2] = createIterableMethod(method2, true, false);
        shallowInstrumentations2[method2] = createIterableMethod(method2, false, true);
        shallowReadonlyInstrumentations2[method2] = createIterableMethod(
          method2,
          true,
          true
        );
      });
      return [
        mutableInstrumentations2,
        readonlyInstrumentations2,
        shallowInstrumentations2,
        shallowReadonlyInstrumentations2
      ];
    }
    const [
      mutableInstrumentations,
      readonlyInstrumentations,
      shallowInstrumentations,
      shallowReadonlyInstrumentations
    ] = /* @__PURE__ */ createInstrumentations();
    function createInstrumentationGetter(isReadonly2, shallow) {
      const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
      return (target, key2, receiver) => {
        if (key2 === "__v_isReactive") {
          return !isReadonly2;
        } else if (key2 === "__v_isReadonly") {
          return isReadonly2;
        } else if (key2 === "__v_raw") {
          return target;
        }
        return Reflect.get(
          hasOwn(instrumentations, key2) && key2 in target ? instrumentations : target,
          key2,
          receiver
        );
      };
    }
    const mutableCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(false, false)
    };
    const shallowCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(false, true)
    };
    const readonlyCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(true, false)
    };
    const reactiveMap = /* @__PURE__ */ new WeakMap();
    const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
    const readonlyMap = /* @__PURE__ */ new WeakMap();
    const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
    function targetTypeMap(rawType) {
      switch (rawType) {
        case "Object":
        case "Array":
          return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
          return 2;
        default:
          return 0;
      }
    }
    function getTargetType(value) {
      return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
    }
    function reactive(target) {
      if (isReadonly(target)) {
        return target;
      }
      return createReactiveObject(
        target,
        false,
        mutableHandlers,
        mutableCollectionHandlers,
        reactiveMap
      );
    }
    function shallowReactive(target) {
      return createReactiveObject(
        target,
        false,
        shallowReactiveHandlers,
        shallowCollectionHandlers,
        shallowReactiveMap
      );
    }
    function readonly(target) {
      return createReactiveObject(
        target,
        true,
        readonlyHandlers,
        readonlyCollectionHandlers,
        readonlyMap
      );
    }
    function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
      if (!isObject$1(target)) {
        return target;
      }
      if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
        return target;
      }
      const existingProxy = proxyMap.get(target);
      if (existingProxy) {
        return existingProxy;
      }
      const targetType = getTargetType(target);
      if (targetType === 0) {
        return target;
      }
      const proxy = new Proxy(
        target,
        targetType === 2 ? collectionHandlers : baseHandlers
      );
      proxyMap.set(target, proxy);
      return proxy;
    }
    function isReactive(value) {
      if (isReadonly(value)) {
        return isReactive(value["__v_raw"]);
      }
      return !!(value && value["__v_isReactive"]);
    }
    function isReadonly(value) {
      return !!(value && value["__v_isReadonly"]);
    }
    function isShallow(value) {
      return !!(value && value["__v_isShallow"]);
    }
    function isProxy(value) {
      return value ? !!value["__v_raw"] : false;
    }
    function toRaw(observed) {
      const raw = observed && observed["__v_raw"];
      return raw ? toRaw(raw) : observed;
    }
    function markRaw(value) {
      if (Object.isExtensible(value)) {
        def(value, "__v_skip", true);
      }
      return value;
    }
    const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
    const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
    class ComputedRefImpl {
      constructor(getter, _setter, isReadonly2, isSSR) {
        this.getter = getter;
        this._setter = _setter;
        this.dep = void 0;
        this.__v_isRef = true;
        this["__v_isReadonly"] = false;
        this.effect = new ReactiveEffect(
          () => getter(this._value),
          () => triggerRefValue(
            this,
            this.effect._dirtyLevel === 2 ? 2 : 3
          )
        );
        this.effect.computed = this;
        this.effect.active = this._cacheable = !isSSR;
        this["__v_isReadonly"] = isReadonly2;
      }
      get value() {
        const self2 = toRaw(this);
        if ((!self2._cacheable || self2.effect.dirty) && hasChanged(self2._value, self2._value = self2.effect.run())) {
          triggerRefValue(self2, 4);
        }
        trackRefValue(self2);
        if (self2.effect._dirtyLevel >= 2) {
          triggerRefValue(self2, 2);
        }
        return self2._value;
      }
      set value(newValue) {
        this._setter(newValue);
      }
      // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
      get _dirty() {
        return this.effect.dirty;
      }
      set _dirty(v) {
        this.effect.dirty = v;
      }
      // #endregion
    }
    function computed$1(getterOrOptions, debugOptions, isSSR = false) {
      let getter;
      let setter;
      const onlyGetter = isFunction$1(getterOrOptions);
      if (onlyGetter) {
        getter = getterOrOptions;
        setter = NOOP;
      } else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
      }
      const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
      return cRef;
    }
    function trackRefValue(ref2) {
      var _a2;
      if (shouldTrack && activeEffect) {
        ref2 = toRaw(ref2);
        trackEffect(
          activeEffect,
          (_a2 = ref2.dep) != null ? _a2 : ref2.dep = createDep(
            () => ref2.dep = void 0,
            ref2 instanceof ComputedRefImpl ? ref2 : void 0
          )
        );
      }
    }
    function triggerRefValue(ref2, dirtyLevel = 4, newVal) {
      ref2 = toRaw(ref2);
      const dep = ref2.dep;
      if (dep) {
        triggerEffects(
          dep,
          dirtyLevel
        );
      }
    }
    function isRef(r) {
      return !!(r && r.__v_isRef === true);
    }
    function ref(value) {
      return createRef(value, false);
    }
    function shallowRef(value) {
      return createRef(value, true);
    }
    function createRef(rawValue, shallow) {
      if (isRef(rawValue)) {
        return rawValue;
      }
      return new RefImpl(rawValue, shallow);
    }
    class RefImpl {
      constructor(value, __v_isShallow) {
        this.__v_isShallow = __v_isShallow;
        this.dep = void 0;
        this.__v_isRef = true;
        this._rawValue = __v_isShallow ? value : toRaw(value);
        this._value = __v_isShallow ? value : toReactive(value);
      }
      get value() {
        trackRefValue(this);
        return this._value;
      }
      set value(newVal) {
        const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
        newVal = useDirectValue ? newVal : toRaw(newVal);
        if (hasChanged(newVal, this._rawValue)) {
          this._rawValue = newVal;
          this._value = useDirectValue ? newVal : toReactive(newVal);
          triggerRefValue(this, 4);
        }
      }
    }
    function unref(ref2) {
      return isRef(ref2) ? ref2.value : ref2;
    }
    const shallowUnwrapHandlers = {
      get: (target, key2, receiver) => unref(Reflect.get(target, key2, receiver)),
      set: (target, key2, value, receiver) => {
        const oldValue = target[key2];
        if (isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        } else {
          return Reflect.set(target, key2, value, receiver);
        }
      }
    };
    function proxyRefs(objectWithRefs) {
      return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
    }
    function toRefs(object2) {
      const ret = isArray$2(object2) ? new Array(object2.length) : {};
      for (const key2 in object2) {
        ret[key2] = propertyToRef(object2, key2);
      }
      return ret;
    }
    class ObjectRefImpl {
      constructor(_object, _key, _defaultValue) {
        this._object = _object;
        this._key = _key;
        this._defaultValue = _defaultValue;
        this.__v_isRef = true;
      }
      get value() {
        const val = this._object[this._key];
        return val === void 0 ? this._defaultValue : val;
      }
      set value(newVal) {
        this._object[this._key] = newVal;
      }
      get dep() {
        return getDepFromReactive(toRaw(this._object), this._key);
      }
    }
    class GetterRefImpl {
      constructor(_getter) {
        this._getter = _getter;
        this.__v_isRef = true;
        this.__v_isReadonly = true;
      }
      get value() {
        return this._getter();
      }
    }
    function toRef(source2, key2, defaultValue) {
      if (isRef(source2)) {
        return source2;
      } else if (isFunction$1(source2)) {
        return new GetterRefImpl(source2);
      } else if (isObject$1(source2) && arguments.length > 1) {
        return propertyToRef(source2, key2, defaultValue);
      } else {
        return ref(source2);
      }
    }
    function propertyToRef(source2, key2, defaultValue) {
      const val = source2[key2];
      return isRef(val) ? val : new ObjectRefImpl(source2, key2, defaultValue);
    }
    /**
    * @vue/runtime-core v3.4.23
    * (c) 2018-present Yuxi (Evan) You and Vue contributors
    * @license MIT
    **/
    const stack$1 = [];
    function warn$1(msg, ...args) {
      pauseTracking();
      const instance = stack$1.length ? stack$1[stack$1.length - 1].component : null;
      const appWarnHandler = instance && instance.appContext.config.warnHandler;
      const trace = getComponentTrace();
      if (appWarnHandler) {
        callWithErrorHandling(
          appWarnHandler,
          instance,
          11,
          [
            msg + args.map((a) => {
              var _a2, _b;
              return (_b = (_a2 = a.toString) == null ? void 0 : _a2.call(a)) != null ? _b : JSON.stringify(a);
            }).join(""),
            instance && instance.proxy,
            trace.map(
              ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
            ).join("\n"),
            trace
          ]
        );
      } else {
        const warnArgs = [`[Vue warn]: ${msg}`, ...args];
        if (trace.length && // avoid spamming console during tests
        true) {
          warnArgs.push(`
`, ...formatTrace(trace));
        }
        console.warn(...warnArgs);
      }
      resetTracking();
    }
    function getComponentTrace() {
      let currentVNode = stack$1[stack$1.length - 1];
      if (!currentVNode) {
        return [];
      }
      const normalizedStack = [];
      while (currentVNode) {
        const last = normalizedStack[0];
        if (last && last.vnode === currentVNode) {
          last.recurseCount++;
        } else {
          normalizedStack.push({
            vnode: currentVNode,
            recurseCount: 0
          });
        }
        const parentInstance = currentVNode.component && currentVNode.component.parent;
        currentVNode = parentInstance && parentInstance.vnode;
      }
      return normalizedStack;
    }
    function formatTrace(trace) {
      const logs = [];
      trace.forEach((entry, i) => {
        logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
      });
      return logs;
    }
    function formatTraceEntry({ vnode, recurseCount }) {
      const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
      const isRoot = vnode.component ? vnode.component.parent == null : false;
      const open = ` at <${formatComponentName(
        vnode.component,
        vnode.type,
        isRoot
      )}`;
      const close2 = `>` + postfix;
      return vnode.props ? [open, ...formatProps(vnode.props), close2] : [open + close2];
    }
    function formatProps(props) {
      const res = [];
      const keys2 = Object.keys(props);
      keys2.slice(0, 3).forEach((key2) => {
        res.push(...formatProp(key2, props[key2]));
      });
      if (keys2.length > 3) {
        res.push(` ...`);
      }
      return res;
    }
    function formatProp(key2, value, raw) {
      if (isString$1(value)) {
        value = JSON.stringify(value);
        return raw ? value : [`${key2}=${value}`];
      } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
        return raw ? value : [`${key2}=${value}`];
      } else if (isRef(value)) {
        value = formatProp(key2, toRaw(value.value), true);
        return raw ? value : [`${key2}=Ref<`, value, `>`];
      } else if (isFunction$1(value)) {
        return [`${key2}=fn${value.name ? `<${value.name}>` : ``}`];
      } else {
        value = toRaw(value);
        return raw ? value : [`${key2}=`, value];
      }
    }
    function callWithErrorHandling(fn2, instance, type2, args) {
      try {
        return args ? fn2(...args) : fn2();
      } catch (err) {
        handleError(err, instance, type2);
      }
    }
    function callWithAsyncErrorHandling(fn2, instance, type2, args) {
      if (isFunction$1(fn2)) {
        const res = callWithErrorHandling(fn2, instance, type2, args);
        if (res && isPromise(res)) {
          res.catch((err) => {
            handleError(err, instance, type2);
          });
        }
        return res;
      }
      if (isArray$2(fn2)) {
        const values = [];
        for (let i = 0; i < fn2.length; i++) {
          values.push(callWithAsyncErrorHandling(fn2[i], instance, type2, args));
        }
        return values;
      }
    }
    function handleError(err, instance, type2, throwInDev = true) {
      const contextVNode = instance ? instance.vnode : null;
      if (instance) {
        let cur = instance.parent;
        const exposedInstance = instance.proxy;
        const errorInfo = `https://vuejs.org/error-reference/#runtime-${type2}`;
        while (cur) {
          const errorCapturedHooks = cur.ec;
          if (errorCapturedHooks) {
            for (let i = 0; i < errorCapturedHooks.length; i++) {
              if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
                return;
              }
            }
          }
          cur = cur.parent;
        }
        const appErrorHandler = instance.appContext.config.errorHandler;
        if (appErrorHandler) {
          pauseTracking();
          callWithErrorHandling(
            appErrorHandler,
            null,
            10,
            [err, exposedInstance, errorInfo]
          );
          resetTracking();
          return;
        }
      }
      logError(err, type2, contextVNode, throwInDev);
    }
    function logError(err, type2, contextVNode, throwInDev = true) {
      {
        console.error(err);
      }
    }
    let isFlushing = false;
    let isFlushPending = false;
    const queue = [];
    let flushIndex = 0;
    const pendingPostFlushCbs = [];
    let activePostFlushCbs = null;
    let postFlushIndex = 0;
    const resolvedPromise = /* @__PURE__ */ Promise.resolve();
    let currentFlushPromise = null;
    function nextTick(fn2) {
      const p2 = currentFlushPromise || resolvedPromise;
      return fn2 ? p2.then(this ? fn2.bind(this) : fn2) : p2;
    }
    function findInsertionIndex(id) {
      let start = flushIndex + 1;
      let end = queue.length;
      while (start < end) {
        const middle = start + end >>> 1;
        const middleJob = queue[middle];
        const middleJobId = getId(middleJob);
        if (middleJobId < id || middleJobId === id && middleJob.pre) {
          start = middle + 1;
        } else {
          end = middle;
        }
      }
      return start;
    }
    function queueJob(job) {
      if (!queue.length || !queue.includes(
        job,
        isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
      )) {
        if (job.id == null) {
          queue.push(job);
        } else {
          queue.splice(findInsertionIndex(job.id), 0, job);
        }
        queueFlush();
      }
    }
    function queueFlush() {
      if (!isFlushing && !isFlushPending) {
        isFlushPending = true;
        currentFlushPromise = resolvedPromise.then(flushJobs);
      }
    }
    function invalidateJob(job) {
      const i = queue.indexOf(job);
      if (i > flushIndex) {
        queue.splice(i, 1);
      }
    }
    function queuePostFlushCb(cb) {
      if (!isArray$2(cb)) {
        if (!activePostFlushCbs || !activePostFlushCbs.includes(
          cb,
          cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
        )) {
          pendingPostFlushCbs.push(cb);
        }
      } else {
        pendingPostFlushCbs.push(...cb);
      }
      queueFlush();
    }
    function flushPreFlushCbs(instance, seen, i = isFlushing ? flushIndex + 1 : 0) {
      for (; i < queue.length; i++) {
        const cb = queue[i];
        if (cb && cb.pre) {
          if (instance && cb.id !== instance.uid) {
            continue;
          }
          queue.splice(i, 1);
          i--;
          cb();
        }
      }
    }
    function flushPostFlushCbs(seen) {
      if (pendingPostFlushCbs.length) {
        const deduped = [...new Set(pendingPostFlushCbs)].sort(
          (a, b) => getId(a) - getId(b)
        );
        pendingPostFlushCbs.length = 0;
        if (activePostFlushCbs) {
          activePostFlushCbs.push(...deduped);
          return;
        }
        activePostFlushCbs = deduped;
        for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
          activePostFlushCbs[postFlushIndex]();
        }
        activePostFlushCbs = null;
        postFlushIndex = 0;
      }
    }
    const getId = (job) => job.id == null ? Infinity : job.id;
    const comparator = (a, b) => {
      const diff = getId(a) - getId(b);
      if (diff === 0) {
        if (a.pre && !b.pre)
          return -1;
        if (b.pre && !a.pre)
          return 1;
      }
      return diff;
    };
    function flushJobs(seen) {
      isFlushPending = false;
      isFlushing = true;
      queue.sort(comparator);
      const check = NOOP;
      try {
        for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
          const job = queue[flushIndex];
          if (job && job.active !== false) {
            if (false)
              ;
            callWithErrorHandling(job, null, 14);
          }
        }
      } finally {
        flushIndex = 0;
        queue.length = 0;
        flushPostFlushCbs();
        isFlushing = false;
        currentFlushPromise = null;
        if (queue.length || pendingPostFlushCbs.length) {
          flushJobs();
        }
      }
    }
    function emit(instance, event, ...rawArgs) {
      if (instance.isUnmounted)
        return;
      const props = instance.vnode.props || EMPTY_OBJ;
      let args = rawArgs;
      const isModelListener2 = event.startsWith("update:");
      const modelArg = isModelListener2 && event.slice(7);
      if (modelArg && modelArg in props) {
        const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
        const { number: number2, trim } = props[modifiersKey] || EMPTY_OBJ;
        if (trim) {
          args = rawArgs.map((a) => isString$1(a) ? a.trim() : a);
        }
        if (number2) {
          args = rawArgs.map(looseToNumber);
        }
      }
      let handlerName;
      let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
      props[handlerName = toHandlerKey(camelize(event))];
      if (!handler && isModelListener2) {
        handler = props[handlerName = toHandlerKey(hyphenate(event))];
      }
      if (handler) {
        callWithAsyncErrorHandling(
          handler,
          instance,
          6,
          args
        );
      }
      const onceHandler = props[handlerName + `Once`];
      if (onceHandler) {
        if (!instance.emitted) {
          instance.emitted = {};
        } else if (instance.emitted[handlerName]) {
          return;
        }
        instance.emitted[handlerName] = true;
        callWithAsyncErrorHandling(
          onceHandler,
          instance,
          6,
          args
        );
      }
    }
    function normalizeEmitsOptions(comp, appContext, asMixin = false) {
      const cache = appContext.emitsCache;
      const cached = cache.get(comp);
      if (cached !== void 0) {
        return cached;
      }
      const raw = comp.emits;
      let normalized = {};
      let hasExtends = false;
      if (!isFunction$1(comp)) {
        const extendEmits = (raw2) => {
          const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
          if (normalizedFromExtend) {
            hasExtends = true;
            extend(normalized, normalizedFromExtend);
          }
        };
        if (!asMixin && appContext.mixins.length) {
          appContext.mixins.forEach(extendEmits);
        }
        if (comp.extends) {
          extendEmits(comp.extends);
        }
        if (comp.mixins) {
          comp.mixins.forEach(extendEmits);
        }
      }
      if (!raw && !hasExtends) {
        if (isObject$1(comp)) {
          cache.set(comp, null);
        }
        return null;
      }
      if (isArray$2(raw)) {
        raw.forEach((key2) => normalized[key2] = null);
      } else {
        extend(normalized, raw);
      }
      if (isObject$1(comp)) {
        cache.set(comp, normalized);
      }
      return normalized;
    }
    function isEmitListener(options, key2) {
      if (!options || !isOn(key2)) {
        return false;
      }
      key2 = key2.slice(2).replace(/Once$/, "");
      return hasOwn(options, key2[0].toLowerCase() + key2.slice(1)) || hasOwn(options, hyphenate(key2)) || hasOwn(options, key2);
    }
    let currentRenderingInstance = null;
    let currentScopeId = null;
    function setCurrentRenderingInstance(instance) {
      const prev = currentRenderingInstance;
      currentRenderingInstance = instance;
      currentScopeId = instance && instance.type.__scopeId || null;
      return prev;
    }
    function pushScopeId(id) {
      currentScopeId = id;
    }
    function popScopeId() {
      currentScopeId = null;
    }
    function withCtx(fn2, ctx = currentRenderingInstance, isNonScopedSlot) {
      if (!ctx)
        return fn2;
      if (fn2._n) {
        return fn2;
      }
      const renderFnWithContext = (...args) => {
        if (renderFnWithContext._d) {
          setBlockTracking(-1);
        }
        const prevInstance = setCurrentRenderingInstance(ctx);
        let res;
        try {
          res = fn2(...args);
        } finally {
          setCurrentRenderingInstance(prevInstance);
          if (renderFnWithContext._d) {
            setBlockTracking(1);
          }
        }
        return res;
      };
      renderFnWithContext._n = true;
      renderFnWithContext._c = true;
      renderFnWithContext._d = true;
      return renderFnWithContext;
    }
    function markAttrsAccessed() {
    }
    function renderComponentRoot(instance) {
      const {
        type: Component,
        vnode,
        proxy,
        withProxy,
        props,
        propsOptions: [propsOptions],
        slots,
        attrs,
        emit: emit2,
        render: render2,
        renderCache,
        data,
        setupState,
        ctx,
        inheritAttrs
      } = instance;
      let result;
      let fallthroughAttrs;
      const prev = setCurrentRenderingInstance(instance);
      try {
        if (vnode.shapeFlag & 4) {
          const proxyToUse = withProxy || proxy;
          const thisProxy = false ? new Proxy(proxyToUse, {
            get(target, key2, receiver) {
              warn$1(
                `Property '${String(
                  key2
                )}' was accessed via 'this'. Avoid using 'this' in templates.`
              );
              return Reflect.get(target, key2, receiver);
            }
          }) : proxyToUse;
          result = normalizeVNode(
            render2.call(
              thisProxy,
              proxyToUse,
              renderCache,
              props,
              setupState,
              data,
              ctx
            )
          );
          fallthroughAttrs = attrs;
        } else {
          const render22 = Component;
          if (false)
            ;
          result = normalizeVNode(
            render22.length > 1 ? render22(
              props,
              false ? {
                get attrs() {
                  markAttrsAccessed();
                  return attrs;
                },
                slots,
                emit: emit2
              } : { attrs, slots, emit: emit2 }
            ) : render22(
              props,
              null
              /* we know it doesn't need it */
            )
          );
          fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
        }
      } catch (err) {
        blockStack.length = 0;
        handleError(err, instance, 1);
        result = createVNode(Comment);
      }
      let root2 = result;
      if (fallthroughAttrs && inheritAttrs !== false) {
        const keys2 = Object.keys(fallthroughAttrs);
        const { shapeFlag } = root2;
        if (keys2.length) {
          if (shapeFlag & (1 | 6)) {
            if (propsOptions && keys2.some(isModelListener)) {
              fallthroughAttrs = filterModelListeners(
                fallthroughAttrs,
                propsOptions
              );
            }
            root2 = cloneVNode(root2, fallthroughAttrs);
          }
        }
      }
      if (vnode.dirs) {
        root2 = cloneVNode(root2);
        root2.dirs = root2.dirs ? root2.dirs.concat(vnode.dirs) : vnode.dirs;
      }
      if (vnode.transition) {
        root2.transition = vnode.transition;
      }
      {
        result = root2;
      }
      setCurrentRenderingInstance(prev);
      return result;
    }
    const getFunctionalFallthrough = (attrs) => {
      let res;
      for (const key2 in attrs) {
        if (key2 === "class" || key2 === "style" || isOn(key2)) {
          (res || (res = {}))[key2] = attrs[key2];
        }
      }
      return res;
    };
    const filterModelListeners = (attrs, props) => {
      const res = {};
      for (const key2 in attrs) {
        if (!isModelListener(key2) || !(key2.slice(9) in props)) {
          res[key2] = attrs[key2];
        }
      }
      return res;
    };
    function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
      const { props: prevProps, children: prevChildren, component } = prevVNode;
      const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
      const emits = component.emitsOptions;
      if (nextVNode.dirs || nextVNode.transition) {
        return true;
      }
      if (optimized && patchFlag >= 0) {
        if (patchFlag & 1024) {
          return true;
        }
        if (patchFlag & 16) {
          if (!prevProps) {
            return !!nextProps;
          }
          return hasPropsChanged(prevProps, nextProps, emits);
        } else if (patchFlag & 8) {
          const dynamicProps = nextVNode.dynamicProps;
          for (let i = 0; i < dynamicProps.length; i++) {
            const key2 = dynamicProps[i];
            if (nextProps[key2] !== prevProps[key2] && !isEmitListener(emits, key2)) {
              return true;
            }
          }
        }
      } else {
        if (prevChildren || nextChildren) {
          if (!nextChildren || !nextChildren.$stable) {
            return true;
          }
        }
        if (prevProps === nextProps) {
          return false;
        }
        if (!prevProps) {
          return !!nextProps;
        }
        if (!nextProps) {
          return true;
        }
        return hasPropsChanged(prevProps, nextProps, emits);
      }
      return false;
    }
    function hasPropsChanged(prevProps, nextProps, emitsOptions) {
      const nextKeys = Object.keys(nextProps);
      if (nextKeys.length !== Object.keys(prevProps).length) {
        return true;
      }
      for (let i = 0; i < nextKeys.length; i++) {
        const key2 = nextKeys[i];
        if (nextProps[key2] !== prevProps[key2] && !isEmitListener(emitsOptions, key2)) {
          return true;
        }
      }
      return false;
    }
    function updateHOCHostEl({ vnode, parent }, el) {
      while (parent) {
        const root2 = parent.subTree;
        if (root2.suspense && root2.suspense.activeBranch === vnode) {
          root2.el = vnode.el;
        }
        if (root2 === vnode) {
          (vnode = parent.vnode).el = el;
          parent = parent.parent;
        } else {
          break;
        }
      }
    }
    const COMPONENTS = "components";
    const DIRECTIVES = "directives";
    function resolveComponent(name, maybeSelfReference) {
      return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
    }
    const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
    function resolveDynamicComponent(component) {
      if (isString$1(component)) {
        return resolveAsset(COMPONENTS, component, false) || component;
      } else {
        return component || NULL_DYNAMIC_COMPONENT;
      }
    }
    function resolveDirective(name) {
      return resolveAsset(DIRECTIVES, name);
    }
    function resolveAsset(type2, name, warnMissing = true, maybeSelfReference = false) {
      const instance = currentRenderingInstance || currentInstance;
      if (instance) {
        const Component = instance.type;
        if (type2 === COMPONENTS) {
          const selfName = getComponentName(
            Component,
            false
          );
          if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
            return Component;
          }
        }
        const res = (
          // local registration
          // check instance[type] first which is resolved for options API
          resolve(instance[type2] || Component[type2], name) || // global registration
          resolve(instance.appContext[type2], name)
        );
        if (!res && maybeSelfReference) {
          return Component;
        }
        return res;
      }
    }
    function resolve(registry, name) {
      return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
    }
    const isSuspense = (type2) => type2.__isSuspense;
    function queueEffectWithSuspense(fn2, suspense) {
      if (suspense && suspense.pendingBranch) {
        if (isArray$2(fn2)) {
          suspense.effects.push(...fn2);
        } else {
          suspense.effects.push(fn2);
        }
      } else {
        queuePostFlushCb(fn2);
      }
    }
    const ssrContextKey = Symbol.for("v-scx");
    const useSSRContext = () => {
      {
        const ctx = inject(ssrContextKey);
        return ctx;
      }
    };
    function watchEffect(effect, options) {
      return doWatch(effect, null, options);
    }
    const INITIAL_WATCHER_VALUE = {};
    function watch(source2, cb, options) {
      return doWatch(source2, cb, options);
    }
    function doWatch(source2, cb, {
      immediate,
      deep,
      flush,
      once,
      onTrack,
      onTrigger
    } = EMPTY_OBJ) {
      if (cb && once) {
        const _cb = cb;
        cb = (...args) => {
          _cb(...args);
          unwatch();
        };
      }
      const instance = currentInstance;
      const reactiveGetter = (source22) => deep === true ? source22 : (
        // for deep: false, only traverse root-level properties
        traverse(source22, deep === false ? 1 : void 0)
      );
      let getter;
      let forceTrigger = false;
      let isMultiSource = false;
      if (isRef(source2)) {
        getter = () => source2.value;
        forceTrigger = isShallow(source2);
      } else if (isReactive(source2)) {
        getter = () => reactiveGetter(source2);
        forceTrigger = true;
      } else if (isArray$2(source2)) {
        isMultiSource = true;
        forceTrigger = source2.some((s) => isReactive(s) || isShallow(s));
        getter = () => source2.map((s) => {
          if (isRef(s)) {
            return s.value;
          } else if (isReactive(s)) {
            return reactiveGetter(s);
          } else if (isFunction$1(s)) {
            return callWithErrorHandling(s, instance, 2);
          } else
            ;
        });
      } else if (isFunction$1(source2)) {
        if (cb) {
          getter = () => callWithErrorHandling(source2, instance, 2);
        } else {
          getter = () => {
            if (cleanup) {
              cleanup();
            }
            return callWithAsyncErrorHandling(
              source2,
              instance,
              3,
              [onCleanup]
            );
          };
        }
      } else {
        getter = NOOP;
      }
      if (cb && deep) {
        const baseGetter = getter;
        getter = () => traverse(baseGetter());
      }
      let cleanup;
      let onCleanup = (fn2) => {
        cleanup = effect.onStop = () => {
          callWithErrorHandling(fn2, instance, 4);
          cleanup = effect.onStop = void 0;
        };
      };
      let ssrCleanup;
      if (isInSSRComponentSetup) {
        onCleanup = NOOP;
        if (!cb) {
          getter();
        } else if (immediate) {
          callWithAsyncErrorHandling(cb, instance, 3, [
            getter(),
            isMultiSource ? [] : void 0,
            onCleanup
          ]);
        }
        if (flush === "sync") {
          const ctx = useSSRContext();
          ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
        } else {
          return NOOP;
        }
      }
      let oldValue = isMultiSource ? new Array(source2.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
      const job = () => {
        if (!effect.active || !effect.dirty) {
          return;
        }
        if (cb) {
          const newValue = effect.run();
          if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
            if (cleanup) {
              cleanup();
            }
            callWithAsyncErrorHandling(cb, instance, 3, [
              newValue,
              // pass undefined as the old value when it's changed for the first time
              oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
              onCleanup
            ]);
            oldValue = newValue;
          }
        } else {
          effect.run();
        }
      };
      job.allowRecurse = !!cb;
      let scheduler;
      if (flush === "sync") {
        scheduler = job;
      } else if (flush === "post") {
        scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
      } else {
        job.pre = true;
        if (instance)
          job.id = instance.uid;
        scheduler = () => queueJob(job);
      }
      const effect = new ReactiveEffect(getter, NOOP, scheduler);
      const scope = getCurrentScope();
      const unwatch = () => {
        effect.stop();
        if (scope) {
          remove(scope.effects, effect);
        }
      };
      if (cb) {
        if (immediate) {
          job();
        } else {
          oldValue = effect.run();
        }
      } else if (flush === "post") {
        queuePostRenderEffect(
          effect.run.bind(effect),
          instance && instance.suspense
        );
      } else {
        effect.run();
      }
      if (ssrCleanup)
        ssrCleanup.push(unwatch);
      return unwatch;
    }
    function instanceWatch(source2, value, options) {
      const publicThis = this.proxy;
      const getter = isString$1(source2) ? source2.includes(".") ? createPathGetter(publicThis, source2) : () => publicThis[source2] : source2.bind(publicThis, publicThis);
      let cb;
      if (isFunction$1(value)) {
        cb = value;
      } else {
        cb = value.handler;
        options = value;
      }
      const reset = setCurrentInstance(this);
      const res = doWatch(getter, cb.bind(publicThis), options);
      reset();
      return res;
    }
    function createPathGetter(ctx, path) {
      const segments = path.split(".");
      return () => {
        let cur = ctx;
        for (let i = 0; i < segments.length && cur; i++) {
          cur = cur[segments[i]];
        }
        return cur;
      };
    }
    function traverse(value, depth, currentDepth = 0, seen) {
      if (!isObject$1(value) || value["__v_skip"]) {
        return value;
      }
      if (depth && depth > 0) {
        if (currentDepth >= depth) {
          return value;
        }
        currentDepth++;
      }
      seen = seen || /* @__PURE__ */ new Set();
      if (seen.has(value)) {
        return value;
      }
      seen.add(value);
      if (isRef(value)) {
        traverse(value.value, depth, currentDepth, seen);
      } else if (isArray$2(value)) {
        for (let i = 0; i < value.length; i++) {
          traverse(value[i], depth, currentDepth, seen);
        }
      } else if (isSet$2(value) || isMap$2(value)) {
        value.forEach((v) => {
          traverse(v, depth, currentDepth, seen);
        });
      } else if (isPlainObject(value)) {
        for (const key2 in value) {
          traverse(value[key2], depth, currentDepth, seen);
        }
      }
      return value;
    }
    function withDirectives(vnode, directives) {
      if (currentRenderingInstance === null) {
        return vnode;
      }
      const instance = getExposeProxy(currentRenderingInstance) || currentRenderingInstance.proxy;
      const bindings = vnode.dirs || (vnode.dirs = []);
      for (let i = 0; i < directives.length; i++) {
        let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
        if (dir) {
          if (isFunction$1(dir)) {
            dir = {
              mounted: dir,
              updated: dir
            };
          }
          if (dir.deep) {
            traverse(value);
          }
          bindings.push({
            dir,
            instance,
            value,
            oldValue: void 0,
            arg,
            modifiers
          });
        }
      }
      return vnode;
    }
    function invokeDirectiveHook(vnode, prevVNode, instance, name) {
      const bindings = vnode.dirs;
      const oldBindings = prevVNode && prevVNode.dirs;
      for (let i = 0; i < bindings.length; i++) {
        const binding = bindings[i];
        if (oldBindings) {
          binding.oldValue = oldBindings[i].value;
        }
        let hook = binding.dir[name];
        if (hook) {
          pauseTracking();
          callWithAsyncErrorHandling(hook, instance, 8, [
            vnode.el,
            binding,
            vnode,
            prevVNode
          ]);
          resetTracking();
        }
      }
    }
    const leaveCbKey = Symbol("_leaveCb");
    const enterCbKey$1 = Symbol("_enterCb");
    function useTransitionState() {
      const state = {
        isMounted: false,
        isLeaving: false,
        isUnmounting: false,
        leavingVNodes: /* @__PURE__ */ new Map()
      };
      onMounted(() => {
        state.isMounted = true;
      });
      onBeforeUnmount(() => {
        state.isUnmounting = true;
      });
      return state;
    }
    const TransitionHookValidator = [Function, Array];
    const BaseTransitionPropsValidators = {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      // enter
      onBeforeEnter: TransitionHookValidator,
      onEnter: TransitionHookValidator,
      onAfterEnter: TransitionHookValidator,
      onEnterCancelled: TransitionHookValidator,
      // leave
      onBeforeLeave: TransitionHookValidator,
      onLeave: TransitionHookValidator,
      onAfterLeave: TransitionHookValidator,
      onLeaveCancelled: TransitionHookValidator,
      // appear
      onBeforeAppear: TransitionHookValidator,
      onAppear: TransitionHookValidator,
      onAfterAppear: TransitionHookValidator,
      onAppearCancelled: TransitionHookValidator
    };
    const BaseTransitionImpl = {
      name: `BaseTransition`,
      props: BaseTransitionPropsValidators,
      setup(props, { slots }) {
        const instance = getCurrentInstance();
        const state = useTransitionState();
        return () => {
          const children = slots.default && getTransitionRawChildren(slots.default(), true);
          if (!children || !children.length) {
            return;
          }
          let child = children[0];
          if (children.length > 1) {
            for (const c2 of children) {
              if (c2.type !== Comment) {
                child = c2;
                break;
              }
            }
          }
          const rawProps = toRaw(props);
          const { mode } = rawProps;
          if (state.isLeaving) {
            return emptyPlaceholder(child);
          }
          const innerChild = getKeepAliveChild(child);
          if (!innerChild) {
            return emptyPlaceholder(child);
          }
          const enterHooks = resolveTransitionHooks(
            innerChild,
            rawProps,
            state,
            instance
          );
          setTransitionHooks(innerChild, enterHooks);
          const oldChild = instance.subTree;
          const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
          if (oldInnerChild && oldInnerChild.type !== Comment && !isSameVNodeType(innerChild, oldInnerChild)) {
            const leavingHooks = resolveTransitionHooks(
              oldInnerChild,
              rawProps,
              state,
              instance
            );
            setTransitionHooks(oldInnerChild, leavingHooks);
            if (mode === "out-in") {
              state.isLeaving = true;
              leavingHooks.afterLeave = () => {
                state.isLeaving = false;
                if (instance.update.active !== false) {
                  instance.effect.dirty = true;
                  instance.update();
                }
              };
              return emptyPlaceholder(child);
            } else if (mode === "in-out" && innerChild.type !== Comment) {
              leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
                const leavingVNodesCache = getLeavingNodesForType(
                  state,
                  oldInnerChild
                );
                leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
                el[leaveCbKey] = () => {
                  earlyRemove();
                  el[leaveCbKey] = void 0;
                  delete enterHooks.delayedLeave;
                };
                enterHooks.delayedLeave = delayedLeave;
              };
            }
          }
          return child;
        };
      }
    };
    const BaseTransition = BaseTransitionImpl;
    function getLeavingNodesForType(state, vnode) {
      const { leavingVNodes } = state;
      let leavingVNodesCache = leavingVNodes.get(vnode.type);
      if (!leavingVNodesCache) {
        leavingVNodesCache = /* @__PURE__ */ Object.create(null);
        leavingVNodes.set(vnode.type, leavingVNodesCache);
      }
      return leavingVNodesCache;
    }
    function resolveTransitionHooks(vnode, props, state, instance) {
      const {
        appear,
        mode,
        persisted = false,
        onBeforeEnter,
        onEnter,
        onAfterEnter,
        onEnterCancelled,
        onBeforeLeave,
        onLeave,
        onAfterLeave,
        onLeaveCancelled,
        onBeforeAppear,
        onAppear,
        onAfterAppear,
        onAppearCancelled
      } = props;
      const key2 = String(vnode.key);
      const leavingVNodesCache = getLeavingNodesForType(state, vnode);
      const callHook2 = (hook, args) => {
        hook && callWithAsyncErrorHandling(
          hook,
          instance,
          9,
          args
        );
      };
      const callAsyncHook = (hook, args) => {
        const done = args[1];
        callHook2(hook, args);
        if (isArray$2(hook)) {
          if (hook.every((hook2) => hook2.length <= 1))
            done();
        } else if (hook.length <= 1) {
          done();
        }
      };
      const hooks = {
        mode,
        persisted,
        beforeEnter(el) {
          let hook = onBeforeEnter;
          if (!state.isMounted) {
            if (appear) {
              hook = onBeforeAppear || onBeforeEnter;
            } else {
              return;
            }
          }
          if (el[leaveCbKey]) {
            el[leaveCbKey](
              true
              /* cancelled */
            );
          }
          const leavingVNode = leavingVNodesCache[key2];
          if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) {
            leavingVNode.el[leaveCbKey]();
          }
          callHook2(hook, [el]);
        },
        enter(el) {
          let hook = onEnter;
          let afterHook = onAfterEnter;
          let cancelHook = onEnterCancelled;
          if (!state.isMounted) {
            if (appear) {
              hook = onAppear || onEnter;
              afterHook = onAfterAppear || onAfterEnter;
              cancelHook = onAppearCancelled || onEnterCancelled;
            } else {
              return;
            }
          }
          let called = false;
          const done = el[enterCbKey$1] = (cancelled) => {
            if (called)
              return;
            called = true;
            if (cancelled) {
              callHook2(cancelHook, [el]);
            } else {
              callHook2(afterHook, [el]);
            }
            if (hooks.delayedLeave) {
              hooks.delayedLeave();
            }
            el[enterCbKey$1] = void 0;
          };
          if (hook) {
            callAsyncHook(hook, [el, done]);
          } else {
            done();
          }
        },
        leave(el, remove2) {
          const key22 = String(vnode.key);
          if (el[enterCbKey$1]) {
            el[enterCbKey$1](
              true
              /* cancelled */
            );
          }
          if (state.isUnmounting) {
            return remove2();
          }
          callHook2(onBeforeLeave, [el]);
          let called = false;
          const done = el[leaveCbKey] = (cancelled) => {
            if (called)
              return;
            called = true;
            remove2();
            if (cancelled) {
              callHook2(onLeaveCancelled, [el]);
            } else {
              callHook2(onAfterLeave, [el]);
            }
            el[leaveCbKey] = void 0;
            if (leavingVNodesCache[key22] === vnode) {
              delete leavingVNodesCache[key22];
            }
          };
          leavingVNodesCache[key22] = vnode;
          if (onLeave) {
            callAsyncHook(onLeave, [el, done]);
          } else {
            done();
          }
        },
        clone(vnode2) {
          return resolveTransitionHooks(vnode2, props, state, instance);
        }
      };
      return hooks;
    }
    function emptyPlaceholder(vnode) {
      if (isKeepAlive(vnode)) {
        vnode = cloneVNode(vnode);
        vnode.children = null;
        return vnode;
      }
    }
    function getKeepAliveChild(vnode) {
      return isKeepAlive(vnode) ? (
        // #7121 ensure get the child component subtree in case
        // it's been replaced during HMR
        vnode.children ? vnode.children[0] : void 0
      ) : vnode;
    }
    function setTransitionHooks(vnode, hooks) {
      if (vnode.shapeFlag & 6 && vnode.component) {
        setTransitionHooks(vnode.component.subTree, hooks);
      } else if (vnode.shapeFlag & 128) {
        vnode.ssContent.transition = hooks.clone(vnode.ssContent);
        vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
      } else {
        vnode.transition = hooks;
      }
    }
    function getTransitionRawChildren(children, keepComment = false, parentKey) {
      let ret = [];
      let keyedFragmentCount = 0;
      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        const key2 = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
        if (child.type === Fragment) {
          if (child.patchFlag & 128)
            keyedFragmentCount++;
          ret = ret.concat(
            getTransitionRawChildren(child.children, keepComment, key2)
          );
        } else if (keepComment || child.type !== Comment) {
          ret.push(key2 != null ? cloneVNode(child, { key: key2 }) : child);
        }
      }
      if (keyedFragmentCount > 1) {
        for (let i = 0; i < ret.length; i++) {
          ret[i].patchFlag = -2;
        }
      }
      return ret;
    }
    /*! #__NO_SIDE_EFFECTS__ */
    // @__NO_SIDE_EFFECTS__
    function defineComponent(options, extraOptions) {
      return isFunction$1(options) ? (
        // #8326: extend call and options.name access are considered side-effects
        // by Rollup, so we have to wrap it in a pure-annotated IIFE.
        /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
      ) : options;
    }
    const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
    const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
    function onActivated(hook, target) {
      registerKeepAliveHook(hook, "a", target);
    }
    function onDeactivated(hook, target) {
      registerKeepAliveHook(hook, "da", target);
    }
    function registerKeepAliveHook(hook, type2, target = currentInstance) {
      const wrappedHook = hook.__wdc || (hook.__wdc = () => {
        let current = target;
        while (current) {
          if (current.isDeactivated) {
            return;
          }
          current = current.parent;
        }
        return hook();
      });
      injectHook(type2, wrappedHook, target);
      if (target) {
        let current = target.parent;
        while (current && current.parent) {
          if (isKeepAlive(current.parent.vnode)) {
            injectToKeepAliveRoot(wrappedHook, type2, target, current);
          }
          current = current.parent;
        }
      }
    }
    function injectToKeepAliveRoot(hook, type2, target, keepAliveRoot) {
      const injected = injectHook(
        type2,
        hook,
        keepAliveRoot,
        true
        /* prepend */
      );
      onUnmounted(() => {
        remove(keepAliveRoot[type2], injected);
      }, target);
    }
    function injectHook(type2, hook, target = currentInstance, prepend = false) {
      if (target) {
        const hooks = target[type2] || (target[type2] = []);
        const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
          if (target.isUnmounted) {
            return;
          }
          pauseTracking();
          const reset = setCurrentInstance(target);
          const res = callWithAsyncErrorHandling(hook, target, type2, args);
          reset();
          resetTracking();
          return res;
        });
        if (prepend) {
          hooks.unshift(wrappedHook);
        } else {
          hooks.push(wrappedHook);
        }
        return wrappedHook;
      }
    }
    const createHook = (lifecycle) => (hook, target = currentInstance) => (
      // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
      (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
    );
    const onBeforeMount = createHook("bm");
    const onMounted = createHook("m");
    const onBeforeUpdate = createHook("bu");
    const onUpdated = createHook("u");
    const onBeforeUnmount = createHook("bum");
    const onUnmounted = createHook("um");
    const onServerPrefetch = createHook("sp");
    const onRenderTriggered = createHook(
      "rtg"
    );
    const onRenderTracked = createHook(
      "rtc"
    );
    function onErrorCaptured(hook, target = currentInstance) {
      injectHook("ec", hook, target);
    }
    function renderList(source2, renderItem, cache, index) {
      let ret;
      const cached = cache && cache[index];
      if (isArray$2(source2) || isString$1(source2)) {
        ret = new Array(source2.length);
        for (let i = 0, l = source2.length; i < l; i++) {
          ret[i] = renderItem(source2[i], i, void 0, cached && cached[i]);
        }
      } else if (typeof source2 === "number") {
        ret = new Array(source2);
        for (let i = 0; i < source2; i++) {
          ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
        }
      } else if (isObject$1(source2)) {
        if (source2[Symbol.iterator]) {
          ret = Array.from(
            source2,
            (item, i) => renderItem(item, i, void 0, cached && cached[i])
          );
        } else {
          const keys2 = Object.keys(source2);
          ret = new Array(keys2.length);
          for (let i = 0, l = keys2.length; i < l; i++) {
            const key2 = keys2[i];
            ret[i] = renderItem(source2[key2], key2, i, cached && cached[i]);
          }
        }
      } else {
        ret = [];
      }
      if (cache) {
        cache[index] = ret;
      }
      return ret;
    }
    function createSlots(slots, dynamicSlots) {
      for (let i = 0; i < dynamicSlots.length; i++) {
        const slot = dynamicSlots[i];
        if (isArray$2(slot)) {
          for (let j = 0; j < slot.length; j++) {
            slots[slot[j].name] = slot[j].fn;
          }
        } else if (slot) {
          slots[slot.name] = slot.key ? (...args) => {
            const res = slot.fn(...args);
            if (res)
              res.key = slot.key;
            return res;
          } : slot.fn;
        }
      }
      return slots;
    }
    function renderSlot(slots, name, props = {}, fallback, noSlotted) {
      if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
        if (name !== "default")
          props.name = name;
        return createVNode("slot", props, fallback && fallback());
      }
      let slot = slots[name];
      if (slot && slot._c) {
        slot._d = false;
      }
      openBlock();
      const validSlotContent = slot && ensureValidVNode(slot(props));
      const rendered = createBlock(
        Fragment,
        {
          key: props.key || // slot content array of a dynamic conditional slot may have a branch
          // key attached in the `createSlots` helper, respect that
          validSlotContent && validSlotContent.key || `_${name}`
        },
        validSlotContent || (fallback ? fallback() : []),
        validSlotContent && slots._ === 1 ? 64 : -2
      );
      if (!noSlotted && rendered.scopeId) {
        rendered.slotScopeIds = [rendered.scopeId + "-s"];
      }
      if (slot && slot._c) {
        slot._d = true;
      }
      return rendered;
    }
    function ensureValidVNode(vnodes) {
      return vnodes.some((child) => {
        if (!isVNode(child))
          return true;
        if (child.type === Comment)
          return false;
        if (child.type === Fragment && !ensureValidVNode(child.children))
          return false;
        return true;
      }) ? vnodes : null;
    }
    const getPublicInstance = (i) => {
      if (!i)
        return null;
      if (isStatefulComponent(i))
        return getExposeProxy(i) || i.proxy;
      return getPublicInstance(i.parent);
    };
    const publicPropertiesMap = (
      // Move PURE marker to new line to workaround compiler discarding it
      // due to type annotation
      /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
        $: (i) => i,
        $el: (i) => i.vnode.el,
        $data: (i) => i.data,
        $props: (i) => i.props,
        $attrs: (i) => i.attrs,
        $slots: (i) => i.slots,
        $refs: (i) => i.refs,
        $parent: (i) => getPublicInstance(i.parent),
        $root: (i) => getPublicInstance(i.root),
        $emit: (i) => i.emit,
        $options: (i) => resolveMergedOptions(i),
        $forceUpdate: (i) => i.f || (i.f = () => {
          i.effect.dirty = true;
          queueJob(i.update);
        }),
        $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
        $watch: (i) => instanceWatch.bind(i)
      })
    );
    const hasSetupBinding = (state, key2) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key2);
    const PublicInstanceProxyHandlers = {
      get({ _: instance }, key2) {
        if (key2 === "__v_skip") {
          return true;
        }
        const { ctx, setupState, data, props, accessCache, type: type2, appContext } = instance;
        let normalizedProps;
        if (key2[0] !== "$") {
          const n = accessCache[key2];
          if (n !== void 0) {
            switch (n) {
              case 1:
                return setupState[key2];
              case 2:
                return data[key2];
              case 4:
                return ctx[key2];
              case 3:
                return props[key2];
            }
          } else if (hasSetupBinding(setupState, key2)) {
            accessCache[key2] = 1;
            return setupState[key2];
          } else if (data !== EMPTY_OBJ && hasOwn(data, key2)) {
            accessCache[key2] = 2;
            return data[key2];
          } else if (
            // only cache other properties when instance has declared (thus stable)
            // props
            (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key2)
          ) {
            accessCache[key2] = 3;
            return props[key2];
          } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key2)) {
            accessCache[key2] = 4;
            return ctx[key2];
          } else if (shouldCacheAccess) {
            accessCache[key2] = 0;
          }
        }
        const publicGetter = publicPropertiesMap[key2];
        let cssModule, globalProperties;
        if (publicGetter) {
          if (key2 === "$attrs") {
            track(instance.attrs, "get", "");
          }
          return publicGetter(instance);
        } else if (
          // css module (injected by vue-loader)
          (cssModule = type2.__cssModules) && (cssModule = cssModule[key2])
        ) {
          return cssModule;
        } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key2)) {
          accessCache[key2] = 4;
          return ctx[key2];
        } else if (
          // global properties
          globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key2)
        ) {
          {
            return globalProperties[key2];
          }
        } else
          ;
      },
      set({ _: instance }, key2, value) {
        const { data, setupState, ctx } = instance;
        if (hasSetupBinding(setupState, key2)) {
          setupState[key2] = value;
          return true;
        } else if (data !== EMPTY_OBJ && hasOwn(data, key2)) {
          data[key2] = value;
          return true;
        } else if (hasOwn(instance.props, key2)) {
          return false;
        }
        if (key2[0] === "$" && key2.slice(1) in instance) {
          return false;
        } else {
          {
            ctx[key2] = value;
          }
        }
        return true;
      },
      has({
        _: { data, setupState, accessCache, ctx, appContext, propsOptions }
      }, key2) {
        let normalizedProps;
        return !!accessCache[key2] || data !== EMPTY_OBJ && hasOwn(data, key2) || hasSetupBinding(setupState, key2) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key2) || hasOwn(ctx, key2) || hasOwn(publicPropertiesMap, key2) || hasOwn(appContext.config.globalProperties, key2);
      },
      defineProperty(target, key2, descriptor) {
        if (descriptor.get != null) {
          target._.accessCache[key2] = 0;
        } else if (hasOwn(descriptor, "value")) {
          this.set(target, key2, descriptor.value, null);
        }
        return Reflect.defineProperty(target, key2, descriptor);
      }
    };
    function useSlots() {
      return getContext().slots;
    }
    function useAttrs$1() {
      return getContext().attrs;
    }
    function getContext() {
      const i = getCurrentInstance();
      return i.setupContext || (i.setupContext = createSetupContext(i));
    }
    function normalizePropsOrEmits(props) {
      return isArray$2(props) ? props.reduce(
        (normalized, p2) => (normalized[p2] = null, normalized),
        {}
      ) : props;
    }
    let shouldCacheAccess = true;
    function applyOptions(instance) {
      const options = resolveMergedOptions(instance);
      const publicThis = instance.proxy;
      const ctx = instance.ctx;
      shouldCacheAccess = false;
      if (options.beforeCreate) {
        callHook$1(options.beforeCreate, instance, "bc");
      }
      const {
        // state
        data: dataOptions,
        computed: computedOptions,
        methods,
        watch: watchOptions,
        provide: provideOptions,
        inject: injectOptions,
        // lifecycle
        created,
        beforeMount,
        mounted,
        beforeUpdate,
        updated,
        activated,
        deactivated,
        beforeDestroy,
        beforeUnmount,
        destroyed,
        unmounted,
        render: render2,
        renderTracked,
        renderTriggered,
        errorCaptured,
        serverPrefetch,
        // public API
        expose,
        inheritAttrs,
        // assets
        components,
        directives,
        filters
      } = options;
      const checkDuplicateProperties = null;
      if (injectOptions) {
        resolveInjections(injectOptions, ctx, checkDuplicateProperties);
      }
      if (methods) {
        for (const key2 in methods) {
          const methodHandler = methods[key2];
          if (isFunction$1(methodHandler)) {
            {
              ctx[key2] = methodHandler.bind(publicThis);
            }
          }
        }
      }
      if (dataOptions) {
        const data = dataOptions.call(publicThis, publicThis);
        if (!isObject$1(data))
          ;
        else {
          instance.data = reactive(data);
        }
      }
      shouldCacheAccess = true;
      if (computedOptions) {
        for (const key2 in computedOptions) {
          const opt = computedOptions[key2];
          const get2 = isFunction$1(opt) ? opt.bind(publicThis, publicThis) : isFunction$1(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
          const set2 = !isFunction$1(opt) && isFunction$1(opt.set) ? opt.set.bind(publicThis) : NOOP;
          const c2 = computed({
            get: get2,
            set: set2
          });
          Object.defineProperty(ctx, key2, {
            enumerable: true,
            configurable: true,
            get: () => c2.value,
            set: (v) => c2.value = v
          });
        }
      }
      if (watchOptions) {
        for (const key2 in watchOptions) {
          createWatcher(watchOptions[key2], ctx, publicThis, key2);
        }
      }
      if (provideOptions) {
        const provides = isFunction$1(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
        Reflect.ownKeys(provides).forEach((key2) => {
          provide(key2, provides[key2]);
        });
      }
      if (created) {
        callHook$1(created, instance, "c");
      }
      function registerLifecycleHook(register, hook) {
        if (isArray$2(hook)) {
          hook.forEach((_hook) => register(_hook.bind(publicThis)));
        } else if (hook) {
          register(hook.bind(publicThis));
        }
      }
      registerLifecycleHook(onBeforeMount, beforeMount);
      registerLifecycleHook(onMounted, mounted);
      registerLifecycleHook(onBeforeUpdate, beforeUpdate);
      registerLifecycleHook(onUpdated, updated);
      registerLifecycleHook(onActivated, activated);
      registerLifecycleHook(onDeactivated, deactivated);
      registerLifecycleHook(onErrorCaptured, errorCaptured);
      registerLifecycleHook(onRenderTracked, renderTracked);
      registerLifecycleHook(onRenderTriggered, renderTriggered);
      registerLifecycleHook(onBeforeUnmount, beforeUnmount);
      registerLifecycleHook(onUnmounted, unmounted);
      registerLifecycleHook(onServerPrefetch, serverPrefetch);
      if (isArray$2(expose)) {
        if (expose.length) {
          const exposed = instance.exposed || (instance.exposed = {});
          expose.forEach((key2) => {
            Object.defineProperty(exposed, key2, {
              get: () => publicThis[key2],
              set: (val) => publicThis[key2] = val
            });
          });
        } else if (!instance.exposed) {
          instance.exposed = {};
        }
      }
      if (render2 && instance.render === NOOP) {
        instance.render = render2;
      }
      if (inheritAttrs != null) {
        instance.inheritAttrs = inheritAttrs;
      }
      if (components)
        instance.components = components;
      if (directives)
        instance.directives = directives;
    }
    function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
      if (isArray$2(injectOptions)) {
        injectOptions = normalizeInject(injectOptions);
      }
      for (const key2 in injectOptions) {
        const opt = injectOptions[key2];
        let injected;
        if (isObject$1(opt)) {
          if ("default" in opt) {
            injected = inject(
              opt.from || key2,
              opt.default,
              true
            );
          } else {
            injected = inject(opt.from || key2);
          }
        } else {
          injected = inject(opt);
        }
        if (isRef(injected)) {
          Object.defineProperty(ctx, key2, {
            enumerable: true,
            configurable: true,
            get: () => injected.value,
            set: (v) => injected.value = v
          });
        } else {
          ctx[key2] = injected;
        }
      }
    }
    function callHook$1(hook, instance, type2) {
      callWithAsyncErrorHandling(
        isArray$2(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
        instance,
        type2
      );
    }
    function createWatcher(raw, ctx, publicThis, key2) {
      const getter = key2.includes(".") ? createPathGetter(publicThis, key2) : () => publicThis[key2];
      if (isString$1(raw)) {
        const handler = ctx[raw];
        if (isFunction$1(handler)) {
          watch(getter, handler);
        }
      } else if (isFunction$1(raw)) {
        watch(getter, raw.bind(publicThis));
      } else if (isObject$1(raw)) {
        if (isArray$2(raw)) {
          raw.forEach((r) => createWatcher(r, ctx, publicThis, key2));
        } else {
          const handler = isFunction$1(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
          if (isFunction$1(handler)) {
            watch(getter, handler, raw);
          }
        }
      } else
        ;
    }
    function resolveMergedOptions(instance) {
      const base2 = instance.type;
      const { mixins, extends: extendsOptions } = base2;
      const {
        mixins: globalMixins,
        optionsCache: cache,
        config: { optionMergeStrategies }
      } = instance.appContext;
      const cached = cache.get(base2);
      let resolved;
      if (cached) {
        resolved = cached;
      } else if (!globalMixins.length && !mixins && !extendsOptions) {
        {
          resolved = base2;
        }
      } else {
        resolved = {};
        if (globalMixins.length) {
          globalMixins.forEach(
            (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
          );
        }
        mergeOptions(resolved, base2, optionMergeStrategies);
      }
      if (isObject$1(base2)) {
        cache.set(base2, resolved);
      }
      return resolved;
    }
    function mergeOptions(to, from, strats, asMixin = false) {
      const { mixins, extends: extendsOptions } = from;
      if (extendsOptions) {
        mergeOptions(to, extendsOptions, strats, true);
      }
      if (mixins) {
        mixins.forEach(
          (m) => mergeOptions(to, m, strats, true)
        );
      }
      for (const key2 in from) {
        if (asMixin && key2 === "expose")
          ;
        else {
          const strat = internalOptionMergeStrats[key2] || strats && strats[key2];
          to[key2] = strat ? strat(to[key2], from[key2]) : from[key2];
        }
      }
      return to;
    }
    const internalOptionMergeStrats = {
      data: mergeDataFn,
      props: mergeEmitsOrPropsOptions,
      emits: mergeEmitsOrPropsOptions,
      // objects
      methods: mergeObjectOptions,
      computed: mergeObjectOptions,
      // lifecycle
      beforeCreate: mergeAsArray,
      created: mergeAsArray,
      beforeMount: mergeAsArray,
      mounted: mergeAsArray,
      beforeUpdate: mergeAsArray,
      updated: mergeAsArray,
      beforeDestroy: mergeAsArray,
      beforeUnmount: mergeAsArray,
      destroyed: mergeAsArray,
      unmounted: mergeAsArray,
      activated: mergeAsArray,
      deactivated: mergeAsArray,
      errorCaptured: mergeAsArray,
      serverPrefetch: mergeAsArray,
      // assets
      components: mergeObjectOptions,
      directives: mergeObjectOptions,
      // watch
      watch: mergeWatchOptions,
      // provide / inject
      provide: mergeDataFn,
      inject: mergeInject
    };
    function mergeDataFn(to, from) {
      if (!from) {
        return to;
      }
      if (!to) {
        return from;
      }
      return function mergedDataFn() {
        return extend(
          isFunction$1(to) ? to.call(this, this) : to,
          isFunction$1(from) ? from.call(this, this) : from
        );
      };
    }
    function mergeInject(to, from) {
      return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
    }
    function normalizeInject(raw) {
      if (isArray$2(raw)) {
        const res = {};
        for (let i = 0; i < raw.length; i++) {
          res[raw[i]] = raw[i];
        }
        return res;
      }
      return raw;
    }
    function mergeAsArray(to, from) {
      return to ? [...new Set([].concat(to, from))] : from;
    }
    function mergeObjectOptions(to, from) {
      return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
    }
    function mergeEmitsOrPropsOptions(to, from) {
      if (to) {
        if (isArray$2(to) && isArray$2(from)) {
          return [.../* @__PURE__ */ new Set([...to, ...from])];
        }
        return extend(
          /* @__PURE__ */ Object.create(null),
          normalizePropsOrEmits(to),
          normalizePropsOrEmits(from != null ? from : {})
        );
      } else {
        return from;
      }
    }
    function mergeWatchOptions(to, from) {
      if (!to)
        return from;
      if (!from)
        return to;
      const merged = extend(/* @__PURE__ */ Object.create(null), to);
      for (const key2 in from) {
        merged[key2] = mergeAsArray(to[key2], from[key2]);
      }
      return merged;
    }
    function createAppContext() {
      return {
        app: null,
        config: {
          isNativeTag: NO,
          performance: false,
          globalProperties: {},
          optionMergeStrategies: {},
          errorHandler: void 0,
          warnHandler: void 0,
          compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: /* @__PURE__ */ Object.create(null),
        optionsCache: /* @__PURE__ */ new WeakMap(),
        propsCache: /* @__PURE__ */ new WeakMap(),
        emitsCache: /* @__PURE__ */ new WeakMap()
      };
    }
    let uid$1 = 0;
    function createAppAPI(render2, hydrate) {
      return function createApp2(rootComponent, rootProps = null) {
        if (!isFunction$1(rootComponent)) {
          rootComponent = extend({}, rootComponent);
        }
        if (rootProps != null && !isObject$1(rootProps)) {
          rootProps = null;
        }
        const context = createAppContext();
        const installedPlugins = /* @__PURE__ */ new WeakSet();
        let isMounted = false;
        const app = context.app = {
          _uid: uid$1++,
          _component: rootComponent,
          _props: rootProps,
          _container: null,
          _context: context,
          _instance: null,
          version,
          get config() {
            return context.config;
          },
          set config(v) {
          },
          use(plugin, ...options) {
            if (installedPlugins.has(plugin))
              ;
            else if (plugin && isFunction$1(plugin.install)) {
              installedPlugins.add(plugin);
              plugin.install(app, ...options);
            } else if (isFunction$1(plugin)) {
              installedPlugins.add(plugin);
              plugin(app, ...options);
            } else
              ;
            return app;
          },
          mixin(mixin) {
            {
              if (!context.mixins.includes(mixin)) {
                context.mixins.push(mixin);
              }
            }
            return app;
          },
          component(name, component) {
            if (!component) {
              return context.components[name];
            }
            context.components[name] = component;
            return app;
          },
          directive(name, directive) {
            if (!directive) {
              return context.directives[name];
            }
            context.directives[name] = directive;
            return app;
          },
          mount(rootContainer, isHydrate, namespace) {
            if (!isMounted) {
              const vnode = createVNode(rootComponent, rootProps);
              vnode.appContext = context;
              if (namespace === true) {
                namespace = "svg";
              } else if (namespace === false) {
                namespace = void 0;
              }
              if (isHydrate && hydrate) {
                hydrate(vnode, rootContainer);
              } else {
                render2(vnode, rootContainer, namespace);
              }
              isMounted = true;
              app._container = rootContainer;
              rootContainer.__vue_app__ = app;
              return getExposeProxy(vnode.component) || vnode.component.proxy;
            }
          },
          unmount() {
            if (isMounted) {
              render2(null, app._container);
              delete app._container.__vue_app__;
            }
          },
          provide(key2, value) {
            context.provides[key2] = value;
            return app;
          },
          runWithContext(fn2) {
            const lastApp = currentApp;
            currentApp = app;
            try {
              return fn2();
            } finally {
              currentApp = lastApp;
            }
          }
        };
        return app;
      };
    }
    let currentApp = null;
    function provide(key2, value) {
      if (!currentInstance)
        ;
      else {
        let provides = currentInstance.provides;
        const parentProvides = currentInstance.parent && currentInstance.parent.provides;
        if (parentProvides === provides) {
          provides = currentInstance.provides = Object.create(parentProvides);
        }
        provides[key2] = value;
      }
    }
    function inject(key2, defaultValue, treatDefaultAsFactory = false) {
      const instance = currentInstance || currentRenderingInstance;
      if (instance || currentApp) {
        const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
        if (provides && key2 in provides) {
          return provides[key2];
        } else if (arguments.length > 1) {
          return treatDefaultAsFactory && isFunction$1(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
        } else
          ;
      }
    }
    const internalObjectProto = /* @__PURE__ */ Object.create(null);
    const createInternalObject = () => Object.create(internalObjectProto);
    const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
    function initProps(instance, rawProps, isStateful, isSSR = false) {
      const props = {};
      const attrs = createInternalObject();
      instance.propsDefaults = /* @__PURE__ */ Object.create(null);
      setFullProps(instance, rawProps, props, attrs);
      for (const key2 in instance.propsOptions[0]) {
        if (!(key2 in props)) {
          props[key2] = void 0;
        }
      }
      if (isStateful) {
        instance.props = isSSR ? props : shallowReactive(props);
      } else {
        if (!instance.type.props) {
          instance.props = attrs;
        } else {
          instance.props = props;
        }
      }
      instance.attrs = attrs;
    }
    function updateProps(instance, rawProps, rawPrevProps, optimized) {
      const {
        props,
        attrs,
        vnode: { patchFlag }
      } = instance;
      const rawCurrentProps = toRaw(props);
      const [options] = instance.propsOptions;
      let hasAttrsChanged = false;
      if (
        // always force full diff in dev
        // - #1942 if hmr is enabled with sfc component
        // - vite#872 non-sfc component used by sfc component
        (optimized || patchFlag > 0) && !(patchFlag & 16)
      ) {
        if (patchFlag & 8) {
          const propsToUpdate = instance.vnode.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            let key2 = propsToUpdate[i];
            if (isEmitListener(instance.emitsOptions, key2)) {
              continue;
            }
            const value = rawProps[key2];
            if (options) {
              if (hasOwn(attrs, key2)) {
                if (value !== attrs[key2]) {
                  attrs[key2] = value;
                  hasAttrsChanged = true;
                }
              } else {
                const camelizedKey = camelize(key2);
                props[camelizedKey] = resolvePropValue(
                  options,
                  rawCurrentProps,
                  camelizedKey,
                  value,
                  instance,
                  false
                );
              }
            } else {
              if (value !== attrs[key2]) {
                attrs[key2] = value;
                hasAttrsChanged = true;
              }
            }
          }
        }
      } else {
        if (setFullProps(instance, rawProps, props, attrs)) {
          hasAttrsChanged = true;
        }
        let kebabKey;
        for (const key2 in rawCurrentProps) {
          if (!rawProps || // for camelCase
          !hasOwn(rawProps, key2) && // it's possible the original props was passed in as kebab-case
          // and converted to camelCase (#955)
          ((kebabKey = hyphenate(key2)) === key2 || !hasOwn(rawProps, kebabKey))) {
            if (options) {
              if (rawPrevProps && // for camelCase
              (rawPrevProps[key2] !== void 0 || // for kebab-case
              rawPrevProps[kebabKey] !== void 0)) {
                props[key2] = resolvePropValue(
                  options,
                  rawCurrentProps,
                  key2,
                  void 0,
                  instance,
                  true
                );
              }
            } else {
              delete props[key2];
            }
          }
        }
        if (attrs !== rawCurrentProps) {
          for (const key2 in attrs) {
            if (!rawProps || !hasOwn(rawProps, key2) && true) {
              delete attrs[key2];
              hasAttrsChanged = true;
            }
          }
        }
      }
      if (hasAttrsChanged) {
        trigger(instance.attrs, "set", "");
      }
    }
    function setFullProps(instance, rawProps, props, attrs) {
      const [options, needCastKeys] = instance.propsOptions;
      let hasAttrsChanged = false;
      let rawCastValues;
      if (rawProps) {
        for (let key2 in rawProps) {
          if (isReservedProp(key2)) {
            continue;
          }
          const value = rawProps[key2];
          let camelKey;
          if (options && hasOwn(options, camelKey = camelize(key2))) {
            if (!needCastKeys || !needCastKeys.includes(camelKey)) {
              props[camelKey] = value;
            } else {
              (rawCastValues || (rawCastValues = {}))[camelKey] = value;
            }
          } else if (!isEmitListener(instance.emitsOptions, key2)) {
            if (!(key2 in attrs) || value !== attrs[key2]) {
              attrs[key2] = value;
              hasAttrsChanged = true;
            }
          }
        }
      }
      if (needCastKeys) {
        const rawCurrentProps = toRaw(props);
        const castValues = rawCastValues || EMPTY_OBJ;
        for (let i = 0; i < needCastKeys.length; i++) {
          const key2 = needCastKeys[i];
          props[key2] = resolvePropValue(
            options,
            rawCurrentProps,
            key2,
            castValues[key2],
            instance,
            !hasOwn(castValues, key2)
          );
        }
      }
      return hasAttrsChanged;
    }
    function resolvePropValue(options, props, key2, value, instance, isAbsent) {
      const opt = options[key2];
      if (opt != null) {
        const hasDefault = hasOwn(opt, "default");
        if (hasDefault && value === void 0) {
          const defaultValue = opt.default;
          if (opt.type !== Function && !opt.skipFactory && isFunction$1(defaultValue)) {
            const { propsDefaults } = instance;
            if (key2 in propsDefaults) {
              value = propsDefaults[key2];
            } else {
              const reset = setCurrentInstance(instance);
              value = propsDefaults[key2] = defaultValue.call(
                null,
                props
              );
              reset();
            }
          } else {
            value = defaultValue;
          }
        }
        if (opt[
          0
          /* shouldCast */
        ]) {
          if (isAbsent && !hasDefault) {
            value = false;
          } else if (opt[
            1
            /* shouldCastTrue */
          ] && (value === "" || value === hyphenate(key2))) {
            value = true;
          }
        }
      }
      return value;
    }
    function normalizePropsOptions(comp, appContext, asMixin = false) {
      const cache = appContext.propsCache;
      const cached = cache.get(comp);
      if (cached) {
        return cached;
      }
      const raw = comp.props;
      const normalized = {};
      const needCastKeys = [];
      let hasExtends = false;
      if (!isFunction$1(comp)) {
        const extendProps = (raw2) => {
          hasExtends = true;
          const [props, keys2] = normalizePropsOptions(raw2, appContext, true);
          extend(normalized, props);
          if (keys2)
            needCastKeys.push(...keys2);
        };
        if (!asMixin && appContext.mixins.length) {
          appContext.mixins.forEach(extendProps);
        }
        if (comp.extends) {
          extendProps(comp.extends);
        }
        if (comp.mixins) {
          comp.mixins.forEach(extendProps);
        }
      }
      if (!raw && !hasExtends) {
        if (isObject$1(comp)) {
          cache.set(comp, EMPTY_ARR);
        }
        return EMPTY_ARR;
      }
      if (isArray$2(raw)) {
        for (let i = 0; i < raw.length; i++) {
          const normalizedKey = camelize(raw[i]);
          if (validatePropName(normalizedKey)) {
            normalized[normalizedKey] = EMPTY_OBJ;
          }
        }
      } else if (raw) {
        for (const key2 in raw) {
          const normalizedKey = camelize(key2);
          if (validatePropName(normalizedKey)) {
            const opt = raw[key2];
            const prop = normalized[normalizedKey] = isArray$2(opt) || isFunction$1(opt) ? { type: opt } : extend({}, opt);
            if (prop) {
              const booleanIndex = getTypeIndex(Boolean, prop.type);
              const stringIndex = getTypeIndex(String, prop.type);
              prop[
                0
                /* shouldCast */
              ] = booleanIndex > -1;
              prop[
                1
                /* shouldCastTrue */
              ] = stringIndex < 0 || booleanIndex < stringIndex;
              if (booleanIndex > -1 || hasOwn(prop, "default")) {
                needCastKeys.push(normalizedKey);
              }
            }
          }
        }
      }
      const res = [normalized, needCastKeys];
      if (isObject$1(comp)) {
        cache.set(comp, res);
      }
      return res;
    }
    function validatePropName(key2) {
      if (key2[0] !== "$" && !isReservedProp(key2)) {
        return true;
      }
      return false;
    }
    function getType(ctor) {
      if (ctor === null) {
        return "null";
      }
      if (typeof ctor === "function") {
        return ctor.name || "";
      } else if (typeof ctor === "object") {
        const name = ctor.constructor && ctor.constructor.name;
        return name || "";
      }
      return "";
    }
    function isSameType(a, b) {
      return getType(a) === getType(b);
    }
    function getTypeIndex(type2, expectedTypes) {
      if (isArray$2(expectedTypes)) {
        return expectedTypes.findIndex((t) => isSameType(t, type2));
      } else if (isFunction$1(expectedTypes)) {
        return isSameType(expectedTypes, type2) ? 0 : -1;
      }
      return -1;
    }
    const isInternalKey = (key2) => key2[0] === "_" || key2 === "$stable";
    const normalizeSlotValue = (value) => isArray$2(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
    const normalizeSlot = (key2, rawSlot, ctx) => {
      if (rawSlot._n) {
        return rawSlot;
      }
      const normalized = withCtx((...args) => {
        if (false)
          ;
        return normalizeSlotValue(rawSlot(...args));
      }, ctx);
      normalized._c = false;
      return normalized;
    };
    const normalizeObjectSlots = (rawSlots, slots, instance) => {
      const ctx = rawSlots._ctx;
      for (const key2 in rawSlots) {
        if (isInternalKey(key2))
          continue;
        const value = rawSlots[key2];
        if (isFunction$1(value)) {
          slots[key2] = normalizeSlot(key2, value, ctx);
        } else if (value != null) {
          const normalized = normalizeSlotValue(value);
          slots[key2] = () => normalized;
        }
      }
    };
    const normalizeVNodeSlots = (instance, children) => {
      const normalized = normalizeSlotValue(children);
      instance.slots.default = () => normalized;
    };
    const initSlots = (instance, children) => {
      if (instance.vnode.shapeFlag & 32) {
        const type2 = children._;
        if (type2) {
          instance.slots = toRaw(children);
          def(instance.slots, "_", type2);
        } else {
          normalizeObjectSlots(
            children,
            instance.slots = createInternalObject()
          );
        }
      } else {
        instance.slots = createInternalObject();
        if (children) {
          normalizeVNodeSlots(instance, children);
        }
      }
    };
    const updateSlots = (instance, children, optimized) => {
      const { vnode, slots } = instance;
      let needDeletionCheck = true;
      let deletionComparisonTarget = EMPTY_OBJ;
      if (vnode.shapeFlag & 32) {
        const type2 = children._;
        if (type2) {
          if (optimized && type2 === 1) {
            needDeletionCheck = false;
          } else {
            extend(slots, children);
            if (!optimized && type2 === 1) {
              delete slots._;
            }
          }
        } else {
          needDeletionCheck = !children.$stable;
          normalizeObjectSlots(children, slots);
        }
        deletionComparisonTarget = children;
      } else if (children) {
        normalizeVNodeSlots(instance, children);
        deletionComparisonTarget = { default: 1 };
      }
      if (needDeletionCheck) {
        for (const key2 in slots) {
          if (!isInternalKey(key2) && deletionComparisonTarget[key2] == null) {
            delete slots[key2];
          }
        }
      }
    };
    function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
      if (isArray$2(rawRef)) {
        rawRef.forEach(
          (r, i) => setRef(
            r,
            oldRawRef && (isArray$2(oldRawRef) ? oldRawRef[i] : oldRawRef),
            parentSuspense,
            vnode,
            isUnmount
          )
        );
        return;
      }
      if (isAsyncWrapper(vnode) && !isUnmount) {
        return;
      }
      const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
      const value = isUnmount ? null : refValue;
      const { i: owner, r: ref2 } = rawRef;
      const oldRef = oldRawRef && oldRawRef.r;
      const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
      const setupState = owner.setupState;
      if (oldRef != null && oldRef !== ref2) {
        if (isString$1(oldRef)) {
          refs[oldRef] = null;
          if (hasOwn(setupState, oldRef)) {
            setupState[oldRef] = null;
          }
        } else if (isRef(oldRef)) {
          oldRef.value = null;
        }
      }
      if (isFunction$1(ref2)) {
        callWithErrorHandling(ref2, owner, 12, [value, refs]);
      } else {
        const _isString = isString$1(ref2);
        const _isRef = isRef(ref2);
        if (_isString || _isRef) {
          const doSet = () => {
            if (rawRef.f) {
              const existing = _isString ? hasOwn(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
              if (isUnmount) {
                isArray$2(existing) && remove(existing, refValue);
              } else {
                if (!isArray$2(existing)) {
                  if (_isString) {
                    refs[ref2] = [refValue];
                    if (hasOwn(setupState, ref2)) {
                      setupState[ref2] = refs[ref2];
                    }
                  } else {
                    ref2.value = [refValue];
                    if (rawRef.k)
                      refs[rawRef.k] = ref2.value;
                  }
                } else if (!existing.includes(refValue)) {
                  existing.push(refValue);
                }
              }
            } else if (_isString) {
              refs[ref2] = value;
              if (hasOwn(setupState, ref2)) {
                setupState[ref2] = value;
              }
            } else if (_isRef) {
              ref2.value = value;
              if (rawRef.k)
                refs[rawRef.k] = value;
            } else
              ;
          };
          if (value) {
            doSet.id = -1;
            queuePostRenderEffect(doSet, parentSuspense);
          } else {
            doSet();
          }
        }
      }
    }
    function initFeatureFlags() {
      if (typeof __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ !== "boolean") {
        getGlobalThis().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;
      }
    }
    const queuePostRenderEffect = queueEffectWithSuspense;
    function createRenderer(options) {
      return baseCreateRenderer(options);
    }
    function baseCreateRenderer(options, createHydrationFns) {
      {
        initFeatureFlags();
      }
      const target = getGlobalThis();
      target.__VUE__ = true;
      const {
        insert: hostInsert,
        remove: hostRemove,
        patchProp: hostPatchProp,
        createElement: hostCreateElement,
        createText: hostCreateText,
        createComment: hostCreateComment,
        setText: hostSetText,
        setElementText: hostSetElementText,
        parentNode: hostParentNode,
        nextSibling: hostNextSibling,
        setScopeId: hostSetScopeId = NOOP,
        insertStaticContent: hostInsertStaticContent
      } = options;
      const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
        if (n1 === n2) {
          return;
        }
        if (n1 && !isSameVNodeType(n1, n2)) {
          anchor = getNextHostNode(n1);
          unmount(n1, parentComponent, parentSuspense, true);
          n1 = null;
        }
        if (n2.patchFlag === -2) {
          optimized = false;
          n2.dynamicChildren = null;
        }
        const { type: type2, ref: ref2, shapeFlag } = n2;
        switch (type2) {
          case Text$1:
            processText(n1, n2, container, anchor);
            break;
          case Comment:
            processCommentNode(n1, n2, container, anchor);
            break;
          case Static:
            if (n1 == null) {
              mountStaticNode(n2, container, anchor, namespace);
            }
            break;
          case Fragment:
            processFragment(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
            break;
          default:
            if (shapeFlag & 1) {
              processElement(
                n1,
                n2,
                container,
                anchor,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized
              );
            } else if (shapeFlag & 6) {
              processComponent(
                n1,
                n2,
                container,
                anchor,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized
              );
            } else if (shapeFlag & 64) {
              type2.process(
                n1,
                n2,
                container,
                anchor,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized,
                internals
              );
            } else if (shapeFlag & 128) {
              type2.process(
                n1,
                n2,
                container,
                anchor,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized,
                internals
              );
            } else
              ;
        }
        if (ref2 != null && parentComponent) {
          setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
        }
      };
      const processText = (n1, n2, container, anchor) => {
        if (n1 == null) {
          hostInsert(
            n2.el = hostCreateText(n2.children),
            container,
            anchor
          );
        } else {
          const el = n2.el = n1.el;
          if (n2.children !== n1.children) {
            hostSetText(el, n2.children);
          }
        }
      };
      const processCommentNode = (n1, n2, container, anchor) => {
        if (n1 == null) {
          hostInsert(
            n2.el = hostCreateComment(n2.children || ""),
            container,
            anchor
          );
        } else {
          n2.el = n1.el;
        }
      };
      const mountStaticNode = (n2, container, anchor, namespace) => {
        [n2.el, n2.anchor] = hostInsertStaticContent(
          n2.children,
          container,
          anchor,
          namespace,
          n2.el,
          n2.anchor
        );
      };
      const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
        let next;
        while (el && el !== anchor) {
          next = hostNextSibling(el);
          hostInsert(el, container, nextSibling);
          el = next;
        }
        hostInsert(anchor, container, nextSibling);
      };
      const removeStaticNode = ({ el, anchor }) => {
        let next;
        while (el && el !== anchor) {
          next = hostNextSibling(el);
          hostRemove(el);
          el = next;
        }
        hostRemove(anchor);
      };
      const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        if (n2.type === "svg") {
          namespace = "svg";
        } else if (n2.type === "math") {
          namespace = "mathml";
        }
        if (n1 == null) {
          mountElement(
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          patchElement(
            n1,
            n2,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      };
      const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        let el;
        let vnodeHook;
        const { props, shapeFlag, transition, dirs } = vnode;
        el = vnode.el = hostCreateElement(
          vnode.type,
          namespace,
          props && props.is,
          props
        );
        if (shapeFlag & 8) {
          hostSetElementText(el, vnode.children);
        } else if (shapeFlag & 16) {
          mountChildren(
            vnode.children,
            el,
            null,
            parentComponent,
            parentSuspense,
            resolveChildrenNamespace(vnode, namespace),
            slotScopeIds,
            optimized
          );
        }
        if (dirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "created");
        }
        setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
        if (props) {
          for (const key2 in props) {
            if (key2 !== "value" && !isReservedProp(key2)) {
              hostPatchProp(
                el,
                key2,
                null,
                props[key2],
                namespace,
                vnode.children,
                parentComponent,
                parentSuspense,
                unmountChildren
              );
            }
          }
          if ("value" in props) {
            hostPatchProp(el, "value", null, props.value, namespace);
          }
          if (vnodeHook = props.onVnodeBeforeMount) {
            invokeVNodeHook(vnodeHook, parentComponent, vnode);
          }
        }
        if (dirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
        }
        const needCallTransitionHooks = needTransition(parentSuspense, transition);
        if (needCallTransitionHooks) {
          transition.beforeEnter(el);
        }
        hostInsert(el, container, anchor);
        if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
          queuePostRenderEffect(() => {
            vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
            needCallTransitionHooks && transition.enter(el);
            dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
          }, parentSuspense);
        }
      };
      const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
        if (scopeId) {
          hostSetScopeId(el, scopeId);
        }
        if (slotScopeIds) {
          for (let i = 0; i < slotScopeIds.length; i++) {
            hostSetScopeId(el, slotScopeIds[i]);
          }
        }
        if (parentComponent) {
          let subTree = parentComponent.subTree;
          if (vnode === subTree) {
            const parentVNode = parentComponent.vnode;
            setScopeId(
              el,
              parentVNode,
              parentVNode.scopeId,
              parentVNode.slotScopeIds,
              parentComponent.parent
            );
          }
        }
      };
      const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
        for (let i = start; i < children.length; i++) {
          const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
          patch(
            null,
            child,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      };
      const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        const el = n2.el = n1.el;
        let { patchFlag, dynamicChildren, dirs } = n2;
        patchFlag |= n1.patchFlag & 16;
        const oldProps = n1.props || EMPTY_OBJ;
        const newProps = n2.props || EMPTY_OBJ;
        let vnodeHook;
        parentComponent && toggleRecurse(parentComponent, false);
        if (vnodeHook = newProps.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        }
        if (dirs) {
          invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
        }
        parentComponent && toggleRecurse(parentComponent, true);
        if (dynamicChildren) {
          patchBlockChildren(
            n1.dynamicChildren,
            dynamicChildren,
            el,
            parentComponent,
            parentSuspense,
            resolveChildrenNamespace(n2, namespace),
            slotScopeIds
          );
        } else if (!optimized) {
          patchChildren(
            n1,
            n2,
            el,
            null,
            parentComponent,
            parentSuspense,
            resolveChildrenNamespace(n2, namespace),
            slotScopeIds,
            false
          );
        }
        if (patchFlag > 0) {
          if (patchFlag & 16) {
            patchProps(
              el,
              n2,
              oldProps,
              newProps,
              parentComponent,
              parentSuspense,
              namespace
            );
          } else {
            if (patchFlag & 2) {
              if (oldProps.class !== newProps.class) {
                hostPatchProp(el, "class", null, newProps.class, namespace);
              }
            }
            if (patchFlag & 4) {
              hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
            }
            if (patchFlag & 8) {
              const propsToUpdate = n2.dynamicProps;
              for (let i = 0; i < propsToUpdate.length; i++) {
                const key2 = propsToUpdate[i];
                const prev = oldProps[key2];
                const next = newProps[key2];
                if (next !== prev || key2 === "value") {
                  hostPatchProp(
                    el,
                    key2,
                    prev,
                    next,
                    namespace,
                    n1.children,
                    parentComponent,
                    parentSuspense,
                    unmountChildren
                  );
                }
              }
            }
          }
          if (patchFlag & 1) {
            if (n1.children !== n2.children) {
              hostSetElementText(el, n2.children);
            }
          }
        } else if (!optimized && dynamicChildren == null) {
          patchProps(
            el,
            n2,
            oldProps,
            newProps,
            parentComponent,
            parentSuspense,
            namespace
          );
        }
        if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
          queuePostRenderEffect(() => {
            vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
            dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
          }, parentSuspense);
        }
      };
      const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
        for (let i = 0; i < newChildren.length; i++) {
          const oldVNode = oldChildren[i];
          const newVNode = newChildren[i];
          const container = (
            // oldVNode may be an errored async setup() component inside Suspense
            // which will not have a mounted element
            oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
            // of the Fragment itself so it can move its children.
            (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
            // which also requires the correct parent container
            !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
            oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
              // In other cases, the parent container is not actually used so we
              // just pass the block element here to avoid a DOM parentNode call.
              fallbackContainer
            )
          );
          patch(
            oldVNode,
            newVNode,
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            true
          );
        }
      };
      const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, namespace) => {
        if (oldProps !== newProps) {
          if (oldProps !== EMPTY_OBJ) {
            for (const key2 in oldProps) {
              if (!isReservedProp(key2) && !(key2 in newProps)) {
                hostPatchProp(
                  el,
                  key2,
                  oldProps[key2],
                  null,
                  namespace,
                  vnode.children,
                  parentComponent,
                  parentSuspense,
                  unmountChildren
                );
              }
            }
          }
          for (const key2 in newProps) {
            if (isReservedProp(key2))
              continue;
            const next = newProps[key2];
            const prev = oldProps[key2];
            if (next !== prev && key2 !== "value") {
              hostPatchProp(
                el,
                key2,
                prev,
                next,
                namespace,
                vnode.children,
                parentComponent,
                parentSuspense,
                unmountChildren
              );
            }
          }
          if ("value" in newProps) {
            hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
          }
        }
      };
      const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
        const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
        let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
        if (fragmentSlotScopeIds) {
          slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
        }
        if (n1 == null) {
          hostInsert(fragmentStartAnchor, container, anchor);
          hostInsert(fragmentEndAnchor, container, anchor);
          mountChildren(
            // #10007
            // such fragment like `<></>` will be compiled into
            // a fragment which doesn't have a children.
            // In this case fallback to an empty array
            n2.children || [],
            container,
            fragmentEndAnchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
          // of renderSlot() with no valid children
          n1.dynamicChildren) {
            patchBlockChildren(
              n1.dynamicChildren,
              dynamicChildren,
              container,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds
            );
            if (
              // #2080 if the stable fragment has a key, it's a <template v-for> that may
              //  get moved around. Make sure all root level vnodes inherit el.
              // #2134 or if it's a component root, it may also get moved around
              // as the component is being moved.
              n2.key != null || parentComponent && n2 === parentComponent.subTree
            ) {
              traverseStaticChildren(
                n1,
                n2,
                true
                /* shallow */
              );
            }
          } else {
            patchChildren(
              n1,
              n2,
              container,
              fragmentEndAnchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          }
        }
      };
      const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        n2.slotScopeIds = slotScopeIds;
        if (n1 == null) {
          if (n2.shapeFlag & 512) {
            parentComponent.ctx.activate(
              n2,
              container,
              anchor,
              namespace,
              optimized
            );
          } else {
            mountComponent(
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              optimized
            );
          }
        } else {
          updateComponent(n1, n2, optimized);
        }
      };
      const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
        const instance = initialVNode.component = createComponentInstance(
          initialVNode,
          parentComponent,
          parentSuspense
        );
        if (isKeepAlive(initialVNode)) {
          instance.ctx.renderer = internals;
        }
        {
          setupComponent(instance);
        }
        if (instance.asyncDep) {
          parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
          if (!initialVNode.el) {
            const placeholder = instance.subTree = createVNode(Comment);
            processCommentNode(null, placeholder, container, anchor);
          }
        } else {
          setupRenderEffect(
            instance,
            initialVNode,
            container,
            anchor,
            parentSuspense,
            namespace,
            optimized
          );
        }
      };
      const updateComponent = (n1, n2, optimized) => {
        const instance = n2.component = n1.component;
        if (shouldUpdateComponent(n1, n2, optimized)) {
          if (instance.asyncDep && !instance.asyncResolved) {
            updateComponentPreRender(instance, n2, optimized);
            return;
          } else {
            instance.next = n2;
            invalidateJob(instance.update);
            instance.effect.dirty = true;
            instance.update();
          }
        } else {
          n2.el = n1.el;
          instance.vnode = n2;
        }
      };
      const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
        const componentUpdateFn = () => {
          if (!instance.isMounted) {
            let vnodeHook;
            const { el, props } = initialVNode;
            const { bm, m, parent } = instance;
            const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
            toggleRecurse(instance, false);
            if (bm) {
              invokeArrayFns(bm);
            }
            if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
              invokeVNodeHook(vnodeHook, parent, initialVNode);
            }
            toggleRecurse(instance, true);
            if (el && hydrateNode) {
              const hydrateSubTree = () => {
                instance.subTree = renderComponentRoot(instance);
                hydrateNode(
                  el,
                  instance.subTree,
                  instance,
                  parentSuspense,
                  null
                );
              };
              if (isAsyncWrapperVNode) {
                initialVNode.type.__asyncLoader().then(
                  // note: we are moving the render call into an async callback,
                  // which means it won't track dependencies - but it's ok because
                  // a server-rendered async wrapper is already in resolved state
                  // and it will never need to change.
                  () => !instance.isUnmounted && hydrateSubTree()
                );
              } else {
                hydrateSubTree();
              }
            } else {
              const subTree = instance.subTree = renderComponentRoot(instance);
              patch(
                null,
                subTree,
                container,
                anchor,
                instance,
                parentSuspense,
                namespace
              );
              initialVNode.el = subTree.el;
            }
            if (m) {
              queuePostRenderEffect(m, parentSuspense);
            }
            if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
              const scopedInitialVNode = initialVNode;
              queuePostRenderEffect(
                () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
                parentSuspense
              );
            }
            if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
              instance.a && queuePostRenderEffect(instance.a, parentSuspense);
            }
            instance.isMounted = true;
            initialVNode = container = anchor = null;
          } else {
            let { next, bu, u, parent, vnode } = instance;
            {
              const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
              if (nonHydratedAsyncRoot) {
                if (next) {
                  next.el = vnode.el;
                  updateComponentPreRender(instance, next, optimized);
                }
                nonHydratedAsyncRoot.asyncDep.then(() => {
                  if (!instance.isUnmounted) {
                    componentUpdateFn();
                  }
                });
                return;
              }
            }
            let originNext = next;
            let vnodeHook;
            toggleRecurse(instance, false);
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            } else {
              next = vnode;
            }
            if (bu) {
              invokeArrayFns(bu);
            }
            if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
              invokeVNodeHook(vnodeHook, parent, next, vnode);
            }
            toggleRecurse(instance, true);
            const nextTree = renderComponentRoot(instance);
            const prevTree = instance.subTree;
            instance.subTree = nextTree;
            patch(
              prevTree,
              nextTree,
              // parent may have changed if it's in a teleport
              hostParentNode(prevTree.el),
              // anchor may have changed if it's in a fragment
              getNextHostNode(prevTree),
              instance,
              parentSuspense,
              namespace
            );
            next.el = nextTree.el;
            if (originNext === null) {
              updateHOCHostEl(instance, nextTree.el);
            }
            if (u) {
              queuePostRenderEffect(u, parentSuspense);
            }
            if (vnodeHook = next.props && next.props.onVnodeUpdated) {
              queuePostRenderEffect(
                () => invokeVNodeHook(vnodeHook, parent, next, vnode),
                parentSuspense
              );
            }
          }
        };
        const effect = instance.effect = new ReactiveEffect(
          componentUpdateFn,
          NOOP,
          () => queueJob(update),
          instance.scope
          // track it in component's effect scope
        );
        const update = instance.update = () => {
          if (effect.dirty) {
            effect.run();
          }
        };
        update.id = instance.uid;
        toggleRecurse(instance, true);
        update();
      };
      const updateComponentPreRender = (instance, nextVNode, optimized) => {
        nextVNode.component = instance;
        const prevProps = instance.vnode.props;
        instance.vnode = nextVNode;
        instance.next = null;
        updateProps(instance, nextVNode.props, prevProps, optimized);
        updateSlots(instance, nextVNode.children, optimized);
        pauseTracking();
        flushPreFlushCbs(instance);
        resetTracking();
      };
      const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
        const c1 = n1 && n1.children;
        const prevShapeFlag = n1 ? n1.shapeFlag : 0;
        const c2 = n2.children;
        const { patchFlag, shapeFlag } = n2;
        if (patchFlag > 0) {
          if (patchFlag & 128) {
            patchKeyedChildren(
              c1,
              c2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
            return;
          } else if (patchFlag & 256) {
            patchUnkeyedChildren(
              c1,
              c2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
            return;
          }
        }
        if (shapeFlag & 8) {
          if (prevShapeFlag & 16) {
            unmountChildren(c1, parentComponent, parentSuspense);
          }
          if (c2 !== c1) {
            hostSetElementText(container, c2);
          }
        } else {
          if (prevShapeFlag & 16) {
            if (shapeFlag & 16) {
              patchKeyedChildren(
                c1,
                c2,
                container,
                anchor,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized
              );
            } else {
              unmountChildren(c1, parentComponent, parentSuspense, true);
            }
          } else {
            if (prevShapeFlag & 8) {
              hostSetElementText(container, "");
            }
            if (shapeFlag & 16) {
              mountChildren(
                c2,
                container,
                anchor,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized
              );
            }
          }
        }
      };
      const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        c1 = c1 || EMPTY_ARR;
        c2 = c2 || EMPTY_ARR;
        const oldLength = c1.length;
        const newLength = c2.length;
        const commonLength = Math.min(oldLength, newLength);
        let i;
        for (i = 0; i < commonLength; i++) {
          const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          patch(
            c1[i],
            nextChild,
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
        if (oldLength > newLength) {
          unmountChildren(
            c1,
            parentComponent,
            parentSuspense,
            true,
            false,
            commonLength
          );
        } else {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            commonLength
          );
        }
      };
      const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        let i = 0;
        const l2 = c2.length;
        let e1 = c1.length - 1;
        let e2 = l2 - 1;
        while (i <= e1 && i <= e2) {
          const n1 = c1[i];
          const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          if (isSameVNodeType(n1, n2)) {
            patch(
              n1,
              n2,
              container,
              null,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else {
            break;
          }
          i++;
        }
        while (i <= e1 && i <= e2) {
          const n1 = c1[e1];
          const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
          if (isSameVNodeType(n1, n2)) {
            patch(
              n1,
              n2,
              container,
              null,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else {
            break;
          }
          e1--;
          e2--;
        }
        if (i > e1) {
          if (i <= e2) {
            const nextPos = e2 + 1;
            const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
            while (i <= e2) {
              patch(
                null,
                c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
                container,
                anchor,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized
              );
              i++;
            }
          }
        } else if (i > e2) {
          while (i <= e1) {
            unmount(c1[i], parentComponent, parentSuspense, true);
            i++;
          }
        } else {
          const s1 = i;
          const s2 = i;
          const keyToNewIndexMap = /* @__PURE__ */ new Map();
          for (i = s2; i <= e2; i++) {
            const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
            if (nextChild.key != null) {
              keyToNewIndexMap.set(nextChild.key, i);
            }
          }
          let j;
          let patched = 0;
          const toBePatched = e2 - s2 + 1;
          let moved = false;
          let maxNewIndexSoFar = 0;
          const newIndexToOldIndexMap = new Array(toBePatched);
          for (i = 0; i < toBePatched; i++)
            newIndexToOldIndexMap[i] = 0;
          for (i = s1; i <= e1; i++) {
            const prevChild = c1[i];
            if (patched >= toBePatched) {
              unmount(prevChild, parentComponent, parentSuspense, true);
              continue;
            }
            let newIndex;
            if (prevChild.key != null) {
              newIndex = keyToNewIndexMap.get(prevChild.key);
            } else {
              for (j = s2; j <= e2; j++) {
                if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                  newIndex = j;
                  break;
                }
              }
            }
            if (newIndex === void 0) {
              unmount(prevChild, parentComponent, parentSuspense, true);
            } else {
              newIndexToOldIndexMap[newIndex - s2] = i + 1;
              if (newIndex >= maxNewIndexSoFar) {
                maxNewIndexSoFar = newIndex;
              } else {
                moved = true;
              }
              patch(
                prevChild,
                c2[newIndex],
                container,
                null,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized
              );
              patched++;
            }
          }
          const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
          j = increasingNewIndexSequence.length - 1;
          for (i = toBePatched - 1; i >= 0; i--) {
            const nextIndex = s2 + i;
            const nextChild = c2[nextIndex];
            const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
            if (newIndexToOldIndexMap[i] === 0) {
              patch(
                null,
                nextChild,
                container,
                anchor,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized
              );
            } else if (moved) {
              if (j < 0 || i !== increasingNewIndexSequence[j]) {
                move(nextChild, container, anchor, 2);
              } else {
                j--;
              }
            }
          }
        }
      };
      const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
        const { el, type: type2, transition, children, shapeFlag } = vnode;
        if (shapeFlag & 6) {
          move(vnode.component.subTree, container, anchor, moveType);
          return;
        }
        if (shapeFlag & 128) {
          vnode.suspense.move(container, anchor, moveType);
          return;
        }
        if (shapeFlag & 64) {
          type2.move(vnode, container, anchor, internals);
          return;
        }
        if (type2 === Fragment) {
          hostInsert(el, container, anchor);
          for (let i = 0; i < children.length; i++) {
            move(children[i], container, anchor, moveType);
          }
          hostInsert(vnode.anchor, container, anchor);
          return;
        }
        if (type2 === Static) {
          moveStaticNode(vnode, container, anchor);
          return;
        }
        const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
        if (needTransition2) {
          if (moveType === 0) {
            transition.beforeEnter(el);
            hostInsert(el, container, anchor);
            queuePostRenderEffect(() => transition.enter(el), parentSuspense);
          } else {
            const { leave, delayLeave, afterLeave } = transition;
            const remove22 = () => hostInsert(el, container, anchor);
            const performLeave = () => {
              leave(el, () => {
                remove22();
                afterLeave && afterLeave();
              });
            };
            if (delayLeave) {
              delayLeave(el, remove22, performLeave);
            } else {
              performLeave();
            }
          }
        } else {
          hostInsert(el, container, anchor);
        }
      };
      const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
        const {
          type: type2,
          props,
          ref: ref2,
          children,
          dynamicChildren,
          shapeFlag,
          patchFlag,
          dirs
        } = vnode;
        if (ref2 != null) {
          setRef(ref2, null, parentSuspense, vnode, true);
        }
        if (shapeFlag & 256) {
          parentComponent.ctx.deactivate(vnode);
          return;
        }
        const shouldInvokeDirs = shapeFlag & 1 && dirs;
        const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
        let vnodeHook;
        if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
        if (shapeFlag & 6) {
          unmountComponent(vnode.component, parentSuspense, doRemove);
        } else {
          if (shapeFlag & 128) {
            vnode.suspense.unmount(parentSuspense, doRemove);
            return;
          }
          if (shouldInvokeDirs) {
            invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
          }
          if (shapeFlag & 64) {
            vnode.type.remove(
              vnode,
              parentComponent,
              parentSuspense,
              optimized,
              internals,
              doRemove
            );
          } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
          (type2 !== Fragment || patchFlag > 0 && patchFlag & 64)) {
            unmountChildren(
              dynamicChildren,
              parentComponent,
              parentSuspense,
              false,
              true
            );
          } else if (type2 === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
            unmountChildren(children, parentComponent, parentSuspense);
          }
          if (doRemove) {
            remove2(vnode);
          }
        }
        if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
          queuePostRenderEffect(() => {
            vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
            shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
          }, parentSuspense);
        }
      };
      const remove2 = (vnode) => {
        const { type: type2, el, anchor, transition } = vnode;
        if (type2 === Fragment) {
          {
            removeFragment(el, anchor);
          }
          return;
        }
        if (type2 === Static) {
          removeStaticNode(vnode);
          return;
        }
        const performRemove = () => {
          hostRemove(el);
          if (transition && !transition.persisted && transition.afterLeave) {
            transition.afterLeave();
          }
        };
        if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
          const { leave, delayLeave } = transition;
          const performLeave = () => leave(el, performRemove);
          if (delayLeave) {
            delayLeave(vnode.el, performRemove, performLeave);
          } else {
            performLeave();
          }
        } else {
          performRemove();
        }
      };
      const removeFragment = (cur, end) => {
        let next;
        while (cur !== end) {
          next = hostNextSibling(cur);
          hostRemove(cur);
          cur = next;
        }
        hostRemove(end);
      };
      const unmountComponent = (instance, parentSuspense, doRemove) => {
        const { bum, scope, update, subTree, um } = instance;
        if (bum) {
          invokeArrayFns(bum);
        }
        scope.stop();
        if (update) {
          update.active = false;
          unmount(subTree, instance, parentSuspense, doRemove);
        }
        if (um) {
          queuePostRenderEffect(um, parentSuspense);
        }
        queuePostRenderEffect(() => {
          instance.isUnmounted = true;
        }, parentSuspense);
        if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
          parentSuspense.deps--;
          if (parentSuspense.deps === 0) {
            parentSuspense.resolve();
          }
        }
      };
      const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
        for (let i = start; i < children.length; i++) {
          unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
        }
      };
      const getNextHostNode = (vnode) => {
        if (vnode.shapeFlag & 6) {
          return getNextHostNode(vnode.component.subTree);
        }
        if (vnode.shapeFlag & 128) {
          return vnode.suspense.next();
        }
        return hostNextSibling(vnode.anchor || vnode.el);
      };
      let isFlushing2 = false;
      const render2 = (vnode, container, namespace) => {
        if (vnode == null) {
          if (container._vnode) {
            unmount(container._vnode, null, null, true);
          }
        } else {
          patch(
            container._vnode || null,
            vnode,
            container,
            null,
            null,
            null,
            namespace
          );
        }
        if (!isFlushing2) {
          isFlushing2 = true;
          flushPreFlushCbs();
          flushPostFlushCbs();
          isFlushing2 = false;
        }
        container._vnode = vnode;
      };
      const internals = {
        p: patch,
        um: unmount,
        m: move,
        r: remove2,
        mt: mountComponent,
        mc: mountChildren,
        pc: patchChildren,
        pbc: patchBlockChildren,
        n: getNextHostNode,
        o: options
      };
      let hydrate;
      let hydrateNode;
      if (createHydrationFns) {
        [hydrate, hydrateNode] = createHydrationFns(
          internals
        );
      }
      return {
        render: render2,
        hydrate,
        createApp: createAppAPI(render2, hydrate)
      };
    }
    function resolveChildrenNamespace({ type: type2, props }, currentNamespace) {
      return currentNamespace === "svg" && type2 === "foreignObject" || currentNamespace === "mathml" && type2 === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
    }
    function toggleRecurse({ effect, update }, allowed) {
      effect.allowRecurse = update.allowRecurse = allowed;
    }
    function needTransition(parentSuspense, transition) {
      return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    }
    function traverseStaticChildren(n1, n2, shallow = false) {
      const ch1 = n1.children;
      const ch2 = n2.children;
      if (isArray$2(ch1) && isArray$2(ch2)) {
        for (let i = 0; i < ch1.length; i++) {
          const c1 = ch1[i];
          let c2 = ch2[i];
          if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
            if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
              c2 = ch2[i] = cloneIfMounted(ch2[i]);
              c2.el = c1.el;
            }
            if (!shallow)
              traverseStaticChildren(c1, c2);
          }
          if (c2.type === Text$1) {
            c2.el = c1.el;
          }
        }
      }
    }
    function getSequence(arr) {
      const p2 = arr.slice();
      const result = [0];
      let i, j, u, v, c2;
      const len = arr.length;
      for (i = 0; i < len; i++) {
        const arrI = arr[i];
        if (arrI !== 0) {
          j = result[result.length - 1];
          if (arr[j] < arrI) {
            p2[i] = j;
            result.push(i);
            continue;
          }
          u = 0;
          v = result.length - 1;
          while (u < v) {
            c2 = u + v >> 1;
            if (arr[result[c2]] < arrI) {
              u = c2 + 1;
            } else {
              v = c2;
            }
          }
          if (arrI < arr[result[u]]) {
            if (u > 0) {
              p2[i] = result[u - 1];
            }
            result[u] = i;
          }
        }
      }
      u = result.length;
      v = result[u - 1];
      while (u-- > 0) {
        result[u] = v;
        v = p2[v];
      }
      return result;
    }
    function locateNonHydratedAsyncRoot(instance) {
      const subComponent = instance.subTree.component;
      if (subComponent) {
        if (subComponent.asyncDep && !subComponent.asyncResolved) {
          return subComponent;
        } else {
          return locateNonHydratedAsyncRoot(subComponent);
        }
      }
    }
    const isTeleport = (type2) => type2.__isTeleport;
    const isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
    const isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
    const isTargetMathML = (target) => typeof MathMLElement === "function" && target instanceof MathMLElement;
    const resolveTarget = (props, select) => {
      const targetSelector = props && props.to;
      if (isString$1(targetSelector)) {
        if (!select) {
          return null;
        } else {
          const target = select(targetSelector);
          return target;
        }
      } else {
        return targetSelector;
      }
    };
    const TeleportImpl = {
      name: "Teleport",
      __isTeleport: true,
      process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals) {
        const {
          mc: mountChildren,
          pc: patchChildren,
          pbc: patchBlockChildren,
          o: { insert, querySelector, createText, createComment }
        } = internals;
        const disabled = isTeleportDisabled(n2.props);
        let { shapeFlag, children, dynamicChildren } = n2;
        if (n1 == null) {
          const placeholder = n2.el = createText("");
          const mainAnchor = n2.anchor = createText("");
          insert(placeholder, container, anchor);
          insert(mainAnchor, container, anchor);
          const target = n2.target = resolveTarget(n2.props, querySelector);
          const targetAnchor = n2.targetAnchor = createText("");
          if (target) {
            insert(targetAnchor, target);
            if (namespace === "svg" || isTargetSVG(target)) {
              namespace = "svg";
            } else if (namespace === "mathml" || isTargetMathML(target)) {
              namespace = "mathml";
            }
          }
          const mount = (container2, anchor2) => {
            if (shapeFlag & 16) {
              mountChildren(
                children,
                container2,
                anchor2,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized
              );
            }
          };
          if (disabled) {
            mount(container, mainAnchor);
          } else if (target) {
            mount(target, targetAnchor);
          }
        } else {
          n2.el = n1.el;
          const mainAnchor = n2.anchor = n1.anchor;
          const target = n2.target = n1.target;
          const targetAnchor = n2.targetAnchor = n1.targetAnchor;
          const wasDisabled = isTeleportDisabled(n1.props);
          const currentContainer = wasDisabled ? container : target;
          const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
          if (namespace === "svg" || isTargetSVG(target)) {
            namespace = "svg";
          } else if (namespace === "mathml" || isTargetMathML(target)) {
            namespace = "mathml";
          }
          if (dynamicChildren) {
            patchBlockChildren(
              n1.dynamicChildren,
              dynamicChildren,
              currentContainer,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds
            );
            traverseStaticChildren(n1, n2, true);
          } else if (!optimized) {
            patchChildren(
              n1,
              n2,
              currentContainer,
              currentAnchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              false
            );
          }
          if (disabled) {
            if (!wasDisabled) {
              moveTeleport(
                n2,
                container,
                mainAnchor,
                internals,
                1
              );
            } else {
              if (n2.props && n1.props && n2.props.to !== n1.props.to) {
                n2.props.to = n1.props.to;
              }
            }
          } else {
            if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
              const nextTarget = n2.target = resolveTarget(
                n2.props,
                querySelector
              );
              if (nextTarget) {
                moveTeleport(
                  n2,
                  nextTarget,
                  null,
                  internals,
                  0
                );
              }
            } else if (wasDisabled) {
              moveTeleport(
                n2,
                target,
                targetAnchor,
                internals,
                1
              );
            }
          }
        }
        updateCssVars(n2);
      },
      remove(vnode, parentComponent, parentSuspense, optimized, { um: unmount, o: { remove: hostRemove } }, doRemove) {
        const { shapeFlag, children, anchor, targetAnchor, target, props } = vnode;
        if (target) {
          hostRemove(targetAnchor);
        }
        doRemove && hostRemove(anchor);
        if (shapeFlag & 16) {
          const shouldRemove = doRemove || !isTeleportDisabled(props);
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            unmount(
              child,
              parentComponent,
              parentSuspense,
              shouldRemove,
              !!child.dynamicChildren
            );
          }
        }
      },
      move: moveTeleport,
      hydrate: hydrateTeleport
    };
    function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
      if (moveType === 0) {
        insert(vnode.targetAnchor, container, parentAnchor);
      }
      const { el, anchor, shapeFlag, children, props } = vnode;
      const isReorder = moveType === 2;
      if (isReorder) {
        insert(el, container, parentAnchor);
      }
      if (!isReorder || isTeleportDisabled(props)) {
        if (shapeFlag & 16) {
          for (let i = 0; i < children.length; i++) {
            move(
              children[i],
              container,
              parentAnchor,
              2
            );
          }
        }
      }
      if (isReorder) {
        insert(anchor, container, parentAnchor);
      }
    }
    function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, {
      o: { nextSibling, parentNode, querySelector }
    }, hydrateChildren) {
      const target = vnode.target = resolveTarget(
        vnode.props,
        querySelector
      );
      if (target) {
        const targetNode = target._lpa || target.firstChild;
        if (vnode.shapeFlag & 16) {
          if (isTeleportDisabled(vnode.props)) {
            vnode.anchor = hydrateChildren(
              nextSibling(node),
              vnode,
              parentNode(node),
              parentComponent,
              parentSuspense,
              slotScopeIds,
              optimized
            );
            vnode.targetAnchor = targetNode;
          } else {
            vnode.anchor = nextSibling(node);
            let targetAnchor = targetNode;
            while (targetAnchor) {
              targetAnchor = nextSibling(targetAnchor);
              if (targetAnchor && targetAnchor.nodeType === 8 && targetAnchor.data === "teleport anchor") {
                vnode.targetAnchor = targetAnchor;
                target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
                break;
              }
            }
            hydrateChildren(
              targetNode,
              vnode,
              target,
              parentComponent,
              parentSuspense,
              slotScopeIds,
              optimized
            );
          }
        }
        updateCssVars(vnode);
      }
      return vnode.anchor && nextSibling(vnode.anchor);
    }
    const Teleport = TeleportImpl;
    function updateCssVars(vnode) {
      const ctx = vnode.ctx;
      if (ctx && ctx.ut) {
        let node = vnode.children[0].el;
        while (node && node !== vnode.targetAnchor) {
          if (node.nodeType === 1)
            node.setAttribute("data-v-owner", ctx.uid);
          node = node.nextSibling;
        }
        ctx.ut();
      }
    }
    const Fragment = Symbol.for("v-fgt");
    const Text$1 = Symbol.for("v-txt");
    const Comment = Symbol.for("v-cmt");
    const Static = Symbol.for("v-stc");
    const blockStack = [];
    let currentBlock = null;
    function openBlock(disableTracking = false) {
      blockStack.push(currentBlock = disableTracking ? null : []);
    }
    function closeBlock() {
      blockStack.pop();
      currentBlock = blockStack[blockStack.length - 1] || null;
    }
    let isBlockTreeEnabled = 1;
    function setBlockTracking(value) {
      isBlockTreeEnabled += value;
    }
    function setupBlock(vnode) {
      vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
      closeBlock();
      if (isBlockTreeEnabled > 0 && currentBlock) {
        currentBlock.push(vnode);
      }
      return vnode;
    }
    function createElementBlock(type2, props, children, patchFlag, dynamicProps, shapeFlag) {
      return setupBlock(
        createBaseVNode(
          type2,
          props,
          children,
          patchFlag,
          dynamicProps,
          shapeFlag,
          true
        )
      );
    }
    function createBlock(type2, props, children, patchFlag, dynamicProps) {
      return setupBlock(
        createVNode(
          type2,
          props,
          children,
          patchFlag,
          dynamicProps,
          true
        )
      );
    }
    function isVNode(value) {
      return value ? value.__v_isVNode === true : false;
    }
    function isSameVNodeType(n1, n2) {
      return n1.type === n2.type && n1.key === n2.key;
    }
    const normalizeKey = ({ key: key2 }) => key2 != null ? key2 : null;
    const normalizeRef = ({
      ref: ref2,
      ref_key,
      ref_for
    }) => {
      if (typeof ref2 === "number") {
        ref2 = "" + ref2;
      }
      return ref2 != null ? isString$1(ref2) || isRef(ref2) || isFunction$1(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
    };
    function createBaseVNode(type2, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type2 === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
      const vnode = {
        __v_isVNode: true,
        __v_skip: true,
        type: type2,
        props,
        key: props && normalizeKey(props),
        ref: props && normalizeRef(props),
        scopeId: currentScopeId,
        slotScopeIds: null,
        children,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag,
        patchFlag,
        dynamicProps,
        dynamicChildren: null,
        appContext: null,
        ctx: currentRenderingInstance
      };
      if (needFullChildrenNormalization) {
        normalizeChildren(vnode, children);
        if (shapeFlag & 128) {
          type2.normalize(vnode);
        }
      } else if (children) {
        vnode.shapeFlag |= isString$1(children) ? 8 : 16;
      }
      if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
      !isBlockNode && // has current parent block
      currentBlock && // presence of a patch flag indicates this node needs patching on updates.
      // component nodes also should always be patched, because even if the
      // component doesn't need to update, it needs to persist the instance on to
      // the next vnode so that it can be properly unmounted later.
      (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
      // vnode should not be considered dynamic due to handler caching.
      vnode.patchFlag !== 32) {
        currentBlock.push(vnode);
      }
      return vnode;
    }
    const createVNode = _createVNode;
    function _createVNode(type2, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
      if (!type2 || type2 === NULL_DYNAMIC_COMPONENT) {
        type2 = Comment;
      }
      if (isVNode(type2)) {
        const cloned = cloneVNode(
          type2,
          props,
          true
          /* mergeRef: true */
        );
        if (children) {
          normalizeChildren(cloned, children);
        }
        if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
          if (cloned.shapeFlag & 6) {
            currentBlock[currentBlock.indexOf(type2)] = cloned;
          } else {
            currentBlock.push(cloned);
          }
        }
        cloned.patchFlag |= -2;
        return cloned;
      }
      if (isClassComponent(type2)) {
        type2 = type2.__vccOpts;
      }
      if (props) {
        props = guardReactiveProps(props);
        let { class: klass, style } = props;
        if (klass && !isString$1(klass)) {
          props.class = normalizeClass(klass);
        }
        if (isObject$1(style)) {
          if (isProxy(style) && !isArray$2(style)) {
            style = extend({}, style);
          }
          props.style = normalizeStyle(style);
        }
      }
      const shapeFlag = isString$1(type2) ? 1 : isSuspense(type2) ? 128 : isTeleport(type2) ? 64 : isObject$1(type2) ? 4 : isFunction$1(type2) ? 2 : 0;
      return createBaseVNode(
        type2,
        props,
        children,
        patchFlag,
        dynamicProps,
        shapeFlag,
        isBlockNode,
        true
      );
    }
    function guardReactiveProps(props) {
      if (!props)
        return null;
      return isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
    }
    function cloneVNode(vnode, extraProps, mergeRef = false) {
      const { props, ref: ref2, patchFlag, children } = vnode;
      const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
      const cloned = {
        __v_isVNode: true,
        __v_skip: true,
        type: vnode.type,
        props: mergedProps,
        key: mergedProps && normalizeKey(mergedProps),
        ref: extraProps && extraProps.ref ? (
          // #2078 in the case of <component :is="vnode" ref="extra"/>
          // if the vnode itself already has a ref, cloneVNode will need to merge
          // the refs so the single vnode can be set on multiple refs
          mergeRef && ref2 ? isArray$2(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps)
        ) : ref2,
        scopeId: vnode.scopeId,
        slotScopeIds: vnode.slotScopeIds,
        children,
        target: vnode.target,
        targetAnchor: vnode.targetAnchor,
        staticCount: vnode.staticCount,
        shapeFlag: vnode.shapeFlag,
        // if the vnode is cloned with extra props, we can no longer assume its
        // existing patch flag to be reliable and need to add the FULL_PROPS flag.
        // note: preserve flag for fragments since they use the flag for children
        // fast paths only.
        patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
        dynamicProps: vnode.dynamicProps,
        dynamicChildren: vnode.dynamicChildren,
        appContext: vnode.appContext,
        dirs: vnode.dirs,
        transition: vnode.transition,
        // These should technically only be non-null on mounted VNodes. However,
        // they *should* be copied for kept-alive vnodes. So we just always copy
        // them since them being non-null during a mount doesn't affect the logic as
        // they will simply be overwritten.
        component: vnode.component,
        suspense: vnode.suspense,
        ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
        ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
        el: vnode.el,
        anchor: vnode.anchor,
        ctx: vnode.ctx,
        ce: vnode.ce
      };
      return cloned;
    }
    function createTextVNode(text = " ", flag = 0) {
      return createVNode(Text$1, null, text, flag);
    }
    function createCommentVNode(text = "", asBlock = false) {
      return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
    }
    function normalizeVNode(child) {
      if (child == null || typeof child === "boolean") {
        return createVNode(Comment);
      } else if (isArray$2(child)) {
        return createVNode(
          Fragment,
          null,
          // #3666, avoid reference pollution when reusing vnode
          child.slice()
        );
      } else if (typeof child === "object") {
        return cloneIfMounted(child);
      } else {
        return createVNode(Text$1, null, String(child));
      }
    }
    function cloneIfMounted(child) {
      return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
    }
    function normalizeChildren(vnode, children) {
      let type2 = 0;
      const { shapeFlag } = vnode;
      if (children == null) {
        children = null;
      } else if (isArray$2(children)) {
        type2 = 16;
      } else if (typeof children === "object") {
        if (shapeFlag & (1 | 64)) {
          const slot = children.default;
          if (slot) {
            slot._c && (slot._d = false);
            normalizeChildren(vnode, slot());
            slot._c && (slot._d = true);
          }
          return;
        } else {
          type2 = 32;
          const slotFlag = children._;
          if (!slotFlag && !isInternalObject(children)) {
            children._ctx = currentRenderingInstance;
          } else if (slotFlag === 3 && currentRenderingInstance) {
            if (currentRenderingInstance.slots._ === 1) {
              children._ = 1;
            } else {
              children._ = 2;
              vnode.patchFlag |= 1024;
            }
          }
        }
      } else if (isFunction$1(children)) {
        children = { default: children, _ctx: currentRenderingInstance };
        type2 = 32;
      } else {
        children = String(children);
        if (shapeFlag & 64) {
          type2 = 16;
          children = [createTextVNode(children)];
        } else {
          type2 = 8;
        }
      }
      vnode.children = children;
      vnode.shapeFlag |= type2;
    }
    function mergeProps(...args) {
      const ret = {};
      for (let i = 0; i < args.length; i++) {
        const toMerge = args[i];
        for (const key2 in toMerge) {
          if (key2 === "class") {
            if (ret.class !== toMerge.class) {
              ret.class = normalizeClass([ret.class, toMerge.class]);
            }
          } else if (key2 === "style") {
            ret.style = normalizeStyle([ret.style, toMerge.style]);
          } else if (isOn(key2)) {
            const existing = ret[key2];
            const incoming = toMerge[key2];
            if (incoming && existing !== incoming && !(isArray$2(existing) && existing.includes(incoming))) {
              ret[key2] = existing ? [].concat(existing, incoming) : incoming;
            }
          } else if (key2 !== "") {
            ret[key2] = toMerge[key2];
          }
        }
      }
      return ret;
    }
    function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
      callWithAsyncErrorHandling(hook, instance, 7, [
        vnode,
        prevVNode
      ]);
    }
    const emptyAppContext = createAppContext();
    let uid = 0;
    function createComponentInstance(vnode, parent, suspense) {
      const type2 = vnode.type;
      const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
      const instance = {
        uid: uid++,
        vnode,
        type: type2,
        parent,
        appContext,
        root: null,
        // to be immediately set
        next: null,
        subTree: null,
        // will be set synchronously right after creation
        effect: null,
        update: null,
        // will be set synchronously right after creation
        scope: new EffectScope(
          true
          /* detached */
        ),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: parent ? parent.provides : Object.create(appContext.provides),
        accessCache: null,
        renderCache: [],
        // local resolved assets
        components: null,
        directives: null,
        // resolved props and emits options
        propsOptions: normalizePropsOptions(type2, appContext),
        emitsOptions: normalizeEmitsOptions(type2, appContext),
        // emit
        emit: null,
        // to be set immediately
        emitted: null,
        // props default value
        propsDefaults: EMPTY_OBJ,
        // inheritAttrs
        inheritAttrs: type2.inheritAttrs,
        // state
        ctx: EMPTY_OBJ,
        data: EMPTY_OBJ,
        props: EMPTY_OBJ,
        attrs: EMPTY_OBJ,
        slots: EMPTY_OBJ,
        refs: EMPTY_OBJ,
        setupState: EMPTY_OBJ,
        setupContext: null,
        attrsProxy: null,
        slotsProxy: null,
        // suspense related
        suspense,
        suspenseId: suspense ? suspense.pendingId : 0,
        asyncDep: null,
        asyncResolved: false,
        // lifecycle hooks
        // not using enums here because it results in computed properties
        isMounted: false,
        isUnmounted: false,
        isDeactivated: false,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
      };
      {
        instance.ctx = { _: instance };
      }
      instance.root = parent ? parent.root : instance;
      instance.emit = emit.bind(null, instance);
      if (vnode.ce) {
        vnode.ce(instance);
      }
      return instance;
    }
    let currentInstance = null;
    const getCurrentInstance = () => currentInstance || currentRenderingInstance;
    let internalSetCurrentInstance;
    let setInSSRSetupState;
    {
      const g = getGlobalThis();
      const registerGlobalSetter = (key2, setter) => {
        let setters;
        if (!(setters = g[key2]))
          setters = g[key2] = [];
        setters.push(setter);
        return (v) => {
          if (setters.length > 1)
            setters.forEach((set2) => set2(v));
          else
            setters[0](v);
        };
      };
      internalSetCurrentInstance = registerGlobalSetter(
        `__VUE_INSTANCE_SETTERS__`,
        (v) => currentInstance = v
      );
      setInSSRSetupState = registerGlobalSetter(
        `__VUE_SSR_SETTERS__`,
        (v) => isInSSRComponentSetup = v
      );
    }
    const setCurrentInstance = (instance) => {
      const prev = currentInstance;
      internalSetCurrentInstance(instance);
      instance.scope.on();
      return () => {
        instance.scope.off();
        internalSetCurrentInstance(prev);
      };
    };
    const unsetCurrentInstance = () => {
      currentInstance && currentInstance.scope.off();
      internalSetCurrentInstance(null);
    };
    function isStatefulComponent(instance) {
      return instance.vnode.shapeFlag & 4;
    }
    let isInSSRComponentSetup = false;
    function setupComponent(instance, isSSR = false) {
      isSSR && setInSSRSetupState(isSSR);
      const { props, children } = instance.vnode;
      const isStateful = isStatefulComponent(instance);
      initProps(instance, props, isStateful, isSSR);
      initSlots(instance, children);
      const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
      isSSR && setInSSRSetupState(false);
      return setupResult;
    }
    function setupStatefulComponent(instance, isSSR) {
      const Component = instance.type;
      instance.accessCache = /* @__PURE__ */ Object.create(null);
      instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
      const { setup } = Component;
      if (setup) {
        const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
        const reset = setCurrentInstance(instance);
        pauseTracking();
        const setupResult = callWithErrorHandling(
          setup,
          instance,
          0,
          [
            instance.props,
            setupContext
          ]
        );
        resetTracking();
        reset();
        if (isPromise(setupResult)) {
          setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
          if (isSSR) {
            return setupResult.then((resolvedResult) => {
              handleSetupResult(instance, resolvedResult, isSSR);
            }).catch((e) => {
              handleError(e, instance, 0);
            });
          } else {
            instance.asyncDep = setupResult;
          }
        } else {
          handleSetupResult(instance, setupResult, isSSR);
        }
      } else {
        finishComponentSetup(instance, isSSR);
      }
    }
    function handleSetupResult(instance, setupResult, isSSR) {
      if (isFunction$1(setupResult)) {
        if (instance.type.__ssrInlineRender) {
          instance.ssrRender = setupResult;
        } else {
          instance.render = setupResult;
        }
      } else if (isObject$1(setupResult)) {
        instance.setupState = proxyRefs(setupResult);
      } else
        ;
      finishComponentSetup(instance, isSSR);
    }
    let compile;
    function finishComponentSetup(instance, isSSR, skipOptions) {
      const Component = instance.type;
      if (!instance.render) {
        if (!isSSR && compile && !Component.render) {
          const template = Component.template || resolveMergedOptions(instance).template;
          if (template) {
            const { isCustomElement, compilerOptions } = instance.appContext.config;
            const { delimiters, compilerOptions: componentCompilerOptions } = Component;
            const finalCompilerOptions = extend(
              extend(
                {
                  isCustomElement,
                  delimiters
                },
                compilerOptions
              ),
              componentCompilerOptions
            );
            Component.render = compile(template, finalCompilerOptions);
          }
        }
        instance.render = Component.render || NOOP;
      }
      {
        const reset = setCurrentInstance(instance);
        pauseTracking();
        try {
          applyOptions(instance);
        } finally {
          resetTracking();
          reset();
        }
      }
    }
    const attrsProxyHandlers = {
      get(target, key2) {
        track(target, "get", "");
        return target[key2];
      }
    };
    function createSetupContext(instance) {
      const expose = (exposed) => {
        instance.exposed = exposed || {};
      };
      {
        return {
          attrs: new Proxy(instance.attrs, attrsProxyHandlers),
          slots: instance.slots,
          emit: instance.emit,
          expose
        };
      }
    }
    function getExposeProxy(instance) {
      if (instance.exposed) {
        return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
          get(target, key2) {
            if (key2 in target) {
              return target[key2];
            } else if (key2 in publicPropertiesMap) {
              return publicPropertiesMap[key2](instance);
            }
          },
          has(target, key2) {
            return key2 in target || key2 in publicPropertiesMap;
          }
        }));
      }
    }
    const classifyRE = /(?:^|[-_])(\w)/g;
    const classify = (str) => str.replace(classifyRE, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
    function getComponentName(Component, includeInferred = true) {
      return isFunction$1(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
    }
    function formatComponentName(instance, Component, isRoot = false) {
      let name = getComponentName(Component);
      if (!name && Component.__file) {
        const match = Component.__file.match(/([^/\\]+)\.\w+$/);
        if (match) {
          name = match[1];
        }
      }
      if (!name && instance && instance.parent) {
        const inferFromRegistry = (registry) => {
          for (const key2 in registry) {
            if (registry[key2] === Component) {
              return key2;
            }
          }
        };
        name = inferFromRegistry(
          instance.components || instance.parent.type.components
        ) || inferFromRegistry(instance.appContext.components);
      }
      return name ? classify(name) : isRoot ? `App` : `Anonymous`;
    }
    function isClassComponent(value) {
      return isFunction$1(value) && "__vccOpts" in value;
    }
    const computed = (getterOrOptions, debugOptions) => {
      const c2 = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
      return c2;
    };
    function h(type2, propsOrChildren, children) {
      const l = arguments.length;
      if (l === 2) {
        if (isObject$1(propsOrChildren) && !isArray$2(propsOrChildren)) {
          if (isVNode(propsOrChildren)) {
            return createVNode(type2, null, [propsOrChildren]);
          }
          return createVNode(type2, propsOrChildren);
        } else {
          return createVNode(type2, null, propsOrChildren);
        }
      } else {
        if (l > 3) {
          children = Array.prototype.slice.call(arguments, 2);
        } else if (l === 3 && isVNode(children)) {
          children = [children];
        }
        return createVNode(type2, propsOrChildren, children);
      }
    }
    const version = "3.4.23";
    const warn = NOOP;
    /**
    * @vue/runtime-dom v3.4.23
    * (c) 2018-present Yuxi (Evan) You and Vue contributors
    * @license MIT
    **/
    const svgNS = "http://www.w3.org/2000/svg";
    const mathmlNS = "http://www.w3.org/1998/Math/MathML";
    const doc = typeof document !== "undefined" ? document : null;
    const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
    const nodeOps = {
      insert: (child, parent, anchor) => {
        parent.insertBefore(child, anchor || null);
      },
      remove: (child) => {
        const parent = child.parentNode;
        if (parent) {
          parent.removeChild(child);
        }
      },
      createElement: (tag, namespace, is, props) => {
        const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : doc.createElement(tag, is ? { is } : void 0);
        if (tag === "select" && props && props.multiple != null) {
          el.setAttribute("multiple", props.multiple);
        }
        return el;
      },
      createText: (text) => doc.createTextNode(text),
      createComment: (text) => doc.createComment(text),
      setText: (node, text) => {
        node.nodeValue = text;
      },
      setElementText: (el, text) => {
        el.textContent = text;
      },
      parentNode: (node) => node.parentNode,
      nextSibling: (node) => node.nextSibling,
      querySelector: (selector) => doc.querySelector(selector),
      setScopeId(el, id) {
        el.setAttribute(id, "");
      },
      // __UNSAFE__
      // Reason: innerHTML.
      // Static content here can only come from compiled templates.
      // As long as the user only uses trusted templates, this is safe.
      insertStaticContent(content, parent, anchor, namespace, start, end) {
        const before = anchor ? anchor.previousSibling : parent.lastChild;
        if (start && (start === end || start.nextSibling)) {
          while (true) {
            parent.insertBefore(start.cloneNode(true), anchor);
            if (start === end || !(start = start.nextSibling))
              break;
          }
        } else {
          templateContainer.innerHTML = namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content;
          const template = templateContainer.content;
          if (namespace === "svg" || namespace === "mathml") {
            const wrapper = template.firstChild;
            while (wrapper.firstChild) {
              template.appendChild(wrapper.firstChild);
            }
            template.removeChild(wrapper);
          }
          parent.insertBefore(template, anchor);
        }
        return [
          // first
          before ? before.nextSibling : parent.firstChild,
          // last
          anchor ? anchor.previousSibling : parent.lastChild
        ];
      }
    };
    const TRANSITION = "transition";
    const ANIMATION = "animation";
    const vtcKey = Symbol("_vtc");
    const Transition = (props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots);
    Transition.displayName = "Transition";
    const DOMTransitionPropsValidators = {
      name: String,
      type: String,
      css: {
        type: Boolean,
        default: true
      },
      duration: [String, Number, Object],
      enterFromClass: String,
      enterActiveClass: String,
      enterToClass: String,
      appearFromClass: String,
      appearActiveClass: String,
      appearToClass: String,
      leaveFromClass: String,
      leaveActiveClass: String,
      leaveToClass: String
    };
    const TransitionPropsValidators = Transition.props = /* @__PURE__ */ extend(
      {},
      BaseTransitionPropsValidators,
      DOMTransitionPropsValidators
    );
    const callHook = (hook, args = []) => {
      if (isArray$2(hook)) {
        hook.forEach((h2) => h2(...args));
      } else if (hook) {
        hook(...args);
      }
    };
    const hasExplicitCallback = (hook) => {
      return hook ? isArray$2(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
    };
    function resolveTransitionProps(rawProps) {
      const baseProps = {};
      for (const key2 in rawProps) {
        if (!(key2 in DOMTransitionPropsValidators)) {
          baseProps[key2] = rawProps[key2];
        }
      }
      if (rawProps.css === false) {
        return baseProps;
      }
      const {
        name = "v",
        type: type2,
        duration,
        enterFromClass = `${name}-enter-from`,
        enterActiveClass = `${name}-enter-active`,
        enterToClass = `${name}-enter-to`,
        appearFromClass = enterFromClass,
        appearActiveClass = enterActiveClass,
        appearToClass = enterToClass,
        leaveFromClass = `${name}-leave-from`,
        leaveActiveClass = `${name}-leave-active`,
        leaveToClass = `${name}-leave-to`
      } = rawProps;
      const durations = normalizeDuration(duration);
      const enterDuration = durations && durations[0];
      const leaveDuration = durations && durations[1];
      const {
        onBeforeEnter,
        onEnter,
        onEnterCancelled,
        onLeave,
        onLeaveCancelled,
        onBeforeAppear = onBeforeEnter,
        onAppear = onEnter,
        onAppearCancelled = onEnterCancelled
      } = baseProps;
      const finishEnter = (el, isAppear, done) => {
        removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
        removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
        done && done();
      };
      const finishLeave = (el, done) => {
        el._isLeaving = false;
        removeTransitionClass(el, leaveFromClass);
        removeTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveActiveClass);
        done && done();
      };
      const makeEnterHook = (isAppear) => {
        return (el, done) => {
          const hook = isAppear ? onAppear : onEnter;
          const resolve2 = () => finishEnter(el, isAppear, done);
          callHook(hook, [el, resolve2]);
          nextFrame(() => {
            removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
            addTransitionClass(el, isAppear ? appearToClass : enterToClass);
            if (!hasExplicitCallback(hook)) {
              whenTransitionEnds(el, type2, enterDuration, resolve2);
            }
          });
        };
      };
      return extend(baseProps, {
        onBeforeEnter(el) {
          callHook(onBeforeEnter, [el]);
          addTransitionClass(el, enterFromClass);
          addTransitionClass(el, enterActiveClass);
        },
        onBeforeAppear(el) {
          callHook(onBeforeAppear, [el]);
          addTransitionClass(el, appearFromClass);
          addTransitionClass(el, appearActiveClass);
        },
        onEnter: makeEnterHook(false),
        onAppear: makeEnterHook(true),
        onLeave(el, done) {
          el._isLeaving = true;
          const resolve2 = () => finishLeave(el, done);
          addTransitionClass(el, leaveFromClass);
          forceReflow();
          addTransitionClass(el, leaveActiveClass);
          nextFrame(() => {
            if (!el._isLeaving) {
              return;
            }
            removeTransitionClass(el, leaveFromClass);
            addTransitionClass(el, leaveToClass);
            if (!hasExplicitCallback(onLeave)) {
              whenTransitionEnds(el, type2, leaveDuration, resolve2);
            }
          });
          callHook(onLeave, [el, resolve2]);
        },
        onEnterCancelled(el) {
          finishEnter(el, false);
          callHook(onEnterCancelled, [el]);
        },
        onAppearCancelled(el) {
          finishEnter(el, true);
          callHook(onAppearCancelled, [el]);
        },
        onLeaveCancelled(el) {
          finishLeave(el);
          callHook(onLeaveCancelled, [el]);
        }
      });
    }
    function normalizeDuration(duration) {
      if (duration == null) {
        return null;
      } else if (isObject$1(duration)) {
        return [NumberOf(duration.enter), NumberOf(duration.leave)];
      } else {
        const n = NumberOf(duration);
        return [n, n];
      }
    }
    function NumberOf(val) {
      const res = toNumber$1(val);
      return res;
    }
    function addTransitionClass(el, cls) {
      cls.split(/\s+/).forEach((c2) => c2 && el.classList.add(c2));
      (el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set())).add(cls);
    }
    function removeTransitionClass(el, cls) {
      cls.split(/\s+/).forEach((c2) => c2 && el.classList.remove(c2));
      const _vtc = el[vtcKey];
      if (_vtc) {
        _vtc.delete(cls);
        if (!_vtc.size) {
          el[vtcKey] = void 0;
        }
      }
    }
    function nextFrame(cb) {
      requestAnimationFrame(() => {
        requestAnimationFrame(cb);
      });
    }
    let endId = 0;
    function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
      const id = el._endId = ++endId;
      const resolveIfNotStale = () => {
        if (id === el._endId) {
          resolve2();
        }
      };
      if (explicitTimeout) {
        return setTimeout(resolveIfNotStale, explicitTimeout);
      }
      const { type: type2, timeout, propCount } = getTransitionInfo(el, expectedType);
      if (!type2) {
        return resolve2();
      }
      const endEvent = type2 + "end";
      let ended = 0;
      const end = () => {
        el.removeEventListener(endEvent, onEnd);
        resolveIfNotStale();
      };
      const onEnd = (e) => {
        if (e.target === el && ++ended >= propCount) {
          end();
        }
      };
      setTimeout(() => {
        if (ended < propCount) {
          end();
        }
      }, timeout + 1);
      el.addEventListener(endEvent, onEnd);
    }
    function getTransitionInfo(el, expectedType) {
      const styles = window.getComputedStyle(el);
      const getStyleProperties = (key2) => (styles[key2] || "").split(", ");
      const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
      const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
      const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
      const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
      const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
      const animationTimeout = getTimeout(animationDelays, animationDurations);
      let type2 = null;
      let timeout = 0;
      let propCount = 0;
      if (expectedType === TRANSITION) {
        if (transitionTimeout > 0) {
          type2 = TRANSITION;
          timeout = transitionTimeout;
          propCount = transitionDurations.length;
        }
      } else if (expectedType === ANIMATION) {
        if (animationTimeout > 0) {
          type2 = ANIMATION;
          timeout = animationTimeout;
          propCount = animationDurations.length;
        }
      } else {
        timeout = Math.max(transitionTimeout, animationTimeout);
        type2 = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
        propCount = type2 ? type2 === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
      }
      const hasTransform = type2 === TRANSITION && /\b(transform|all)(,|$)/.test(
        getStyleProperties(`${TRANSITION}Property`).toString()
      );
      return {
        type: type2,
        timeout,
        propCount,
        hasTransform
      };
    }
    function getTimeout(delays, durations) {
      while (delays.length < durations.length) {
        delays = delays.concat(delays);
      }
      return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
    }
    function toMs(s) {
      if (s === "auto")
        return 0;
      return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
    }
    function forceReflow() {
      return document.body.offsetHeight;
    }
    function patchClass(el, value, isSVG) {
      const transitionClasses = el[vtcKey];
      if (transitionClasses) {
        value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
      }
      if (value == null) {
        el.removeAttribute("class");
      } else if (isSVG) {
        el.setAttribute("class", value);
      } else {
        el.className = value;
      }
    }
    const vShowOriginalDisplay = Symbol("_vod");
    const vShowHidden = Symbol("_vsh");
    const vShow = {
      beforeMount(el, { value }, { transition }) {
        el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
        if (transition && value) {
          transition.beforeEnter(el);
        } else {
          setDisplay(el, value);
        }
      },
      mounted(el, { value }, { transition }) {
        if (transition && value) {
          transition.enter(el);
        }
      },
      updated(el, { value, oldValue }, { transition }) {
        if (!value === !oldValue)
          return;
        if (transition) {
          if (value) {
            transition.beforeEnter(el);
            setDisplay(el, true);
            transition.enter(el);
          } else {
            transition.leave(el, () => {
              setDisplay(el, false);
            });
          }
        } else {
          setDisplay(el, value);
        }
      },
      beforeUnmount(el, { value }) {
        setDisplay(el, value);
      }
    };
    function setDisplay(el, value) {
      el.style.display = value ? el[vShowOriginalDisplay] : "none";
      el[vShowHidden] = !value;
    }
    const CSS_VAR_TEXT = Symbol("");
    const displayRE = /(^|;)\s*display\s*:/;
    function patchStyle(el, prev, next) {
      const style = el.style;
      const isCssString = isString$1(next);
      let hasControlledDisplay = false;
      if (next && !isCssString) {
        if (prev) {
          if (!isString$1(prev)) {
            for (const key2 in prev) {
              if (next[key2] == null) {
                setStyle(style, key2, "");
              }
            }
          } else {
            for (const prevStyle of prev.split(";")) {
              const key2 = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
              if (next[key2] == null) {
                setStyle(style, key2, "");
              }
            }
          }
        }
        for (const key2 in next) {
          if (key2 === "display") {
            hasControlledDisplay = true;
          }
          setStyle(style, key2, next[key2]);
        }
      } else {
        if (isCssString) {
          if (prev !== next) {
            const cssVarText = style[CSS_VAR_TEXT];
            if (cssVarText) {
              next += ";" + cssVarText;
            }
            style.cssText = next;
            hasControlledDisplay = displayRE.test(next);
          }
        } else if (prev) {
          el.removeAttribute("style");
        }
      }
      if (vShowOriginalDisplay in el) {
        el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
        if (el[vShowHidden]) {
          style.display = "none";
        }
      }
    }
    const importantRE = /\s*!important$/;
    function setStyle(style, name, val) {
      if (isArray$2(val)) {
        val.forEach((v) => setStyle(style, name, v));
      } else {
        if (val == null)
          val = "";
        if (name.startsWith("--")) {
          style.setProperty(name, val);
        } else {
          const prefixed = autoPrefix(style, name);
          if (importantRE.test(val)) {
            style.setProperty(
              hyphenate(prefixed),
              val.replace(importantRE, ""),
              "important"
            );
          } else {
            style[prefixed] = val;
          }
        }
      }
    }
    const prefixes = ["Webkit", "Moz", "ms"];
    const prefixCache = {};
    function autoPrefix(style, rawName) {
      const cached = prefixCache[rawName];
      if (cached) {
        return cached;
      }
      let name = camelize(rawName);
      if (name !== "filter" && name in style) {
        return prefixCache[rawName] = name;
      }
      name = capitalize(name);
      for (let i = 0; i < prefixes.length; i++) {
        const prefixed = prefixes[i] + name;
        if (prefixed in style) {
          return prefixCache[rawName] = prefixed;
        }
      }
      return rawName;
    }
    const xlinkNS = "http://www.w3.org/1999/xlink";
    function patchAttr(el, key2, value, isSVG, instance) {
      if (isSVG && key2.startsWith("xlink:")) {
        if (value == null) {
          el.removeAttributeNS(xlinkNS, key2.slice(6, key2.length));
        } else {
          el.setAttributeNS(xlinkNS, key2, value);
        }
      } else {
        const isBoolean2 = isSpecialBooleanAttr(key2);
        if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
          el.removeAttribute(key2);
        } else {
          el.setAttribute(key2, isBoolean2 ? "" : value);
        }
      }
    }
    function patchDOMProp(el, key2, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
      if (key2 === "innerHTML" || key2 === "textContent") {
        if (prevChildren) {
          unmountChildren(prevChildren, parentComponent, parentSuspense);
        }
        el[key2] = value == null ? "" : value;
        return;
      }
      const tag = el.tagName;
      if (key2 === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
      !tag.includes("-")) {
        const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
        const newValue = value == null ? "" : value;
        if (oldValue !== newValue || !("_value" in el)) {
          el.value = newValue;
        }
        if (value == null) {
          el.removeAttribute(key2);
        }
        el._value = value;
        return;
      }
      let needRemove = false;
      if (value === "" || value == null) {
        const type2 = typeof el[key2];
        if (type2 === "boolean") {
          value = includeBooleanAttr(value);
        } else if (value == null && type2 === "string") {
          value = "";
          needRemove = true;
        } else if (type2 === "number") {
          value = 0;
          needRemove = true;
        }
      }
      try {
        el[key2] = value;
      } catch (e) {
      }
      needRemove && el.removeAttribute(key2);
    }
    function addEventListener(el, event, handler, options) {
      el.addEventListener(event, handler, options);
    }
    function removeEventListener(el, event, handler, options) {
      el.removeEventListener(event, handler, options);
    }
    const veiKey = Symbol("_vei");
    function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
      const invokers = el[veiKey] || (el[veiKey] = {});
      const existingInvoker = invokers[rawName];
      if (nextValue && existingInvoker) {
        existingInvoker.value = nextValue;
      } else {
        const [name, options] = parseName(rawName);
        if (nextValue) {
          const invoker = invokers[rawName] = createInvoker(
            nextValue,
            instance
          );
          addEventListener(el, name, invoker, options);
        } else if (existingInvoker) {
          removeEventListener(el, name, existingInvoker, options);
          invokers[rawName] = void 0;
        }
      }
    }
    const optionsModifierRE = /(?:Once|Passive|Capture)$/;
    function parseName(name) {
      let options;
      if (optionsModifierRE.test(name)) {
        options = {};
        let m;
        while (m = name.match(optionsModifierRE)) {
          name = name.slice(0, name.length - m[0].length);
          options[m[0].toLowerCase()] = true;
        }
      }
      const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
      return [event, options];
    }
    let cachedNow = 0;
    const p = /* @__PURE__ */ Promise.resolve();
    const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
    function createInvoker(initialValue, instance) {
      const invoker = (e) => {
        if (!e._vts) {
          e._vts = Date.now();
        } else if (e._vts <= invoker.attached) {
          return;
        }
        callWithAsyncErrorHandling(
          patchStopImmediatePropagation(e, invoker.value),
          instance,
          5,
          [e]
        );
      };
      invoker.value = initialValue;
      invoker.attached = getNow();
      return invoker;
    }
    function patchStopImmediatePropagation(e, value) {
      if (isArray$2(value)) {
        const originalStop = e.stopImmediatePropagation;
        e.stopImmediatePropagation = () => {
          originalStop.call(e);
          e._stopped = true;
        };
        return value.map(
          (fn2) => (e2) => !e2._stopped && fn2 && fn2(e2)
        );
      } else {
        return value;
      }
    }
    const isNativeOn = (key2) => key2.charCodeAt(0) === 111 && key2.charCodeAt(1) === 110 && // lowercase letter
    key2.charCodeAt(2) > 96 && key2.charCodeAt(2) < 123;
    const patchProp = (el, key2, prevValue, nextValue, namespace, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
      const isSVG = namespace === "svg";
      if (key2 === "class") {
        patchClass(el, nextValue, isSVG);
      } else if (key2 === "style") {
        patchStyle(el, prevValue, nextValue);
      } else if (isOn(key2)) {
        if (!isModelListener(key2)) {
          patchEvent(el, key2, prevValue, nextValue, parentComponent);
        }
      } else if (key2[0] === "." ? (key2 = key2.slice(1), true) : key2[0] === "^" ? (key2 = key2.slice(1), false) : shouldSetAsProp(el, key2, nextValue, isSVG)) {
        patchDOMProp(
          el,
          key2,
          nextValue,
          prevChildren,
          parentComponent,
          parentSuspense,
          unmountChildren
        );
      } else {
        if (key2 === "true-value") {
          el._trueValue = nextValue;
        } else if (key2 === "false-value") {
          el._falseValue = nextValue;
        }
        patchAttr(el, key2, nextValue, isSVG);
      }
    };
    function shouldSetAsProp(el, key2, value, isSVG) {
      if (isSVG) {
        if (key2 === "innerHTML" || key2 === "textContent") {
          return true;
        }
        if (key2 in el && isNativeOn(key2) && isFunction$1(value)) {
          return true;
        }
        return false;
      }
      if (key2 === "spellcheck" || key2 === "draggable" || key2 === "translate") {
        return false;
      }
      if (key2 === "form") {
        return false;
      }
      if (key2 === "list" && el.tagName === "INPUT") {
        return false;
      }
      if (key2 === "type" && el.tagName === "TEXTAREA") {
        return false;
      }
      if (key2 === "width" || key2 === "height") {
        const tag = el.tagName;
        if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
          return false;
        }
      }
      if (isNativeOn(key2) && isString$1(value)) {
        return false;
      }
      return key2 in el;
    }
    const positionMap = /* @__PURE__ */ new WeakMap();
    const newPositionMap = /* @__PURE__ */ new WeakMap();
    const moveCbKey = Symbol("_moveCb");
    const enterCbKey = Symbol("_enterCb");
    const TransitionGroupImpl = {
      name: "TransitionGroup",
      props: /* @__PURE__ */ extend({}, TransitionPropsValidators, {
        tag: String,
        moveClass: String
      }),
      setup(props, { slots }) {
        const instance = getCurrentInstance();
        const state = useTransitionState();
        let prevChildren;
        let children;
        onUpdated(() => {
          if (!prevChildren.length) {
            return;
          }
          const moveClass = props.moveClass || `${props.name || "v"}-move`;
          if (!hasCSSTransform(
            prevChildren[0].el,
            instance.vnode.el,
            moveClass
          )) {
            return;
          }
          prevChildren.forEach(callPendingCbs);
          prevChildren.forEach(recordPosition);
          const movedChildren = prevChildren.filter(applyTranslation);
          forceReflow();
          movedChildren.forEach((c2) => {
            const el = c2.el;
            const style = el.style;
            addTransitionClass(el, moveClass);
            style.transform = style.webkitTransform = style.transitionDuration = "";
            const cb = el[moveCbKey] = (e) => {
              if (e && e.target !== el) {
                return;
              }
              if (!e || /transform$/.test(e.propertyName)) {
                el.removeEventListener("transitionend", cb);
                el[moveCbKey] = null;
                removeTransitionClass(el, moveClass);
              }
            };
            el.addEventListener("transitionend", cb);
          });
        });
        return () => {
          const rawProps = toRaw(props);
          const cssTransitionProps = resolveTransitionProps(rawProps);
          let tag = rawProps.tag || Fragment;
          prevChildren = [];
          if (children) {
            for (let i = 0; i < children.length; i++) {
              const child = children[i];
              if (child.el && child.el instanceof Element) {
                prevChildren.push(child);
                setTransitionHooks(
                  child,
                  resolveTransitionHooks(
                    child,
                    cssTransitionProps,
                    state,
                    instance
                  )
                );
                positionMap.set(
                  child,
                  child.el.getBoundingClientRect()
                );
              }
            }
          }
          children = slots.default ? getTransitionRawChildren(slots.default()) : [];
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.key != null) {
              setTransitionHooks(
                child,
                resolveTransitionHooks(child, cssTransitionProps, state, instance)
              );
            }
          }
          return createVNode(tag, null, children);
        };
      }
    };
    const removeMode = (props) => delete props.mode;
    /* @__PURE__ */ removeMode(TransitionGroupImpl.props);
    const TransitionGroup = TransitionGroupImpl;
    function callPendingCbs(c2) {
      const el = c2.el;
      if (el[moveCbKey]) {
        el[moveCbKey]();
      }
      if (el[enterCbKey]) {
        el[enterCbKey]();
      }
    }
    function recordPosition(c2) {
      newPositionMap.set(c2, c2.el.getBoundingClientRect());
    }
    function applyTranslation(c2) {
      const oldPos = positionMap.get(c2);
      const newPos = newPositionMap.get(c2);
      const dx = oldPos.left - newPos.left;
      const dy = oldPos.top - newPos.top;
      if (dx || dy) {
        const s = c2.el.style;
        s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
        s.transitionDuration = "0s";
        return c2;
      }
    }
    function hasCSSTransform(el, root2, moveClass) {
      const clone2 = el.cloneNode();
      const _vtc = el[vtcKey];
      if (_vtc) {
        _vtc.forEach((cls) => {
          cls.split(/\s+/).forEach((c2) => c2 && clone2.classList.remove(c2));
        });
      }
      moveClass.split(/\s+/).forEach((c2) => c2 && clone2.classList.add(c2));
      clone2.style.display = "none";
      const container = root2.nodeType === 1 ? root2 : root2.parentNode;
      container.appendChild(clone2);
      const { hasTransform } = getTransitionInfo(clone2);
      container.removeChild(clone2);
      return hasTransform;
    }
    const getModelAssigner = (vnode) => {
      const fn2 = vnode.props["onUpdate:modelValue"] || false;
      return isArray$2(fn2) ? (value) => invokeArrayFns(fn2, value) : fn2;
    };
    function onCompositionStart(e) {
      e.target.composing = true;
    }
    function onCompositionEnd(e) {
      const target = e.target;
      if (target.composing) {
        target.composing = false;
        target.dispatchEvent(new Event("input"));
      }
    }
    const assignKey = Symbol("_assign");
    const vModelText = {
      created(el, { modifiers: { lazy, trim, number: number2 } }, vnode) {
        el[assignKey] = getModelAssigner(vnode);
        const castToNumber = number2 || vnode.props && vnode.props.type === "number";
        addEventListener(el, lazy ? "change" : "input", (e) => {
          if (e.target.composing)
            return;
          let domValue = el.value;
          if (trim) {
            domValue = domValue.trim();
          }
          if (castToNumber) {
            domValue = looseToNumber(domValue);
          }
          el[assignKey](domValue);
        });
        if (trim) {
          addEventListener(el, "change", () => {
            el.value = el.value.trim();
          });
        }
        if (!lazy) {
          addEventListener(el, "compositionstart", onCompositionStart);
          addEventListener(el, "compositionend", onCompositionEnd);
          addEventListener(el, "change", onCompositionEnd);
        }
      },
      // set value on mounted so it's after min/max for type="range"
      mounted(el, { value }) {
        el.value = value == null ? "" : value;
      },
      beforeUpdate(el, { value, modifiers: { lazy, trim, number: number2 } }, vnode) {
        el[assignKey] = getModelAssigner(vnode);
        if (el.composing)
          return;
        const elValue = (number2 || el.type === "number") && !/^0\d/.test(el.value) ? looseToNumber(el.value) : el.value;
        const newValue = value == null ? "" : value;
        if (elValue === newValue) {
          return;
        }
        if (document.activeElement === el && el.type !== "range") {
          if (lazy) {
            return;
          }
          if (trim && el.value.trim() === newValue) {
            return;
          }
        }
        el.value = newValue;
      }
    };
    const systemModifiers = ["ctrl", "shift", "alt", "meta"];
    const modifierGuards = {
      stop: (e) => e.stopPropagation(),
      prevent: (e) => e.preventDefault(),
      self: (e) => e.target !== e.currentTarget,
      ctrl: (e) => !e.ctrlKey,
      shift: (e) => !e.shiftKey,
      alt: (e) => !e.altKey,
      meta: (e) => !e.metaKey,
      left: (e) => "button" in e && e.button !== 0,
      middle: (e) => "button" in e && e.button !== 1,
      right: (e) => "button" in e && e.button !== 2,
      exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
    };
    const withModifiers = (fn2, modifiers) => {
      const cache = fn2._withMods || (fn2._withMods = {});
      const cacheKey = modifiers.join(".");
      return cache[cacheKey] || (cache[cacheKey] = (event, ...args) => {
        for (let i = 0; i < modifiers.length; i++) {
          const guard = modifierGuards[modifiers[i]];
          if (guard && guard(event, modifiers))
            return;
        }
        return fn2(event, ...args);
      });
    };
    const keyNames = {
      esc: "escape",
      space: " ",
      up: "arrow-up",
      left: "arrow-left",
      right: "arrow-right",
      down: "arrow-down",
      delete: "backspace"
    };
    const withKeys = (fn2, modifiers) => {
      const cache = fn2._withKeys || (fn2._withKeys = {});
      const cacheKey = modifiers.join(".");
      return cache[cacheKey] || (cache[cacheKey] = (event) => {
        if (!("key" in event)) {
          return;
        }
        const eventKey = hyphenate(event.key);
        if (modifiers.some((k) => k === eventKey || keyNames[k] === eventKey)) {
          return fn2(event);
        }
      });
    };
    const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
    let renderer;
    function ensureRenderer() {
      return renderer || (renderer = createRenderer(rendererOptions));
    }
    const render = (...args) => {
      ensureRenderer().render(...args);
    };
    const createApp = (...args) => {
      const app = ensureRenderer().createApp(...args);
      const { mount } = app;
      app.mount = (containerOrSelector) => {
        const container = normalizeContainer(containerOrSelector);
        if (!container)
          return;
        const component = app._component;
        if (!isFunction$1(component) && !component.render && !component.template) {
          component.template = container.innerHTML;
        }
        container.innerHTML = "";
        const proxy = mount(container, false, resolveRootNamespace(container));
        if (container instanceof Element) {
          container.removeAttribute("v-cloak");
          container.setAttribute("data-v-app", "");
        }
        return proxy;
      };
      return app;
    };
    function resolveRootNamespace(container) {
      if (container instanceof SVGElement) {
        return "svg";
      }
      if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
        return "mathml";
      }
    }
    function normalizeContainer(container) {
      if (isString$1(container)) {
        const res = document.querySelector(container);
        return res;
      }
      return container;
    }
    const FOCUSABLE_ELEMENT_SELECTORS = `a[href],button:not([disabled]),button:not([hidden]),:not([tabindex="-1"]),input:not([disabled]),input:not([type="hidden"]),select:not([disabled]),textarea:not([disabled])`;
    const isVisible = (element) => {
      const computed2 = getComputedStyle(element);
      return computed2.position === "fixed" ? false : element.offsetParent !== null;
    };
    const obtainAllFocusableElements$1 = (element) => {
      return Array.from(element.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS)).filter((item) => isFocusable(item) && isVisible(item));
    };
    const isFocusable = (element) => {
      if (element.tabIndex > 0 || element.tabIndex === 0 && element.getAttribute("tabIndex") !== null) {
        return true;
      }
      if (element.disabled) {
        return false;
      }
      switch (element.nodeName) {
        case "A": {
          return !!element.href && element.rel !== "ignore";
        }
        case "INPUT": {
          return !(element.type === "hidden" || element.type === "file");
        }
        case "BUTTON":
        case "SELECT":
        case "TEXTAREA": {
          return true;
        }
        default: {
          return false;
        }
      }
    };
    const composeEventHandlers = (theirsHandler, oursHandler, { checkForDefaultPrevented = true } = {}) => {
      const handleEvent = (event) => {
        const shouldPrevent = theirsHandler == null ? void 0 : theirsHandler(event);
        if (checkForDefaultPrevented === false || !shouldPrevent) {
          return oursHandler == null ? void 0 : oursHandler(event);
        }
      };
      return handleEvent;
    };
    var _a;
    const isClient = typeof window !== "undefined";
    const isString = (val) => typeof val === "string";
    const noop = () => {
    };
    const isIOS = isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
    function resolveUnref(r) {
      return typeof r === "function" ? r() : unref(r);
    }
    function createFilterWrapper(filter, fn2) {
      function wrapper(...args) {
        return new Promise((resolve2, reject) => {
          Promise.resolve(filter(() => fn2.apply(this, args), { fn: fn2, thisArg: this, args })).then(resolve2).catch(reject);
        });
      }
      return wrapper;
    }
    function debounceFilter(ms, options = {}) {
      let timer;
      let maxTimer;
      let lastRejector = noop;
      const _clearTimeout = (timer2) => {
        clearTimeout(timer2);
        lastRejector();
        lastRejector = noop;
      };
      const filter = (invoke) => {
        const duration = resolveUnref(ms);
        const maxDuration = resolveUnref(options.maxWait);
        if (timer)
          _clearTimeout(timer);
        if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
          if (maxTimer) {
            _clearTimeout(maxTimer);
            maxTimer = null;
          }
          return Promise.resolve(invoke());
        }
        return new Promise((resolve2, reject) => {
          lastRejector = options.rejectOnCancel ? reject : resolve2;
          if (maxDuration && !maxTimer) {
            maxTimer = setTimeout(() => {
              if (timer)
                _clearTimeout(timer);
              maxTimer = null;
              resolve2(invoke());
            }, maxDuration);
          }
          timer = setTimeout(() => {
            if (maxTimer)
              _clearTimeout(maxTimer);
            maxTimer = null;
            resolve2(invoke());
          }, duration);
        });
      };
      return filter;
    }
    function identity$1(arg) {
      return arg;
    }
    function tryOnScopeDispose(fn2) {
      if (getCurrentScope()) {
        onScopeDispose(fn2);
        return true;
      }
      return false;
    }
    function useDebounceFn(fn2, ms = 200, options = {}) {
      return createFilterWrapper(debounceFilter(ms, options), fn2);
    }
    function refDebounced(value, ms = 200, options = {}) {
      const debounced = ref(value.value);
      const updater = useDebounceFn(() => {
        debounced.value = value.value;
      }, ms, options);
      watch(value, () => updater());
      return debounced;
    }
    function tryOnMounted(fn2, sync = true) {
      if (getCurrentInstance())
        onMounted(fn2);
      else if (sync)
        fn2();
      else
        nextTick(fn2);
    }
    function useTimeoutFn(cb, interval, options = {}) {
      const {
        immediate = true
      } = options;
      const isPending = ref(false);
      let timer = null;
      function clear2() {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      }
      function stop() {
        isPending.value = false;
        clear2();
      }
      function start(...args) {
        clear2();
        isPending.value = true;
        timer = setTimeout(() => {
          isPending.value = false;
          timer = null;
          cb(...args);
        }, resolveUnref(interval));
      }
      if (immediate) {
        isPending.value = true;
        if (isClient)
          start();
      }
      tryOnScopeDispose(stop);
      return {
        isPending: readonly(isPending),
        start,
        stop
      };
    }
    function unrefElement(elRef) {
      var _a2;
      const plain = resolveUnref(elRef);
      return (_a2 = plain == null ? void 0 : plain.$el) != null ? _a2 : plain;
    }
    const defaultWindow = isClient ? window : void 0;
    function useEventListener(...args) {
      let target;
      let events;
      let listeners;
      let options;
      if (isString(args[0]) || Array.isArray(args[0])) {
        [events, listeners, options] = args;
        target = defaultWindow;
      } else {
        [target, events, listeners, options] = args;
      }
      if (!target)
        return noop;
      if (!Array.isArray(events))
        events = [events];
      if (!Array.isArray(listeners))
        listeners = [listeners];
      const cleanups = [];
      const cleanup = () => {
        cleanups.forEach((fn2) => fn2());
        cleanups.length = 0;
      };
      const register = (el, event, listener, options2) => {
        el.addEventListener(event, listener, options2);
        return () => el.removeEventListener(event, listener, options2);
      };
      const stopWatch = watch(() => [unrefElement(target), resolveUnref(options)], ([el, options2]) => {
        cleanup();
        if (!el)
          return;
        cleanups.push(...events.flatMap((event) => {
          return listeners.map((listener) => register(el, event, listener, options2));
        }));
      }, { immediate: true, flush: "post" });
      const stop = () => {
        stopWatch();
        cleanup();
      };
      tryOnScopeDispose(stop);
      return stop;
    }
    let _iOSWorkaround = false;
    function onClickOutside(target, handler, options = {}) {
      const { window: window2 = defaultWindow, ignore = [], capture = true, detectIframe = false } = options;
      if (!window2)
        return;
      if (isIOS && !_iOSWorkaround) {
        _iOSWorkaround = true;
        Array.from(window2.document.body.children).forEach((el) => el.addEventListener("click", noop));
      }
      let shouldListen = true;
      const shouldIgnore = (event) => {
        return ignore.some((target2) => {
          if (typeof target2 === "string") {
            return Array.from(window2.document.querySelectorAll(target2)).some((el) => el === event.target || event.composedPath().includes(el));
          } else {
            const el = unrefElement(target2);
            return el && (event.target === el || event.composedPath().includes(el));
          }
        });
      };
      const listener = (event) => {
        const el = unrefElement(target);
        if (!el || el === event.target || event.composedPath().includes(el))
          return;
        if (event.detail === 0)
          shouldListen = !shouldIgnore(event);
        if (!shouldListen) {
          shouldListen = true;
          return;
        }
        handler(event);
      };
      const cleanup = [
        useEventListener(window2, "click", listener, { passive: true, capture }),
        useEventListener(window2, "pointerdown", (e) => {
          const el = unrefElement(target);
          if (el)
            shouldListen = !e.composedPath().includes(el) && !shouldIgnore(e);
        }, { passive: true }),
        detectIframe && useEventListener(window2, "blur", (event) => {
          var _a2;
          const el = unrefElement(target);
          if (((_a2 = window2.document.activeElement) == null ? void 0 : _a2.tagName) === "IFRAME" && !(el == null ? void 0 : el.contains(window2.document.activeElement)))
            handler(event);
        })
      ].filter(Boolean);
      const stop = () => cleanup.forEach((fn2) => fn2());
      return stop;
    }
    function useSupported(callback, sync = false) {
      const isSupported = ref();
      const update = () => isSupported.value = Boolean(callback());
      update();
      tryOnMounted(update, sync);
      return isSupported;
    }
    const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    const globalKey = "__vueuse_ssr_handlers__";
    _global[globalKey] = _global[globalKey] || {};
    var __getOwnPropSymbols$g = Object.getOwnPropertySymbols;
    var __hasOwnProp$g = Object.prototype.hasOwnProperty;
    var __propIsEnum$g = Object.prototype.propertyIsEnumerable;
    var __objRest$2 = (source2, exclude) => {
      var target = {};
      for (var prop in source2)
        if (__hasOwnProp$g.call(source2, prop) && exclude.indexOf(prop) < 0)
          target[prop] = source2[prop];
      if (source2 != null && __getOwnPropSymbols$g)
        for (var prop of __getOwnPropSymbols$g(source2)) {
          if (exclude.indexOf(prop) < 0 && __propIsEnum$g.call(source2, prop))
            target[prop] = source2[prop];
        }
      return target;
    };
    function useResizeObserver(target, callback, options = {}) {
      const _a2 = options, { window: window2 = defaultWindow } = _a2, observerOptions = __objRest$2(_a2, ["window"]);
      let observer;
      const isSupported = useSupported(() => window2 && "ResizeObserver" in window2);
      const cleanup = () => {
        if (observer) {
          observer.disconnect();
          observer = void 0;
        }
      };
      const stopWatch = watch(() => unrefElement(target), (el) => {
        cleanup();
        if (isSupported.value && window2 && el) {
          observer = new ResizeObserver(callback);
          observer.observe(el, observerOptions);
        }
      }, { immediate: true, flush: "post" });
      const stop = () => {
        cleanup();
        stopWatch();
      };
      tryOnScopeDispose(stop);
      return {
        isSupported,
        stop
      };
    }
    var __getOwnPropSymbols$8 = Object.getOwnPropertySymbols;
    var __hasOwnProp$8 = Object.prototype.hasOwnProperty;
    var __propIsEnum$8 = Object.prototype.propertyIsEnumerable;
    var __objRest$1 = (source2, exclude) => {
      var target = {};
      for (var prop in source2)
        if (__hasOwnProp$8.call(source2, prop) && exclude.indexOf(prop) < 0)
          target[prop] = source2[prop];
      if (source2 != null && __getOwnPropSymbols$8)
        for (var prop of __getOwnPropSymbols$8(source2)) {
          if (exclude.indexOf(prop) < 0 && __propIsEnum$8.call(source2, prop))
            target[prop] = source2[prop];
        }
      return target;
    };
    function useMutationObserver(target, callback, options = {}) {
      const _a2 = options, { window: window2 = defaultWindow } = _a2, mutationOptions = __objRest$1(_a2, ["window"]);
      let observer;
      const isSupported = useSupported(() => window2 && "MutationObserver" in window2);
      const cleanup = () => {
        if (observer) {
          observer.disconnect();
          observer = void 0;
        }
      };
      const stopWatch = watch(() => unrefElement(target), (el) => {
        cleanup();
        if (isSupported.value && window2 && el) {
          observer = new MutationObserver(callback);
          observer.observe(el, mutationOptions);
        }
      }, { immediate: true });
      const stop = () => {
        cleanup();
        stopWatch();
      };
      tryOnScopeDispose(stop);
      return {
        isSupported,
        stop
      };
    }
    var SwipeDirection;
    (function(SwipeDirection2) {
      SwipeDirection2["UP"] = "UP";
      SwipeDirection2["RIGHT"] = "RIGHT";
      SwipeDirection2["DOWN"] = "DOWN";
      SwipeDirection2["LEFT"] = "LEFT";
      SwipeDirection2["NONE"] = "NONE";
    })(SwipeDirection || (SwipeDirection = {}));
    var __defProp = Object.defineProperty;
    var __getOwnPropSymbols = Object.getOwnPropertySymbols;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __propIsEnum = Object.prototype.propertyIsEnumerable;
    var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
    var __spreadValues = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      if (__getOwnPropSymbols)
        for (var prop of __getOwnPropSymbols(b)) {
          if (__propIsEnum.call(b, prop))
            __defNormalProp(a, prop, b[prop]);
        }
      return a;
    };
    const _TransitionPresets = {
      easeInSine: [0.12, 0, 0.39, 0],
      easeOutSine: [0.61, 1, 0.88, 1],
      easeInOutSine: [0.37, 0, 0.63, 1],
      easeInQuad: [0.11, 0, 0.5, 0],
      easeOutQuad: [0.5, 1, 0.89, 1],
      easeInOutQuad: [0.45, 0, 0.55, 1],
      easeInCubic: [0.32, 0, 0.67, 0],
      easeOutCubic: [0.33, 1, 0.68, 1],
      easeInOutCubic: [0.65, 0, 0.35, 1],
      easeInQuart: [0.5, 0, 0.75, 0],
      easeOutQuart: [0.25, 1, 0.5, 1],
      easeInOutQuart: [0.76, 0, 0.24, 1],
      easeInQuint: [0.64, 0, 0.78, 0],
      easeOutQuint: [0.22, 1, 0.36, 1],
      easeInOutQuint: [0.83, 0, 0.17, 1],
      easeInExpo: [0.7, 0, 0.84, 0],
      easeOutExpo: [0.16, 1, 0.3, 1],
      easeInOutExpo: [0.87, 0, 0.13, 1],
      easeInCirc: [0.55, 0, 1, 0.45],
      easeOutCirc: [0, 0.55, 0.45, 1],
      easeInOutCirc: [0.85, 0, 0.15, 1],
      easeInBack: [0.36, 0, 0.66, -0.56],
      easeOutBack: [0.34, 1.56, 0.64, 1],
      easeInOutBack: [0.68, -0.6, 0.32, 1.6]
    };
    __spreadValues({
      linear: identity$1
    }, _TransitionPresets);
    const isFirefox = () => isClient && /firefox/i.test(window.navigator.userAgent);
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    const freeGlobal$1 = freeGlobal;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root$1 = freeGlobal$1 || freeSelf || Function("return this")();
    const root$2 = root$1;
    var Symbol$1 = root$2.Symbol;
    const Symbol$2 = Symbol$1;
    var objectProto$e = Object.prototype;
    var hasOwnProperty$b = objectProto$e.hasOwnProperty;
    var nativeObjectToString$1 = objectProto$e.toString;
    var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty$b.call(value, symToStringTag$1), tag = value[symToStringTag$1];
      try {
        value[symToStringTag$1] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString$1.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag$1] = tag;
        } else {
          delete value[symToStringTag$1];
        }
      }
      return result;
    }
    var objectProto$d = Object.prototype;
    var nativeObjectToString = objectProto$d.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    var symbolTag$3 = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$3;
    }
    function arrayMap(array2, iteratee) {
      var index = -1, length = array2 == null ? 0 : array2.length, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array2[index], index, array2);
      }
      return result;
    }
    var isArray = Array.isArray;
    const isArray$1 = isArray;
    var INFINITY$2 = 1 / 0;
    var symbolProto$2 = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto$2 ? symbolProto$2.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isArray$1(value)) {
        return arrayMap(value, baseToString) + "";
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY$2 ? "-0" : result;
    }
    var reWhitespace = /\s/;
    function trimmedEndIndex(string2) {
      var index = string2.length;
      while (index-- && reWhitespace.test(string2.charAt(index))) {
      }
      return index;
    }
    var reTrimStart = /^\s+/;
    function baseTrim(string2) {
      return string2 ? string2.slice(0, trimmedEndIndex(string2) + 1).replace(reTrimStart, "") : string2;
    }
    function isObject(value) {
      var type2 = typeof value;
      return value != null && (type2 == "object" || type2 == "function");
    }
    var NAN = 0 / 0;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = baseTrim(value);
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    var INFINITY$1 = 1 / 0, MAX_INTEGER = 17976931348623157e292;
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY$1 || value === -INFINITY$1) {
        var sign2 = value < 0 ? -1 : 1;
        return sign2 * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    function identity(value) {
      return value;
    }
    var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
    }
    var coreJsData = root$2["__core-js_shared__"];
    const coreJsData$1 = coreJsData;
    var maskSrcKey = function() {
      var uid2 = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
      return uid2 ? "Symbol(src)_1." + uid2 : "";
    }();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    var funcProto$1 = Function.prototype;
    var funcToString$1 = funcProto$1.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString$1.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var funcProto = Function.prototype, objectProto$c = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty$a = objectProto$c.hasOwnProperty;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty$a).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern2 = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern2.test(toSource(value));
    }
    function getValue$1(object2, key2) {
      return object2 == null ? void 0 : object2[key2];
    }
    function getNative(object2, key2) {
      var value = getValue$1(object2, key2);
      return baseIsNative(value) ? value : void 0;
    }
    var WeakMap$1 = getNative(root$2, "WeakMap");
    const WeakMap$2 = WeakMap$1;
    var objectCreate = Object.create;
    var baseCreate = function() {
      function object2() {
      }
      return function(proto) {
        if (!isObject(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object2.prototype = proto;
        var result = new object2();
        object2.prototype = void 0;
        return result;
      };
    }();
    const baseCreate$1 = baseCreate;
    function copyArray(source2, array2) {
      var index = -1, length = source2.length;
      array2 || (array2 = Array(length));
      while (++index < length) {
        array2[index] = source2[index];
      }
      return array2;
    }
    var defineProperty = function() {
      try {
        var func = getNative(Object, "defineProperty");
        func({}, "", {});
        return func;
      } catch (e) {
      }
    }();
    const defineProperty$1 = defineProperty;
    function arrayEach(array2, iteratee) {
      var index = -1, length = array2 == null ? 0 : array2.length;
      while (++index < length) {
        if (iteratee(array2[index], index, array2) === false) {
          break;
        }
      }
      return array2;
    }
    function baseFindIndex(array2, predicate, fromIndex, fromRight) {
      var length = array2.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array2[index], index, array2)) {
          return index;
        }
      }
      return -1;
    }
    var MAX_SAFE_INTEGER$1 = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type2 = typeof value;
      length = length == null ? MAX_SAFE_INTEGER$1 : length;
      return !!length && (type2 == "number" || type2 != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function baseAssignValue(object2, key2, value) {
      if (key2 == "__proto__" && defineProperty$1) {
        defineProperty$1(object2, key2, {
          "configurable": true,
          "enumerable": true,
          "value": value,
          "writable": true
        });
      } else {
        object2[key2] = value;
      }
    }
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    var objectProto$b = Object.prototype;
    var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
    function assignValue(object2, key2, value) {
      var objValue = object2[key2];
      if (!(hasOwnProperty$9.call(object2, key2) && eq(objValue, value)) || value === void 0 && !(key2 in object2)) {
        baseAssignValue(object2, key2, value);
      }
    }
    function copyObject(source2, props, object2, customizer) {
      var isNew = !object2;
      object2 || (object2 = {});
      var index = -1, length = props.length;
      while (++index < length) {
        var key2 = props[index];
        var newValue = customizer ? customizer(object2[key2], source2[key2], key2, object2, source2) : void 0;
        if (newValue === void 0) {
          newValue = source2[key2];
        }
        if (isNew) {
          baseAssignValue(object2, key2, newValue);
        } else {
          assignValue(object2, key2, newValue);
        }
      }
      return object2;
    }
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    var objectProto$a = Object.prototype;
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$a;
      return value === proto;
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    var argsTag$3 = "[object Arguments]";
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag$3;
    }
    var objectProto$9 = Object.prototype;
    var hasOwnProperty$8 = objectProto$9.hasOwnProperty;
    var propertyIsEnumerable$1 = objectProto$9.propertyIsEnumerable;
    var isArguments = baseIsArguments(function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty$8.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
    };
    const isArguments$1 = isArguments;
    function stubFalse() {
      return false;
    }
    var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
    var Buffer$1 = moduleExports$2 ? root$2.Buffer : void 0;
    var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0;
    var isBuffer = nativeIsBuffer || stubFalse;
    const isBuffer$1 = isBuffer;
    var argsTag$2 = "[object Arguments]", arrayTag$2 = "[object Array]", boolTag$3 = "[object Boolean]", dateTag$3 = "[object Date]", errorTag$2 = "[object Error]", funcTag$1 = "[object Function]", mapTag$5 = "[object Map]", numberTag$3 = "[object Number]", objectTag$3 = "[object Object]", regexpTag$3 = "[object RegExp]", setTag$5 = "[object Set]", stringTag$3 = "[object String]", weakMapTag$2 = "[object WeakMap]";
    var arrayBufferTag$3 = "[object ArrayBuffer]", dataViewTag$4 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
    var typedArrayTags = {};
    typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
    typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] = typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] = typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] = typedArrayTags[errorTag$2] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$5] = typedArrayTags[numberTag$3] = typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$3] = typedArrayTags[setTag$5] = typedArrayTags[stringTag$3] = typedArrayTags[weakMapTag$2] = false;
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
    var freeProcess = moduleExports$1 && freeGlobal$1.process;
    var nodeUtil = function() {
      try {
        var types2 = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
        if (types2) {
          return types2;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    const nodeUtil$1 = nodeUtil;
    var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    const isTypedArray$1 = isTypedArray;
    var objectProto$8 = Object.prototype;
    var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray$1(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
      for (var key2 in value) {
        if ((inherited || hasOwnProperty$7.call(value, key2)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
        (key2 == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key2 == "offset" || key2 == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key2 == "buffer" || key2 == "byteLength" || key2 == "byteOffset") || // Skip index properties.
        isIndex(key2, length)))) {
          result.push(key2);
        }
      }
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    var nativeKeys = overArg(Object.keys, Object);
    const nativeKeys$1 = nativeKeys;
    var objectProto$7 = Object.prototype;
    var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
    function baseKeys(object2) {
      if (!isPrototype(object2)) {
        return nativeKeys$1(object2);
      }
      var result = [];
      for (var key2 in Object(object2)) {
        if (hasOwnProperty$6.call(object2, key2) && key2 != "constructor") {
          result.push(key2);
        }
      }
      return result;
    }
    function keys(object2) {
      return isArrayLike(object2) ? arrayLikeKeys(object2) : baseKeys(object2);
    }
    function nativeKeysIn(object2) {
      var result = [];
      if (object2 != null) {
        for (var key2 in Object(object2)) {
          result.push(key2);
        }
      }
      return result;
    }
    var objectProto$6 = Object.prototype;
    var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
    function baseKeysIn(object2) {
      if (!isObject(object2)) {
        return nativeKeysIn(object2);
      }
      var isProto = isPrototype(object2), result = [];
      for (var key2 in object2) {
        if (!(key2 == "constructor" && (isProto || !hasOwnProperty$5.call(object2, key2)))) {
          result.push(key2);
        }
      }
      return result;
    }
    function keysIn(object2) {
      return isArrayLike(object2) ? arrayLikeKeys(object2, true) : baseKeysIn(object2);
    }
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
    function isKey(value, object2) {
      if (isArray$1(value)) {
        return false;
      }
      var type2 = typeof value;
      if (type2 == "number" || type2 == "symbol" || type2 == "boolean" || value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object2 != null && value in Object(object2);
    }
    var nativeCreate = getNative(Object, "create");
    const nativeCreate$1 = nativeCreate;
    function hashClear() {
      this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
      this.size = 0;
    }
    function hashDelete(key2) {
      var result = this.has(key2) && delete this.__data__[key2];
      this.size -= result ? 1 : 0;
      return result;
    }
    var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
    var objectProto$5 = Object.prototype;
    var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
    function hashGet(key2) {
      var data = this.__data__;
      if (nativeCreate$1) {
        var result = data[key2];
        return result === HASH_UNDEFINED$2 ? void 0 : result;
      }
      return hasOwnProperty$4.call(data, key2) ? data[key2] : void 0;
    }
    var objectProto$4 = Object.prototype;
    var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
    function hashHas(key2) {
      var data = this.__data__;
      return nativeCreate$1 ? data[key2] !== void 0 : hasOwnProperty$3.call(data, key2);
    }
    var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
    function hashSet(key2, value) {
      var data = this.__data__;
      this.size += this.has(key2) ? 0 : 1;
      data[key2] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED$1 : value;
      return this;
    }
    function Hash(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    function assocIndexOf(array2, key2) {
      var length = array2.length;
      while (length--) {
        if (eq(array2[length][0], key2)) {
          return length;
        }
      }
      return -1;
    }
    var arrayProto = Array.prototype;
    var splice = arrayProto.splice;
    function listCacheDelete(key2) {
      var data = this.__data__, index = assocIndexOf(data, key2);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }
    function listCacheGet(key2) {
      var data = this.__data__, index = assocIndexOf(data, key2);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key2) {
      return assocIndexOf(this.__data__, key2) > -1;
    }
    function listCacheSet(key2, value) {
      var data = this.__data__, index = assocIndexOf(data, key2);
      if (index < 0) {
        ++this.size;
        data.push([key2, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    function ListCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    var Map$1 = getNative(root$2, "Map");
    const Map$2 = Map$1;
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map$2 || ListCache)(),
        "string": new Hash()
      };
    }
    function isKeyable(value) {
      var type2 = typeof value;
      return type2 == "string" || type2 == "number" || type2 == "symbol" || type2 == "boolean" ? value !== "__proto__" : value === null;
    }
    function getMapData(map, key2) {
      var data = map.__data__;
      return isKeyable(key2) ? data[typeof key2 == "string" ? "string" : "hash"] : data.map;
    }
    function mapCacheDelete(key2) {
      var result = getMapData(this, key2)["delete"](key2);
      this.size -= result ? 1 : 0;
      return result;
    }
    function mapCacheGet(key2) {
      return getMapData(this, key2).get(key2);
    }
    function mapCacheHas(key2) {
      return getMapData(this, key2).has(key2);
    }
    function mapCacheSet(key2, value) {
      var data = getMapData(this, key2), size2 = data.size;
      data.set(key2, value);
      this.size += data.size == size2 ? 0 : 1;
      return this;
    }
    function MapCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    var FUNC_ERROR_TEXT$1 = "Expected a function";
    function memoize(func, resolver) {
      if (typeof func != "function" || resolver != null && typeof resolver != "function") {
        throw new TypeError(FUNC_ERROR_TEXT$1);
      }
      var memoized = function() {
        var args = arguments, key2 = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key2)) {
          return cache.get(key2);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key2, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache)();
      return memoized;
    }
    memoize.Cache = MapCache;
    var MAX_MEMOIZE_SIZE = 500;
    function memoizeCapped(func) {
      var result = memoize(func, function(key2) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key2;
      });
      var cache = result.cache;
      return result;
    }
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = memoizeCapped(function(string2) {
      var result = [];
      if (string2.charCodeAt(0) === 46) {
        result.push("");
      }
      string2.replace(rePropName, function(match, number2, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, "$1") : number2 || match);
      });
      return result;
    });
    const stringToPath$1 = stringToPath;
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    function castPath(value, object2) {
      if (isArray$1(value)) {
        return value;
      }
      return isKey(value, object2) ? [value] : stringToPath$1(toString(value));
    }
    var INFINITY = 1 / 0;
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    function baseGet(object2, path) {
      path = castPath(path, object2);
      var index = 0, length = path.length;
      while (object2 != null && index < length) {
        object2 = object2[toKey(path[index++])];
      }
      return index && index == length ? object2 : void 0;
    }
    function get(object2, path, defaultValue) {
      var result = object2 == null ? void 0 : baseGet(object2, path);
      return result === void 0 ? defaultValue : result;
    }
    function arrayPush(array2, values) {
      var index = -1, length = values.length, offset = array2.length;
      while (++index < length) {
        array2[offset + index] = values[index];
      }
      return array2;
    }
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    const getPrototype$1 = getPrototype;
    function castArray() {
      if (!arguments.length) {
        return [];
      }
      var value = arguments[0];
      return isArray$1(value) ? value : [value];
    }
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    function stackDelete(key2) {
      var data = this.__data__, result = data["delete"](key2);
      this.size = data.size;
      return result;
    }
    function stackGet(key2) {
      return this.__data__.get(key2);
    }
    function stackHas(key2) {
      return this.__data__.has(key2);
    }
    var LARGE_ARRAY_SIZE = 200;
    function stackSet(key2, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key2, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key2, value);
      this.size = data.size;
      return this;
    }
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    function baseAssign(object2, source2) {
      return object2 && copyObject(source2, keys(source2), object2);
    }
    function baseAssignIn(object2, source2) {
      return object2 && copyObject(source2, keysIn(source2), object2);
    }
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer2 = moduleExports ? root$2.Buffer : void 0, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
    function cloneBuffer(buffer2, isDeep) {
      if (isDeep) {
        return buffer2.slice();
      }
      var length = buffer2.length, result = allocUnsafe ? allocUnsafe(length) : new buffer2.constructor(length);
      buffer2.copy(result);
      return result;
    }
    function arrayFilter(array2, predicate) {
      var index = -1, length = array2 == null ? 0 : array2.length, resIndex = 0, result = [];
      while (++index < length) {
        var value = array2[index];
        if (predicate(value, index, array2)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    function stubArray() {
      return [];
    }
    var objectProto$3 = Object.prototype;
    var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;
    var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
    var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object2) {
      if (object2 == null) {
        return [];
      }
      object2 = Object(object2);
      return arrayFilter(nativeGetSymbols$1(object2), function(symbol) {
        return propertyIsEnumerable.call(object2, symbol);
      });
    };
    const getSymbols$1 = getSymbols;
    function copySymbols(source2, object2) {
      return copyObject(source2, getSymbols$1(source2), object2);
    }
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object2) {
      var result = [];
      while (object2) {
        arrayPush(result, getSymbols$1(object2));
        object2 = getPrototype$1(object2);
      }
      return result;
    };
    const getSymbolsIn$1 = getSymbolsIn;
    function copySymbolsIn(source2, object2) {
      return copyObject(source2, getSymbolsIn$1(source2), object2);
    }
    function baseGetAllKeys(object2, keysFunc, symbolsFunc) {
      var result = keysFunc(object2);
      return isArray$1(object2) ? result : arrayPush(result, symbolsFunc(object2));
    }
    function getAllKeys(object2) {
      return baseGetAllKeys(object2, keys, getSymbols$1);
    }
    function getAllKeysIn(object2) {
      return baseGetAllKeys(object2, keysIn, getSymbolsIn$1);
    }
    var DataView = getNative(root$2, "DataView");
    const DataView$1 = DataView;
    var Promise$1 = getNative(root$2, "Promise");
    const Promise$2 = Promise$1;
    var Set$1 = getNative(root$2, "Set");
    const Set$2 = Set$1;
    var mapTag$4 = "[object Map]", objectTag$2 = "[object Object]", promiseTag = "[object Promise]", setTag$4 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
    var dataViewTag$3 = "[object DataView]";
    var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$2), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$2), weakMapCtorString = toSource(WeakMap$2);
    var getTag = baseGetTag;
    if (DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$3 || Map$2 && getTag(new Map$2()) != mapTag$4 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$2 && getTag(new Set$2()) != setTag$4 || WeakMap$2 && getTag(new WeakMap$2()) != weakMapTag$1) {
      getTag = function(value) {
        var result = baseGetTag(value), Ctor = result == objectTag$2 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag$3;
            case mapCtorString:
              return mapTag$4;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag$4;
            case weakMapCtorString:
              return weakMapTag$1;
          }
        }
        return result;
      };
    }
    const getTag$1 = getTag;
    var objectProto$2 = Object.prototype;
    var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
    function initCloneArray(array2) {
      var length = array2.length, result = new array2.constructor(length);
      if (length && typeof array2[0] == "string" && hasOwnProperty$2.call(array2, "index")) {
        result.index = array2.index;
        result.input = array2.input;
      }
      return result;
    }
    var Uint8Array2 = root$2.Uint8Array;
    const Uint8Array$1 = Uint8Array2;
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
      return result;
    }
    function cloneDataView(dataView, isDeep) {
      var buffer2 = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer2, dataView.byteOffset, dataView.byteLength);
    }
    var reFlags = /\w*$/;
    function cloneRegExp(regexp2) {
      var result = new regexp2.constructor(regexp2.source, reFlags.exec(regexp2));
      result.lastIndex = regexp2.lastIndex;
      return result;
    }
    var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : void 0;
    function cloneSymbol(symbol) {
      return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
    }
    function cloneTypedArray(typedArray, isDeep) {
      var buffer2 = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer2, typedArray.byteOffset, typedArray.length);
    }
    var boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", mapTag$3 = "[object Map]", numberTag$2 = "[object Number]", regexpTag$2 = "[object RegExp]", setTag$3 = "[object Set]", stringTag$2 = "[object String]", symbolTag$2 = "[object Symbol]";
    var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
    function initCloneByTag(object2, tag, isDeep) {
      var Ctor = object2.constructor;
      switch (tag) {
        case arrayBufferTag$2:
          return cloneArrayBuffer(object2);
        case boolTag$2:
        case dateTag$2:
          return new Ctor(+object2);
        case dataViewTag$2:
          return cloneDataView(object2, isDeep);
        case float32Tag$1:
        case float64Tag$1:
        case int8Tag$1:
        case int16Tag$1:
        case int32Tag$1:
        case uint8Tag$1:
        case uint8ClampedTag$1:
        case uint16Tag$1:
        case uint32Tag$1:
          return cloneTypedArray(object2, isDeep);
        case mapTag$3:
          return new Ctor();
        case numberTag$2:
        case stringTag$2:
          return new Ctor(object2);
        case regexpTag$2:
          return cloneRegExp(object2);
        case setTag$3:
          return new Ctor();
        case symbolTag$2:
          return cloneSymbol(object2);
      }
    }
    function initCloneObject(object2) {
      return typeof object2.constructor == "function" && !isPrototype(object2) ? baseCreate$1(getPrototype$1(object2)) : {};
    }
    var mapTag$2 = "[object Map]";
    function baseIsMap(value) {
      return isObjectLike(value) && getTag$1(value) == mapTag$2;
    }
    var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;
    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
    const isMap$1 = isMap;
    var setTag$2 = "[object Set]";
    function baseIsSet(value) {
      return isObjectLike(value) && getTag$1(value) == setTag$2;
    }
    var nodeIsSet = nodeUtil$1 && nodeUtil$1.isSet;
    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
    const isSet$1 = isSet;
    var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$1 = 4;
    var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag$1 = "[object Map]", numberTag$1 = "[object Number]", objectTag$1 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$1 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]", weakMapTag = "[object WeakMap]";
    var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
    var cloneableTags = {};
    cloneableTags[argsTag$1] = cloneableTags[arrayTag$1] = cloneableTags[arrayBufferTag$1] = cloneableTags[dataViewTag$1] = cloneableTags[boolTag$1] = cloneableTags[dateTag$1] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag$1] = cloneableTags[numberTag$1] = cloneableTags[objectTag$1] = cloneableTags[regexpTag$1] = cloneableTags[setTag$1] = cloneableTags[stringTag$1] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag$1] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    function baseClone(value, bitmask, customizer, key2, object2, stack2) {
      var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
      if (customizer) {
        result = object2 ? customizer(value, key2, object2, stack2) : customizer(value);
      }
      if (result !== void 0) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray$1(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag$1(value), isFunc = tag == funcTag || tag == genTag;
        if (isBuffer$1(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag$1 || tag == argsTag$1 || isFunc && !object2) {
          result = isFlat || isFunc ? {} : initCloneObject(value);
          if (!isDeep) {
            return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object2 ? value : {};
          }
          result = initCloneByTag(value, tag, isDeep);
        }
      }
      stack2 || (stack2 = new Stack());
      var stacked = stack2.get(value);
      if (stacked) {
        return stacked;
      }
      stack2.set(value, result);
      if (isSet$1(value)) {
        value.forEach(function(subValue) {
          result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack2));
        });
      } else if (isMap$1(value)) {
        value.forEach(function(subValue, key3) {
          result.set(key3, baseClone(subValue, bitmask, customizer, key3, value, stack2));
        });
      }
      var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
      var props = isArr ? void 0 : keysFunc(value);
      arrayEach(props || value, function(subValue, key3) {
        if (props) {
          key3 = subValue;
          subValue = value[key3];
        }
        assignValue(result, key3, baseClone(subValue, bitmask, customizer, key3, value, stack2));
      });
      return result;
    }
    var CLONE_SYMBOLS_FLAG = 4;
    function clone(value) {
      return baseClone(value, CLONE_SYMBOLS_FLAG);
    }
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    function SetCache(values) {
      var index = -1, length = values == null ? 0 : values.length;
      this.__data__ = new MapCache();
      while (++index < length) {
        this.add(values[index]);
      }
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    function arraySome(array2, predicate) {
      var index = -1, length = array2 == null ? 0 : array2.length;
      while (++index < length) {
        if (predicate(array2[index], index, array2)) {
          return true;
        }
      }
      return false;
    }
    function cacheHas(cache, key2) {
      return cache.has(key2);
    }
    var COMPARE_PARTIAL_FLAG$5 = 1, COMPARE_UNORDERED_FLAG$3 = 2;
    function equalArrays(array2, other, bitmask, customizer, equalFunc, stack2) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5, arrLength = array2.length, othLength = other.length;
      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      var arrStacked = stack2.get(array2);
      var othStacked = stack2.get(other);
      if (arrStacked && othStacked) {
        return arrStacked == other && othStacked == array2;
      }
      var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$3 ? new SetCache() : void 0;
      stack2.set(array2, other);
      stack2.set(other, array2);
      while (++index < arrLength) {
        var arrValue = array2[index], othValue = other[index];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, arrValue, index, other, array2, stack2) : customizer(arrValue, othValue, index, array2, other, stack2);
        }
        if (compared !== void 0) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        if (seen) {
          if (!arraySome(other, function(othValue2, othIndex) {
            if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack2))) {
              return seen.push(othIndex);
            }
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack2))) {
          result = false;
          break;
        }
      }
      stack2["delete"](array2);
      stack2["delete"](other);
      return result;
    }
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      map.forEach(function(value, key2) {
        result[++index] = [key2, value];
      });
      return result;
    }
    function setToArray(set2) {
      var index = -1, result = Array(set2.size);
      set2.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    var COMPARE_PARTIAL_FLAG$4 = 1, COMPARE_UNORDERED_FLAG$2 = 2;
    var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
    var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
    var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function equalByTag(object2, other, tag, bitmask, customizer, equalFunc, stack2) {
      switch (tag) {
        case dataViewTag:
          if (object2.byteLength != other.byteLength || object2.byteOffset != other.byteOffset) {
            return false;
          }
          object2 = object2.buffer;
          other = other.buffer;
        case arrayBufferTag:
          if (object2.byteLength != other.byteLength || !equalFunc(new Uint8Array$1(object2), new Uint8Array$1(other))) {
            return false;
          }
          return true;
        case boolTag:
        case dateTag:
        case numberTag:
          return eq(+object2, +other);
        case errorTag:
          return object2.name == other.name && object2.message == other.message;
        case regexpTag:
        case stringTag:
          return object2 == other + "";
        case mapTag:
          var convert = mapToArray;
        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
          convert || (convert = setToArray);
          if (object2.size != other.size && !isPartial) {
            return false;
          }
          var stacked = stack2.get(object2);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG$2;
          stack2.set(object2, other);
          var result = equalArrays(convert(object2), convert(other), bitmask, customizer, equalFunc, stack2);
          stack2["delete"](object2);
          return result;
        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object2) == symbolValueOf.call(other);
          }
      }
      return false;
    }
    var COMPARE_PARTIAL_FLAG$3 = 1;
    var objectProto$1 = Object.prototype;
    var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
    function equalObjects(object2, other, bitmask, customizer, equalFunc, stack2) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, objProps = getAllKeys(object2), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key2 = objProps[index];
        if (!(isPartial ? key2 in other : hasOwnProperty$1.call(other, key2))) {
          return false;
        }
      }
      var objStacked = stack2.get(object2);
      var othStacked = stack2.get(other);
      if (objStacked && othStacked) {
        return objStacked == other && othStacked == object2;
      }
      var result = true;
      stack2.set(object2, other);
      stack2.set(other, object2);
      var skipCtor = isPartial;
      while (++index < objLength) {
        key2 = objProps[index];
        var objValue = object2[key2], othValue = other[key2];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, objValue, key2, other, object2, stack2) : customizer(objValue, othValue, key2, object2, other, stack2);
        }
        if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack2) : compared)) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key2 == "constructor");
      }
      if (result && !skipCtor) {
        var objCtor = object2.constructor, othCtor = other.constructor;
        if (objCtor != othCtor && ("constructor" in object2 && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack2["delete"](object2);
      stack2["delete"](other);
      return result;
    }
    var COMPARE_PARTIAL_FLAG$2 = 1;
    var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseIsEqualDeep(object2, other, bitmask, customizer, equalFunc, stack2) {
      var objIsArr = isArray$1(object2), othIsArr = isArray$1(other), objTag = objIsArr ? arrayTag : getTag$1(object2), othTag = othIsArr ? arrayTag : getTag$1(other);
      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;
      var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
      if (isSameTag && isBuffer$1(object2)) {
        if (!isBuffer$1(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack2 || (stack2 = new Stack());
        return objIsArr || isTypedArray$1(object2) ? equalArrays(object2, other, bitmask, customizer, equalFunc, stack2) : equalByTag(object2, other, objTag, bitmask, customizer, equalFunc, stack2);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object2, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object2.value() : object2, othUnwrapped = othIsWrapped ? other.value() : other;
          stack2 || (stack2 = new Stack());
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack2);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack2 || (stack2 = new Stack());
      return equalObjects(object2, other, bitmask, customizer, equalFunc, stack2);
    }
    function baseIsEqual(value, other, bitmask, customizer, stack2) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack2);
    }
    var COMPARE_PARTIAL_FLAG$1 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
    function baseIsMatch(object2, source2, matchData, customizer) {
      var index = matchData.length, length = index, noCustomizer = !customizer;
      if (object2 == null) {
        return !length;
      }
      object2 = Object(object2);
      while (index--) {
        var data = matchData[index];
        if (noCustomizer && data[2] ? data[1] !== object2[data[0]] : !(data[0] in object2)) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key2 = data[0], objValue = object2[key2], srcValue = data[1];
        if (noCustomizer && data[2]) {
          if (objValue === void 0 && !(key2 in object2)) {
            return false;
          }
        } else {
          var stack2 = new Stack();
          if (customizer) {
            var result = customizer(objValue, srcValue, key2, object2, source2, stack2);
          }
          if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack2) : result)) {
            return false;
          }
        }
      }
      return true;
    }
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }
    function getMatchData(object2) {
      var result = keys(object2), length = result.length;
      while (length--) {
        var key2 = result[length], value = object2[key2];
        result[length] = [key2, value, isStrictComparable(value)];
      }
      return result;
    }
    function matchesStrictComparable(key2, srcValue) {
      return function(object2) {
        if (object2 == null) {
          return false;
        }
        return object2[key2] === srcValue && (srcValue !== void 0 || key2 in Object(object2));
      };
    }
    function baseMatches(source2) {
      var matchData = getMatchData(source2);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object2) {
        return object2 === source2 || baseIsMatch(object2, source2, matchData);
      };
    }
    function baseHasIn(object2, key2) {
      return object2 != null && key2 in Object(object2);
    }
    function hasPath(object2, path, hasFunc) {
      path = castPath(path, object2);
      var index = -1, length = path.length, result = false;
      while (++index < length) {
        var key2 = toKey(path[index]);
        if (!(result = object2 != null && hasFunc(object2, key2))) {
          break;
        }
        object2 = object2[key2];
      }
      if (result || ++index != length) {
        return result;
      }
      length = object2 == null ? 0 : object2.length;
      return !!length && isLength(length) && isIndex(key2, length) && (isArray$1(object2) || isArguments$1(object2));
    }
    function hasIn(object2, path) {
      return object2 != null && hasPath(object2, path, baseHasIn);
    }
    var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }
      return function(object2) {
        var objValue = get(object2, path);
        return objValue === void 0 && objValue === srcValue ? hasIn(object2, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
      };
    }
    function baseProperty(key2) {
      return function(object2) {
        return object2 == null ? void 0 : object2[key2];
      };
    }
    function basePropertyDeep(path) {
      return function(object2) {
        return baseGet(object2, path);
      };
    }
    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }
    function baseIteratee(value) {
      if (typeof value == "function") {
        return value;
      }
      if (value == null) {
        return identity;
      }
      if (typeof value == "object") {
        return isArray$1(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
      }
      return property(value);
    }
    var now = function() {
      return root$2.Date.now();
    };
    const now$1 = now;
    var FUNC_ERROR_TEXT = "Expected a function";
    var nativeMax$1 = Math.max, nativeMin$1 = Math.min;
    function debounce(func, wait, options) {
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax$1(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }
      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
        return maxing ? nativeMin$1(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
      }
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }
      function timerExpired() {
        var time = now$1();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = void 0;
        return result;
      }
      function cancel() {
        if (timerId !== void 0) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
      }
      function flush() {
        return timerId === void 0 ? result : trailingEdge(now$1());
      }
      function debounced() {
        var time = now$1(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === void 0) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            clearTimeout(timerId);
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === void 0) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    var nativeMax = Math.max, nativeMin = Math.min;
    function findLastIndex(array2, predicate, fromIndex) {
      var length = array2 == null ? 0 : array2.length;
      if (!length) {
        return -1;
      }
      var index = length - 1;
      if (fromIndex !== void 0) {
        index = toInteger(fromIndex);
        index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
      }
      return baseFindIndex(array2, baseIteratee(predicate), index, true);
    }
    function fromPairs(pairs) {
      var index = -1, length = pairs == null ? 0 : pairs.length, result = {};
      while (++index < length) {
        var pair = pairs[index];
        result[pair[0]] = pair[1];
      }
      return result;
    }
    function isEqual(value, other) {
      return baseIsEqual(value, other);
    }
    function isNil(value) {
      return value == null;
    }
    function isUndefined$1(value) {
      return value === void 0;
    }
    function baseSet(object2, path, value, customizer) {
      if (!isObject(object2)) {
        return object2;
      }
      path = castPath(path, object2);
      var index = -1, length = path.length, lastIndex = length - 1, nested = object2;
      while (nested != null && ++index < length) {
        var key2 = toKey(path[index]), newValue = value;
        if (key2 === "__proto__" || key2 === "constructor" || key2 === "prototype") {
          return object2;
        }
        if (index != lastIndex) {
          var objValue = nested[key2];
          newValue = customizer ? customizer(objValue, key2, nested) : void 0;
          if (newValue === void 0) {
            newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
          }
        }
        assignValue(nested, key2, newValue);
        nested = nested[key2];
      }
      return object2;
    }
    function set(object2, path, value) {
      return object2 == null ? object2 : baseSet(object2, path, value);
    }
    const isUndefined = (val) => val === void 0;
    const isBoolean = (val) => typeof val === "boolean";
    const isNumber = (val) => typeof val === "number";
    const isElement = (e) => {
      if (typeof Element === "undefined")
        return false;
      return e instanceof Element;
    };
    const isStringNumber = (val) => {
      if (!isString$1(val)) {
        return false;
      }
      return !Number.isNaN(Number(val));
    };
    const escapeStringRegexp = (string2 = "") => string2.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
    const keysOf = (arr) => Object.keys(arr);
    const getProp = (obj, path, defaultValue) => {
      return {
        get value() {
          return get(obj, path, defaultValue);
        },
        set value(val) {
          set(obj, path, val);
        }
      };
    };
    class ElementPlusError extends Error {
      constructor(m) {
        super(m);
        this.name = "ElementPlusError";
      }
    }
    function throwError(scope, m) {
      throw new ElementPlusError(`[${scope}] ${m}`);
    }
    function debugWarn(scope, message2) {
    }
    const classNameToArray = (cls = "") => cls.split(" ").filter((item) => !!item.trim());
    const hasClass = (el, cls) => {
      if (!el || !cls)
        return false;
      if (cls.includes(" "))
        throw new Error("className should not contain space.");
      return el.classList.contains(cls);
    };
    const addClass = (el, cls) => {
      if (!el || !cls.trim())
        return;
      el.classList.add(...classNameToArray(cls));
    };
    const removeClass = (el, cls) => {
      if (!el || !cls.trim())
        return;
      el.classList.remove(...classNameToArray(cls));
    };
    const getStyle = (element, styleName) => {
      var _a2;
      if (!isClient || !element || !styleName)
        return "";
      let key2 = camelize(styleName);
      if (key2 === "float")
        key2 = "cssFloat";
      try {
        const style = element.style[key2];
        if (style)
          return style;
        const computed2 = (_a2 = document.defaultView) == null ? void 0 : _a2.getComputedStyle(element, "");
        return computed2 ? computed2[key2] : "";
      } catch (e) {
        return element.style[key2];
      }
    };
    function addUnit(value, defaultUnit = "px") {
      if (!value)
        return "";
      if (isNumber(value) || isStringNumber(value)) {
        return `${value}${defaultUnit}`;
      } else if (isString$1(value)) {
        return value;
      }
    }
    let scrollBarWidth;
    const getScrollBarWidth = (namespace) => {
      var _a2;
      if (!isClient)
        return 0;
      if (scrollBarWidth !== void 0)
        return scrollBarWidth;
      const outer = document.createElement("div");
      outer.className = `${namespace}-scrollbar__wrap`;
      outer.style.visibility = "hidden";
      outer.style.width = "100px";
      outer.style.position = "absolute";
      outer.style.top = "-9999px";
      document.body.appendChild(outer);
      const widthNoScroll = outer.offsetWidth;
      outer.style.overflow = "scroll";
      const inner = document.createElement("div");
      inner.style.width = "100%";
      outer.appendChild(inner);
      const widthWithScroll = inner.offsetWidth;
      (_a2 = outer.parentNode) == null ? void 0 : _a2.removeChild(outer);
      scrollBarWidth = widthNoScroll - widthWithScroll;
      return scrollBarWidth;
    };
    function scrollIntoView(container, selected) {
      if (!isClient)
        return;
      if (!selected) {
        container.scrollTop = 0;
        return;
      }
      const offsetParents = [];
      let pointer = selected.offsetParent;
      while (pointer !== null && container !== pointer && container.contains(pointer)) {
        offsetParents.push(pointer);
        pointer = pointer.offsetParent;
      }
      const top = selected.offsetTop + offsetParents.reduce((prev, curr) => prev + curr.offsetTop, 0);
      const bottom = top + selected.offsetHeight;
      const viewRectTop = container.scrollTop;
      const viewRectBottom = viewRectTop + container.clientHeight;
      if (top < viewRectTop) {
        container.scrollTop = top;
      } else if (bottom > viewRectBottom) {
        container.scrollTop = bottom - container.clientHeight;
      }
    }
    /*! Element Plus Icons Vue v2.3.1 */
    var arrow_down_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
      name: "ArrowDown",
      __name: "arrow-down",
      setup(__props) {
        return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024"
        }, [
          createBaseVNode("path", {
            fill: "currentColor",
            d: "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
          })
        ]));
      }
    });
    var arrow_down_default = arrow_down_vue_vue_type_script_setup_true_lang_default;
    var check_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
      name: "Check",
      __name: "check",
      setup(__props) {
        return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024"
        }, [
          createBaseVNode("path", {
            fill: "currentColor",
            d: "M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
          })
        ]));
      }
    });
    var check_default = check_vue_vue_type_script_setup_true_lang_default;
    var circle_check_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
      name: "CircleCheck",
      __name: "circle-check",
      setup(__props) {
        return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024"
        }, [
          createBaseVNode("path", {
            fill: "currentColor",
            d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
          }),
          createBaseVNode("path", {
            fill: "currentColor",
            d: "M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z"
          })
        ]));
      }
    });
    var circle_check_default = circle_check_vue_vue_type_script_setup_true_lang_default;
    var circle_close_filled_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
      name: "CircleCloseFilled",
      __name: "circle-close-filled",
      setup(__props) {
        return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024"
        }, [
          createBaseVNode("path", {
            fill: "currentColor",
            d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336z"
          })
        ]));
      }
    });
    var circle_close_filled_default = circle_close_filled_vue_vue_type_script_setup_true_lang_default;
    var circle_close_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
      name: "CircleClose",
      __name: "circle-close",
      setup(__props) {
        return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024"
        }, [
          createBaseVNode("path", {
            fill: "currentColor",
            d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248z"
          }),
          createBaseVNode("path", {
            fill: "currentColor",
            d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
          })
        ]));
      }
    });
    var circle_close_default = circle_close_vue_vue_type_script_setup_true_lang_default;
    var close_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
      name: "Close",
      __name: "close",
      setup(__props) {
        return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024"
        }, [
          createBaseVNode("path", {
            fill: "currentColor",
            d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
          })
        ]));
      }
    });
    var close_default = close_vue_vue_type_script_setup_true_lang_default;
    var hide_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
      name: "Hide",
      __name: "hide",
      setup(__props) {
        return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024"
        }, [
          createBaseVNode("path", {
            fill: "currentColor",
            d: "M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2zM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z"
          }),
          createBaseVNode("path", {
            fill: "currentColor",
            d: "M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z"
          })
        ]));
      }
    });
    var hide_default = hide_vue_vue_type_script_setup_true_lang_default;
    var info_filled_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
      name: "InfoFilled",
      __name: "info-filled",
      setup(__props) {
        return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024"
        }, [
          createBaseVNode("path", {
            fill: "currentColor",
            d: "M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64m67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344M590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"
          })
        ]));
      }
    });
    var info_filled_default = info_filled_vue_vue_type_script_setup_true_lang_default;
    var loading_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
      name: "Loading",
      __name: "loading",
      setup(__props) {
        return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024"
        }, [
          createBaseVNode("path", {
            fill: "currentColor",
            d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
          })
        ]));
      }
    });
    var loading_default = loading_vue_vue_type_script_setup_true_lang_default;
    var position_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
      name: "Position",
      __name: "position",
      setup(__props) {
        return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024"
        }, [
          createBaseVNode("path", {
            fill: "currentColor",
            d: "m249.6 417.088 319.744 43.072 39.168 310.272L845.12 178.88 249.6 417.088zm-129.024 47.168a32 32 0 0 1-7.68-61.44l777.792-311.04a32 32 0 0 1 41.6 41.6l-310.336 775.68a32 32 0 0 1-61.44-7.808L512 516.992l-391.424-52.736z"
          })
        ]));
      }
    });
    var position_default = position_vue_vue_type_script_setup_true_lang_default;
    var refresh_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
      name: "Refresh",
      __name: "refresh",
      setup(__props) {
        return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024"
        }, [
          createBaseVNode("path", {
            fill: "currentColor",
            d: "M771.776 794.88A384 384 0 0 1 128 512h64a320 320 0 0 0 555.712 216.448H654.72a32 32 0 1 1 0-64h149.056a32 32 0 0 1 32 32v148.928a32 32 0 1 1-64 0v-50.56zM276.288 295.616h92.992a32 32 0 0 1 0 64H220.16a32 32 0 0 1-32-32V178.56a32 32 0 0 1 64 0v50.56A384 384 0 0 1 896.128 512h-64a320 320 0 0 0-555.776-216.384z"
          })
        ]));
      }
    });
    var refresh_default = refresh_vue_vue_type_script_setup_true_lang_default;
    var success_filled_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
      name: "SuccessFilled",
      __name: "success-filled",
      setup(__props) {
        return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024"
        }, [
          createBaseVNode("path", {
            fill: "currentColor",
            d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"
          })
        ]));
      }
    });
    var success_filled_default = success_filled_vue_vue_type_script_setup_true_lang_default;
    var view_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
      name: "View",
      __name: "view",
      setup(__props) {
        return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024"
        }, [
          createBaseVNode("path", {
            fill: "currentColor",
            d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448m0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160"
          })
        ]));
      }
    });
    var view_default = view_vue_vue_type_script_setup_true_lang_default;
    var warning_filled_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
      name: "WarningFilled",
      __name: "warning-filled",
      setup(__props) {
        return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024"
        }, [
          createBaseVNode("path", {
            fill: "currentColor",
            d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256m0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4"
          })
        ]));
      }
    });
    var warning_filled_default = warning_filled_vue_vue_type_script_setup_true_lang_default;
    const epPropKey = "__epPropKey";
    const definePropType = (val) => val;
    const isEpProp = (val) => isObject$1(val) && !!val[epPropKey];
    const buildProp = (prop, key2) => {
      if (!isObject$1(prop) || isEpProp(prop))
        return prop;
      const { values, required: required2, default: defaultValue, type: type2, validator } = prop;
      const _validator = values || validator ? (val) => {
        let valid = false;
        let allowedValues = [];
        if (values) {
          allowedValues = Array.from(values);
          if (hasOwn(prop, "default")) {
            allowedValues.push(defaultValue);
          }
          valid || (valid = allowedValues.includes(val));
        }
        if (validator)
          valid || (valid = validator(val));
        if (!valid && allowedValues.length > 0) {
          const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(", ");
          warn(`Invalid prop: validation failed${key2 ? ` for prop "${key2}"` : ""}. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`);
        }
        return valid;
      } : void 0;
      const epProp = {
        type: type2,
        required: !!required2,
        validator: _validator,
        [epPropKey]: true
      };
      if (hasOwn(prop, "default"))
        epProp.default = defaultValue;
      return epProp;
    };
    const buildProps = (props) => fromPairs(Object.entries(props).map(([key2, option]) => [
      key2,
      buildProp(option, key2)
    ]));
    const iconPropType = definePropType([
      String,
      Object,
      Function
    ]);
    const CloseComponents = {
      Close: close_default
    };
    const TypeComponents = {
      Close: close_default,
      SuccessFilled: success_filled_default,
      InfoFilled: info_filled_default,
      WarningFilled: warning_filled_default,
      CircleCloseFilled: circle_close_filled_default
    };
    const TypeComponentsMap = {
      success: success_filled_default,
      warning: warning_filled_default,
      error: circle_close_filled_default,
      info: info_filled_default
    };
    const ValidateComponentsMap = {
      validating: loading_default,
      success: circle_check_default,
      error: circle_close_default
    };
    const withInstall = (main, extra) => {
      main.install = (app) => {
        for (const comp of [main, ...Object.values(extra != null ? extra : {})]) {
          app.component(comp.name, comp);
        }
      };
      if (extra) {
        for (const [key2, comp] of Object.entries(extra)) {
          main[key2] = comp;
        }
      }
      return main;
    };
    const withInstallFunction = (fn2, name) => {
      fn2.install = (app) => {
        fn2._context = app._context;
        app.config.globalProperties[name] = fn2;
      };
      return fn2;
    };
    const withInstallDirective = (directive, name) => {
      directive.install = (app) => {
        app.directive(name, directive);
      };
      return directive;
    };
    const withNoopInstall = (component) => {
      component.install = NOOP;
      return component;
    };
    const composeRefs = (...refs) => {
      return (el) => {
        refs.forEach((ref2) => {
          if (isFunction$1(ref2)) {
            ref2(el);
          } else {
            ref2.value = el;
          }
        });
      };
    };
    const EVENT_CODE = {
      tab: "Tab",
      enter: "Enter",
      space: "Space",
      left: "ArrowLeft",
      up: "ArrowUp",
      right: "ArrowRight",
      down: "ArrowDown",
      esc: "Escape",
      delete: "Delete",
      backspace: "Backspace",
      numpadEnter: "NumpadEnter",
      pageUp: "PageUp",
      pageDown: "PageDown",
      home: "Home",
      end: "End"
    };
    const UPDATE_MODEL_EVENT = "update:modelValue";
    const CHANGE_EVENT = "change";
    const INPUT_EVENT = "input";
    const componentSizes = ["", "default", "small", "large"];
    const isValidComponentSize = (val) => ["", ...componentSizes].includes(val);
    var PatchFlags = /* @__PURE__ */ ((PatchFlags2) => {
      PatchFlags2[PatchFlags2["TEXT"] = 1] = "TEXT";
      PatchFlags2[PatchFlags2["CLASS"] = 2] = "CLASS";
      PatchFlags2[PatchFlags2["STYLE"] = 4] = "STYLE";
      PatchFlags2[PatchFlags2["PROPS"] = 8] = "PROPS";
      PatchFlags2[PatchFlags2["FULL_PROPS"] = 16] = "FULL_PROPS";
      PatchFlags2[PatchFlags2["HYDRATE_EVENTS"] = 32] = "HYDRATE_EVENTS";
      PatchFlags2[PatchFlags2["STABLE_FRAGMENT"] = 64] = "STABLE_FRAGMENT";
      PatchFlags2[PatchFlags2["KEYED_FRAGMENT"] = 128] = "KEYED_FRAGMENT";
      PatchFlags2[PatchFlags2["UNKEYED_FRAGMENT"] = 256] = "UNKEYED_FRAGMENT";
      PatchFlags2[PatchFlags2["NEED_PATCH"] = 512] = "NEED_PATCH";
      PatchFlags2[PatchFlags2["DYNAMIC_SLOTS"] = 1024] = "DYNAMIC_SLOTS";
      PatchFlags2[PatchFlags2["HOISTED"] = -1] = "HOISTED";
      PatchFlags2[PatchFlags2["BAIL"] = -2] = "BAIL";
      return PatchFlags2;
    })(PatchFlags || {});
    const isKorean = (text) => /([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(text);
    const mutable = (val) => val;
    const DEFAULT_EXCLUDE_KEYS = ["class", "style"];
    const LISTENER_PREFIX = /^on[A-Z]/;
    const useAttrs = (params = {}) => {
      const { excludeListeners = false, excludeKeys } = params;
      const allExcludeKeys = computed(() => {
        return ((excludeKeys == null ? void 0 : excludeKeys.value) || []).concat(DEFAULT_EXCLUDE_KEYS);
      });
      const instance = getCurrentInstance();
      if (!instance) {
        return computed(() => ({}));
      }
      return computed(() => {
        var _a2;
        return fromPairs(Object.entries((_a2 = instance.proxy) == null ? void 0 : _a2.$attrs).filter(([key2]) => !allExcludeKeys.value.includes(key2) && !(excludeListeners && LISTENER_PREFIX.test(key2))));
      });
    };
    const useDeprecated = ({ from, replacement, scope, version: version2, ref: ref2, type: type2 = "API" }, condition) => {
      watch(() => unref(condition), (val) => {
      }, {
        immediate: true
      });
    };
    const useDraggable = (targetRef, dragRef, draggable, overflow) => {
      let transform = {
        offsetX: 0,
        offsetY: 0
      };
      const onMousedown = (e) => {
        const downX = e.clientX;
        const downY = e.clientY;
        const { offsetX, offsetY } = transform;
        const targetRect = targetRef.value.getBoundingClientRect();
        const targetLeft = targetRect.left;
        const targetTop = targetRect.top;
        const targetWidth = targetRect.width;
        const targetHeight = targetRect.height;
        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;
        const minLeft = -targetLeft + offsetX;
        const minTop = -targetTop + offsetY;
        const maxLeft = clientWidth - targetLeft - targetWidth + offsetX;
        const maxTop = clientHeight - targetTop - targetHeight + offsetY;
        const onMousemove = (e2) => {
          let moveX = offsetX + e2.clientX - downX;
          let moveY = offsetY + e2.clientY - downY;
          if (!(overflow == null ? void 0 : overflow.value)) {
            moveX = Math.min(Math.max(moveX, minLeft), maxLeft);
            moveY = Math.min(Math.max(moveY, minTop), maxTop);
          }
          transform = {
            offsetX: moveX,
            offsetY: moveY
          };
          if (targetRef.value) {
            targetRef.value.style.transform = `translate(${addUnit(moveX)}, ${addUnit(moveY)})`;
          }
        };
        const onMouseup = () => {
          document.removeEventListener("mousemove", onMousemove);
          document.removeEventListener("mouseup", onMouseup);
        };
        document.addEventListener("mousemove", onMousemove);
        document.addEventListener("mouseup", onMouseup);
      };
      const onDraggable = () => {
        if (dragRef.value && targetRef.value) {
          dragRef.value.addEventListener("mousedown", onMousedown);
        }
      };
      const offDraggable = () => {
        if (dragRef.value && targetRef.value) {
          dragRef.value.removeEventListener("mousedown", onMousedown);
        }
      };
      onMounted(() => {
        watchEffect(() => {
          if (draggable.value) {
            onDraggable();
          } else {
            offDraggable();
          }
        });
      });
      onBeforeUnmount(() => {
        offDraggable();
      });
    };
    var English = {
      name: "en",
      el: {
        breadcrumb: {
          label: "Breadcrumb"
        },
        colorpicker: {
          confirm: "OK",
          clear: "Clear",
          defaultLabel: "color picker",
          description: "current color is {color}. press enter to select a new color."
        },
        datepicker: {
          now: "Now",
          today: "Today",
          cancel: "Cancel",
          clear: "Clear",
          confirm: "OK",
          dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
          monthTablePrompt: "Use the arrow keys and enter to select the month",
          yearTablePrompt: "Use the arrow keys and enter to select the year",
          selectedDate: "Selected date",
          selectDate: "Select date",
          selectTime: "Select time",
          startDate: "Start Date",
          startTime: "Start Time",
          endDate: "End Date",
          endTime: "End Time",
          prevYear: "Previous Year",
          nextYear: "Next Year",
          prevMonth: "Previous Month",
          nextMonth: "Next Month",
          year: "",
          month1: "January",
          month2: "February",
          month3: "March",
          month4: "April",
          month5: "May",
          month6: "June",
          month7: "July",
          month8: "August",
          month9: "September",
          month10: "October",
          month11: "November",
          month12: "December",
          week: "week",
          weeks: {
            sun: "Sun",
            mon: "Mon",
            tue: "Tue",
            wed: "Wed",
            thu: "Thu",
            fri: "Fri",
            sat: "Sat"
          },
          weeksFull: {
            sun: "Sunday",
            mon: "Monday",
            tue: "Tuesday",
            wed: "Wednesday",
            thu: "Thursday",
            fri: "Friday",
            sat: "Saturday"
          },
          months: {
            jan: "Jan",
            feb: "Feb",
            mar: "Mar",
            apr: "Apr",
            may: "May",
            jun: "Jun",
            jul: "Jul",
            aug: "Aug",
            sep: "Sep",
            oct: "Oct",
            nov: "Nov",
            dec: "Dec"
          }
        },
        inputNumber: {
          decrease: "decrease number",
          increase: "increase number"
        },
        select: {
          loading: "Loading",
          noMatch: "No matching data",
          noData: "No data",
          placeholder: "Select"
        },
        dropdown: {
          toggleDropdown: "Toggle Dropdown"
        },
        cascader: {
          noMatch: "No matching data",
          loading: "Loading",
          placeholder: "Select",
          noData: "No data"
        },
        pagination: {
          goto: "Go to",
          pagesize: "/page",
          total: "Total {total}",
          pageClassifier: "",
          page: "Page",
          prev: "Go to previous page",
          next: "Go to next page",
          currentPage: "page {pager}",
          prevPages: "Previous {pager} pages",
          nextPages: "Next {pager} pages",
          deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
        },
        dialog: {
          close: "Close this dialog"
        },
        drawer: {
          close: "Close this dialog"
        },
        messagebox: {
          title: "Message",
          confirm: "OK",
          cancel: "Cancel",
          error: "Illegal input",
          close: "Close this dialog"
        },
        upload: {
          deleteTip: "press delete to remove",
          delete: "Delete",
          preview: "Preview",
          continue: "Continue"
        },
        slider: {
          defaultLabel: "slider between {min} and {max}",
          defaultRangeStartLabel: "pick start value",
          defaultRangeEndLabel: "pick end value"
        },
        table: {
          emptyText: "No Data",
          confirmFilter: "Confirm",
          resetFilter: "Reset",
          clearFilter: "All",
          sumText: "Sum"
        },
        tour: {
          next: "Next",
          previous: "Previous",
          finish: "Finish"
        },
        tree: {
          emptyText: "No Data"
        },
        transfer: {
          noMatch: "No matching data",
          noData: "No data",
          titles: ["List 1", "List 2"],
          filterPlaceholder: "Enter keyword",
          noCheckedFormat: "{total} items",
          hasCheckedFormat: "{checked}/{total} checked"
        },
        image: {
          error: "FAILED"
        },
        pageHeader: {
          title: "Back"
        },
        popconfirm: {
          confirmButtonText: "Yes",
          cancelButtonText: "No"
        },
        carousel: {
          leftArrow: "Carousel arrow left",
          rightArrow: "Carousel arrow right",
          indicator: "Carousel switch to index {index}"
        }
      }
    };
    const buildTranslator = (locale) => (path, option) => translate(path, option, unref(locale));
    const translate = (path, option, locale) => get(locale, path, path).replace(/\{(\w+)\}/g, (_, key2) => {
      var _a2;
      return `${(_a2 = option == null ? void 0 : option[key2]) != null ? _a2 : `{${key2}}`}`;
    });
    const buildLocaleContext = (locale) => {
      const lang = computed(() => unref(locale).name);
      const localeRef = isRef(locale) ? locale : ref(locale);
      return {
        lang,
        locale: localeRef,
        t: buildTranslator(locale)
      };
    };
    const localeContextKey = Symbol("localeContextKey");
    const useLocale = (localeOverrides) => {
      const locale = localeOverrides || inject(localeContextKey, ref());
      return buildLocaleContext(computed(() => locale.value || English));
    };
    const defaultNamespace = "el";
    const statePrefix = "is-";
    const _bem = (namespace, block, blockSuffix, element, modifier) => {
      let cls = `${namespace}-${block}`;
      if (blockSuffix) {
        cls += `-${blockSuffix}`;
      }
      if (element) {
        cls += `__${element}`;
      }
      if (modifier) {
        cls += `--${modifier}`;
      }
      return cls;
    };
    const namespaceContextKey = Symbol("namespaceContextKey");
    const useGetDerivedNamespace = (namespaceOverrides) => {
      const derivedNamespace = namespaceOverrides || (getCurrentInstance() ? inject(namespaceContextKey, ref(defaultNamespace)) : ref(defaultNamespace));
      const namespace = computed(() => {
        return unref(derivedNamespace) || defaultNamespace;
      });
      return namespace;
    };
    const useNamespace = (block, namespaceOverrides) => {
      const namespace = useGetDerivedNamespace(namespaceOverrides);
      const b = (blockSuffix = "") => _bem(namespace.value, block, blockSuffix, "", "");
      const e = (element) => element ? _bem(namespace.value, block, "", element, "") : "";
      const m = (modifier) => modifier ? _bem(namespace.value, block, "", "", modifier) : "";
      const be2 = (blockSuffix, element) => blockSuffix && element ? _bem(namespace.value, block, blockSuffix, element, "") : "";
      const em = (element, modifier) => element && modifier ? _bem(namespace.value, block, "", element, modifier) : "";
      const bm = (blockSuffix, modifier) => blockSuffix && modifier ? _bem(namespace.value, block, blockSuffix, "", modifier) : "";
      const bem = (blockSuffix, element, modifier) => blockSuffix && element && modifier ? _bem(namespace.value, block, blockSuffix, element, modifier) : "";
      const is = (name, ...args) => {
        const state = args.length >= 1 ? args[0] : true;
        return name && state ? `${statePrefix}${name}` : "";
      };
      const cssVar = (object2) => {
        const styles = {};
        for (const key2 in object2) {
          if (object2[key2]) {
            styles[`--${namespace.value}-${key2}`] = object2[key2];
          }
        }
        return styles;
      };
      const cssVarBlock = (object2) => {
        const styles = {};
        for (const key2 in object2) {
          if (object2[key2]) {
            styles[`--${namespace.value}-${block}-${key2}`] = object2[key2];
          }
        }
        return styles;
      };
      const cssVarName = (name) => `--${namespace.value}-${name}`;
      const cssVarBlockName = (name) => `--${namespace.value}-${block}-${name}`;
      return {
        namespace,
        b,
        e,
        m,
        be: be2,
        em,
        bm,
        bem,
        is,
        cssVar,
        cssVarName,
        cssVarBlock,
        cssVarBlockName
      };
    };
    const useLockscreen = (trigger2, options = {}) => {
      if (!isRef(trigger2)) {
        throwError("[useLockscreen]", "You need to pass a ref param to this function");
      }
      const ns = options.ns || useNamespace("popup");
      const hiddenCls = computed$1(() => ns.bm("parent", "hidden"));
      if (!isClient || hasClass(document.body, hiddenCls.value)) {
        return;
      }
      let scrollBarWidth2 = 0;
      let withoutHiddenClass = false;
      let bodyWidth = "0";
      const cleanup = () => {
        setTimeout(() => {
          removeClass(document == null ? void 0 : document.body, hiddenCls.value);
          if (withoutHiddenClass && document) {
            document.body.style.width = bodyWidth;
          }
        }, 200);
      };
      watch(trigger2, (val) => {
        if (!val) {
          cleanup();
          return;
        }
        withoutHiddenClass = !hasClass(document.body, hiddenCls.value);
        if (withoutHiddenClass) {
          bodyWidth = document.body.style.width;
        }
        scrollBarWidth2 = getScrollBarWidth(ns.namespace.value);
        const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
        const bodyOverflowY = getStyle(document.body, "overflowY");
        if (scrollBarWidth2 > 0 && (bodyHasOverflow || bodyOverflowY === "scroll") && withoutHiddenClass) {
          document.body.style.width = `calc(100% - ${scrollBarWidth2}px)`;
        }
        addClass(document.body, hiddenCls.value);
      });
      onScopeDispose(() => cleanup());
    };
    const _prop = buildProp({
      type: definePropType(Boolean),
      default: null
    });
    const _event = buildProp({
      type: definePropType(Function)
    });
    const createModelToggleComposable = (name) => {
      const updateEventKey = `update:${name}`;
      const updateEventKeyRaw2 = `onUpdate:${name}`;
      const useModelToggleEmits2 = [updateEventKey];
      const useModelToggleProps2 = {
        [name]: _prop,
        [updateEventKeyRaw2]: _event
      };
      const useModelToggle2 = ({
        indicator,
        toggleReason,
        shouldHideWhenRouteChanges,
        shouldProceed,
        onShow,
        onHide
      }) => {
        const instance = getCurrentInstance();
        const { emit: emit2 } = instance;
        const props = instance.props;
        const hasUpdateHandler = computed(() => isFunction$1(props[updateEventKeyRaw2]));
        const isModelBindingAbsent = computed(() => props[name] === null);
        const doShow = (event) => {
          if (indicator.value === true) {
            return;
          }
          indicator.value = true;
          if (toggleReason) {
            toggleReason.value = event;
          }
          if (isFunction$1(onShow)) {
            onShow(event);
          }
        };
        const doHide = (event) => {
          if (indicator.value === false) {
            return;
          }
          indicator.value = false;
          if (toggleReason) {
            toggleReason.value = event;
          }
          if (isFunction$1(onHide)) {
            onHide(event);
          }
        };
        const show = (event) => {
          if (props.disabled === true || isFunction$1(shouldProceed) && !shouldProceed())
            return;
          const shouldEmit = hasUpdateHandler.value && isClient;
          if (shouldEmit) {
            emit2(updateEventKey, true);
          }
          if (isModelBindingAbsent.value || !shouldEmit) {
            doShow(event);
          }
        };
        const hide = (event) => {
          if (props.disabled === true || !isClient)
            return;
          const shouldEmit = hasUpdateHandler.value && isClient;
          if (shouldEmit) {
            emit2(updateEventKey, false);
          }
          if (isModelBindingAbsent.value || !shouldEmit) {
            doHide(event);
          }
        };
        const onChange = (val) => {
          if (!isBoolean(val))
            return;
          if (props.disabled && val) {
            if (hasUpdateHandler.value) {
              emit2(updateEventKey, false);
            }
          } else if (indicator.value !== val) {
            if (val) {
              doShow();
            } else {
              doHide();
            }
          }
        };
        const toggle = () => {
          if (indicator.value) {
            hide();
          } else {
            show();
          }
        };
        watch(() => props[name], onChange);
        if (shouldHideWhenRouteChanges && instance.appContext.config.globalProperties.$route !== void 0) {
          watch(() => ({
            ...instance.proxy.$route
          }), () => {
            if (shouldHideWhenRouteChanges.value && indicator.value) {
              hide();
            }
          });
        }
        onMounted(() => {
          onChange(props[name]);
        });
        return {
          hide,
          show,
          toggle,
          hasUpdateHandler
        };
      };
      return {
        useModelToggle: useModelToggle2,
        useModelToggleProps: useModelToggleProps2,
        useModelToggleEmits: useModelToggleEmits2
      };
    };
    createModelToggleComposable("modelValue");
    const useProp = (name) => {
      const vm = getCurrentInstance();
      return computed(() => {
        var _a2, _b;
        return (_b = (_a2 = vm == null ? void 0 : vm.proxy) == null ? void 0 : _a2.$props) == null ? void 0 : _b[name];
      });
    };
    var E = "top", R = "bottom", W = "right", P = "left", me = "auto", G = [E, R, W, P], U = "start", J = "end", Xe = "clippingParents", je = "viewport", K = "popper", Ye = "reference", De = G.reduce(function(t, e) {
      return t.concat([e + "-" + U, e + "-" + J]);
    }, []), Ee = [].concat(G, [me]).reduce(function(t, e) {
      return t.concat([e, e + "-" + U, e + "-" + J]);
    }, []), Ge = "beforeRead", Je = "read", Ke = "afterRead", Qe = "beforeMain", Ze = "main", et = "afterMain", tt = "beforeWrite", nt = "write", rt = "afterWrite", ot = [Ge, Je, Ke, Qe, Ze, et, tt, nt, rt];
    function C(t) {
      return t ? (t.nodeName || "").toLowerCase() : null;
    }
    function H(t) {
      if (t == null)
        return window;
      if (t.toString() !== "[object Window]") {
        var e = t.ownerDocument;
        return e && e.defaultView || window;
      }
      return t;
    }
    function Q(t) {
      var e = H(t).Element;
      return t instanceof e || t instanceof Element;
    }
    function B(t) {
      var e = H(t).HTMLElement;
      return t instanceof e || t instanceof HTMLElement;
    }
    function Pe(t) {
      if (typeof ShadowRoot == "undefined")
        return false;
      var e = H(t).ShadowRoot;
      return t instanceof e || t instanceof ShadowRoot;
    }
    function Mt(t) {
      var e = t.state;
      Object.keys(e.elements).forEach(function(n) {
        var r = e.styles[n] || {}, o = e.attributes[n] || {}, i = e.elements[n];
        !B(i) || !C(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(a) {
          var s = o[a];
          s === false ? i.removeAttribute(a) : i.setAttribute(a, s === true ? "" : s);
        }));
      });
    }
    function Rt(t) {
      var e = t.state, n = { popper: { position: e.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };
      return Object.assign(e.elements.popper.style, n.popper), e.styles = n, e.elements.arrow && Object.assign(e.elements.arrow.style, n.arrow), function() {
        Object.keys(e.elements).forEach(function(r) {
          var o = e.elements[r], i = e.attributes[r] || {}, a = Object.keys(e.styles.hasOwnProperty(r) ? e.styles[r] : n[r]), s = a.reduce(function(f, c2) {
            return f[c2] = "", f;
          }, {});
          !B(o) || !C(o) || (Object.assign(o.style, s), Object.keys(i).forEach(function(f) {
            o.removeAttribute(f);
          }));
        });
      };
    }
    var Ae = { name: "applyStyles", enabled: true, phase: "write", fn: Mt, effect: Rt, requires: ["computeStyles"] };
    function q(t) {
      return t.split("-")[0];
    }
    var X = Math.max, ve = Math.min, Z = Math.round;
    function ee(t, e) {
      e === void 0 && (e = false);
      var n = t.getBoundingClientRect(), r = 1, o = 1;
      if (B(t) && e) {
        var i = t.offsetHeight, a = t.offsetWidth;
        a > 0 && (r = Z(n.width) / a || 1), i > 0 && (o = Z(n.height) / i || 1);
      }
      return { width: n.width / r, height: n.height / o, top: n.top / o, right: n.right / r, bottom: n.bottom / o, left: n.left / r, x: n.left / r, y: n.top / o };
    }
    function ke(t) {
      var e = ee(t), n = t.offsetWidth, r = t.offsetHeight;
      return Math.abs(e.width - n) <= 1 && (n = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), { x: t.offsetLeft, y: t.offsetTop, width: n, height: r };
    }
    function it(t, e) {
      var n = e.getRootNode && e.getRootNode();
      if (t.contains(e))
        return true;
      if (n && Pe(n)) {
        var r = e;
        do {
          if (r && t.isSameNode(r))
            return true;
          r = r.parentNode || r.host;
        } while (r);
      }
      return false;
    }
    function N(t) {
      return H(t).getComputedStyle(t);
    }
    function Wt(t) {
      return ["table", "td", "th"].indexOf(C(t)) >= 0;
    }
    function I(t) {
      return ((Q(t) ? t.ownerDocument : t.document) || window.document).documentElement;
    }
    function ge(t) {
      return C(t) === "html" ? t : t.assignedSlot || t.parentNode || (Pe(t) ? t.host : null) || I(t);
    }
    function at(t) {
      return !B(t) || N(t).position === "fixed" ? null : t.offsetParent;
    }
    function Bt(t) {
      var e = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1, n = navigator.userAgent.indexOf("Trident") !== -1;
      if (n && B(t)) {
        var r = N(t);
        if (r.position === "fixed")
          return null;
      }
      var o = ge(t);
      for (Pe(o) && (o = o.host); B(o) && ["html", "body"].indexOf(C(o)) < 0; ) {
        var i = N(o);
        if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || e && i.willChange === "filter" || e && i.filter && i.filter !== "none")
          return o;
        o = o.parentNode;
      }
      return null;
    }
    function se(t) {
      for (var e = H(t), n = at(t); n && Wt(n) && N(n).position === "static"; )
        n = at(n);
      return n && (C(n) === "html" || C(n) === "body" && N(n).position === "static") ? e : n || Bt(t) || e;
    }
    function Le(t) {
      return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
    }
    function fe(t, e, n) {
      return X(t, ve(e, n));
    }
    function St(t, e, n) {
      var r = fe(t, e, n);
      return r > n ? n : r;
    }
    function st() {
      return { top: 0, right: 0, bottom: 0, left: 0 };
    }
    function ft(t) {
      return Object.assign({}, st(), t);
    }
    function ct(t, e) {
      return e.reduce(function(n, r) {
        return n[r] = t, n;
      }, {});
    }
    var Tt = function(t, e) {
      return t = typeof t == "function" ? t(Object.assign({}, e.rects, { placement: e.placement })) : t, ft(typeof t != "number" ? t : ct(t, G));
    };
    function Ht(t) {
      var e, n = t.state, r = t.name, o = t.options, i = n.elements.arrow, a = n.modifiersData.popperOffsets, s = q(n.placement), f = Le(s), c2 = [P, W].indexOf(s) >= 0, u = c2 ? "height" : "width";
      if (!(!i || !a)) {
        var m = Tt(o.padding, n), v = ke(i), l = f === "y" ? E : P, h2 = f === "y" ? R : W, p2 = n.rects.reference[u] + n.rects.reference[f] - a[f] - n.rects.popper[u], g = a[f] - n.rects.reference[f], x = se(i), y = x ? f === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, $ = p2 / 2 - g / 2, d = m[l], b = y - v[u] - m[h2], w = y / 2 - v[u] / 2 + $, O = fe(d, w, b), j = f;
        n.modifiersData[r] = (e = {}, e[j] = O, e.centerOffset = O - w, e);
      }
    }
    function Ct(t) {
      var e = t.state, n = t.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
      o != null && (typeof o == "string" && (o = e.elements.popper.querySelector(o), !o) || !it(e.elements.popper, o) || (e.elements.arrow = o));
    }
    var pt = { name: "arrow", enabled: true, phase: "main", fn: Ht, effect: Ct, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"] };
    function te(t) {
      return t.split("-")[1];
    }
    var qt = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
    function Vt(t) {
      var e = t.x, n = t.y, r = window, o = r.devicePixelRatio || 1;
      return { x: Z(e * o) / o || 0, y: Z(n * o) / o || 0 };
    }
    function ut(t) {
      var e, n = t.popper, r = t.popperRect, o = t.placement, i = t.variation, a = t.offsets, s = t.position, f = t.gpuAcceleration, c2 = t.adaptive, u = t.roundOffsets, m = t.isFixed, v = a.x, l = v === void 0 ? 0 : v, h2 = a.y, p2 = h2 === void 0 ? 0 : h2, g = typeof u == "function" ? u({ x: l, y: p2 }) : { x: l, y: p2 };
      l = g.x, p2 = g.y;
      var x = a.hasOwnProperty("x"), y = a.hasOwnProperty("y"), $ = P, d = E, b = window;
      if (c2) {
        var w = se(n), O = "clientHeight", j = "clientWidth";
        if (w === H(n) && (w = I(n), N(w).position !== "static" && s === "absolute" && (O = "scrollHeight", j = "scrollWidth")), w = w, o === E || (o === P || o === W) && i === J) {
          d = R;
          var A = m && w === b && b.visualViewport ? b.visualViewport.height : w[O];
          p2 -= A - r.height, p2 *= f ? 1 : -1;
        }
        if (o === P || (o === E || o === R) && i === J) {
          $ = W;
          var k = m && w === b && b.visualViewport ? b.visualViewport.width : w[j];
          l -= k - r.width, l *= f ? 1 : -1;
        }
      }
      var D = Object.assign({ position: s }, c2 && qt), S = u === true ? Vt({ x: l, y: p2 }) : { x: l, y: p2 };
      if (l = S.x, p2 = S.y, f) {
        var L;
        return Object.assign({}, D, (L = {}, L[d] = y ? "0" : "", L[$] = x ? "0" : "", L.transform = (b.devicePixelRatio || 1) <= 1 ? "translate(" + l + "px, " + p2 + "px)" : "translate3d(" + l + "px, " + p2 + "px, 0)", L));
      }
      return Object.assign({}, D, (e = {}, e[d] = y ? p2 + "px" : "", e[$] = x ? l + "px" : "", e.transform = "", e));
    }
    function Nt(t) {
      var e = t.state, n = t.options, r = n.gpuAcceleration, o = r === void 0 ? true : r, i = n.adaptive, a = i === void 0 ? true : i, s = n.roundOffsets, f = s === void 0 ? true : s, c2 = { placement: q(e.placement), variation: te(e.placement), popper: e.elements.popper, popperRect: e.rects.popper, gpuAcceleration: o, isFixed: e.options.strategy === "fixed" };
      e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, ut(Object.assign({}, c2, { offsets: e.modifiersData.popperOffsets, position: e.options.strategy, adaptive: a, roundOffsets: f })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, ut(Object.assign({}, c2, { offsets: e.modifiersData.arrow, position: "absolute", adaptive: false, roundOffsets: f })))), e.attributes.popper = Object.assign({}, e.attributes.popper, { "data-popper-placement": e.placement });
    }
    var Me = { name: "computeStyles", enabled: true, phase: "beforeWrite", fn: Nt, data: {} }, ye = { passive: true };
    function It(t) {
      var e = t.state, n = t.instance, r = t.options, o = r.scroll, i = o === void 0 ? true : o, a = r.resize, s = a === void 0 ? true : a, f = H(e.elements.popper), c2 = [].concat(e.scrollParents.reference, e.scrollParents.popper);
      return i && c2.forEach(function(u) {
        u.addEventListener("scroll", n.update, ye);
      }), s && f.addEventListener("resize", n.update, ye), function() {
        i && c2.forEach(function(u) {
          u.removeEventListener("scroll", n.update, ye);
        }), s && f.removeEventListener("resize", n.update, ye);
      };
    }
    var Re = { name: "eventListeners", enabled: true, phase: "write", fn: function() {
    }, effect: It, data: {} }, _t = { left: "right", right: "left", bottom: "top", top: "bottom" };
    function be(t) {
      return t.replace(/left|right|bottom|top/g, function(e) {
        return _t[e];
      });
    }
    var zt = { start: "end", end: "start" };
    function lt(t) {
      return t.replace(/start|end/g, function(e) {
        return zt[e];
      });
    }
    function We(t) {
      var e = H(t), n = e.pageXOffset, r = e.pageYOffset;
      return { scrollLeft: n, scrollTop: r };
    }
    function Be(t) {
      return ee(I(t)).left + We(t).scrollLeft;
    }
    function Ft(t) {
      var e = H(t), n = I(t), r = e.visualViewport, o = n.clientWidth, i = n.clientHeight, a = 0, s = 0;
      return r && (o = r.width, i = r.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (a = r.offsetLeft, s = r.offsetTop)), { width: o, height: i, x: a + Be(t), y: s };
    }
    function Ut(t) {
      var e, n = I(t), r = We(t), o = (e = t.ownerDocument) == null ? void 0 : e.body, i = X(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), a = X(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), s = -r.scrollLeft + Be(t), f = -r.scrollTop;
      return N(o || n).direction === "rtl" && (s += X(n.clientWidth, o ? o.clientWidth : 0) - i), { width: i, height: a, x: s, y: f };
    }
    function Se(t) {
      var e = N(t), n = e.overflow, r = e.overflowX, o = e.overflowY;
      return /auto|scroll|overlay|hidden/.test(n + o + r);
    }
    function dt(t) {
      return ["html", "body", "#document"].indexOf(C(t)) >= 0 ? t.ownerDocument.body : B(t) && Se(t) ? t : dt(ge(t));
    }
    function ce(t, e) {
      var n;
      e === void 0 && (e = []);
      var r = dt(t), o = r === ((n = t.ownerDocument) == null ? void 0 : n.body), i = H(r), a = o ? [i].concat(i.visualViewport || [], Se(r) ? r : []) : r, s = e.concat(a);
      return o ? s : s.concat(ce(ge(a)));
    }
    function Te(t) {
      return Object.assign({}, t, { left: t.x, top: t.y, right: t.x + t.width, bottom: t.y + t.height });
    }
    function Xt(t) {
      var e = ee(t);
      return e.top = e.top + t.clientTop, e.left = e.left + t.clientLeft, e.bottom = e.top + t.clientHeight, e.right = e.left + t.clientWidth, e.width = t.clientWidth, e.height = t.clientHeight, e.x = e.left, e.y = e.top, e;
    }
    function ht(t, e) {
      return e === je ? Te(Ft(t)) : Q(e) ? Xt(e) : Te(Ut(I(t)));
    }
    function Yt(t) {
      var e = ce(ge(t)), n = ["absolute", "fixed"].indexOf(N(t).position) >= 0, r = n && B(t) ? se(t) : t;
      return Q(r) ? e.filter(function(o) {
        return Q(o) && it(o, r) && C(o) !== "body";
      }) : [];
    }
    function Gt(t, e, n) {
      var r = e === "clippingParents" ? Yt(t) : [].concat(e), o = [].concat(r, [n]), i = o[0], a = o.reduce(function(s, f) {
        var c2 = ht(t, f);
        return s.top = X(c2.top, s.top), s.right = ve(c2.right, s.right), s.bottom = ve(c2.bottom, s.bottom), s.left = X(c2.left, s.left), s;
      }, ht(t, i));
      return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
    }
    function mt(t) {
      var e = t.reference, n = t.element, r = t.placement, o = r ? q(r) : null, i = r ? te(r) : null, a = e.x + e.width / 2 - n.width / 2, s = e.y + e.height / 2 - n.height / 2, f;
      switch (o) {
        case E:
          f = { x: a, y: e.y - n.height };
          break;
        case R:
          f = { x: a, y: e.y + e.height };
          break;
        case W:
          f = { x: e.x + e.width, y: s };
          break;
        case P:
          f = { x: e.x - n.width, y: s };
          break;
        default:
          f = { x: e.x, y: e.y };
      }
      var c2 = o ? Le(o) : null;
      if (c2 != null) {
        var u = c2 === "y" ? "height" : "width";
        switch (i) {
          case U:
            f[c2] = f[c2] - (e[u] / 2 - n[u] / 2);
            break;
          case J:
            f[c2] = f[c2] + (e[u] / 2 - n[u] / 2);
            break;
        }
      }
      return f;
    }
    function ne(t, e) {
      e === void 0 && (e = {});
      var n = e, r = n.placement, o = r === void 0 ? t.placement : r, i = n.boundary, a = i === void 0 ? Xe : i, s = n.rootBoundary, f = s === void 0 ? je : s, c2 = n.elementContext, u = c2 === void 0 ? K : c2, m = n.altBoundary, v = m === void 0 ? false : m, l = n.padding, h2 = l === void 0 ? 0 : l, p2 = ft(typeof h2 != "number" ? h2 : ct(h2, G)), g = u === K ? Ye : K, x = t.rects.popper, y = t.elements[v ? g : u], $ = Gt(Q(y) ? y : y.contextElement || I(t.elements.popper), a, f), d = ee(t.elements.reference), b = mt({ reference: d, element: x, strategy: "absolute", placement: o }), w = Te(Object.assign({}, x, b)), O = u === K ? w : d, j = { top: $.top - O.top + p2.top, bottom: O.bottom - $.bottom + p2.bottom, left: $.left - O.left + p2.left, right: O.right - $.right + p2.right }, A = t.modifiersData.offset;
      if (u === K && A) {
        var k = A[o];
        Object.keys(j).forEach(function(D) {
          var S = [W, R].indexOf(D) >= 0 ? 1 : -1, L = [E, R].indexOf(D) >= 0 ? "y" : "x";
          j[D] += k[L] * S;
        });
      }
      return j;
    }
    function Jt(t, e) {
      e === void 0 && (e = {});
      var n = e, r = n.placement, o = n.boundary, i = n.rootBoundary, a = n.padding, s = n.flipVariations, f = n.allowedAutoPlacements, c2 = f === void 0 ? Ee : f, u = te(r), m = u ? s ? De : De.filter(function(h2) {
        return te(h2) === u;
      }) : G, v = m.filter(function(h2) {
        return c2.indexOf(h2) >= 0;
      });
      v.length === 0 && (v = m);
      var l = v.reduce(function(h2, p2) {
        return h2[p2] = ne(t, { placement: p2, boundary: o, rootBoundary: i, padding: a })[q(p2)], h2;
      }, {});
      return Object.keys(l).sort(function(h2, p2) {
        return l[h2] - l[p2];
      });
    }
    function Kt(t) {
      if (q(t) === me)
        return [];
      var e = be(t);
      return [lt(t), e, lt(e)];
    }
    function Qt(t) {
      var e = t.state, n = t.options, r = t.name;
      if (!e.modifiersData[r]._skip) {
        for (var o = n.mainAxis, i = o === void 0 ? true : o, a = n.altAxis, s = a === void 0 ? true : a, f = n.fallbackPlacements, c2 = n.padding, u = n.boundary, m = n.rootBoundary, v = n.altBoundary, l = n.flipVariations, h2 = l === void 0 ? true : l, p2 = n.allowedAutoPlacements, g = e.options.placement, x = q(g), y = x === g, $ = f || (y || !h2 ? [be(g)] : Kt(g)), d = [g].concat($).reduce(function(z, V) {
          return z.concat(q(V) === me ? Jt(e, { placement: V, boundary: u, rootBoundary: m, padding: c2, flipVariations: h2, allowedAutoPlacements: p2 }) : V);
        }, []), b = e.rects.reference, w = e.rects.popper, O = /* @__PURE__ */ new Map(), j = true, A = d[0], k = 0; k < d.length; k++) {
          var D = d[k], S = q(D), L = te(D) === U, re = [E, R].indexOf(S) >= 0, oe = re ? "width" : "height", M = ne(e, { placement: D, boundary: u, rootBoundary: m, altBoundary: v, padding: c2 }), T = re ? L ? W : P : L ? R : E;
          b[oe] > w[oe] && (T = be(T));
          var pe = be(T), _ = [];
          if (i && _.push(M[S] <= 0), s && _.push(M[T] <= 0, M[pe] <= 0), _.every(function(z) {
            return z;
          })) {
            A = D, j = false;
            break;
          }
          O.set(D, _);
        }
        if (j)
          for (var ue = h2 ? 3 : 1, xe = function(z) {
            var V = d.find(function(de) {
              var ae = O.get(de);
              if (ae)
                return ae.slice(0, z).every(function(Y) {
                  return Y;
                });
            });
            if (V)
              return A = V, "break";
          }, ie = ue; ie > 0; ie--) {
            var le = xe(ie);
            if (le === "break")
              break;
          }
        e.placement !== A && (e.modifiersData[r]._skip = true, e.placement = A, e.reset = true);
      }
    }
    var vt = { name: "flip", enabled: true, phase: "main", fn: Qt, requiresIfExists: ["offset"], data: { _skip: false } };
    function gt(t, e, n) {
      return n === void 0 && (n = { x: 0, y: 0 }), { top: t.top - e.height - n.y, right: t.right - e.width + n.x, bottom: t.bottom - e.height + n.y, left: t.left - e.width - n.x };
    }
    function yt(t) {
      return [E, W, R, P].some(function(e) {
        return t[e] >= 0;
      });
    }
    function Zt(t) {
      var e = t.state, n = t.name, r = e.rects.reference, o = e.rects.popper, i = e.modifiersData.preventOverflow, a = ne(e, { elementContext: "reference" }), s = ne(e, { altBoundary: true }), f = gt(a, r), c2 = gt(s, o, i), u = yt(f), m = yt(c2);
      e.modifiersData[n] = { referenceClippingOffsets: f, popperEscapeOffsets: c2, isReferenceHidden: u, hasPopperEscaped: m }, e.attributes.popper = Object.assign({}, e.attributes.popper, { "data-popper-reference-hidden": u, "data-popper-escaped": m });
    }
    var bt = { name: "hide", enabled: true, phase: "main", requiresIfExists: ["preventOverflow"], fn: Zt };
    function en(t, e, n) {
      var r = q(t), o = [P, E].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, e, { placement: t })) : n, a = i[0], s = i[1];
      return a = a || 0, s = (s || 0) * o, [P, W].indexOf(r) >= 0 ? { x: s, y: a } : { x: a, y: s };
    }
    function tn(t) {
      var e = t.state, n = t.options, r = t.name, o = n.offset, i = o === void 0 ? [0, 0] : o, a = Ee.reduce(function(u, m) {
        return u[m] = en(m, e.rects, i), u;
      }, {}), s = a[e.placement], f = s.x, c2 = s.y;
      e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += f, e.modifiersData.popperOffsets.y += c2), e.modifiersData[r] = a;
    }
    var wt = { name: "offset", enabled: true, phase: "main", requires: ["popperOffsets"], fn: tn };
    function nn(t) {
      var e = t.state, n = t.name;
      e.modifiersData[n] = mt({ reference: e.rects.reference, element: e.rects.popper, strategy: "absolute", placement: e.placement });
    }
    var He = { name: "popperOffsets", enabled: true, phase: "read", fn: nn, data: {} };
    function rn(t) {
      return t === "x" ? "y" : "x";
    }
    function on(t) {
      var e = t.state, n = t.options, r = t.name, o = n.mainAxis, i = o === void 0 ? true : o, a = n.altAxis, s = a === void 0 ? false : a, f = n.boundary, c2 = n.rootBoundary, u = n.altBoundary, m = n.padding, v = n.tether, l = v === void 0 ? true : v, h2 = n.tetherOffset, p2 = h2 === void 0 ? 0 : h2, g = ne(e, { boundary: f, rootBoundary: c2, padding: m, altBoundary: u }), x = q(e.placement), y = te(e.placement), $ = !y, d = Le(x), b = rn(d), w = e.modifiersData.popperOffsets, O = e.rects.reference, j = e.rects.popper, A = typeof p2 == "function" ? p2(Object.assign({}, e.rects, { placement: e.placement })) : p2, k = typeof A == "number" ? { mainAxis: A, altAxis: A } : Object.assign({ mainAxis: 0, altAxis: 0 }, A), D = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, S = { x: 0, y: 0 };
      if (w) {
        if (i) {
          var L, re = d === "y" ? E : P, oe = d === "y" ? R : W, M = d === "y" ? "height" : "width", T = w[d], pe = T + g[re], _ = T - g[oe], ue = l ? -j[M] / 2 : 0, xe = y === U ? O[M] : j[M], ie = y === U ? -j[M] : -O[M], le = e.elements.arrow, z = l && le ? ke(le) : { width: 0, height: 0 }, V = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : st(), de = V[re], ae = V[oe], Y = fe(0, O[M], z[M]), jt = $ ? O[M] / 2 - ue - Y - de - k.mainAxis : xe - Y - de - k.mainAxis, Dt = $ ? -O[M] / 2 + ue + Y + ae + k.mainAxis : ie + Y + ae + k.mainAxis, Oe = e.elements.arrow && se(e.elements.arrow), Et = Oe ? d === "y" ? Oe.clientTop || 0 : Oe.clientLeft || 0 : 0, Ce = (L = D == null ? void 0 : D[d]) != null ? L : 0, Pt = T + jt - Ce - Et, At = T + Dt - Ce, qe = fe(l ? ve(pe, Pt) : pe, T, l ? X(_, At) : _);
          w[d] = qe, S[d] = qe - T;
        }
        if (s) {
          var Ve, kt = d === "x" ? E : P, Lt = d === "x" ? R : W, F = w[b], he = b === "y" ? "height" : "width", Ne = F + g[kt], Ie = F - g[Lt], $e = [E, P].indexOf(x) !== -1, _e = (Ve = D == null ? void 0 : D[b]) != null ? Ve : 0, ze = $e ? Ne : F - O[he] - j[he] - _e + k.altAxis, Fe = $e ? F + O[he] + j[he] - _e - k.altAxis : Ie, Ue = l && $e ? St(ze, F, Fe) : fe(l ? ze : Ne, F, l ? Fe : Ie);
          w[b] = Ue, S[b] = Ue - F;
        }
        e.modifiersData[r] = S;
      }
    }
    var xt = { name: "preventOverflow", enabled: true, phase: "main", fn: on, requiresIfExists: ["offset"] };
    function an(t) {
      return { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop };
    }
    function sn(t) {
      return t === H(t) || !B(t) ? We(t) : an(t);
    }
    function fn(t) {
      var e = t.getBoundingClientRect(), n = Z(e.width) / t.offsetWidth || 1, r = Z(e.height) / t.offsetHeight || 1;
      return n !== 1 || r !== 1;
    }
    function cn(t, e, n) {
      n === void 0 && (n = false);
      var r = B(e), o = B(e) && fn(e), i = I(e), a = ee(t, o), s = { scrollLeft: 0, scrollTop: 0 }, f = { x: 0, y: 0 };
      return (r || !r && !n) && ((C(e) !== "body" || Se(i)) && (s = sn(e)), B(e) ? (f = ee(e, true), f.x += e.clientLeft, f.y += e.clientTop) : i && (f.x = Be(i))), { x: a.left + s.scrollLeft - f.x, y: a.top + s.scrollTop - f.y, width: a.width, height: a.height };
    }
    function pn(t) {
      var e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
      t.forEach(function(i) {
        e.set(i.name, i);
      });
      function o(i) {
        n.add(i.name);
        var a = [].concat(i.requires || [], i.requiresIfExists || []);
        a.forEach(function(s) {
          if (!n.has(s)) {
            var f = e.get(s);
            f && o(f);
          }
        }), r.push(i);
      }
      return t.forEach(function(i) {
        n.has(i.name) || o(i);
      }), r;
    }
    function un(t) {
      var e = pn(t);
      return ot.reduce(function(n, r) {
        return n.concat(e.filter(function(o) {
          return o.phase === r;
        }));
      }, []);
    }
    function ln(t) {
      var e;
      return function() {
        return e || (e = new Promise(function(n) {
          Promise.resolve().then(function() {
            e = void 0, n(t());
          });
        })), e;
      };
    }
    function dn(t) {
      var e = t.reduce(function(n, r) {
        var o = n[r.name];
        return n[r.name] = o ? Object.assign({}, o, r, { options: Object.assign({}, o.options, r.options), data: Object.assign({}, o.data, r.data) }) : r, n;
      }, {});
      return Object.keys(e).map(function(n) {
        return e[n];
      });
    }
    var Ot = { placement: "bottom", modifiers: [], strategy: "absolute" };
    function $t() {
      for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
        e[n] = arguments[n];
      return !e.some(function(r) {
        return !(r && typeof r.getBoundingClientRect == "function");
      });
    }
    function we(t) {
      t === void 0 && (t = {});
      var e = t, n = e.defaultModifiers, r = n === void 0 ? [] : n, o = e.defaultOptions, i = o === void 0 ? Ot : o;
      return function(a, s, f) {
        f === void 0 && (f = i);
        var c2 = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, Ot, i), modifiersData: {}, elements: { reference: a, popper: s }, attributes: {}, styles: {} }, u = [], m = false, v = { state: c2, setOptions: function(p2) {
          var g = typeof p2 == "function" ? p2(c2.options) : p2;
          h2(), c2.options = Object.assign({}, i, c2.options, g), c2.scrollParents = { reference: Q(a) ? ce(a) : a.contextElement ? ce(a.contextElement) : [], popper: ce(s) };
          var x = un(dn([].concat(r, c2.options.modifiers)));
          return c2.orderedModifiers = x.filter(function(y) {
            return y.enabled;
          }), l(), v.update();
        }, forceUpdate: function() {
          if (!m) {
            var p2 = c2.elements, g = p2.reference, x = p2.popper;
            if ($t(g, x)) {
              c2.rects = { reference: cn(g, se(x), c2.options.strategy === "fixed"), popper: ke(x) }, c2.reset = false, c2.placement = c2.options.placement, c2.orderedModifiers.forEach(function(j) {
                return c2.modifiersData[j.name] = Object.assign({}, j.data);
              });
              for (var y = 0; y < c2.orderedModifiers.length; y++) {
                if (c2.reset === true) {
                  c2.reset = false, y = -1;
                  continue;
                }
                var $ = c2.orderedModifiers[y], d = $.fn, b = $.options, w = b === void 0 ? {} : b, O = $.name;
                typeof d == "function" && (c2 = d({ state: c2, options: w, name: O, instance: v }) || c2);
              }
            }
          }
        }, update: ln(function() {
          return new Promise(function(p2) {
            v.forceUpdate(), p2(c2);
          });
        }), destroy: function() {
          h2(), m = true;
        } };
        if (!$t(a, s))
          return v;
        v.setOptions(f).then(function(p2) {
          !m && f.onFirstUpdate && f.onFirstUpdate(p2);
        });
        function l() {
          c2.orderedModifiers.forEach(function(p2) {
            var g = p2.name, x = p2.options, y = x === void 0 ? {} : x, $ = p2.effect;
            if (typeof $ == "function") {
              var d = $({ state: c2, name: g, instance: v, options: y }), b = function() {
              };
              u.push(d || b);
            }
          });
        }
        function h2() {
          u.forEach(function(p2) {
            return p2();
          }), u = [];
        }
        return v;
      };
    }
    we();
    var mn = [Re, He, Me, Ae];
    we({ defaultModifiers: mn });
    var gn = [Re, He, Me, Ae, wt, vt, xt, pt, bt], yn = we({ defaultModifiers: gn });
    const usePopper = (referenceElementRef, popperElementRef, opts = {}) => {
      const stateUpdater = {
        name: "updateState",
        enabled: true,
        phase: "write",
        fn: ({ state }) => {
          const derivedState = deriveState(state);
          Object.assign(states.value, derivedState);
        },
        requires: ["computeStyles"]
      };
      const options = computed(() => {
        const { onFirstUpdate, placement, strategy, modifiers } = unref(opts);
        return {
          onFirstUpdate,
          placement: placement || "bottom",
          strategy: strategy || "absolute",
          modifiers: [
            ...modifiers || [],
            stateUpdater,
            { name: "applyStyles", enabled: false }
          ]
        };
      });
      const instanceRef = shallowRef();
      const states = ref({
        styles: {
          popper: {
            position: unref(options).strategy,
            left: "0",
            top: "0"
          },
          arrow: {
            position: "absolute"
          }
        },
        attributes: {}
      });
      const destroy = () => {
        if (!instanceRef.value)
          return;
        instanceRef.value.destroy();
        instanceRef.value = void 0;
      };
      watch(options, (newOptions) => {
        const instance = unref(instanceRef);
        if (instance) {
          instance.setOptions(newOptions);
        }
      }, {
        deep: true
      });
      watch([referenceElementRef, popperElementRef], ([referenceElement, popperElement]) => {
        destroy();
        if (!referenceElement || !popperElement)
          return;
        instanceRef.value = yn(referenceElement, popperElement, unref(options));
      });
      onBeforeUnmount(() => {
        destroy();
      });
      return {
        state: computed(() => {
          var _a2;
          return { ...((_a2 = unref(instanceRef)) == null ? void 0 : _a2.state) || {} };
        }),
        styles: computed(() => unref(states).styles),
        attributes: computed(() => unref(states).attributes),
        update: () => {
          var _a2;
          return (_a2 = unref(instanceRef)) == null ? void 0 : _a2.update();
        },
        forceUpdate: () => {
          var _a2;
          return (_a2 = unref(instanceRef)) == null ? void 0 : _a2.forceUpdate();
        },
        instanceRef: computed(() => unref(instanceRef))
      };
    };
    function deriveState(state) {
      const elements = Object.keys(state.elements);
      const styles = fromPairs(elements.map((element) => [element, state.styles[element] || {}]));
      const attributes = fromPairs(elements.map((element) => [element, state.attributes[element]]));
      return {
        styles,
        attributes
      };
    }
    const useSameTarget = (handleClick) => {
      if (!handleClick) {
        return { onClick: NOOP, onMousedown: NOOP, onMouseup: NOOP };
      }
      let mousedownTarget = false;
      let mouseupTarget = false;
      const onClick = (e) => {
        if (mousedownTarget && mouseupTarget) {
          handleClick(e);
        }
        mousedownTarget = mouseupTarget = false;
      };
      const onMousedown = (e) => {
        mousedownTarget = e.target === e.currentTarget;
      };
      const onMouseup = (e) => {
        mouseupTarget = e.target === e.currentTarget;
      };
      return { onClick, onMousedown, onMouseup };
    };
    function useTimeout() {
      let timeoutHandle;
      const registerTimeout = (fn2, delay) => {
        cancelTimeout();
        timeoutHandle = window.setTimeout(fn2, delay);
      };
      const cancelTimeout = () => window.clearTimeout(timeoutHandle);
      tryOnScopeDispose(() => cancelTimeout());
      return {
        registerTimeout,
        cancelTimeout
      };
    }
    const defaultIdInjection = {
      prefix: Math.floor(Math.random() * 1e4),
      current: 0
    };
    const ID_INJECTION_KEY = Symbol("elIdInjection");
    const useIdInjection = () => {
      return getCurrentInstance() ? inject(ID_INJECTION_KEY, defaultIdInjection) : defaultIdInjection;
    };
    const useId = (deterministicId) => {
      const idInjection = useIdInjection();
      const namespace = useGetDerivedNamespace();
      const idRef = computed(() => unref(deterministicId) || `${namespace.value}-id-${idInjection.prefix}-${idInjection.current++}`);
      return idRef;
    };
    let registeredEscapeHandlers = [];
    const cachedHandler = (e) => {
      const event = e;
      if (event.key === EVENT_CODE.esc) {
        registeredEscapeHandlers.forEach((registeredHandler) => registeredHandler(event));
      }
    };
    const useEscapeKeydown = (handler) => {
      onMounted(() => {
        if (registeredEscapeHandlers.length === 0) {
          document.addEventListener("keydown", cachedHandler);
        }
        if (isClient)
          registeredEscapeHandlers.push(handler);
      });
      onBeforeUnmount(() => {
        registeredEscapeHandlers = registeredEscapeHandlers.filter((registeredHandler) => registeredHandler !== handler);
        if (registeredEscapeHandlers.length === 0) {
          if (isClient)
            document.removeEventListener("keydown", cachedHandler);
        }
      });
    };
    let cachedContainer;
    const usePopperContainerId = () => {
      const namespace = useGetDerivedNamespace();
      const idInjection = useIdInjection();
      const id = computed(() => {
        return `${namespace.value}-popper-container-${idInjection.prefix}`;
      });
      const selector = computed(() => `#${id.value}`);
      return {
        id,
        selector
      };
    };
    const createContainer = (id) => {
      const container = document.createElement("div");
      container.id = id;
      document.body.appendChild(container);
      return container;
    };
    const usePopperContainer = () => {
      const { id, selector } = usePopperContainerId();
      onBeforeMount(() => {
        if (!isClient)
          return;
        if (!cachedContainer && !document.body.querySelector(selector.value)) {
          cachedContainer = createContainer(id.value);
        }
      });
      return {
        id,
        selector
      };
    };
    const useDelayedToggleProps = buildProps({
      showAfter: {
        type: Number,
        default: 0
      },
      hideAfter: {
        type: Number,
        default: 200
      },
      autoClose: {
        type: Number,
        default: 0
      }
    });
    const useDelayedToggle = ({
      showAfter,
      hideAfter,
      autoClose,
      open,
      close: close2
    }) => {
      const { registerTimeout } = useTimeout();
      const {
        registerTimeout: registerTimeoutForAutoClose,
        cancelTimeout: cancelTimeoutForAutoClose
      } = useTimeout();
      const onOpen = (event) => {
        registerTimeout(() => {
          open(event);
          const _autoClose = unref(autoClose);
          if (isNumber(_autoClose) && _autoClose > 0) {
            registerTimeoutForAutoClose(() => {
              close2(event);
            }, _autoClose);
          }
        }, unref(showAfter));
      };
      const onClose = (event) => {
        cancelTimeoutForAutoClose();
        registerTimeout(() => {
          close2(event);
        }, unref(hideAfter));
      };
      return {
        onOpen,
        onClose
      };
    };
    const FORWARD_REF_INJECTION_KEY = Symbol("elForwardRef");
    const useForwardRef = (forwardRef) => {
      const setForwardRef = (el) => {
        forwardRef.value = el;
      };
      provide(FORWARD_REF_INJECTION_KEY, {
        setForwardRef
      });
    };
    const useForwardRefDirective = (setForwardRef) => {
      return {
        mounted(el) {
          setForwardRef(el);
        },
        updated(el) {
          setForwardRef(el);
        },
        unmounted() {
          setForwardRef(null);
        }
      };
    };
    const initial = {
      current: 0
    };
    const zIndex = ref(0);
    const defaultInitialZIndex = 2e3;
    const ZINDEX_INJECTION_KEY = Symbol("elZIndexContextKey");
    const zIndexContextKey = Symbol("zIndexContextKey");
    const useZIndex = (zIndexOverrides) => {
      const increasingInjection = getCurrentInstance() ? inject(ZINDEX_INJECTION_KEY, initial) : initial;
      const zIndexInjection = zIndexOverrides || (getCurrentInstance() ? inject(zIndexContextKey, void 0) : void 0);
      const initialZIndex = computed(() => {
        const zIndexFromInjection = unref(zIndexInjection);
        return isNumber(zIndexFromInjection) ? zIndexFromInjection : defaultInitialZIndex;
      });
      const currentZIndex = computed(() => initialZIndex.value + zIndex.value);
      const nextZIndex = () => {
        increasingInjection.current++;
        zIndex.value = increasingInjection.current;
        return currentZIndex.value;
      };
      if (!isClient && !inject(ZINDEX_INJECTION_KEY))
        ;
      return {
        initialZIndex,
        currentZIndex,
        nextZIndex
      };
    };
    function useCursor(input) {
      const selectionRef = ref();
      function recordCursor() {
        if (input.value == void 0)
          return;
        const { selectionStart, selectionEnd, value } = input.value;
        if (selectionStart == null || selectionEnd == null)
          return;
        const beforeTxt = value.slice(0, Math.max(0, selectionStart));
        const afterTxt = value.slice(Math.max(0, selectionEnd));
        selectionRef.value = {
          selectionStart,
          selectionEnd,
          value,
          beforeTxt,
          afterTxt
        };
      }
      function setCursor() {
        if (input.value == void 0 || selectionRef.value == void 0)
          return;
        const { value } = input.value;
        const { beforeTxt, afterTxt, selectionStart } = selectionRef.value;
        if (beforeTxt == void 0 || afterTxt == void 0 || selectionStart == void 0)
          return;
        let startPos = value.length;
        if (value.endsWith(afterTxt)) {
          startPos = value.length - afterTxt.length;
        } else if (value.startsWith(beforeTxt)) {
          startPos = beforeTxt.length;
        } else {
          const beforeLastChar = beforeTxt[selectionStart - 1];
          const newIndex = value.indexOf(beforeLastChar, selectionStart - 1);
          if (newIndex !== -1) {
            startPos = newIndex + 1;
          }
        }
        input.value.setSelectionRange(startPos, startPos);
      }
      return [recordCursor, setCursor];
    }
    const useSizeProp = buildProp({
      type: String,
      values: componentSizes,
      required: false
    });
    const SIZE_INJECTION_KEY = Symbol("size");
    const useGlobalSize = () => {
      const injectedSize = inject(SIZE_INJECTION_KEY, {});
      return computed(() => {
        return unref(injectedSize.size) || "";
      });
    };
    function useFocusController(target, { afterFocus, beforeBlur, afterBlur } = {}) {
      const instance = getCurrentInstance();
      const { emit: emit2 } = instance;
      const wrapperRef = shallowRef();
      const isFocused = ref(false);
      const handleFocus = (event) => {
        if (isFocused.value)
          return;
        isFocused.value = true;
        emit2("focus", event);
        afterFocus == null ? void 0 : afterFocus();
      };
      const handleBlur = (event) => {
        var _a2;
        const cancelBlur = isFunction$1(beforeBlur) ? beforeBlur(event) : false;
        if (cancelBlur || event.relatedTarget && ((_a2 = wrapperRef.value) == null ? void 0 : _a2.contains(event.relatedTarget)))
          return;
        isFocused.value = false;
        emit2("blur", event);
        afterBlur == null ? void 0 : afterBlur();
      };
      const handleClick = () => {
        var _a2;
        (_a2 = target.value) == null ? void 0 : _a2.focus();
      };
      watch(wrapperRef, (el) => {
        if (el) {
          el.setAttribute("tabindex", "-1");
        }
      });
      useEventListener(wrapperRef, "click", handleClick);
      return {
        wrapperRef,
        isFocused,
        handleFocus,
        handleBlur
      };
    }
    const DEFAULT_EMPTY_VALUES = ["", void 0, null];
    const DEFAULT_VALUE_ON_CLEAR = void 0;
    const useEmptyValuesProps = buildProps({
      emptyValues: Array,
      valueOnClear: {
        type: [String, Number, Boolean, Function],
        default: void 0,
        validator: (val) => isFunction$1(val) ? !val() : !val
      }
    });
    const useEmptyValues = (props, defaultValue) => {
      const config = useGlobalConfig();
      config.value = config.value || {};
      const emptyValues = computed(() => props.emptyValues || config.value.emptyValues || DEFAULT_EMPTY_VALUES);
      const valueOnClear = computed(() => {
        if (isFunction$1(props.valueOnClear)) {
          return props.valueOnClear();
        } else if (props.valueOnClear !== void 0) {
          return props.valueOnClear;
        } else if (isFunction$1(config.value.valueOnClear)) {
          return config.value.valueOnClear();
        } else if (config.value.valueOnClear !== void 0) {
          return config.value.valueOnClear;
        }
        return defaultValue !== void 0 ? defaultValue : DEFAULT_VALUE_ON_CLEAR;
      });
      const isEmptyValue2 = (value) => {
        return emptyValues.value.includes(value);
      };
      if (!emptyValues.value.includes(valueOnClear.value))
        ;
      return {
        emptyValues,
        valueOnClear,
        isEmptyValue: isEmptyValue2
      };
    };
    const configProviderContextKey = Symbol();
    const globalConfig = ref();
    function useGlobalConfig(key2, defaultValue = void 0) {
      const config = getCurrentInstance() ? inject(configProviderContextKey, globalConfig) : globalConfig;
      if (key2) {
        return computed(() => {
          var _a2, _b;
          return (_b = (_a2 = config.value) == null ? void 0 : _a2[key2]) != null ? _b : defaultValue;
        });
      } else {
        return config;
      }
    }
    function useGlobalComponentSettings(block, sizeFallback) {
      const config = useGlobalConfig();
      const ns = useNamespace(block, computed(() => {
        var _a2;
        return ((_a2 = config.value) == null ? void 0 : _a2.namespace) || defaultNamespace;
      }));
      const locale = useLocale(computed(() => {
        var _a2;
        return (_a2 = config.value) == null ? void 0 : _a2.locale;
      }));
      const zIndex2 = useZIndex(computed(() => {
        var _a2;
        return ((_a2 = config.value) == null ? void 0 : _a2.zIndex) || defaultInitialZIndex;
      }));
      const size2 = computed(() => {
        var _a2;
        return unref(sizeFallback) || ((_a2 = config.value) == null ? void 0 : _a2.size) || "";
      });
      provideGlobalConfig(computed(() => unref(config) || {}));
      return {
        ns,
        locale,
        zIndex: zIndex2,
        size: size2
      };
    }
    const provideGlobalConfig = (config, app, global2 = false) => {
      var _a2;
      const inSetup = !!getCurrentInstance();
      const oldConfig = inSetup ? useGlobalConfig() : void 0;
      const provideFn = (_a2 = app == null ? void 0 : app.provide) != null ? _a2 : inSetup ? provide : void 0;
      if (!provideFn) {
        return;
      }
      const context = computed(() => {
        const cfg = unref(config);
        if (!(oldConfig == null ? void 0 : oldConfig.value))
          return cfg;
        return mergeConfig(oldConfig.value, cfg);
      });
      provideFn(configProviderContextKey, context);
      provideFn(localeContextKey, computed(() => context.value.locale));
      provideFn(namespaceContextKey, computed(() => context.value.namespace));
      provideFn(zIndexContextKey, computed(() => context.value.zIndex));
      provideFn(SIZE_INJECTION_KEY, {
        size: computed(() => context.value.size || "")
      });
      if (global2 || !globalConfig.value) {
        globalConfig.value = context.value;
      }
      return context;
    };
    const mergeConfig = (a, b) => {
      const keys2 = [.../* @__PURE__ */ new Set([...keysOf(a), ...keysOf(b)])];
      const obj = {};
      for (const key2 of keys2) {
        obj[key2] = b[key2] !== void 0 ? b[key2] : a[key2];
      }
      return obj;
    };
    const messageConfig = {};
    var _export_sfc$1 = (sfc, props) => {
      const target = sfc.__vccOpts || sfc;
      for (const [key2, val] of props) {
        target[key2] = val;
      }
      return target;
    };
    const iconProps = buildProps({
      size: {
        type: definePropType([Number, String])
      },
      color: {
        type: String
      }
    });
    const __default__$p = /* @__PURE__ */ defineComponent({
      name: "ElIcon",
      inheritAttrs: false
    });
    const _sfc_main$C = /* @__PURE__ */ defineComponent({
      ...__default__$p,
      props: iconProps,
      setup(__props) {
        const props = __props;
        const ns = useNamespace("icon");
        const style = computed(() => {
          const { size: size2, color } = props;
          if (!size2 && !color)
            return {};
          return {
            fontSize: isUndefined(size2) ? void 0 : addUnit(size2),
            "--color": color
          };
        });
        return (_ctx, _cache) => {
          return openBlock(), createElementBlock("i", mergeProps({
            class: unref(ns).b(),
            style: unref(style)
          }, _ctx.$attrs), [
            renderSlot(_ctx.$slots, "default")
          ], 16);
        };
      }
    });
    var Icon = /* @__PURE__ */ _export_sfc$1(_sfc_main$C, [["__file", "icon.vue"]]);
    const ElIcon = withInstall(Icon);
    const formContextKey = Symbol("formContextKey");
    const formItemContextKey = Symbol("formItemContextKey");
    const useFormSize = (fallback, ignore = {}) => {
      const emptyRef = ref(void 0);
      const size2 = ignore.prop ? emptyRef : useProp("size");
      const globalConfig2 = ignore.global ? emptyRef : useGlobalSize();
      const form = ignore.form ? { size: void 0 } : inject(formContextKey, void 0);
      const formItem = ignore.formItem ? { size: void 0 } : inject(formItemContextKey, void 0);
      return computed(() => size2.value || unref(fallback) || (formItem == null ? void 0 : formItem.size) || (form == null ? void 0 : form.size) || globalConfig2.value || "");
    };
    const useFormDisabled = (fallback) => {
      const disabled = useProp("disabled");
      const form = inject(formContextKey, void 0);
      return computed(() => disabled.value || unref(fallback) || (form == null ? void 0 : form.disabled) || false);
    };
    const useFormItem = () => {
      const form = inject(formContextKey, void 0);
      const formItem = inject(formItemContextKey, void 0);
      return {
        form,
        formItem
      };
    };
    const useFormItemInputId = (props, {
      formItemContext,
      disableIdGeneration,
      disableIdManagement
    }) => {
      if (!disableIdGeneration) {
        disableIdGeneration = ref(false);
      }
      if (!disableIdManagement) {
        disableIdManagement = ref(false);
      }
      const inputId = ref();
      let idUnwatch = void 0;
      const isLabeledByFormItem = computed(() => {
        var _a2;
        return !!(!props.label && formItemContext && formItemContext.inputIds && ((_a2 = formItemContext.inputIds) == null ? void 0 : _a2.length) <= 1);
      });
      onMounted(() => {
        idUnwatch = watch([toRef(props, "id"), disableIdGeneration], ([id, disableIdGeneration2]) => {
          const newId = id != null ? id : !disableIdGeneration2 ? useId().value : void 0;
          if (newId !== inputId.value) {
            if (formItemContext == null ? void 0 : formItemContext.removeInputId) {
              inputId.value && formItemContext.removeInputId(inputId.value);
              if (!(disableIdManagement == null ? void 0 : disableIdManagement.value) && !disableIdGeneration2 && newId) {
                formItemContext.addInputId(newId);
              }
            }
            inputId.value = newId;
          }
        }, { immediate: true });
      });
      onUnmounted(() => {
        idUnwatch && idUnwatch();
        if (formItemContext == null ? void 0 : formItemContext.removeInputId) {
          inputId.value && formItemContext.removeInputId(inputId.value);
        }
      });
      return {
        isLabeledByFormItem,
        inputId
      };
    };
    const formMetaProps = buildProps({
      size: {
        type: String,
        values: componentSizes
      },
      disabled: Boolean
    });
    const formProps = buildProps({
      ...formMetaProps,
      model: Object,
      rules: {
        type: definePropType(Object)
      },
      labelPosition: {
        type: String,
        values: ["left", "right", "top"],
        default: "right"
      },
      requireAsteriskPosition: {
        type: String,
        values: ["left", "right"],
        default: "left"
      },
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      labelSuffix: {
        type: String,
        default: ""
      },
      inline: Boolean,
      inlineMessage: Boolean,
      statusIcon: Boolean,
      showMessage: {
        type: Boolean,
        default: true
      },
      validateOnRuleChange: {
        type: Boolean,
        default: true
      },
      hideRequiredAsterisk: Boolean,
      scrollToError: Boolean,
      scrollIntoViewOptions: {
        type: [Object, Boolean]
      }
    });
    const formEmits = {
      validate: (prop, isValid, message2) => (isArray$2(prop) || isString$1(prop)) && isBoolean(isValid) && isString$1(message2)
    };
    function useFormLabelWidth() {
      const potentialLabelWidthArr = ref([]);
      const autoLabelWidth = computed(() => {
        if (!potentialLabelWidthArr.value.length)
          return "0";
        const max = Math.max(...potentialLabelWidthArr.value);
        return max ? `${max}px` : "";
      });
      function getLabelWidthIndex(width) {
        const index = potentialLabelWidthArr.value.indexOf(width);
        if (index === -1 && autoLabelWidth.value === "0")
          ;
        return index;
      }
      function registerLabelWidth(val, oldVal) {
        if (val && oldVal) {
          const index = getLabelWidthIndex(oldVal);
          potentialLabelWidthArr.value.splice(index, 1, val);
        } else if (val) {
          potentialLabelWidthArr.value.push(val);
        }
      }
      function deregisterLabelWidth(val) {
        const index = getLabelWidthIndex(val);
        if (index > -1) {
          potentialLabelWidthArr.value.splice(index, 1);
        }
      }
      return {
        autoLabelWidth,
        registerLabelWidth,
        deregisterLabelWidth
      };
    }
    const filterFields = (fields, props) => {
      const normalized = castArray(props);
      return normalized.length > 0 ? fields.filter((field) => field.prop && normalized.includes(field.prop)) : fields;
    };
    const COMPONENT_NAME$6 = "ElForm";
    const __default__$o = /* @__PURE__ */ defineComponent({
      name: COMPONENT_NAME$6
    });
    const _sfc_main$B = /* @__PURE__ */ defineComponent({
      ...__default__$o,
      props: formProps,
      emits: formEmits,
      setup(__props, { expose, emit: emit2 }) {
        const props = __props;
        const fields = [];
        const formSize = useFormSize();
        const ns = useNamespace("form");
        const formClasses = computed(() => {
          const { labelPosition, inline } = props;
          return [
            ns.b(),
            ns.m(formSize.value || "default"),
            {
              [ns.m(`label-${labelPosition}`)]: labelPosition,
              [ns.m("inline")]: inline
            }
          ];
        });
        const getField = (prop) => {
          return fields.find((field) => field.prop === prop);
        };
        const addField = (field) => {
          fields.push(field);
        };
        const removeField = (field) => {
          if (field.prop) {
            fields.splice(fields.indexOf(field), 1);
          }
        };
        const resetFields = (properties = []) => {
          if (!props.model) {
            return;
          }
          filterFields(fields, properties).forEach((field) => field.resetField());
        };
        const clearValidate = (props2 = []) => {
          filterFields(fields, props2).forEach((field) => field.clearValidate());
        };
        const isValidatable = computed(() => {
          const hasModel = !!props.model;
          return hasModel;
        });
        const obtainValidateFields = (props2) => {
          if (fields.length === 0)
            return [];
          const filteredFields = filterFields(fields, props2);
          if (!filteredFields.length) {
            return [];
          }
          return filteredFields;
        };
        const validate = async (callback) => validateField(void 0, callback);
        const doValidateField = async (props2 = []) => {
          if (!isValidatable.value)
            return false;
          const fields2 = obtainValidateFields(props2);
          if (fields2.length === 0)
            return true;
          let validationErrors = {};
          for (const field of fields2) {
            try {
              await field.validate("");
            } catch (fields3) {
              validationErrors = {
                ...validationErrors,
                ...fields3
              };
            }
          }
          if (Object.keys(validationErrors).length === 0)
            return true;
          return Promise.reject(validationErrors);
        };
        const validateField = async (modelProps = [], callback) => {
          const shouldThrow = !isFunction$1(callback);
          try {
            const result = await doValidateField(modelProps);
            if (result === true) {
              callback == null ? void 0 : callback(result);
            }
            return result;
          } catch (e) {
            if (e instanceof Error)
              throw e;
            const invalidFields = e;
            if (props.scrollToError) {
              scrollToField(Object.keys(invalidFields)[0]);
            }
            callback == null ? void 0 : callback(false, invalidFields);
            return shouldThrow && Promise.reject(invalidFields);
          }
        };
        const scrollToField = (prop) => {
          var _a2;
          const field = filterFields(fields, prop)[0];
          if (field) {
            (_a2 = field.$el) == null ? void 0 : _a2.scrollIntoView(props.scrollIntoViewOptions);
          }
        };
        watch(() => props.rules, () => {
          if (props.validateOnRuleChange) {
            validate().catch((err) => debugWarn());
          }
        }, { deep: true });
        provide(formContextKey, reactive({
          ...toRefs(props),
          emit: emit2,
          resetFields,
          clearValidate,
          validateField,
          getField,
          addField,
          removeField,
          ...useFormLabelWidth()
        }));
        expose({
          validate,
          validateField,
          resetFields,
          clearValidate,
          scrollToField
        });
        return (_ctx, _cache) => {
          return openBlock(), createElementBlock("form", {
            class: normalizeClass(unref(formClasses))
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2);
        };
      }
    });
    var Form = /* @__PURE__ */ _export_sfc$1(_sfc_main$B, [["__file", "form.vue"]]);
    function _extends() {
      _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source2 = arguments[i];
          for (var key2 in source2) {
            if (Object.prototype.hasOwnProperty.call(source2, key2)) {
              target[key2] = source2[key2];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _setPrototypeOf(o, p2) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p3) {
        o2.__proto__ = p3;
        return o2;
      };
      return _setPrototypeOf(o, p2);
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _construct(Parent, args, Class) {
      if (_isNativeReflectConstruct()) {
        _construct = Reflect.construct.bind();
      } else {
        _construct = function _construct2(Parent2, args2, Class2) {
          var a = [null];
          a.push.apply(a, args2);
          var Constructor = Function.bind.apply(Parent2, a);
          var instance = new Constructor();
          if (Class2)
            _setPrototypeOf(instance, Class2.prototype);
          return instance;
        };
      }
      return _construct.apply(null, arguments);
    }
    function _isNativeFunction(fn2) {
      return Function.toString.call(fn2).indexOf("[native code]") !== -1;
    }
    function _wrapNativeSuper(Class) {
      var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
      _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
        if (Class2 === null || !_isNativeFunction(Class2))
          return Class2;
        if (typeof Class2 !== "function") {
          throw new TypeError("Super expression must either be null or a function");
        }
        if (typeof _cache !== "undefined") {
          if (_cache.has(Class2))
            return _cache.get(Class2);
          _cache.set(Class2, Wrapper);
        }
        function Wrapper() {
          return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
        }
        Wrapper.prototype = Object.create(Class2.prototype, {
          constructor: {
            value: Wrapper,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        return _setPrototypeOf(Wrapper, Class2);
      };
      return _wrapNativeSuper(Class);
    }
    var formatRegExp = /%[sdj%]/g;
    var warning = function warning2() {
    };
    if (typeof process !== "undefined" && process.env && false) {
      warning = function warning2(type2, errors) {
        if (typeof console !== "undefined" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING === "undefined") {
          if (errors.every(function(e) {
            return typeof e === "string";
          })) {
            console.warn(type2, errors);
          }
        }
      };
    }
    function convertFieldsError(errors) {
      if (!errors || !errors.length)
        return null;
      var fields = {};
      errors.forEach(function(error) {
        var field = error.field;
        fields[field] = fields[field] || [];
        fields[field].push(error);
      });
      return fields;
    }
    function format(template) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      var i = 0;
      var len = args.length;
      if (typeof template === "function") {
        return template.apply(null, args);
      }
      if (typeof template === "string") {
        var str = template.replace(formatRegExp, function(x) {
          if (x === "%%") {
            return "%";
          }
          if (i >= len) {
            return x;
          }
          switch (x) {
            case "%s":
              return String(args[i++]);
            case "%d":
              return Number(args[i++]);
            case "%j":
              try {
                return JSON.stringify(args[i++]);
              } catch (_) {
                return "[Circular]";
              }
              break;
            default:
              return x;
          }
        });
        return str;
      }
      return template;
    }
    function isNativeStringType(type2) {
      return type2 === "string" || type2 === "url" || type2 === "hex" || type2 === "email" || type2 === "date" || type2 === "pattern";
    }
    function isEmptyValue(value, type2) {
      if (value === void 0 || value === null) {
        return true;
      }
      if (type2 === "array" && Array.isArray(value) && !value.length) {
        return true;
      }
      if (isNativeStringType(type2) && typeof value === "string" && !value) {
        return true;
      }
      return false;
    }
    function asyncParallelArray(arr, func, callback) {
      var results = [];
      var total = 0;
      var arrLength = arr.length;
      function count(errors) {
        results.push.apply(results, errors || []);
        total++;
        if (total === arrLength) {
          callback(results);
        }
      }
      arr.forEach(function(a) {
        func(a, count);
      });
    }
    function asyncSerialArray(arr, func, callback) {
      var index = 0;
      var arrLength = arr.length;
      function next(errors) {
        if (errors && errors.length) {
          callback(errors);
          return;
        }
        var original = index;
        index = index + 1;
        if (original < arrLength) {
          func(arr[original], next);
        } else {
          callback([]);
        }
      }
      next([]);
    }
    function flattenObjArr(objArr) {
      var ret = [];
      Object.keys(objArr).forEach(function(k) {
        ret.push.apply(ret, objArr[k] || []);
      });
      return ret;
    }
    var AsyncValidationError = /* @__PURE__ */ function(_Error) {
      _inheritsLoose(AsyncValidationError2, _Error);
      function AsyncValidationError2(errors, fields) {
        var _this;
        _this = _Error.call(this, "Async Validation Error") || this;
        _this.errors = errors;
        _this.fields = fields;
        return _this;
      }
      return AsyncValidationError2;
    }(/* @__PURE__ */ _wrapNativeSuper(Error));
    function asyncMap(objArr, option, func, callback, source2) {
      if (option.first) {
        var _pending = new Promise(function(resolve2, reject) {
          var next = function next2(errors) {
            callback(errors);
            return errors.length ? reject(new AsyncValidationError(errors, convertFieldsError(errors))) : resolve2(source2);
          };
          var flattenArr = flattenObjArr(objArr);
          asyncSerialArray(flattenArr, func, next);
        });
        _pending["catch"](function(e) {
          return e;
        });
        return _pending;
      }
      var firstFields = option.firstFields === true ? Object.keys(objArr) : option.firstFields || [];
      var objArrKeys = Object.keys(objArr);
      var objArrLength = objArrKeys.length;
      var total = 0;
      var results = [];
      var pending = new Promise(function(resolve2, reject) {
        var next = function next2(errors) {
          results.push.apply(results, errors);
          total++;
          if (total === objArrLength) {
            callback(results);
            return results.length ? reject(new AsyncValidationError(results, convertFieldsError(results))) : resolve2(source2);
          }
        };
        if (!objArrKeys.length) {
          callback(results);
          resolve2(source2);
        }
        objArrKeys.forEach(function(key2) {
          var arr = objArr[key2];
          if (firstFields.indexOf(key2) !== -1) {
            asyncSerialArray(arr, func, next);
          } else {
            asyncParallelArray(arr, func, next);
          }
        });
      });
      pending["catch"](function(e) {
        return e;
      });
      return pending;
    }
    function isErrorObj(obj) {
      return !!(obj && obj.message !== void 0);
    }
    function getValue(value, path) {
      var v = value;
      for (var i = 0; i < path.length; i++) {
        if (v == void 0) {
          return v;
        }
        v = v[path[i]];
      }
      return v;
    }
    function complementError(rule, source2) {
      return function(oe) {
        var fieldValue;
        if (rule.fullFields) {
          fieldValue = getValue(source2, rule.fullFields);
        } else {
          fieldValue = source2[oe.field || rule.fullField];
        }
        if (isErrorObj(oe)) {
          oe.field = oe.field || rule.fullField;
          oe.fieldValue = fieldValue;
          return oe;
        }
        return {
          message: typeof oe === "function" ? oe() : oe,
          fieldValue,
          field: oe.field || rule.fullField
        };
      };
    }
    function deepMerge(target, source2) {
      if (source2) {
        for (var s in source2) {
          if (source2.hasOwnProperty(s)) {
            var value = source2[s];
            if (typeof value === "object" && typeof target[s] === "object") {
              target[s] = _extends({}, target[s], value);
            } else {
              target[s] = value;
            }
          }
        }
      }
      return target;
    }
    var required$1 = function required2(rule, value, source2, errors, options, type2) {
      if (rule.required && (!source2.hasOwnProperty(rule.field) || isEmptyValue(value, type2 || rule.type))) {
        errors.push(format(options.messages.required, rule.fullField));
      }
    };
    var whitespace = function whitespace2(rule, value, source2, errors, options) {
      if (/^\s+$/.test(value) || value === "") {
        errors.push(format(options.messages.whitespace, rule.fullField));
      }
    };
    var urlReg;
    var getUrlRegex = function() {
      if (urlReg) {
        return urlReg;
      }
      var word = "[a-fA-F\\d:]";
      var b = function b2(options) {
        return options && options.includeBoundaries ? "(?:(?<=\\s|^)(?=" + word + ")|(?<=" + word + ")(?=\\s|$))" : "";
      };
      var v4 = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}";
      var v6seg = "[a-fA-F\\d]{1,4}";
      var v6 = ("\n(?:\n(?:" + v6seg + ":){7}(?:" + v6seg + "|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n(?:" + v6seg + ":){6}(?:" + v4 + "|:" + v6seg + "|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n(?:" + v6seg + ":){5}(?::" + v4 + "|(?::" + v6seg + "){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n(?:" + v6seg + ":){4}(?:(?::" + v6seg + "){0,1}:" + v4 + "|(?::" + v6seg + "){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n(?:" + v6seg + ":){3}(?:(?::" + v6seg + "){0,2}:" + v4 + "|(?::" + v6seg + "){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n(?:" + v6seg + ":){2}(?:(?::" + v6seg + "){0,3}:" + v4 + "|(?::" + v6seg + "){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n(?:" + v6seg + ":){1}(?:(?::" + v6seg + "){0,4}:" + v4 + "|(?::" + v6seg + "){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n(?::(?:(?::" + v6seg + "){0,5}:" + v4 + "|(?::" + v6seg + "){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1\n").replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim();
      var v46Exact = new RegExp("(?:^" + v4 + "$)|(?:^" + v6 + "$)");
      var v4exact = new RegExp("^" + v4 + "$");
      var v6exact = new RegExp("^" + v6 + "$");
      var ip = function ip2(options) {
        return options && options.exact ? v46Exact : new RegExp("(?:" + b(options) + v4 + b(options) + ")|(?:" + b(options) + v6 + b(options) + ")", "g");
      };
      ip.v4 = function(options) {
        return options && options.exact ? v4exact : new RegExp("" + b(options) + v4 + b(options), "g");
      };
      ip.v6 = function(options) {
        return options && options.exact ? v6exact : new RegExp("" + b(options) + v6 + b(options), "g");
      };
      var protocol = "(?:(?:[a-z]+:)?//)";
      var auth = "(?:\\S+(?::\\S*)?@)?";
      var ipv4 = ip.v4().source;
      var ipv6 = ip.v6().source;
      var host = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)";
      var domain = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*";
      var tld = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";
      var port = "(?::\\d{2,5})?";
      var path = '(?:[/?#][^\\s"]*)?';
      var regex = "(?:" + protocol + "|www\\.)" + auth + "(?:localhost|" + ipv4 + "|" + ipv6 + "|" + host + domain + tld + ")" + port + path;
      urlReg = new RegExp("(?:^" + regex + "$)", "i");
      return urlReg;
    };
    var pattern$2 = {
      // http://emailregex.com/
      email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
      // url: new RegExp(
      //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
      //   'i',
      // ),
      hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
    };
    var types = {
      integer: function integer2(value) {
        return types.number(value) && parseInt(value, 10) === value;
      },
      "float": function float(value) {
        return types.number(value) && !types.integer(value);
      },
      array: function array2(value) {
        return Array.isArray(value);
      },
      regexp: function regexp2(value) {
        if (value instanceof RegExp) {
          return true;
        }
        try {
          return !!new RegExp(value);
        } catch (e) {
          return false;
        }
      },
      date: function date2(value) {
        return typeof value.getTime === "function" && typeof value.getMonth === "function" && typeof value.getYear === "function" && !isNaN(value.getTime());
      },
      number: function number2(value) {
        if (isNaN(value)) {
          return false;
        }
        return typeof value === "number";
      },
      object: function object2(value) {
        return typeof value === "object" && !types.array(value);
      },
      method: function method2(value) {
        return typeof value === "function";
      },
      email: function email(value) {
        return typeof value === "string" && value.length <= 320 && !!value.match(pattern$2.email);
      },
      url: function url(value) {
        return typeof value === "string" && value.length <= 2048 && !!value.match(getUrlRegex());
      },
      hex: function hex(value) {
        return typeof value === "string" && !!value.match(pattern$2.hex);
      }
    };
    var type$1 = function type2(rule, value, source2, errors, options) {
      if (rule.required && value === void 0) {
        required$1(rule, value, source2, errors, options);
        return;
      }
      var custom = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"];
      var ruleType = rule.type;
      if (custom.indexOf(ruleType) > -1) {
        if (!types[ruleType](value)) {
          errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
        }
      } else if (ruleType && typeof value !== rule.type) {
        errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
      }
    };
    var range = function range2(rule, value, source2, errors, options) {
      var len = typeof rule.len === "number";
      var min = typeof rule.min === "number";
      var max = typeof rule.max === "number";
      var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
      var val = value;
      var key2 = null;
      var num = typeof value === "number";
      var str = typeof value === "string";
      var arr = Array.isArray(value);
      if (num) {
        key2 = "number";
      } else if (str) {
        key2 = "string";
      } else if (arr) {
        key2 = "array";
      }
      if (!key2) {
        return false;
      }
      if (arr) {
        val = value.length;
      }
      if (str) {
        val = value.replace(spRegexp, "_").length;
      }
      if (len) {
        if (val !== rule.len) {
          errors.push(format(options.messages[key2].len, rule.fullField, rule.len));
        }
      } else if (min && !max && val < rule.min) {
        errors.push(format(options.messages[key2].min, rule.fullField, rule.min));
      } else if (max && !min && val > rule.max) {
        errors.push(format(options.messages[key2].max, rule.fullField, rule.max));
      } else if (min && max && (val < rule.min || val > rule.max)) {
        errors.push(format(options.messages[key2].range, rule.fullField, rule.min, rule.max));
      }
    };
    var ENUM$1 = "enum";
    var enumerable$1 = function enumerable2(rule, value, source2, errors, options) {
      rule[ENUM$1] = Array.isArray(rule[ENUM$1]) ? rule[ENUM$1] : [];
      if (rule[ENUM$1].indexOf(value) === -1) {
        errors.push(format(options.messages[ENUM$1], rule.fullField, rule[ENUM$1].join(", ")));
      }
    };
    var pattern$1 = function pattern2(rule, value, source2, errors, options) {
      if (rule.pattern) {
        if (rule.pattern instanceof RegExp) {
          rule.pattern.lastIndex = 0;
          if (!rule.pattern.test(value)) {
            errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
          }
        } else if (typeof rule.pattern === "string") {
          var _pattern = new RegExp(rule.pattern);
          if (!_pattern.test(value)) {
            errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
          }
        }
      }
    };
    var rules = {
      required: required$1,
      whitespace,
      type: type$1,
      range,
      "enum": enumerable$1,
      pattern: pattern$1
    };
    var string = function string2(rule, value, callback, source2, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
      if (validate) {
        if (isEmptyValue(value, "string") && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source2, errors, options, "string");
        if (!isEmptyValue(value, "string")) {
          rules.type(rule, value, source2, errors, options);
          rules.range(rule, value, source2, errors, options);
          rules.pattern(rule, value, source2, errors, options);
          if (rule.whitespace === true) {
            rules.whitespace(rule, value, source2, errors, options);
          }
        }
      }
      callback(errors);
    };
    var method = function method2(rule, value, callback, source2, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
      if (validate) {
        if (isEmptyValue(value) && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source2, errors, options);
        if (value !== void 0) {
          rules.type(rule, value, source2, errors, options);
        }
      }
      callback(errors);
    };
    var number = function number2(rule, value, callback, source2, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
      if (validate) {
        if (value === "") {
          value = void 0;
        }
        if (isEmptyValue(value) && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source2, errors, options);
        if (value !== void 0) {
          rules.type(rule, value, source2, errors, options);
          rules.range(rule, value, source2, errors, options);
        }
      }
      callback(errors);
    };
    var _boolean = function _boolean2(rule, value, callback, source2, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
      if (validate) {
        if (isEmptyValue(value) && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source2, errors, options);
        if (value !== void 0) {
          rules.type(rule, value, source2, errors, options);
        }
      }
      callback(errors);
    };
    var regexp = function regexp2(rule, value, callback, source2, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
      if (validate) {
        if (isEmptyValue(value) && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source2, errors, options);
        if (!isEmptyValue(value)) {
          rules.type(rule, value, source2, errors, options);
        }
      }
      callback(errors);
    };
    var integer = function integer2(rule, value, callback, source2, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
      if (validate) {
        if (isEmptyValue(value) && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source2, errors, options);
        if (value !== void 0) {
          rules.type(rule, value, source2, errors, options);
          rules.range(rule, value, source2, errors, options);
        }
      }
      callback(errors);
    };
    var floatFn = function floatFn2(rule, value, callback, source2, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
      if (validate) {
        if (isEmptyValue(value) && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source2, errors, options);
        if (value !== void 0) {
          rules.type(rule, value, source2, errors, options);
          rules.range(rule, value, source2, errors, options);
        }
      }
      callback(errors);
    };
    var array = function array2(rule, value, callback, source2, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
      if (validate) {
        if ((value === void 0 || value === null) && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source2, errors, options, "array");
        if (value !== void 0 && value !== null) {
          rules.type(rule, value, source2, errors, options);
          rules.range(rule, value, source2, errors, options);
        }
      }
      callback(errors);
    };
    var object = function object2(rule, value, callback, source2, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
      if (validate) {
        if (isEmptyValue(value) && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source2, errors, options);
        if (value !== void 0) {
          rules.type(rule, value, source2, errors, options);
        }
      }
      callback(errors);
    };
    var ENUM = "enum";
    var enumerable = function enumerable2(rule, value, callback, source2, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
      if (validate) {
        if (isEmptyValue(value) && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source2, errors, options);
        if (value !== void 0) {
          rules[ENUM](rule, value, source2, errors, options);
        }
      }
      callback(errors);
    };
    var pattern = function pattern2(rule, value, callback, source2, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
      if (validate) {
        if (isEmptyValue(value, "string") && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source2, errors, options);
        if (!isEmptyValue(value, "string")) {
          rules.pattern(rule, value, source2, errors, options);
        }
      }
      callback(errors);
    };
    var date = function date2(rule, value, callback, source2, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
      if (validate) {
        if (isEmptyValue(value, "date") && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source2, errors, options);
        if (!isEmptyValue(value, "date")) {
          var dateObject;
          if (value instanceof Date) {
            dateObject = value;
          } else {
            dateObject = new Date(value);
          }
          rules.type(rule, dateObject, source2, errors, options);
          if (dateObject) {
            rules.range(rule, dateObject.getTime(), source2, errors, options);
          }
        }
      }
      callback(errors);
    };
    var required = function required2(rule, value, callback, source2, options) {
      var errors = [];
      var type2 = Array.isArray(value) ? "array" : typeof value;
      rules.required(rule, value, source2, errors, options, type2);
      callback(errors);
    };
    var type = function type2(rule, value, callback, source2, options) {
      var ruleType = rule.type;
      var errors = [];
      var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
      if (validate) {
        if (isEmptyValue(value, ruleType) && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source2, errors, options, ruleType);
        if (!isEmptyValue(value, ruleType)) {
          rules.type(rule, value, source2, errors, options);
        }
      }
      callback(errors);
    };
    var any = function any2(rule, value, callback, source2, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source2.hasOwnProperty(rule.field);
      if (validate) {
        if (isEmptyValue(value) && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source2, errors, options);
      }
      callback(errors);
    };
    var validators = {
      string,
      method,
      number,
      "boolean": _boolean,
      regexp,
      integer,
      "float": floatFn,
      array,
      object,
      "enum": enumerable,
      pattern,
      date,
      url: type,
      hex: type,
      email: type,
      required,
      any
    };
    function newMessages() {
      return {
        "default": "Validation error on field %s",
        required: "%s is required",
        "enum": "%s must be one of %s",
        whitespace: "%s cannot be empty",
        date: {
          format: "%s date %s is invalid for format %s",
          parse: "%s date could not be parsed, %s is invalid ",
          invalid: "%s date %s is invalid"
        },
        types: {
          string: "%s is not a %s",
          method: "%s is not a %s (function)",
          array: "%s is not an %s",
          object: "%s is not an %s",
          number: "%s is not a %s",
          date: "%s is not a %s",
          "boolean": "%s is not a %s",
          integer: "%s is not an %s",
          "float": "%s is not a %s",
          regexp: "%s is not a valid %s",
          email: "%s is not a valid %s",
          url: "%s is not a valid %s",
          hex: "%s is not a valid %s"
        },
        string: {
          len: "%s must be exactly %s characters",
          min: "%s must be at least %s characters",
          max: "%s cannot be longer than %s characters",
          range: "%s must be between %s and %s characters"
        },
        number: {
          len: "%s must equal %s",
          min: "%s cannot be less than %s",
          max: "%s cannot be greater than %s",
          range: "%s must be between %s and %s"
        },
        array: {
          len: "%s must be exactly %s in length",
          min: "%s cannot be less than %s in length",
          max: "%s cannot be greater than %s in length",
          range: "%s must be between %s and %s in length"
        },
        pattern: {
          mismatch: "%s value %s does not match pattern %s"
        },
        clone: function clone2() {
          var cloned = JSON.parse(JSON.stringify(this));
          cloned.clone = this.clone;
          return cloned;
        }
      };
    }
    var messages = newMessages();
    var Schema = /* @__PURE__ */ function() {
      function Schema2(descriptor) {
        this.rules = null;
        this._messages = messages;
        this.define(descriptor);
      }
      var _proto = Schema2.prototype;
      _proto.define = function define(rules2) {
        var _this = this;
        if (!rules2) {
          throw new Error("Cannot configure a schema with no rules");
        }
        if (typeof rules2 !== "object" || Array.isArray(rules2)) {
          throw new Error("Rules must be an object");
        }
        this.rules = {};
        Object.keys(rules2).forEach(function(name) {
          var item = rules2[name];
          _this.rules[name] = Array.isArray(item) ? item : [item];
        });
      };
      _proto.messages = function messages2(_messages) {
        if (_messages) {
          this._messages = deepMerge(newMessages(), _messages);
        }
        return this._messages;
      };
      _proto.validate = function validate(source_, o, oc) {
        var _this2 = this;
        if (o === void 0) {
          o = {};
        }
        if (oc === void 0) {
          oc = function oc2() {
          };
        }
        var source2 = source_;
        var options = o;
        var callback = oc;
        if (typeof options === "function") {
          callback = options;
          options = {};
        }
        if (!this.rules || Object.keys(this.rules).length === 0) {
          if (callback) {
            callback(null, source2);
          }
          return Promise.resolve(source2);
        }
        function complete(results) {
          var errors = [];
          var fields = {};
          function add2(e) {
            if (Array.isArray(e)) {
              var _errors;
              errors = (_errors = errors).concat.apply(_errors, e);
            } else {
              errors.push(e);
            }
          }
          for (var i = 0; i < results.length; i++) {
            add2(results[i]);
          }
          if (!errors.length) {
            callback(null, source2);
          } else {
            fields = convertFieldsError(errors);
            callback(errors, fields);
          }
        }
        if (options.messages) {
          var messages$1 = this.messages();
          if (messages$1 === messages) {
            messages$1 = newMessages();
          }
          deepMerge(messages$1, options.messages);
          options.messages = messages$1;
        } else {
          options.messages = this.messages();
        }
        var series = {};
        var keys2 = options.keys || Object.keys(this.rules);
        keys2.forEach(function(z) {
          var arr = _this2.rules[z];
          var value = source2[z];
          arr.forEach(function(r) {
            var rule = r;
            if (typeof rule.transform === "function") {
              if (source2 === source_) {
                source2 = _extends({}, source2);
              }
              value = source2[z] = rule.transform(value);
            }
            if (typeof rule === "function") {
              rule = {
                validator: rule
              };
            } else {
              rule = _extends({}, rule);
            }
            rule.validator = _this2.getValidationMethod(rule);
            if (!rule.validator) {
              return;
            }
            rule.field = z;
            rule.fullField = rule.fullField || z;
            rule.type = _this2.getType(rule);
            series[z] = series[z] || [];
            series[z].push({
              rule,
              value,
              source: source2,
              field: z
            });
          });
        });
        var errorFields = {};
        return asyncMap(series, options, function(data, doIt) {
          var rule = data.rule;
          var deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
          deep = deep && (rule.required || !rule.required && data.value);
          rule.field = data.field;
          function addFullField(key2, schema) {
            return _extends({}, schema, {
              fullField: rule.fullField + "." + key2,
              fullFields: rule.fullFields ? [].concat(rule.fullFields, [key2]) : [key2]
            });
          }
          function cb(e) {
            if (e === void 0) {
              e = [];
            }
            var errorList = Array.isArray(e) ? e : [e];
            if (!options.suppressWarning && errorList.length) {
              Schema2.warning("async-validator:", errorList);
            }
            if (errorList.length && rule.message !== void 0) {
              errorList = [].concat(rule.message);
            }
            var filledErrors = errorList.map(complementError(rule, source2));
            if (options.first && filledErrors.length) {
              errorFields[rule.field] = 1;
              return doIt(filledErrors);
            }
            if (!deep) {
              doIt(filledErrors);
            } else {
              if (rule.required && !data.value) {
                if (rule.message !== void 0) {
                  filledErrors = [].concat(rule.message).map(complementError(rule, source2));
                } else if (options.error) {
                  filledErrors = [options.error(rule, format(options.messages.required, rule.field))];
                }
                return doIt(filledErrors);
              }
              var fieldsSchema = {};
              if (rule.defaultField) {
                Object.keys(data.value).map(function(key2) {
                  fieldsSchema[key2] = rule.defaultField;
                });
              }
              fieldsSchema = _extends({}, fieldsSchema, data.rule.fields);
              var paredFieldsSchema = {};
              Object.keys(fieldsSchema).forEach(function(field) {
                var fieldSchema = fieldsSchema[field];
                var fieldSchemaList = Array.isArray(fieldSchema) ? fieldSchema : [fieldSchema];
                paredFieldsSchema[field] = fieldSchemaList.map(addFullField.bind(null, field));
              });
              var schema = new Schema2(paredFieldsSchema);
              schema.messages(options.messages);
              if (data.rule.options) {
                data.rule.options.messages = options.messages;
                data.rule.options.error = options.error;
              }
              schema.validate(data.value, data.rule.options || options, function(errs) {
                var finalErrors = [];
                if (filledErrors && filledErrors.length) {
                  finalErrors.push.apply(finalErrors, filledErrors);
                }
                if (errs && errs.length) {
                  finalErrors.push.apply(finalErrors, errs);
                }
                doIt(finalErrors.length ? finalErrors : null);
              });
            }
          }
          var res;
          if (rule.asyncValidator) {
            res = rule.asyncValidator(rule, data.value, cb, data.source, options);
          } else if (rule.validator) {
            try {
              res = rule.validator(rule, data.value, cb, data.source, options);
            } catch (error) {
              console.error == null ? void 0 : console.error(error);
              if (!options.suppressValidatorError) {
                setTimeout(function() {
                  throw error;
                }, 0);
              }
              cb(error.message);
            }
            if (res === true) {
              cb();
            } else if (res === false) {
              cb(typeof rule.message === "function" ? rule.message(rule.fullField || rule.field) : rule.message || (rule.fullField || rule.field) + " fails");
            } else if (res instanceof Array) {
              cb(res);
            } else if (res instanceof Error) {
              cb(res.message);
            }
          }
          if (res && res.then) {
            res.then(function() {
              return cb();
            }, function(e) {
              return cb(e);
            });
          }
        }, function(results) {
          complete(results);
        }, source2);
      };
      _proto.getType = function getType2(rule) {
        if (rule.type === void 0 && rule.pattern instanceof RegExp) {
          rule.type = "pattern";
        }
        if (typeof rule.validator !== "function" && rule.type && !validators.hasOwnProperty(rule.type)) {
          throw new Error(format("Unknown rule type %s", rule.type));
        }
        return rule.type || "string";
      };
      _proto.getValidationMethod = function getValidationMethod(rule) {
        if (typeof rule.validator === "function") {
          return rule.validator;
        }
        var keys2 = Object.keys(rule);
        var messageIndex = keys2.indexOf("message");
        if (messageIndex !== -1) {
          keys2.splice(messageIndex, 1);
        }
        if (keys2.length === 1 && keys2[0] === "required") {
          return validators.required;
        }
        return validators[this.getType(rule)] || void 0;
      };
      return Schema2;
    }();
    Schema.register = function register(type2, validator) {
      if (typeof validator !== "function") {
        throw new Error("Cannot register a validator by type, validator is not a function");
      }
      validators[type2] = validator;
    };
    Schema.warning = warning;
    Schema.messages = messages;
    Schema.validators = validators;
    const formItemValidateStates = [
      "",
      "error",
      "validating",
      "success"
    ];
    const formItemProps = buildProps({
      label: String,
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      prop: {
        type: definePropType([String, Array])
      },
      required: {
        type: Boolean,
        default: void 0
      },
      rules: {
        type: definePropType([Object, Array])
      },
      error: String,
      validateStatus: {
        type: String,
        values: formItemValidateStates
      },
      for: String,
      inlineMessage: {
        type: [String, Boolean],
        default: ""
      },
      showMessage: {
        type: Boolean,
        default: true
      },
      size: {
        type: String,
        values: componentSizes
      }
    });
    const COMPONENT_NAME$5 = "ElLabelWrap";
    var FormLabelWrap = /* @__PURE__ */ defineComponent({
      name: COMPONENT_NAME$5,
      props: {
        isAutoWidth: Boolean,
        updateAll: Boolean
      },
      setup(props, {
        slots
      }) {
        const formContext = inject(formContextKey, void 0);
        const formItemContext = inject(formItemContextKey);
        if (!formItemContext)
          throwError(COMPONENT_NAME$5, "usage: <el-form-item><label-wrap /></el-form-item>");
        const ns = useNamespace("form");
        const el = ref();
        const computedWidth = ref(0);
        const getLabelWidth = () => {
          var _a2;
          if ((_a2 = el.value) == null ? void 0 : _a2.firstElementChild) {
            const width = window.getComputedStyle(el.value.firstElementChild).width;
            return Math.ceil(Number.parseFloat(width));
          } else {
            return 0;
          }
        };
        const updateLabelWidth = (action = "update") => {
          nextTick(() => {
            if (slots.default && props.isAutoWidth) {
              if (action === "update") {
                computedWidth.value = getLabelWidth();
              } else if (action === "remove") {
                formContext == null ? void 0 : formContext.deregisterLabelWidth(computedWidth.value);
              }
            }
          });
        };
        const updateLabelWidthFn = () => updateLabelWidth("update");
        onMounted(() => {
          updateLabelWidthFn();
        });
        onBeforeUnmount(() => {
          updateLabelWidth("remove");
        });
        onUpdated(() => updateLabelWidthFn());
        watch(computedWidth, (val, oldVal) => {
          if (props.updateAll) {
            formContext == null ? void 0 : formContext.registerLabelWidth(val, oldVal);
          }
        });
        useResizeObserver(computed(() => {
          var _a2, _b;
          return (_b = (_a2 = el.value) == null ? void 0 : _a2.firstElementChild) != null ? _b : null;
        }), updateLabelWidthFn);
        return () => {
          var _a2, _b;
          if (!slots)
            return null;
          const {
            isAutoWidth
          } = props;
          if (isAutoWidth) {
            const autoLabelWidth = formContext == null ? void 0 : formContext.autoLabelWidth;
            const hasLabel = formItemContext == null ? void 0 : formItemContext.hasLabel;
            const style = {};
            if (hasLabel && autoLabelWidth && autoLabelWidth !== "auto") {
              const marginWidth = Math.max(0, Number.parseInt(autoLabelWidth, 10) - computedWidth.value);
              const marginPosition = formContext.labelPosition === "left" ? "marginRight" : "marginLeft";
              if (marginWidth) {
                style[marginPosition] = `${marginWidth}px`;
              }
            }
            return createVNode("div", {
              "ref": el,
              "class": [ns.be("item", "label-wrap")],
              "style": style
            }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]);
          } else {
            return createVNode(Fragment, {
              "ref": el
            }, [(_b = slots.default) == null ? void 0 : _b.call(slots)]);
          }
        };
      }
    });
    const _hoisted_1$f = ["role", "aria-labelledby"];
    const __default__$n = /* @__PURE__ */ defineComponent({
      name: "ElFormItem"
    });
    const _sfc_main$A = /* @__PURE__ */ defineComponent({
      ...__default__$n,
      props: formItemProps,
      setup(__props, { expose }) {
        const props = __props;
        const slots = useSlots();
        const formContext = inject(formContextKey, void 0);
        const parentFormItemContext = inject(formItemContextKey, void 0);
        const _size = useFormSize(void 0, { formItem: false });
        const ns = useNamespace("form-item");
        const labelId = useId().value;
        const inputIds = ref([]);
        const validateState = ref("");
        const validateStateDebounced = refDebounced(validateState, 100);
        const validateMessage = ref("");
        const formItemRef = ref();
        let initialValue = void 0;
        let isResettingField = false;
        const labelStyle = computed(() => {
          if ((formContext == null ? void 0 : formContext.labelPosition) === "top") {
            return {};
          }
          const labelWidth = addUnit(props.labelWidth || (formContext == null ? void 0 : formContext.labelWidth) || "");
          if (labelWidth)
            return { width: labelWidth };
          return {};
        });
        const contentStyle = computed(() => {
          if ((formContext == null ? void 0 : formContext.labelPosition) === "top" || (formContext == null ? void 0 : formContext.inline)) {
            return {};
          }
          if (!props.label && !props.labelWidth && isNested) {
            return {};
          }
          const labelWidth = addUnit(props.labelWidth || (formContext == null ? void 0 : formContext.labelWidth) || "");
          if (!props.label && !slots.label) {
            return { marginLeft: labelWidth };
          }
          return {};
        });
        const formItemClasses = computed(() => [
          ns.b(),
          ns.m(_size.value),
          ns.is("error", validateState.value === "error"),
          ns.is("validating", validateState.value === "validating"),
          ns.is("success", validateState.value === "success"),
          ns.is("required", isRequired.value || props.required),
          ns.is("no-asterisk", formContext == null ? void 0 : formContext.hideRequiredAsterisk),
          (formContext == null ? void 0 : formContext.requireAsteriskPosition) === "right" ? "asterisk-right" : "asterisk-left",
          { [ns.m("feedback")]: formContext == null ? void 0 : formContext.statusIcon }
        ]);
        const _inlineMessage = computed(() => isBoolean(props.inlineMessage) ? props.inlineMessage : (formContext == null ? void 0 : formContext.inlineMessage) || false);
        const validateClasses = computed(() => [
          ns.e("error"),
          { [ns.em("error", "inline")]: _inlineMessage.value }
        ]);
        const propString = computed(() => {
          if (!props.prop)
            return "";
          return isString$1(props.prop) ? props.prop : props.prop.join(".");
        });
        const hasLabel = computed(() => {
          return !!(props.label || slots.label);
        });
        const labelFor = computed(() => {
          return props.for || (inputIds.value.length === 1 ? inputIds.value[0] : void 0);
        });
        const isGroup = computed(() => {
          return !labelFor.value && hasLabel.value;
        });
        const isNested = !!parentFormItemContext;
        const fieldValue = computed(() => {
          const model = formContext == null ? void 0 : formContext.model;
          if (!model || !props.prop) {
            return;
          }
          return getProp(model, props.prop).value;
        });
        const normalizedRules = computed(() => {
          const { required: required2 } = props;
          const rules2 = [];
          if (props.rules) {
            rules2.push(...castArray(props.rules));
          }
          const formRules = formContext == null ? void 0 : formContext.rules;
          if (formRules && props.prop) {
            const _rules = getProp(formRules, props.prop).value;
            if (_rules) {
              rules2.push(...castArray(_rules));
            }
          }
          if (required2 !== void 0) {
            const requiredRules = rules2.map((rule, i) => [rule, i]).filter(([rule]) => Object.keys(rule).includes("required"));
            if (requiredRules.length > 0) {
              for (const [rule, i] of requiredRules) {
                if (rule.required === required2)
                  continue;
                rules2[i] = { ...rule, required: required2 };
              }
            } else {
              rules2.push({ required: required2 });
            }
          }
          return rules2;
        });
        const validateEnabled = computed(() => normalizedRules.value.length > 0);
        const getFilteredRule = (trigger2) => {
          const rules2 = normalizedRules.value;
          return rules2.filter((rule) => {
            if (!rule.trigger || !trigger2)
              return true;
            if (Array.isArray(rule.trigger)) {
              return rule.trigger.includes(trigger2);
            } else {
              return rule.trigger === trigger2;
            }
          }).map(({ trigger: trigger22, ...rule }) => rule);
        };
        const isRequired = computed(() => normalizedRules.value.some((rule) => rule.required));
        const shouldShowError = computed(() => {
          var _a2;
          return validateStateDebounced.value === "error" && props.showMessage && ((_a2 = formContext == null ? void 0 : formContext.showMessage) != null ? _a2 : true);
        });
        const currentLabel = computed(() => `${props.label || ""}${(formContext == null ? void 0 : formContext.labelSuffix) || ""}`);
        const setValidationState = (state) => {
          validateState.value = state;
        };
        const onValidationFailed = (error) => {
          var _a2, _b;
          const { errors, fields } = error;
          if (!errors || !fields) {
            console.error(error);
          }
          setValidationState("error");
          validateMessage.value = errors ? (_b = (_a2 = errors == null ? void 0 : errors[0]) == null ? void 0 : _a2.message) != null ? _b : `${props.prop} is required` : "";
          formContext == null ? void 0 : formContext.emit("validate", props.prop, false, validateMessage.value);
        };
        const onValidationSucceeded = () => {
          setValidationState("success");
          formContext == null ? void 0 : formContext.emit("validate", props.prop, true, "");
        };
        const doValidate = async (rules2) => {
          const modelName = propString.value;
          const validator = new Schema({
            [modelName]: rules2
          });
          return validator.validate({ [modelName]: fieldValue.value }, { firstFields: true }).then(() => {
            onValidationSucceeded();
            return true;
          }).catch((err) => {
            onValidationFailed(err);
            return Promise.reject(err);
          });
        };
        const validate = async (trigger2, callback) => {
          if (isResettingField || !props.prop) {
            return false;
          }
          const hasCallback = isFunction$1(callback);
          if (!validateEnabled.value) {
            callback == null ? void 0 : callback(false);
            return false;
          }
          const rules2 = getFilteredRule(trigger2);
          if (rules2.length === 0) {
            callback == null ? void 0 : callback(true);
            return true;
          }
          setValidationState("validating");
          return doValidate(rules2).then(() => {
            callback == null ? void 0 : callback(true);
            return true;
          }).catch((err) => {
            const { fields } = err;
            callback == null ? void 0 : callback(false, fields);
            return hasCallback ? false : Promise.reject(fields);
          });
        };
        const clearValidate = () => {
          setValidationState("");
          validateMessage.value = "";
          isResettingField = false;
        };
        const resetField = async () => {
          const model = formContext == null ? void 0 : formContext.model;
          if (!model || !props.prop)
            return;
          const computedValue = getProp(model, props.prop);
          isResettingField = true;
          computedValue.value = clone(initialValue);
          await nextTick();
          clearValidate();
          isResettingField = false;
        };
        const addInputId = (id) => {
          if (!inputIds.value.includes(id)) {
            inputIds.value.push(id);
          }
        };
        const removeInputId = (id) => {
          inputIds.value = inputIds.value.filter((listId) => listId !== id);
        };
        watch(() => props.error, (val) => {
          validateMessage.value = val || "";
          setValidationState(val ? "error" : "");
        }, { immediate: true });
        watch(() => props.validateStatus, (val) => setValidationState(val || ""));
        const context = reactive({
          ...toRefs(props),
          $el: formItemRef,
          size: _size,
          validateState,
          labelId,
          inputIds,
          isGroup,
          hasLabel,
          fieldValue,
          addInputId,
          removeInputId,
          resetField,
          clearValidate,
          validate
        });
        provide(formItemContextKey, context);
        onMounted(() => {
          if (props.prop) {
            formContext == null ? void 0 : formContext.addField(context);
            initialValue = clone(fieldValue.value);
          }
        });
        onBeforeUnmount(() => {
          formContext == null ? void 0 : formContext.removeField(context);
        });
        expose({
          size: _size,
          validateMessage,
          validateState,
          validate,
          clearValidate,
          resetField
        });
        return (_ctx, _cache) => {
          var _a2;
          return openBlock(), createElementBlock("div", {
            ref_key: "formItemRef",
            ref: formItemRef,
            class: normalizeClass(unref(formItemClasses)),
            role: unref(isGroup) ? "group" : void 0,
            "aria-labelledby": unref(isGroup) ? unref(labelId) : void 0
          }, [
            createVNode(unref(FormLabelWrap), {
              "is-auto-width": unref(labelStyle).width === "auto",
              "update-all": ((_a2 = unref(formContext)) == null ? void 0 : _a2.labelWidth) === "auto"
            }, {
              default: withCtx(() => [
                unref(hasLabel) ? (openBlock(), createBlock(resolveDynamicComponent(unref(labelFor) ? "label" : "div"), {
                  key: 0,
                  id: unref(labelId),
                  for: unref(labelFor),
                  class: normalizeClass(unref(ns).e("label")),
                  style: normalizeStyle(unref(labelStyle))
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "label", { label: unref(currentLabel) }, () => [
                      createTextVNode(toDisplayString(unref(currentLabel)), 1)
                    ])
                  ]),
                  _: 3
                }, 8, ["id", "for", "class", "style"])) : createCommentVNode("v-if", true)
              ]),
              _: 3
            }, 8, ["is-auto-width", "update-all"]),
            createBaseVNode("div", {
              class: normalizeClass(unref(ns).e("content")),
              style: normalizeStyle(unref(contentStyle))
            }, [
              renderSlot(_ctx.$slots, "default"),
              createVNode(TransitionGroup, {
                name: `${unref(ns).namespace.value}-zoom-in-top`
              }, {
                default: withCtx(() => [
                  unref(shouldShowError) ? renderSlot(_ctx.$slots, "error", {
                    key: 0,
                    error: validateMessage.value
                  }, () => [
                    createBaseVNode("div", {
                      class: normalizeClass(unref(validateClasses))
                    }, toDisplayString(validateMessage.value), 3)
                  ]) : createCommentVNode("v-if", true)
                ]),
                _: 3
              }, 8, ["name"])
            ], 6)
          ], 10, _hoisted_1$f);
        };
      }
    });
    var FormItem = /* @__PURE__ */ _export_sfc$1(_sfc_main$A, [["__file", "form-item.vue"]]);
    const ElForm = withInstall(Form, {
      FormItem
    });
    const ElFormItem = withNoopInstall(FormItem);
    let hiddenTextarea = void 0;
    const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  ${isFirefox() ? "" : "overflow:hidden !important;"}
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`;
    const CONTEXT_STYLE = [
      "letter-spacing",
      "line-height",
      "padding-top",
      "padding-bottom",
      "font-family",
      "font-weight",
      "font-size",
      "text-rendering",
      "text-transform",
      "width",
      "text-indent",
      "padding-left",
      "padding-right",
      "border-width",
      "box-sizing"
    ];
    function calculateNodeStyling(targetElement) {
      const style = window.getComputedStyle(targetElement);
      const boxSizing = style.getPropertyValue("box-sizing");
      const paddingSize = Number.parseFloat(style.getPropertyValue("padding-bottom")) + Number.parseFloat(style.getPropertyValue("padding-top"));
      const borderSize = Number.parseFloat(style.getPropertyValue("border-bottom-width")) + Number.parseFloat(style.getPropertyValue("border-top-width"));
      const contextStyle = CONTEXT_STYLE.map((name) => `${name}:${style.getPropertyValue(name)}`).join(";");
      return { contextStyle, paddingSize, borderSize, boxSizing };
    }
    function calcTextareaHeight(targetElement, minRows = 1, maxRows) {
      var _a2;
      if (!hiddenTextarea) {
        hiddenTextarea = document.createElement("textarea");
        document.body.appendChild(hiddenTextarea);
      }
      const { paddingSize, borderSize, boxSizing, contextStyle } = calculateNodeStyling(targetElement);
      hiddenTextarea.setAttribute("style", `${contextStyle};${HIDDEN_STYLE}`);
      hiddenTextarea.value = targetElement.value || targetElement.placeholder || "";
      let height = hiddenTextarea.scrollHeight;
      const result = {};
      if (boxSizing === "border-box") {
        height = height + borderSize;
      } else if (boxSizing === "content-box") {
        height = height - paddingSize;
      }
      hiddenTextarea.value = "";
      const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
      if (isNumber(minRows)) {
        let minHeight = singleRowHeight * minRows;
        if (boxSizing === "border-box") {
          minHeight = minHeight + paddingSize + borderSize;
        }
        height = Math.max(minHeight, height);
        result.minHeight = `${minHeight}px`;
      }
      if (isNumber(maxRows)) {
        let maxHeight = singleRowHeight * maxRows;
        if (boxSizing === "border-box") {
          maxHeight = maxHeight + paddingSize + borderSize;
        }
        height = Math.min(maxHeight, height);
      }
      result.height = `${height}px`;
      (_a2 = hiddenTextarea.parentNode) == null ? void 0 : _a2.removeChild(hiddenTextarea);
      hiddenTextarea = void 0;
      return result;
    }
    const inputProps = buildProps({
      id: {
        type: String,
        default: void 0
      },
      size: useSizeProp,
      disabled: Boolean,
      modelValue: {
        type: definePropType([
          String,
          Number,
          Object
        ]),
        default: ""
      },
      maxlength: {
        type: [String, Number]
      },
      minlength: {
        type: [String, Number]
      },
      type: {
        type: String,
        default: "text"
      },
      resize: {
        type: String,
        values: ["none", "both", "horizontal", "vertical"]
      },
      autosize: {
        type: definePropType([Boolean, Object]),
        default: false
      },
      autocomplete: {
        type: String,
        default: "off"
      },
      formatter: {
        type: Function
      },
      parser: {
        type: Function
      },
      placeholder: {
        type: String
      },
      form: {
        type: String
      },
      readonly: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: false
      },
      showPassword: {
        type: Boolean,
        default: false
      },
      showWordLimit: {
        type: Boolean,
        default: false
      },
      suffixIcon: {
        type: iconPropType
      },
      prefixIcon: {
        type: iconPropType
      },
      containerRole: {
        type: String,
        default: void 0
      },
      label: {
        type: String,
        default: void 0
      },
      tabindex: {
        type: [String, Number],
        default: 0
      },
      validateEvent: {
        type: Boolean,
        default: true
      },
      inputStyle: {
        type: definePropType([Object, Array, String]),
        default: () => mutable({})
      },
      autofocus: {
        type: Boolean,
        default: false
      }
    });
    const inputEmits = {
      [UPDATE_MODEL_EVENT]: (value) => isString$1(value),
      input: (value) => isString$1(value),
      change: (value) => isString$1(value),
      focus: (evt) => evt instanceof FocusEvent,
      blur: (evt) => evt instanceof FocusEvent,
      clear: () => true,
      mouseleave: (evt) => evt instanceof MouseEvent,
      mouseenter: (evt) => evt instanceof MouseEvent,
      keydown: (evt) => evt instanceof Event,
      compositionstart: (evt) => evt instanceof CompositionEvent,
      compositionupdate: (evt) => evt instanceof CompositionEvent,
      compositionend: (evt) => evt instanceof CompositionEvent
    };
    const _hoisted_1$e = ["role"];
    const _hoisted_2$b = ["id", "minlength", "maxlength", "type", "disabled", "readonly", "autocomplete", "tabindex", "aria-label", "placeholder", "form", "autofocus"];
    const _hoisted_3$8 = ["id", "minlength", "maxlength", "tabindex", "disabled", "readonly", "autocomplete", "aria-label", "placeholder", "form", "autofocus"];
    const __default__$m = /* @__PURE__ */ defineComponent({
      name: "ElInput",
      inheritAttrs: false
    });
    const _sfc_main$z = /* @__PURE__ */ defineComponent({
      ...__default__$m,
      props: inputProps,
      emits: inputEmits,
      setup(__props, { expose, emit: emit2 }) {
        const props = __props;
        const rawAttrs = useAttrs$1();
        const slots = useSlots();
        const containerAttrs = computed(() => {
          const comboBoxAttrs = {};
          if (props.containerRole === "combobox") {
            comboBoxAttrs["aria-haspopup"] = rawAttrs["aria-haspopup"];
            comboBoxAttrs["aria-owns"] = rawAttrs["aria-owns"];
            comboBoxAttrs["aria-expanded"] = rawAttrs["aria-expanded"];
          }
          return comboBoxAttrs;
        });
        const containerKls = computed(() => [
          props.type === "textarea" ? nsTextarea.b() : nsInput.b(),
          nsInput.m(inputSize.value),
          nsInput.is("disabled", inputDisabled.value),
          nsInput.is("exceed", inputExceed.value),
          {
            [nsInput.b("group")]: slots.prepend || slots.append,
            [nsInput.bm("group", "append")]: slots.append,
            [nsInput.bm("group", "prepend")]: slots.prepend,
            [nsInput.m("prefix")]: slots.prefix || props.prefixIcon,
            [nsInput.m("suffix")]: slots.suffix || props.suffixIcon || props.clearable || props.showPassword,
            [nsInput.bm("suffix", "password-clear")]: showClear.value && showPwdVisible.value,
            [nsInput.b("hidden")]: props.type === "hidden"
          },
          rawAttrs.class
        ]);
        const wrapperKls = computed(() => [
          nsInput.e("wrapper"),
          nsInput.is("focus", isFocused.value)
        ]);
        const attrs = useAttrs({
          excludeKeys: computed(() => {
            return Object.keys(containerAttrs.value);
          })
        });
        const { form: elForm2, formItem: elFormItem2 } = useFormItem();
        const { inputId } = useFormItemInputId(props, {
          formItemContext: elFormItem2
        });
        const inputSize = useFormSize();
        const inputDisabled = useFormDisabled();
        const nsInput = useNamespace("input");
        const nsTextarea = useNamespace("textarea");
        const input = shallowRef();
        const textarea = shallowRef();
        const hovering = ref(false);
        const isComposing = ref(false);
        const passwordVisible = ref(false);
        const countStyle = ref();
        const textareaCalcStyle = shallowRef(props.inputStyle);
        const _ref = computed(() => input.value || textarea.value);
        const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(_ref, {
          afterBlur() {
            var _a2;
            if (props.validateEvent) {
              (_a2 = elFormItem2 == null ? void 0 : elFormItem2.validate) == null ? void 0 : _a2.call(elFormItem2, "blur").catch((err) => debugWarn());
            }
          }
        });
        const needStatusIcon = computed(() => {
          var _a2;
          return (_a2 = elForm2 == null ? void 0 : elForm2.statusIcon) != null ? _a2 : false;
        });
        const validateState = computed(() => (elFormItem2 == null ? void 0 : elFormItem2.validateState) || "");
        const validateIcon = computed(() => validateState.value && ValidateComponentsMap[validateState.value]);
        const passwordIcon = computed(() => passwordVisible.value ? view_default : hide_default);
        const containerStyle = computed(() => [
          rawAttrs.style
        ]);
        const textareaStyle = computed(() => [
          props.inputStyle,
          textareaCalcStyle.value,
          { resize: props.resize }
        ]);
        const nativeInputValue = computed(() => isNil(props.modelValue) ? "" : String(props.modelValue));
        const showClear = computed(() => props.clearable && !inputDisabled.value && !props.readonly && !!nativeInputValue.value && (isFocused.value || hovering.value));
        const showPwdVisible = computed(() => props.showPassword && !inputDisabled.value && !props.readonly && !!nativeInputValue.value && (!!nativeInputValue.value || isFocused.value));
        const isWordLimitVisible = computed(() => props.showWordLimit && !!props.maxlength && (props.type === "text" || props.type === "textarea") && !inputDisabled.value && !props.readonly && !props.showPassword);
        const textLength = computed(() => nativeInputValue.value.length);
        const inputExceed = computed(() => !!isWordLimitVisible.value && textLength.value > Number(props.maxlength));
        const suffixVisible = computed(() => !!slots.suffix || !!props.suffixIcon || showClear.value || props.showPassword || isWordLimitVisible.value || !!validateState.value && needStatusIcon.value);
        const [recordCursor, setCursor] = useCursor(input);
        useResizeObserver(textarea, (entries) => {
          onceInitSizeTextarea();
          if (!isWordLimitVisible.value || props.resize !== "both")
            return;
          const entry = entries[0];
          const { width } = entry.contentRect;
          countStyle.value = {
            right: `calc(100% - ${width + 15 + 6}px)`
          };
        });
        const resizeTextarea = () => {
          const { type: type2, autosize } = props;
          if (!isClient || type2 !== "textarea" || !textarea.value)
            return;
          if (autosize) {
            const minRows = isObject$1(autosize) ? autosize.minRows : void 0;
            const maxRows = isObject$1(autosize) ? autosize.maxRows : void 0;
            const textareaStyle2 = calcTextareaHeight(textarea.value, minRows, maxRows);
            textareaCalcStyle.value = {
              overflowY: "hidden",
              ...textareaStyle2
            };
            nextTick(() => {
              textarea.value.offsetHeight;
              textareaCalcStyle.value = textareaStyle2;
            });
          } else {
            textareaCalcStyle.value = {
              minHeight: calcTextareaHeight(textarea.value).minHeight
            };
          }
        };
        const createOnceInitResize = (resizeTextarea2) => {
          let isInit = false;
          return () => {
            var _a2;
            if (isInit || !props.autosize)
              return;
            const isElHidden = ((_a2 = textarea.value) == null ? void 0 : _a2.offsetParent) === null;
            if (!isElHidden) {
              resizeTextarea2();
              isInit = true;
            }
          };
        };
        const onceInitSizeTextarea = createOnceInitResize(resizeTextarea);
        const setNativeInputValue = () => {
          const input2 = _ref.value;
          const formatterValue = props.formatter ? props.formatter(nativeInputValue.value) : nativeInputValue.value;
          if (!input2 || input2.value === formatterValue)
            return;
          input2.value = formatterValue;
        };
        const handleInput = async (event) => {
          recordCursor();
          let { value } = event.target;
          if (props.formatter) {
            value = props.parser ? props.parser(value) : value;
          }
          if (isComposing.value)
            return;
          if (value === nativeInputValue.value) {
            setNativeInputValue();
            return;
          }
          emit2(UPDATE_MODEL_EVENT, value);
          emit2("input", value);
          await nextTick();
          setNativeInputValue();
          setCursor();
        };
        const handleChange = (event) => {
          emit2("change", event.target.value);
        };
        const handleCompositionStart = (event) => {
          emit2("compositionstart", event);
          isComposing.value = true;
        };
        const handleCompositionUpdate = (event) => {
          var _a2;
          emit2("compositionupdate", event);
          const text = (_a2 = event.target) == null ? void 0 : _a2.value;
          const lastCharacter = text[text.length - 1] || "";
          isComposing.value = !isKorean(lastCharacter);
        };
        const handleCompositionEnd = (event) => {
          emit2("compositionend", event);
          if (isComposing.value) {
            isComposing.value = false;
            handleInput(event);
          }
        };
        const handlePasswordVisible = () => {
          passwordVisible.value = !passwordVisible.value;
          focus();
        };
        const focus = async () => {
          var _a2;
          await nextTick();
          (_a2 = _ref.value) == null ? void 0 : _a2.focus();
        };
        const blur = () => {
          var _a2;
          return (_a2 = _ref.value) == null ? void 0 : _a2.blur();
        };
        const handleMouseLeave = (evt) => {
          hovering.value = false;
          emit2("mouseleave", evt);
        };
        const handleMouseEnter = (evt) => {
          hovering.value = true;
          emit2("mouseenter", evt);
        };
        const handleKeydown = (evt) => {
          emit2("keydown", evt);
        };
        const select = () => {
          var _a2;
          (_a2 = _ref.value) == null ? void 0 : _a2.select();
        };
        const clear2 = () => {
          emit2(UPDATE_MODEL_EVENT, "");
          emit2("change", "");
          emit2("clear");
          emit2("input", "");
        };
        watch(() => props.modelValue, () => {
          var _a2;
          nextTick(() => resizeTextarea());
          if (props.validateEvent) {
            (_a2 = elFormItem2 == null ? void 0 : elFormItem2.validate) == null ? void 0 : _a2.call(elFormItem2, "change").catch((err) => debugWarn());
          }
        });
        watch(nativeInputValue, () => setNativeInputValue());
        watch(() => props.type, async () => {
          await nextTick();
          setNativeInputValue();
          resizeTextarea();
        });
        onMounted(() => {
          if (!props.formatter && props.parser)
            ;
          setNativeInputValue();
          nextTick(resizeTextarea);
        });
        expose({
          input,
          textarea,
          ref: _ref,
          textareaStyle,
          autosize: toRef(props, "autosize"),
          focus,
          blur,
          select,
          clear: clear2,
          resizeTextarea
        });
        return (_ctx, _cache) => {
          return openBlock(), createElementBlock("div", mergeProps(unref(containerAttrs), {
            class: unref(containerKls),
            style: unref(containerStyle),
            role: _ctx.containerRole,
            onMouseenter: handleMouseEnter,
            onMouseleave: handleMouseLeave
          }), [
            createCommentVNode(" input "),
            _ctx.type !== "textarea" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createCommentVNode(" prepend slot "),
              _ctx.$slots.prepend ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(unref(nsInput).be("group", "prepend"))
              }, [
                renderSlot(_ctx.$slots, "prepend")
              ], 2)) : createCommentVNode("v-if", true),
              createBaseVNode("div", {
                ref_key: "wrapperRef",
                ref: wrapperRef,
                class: normalizeClass(unref(wrapperKls))
              }, [
                createCommentVNode(" prefix slot "),
                _ctx.$slots.prefix || _ctx.prefixIcon ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  class: normalizeClass(unref(nsInput).e("prefix"))
                }, [
                  createBaseVNode("span", {
                    class: normalizeClass(unref(nsInput).e("prefix-inner"))
                  }, [
                    renderSlot(_ctx.$slots, "prefix"),
                    _ctx.prefixIcon ? (openBlock(), createBlock(unref(ElIcon), {
                      key: 0,
                      class: normalizeClass(unref(nsInput).e("icon"))
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(_ctx.prefixIcon)))
                      ]),
                      _: 1
                    }, 8, ["class"])) : createCommentVNode("v-if", true)
                  ], 2)
                ], 2)) : createCommentVNode("v-if", true),
                createBaseVNode("input", mergeProps({
                  id: unref(inputId),
                  ref_key: "input",
                  ref: input,
                  class: unref(nsInput).e("inner")
                }, unref(attrs), {
                  minlength: _ctx.minlength,
                  maxlength: _ctx.maxlength,
                  type: _ctx.showPassword ? passwordVisible.value ? "text" : "password" : _ctx.type,
                  disabled: unref(inputDisabled),
                  readonly: _ctx.readonly,
                  autocomplete: _ctx.autocomplete,
                  tabindex: _ctx.tabindex,
                  "aria-label": _ctx.label,
                  placeholder: _ctx.placeholder,
                  style: _ctx.inputStyle,
                  form: _ctx.form,
                  autofocus: _ctx.autofocus,
                  onCompositionstart: handleCompositionStart,
                  onCompositionupdate: handleCompositionUpdate,
                  onCompositionend: handleCompositionEnd,
                  onInput: handleInput,
                  onFocus: _cache[0] || (_cache[0] = (...args) => unref(handleFocus) && unref(handleFocus)(...args)),
                  onBlur: _cache[1] || (_cache[1] = (...args) => unref(handleBlur) && unref(handleBlur)(...args)),
                  onChange: handleChange,
                  onKeydown: handleKeydown
                }), null, 16, _hoisted_2$b),
                createCommentVNode(" suffix slot "),
                unref(suffixVisible) ? (openBlock(), createElementBlock("span", {
                  key: 1,
                  class: normalizeClass(unref(nsInput).e("suffix"))
                }, [
                  createBaseVNode("span", {
                    class: normalizeClass(unref(nsInput).e("suffix-inner"))
                  }, [
                    !unref(showClear) || !unref(showPwdVisible) || !unref(isWordLimitVisible) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                      renderSlot(_ctx.$slots, "suffix"),
                      _ctx.suffixIcon ? (openBlock(), createBlock(unref(ElIcon), {
                        key: 0,
                        class: normalizeClass(unref(nsInput).e("icon"))
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(resolveDynamicComponent(_ctx.suffixIcon)))
                        ]),
                        _: 1
                      }, 8, ["class"])) : createCommentVNode("v-if", true)
                    ], 64)) : createCommentVNode("v-if", true),
                    unref(showClear) ? (openBlock(), createBlock(unref(ElIcon), {
                      key: 1,
                      class: normalizeClass([unref(nsInput).e("icon"), unref(nsInput).e("clear")]),
                      onMousedown: withModifiers(unref(NOOP), ["prevent"]),
                      onClick: clear2
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(circle_close_default))
                      ]),
                      _: 1
                    }, 8, ["class", "onMousedown"])) : createCommentVNode("v-if", true),
                    unref(showPwdVisible) ? (openBlock(), createBlock(unref(ElIcon), {
                      key: 2,
                      class: normalizeClass([unref(nsInput).e("icon"), unref(nsInput).e("password")]),
                      onClick: handlePasswordVisible
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(unref(passwordIcon))))
                      ]),
                      _: 1
                    }, 8, ["class"])) : createCommentVNode("v-if", true),
                    unref(isWordLimitVisible) ? (openBlock(), createElementBlock("span", {
                      key: 3,
                      class: normalizeClass(unref(nsInput).e("count"))
                    }, [
                      createBaseVNode("span", {
                        class: normalizeClass(unref(nsInput).e("count-inner"))
                      }, toDisplayString(unref(textLength)) + " / " + toDisplayString(_ctx.maxlength), 3)
                    ], 2)) : createCommentVNode("v-if", true),
                    unref(validateState) && unref(validateIcon) && unref(needStatusIcon) ? (openBlock(), createBlock(unref(ElIcon), {
                      key: 4,
                      class: normalizeClass([
                        unref(nsInput).e("icon"),
                        unref(nsInput).e("validateIcon"),
                        unref(nsInput).is("loading", unref(validateState) === "validating")
                      ])
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(unref(validateIcon))))
                      ]),
                      _: 1
                    }, 8, ["class"])) : createCommentVNode("v-if", true)
                  ], 2)
                ], 2)) : createCommentVNode("v-if", true)
              ], 2),
              createCommentVNode(" append slot "),
              _ctx.$slots.append ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(unref(nsInput).be("group", "append"))
              }, [
                renderSlot(_ctx.$slots, "append")
              ], 2)) : createCommentVNode("v-if", true)
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createCommentVNode(" textarea "),
              createBaseVNode("textarea", mergeProps({
                id: unref(inputId),
                ref_key: "textarea",
                ref: textarea,
                class: unref(nsTextarea).e("inner")
              }, unref(attrs), {
                minlength: _ctx.minlength,
                maxlength: _ctx.maxlength,
                tabindex: _ctx.tabindex,
                disabled: unref(inputDisabled),
                readonly: _ctx.readonly,
                autocomplete: _ctx.autocomplete,
                style: unref(textareaStyle),
                "aria-label": _ctx.label,
                placeholder: _ctx.placeholder,
                form: _ctx.form,
                autofocus: _ctx.autofocus,
                onCompositionstart: handleCompositionStart,
                onCompositionupdate: handleCompositionUpdate,
                onCompositionend: handleCompositionEnd,
                onInput: handleInput,
                onFocus: _cache[2] || (_cache[2] = (...args) => unref(handleFocus) && unref(handleFocus)(...args)),
                onBlur: _cache[3] || (_cache[3] = (...args) => unref(handleBlur) && unref(handleBlur)(...args)),
                onChange: handleChange,
                onKeydown: handleKeydown
              }), null, 16, _hoisted_3$8),
              unref(isWordLimitVisible) ? (openBlock(), createElementBlock("span", {
                key: 0,
                style: normalizeStyle(countStyle.value),
                class: normalizeClass(unref(nsInput).e("count"))
              }, toDisplayString(unref(textLength)) + " / " + toDisplayString(_ctx.maxlength), 7)) : createCommentVNode("v-if", true)
            ], 64))
          ], 16, _hoisted_1$e);
        };
      }
    });
    var Input = /* @__PURE__ */ _export_sfc$1(_sfc_main$z, [["__file", "input.vue"]]);
    const ElInput = withInstall(Input);
    const GAP = 4;
    const BAR_MAP = {
      vertical: {
        offset: "offsetHeight",
        scroll: "scrollTop",
        scrollSize: "scrollHeight",
        size: "height",
        key: "vertical",
        axis: "Y",
        client: "clientY",
        direction: "top"
      },
      horizontal: {
        offset: "offsetWidth",
        scroll: "scrollLeft",
        scrollSize: "scrollWidth",
        size: "width",
        key: "horizontal",
        axis: "X",
        client: "clientX",
        direction: "left"
      }
    };
    const renderThumbStyle = ({
      move,
      size: size2,
      bar
    }) => ({
      [bar.size]: size2,
      transform: `translate${bar.axis}(${move}%)`
    });
    const scrollbarContextKey = Symbol("scrollbarContextKey");
    const thumbProps = buildProps({
      vertical: Boolean,
      size: String,
      move: Number,
      ratio: {
        type: Number,
        required: true
      },
      always: Boolean
    });
    const COMPONENT_NAME$4 = "Thumb";
    const _sfc_main$y = /* @__PURE__ */ defineComponent({
      __name: "thumb",
      props: thumbProps,
      setup(__props) {
        const props = __props;
        const scrollbar = inject(scrollbarContextKey);
        const ns = useNamespace("scrollbar");
        if (!scrollbar)
          throwError(COMPONENT_NAME$4, "can not inject scrollbar context");
        const instance = ref();
        const thumb = ref();
        const thumbState = ref({});
        const visible = ref(false);
        let cursorDown = false;
        let cursorLeave = false;
        let originalOnSelectStart = isClient ? document.onselectstart : null;
        const bar = computed(() => BAR_MAP[props.vertical ? "vertical" : "horizontal"]);
        const thumbStyle = computed(() => renderThumbStyle({
          size: props.size,
          move: props.move,
          bar: bar.value
        }));
        const offsetRatio = computed(() => instance.value[bar.value.offset] ** 2 / scrollbar.wrapElement[bar.value.scrollSize] / props.ratio / thumb.value[bar.value.offset]);
        const clickThumbHandler = (e) => {
          var _a2;
          e.stopPropagation();
          if (e.ctrlKey || [1, 2].includes(e.button))
            return;
          (_a2 = window.getSelection()) == null ? void 0 : _a2.removeAllRanges();
          startDrag(e);
          const el = e.currentTarget;
          if (!el)
            return;
          thumbState.value[bar.value.axis] = el[bar.value.offset] - (e[bar.value.client] - el.getBoundingClientRect()[bar.value.direction]);
        };
        const clickTrackHandler = (e) => {
          if (!thumb.value || !instance.value || !scrollbar.wrapElement)
            return;
          const offset = Math.abs(e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]);
          const thumbHalf = thumb.value[bar.value.offset] / 2;
          const thumbPositionPercentage = (offset - thumbHalf) * 100 * offsetRatio.value / instance.value[bar.value.offset];
          scrollbar.wrapElement[bar.value.scroll] = thumbPositionPercentage * scrollbar.wrapElement[bar.value.scrollSize] / 100;
        };
        const startDrag = (e) => {
          e.stopImmediatePropagation();
          cursorDown = true;
          document.addEventListener("mousemove", mouseMoveDocumentHandler);
          document.addEventListener("mouseup", mouseUpDocumentHandler);
          originalOnSelectStart = document.onselectstart;
          document.onselectstart = () => false;
        };
        const mouseMoveDocumentHandler = (e) => {
          if (!instance.value || !thumb.value)
            return;
          if (cursorDown === false)
            return;
          const prevPage = thumbState.value[bar.value.axis];
          if (!prevPage)
            return;
          const offset = (instance.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1;
          const thumbClickPosition = thumb.value[bar.value.offset] - prevPage;
          const thumbPositionPercentage = (offset - thumbClickPosition) * 100 * offsetRatio.value / instance.value[bar.value.offset];
          scrollbar.wrapElement[bar.value.scroll] = thumbPositionPercentage * scrollbar.wrapElement[bar.value.scrollSize] / 100;
        };
        const mouseUpDocumentHandler = () => {
          cursorDown = false;
          thumbState.value[bar.value.axis] = 0;
          document.removeEventListener("mousemove", mouseMoveDocumentHandler);
          document.removeEventListener("mouseup", mouseUpDocumentHandler);
          restoreOnselectstart();
          if (cursorLeave)
            visible.value = false;
        };
        const mouseMoveScrollbarHandler = () => {
          cursorLeave = false;
          visible.value = !!props.size;
        };
        const mouseLeaveScrollbarHandler = () => {
          cursorLeave = true;
          visible.value = cursorDown;
        };
        onBeforeUnmount(() => {
          restoreOnselectstart();
          document.removeEventListener("mouseup", mouseUpDocumentHandler);
        });
        const restoreOnselectstart = () => {
          if (document.onselectstart !== originalOnSelectStart)
            document.onselectstart = originalOnSelectStart;
        };
        useEventListener(toRef(scrollbar, "scrollbarElement"), "mousemove", mouseMoveScrollbarHandler);
        useEventListener(toRef(scrollbar, "scrollbarElement"), "mouseleave", mouseLeaveScrollbarHandler);
        return (_ctx, _cache) => {
          return openBlock(), createBlock(Transition, {
            name: unref(ns).b("fade"),
            persisted: ""
          }, {
            default: withCtx(() => [
              withDirectives(createBaseVNode("div", {
                ref_key: "instance",
                ref: instance,
                class: normalizeClass([unref(ns).e("bar"), unref(ns).is(unref(bar).key)]),
                onMousedown: clickTrackHandler
              }, [
                createBaseVNode("div", {
                  ref_key: "thumb",
                  ref: thumb,
                  class: normalizeClass(unref(ns).e("thumb")),
                  style: normalizeStyle(unref(thumbStyle)),
                  onMousedown: clickThumbHandler
                }, null, 38)
              ], 34), [
                [vShow, _ctx.always || visible.value]
              ])
            ]),
            _: 1
          }, 8, ["name"]);
        };
      }
    });
    var Thumb = /* @__PURE__ */ _export_sfc$1(_sfc_main$y, [["__file", "thumb.vue"]]);
    const barProps = buildProps({
      always: {
        type: Boolean,
        default: true
      },
      minSize: {
        type: Number,
        required: true
      }
    });
    const _sfc_main$x = /* @__PURE__ */ defineComponent({
      __name: "bar",
      props: barProps,
      setup(__props, { expose }) {
        const props = __props;
        const scrollbar = inject(scrollbarContextKey);
        const moveX = ref(0);
        const moveY = ref(0);
        const sizeWidth = ref("");
        const sizeHeight = ref("");
        const ratioY = ref(1);
        const ratioX = ref(1);
        const handleScroll = (wrap) => {
          if (wrap) {
            const offsetHeight = wrap.offsetHeight - GAP;
            const offsetWidth = wrap.offsetWidth - GAP;
            moveY.value = wrap.scrollTop * 100 / offsetHeight * ratioY.value;
            moveX.value = wrap.scrollLeft * 100 / offsetWidth * ratioX.value;
          }
        };
        const update = () => {
          const wrap = scrollbar == null ? void 0 : scrollbar.wrapElement;
          if (!wrap)
            return;
          const offsetHeight = wrap.offsetHeight - GAP;
          const offsetWidth = wrap.offsetWidth - GAP;
          const originalHeight = offsetHeight ** 2 / wrap.scrollHeight;
          const originalWidth = offsetWidth ** 2 / wrap.scrollWidth;
          const height = Math.max(originalHeight, props.minSize);
          const width = Math.max(originalWidth, props.minSize);
          ratioY.value = originalHeight / (offsetHeight - originalHeight) / (height / (offsetHeight - height));
          ratioX.value = originalWidth / (offsetWidth - originalWidth) / (width / (offsetWidth - width));
          sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : "";
          sizeWidth.value = width + GAP < offsetWidth ? `${width}px` : "";
        };
        expose({
          handleScroll,
          update
        });
        return (_ctx, _cache) => {
          return openBlock(), createElementBlock(Fragment, null, [
            createVNode(Thumb, {
              move: moveX.value,
              ratio: ratioX.value,
              size: sizeWidth.value,
              always: _ctx.always
            }, null, 8, ["move", "ratio", "size", "always"]),
            createVNode(Thumb, {
              move: moveY.value,
              ratio: ratioY.value,
              size: sizeHeight.value,
              vertical: "",
              always: _ctx.always
            }, null, 8, ["move", "ratio", "size", "always"])
          ], 64);
        };
      }
    });
    var Bar = /* @__PURE__ */ _export_sfc$1(_sfc_main$x, [["__file", "bar.vue"]]);
    const scrollbarProps = buildProps({
      height: {
        type: [String, Number],
        default: ""
      },
      maxHeight: {
        type: [String, Number],
        default: ""
      },
      native: {
        type: Boolean,
        default: false
      },
      wrapStyle: {
        type: definePropType([String, Object, Array]),
        default: ""
      },
      wrapClass: {
        type: [String, Array],
        default: ""
      },
      viewClass: {
        type: [String, Array],
        default: ""
      },
      viewStyle: {
        type: [String, Array, Object],
        default: ""
      },
      noresize: Boolean,
      tag: {
        type: String,
        default: "div"
      },
      always: Boolean,
      minSize: {
        type: Number,
        default: 20
      },
      id: String,
      role: String,
      ariaLabel: String,
      ariaOrientation: {
        type: String,
        values: ["horizontal", "vertical"]
      }
    });
    const scrollbarEmits = {
      scroll: ({
        scrollTop,
        scrollLeft
      }) => [scrollTop, scrollLeft].every(isNumber)
    };
    const COMPONENT_NAME$3 = "ElScrollbar";
    const __default__$l = /* @__PURE__ */ defineComponent({
      name: COMPONENT_NAME$3
    });
    const _sfc_main$w = /* @__PURE__ */ defineComponent({
      ...__default__$l,
      props: scrollbarProps,
      emits: scrollbarEmits,
      setup(__props, { expose, emit: emit2 }) {
        const props = __props;
        const ns = useNamespace("scrollbar");
        let stopResizeObserver = void 0;
        let stopResizeListener = void 0;
        const scrollbarRef = ref();
        const wrapRef = ref();
        const resizeRef = ref();
        const barRef = ref();
        const wrapStyle = computed(() => {
          const style = {};
          if (props.height)
            style.height = addUnit(props.height);
          if (props.maxHeight)
            style.maxHeight = addUnit(props.maxHeight);
          return [props.wrapStyle, style];
        });
        const wrapKls = computed(() => {
          return [
            props.wrapClass,
            ns.e("wrap"),
            { [ns.em("wrap", "hidden-default")]: !props.native }
          ];
        });
        const resizeKls = computed(() => {
          return [ns.e("view"), props.viewClass];
        });
        const handleScroll = () => {
          var _a2;
          if (wrapRef.value) {
            (_a2 = barRef.value) == null ? void 0 : _a2.handleScroll(wrapRef.value);
            emit2("scroll", {
              scrollTop: wrapRef.value.scrollTop,
              scrollLeft: wrapRef.value.scrollLeft
            });
          }
        };
        function scrollTo(arg1, arg2) {
          if (isObject$1(arg1)) {
            wrapRef.value.scrollTo(arg1);
          } else if (isNumber(arg1) && isNumber(arg2)) {
            wrapRef.value.scrollTo(arg1, arg2);
          }
        }
        const setScrollTop = (value) => {
          if (!isNumber(value)) {
            return;
          }
          wrapRef.value.scrollTop = value;
        };
        const setScrollLeft = (value) => {
          if (!isNumber(value)) {
            return;
          }
          wrapRef.value.scrollLeft = value;
        };
        const update = () => {
          var _a2;
          (_a2 = barRef.value) == null ? void 0 : _a2.update();
        };
        watch(() => props.noresize, (noresize) => {
          if (noresize) {
            stopResizeObserver == null ? void 0 : stopResizeObserver();
            stopResizeListener == null ? void 0 : stopResizeListener();
          } else {
            ({ stop: stopResizeObserver } = useResizeObserver(resizeRef, update));
            stopResizeListener = useEventListener("resize", update);
          }
        }, { immediate: true });
        watch(() => [props.maxHeight, props.height], () => {
          if (!props.native)
            nextTick(() => {
              var _a2;
              update();
              if (wrapRef.value) {
                (_a2 = barRef.value) == null ? void 0 : _a2.handleScroll(wrapRef.value);
              }
            });
        });
        provide(scrollbarContextKey, reactive({
          scrollbarElement: scrollbarRef,
          wrapElement: wrapRef
        }));
        onMounted(() => {
          if (!props.native)
            nextTick(() => {
              update();
            });
        });
        onUpdated(() => update());
        expose({
          wrapRef,
          update,
          scrollTo,
          setScrollTop,
          setScrollLeft,
          handleScroll
        });
        return (_ctx, _cache) => {
          return openBlock(), createElementBlock("div", {
            ref_key: "scrollbarRef",
            ref: scrollbarRef,
            class: normalizeClass(unref(ns).b())
          }, [
            createBaseVNode("div", {
              ref_key: "wrapRef",
              ref: wrapRef,
              class: normalizeClass(unref(wrapKls)),
              style: normalizeStyle(unref(wrapStyle)),
              onScroll: handleScroll
            }, [
              (openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
                id: _ctx.id,
                ref_key: "resizeRef",
                ref: resizeRef,
                class: normalizeClass(unref(resizeKls)),
                style: normalizeStyle(_ctx.viewStyle),
                role: _ctx.role,
                "aria-label": _ctx.ariaLabel,
                "aria-orientation": _ctx.ariaOrientation
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 8, ["id", "class", "style", "role", "aria-label", "aria-orientation"]))
            ], 38),
            !_ctx.native ? (openBlock(), createBlock(Bar, {
              key: 0,
              ref_key: "barRef",
              ref: barRef,
              always: _ctx.always,
              "min-size": _ctx.minSize
            }, null, 8, ["always", "min-size"])) : createCommentVNode("v-if", true)
          ], 2);
        };
      }
    });
    var Scrollbar = /* @__PURE__ */ _export_sfc$1(_sfc_main$w, [["__file", "scrollbar.vue"]]);
    const ElScrollbar = withInstall(Scrollbar);
    const POPPER_INJECTION_KEY = Symbol("popper");
    const POPPER_CONTENT_INJECTION_KEY = Symbol("popperContent");
    const roleTypes = [
      "dialog",
      "grid",
      "group",
      "listbox",
      "menu",
      "navigation",
      "tooltip",
      "tree"
    ];
    const popperProps = buildProps({
      role: {
        type: String,
        values: roleTypes,
        default: "tooltip"
      }
    });
    const __default__$k = /* @__PURE__ */ defineComponent({
      name: "ElPopper",
      inheritAttrs: false
    });
    const _sfc_main$v = /* @__PURE__ */ defineComponent({
      ...__default__$k,
      props: popperProps,
      setup(__props, { expose }) {
        const props = __props;
        const triggerRef = ref();
        const popperInstanceRef = ref();
        const contentRef = ref();
        const referenceRef = ref();
        const role = computed(() => props.role);
        const popperProvides = {
          triggerRef,
          popperInstanceRef,
          contentRef,
          referenceRef,
          role
        };
        expose(popperProvides);
        provide(POPPER_INJECTION_KEY, popperProvides);
        return (_ctx, _cache) => {
          return renderSlot(_ctx.$slots, "default");
        };
      }
    });
    var Popper = /* @__PURE__ */ _export_sfc$1(_sfc_main$v, [["__file", "popper.vue"]]);
    const popperArrowProps = buildProps({
      arrowOffset: {
        type: Number,
        default: 5
      }
    });
    const __default__$j = /* @__PURE__ */ defineComponent({
      name: "ElPopperArrow",
      inheritAttrs: false
    });
    const _sfc_main$u = /* @__PURE__ */ defineComponent({
      ...__default__$j,
      props: popperArrowProps,
      setup(__props, { expose }) {
        const props = __props;
        const ns = useNamespace("popper");
        const { arrowOffset, arrowRef, arrowStyle } = inject(POPPER_CONTENT_INJECTION_KEY, void 0);
        watch(() => props.arrowOffset, (val) => {
          arrowOffset.value = val;
        });
        onBeforeUnmount(() => {
          arrowRef.value = void 0;
        });
        expose({
          arrowRef
        });
        return (_ctx, _cache) => {
          return openBlock(), createElementBlock("span", {
            ref_key: "arrowRef",
            ref: arrowRef,
            class: normalizeClass(unref(ns).e("arrow")),
            style: normalizeStyle(unref(arrowStyle)),
            "data-popper-arrow": ""
          }, null, 6);
        };
      }
    });
    var ElPopperArrow = /* @__PURE__ */ _export_sfc$1(_sfc_main$u, [["__file", "arrow.vue"]]);
    const NAME = "ElOnlyChild";
    const OnlyChild = /* @__PURE__ */ defineComponent({
      name: NAME,
      setup(_, {
        slots,
        attrs
      }) {
        var _a2;
        const forwardRefInjection = inject(FORWARD_REF_INJECTION_KEY);
        const forwardRefDirective = useForwardRefDirective((_a2 = forwardRefInjection == null ? void 0 : forwardRefInjection.setForwardRef) != null ? _a2 : NOOP);
        return () => {
          var _a22;
          const defaultSlot = (_a22 = slots.default) == null ? void 0 : _a22.call(slots, attrs);
          if (!defaultSlot)
            return null;
          if (defaultSlot.length > 1) {
            return null;
          }
          const firstLegitNode = findFirstLegitChild(defaultSlot);
          if (!firstLegitNode) {
            return null;
          }
          return withDirectives(cloneVNode(firstLegitNode, attrs), [[forwardRefDirective]]);
        };
      }
    });
    function findFirstLegitChild(node) {
      if (!node)
        return null;
      const children = node;
      for (const child of children) {
        if (isObject$1(child)) {
          switch (child.type) {
            case Comment:
              continue;
            case Text$1:
            case "svg":
              return wrapTextContent(child);
            case Fragment:
              return findFirstLegitChild(child.children);
            default:
              return child;
          }
        }
        return wrapTextContent(child);
      }
      return null;
    }
    function wrapTextContent(s) {
      const ns = useNamespace("only-child");
      return createVNode("span", {
        "class": ns.e("content")
      }, [s]);
    }
    const popperTriggerProps = buildProps({
      virtualRef: {
        type: definePropType(Object)
      },
      virtualTriggering: Boolean,
      onMouseenter: {
        type: definePropType(Function)
      },
      onMouseleave: {
        type: definePropType(Function)
      },
      onClick: {
        type: definePropType(Function)
      },
      onKeydown: {
        type: definePropType(Function)
      },
      onFocus: {
        type: definePropType(Function)
      },
      onBlur: {
        type: definePropType(Function)
      },
      onContextmenu: {
        type: definePropType(Function)
      },
      id: String,
      open: Boolean
    });
    const __default__$i = /* @__PURE__ */ defineComponent({
      name: "ElPopperTrigger",
      inheritAttrs: false
    });
    const _sfc_main$t = /* @__PURE__ */ defineComponent({
      ...__default__$i,
      props: popperTriggerProps,
      setup(__props, { expose }) {
        const props = __props;
        const { role, triggerRef } = inject(POPPER_INJECTION_KEY, void 0);
        useForwardRef(triggerRef);
        const ariaControls = computed(() => {
          return ariaHaspopup.value ? props.id : void 0;
        });
        const ariaDescribedby = computed(() => {
          if (role && role.value === "tooltip") {
            return props.open && props.id ? props.id : void 0;
          }
          return void 0;
        });
        const ariaHaspopup = computed(() => {
          if (role && role.value !== "tooltip") {
            return role.value;
          }
          return void 0;
        });
        const ariaExpanded = computed(() => {
          return ariaHaspopup.value ? `${props.open}` : void 0;
        });
        let virtualTriggerAriaStopWatch = void 0;
        onMounted(() => {
          watch(() => props.virtualRef, (virtualEl) => {
            if (virtualEl) {
              triggerRef.value = unrefElement(virtualEl);
            }
          }, {
            immediate: true
          });
          watch(triggerRef, (el, prevEl) => {
            virtualTriggerAriaStopWatch == null ? void 0 : virtualTriggerAriaStopWatch();
            virtualTriggerAriaStopWatch = void 0;
            if (isElement(el)) {
              [
                "onMouseenter",
                "onMouseleave",
                "onClick",
                "onKeydown",
                "onFocus",
                "onBlur",
                "onContextmenu"
              ].forEach((eventName) => {
                var _a2;
                const handler = props[eventName];
                if (handler) {
                  el.addEventListener(eventName.slice(2).toLowerCase(), handler);
                  (_a2 = prevEl == null ? void 0 : prevEl.removeEventListener) == null ? void 0 : _a2.call(prevEl, eventName.slice(2).toLowerCase(), handler);
                }
              });
              virtualTriggerAriaStopWatch = watch([ariaControls, ariaDescribedby, ariaHaspopup, ariaExpanded], (watches) => {
                [
                  "aria-controls",
                  "aria-describedby",
                  "aria-haspopup",
                  "aria-expanded"
                ].forEach((key2, idx) => {
                  isNil(watches[idx]) ? el.removeAttribute(key2) : el.setAttribute(key2, watches[idx]);
                });
              }, { immediate: true });
            }
            if (isElement(prevEl)) {
              [
                "aria-controls",
                "aria-describedby",
                "aria-haspopup",
                "aria-expanded"
              ].forEach((key2) => prevEl.removeAttribute(key2));
            }
          }, {
            immediate: true
          });
        });
        onBeforeUnmount(() => {
          virtualTriggerAriaStopWatch == null ? void 0 : virtualTriggerAriaStopWatch();
          virtualTriggerAriaStopWatch = void 0;
        });
        expose({
          triggerRef
        });
        return (_ctx, _cache) => {
          return !_ctx.virtualTriggering ? (openBlock(), createBlock(unref(OnlyChild), mergeProps({ key: 0 }, _ctx.$attrs, {
            "aria-controls": unref(ariaControls),
            "aria-describedby": unref(ariaDescribedby),
            "aria-expanded": unref(ariaExpanded),
            "aria-haspopup": unref(ariaHaspopup)
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["aria-controls", "aria-describedby", "aria-expanded", "aria-haspopup"])) : createCommentVNode("v-if", true);
        };
      }
    });
    var ElPopperTrigger = /* @__PURE__ */ _export_sfc$1(_sfc_main$t, [["__file", "trigger.vue"]]);
    const FOCUS_AFTER_TRAPPED = "focus-trap.focus-after-trapped";
    const FOCUS_AFTER_RELEASED = "focus-trap.focus-after-released";
    const FOCUSOUT_PREVENTED = "focus-trap.focusout-prevented";
    const FOCUS_AFTER_TRAPPED_OPTS = {
      cancelable: true,
      bubbles: false
    };
    const FOCUSOUT_PREVENTED_OPTS = {
      cancelable: true,
      bubbles: false
    };
    const ON_TRAP_FOCUS_EVT = "focusAfterTrapped";
    const ON_RELEASE_FOCUS_EVT = "focusAfterReleased";
    const FOCUS_TRAP_INJECTION_KEY = Symbol("elFocusTrap");
    const focusReason = ref();
    const lastUserFocusTimestamp = ref(0);
    const lastAutomatedFocusTimestamp = ref(0);
    let focusReasonUserCount = 0;
    const obtainAllFocusableElements = (element) => {
      const nodes = [];
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, {
        acceptNode: (node) => {
          const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
          if (node.disabled || node.hidden || isHiddenInput)
            return NodeFilter.FILTER_SKIP;
          return node.tabIndex >= 0 || node === document.activeElement ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
      });
      while (walker.nextNode())
        nodes.push(walker.currentNode);
      return nodes;
    };
    const getVisibleElement = (elements, container) => {
      for (const element of elements) {
        if (!isHidden(element, container))
          return element;
      }
    };
    const isHidden = (element, container) => {
      if (getComputedStyle(element).visibility === "hidden")
        return true;
      while (element) {
        if (container && element === container)
          return false;
        if (getComputedStyle(element).display === "none")
          return true;
        element = element.parentElement;
      }
      return false;
    };
    const getEdges = (container) => {
      const focusable = obtainAllFocusableElements(container);
      const first = getVisibleElement(focusable, container);
      const last = getVisibleElement(focusable.reverse(), container);
      return [first, last];
    };
    const isSelectable = (element) => {
      return element instanceof HTMLInputElement && "select" in element;
    };
    const tryFocus = (element, shouldSelect) => {
      if (element && element.focus) {
        const prevFocusedElement = document.activeElement;
        element.focus({ preventScroll: true });
        lastAutomatedFocusTimestamp.value = window.performance.now();
        if (element !== prevFocusedElement && isSelectable(element) && shouldSelect) {
          element.select();
        }
      }
    };
    function removeFromStack(list, item) {
      const copy = [...list];
      const idx = list.indexOf(item);
      if (idx !== -1) {
        copy.splice(idx, 1);
      }
      return copy;
    }
    const createFocusableStack = () => {
      let stack2 = [];
      const push2 = (layer) => {
        const currentLayer = stack2[0];
        if (currentLayer && layer !== currentLayer) {
          currentLayer.pause();
        }
        stack2 = removeFromStack(stack2, layer);
        stack2.unshift(layer);
      };
      const remove2 = (layer) => {
        var _a2, _b;
        stack2 = removeFromStack(stack2, layer);
        (_b = (_a2 = stack2[0]) == null ? void 0 : _a2.resume) == null ? void 0 : _b.call(_a2);
      };
      return {
        push: push2,
        remove: remove2
      };
    };
    const focusFirstDescendant = (elements, shouldSelect = false) => {
      const prevFocusedElement = document.activeElement;
      for (const element of elements) {
        tryFocus(element, shouldSelect);
        if (document.activeElement !== prevFocusedElement)
          return;
      }
    };
    const focusableStack = createFocusableStack();
    const isFocusCausedByUserEvent = () => {
      return lastUserFocusTimestamp.value > lastAutomatedFocusTimestamp.value;
    };
    const notifyFocusReasonPointer = () => {
      focusReason.value = "pointer";
      lastUserFocusTimestamp.value = window.performance.now();
    };
    const notifyFocusReasonKeydown = () => {
      focusReason.value = "keyboard";
      lastUserFocusTimestamp.value = window.performance.now();
    };
    const useFocusReason = () => {
      onMounted(() => {
        if (focusReasonUserCount === 0) {
          document.addEventListener("mousedown", notifyFocusReasonPointer);
          document.addEventListener("touchstart", notifyFocusReasonPointer);
          document.addEventListener("keydown", notifyFocusReasonKeydown);
        }
        focusReasonUserCount++;
      });
      onBeforeUnmount(() => {
        focusReasonUserCount--;
        if (focusReasonUserCount <= 0) {
          document.removeEventListener("mousedown", notifyFocusReasonPointer);
          document.removeEventListener("touchstart", notifyFocusReasonPointer);
          document.removeEventListener("keydown", notifyFocusReasonKeydown);
        }
      });
      return {
        focusReason,
        lastUserFocusTimestamp,
        lastAutomatedFocusTimestamp
      };
    };
    const createFocusOutPreventedEvent = (detail) => {
      return new CustomEvent(FOCUSOUT_PREVENTED, {
        ...FOCUSOUT_PREVENTED_OPTS,
        detail
      });
    };
    const _sfc_main$s = /* @__PURE__ */ defineComponent({
      name: "ElFocusTrap",
      inheritAttrs: false,
      props: {
        loop: Boolean,
        trapped: Boolean,
        focusTrapEl: Object,
        focusStartEl: {
          type: [Object, String],
          default: "first"
        }
      },
      emits: [
        ON_TRAP_FOCUS_EVT,
        ON_RELEASE_FOCUS_EVT,
        "focusin",
        "focusout",
        "focusout-prevented",
        "release-requested"
      ],
      setup(props, { emit: emit2 }) {
        const forwardRef = ref();
        let lastFocusBeforeTrapped;
        let lastFocusAfterTrapped;
        const { focusReason: focusReason2 } = useFocusReason();
        useEscapeKeydown((event) => {
          if (props.trapped && !focusLayer.paused) {
            emit2("release-requested", event);
          }
        });
        const focusLayer = {
          paused: false,
          pause() {
            this.paused = true;
          },
          resume() {
            this.paused = false;
          }
        };
        const onKeydown = (e) => {
          if (!props.loop && !props.trapped)
            return;
          if (focusLayer.paused)
            return;
          const { key: key2, altKey, ctrlKey, metaKey, currentTarget, shiftKey } = e;
          const { loop } = props;
          const isTabbing = key2 === EVENT_CODE.tab && !altKey && !ctrlKey && !metaKey;
          const currentFocusingEl = document.activeElement;
          if (isTabbing && currentFocusingEl) {
            const container = currentTarget;
            const [first, last] = getEdges(container);
            const isTabbable = first && last;
            if (!isTabbable) {
              if (currentFocusingEl === container) {
                const focusoutPreventedEvent = createFocusOutPreventedEvent({
                  focusReason: focusReason2.value
                });
                emit2("focusout-prevented", focusoutPreventedEvent);
                if (!focusoutPreventedEvent.defaultPrevented) {
                  e.preventDefault();
                }
              }
            } else {
              if (!shiftKey && currentFocusingEl === last) {
                const focusoutPreventedEvent = createFocusOutPreventedEvent({
                  focusReason: focusReason2.value
                });
                emit2("focusout-prevented", focusoutPreventedEvent);
                if (!focusoutPreventedEvent.defaultPrevented) {
                  e.preventDefault();
                  if (loop)
                    tryFocus(first, true);
                }
              } else if (shiftKey && [first, container].includes(currentFocusingEl)) {
                const focusoutPreventedEvent = createFocusOutPreventedEvent({
                  focusReason: focusReason2.value
                });
                emit2("focusout-prevented", focusoutPreventedEvent);
                if (!focusoutPreventedEvent.defaultPrevented) {
                  e.preventDefault();
                  if (loop)
                    tryFocus(last, true);
                }
              }
            }
          }
        };
        provide(FOCUS_TRAP_INJECTION_KEY, {
          focusTrapRef: forwardRef,
          onKeydown
        });
        watch(() => props.focusTrapEl, (focusTrapEl) => {
          if (focusTrapEl) {
            forwardRef.value = focusTrapEl;
          }
        }, { immediate: true });
        watch([forwardRef], ([forwardRef2], [oldForwardRef]) => {
          if (forwardRef2) {
            forwardRef2.addEventListener("keydown", onKeydown);
            forwardRef2.addEventListener("focusin", onFocusIn);
            forwardRef2.addEventListener("focusout", onFocusOut);
          }
          if (oldForwardRef) {
            oldForwardRef.removeEventListener("keydown", onKeydown);
            oldForwardRef.removeEventListener("focusin", onFocusIn);
            oldForwardRef.removeEventListener("focusout", onFocusOut);
          }
        });
        const trapOnFocus = (e) => {
          emit2(ON_TRAP_FOCUS_EVT, e);
        };
        const releaseOnFocus = (e) => emit2(ON_RELEASE_FOCUS_EVT, e);
        const onFocusIn = (e) => {
          const trapContainer = unref(forwardRef);
          if (!trapContainer)
            return;
          const target = e.target;
          const relatedTarget = e.relatedTarget;
          const isFocusedInTrap = target && trapContainer.contains(target);
          if (!props.trapped) {
            const isPrevFocusedInTrap = relatedTarget && trapContainer.contains(relatedTarget);
            if (!isPrevFocusedInTrap) {
              lastFocusBeforeTrapped = relatedTarget;
            }
          }
          if (isFocusedInTrap)
            emit2("focusin", e);
          if (focusLayer.paused)
            return;
          if (props.trapped) {
            if (isFocusedInTrap) {
              lastFocusAfterTrapped = target;
            } else {
              tryFocus(lastFocusAfterTrapped, true);
            }
          }
        };
        const onFocusOut = (e) => {
          const trapContainer = unref(forwardRef);
          if (focusLayer.paused || !trapContainer)
            return;
          if (props.trapped) {
            const relatedTarget = e.relatedTarget;
            if (!isNil(relatedTarget) && !trapContainer.contains(relatedTarget)) {
              setTimeout(() => {
                if (!focusLayer.paused && props.trapped) {
                  const focusoutPreventedEvent = createFocusOutPreventedEvent({
                    focusReason: focusReason2.value
                  });
                  emit2("focusout-prevented", focusoutPreventedEvent);
                  if (!focusoutPreventedEvent.defaultPrevented) {
                    tryFocus(lastFocusAfterTrapped, true);
                  }
                }
              }, 0);
            }
          } else {
            const target = e.target;
            const isFocusedInTrap = target && trapContainer.contains(target);
            if (!isFocusedInTrap)
              emit2("focusout", e);
          }
        };
        async function startTrap() {
          await nextTick();
          const trapContainer = unref(forwardRef);
          if (trapContainer) {
            focusableStack.push(focusLayer);
            const prevFocusedElement = trapContainer.contains(document.activeElement) ? lastFocusBeforeTrapped : document.activeElement;
            lastFocusBeforeTrapped = prevFocusedElement;
            const isPrevFocusContained = trapContainer.contains(prevFocusedElement);
            if (!isPrevFocusContained) {
              const focusEvent = new Event(FOCUS_AFTER_TRAPPED, FOCUS_AFTER_TRAPPED_OPTS);
              trapContainer.addEventListener(FOCUS_AFTER_TRAPPED, trapOnFocus);
              trapContainer.dispatchEvent(focusEvent);
              if (!focusEvent.defaultPrevented) {
                nextTick(() => {
                  let focusStartEl = props.focusStartEl;
                  if (!isString$1(focusStartEl)) {
                    tryFocus(focusStartEl);
                    if (document.activeElement !== focusStartEl) {
                      focusStartEl = "first";
                    }
                  }
                  if (focusStartEl === "first") {
                    focusFirstDescendant(obtainAllFocusableElements(trapContainer), true);
                  }
                  if (document.activeElement === prevFocusedElement || focusStartEl === "container") {
                    tryFocus(trapContainer);
                  }
                });
              }
            }
          }
        }
        function stopTrap() {
          const trapContainer = unref(forwardRef);
          if (trapContainer) {
            trapContainer.removeEventListener(FOCUS_AFTER_TRAPPED, trapOnFocus);
            const releasedEvent = new CustomEvent(FOCUS_AFTER_RELEASED, {
              ...FOCUS_AFTER_TRAPPED_OPTS,
              detail: {
                focusReason: focusReason2.value
              }
            });
            trapContainer.addEventListener(FOCUS_AFTER_RELEASED, releaseOnFocus);
            trapContainer.dispatchEvent(releasedEvent);
            if (!releasedEvent.defaultPrevented && (focusReason2.value == "keyboard" || !isFocusCausedByUserEvent() || trapContainer.contains(document.activeElement))) {
              tryFocus(lastFocusBeforeTrapped != null ? lastFocusBeforeTrapped : document.body);
            }
            trapContainer.removeEventListener(FOCUS_AFTER_RELEASED, releaseOnFocus);
            focusableStack.remove(focusLayer);
          }
        }
        onMounted(() => {
          if (props.trapped) {
            startTrap();
          }
          watch(() => props.trapped, (trapped) => {
            if (trapped) {
              startTrap();
            } else {
              stopTrap();
            }
          });
        });
        onBeforeUnmount(() => {
          if (props.trapped) {
            stopTrap();
          }
        });
        return {
          onKeydown
        };
      }
    });
    function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
      return renderSlot(_ctx.$slots, "default", { handleKeydown: _ctx.onKeydown });
    }
    var ElFocusTrap = /* @__PURE__ */ _export_sfc$1(_sfc_main$s, [["render", _sfc_render$7], ["__file", "focus-trap.vue"]]);
    const POSITIONING_STRATEGIES = ["fixed", "absolute"];
    const popperCoreConfigProps = buildProps({
      boundariesPadding: {
        type: Number,
        default: 0
      },
      fallbackPlacements: {
        type: definePropType(Array),
        default: void 0
      },
      gpuAcceleration: {
        type: Boolean,
        default: true
      },
      offset: {
        type: Number,
        default: 12
      },
      placement: {
        type: String,
        values: Ee,
        default: "bottom"
      },
      popperOptions: {
        type: definePropType(Object),
        default: () => ({})
      },
      strategy: {
        type: String,
        values: POSITIONING_STRATEGIES,
        default: "absolute"
      }
    });
    const popperContentProps = buildProps({
      ...popperCoreConfigProps,
      id: String,
      style: {
        type: definePropType([String, Array, Object])
      },
      className: {
        type: definePropType([String, Array, Object])
      },
      effect: {
        type: String,
        default: "dark"
      },
      visible: Boolean,
      enterable: {
        type: Boolean,
        default: true
      },
      pure: Boolean,
      focusOnShow: {
        type: Boolean,
        default: false
      },
      trapping: {
        type: Boolean,
        default: false
      },
      popperClass: {
        type: definePropType([String, Array, Object])
      },
      popperStyle: {
        type: definePropType([String, Array, Object])
      },
      referenceEl: {
        type: definePropType(Object)
      },
      triggerTargetEl: {
        type: definePropType(Object)
      },
      stopPopperMouseEvent: {
        type: Boolean,
        default: true
      },
      ariaLabel: {
        type: String,
        default: void 0
      },
      virtualTriggering: Boolean,
      zIndex: Number
    });
    const popperContentEmits = {
      mouseenter: (evt) => evt instanceof MouseEvent,
      mouseleave: (evt) => evt instanceof MouseEvent,
      focus: () => true,
      blur: () => true,
      close: () => true
    };
    const buildPopperOptions = (props, modifiers = []) => {
      const { placement, strategy, popperOptions } = props;
      const options = {
        placement,
        strategy,
        ...popperOptions,
        modifiers: [...genModifiers(props), ...modifiers]
      };
      deriveExtraModifiers(options, popperOptions == null ? void 0 : popperOptions.modifiers);
      return options;
    };
    const unwrapMeasurableEl = ($el) => {
      if (!isClient)
        return;
      return unrefElement($el);
    };
    function genModifiers(options) {
      const { offset, gpuAcceleration, fallbackPlacements } = options;
      return [
        {
          name: "offset",
          options: {
            offset: [0, offset != null ? offset : 12]
          }
        },
        {
          name: "preventOverflow",
          options: {
            padding: {
              top: 2,
              bottom: 2,
              left: 5,
              right: 5
            }
          }
        },
        {
          name: "flip",
          options: {
            padding: 5,
            fallbackPlacements
          }
        },
        {
          name: "computeStyles",
          options: {
            gpuAcceleration
          }
        }
      ];
    }
    function deriveExtraModifiers(options, modifiers) {
      if (modifiers) {
        options.modifiers = [...options.modifiers, ...modifiers != null ? modifiers : []];
      }
    }
    const DEFAULT_ARROW_OFFSET = 0;
    const usePopperContent = (props) => {
      const { popperInstanceRef, contentRef, triggerRef, role } = inject(POPPER_INJECTION_KEY, void 0);
      const arrowRef = ref();
      const arrowOffset = ref();
      const eventListenerModifier = computed(() => {
        return {
          name: "eventListeners",
          enabled: !!props.visible
        };
      });
      const arrowModifier = computed(() => {
        var _a2;
        const arrowEl = unref(arrowRef);
        const offset = (_a2 = unref(arrowOffset)) != null ? _a2 : DEFAULT_ARROW_OFFSET;
        return {
          name: "arrow",
          enabled: !isUndefined$1(arrowEl),
          options: {
            element: arrowEl,
            padding: offset
          }
        };
      });
      const options = computed(() => {
        return {
          onFirstUpdate: () => {
            update();
          },
          ...buildPopperOptions(props, [
            unref(arrowModifier),
            unref(eventListenerModifier)
          ])
        };
      });
      const computedReference = computed(() => unwrapMeasurableEl(props.referenceEl) || unref(triggerRef));
      const { attributes, state, styles, update, forceUpdate, instanceRef } = usePopper(computedReference, contentRef, options);
      watch(instanceRef, (instance) => popperInstanceRef.value = instance);
      onMounted(() => {
        watch(() => {
          var _a2;
          return (_a2 = unref(computedReference)) == null ? void 0 : _a2.getBoundingClientRect();
        }, () => {
          update();
        });
      });
      return {
        attributes,
        arrowRef,
        contentRef,
        instanceRef,
        state,
        styles,
        role,
        forceUpdate,
        update
      };
    };
    const usePopperContentDOM = (props, {
      attributes,
      styles,
      role
    }) => {
      const { nextZIndex } = useZIndex();
      const ns = useNamespace("popper");
      const contentAttrs = computed(() => unref(attributes).popper);
      const contentZIndex = ref(isNumber(props.zIndex) ? props.zIndex : nextZIndex());
      const contentClass = computed(() => [
        ns.b(),
        ns.is("pure", props.pure),
        ns.is(props.effect),
        props.popperClass
      ]);
      const contentStyle = computed(() => {
        return [
          { zIndex: unref(contentZIndex) },
          unref(styles).popper,
          props.popperStyle || {}
        ];
      });
      const ariaModal = computed(() => role.value === "dialog" ? "false" : void 0);
      const arrowStyle = computed(() => unref(styles).arrow || {});
      const updateZIndex = () => {
        contentZIndex.value = isNumber(props.zIndex) ? props.zIndex : nextZIndex();
      };
      return {
        ariaModal,
        arrowStyle,
        contentAttrs,
        contentClass,
        contentStyle,
        contentZIndex,
        updateZIndex
      };
    };
    const usePopperContentFocusTrap = (props, emit2) => {
      const trapped = ref(false);
      const focusStartRef = ref();
      const onFocusAfterTrapped = () => {
        emit2("focus");
      };
      const onFocusAfterReleased = (event) => {
        var _a2;
        if (((_a2 = event.detail) == null ? void 0 : _a2.focusReason) !== "pointer") {
          focusStartRef.value = "first";
          emit2("blur");
        }
      };
      const onFocusInTrap = (event) => {
        if (props.visible && !trapped.value) {
          if (event.target) {
            focusStartRef.value = event.target;
          }
          trapped.value = true;
        }
      };
      const onFocusoutPrevented = (event) => {
        if (!props.trapping) {
          if (event.detail.focusReason === "pointer") {
            event.preventDefault();
          }
          trapped.value = false;
        }
      };
      const onReleaseRequested = () => {
        trapped.value = false;
        emit2("close");
      };
      return {
        focusStartRef,
        trapped,
        onFocusAfterReleased,
        onFocusAfterTrapped,
        onFocusInTrap,
        onFocusoutPrevented,
        onReleaseRequested
      };
    };
    const __default__$h = /* @__PURE__ */ defineComponent({
      name: "ElPopperContent"
    });
    const _sfc_main$r = /* @__PURE__ */ defineComponent({
      ...__default__$h,
      props: popperContentProps,
      emits: popperContentEmits,
      setup(__props, { expose, emit: emit2 }) {
        const props = __props;
        const {
          focusStartRef,
          trapped,
          onFocusAfterReleased,
          onFocusAfterTrapped,
          onFocusInTrap,
          onFocusoutPrevented,
          onReleaseRequested
        } = usePopperContentFocusTrap(props, emit2);
        const { attributes, arrowRef, contentRef, styles, instanceRef, role, update } = usePopperContent(props);
        const {
          ariaModal,
          arrowStyle,
          contentAttrs,
          contentClass,
          contentStyle,
          updateZIndex
        } = usePopperContentDOM(props, {
          styles,
          attributes,
          role
        });
        const formItemContext = inject(formItemContextKey, void 0);
        const arrowOffset = ref();
        provide(POPPER_CONTENT_INJECTION_KEY, {
          arrowStyle,
          arrowRef,
          arrowOffset
        });
        if (formItemContext && (formItemContext.addInputId || formItemContext.removeInputId)) {
          provide(formItemContextKey, {
            ...formItemContext,
            addInputId: NOOP,
            removeInputId: NOOP
          });
        }
        let triggerTargetAriaStopWatch = void 0;
        const updatePopper = (shouldUpdateZIndex = true) => {
          update();
          shouldUpdateZIndex && updateZIndex();
        };
        const togglePopperAlive = () => {
          updatePopper(false);
          if (props.visible && props.focusOnShow) {
            trapped.value = true;
          } else if (props.visible === false) {
            trapped.value = false;
          }
        };
        onMounted(() => {
          watch(() => props.triggerTargetEl, (triggerTargetEl, prevTriggerTargetEl) => {
            triggerTargetAriaStopWatch == null ? void 0 : triggerTargetAriaStopWatch();
            triggerTargetAriaStopWatch = void 0;
            const el = unref(triggerTargetEl || contentRef.value);
            const prevEl = unref(prevTriggerTargetEl || contentRef.value);
            if (isElement(el)) {
              triggerTargetAriaStopWatch = watch([role, () => props.ariaLabel, ariaModal, () => props.id], (watches) => {
                ["role", "aria-label", "aria-modal", "id"].forEach((key2, idx) => {
                  isNil(watches[idx]) ? el.removeAttribute(key2) : el.setAttribute(key2, watches[idx]);
                });
              }, { immediate: true });
            }
            if (prevEl !== el && isElement(prevEl)) {
              ["role", "aria-label", "aria-modal", "id"].forEach((key2) => {
                prevEl.removeAttribute(key2);
              });
            }
          }, { immediate: true });
          watch(() => props.visible, togglePopperAlive, { immediate: true });
        });
        onBeforeUnmount(() => {
          triggerTargetAriaStopWatch == null ? void 0 : triggerTargetAriaStopWatch();
          triggerTargetAriaStopWatch = void 0;
        });
        expose({
          popperContentRef: contentRef,
          popperInstanceRef: instanceRef,
          updatePopper,
          contentStyle
        });
        return (_ctx, _cache) => {
          return openBlock(), createElementBlock("div", mergeProps({
            ref_key: "contentRef",
            ref: contentRef
          }, unref(contentAttrs), {
            style: unref(contentStyle),
            class: unref(contentClass),
            tabindex: "-1",
            onMouseenter: _cache[0] || (_cache[0] = (e) => _ctx.$emit("mouseenter", e)),
            onMouseleave: _cache[1] || (_cache[1] = (e) => _ctx.$emit("mouseleave", e))
          }), [
            createVNode(unref(ElFocusTrap), {
              trapped: unref(trapped),
              "trap-on-focus-in": true,
              "focus-trap-el": unref(contentRef),
              "focus-start-el": unref(focusStartRef),
              onFocusAfterTrapped: unref(onFocusAfterTrapped),
              onFocusAfterReleased: unref(onFocusAfterReleased),
              onFocusin: unref(onFocusInTrap),
              onFocusoutPrevented: unref(onFocusoutPrevented),
              onReleaseRequested: unref(onReleaseRequested)
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "default")
              ]),
              _: 3
            }, 8, ["trapped", "focus-trap-el", "focus-start-el", "onFocusAfterTrapped", "onFocusAfterReleased", "onFocusin", "onFocusoutPrevented", "onReleaseRequested"])
          ], 16);
        };
      }
    });
    var ElPopperContent = /* @__PURE__ */ _export_sfc$1(_sfc_main$r, [["__file", "content.vue"]]);
    const ElPopper = withInstall(Popper);
    const TOOLTIP_INJECTION_KEY = Symbol("elTooltip");
    const useTooltipContentProps = buildProps({
      ...useDelayedToggleProps,
      ...popperContentProps,
      appendTo: {
        type: definePropType([String, Object])
      },
      content: {
        type: String,
        default: ""
      },
      rawContent: {
        type: Boolean,
        default: false
      },
      persistent: Boolean,
      ariaLabel: String,
      visible: {
        type: definePropType(Boolean),
        default: null
      },
      transition: String,
      teleported: {
        type: Boolean,
        default: true
      },
      disabled: Boolean
    });
    const useTooltipTriggerProps = buildProps({
      ...popperTriggerProps,
      disabled: Boolean,
      trigger: {
        type: definePropType([String, Array]),
        default: "hover"
      },
      triggerKeys: {
        type: definePropType(Array),
        default: () => [EVENT_CODE.enter, EVENT_CODE.space]
      }
    });
    const {
      useModelToggleProps: useTooltipModelToggleProps,
      useModelToggleEmits: useTooltipModelToggleEmits,
      useModelToggle: useTooltipModelToggle
    } = createModelToggleComposable("visible");
    const useTooltipProps = buildProps({
      ...popperProps,
      ...useTooltipModelToggleProps,
      ...useTooltipContentProps,
      ...useTooltipTriggerProps,
      ...popperArrowProps,
      showArrow: {
        type: Boolean,
        default: true
      }
    });
    const tooltipEmits = [
      ...useTooltipModelToggleEmits,
      "before-show",
      "before-hide",
      "show",
      "hide",
      "open",
      "close"
    ];
    const isTriggerType = (trigger2, type2) => {
      if (isArray$2(trigger2)) {
        return trigger2.includes(type2);
      }
      return trigger2 === type2;
    };
    const whenTrigger = (trigger2, type2, handler) => {
      return (e) => {
        isTriggerType(unref(trigger2), type2) && handler(e);
      };
    };
    const __default__$g = /* @__PURE__ */ defineComponent({
      name: "ElTooltipTrigger"
    });
    const _sfc_main$q = /* @__PURE__ */ defineComponent({
      ...__default__$g,
      props: useTooltipTriggerProps,
      setup(__props, { expose }) {
        const props = __props;
        const ns = useNamespace("tooltip");
        const { controlled, id, open, onOpen, onClose, onToggle } = inject(TOOLTIP_INJECTION_KEY, void 0);
        const triggerRef = ref(null);
        const stopWhenControlledOrDisabled = () => {
          if (unref(controlled) || props.disabled) {
            return true;
          }
        };
        const trigger2 = toRef(props, "trigger");
        const onMouseenter = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger2, "hover", onOpen));
        const onMouseleave = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger2, "hover", onClose));
        const onClick = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger2, "click", (e) => {
          if (e.button === 0) {
            onToggle(e);
          }
        }));
        const onFocus = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger2, "focus", onOpen));
        const onBlur = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger2, "focus", onClose));
        const onContextMenu = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger2, "contextmenu", (e) => {
          e.preventDefault();
          onToggle(e);
        }));
        const onKeydown = composeEventHandlers(stopWhenControlledOrDisabled, (e) => {
          const { code } = e;
          if (props.triggerKeys.includes(code)) {
            e.preventDefault();
            onToggle(e);
          }
        });
        expose({
          triggerRef
        });
        return (_ctx, _cache) => {
          return openBlock(), createBlock(unref(ElPopperTrigger), {
            id: unref(id),
            "virtual-ref": _ctx.virtualRef,
            open: unref(open),
            "virtual-triggering": _ctx.virtualTriggering,
            class: normalizeClass(unref(ns).e("trigger")),
            onBlur: unref(onBlur),
            onClick: unref(onClick),
            onContextmenu: unref(onContextMenu),
            onFocus: unref(onFocus),
            onMouseenter: unref(onMouseenter),
            onMouseleave: unref(onMouseleave),
            onKeydown: unref(onKeydown)
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["id", "virtual-ref", "open", "virtual-triggering", "class", "onBlur", "onClick", "onContextmenu", "onFocus", "onMouseenter", "onMouseleave", "onKeydown"]);
        };
      }
    });
    var ElTooltipTrigger = /* @__PURE__ */ _export_sfc$1(_sfc_main$q, [["__file", "trigger.vue"]]);
    const __default__$f = /* @__PURE__ */ defineComponent({
      name: "ElTooltipContent",
      inheritAttrs: false
    });
    const _sfc_main$p = /* @__PURE__ */ defineComponent({
      ...__default__$f,
      props: useTooltipContentProps,
      setup(__props, { expose }) {
        const props = __props;
        const { selector } = usePopperContainerId();
        const ns = useNamespace("tooltip");
        const contentRef = ref(null);
        const destroyed = ref(false);
        const {
          controlled,
          id,
          open,
          trigger: trigger2,
          onClose,
          onOpen,
          onShow,
          onHide,
          onBeforeShow,
          onBeforeHide
        } = inject(TOOLTIP_INJECTION_KEY, void 0);
        const transitionClass = computed(() => {
          return props.transition || `${ns.namespace.value}-fade-in-linear`;
        });
        const persistentRef = computed(() => {
          return props.persistent;
        });
        onBeforeUnmount(() => {
          destroyed.value = true;
        });
        const shouldRender = computed(() => {
          return unref(persistentRef) ? true : unref(open);
        });
        const shouldShow = computed(() => {
          return props.disabled ? false : unref(open);
        });
        const appendTo = computed(() => {
          return props.appendTo || selector.value;
        });
        const contentStyle = computed(() => {
          var _a2;
          return (_a2 = props.style) != null ? _a2 : {};
        });
        const ariaHidden = computed(() => !unref(open));
        const onTransitionLeave = () => {
          onHide();
        };
        const stopWhenControlled = () => {
          if (unref(controlled))
            return true;
        };
        const onContentEnter = composeEventHandlers(stopWhenControlled, () => {
          if (props.enterable && unref(trigger2) === "hover") {
            onOpen();
          }
        });
        const onContentLeave = composeEventHandlers(stopWhenControlled, () => {
          if (unref(trigger2) === "hover") {
            onClose();
          }
        });
        const onBeforeEnter = () => {
          var _a2, _b;
          (_b = (_a2 = contentRef.value) == null ? void 0 : _a2.updatePopper) == null ? void 0 : _b.call(_a2);
          onBeforeShow == null ? void 0 : onBeforeShow();
        };
        const onBeforeLeave = () => {
          onBeforeHide == null ? void 0 : onBeforeHide();
        };
        const onAfterShow = () => {
          onShow();
          stopHandle = onClickOutside(computed(() => {
            var _a2;
            return (_a2 = contentRef.value) == null ? void 0 : _a2.popperContentRef;
          }), () => {
            if (unref(controlled))
              return;
            const $trigger = unref(trigger2);
            if ($trigger !== "hover") {
              onClose();
            }
          });
        };
        const onBlur = () => {
          if (!props.virtualTriggering) {
            onClose();
          }
        };
        let stopHandle;
        watch(() => unref(open), (val) => {
          if (!val) {
            stopHandle == null ? void 0 : stopHandle();
          }
        }, {
          flush: "post"
        });
        watch(() => props.content, () => {
          var _a2, _b;
          (_b = (_a2 = contentRef.value) == null ? void 0 : _a2.updatePopper) == null ? void 0 : _b.call(_a2);
        });
        expose({
          contentRef
        });
        return (_ctx, _cache) => {
          return openBlock(), createBlock(Teleport, {
            disabled: !_ctx.teleported,
            to: unref(appendTo)
          }, [
            createVNode(Transition, {
              name: unref(transitionClass),
              onAfterLeave: onTransitionLeave,
              onBeforeEnter,
              onAfterEnter: onAfterShow,
              onBeforeLeave
            }, {
              default: withCtx(() => [
                unref(shouldRender) ? withDirectives((openBlock(), createBlock(unref(ElPopperContent), mergeProps({
                  key: 0,
                  id: unref(id),
                  ref_key: "contentRef",
                  ref: contentRef
                }, _ctx.$attrs, {
                  "aria-label": _ctx.ariaLabel,
                  "aria-hidden": unref(ariaHidden),
                  "boundaries-padding": _ctx.boundariesPadding,
                  "fallback-placements": _ctx.fallbackPlacements,
                  "gpu-acceleration": _ctx.gpuAcceleration,
                  offset: _ctx.offset,
                  placement: _ctx.placement,
                  "popper-options": _ctx.popperOptions,
                  strategy: _ctx.strategy,
                  effect: _ctx.effect,
                  enterable: _ctx.enterable,
                  pure: _ctx.pure,
                  "popper-class": _ctx.popperClass,
                  "popper-style": [_ctx.popperStyle, unref(contentStyle)],
                  "reference-el": _ctx.referenceEl,
                  "trigger-target-el": _ctx.triggerTargetEl,
                  visible: unref(shouldShow),
                  "z-index": _ctx.zIndex,
                  onMouseenter: unref(onContentEnter),
                  onMouseleave: unref(onContentLeave),
                  onBlur,
                  onClose: unref(onClose)
                }), {
                  default: withCtx(() => [
                    !destroyed.value ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("v-if", true)
                  ]),
                  _: 3
                }, 16, ["id", "aria-label", "aria-hidden", "boundaries-padding", "fallback-placements", "gpu-acceleration", "offset", "placement", "popper-options", "strategy", "effect", "enterable", "pure", "popper-class", "popper-style", "reference-el", "trigger-target-el", "visible", "z-index", "onMouseenter", "onMouseleave", "onClose"])), [
                  [vShow, unref(shouldShow)]
                ]) : createCommentVNode("v-if", true)
              ]),
              _: 3
            }, 8, ["name"])
          ], 8, ["disabled", "to"]);
        };
      }
    });
    var ElTooltipContent = /* @__PURE__ */ _export_sfc$1(_sfc_main$p, [["__file", "content.vue"]]);
    const _hoisted_1$d = ["innerHTML"];
    const _hoisted_2$a = { key: 1 };
    const __default__$e = /* @__PURE__ */ defineComponent({
      name: "ElTooltip"
    });
    const _sfc_main$o = /* @__PURE__ */ defineComponent({
      ...__default__$e,
      props: useTooltipProps,
      emits: tooltipEmits,
      setup(__props, { expose, emit: emit2 }) {
        const props = __props;
        usePopperContainer();
        const id = useId();
        const popperRef = ref();
        const contentRef = ref();
        const updatePopper = () => {
          var _a2;
          const popperComponent = unref(popperRef);
          if (popperComponent) {
            (_a2 = popperComponent.popperInstanceRef) == null ? void 0 : _a2.update();
          }
        };
        const open = ref(false);
        const toggleReason = ref();
        const { show, hide, hasUpdateHandler } = useTooltipModelToggle({
          indicator: open,
          toggleReason
        });
        const { onOpen, onClose } = useDelayedToggle({
          showAfter: toRef(props, "showAfter"),
          hideAfter: toRef(props, "hideAfter"),
          autoClose: toRef(props, "autoClose"),
          open: show,
          close: hide
        });
        const controlled = computed(() => isBoolean(props.visible) && !hasUpdateHandler.value);
        provide(TOOLTIP_INJECTION_KEY, {
          controlled,
          id,
          open: readonly(open),
          trigger: toRef(props, "trigger"),
          onOpen: (event) => {
            onOpen(event);
          },
          onClose: (event) => {
            onClose(event);
          },
          onToggle: (event) => {
            if (unref(open)) {
              onClose(event);
            } else {
              onOpen(event);
            }
          },
          onShow: () => {
            emit2("show", toggleReason.value);
          },
          onHide: () => {
            emit2("hide", toggleReason.value);
          },
          onBeforeShow: () => {
            emit2("before-show", toggleReason.value);
          },
          onBeforeHide: () => {
            emit2("before-hide", toggleReason.value);
          },
          updatePopper
        });
        watch(() => props.disabled, (disabled) => {
          if (disabled && open.value) {
            open.value = false;
          }
        });
        const isFocusInsideContent = (event) => {
          var _a2, _b;
          const popperContent = (_b = (_a2 = contentRef.value) == null ? void 0 : _a2.contentRef) == null ? void 0 : _b.popperContentRef;
          const activeElement = (event == null ? void 0 : event.relatedTarget) || document.activeElement;
          return popperContent && popperContent.contains(activeElement);
        };
        onDeactivated(() => open.value && hide());
        expose({
          popperRef,
          contentRef,
          isFocusInsideContent,
          updatePopper,
          onOpen,
          onClose,
          hide
        });
        return (_ctx, _cache) => {
          return openBlock(), createBlock(unref(ElPopper), {
            ref_key: "popperRef",
            ref: popperRef,
            role: _ctx.role
          }, {
            default: withCtx(() => [
              createVNode(ElTooltipTrigger, {
                disabled: _ctx.disabled,
                trigger: _ctx.trigger,
                "trigger-keys": _ctx.triggerKeys,
                "virtual-ref": _ctx.virtualRef,
                "virtual-triggering": _ctx.virtualTriggering
              }, {
                default: withCtx(() => [
                  _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("v-if", true)
                ]),
                _: 3
              }, 8, ["disabled", "trigger", "trigger-keys", "virtual-ref", "virtual-triggering"]),
              createVNode(ElTooltipContent, {
                ref_key: "contentRef",
                ref: contentRef,
                "aria-label": _ctx.ariaLabel,
                "boundaries-padding": _ctx.boundariesPadding,
                content: _ctx.content,
                disabled: _ctx.disabled,
                effect: _ctx.effect,
                enterable: _ctx.enterable,
                "fallback-placements": _ctx.fallbackPlacements,
                "hide-after": _ctx.hideAfter,
                "gpu-acceleration": _ctx.gpuAcceleration,
                offset: _ctx.offset,
                persistent: _ctx.persistent,
                "popper-class": _ctx.popperClass,
                "popper-style": _ctx.popperStyle,
                placement: _ctx.placement,
                "popper-options": _ctx.popperOptions,
                pure: _ctx.pure,
                "raw-content": _ctx.rawContent,
                "reference-el": _ctx.referenceEl,
                "trigger-target-el": _ctx.triggerTargetEl,
                "show-after": _ctx.showAfter,
                strategy: _ctx.strategy,
                teleported: _ctx.teleported,
                transition: _ctx.transition,
                "virtual-triggering": _ctx.virtualTriggering,
                "z-index": _ctx.zIndex,
                "append-to": _ctx.appendTo
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "content", {}, () => [
                    _ctx.rawContent ? (openBlock(), createElementBlock("span", {
                      key: 0,
                      innerHTML: _ctx.content
                    }, null, 8, _hoisted_1$d)) : (openBlock(), createElementBlock("span", _hoisted_2$a, toDisplayString(_ctx.content), 1))
                  ]),
                  _ctx.showArrow ? (openBlock(), createBlock(unref(ElPopperArrow), {
                    key: 0,
                    "arrow-offset": _ctx.arrowOffset
                  }, null, 8, ["arrow-offset"])) : createCommentVNode("v-if", true)
                ]),
                _: 3
              }, 8, ["aria-label", "boundaries-padding", "content", "disabled", "effect", "enterable", "fallback-placements", "hide-after", "gpu-acceleration", "offset", "persistent", "popper-class", "popper-style", "placement", "popper-options", "pure", "raw-content", "reference-el", "trigger-target-el", "show-after", "strategy", "teleported", "transition", "virtual-triggering", "z-index", "append-to"])
            ]),
            _: 3
          }, 8, ["role"]);
        };
      }
    });
    var Tooltip = /* @__PURE__ */ _export_sfc$1(_sfc_main$o, [["__file", "tooltip.vue"]]);
    const ElTooltip = withInstall(Tooltip);
    const autocompleteProps = buildProps({
      valueKey: {
        type: String,
        default: "value"
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      debounce: {
        type: Number,
        default: 300
      },
      placement: {
        type: definePropType(String),
        values: [
          "top",
          "top-start",
          "top-end",
          "bottom",
          "bottom-start",
          "bottom-end"
        ],
        default: "bottom-start"
      },
      fetchSuggestions: {
        type: definePropType([Function, Array]),
        default: NOOP
      },
      popperClass: {
        type: String,
        default: ""
      },
      triggerOnFocus: {
        type: Boolean,
        default: true
      },
      selectWhenUnmatched: {
        type: Boolean,
        default: false
      },
      hideLoading: {
        type: Boolean,
        default: false
      },
      label: {
        type: String
      },
      teleported: useTooltipContentProps.teleported,
      highlightFirstItem: {
        type: Boolean,
        default: false
      },
      fitInputWidth: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      name: String
    });
    const autocompleteEmits = {
      [UPDATE_MODEL_EVENT]: (value) => isString$1(value),
      [INPUT_EVENT]: (value) => isString$1(value),
      [CHANGE_EVENT]: (value) => isString$1(value),
      focus: (evt) => evt instanceof FocusEvent,
      blur: (evt) => evt instanceof FocusEvent,
      clear: () => true,
      select: (item) => isObject$1(item)
    };
    const _hoisted_1$c = ["aria-expanded", "aria-owns"];
    const _hoisted_2$9 = { key: 0 };
    const _hoisted_3$7 = ["id", "aria-selected", "onClick"];
    const COMPONENT_NAME$2 = "ElAutocomplete";
    const __default__$d = /* @__PURE__ */ defineComponent({
      name: COMPONENT_NAME$2,
      inheritAttrs: false
    });
    const _sfc_main$n = /* @__PURE__ */ defineComponent({
      ...__default__$d,
      props: autocompleteProps,
      emits: autocompleteEmits,
      setup(__props, { expose, emit: emit2 }) {
        const props = __props;
        const attrs = useAttrs();
        const rawAttrs = useAttrs$1();
        const disabled = useFormDisabled();
        const ns = useNamespace("autocomplete");
        const inputRef = ref();
        const regionRef = ref();
        const popperRef = ref();
        const listboxRef = ref();
        let readonly2 = false;
        let ignoreFocusEvent = false;
        const suggestions = ref([]);
        const highlightedIndex = ref(-1);
        const dropdownWidth = ref("");
        const activated = ref(false);
        const suggestionDisabled = ref(false);
        const loading = ref(false);
        const listboxId = useId();
        const styles = computed(() => rawAttrs.style);
        const suggestionVisible = computed(() => {
          const isValidData = suggestions.value.length > 0;
          return (isValidData || loading.value) && activated.value;
        });
        const suggestionLoading = computed(() => !props.hideLoading && loading.value);
        const refInput = computed(() => {
          if (inputRef.value) {
            return Array.from(inputRef.value.$el.querySelectorAll("input"));
          }
          return [];
        });
        const onSuggestionShow = () => {
          if (suggestionVisible.value) {
            dropdownWidth.value = `${inputRef.value.$el.offsetWidth}px`;
          }
        };
        const onHide = () => {
          highlightedIndex.value = -1;
        };
        const getData = async (queryString) => {
          if (suggestionDisabled.value)
            return;
          const cb = (suggestionList) => {
            loading.value = false;
            if (suggestionDisabled.value)
              return;
            if (isArray$2(suggestionList)) {
              suggestions.value = suggestionList;
              highlightedIndex.value = props.highlightFirstItem ? 0 : -1;
            } else {
              throwError(COMPONENT_NAME$2, "autocomplete suggestions must be an array");
            }
          };
          loading.value = true;
          if (isArray$2(props.fetchSuggestions)) {
            cb(props.fetchSuggestions);
          } else {
            const result = await props.fetchSuggestions(queryString, cb);
            if (isArray$2(result))
              cb(result);
          }
        };
        const debouncedGetData = debounce(getData, props.debounce);
        const handleInput = (value) => {
          const valuePresented = !!value;
          emit2(INPUT_EVENT, value);
          emit2(UPDATE_MODEL_EVENT, value);
          suggestionDisabled.value = false;
          activated.value || (activated.value = valuePresented);
          if (!props.triggerOnFocus && !value) {
            suggestionDisabled.value = true;
            suggestions.value = [];
            return;
          }
          debouncedGetData(value);
        };
        const handleMouseDown = (event) => {
          var _a2;
          if (disabled.value)
            return;
          if (((_a2 = event.target) == null ? void 0 : _a2.tagName) !== "INPUT" || refInput.value.includes(document.activeElement)) {
            activated.value = true;
          }
        };
        const handleChange = (value) => {
          emit2(CHANGE_EVENT, value);
        };
        const handleFocus = (evt) => {
          if (!ignoreFocusEvent) {
            activated.value = true;
            emit2("focus", evt);
            if (props.triggerOnFocus && !readonly2) {
              debouncedGetData(String(props.modelValue));
            }
          } else {
            ignoreFocusEvent = false;
          }
        };
        const handleBlur = (evt) => {
          setTimeout(() => {
            var _a2;
            if ((_a2 = popperRef.value) == null ? void 0 : _a2.isFocusInsideContent()) {
              ignoreFocusEvent = true;
              return;
            }
            activated.value && close2();
            emit2("blur", evt);
          });
        };
        const handleClear = () => {
          activated.value = false;
          emit2(UPDATE_MODEL_EVENT, "");
          emit2("clear");
        };
        const handleKeyEnter = async () => {
          if (suggestionVisible.value && highlightedIndex.value >= 0 && highlightedIndex.value < suggestions.value.length) {
            handleSelect(suggestions.value[highlightedIndex.value]);
          } else if (props.selectWhenUnmatched) {
            emit2("select", { value: props.modelValue });
            suggestions.value = [];
            highlightedIndex.value = -1;
          }
        };
        const handleKeyEscape = (evt) => {
          if (suggestionVisible.value) {
            evt.preventDefault();
            evt.stopPropagation();
            close2();
          }
        };
        const close2 = () => {
          activated.value = false;
        };
        const focus = () => {
          var _a2;
          (_a2 = inputRef.value) == null ? void 0 : _a2.focus();
        };
        const blur = () => {
          var _a2;
          (_a2 = inputRef.value) == null ? void 0 : _a2.blur();
        };
        const handleSelect = async (item) => {
          emit2(INPUT_EVENT, item[props.valueKey]);
          emit2(UPDATE_MODEL_EVENT, item[props.valueKey]);
          emit2("select", item);
          suggestions.value = [];
          highlightedIndex.value = -1;
        };
        const highlight = (index) => {
          if (!suggestionVisible.value || loading.value)
            return;
          if (index < 0) {
            highlightedIndex.value = -1;
            return;
          }
          if (index >= suggestions.value.length) {
            index = suggestions.value.length - 1;
          }
          const suggestion = regionRef.value.querySelector(`.${ns.be("suggestion", "wrap")}`);
          const suggestionList = suggestion.querySelectorAll(`.${ns.be("suggestion", "list")} li`);
          const highlightItem = suggestionList[index];
          const scrollTop = suggestion.scrollTop;
          const { offsetTop, scrollHeight } = highlightItem;
          if (offsetTop + scrollHeight > scrollTop + suggestion.clientHeight) {
            suggestion.scrollTop += scrollHeight;
          }
          if (offsetTop < scrollTop) {
            suggestion.scrollTop -= scrollHeight;
          }
          highlightedIndex.value = index;
          inputRef.value.ref.setAttribute("aria-activedescendant", `${listboxId.value}-item-${highlightedIndex.value}`);
        };
        onClickOutside(listboxRef, () => {
          suggestionVisible.value && close2();
        });
        onMounted(() => {
          inputRef.value.ref.setAttribute("role", "textbox");
          inputRef.value.ref.setAttribute("aria-autocomplete", "list");
          inputRef.value.ref.setAttribute("aria-controls", "id");
          inputRef.value.ref.setAttribute("aria-activedescendant", `${listboxId.value}-item-${highlightedIndex.value}`);
          readonly2 = inputRef.value.ref.hasAttribute("readonly");
        });
        expose({
          highlightedIndex,
          activated,
          loading,
          inputRef,
          popperRef,
          suggestions,
          handleSelect,
          handleKeyEnter,
          focus,
          blur,
          close: close2,
          highlight
        });
        return (_ctx, _cache) => {
          return openBlock(), createBlock(unref(ElTooltip), {
            ref_key: "popperRef",
            ref: popperRef,
            visible: unref(suggestionVisible),
            placement: _ctx.placement,
            "fallback-placements": ["bottom-start", "top-start"],
            "popper-class": [unref(ns).e("popper"), _ctx.popperClass],
            teleported: _ctx.teleported,
            "gpu-acceleration": false,
            pure: "",
            "manual-mode": "",
            effect: "light",
            trigger: "click",
            transition: `${unref(ns).namespace.value}-zoom-in-top`,
            persistent: "",
            role: "listbox",
            onBeforeShow: onSuggestionShow,
            onHide
          }, {
            content: withCtx(() => [
              createBaseVNode("div", {
                ref_key: "regionRef",
                ref: regionRef,
                class: normalizeClass([unref(ns).b("suggestion"), unref(ns).is("loading", unref(suggestionLoading))]),
                style: normalizeStyle({
                  [_ctx.fitInputWidth ? "width" : "minWidth"]: dropdownWidth.value,
                  outline: "none"
                }),
                role: "region"
              }, [
                createVNode(unref(ElScrollbar), {
                  id: unref(listboxId),
                  tag: "ul",
                  "wrap-class": unref(ns).be("suggestion", "wrap"),
                  "view-class": unref(ns).be("suggestion", "list"),
                  role: "listbox"
                }, {
                  default: withCtx(() => [
                    unref(suggestionLoading) ? (openBlock(), createElementBlock("li", _hoisted_2$9, [
                      renderSlot(_ctx.$slots, "loading", {}, () => [
                        createVNode(unref(ElIcon), {
                          class: normalizeClass(unref(ns).is("loading"))
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(loading_default))
                          ]),
                          _: 1
                        }, 8, ["class"])
                      ])
                    ])) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(suggestions.value, (item, index) => {
                      return openBlock(), createElementBlock("li", {
                        id: `${unref(listboxId)}-item-${index}`,
                        key: index,
                        class: normalizeClass({ highlighted: highlightedIndex.value === index }),
                        role: "option",
                        "aria-selected": highlightedIndex.value === index,
                        onClick: ($event) => handleSelect(item)
                      }, [
                        renderSlot(_ctx.$slots, "default", { item }, () => [
                          createTextVNode(toDisplayString(item[_ctx.valueKey]), 1)
                        ])
                      ], 10, _hoisted_3$7);
                    }), 128))
                  ]),
                  _: 3
                }, 8, ["id", "wrap-class", "view-class"])
              ], 6)
            ]),
            default: withCtx(() => [
              createBaseVNode("div", {
                ref_key: "listboxRef",
                ref: listboxRef,
                class: normalizeClass([unref(ns).b(), _ctx.$attrs.class]),
                style: normalizeStyle(unref(styles)),
                role: "combobox",
                "aria-haspopup": "listbox",
                "aria-expanded": unref(suggestionVisible),
                "aria-owns": unref(listboxId)
              }, [
                createVNode(unref(ElInput), mergeProps({
                  ref_key: "inputRef",
                  ref: inputRef
                }, unref(attrs), {
                  clearable: _ctx.clearable,
                  disabled: unref(disabled),
                  name: _ctx.name,
                  "model-value": _ctx.modelValue,
                  onInput: handleInput,
                  onChange: handleChange,
                  onFocus: handleFocus,
                  onBlur: handleBlur,
                  onClear: handleClear,
                  onKeydown: [
                    _cache[0] || (_cache[0] = withKeys(withModifiers(($event) => highlight(highlightedIndex.value - 1), ["prevent"]), ["up"])),
                    _cache[1] || (_cache[1] = withKeys(withModifiers(($event) => highlight(highlightedIndex.value + 1), ["prevent"]), ["down"])),
                    withKeys(handleKeyEnter, ["enter"]),
                    withKeys(close2, ["tab"]),
                    withKeys(handleKeyEscape, ["esc"])
                  ],
                  onMousedown: handleMouseDown
                }), createSlots({ _: 2 }, [
                  _ctx.$slots.prepend ? {
                    name: "prepend",
                    fn: withCtx(() => [
                      renderSlot(_ctx.$slots, "prepend")
                    ])
                  } : void 0,
                  _ctx.$slots.append ? {
                    name: "append",
                    fn: withCtx(() => [
                      renderSlot(_ctx.$slots, "append")
                    ])
                  } : void 0,
                  _ctx.$slots.prefix ? {
                    name: "prefix",
                    fn: withCtx(() => [
                      renderSlot(_ctx.$slots, "prefix")
                    ])
                  } : void 0,
                  _ctx.$slots.suffix ? {
                    name: "suffix",
                    fn: withCtx(() => [
                      renderSlot(_ctx.$slots, "suffix")
                    ])
                  } : void 0
                ]), 1040, ["clearable", "disabled", "name", "model-value", "onKeydown"])
              ], 14, _hoisted_1$c)
            ]),
            _: 3
          }, 8, ["visible", "placement", "popper-class", "teleported", "transition"]);
        };
      }
    });
    var Autocomplete = /* @__PURE__ */ _export_sfc$1(_sfc_main$n, [["__file", "autocomplete.vue"]]);
    const ElAutocomplete = withInstall(Autocomplete);
    const badgeProps = buildProps({
      value: {
        type: [String, Number],
        default: ""
      },
      max: {
        type: Number,
        default: 99
      },
      isDot: Boolean,
      hidden: Boolean,
      type: {
        type: String,
        values: ["primary", "success", "warning", "info", "danger"],
        default: "danger"
      },
      showZero: {
        type: Boolean,
        default: true
      },
      color: String,
      dotStyle: {
        type: definePropType([String, Object, Array])
      },
      offset: {
        type: definePropType(Array),
        default: [0, 0]
      },
      dotClass: {
        type: String
      }
    });
    const _hoisted_1$b = ["textContent"];
    const __default__$c = /* @__PURE__ */ defineComponent({
      name: "ElBadge"
    });
    const _sfc_main$m = /* @__PURE__ */ defineComponent({
      ...__default__$c,
      props: badgeProps,
      setup(__props, { expose }) {
        const props = __props;
        const ns = useNamespace("badge");
        const content = computed(() => {
          if (props.isDot)
            return "";
          if (isNumber(props.value) && isNumber(props.max)) {
            if (props.max < props.value) {
              return `${props.max}+`;
            }
            return props.value === 0 && !props.showZero ? "" : `${props.value}`;
          }
          return `${props.value}`;
        });
        const style = computed(() => {
          var _a2, _b, _c, _d, _e;
          return [
            {
              backgroundColor: props.color,
              marginRight: addUnit(-((_b = (_a2 = props.offset) == null ? void 0 : _a2[0]) != null ? _b : 0)),
              marginTop: addUnit((_d = (_c = props.offset) == null ? void 0 : _c[1]) != null ? _d : 0)
            },
            (_e = props.dotStyle) != null ? _e : {}
          ];
        });
        expose({
          content
        });
        return (_ctx, _cache) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(unref(ns).b())
          }, [
            renderSlot(_ctx.$slots, "default"),
            createVNode(Transition, {
              name: `${unref(ns).namespace.value}-zoom-in-center`,
              persisted: ""
            }, {
              default: withCtx(() => [
                withDirectives(createBaseVNode("sup", {
                  class: normalizeClass([
                    unref(ns).e("content"),
                    unref(ns).em("content", _ctx.type),
                    unref(ns).is("fixed", !!_ctx.$slots.default),
                    unref(ns).is("dot", _ctx.isDot),
                    _ctx.dotClass
                  ]),
                  style: normalizeStyle(unref(style)),
                  textContent: toDisplayString(unref(content))
                }, null, 14, _hoisted_1$b), [
                  [vShow, !_ctx.hidden && (unref(content) || _ctx.isDot)]
                ])
              ]),
              _: 1
            }, 8, ["name"])
          ], 2);
        };
      }
    });
    var Badge = /* @__PURE__ */ _export_sfc$1(_sfc_main$m, [["__file", "badge.vue"]]);
    const ElBadge = withInstall(Badge);
    const buttonGroupContextKey = Symbol("buttonGroupContextKey");
    const useButton = (props, emit2) => {
      useDeprecated({
        from: "type.text",
        replacement: "link",
        version: "3.0.0",
        scope: "props",
        ref: "https://element-plus.org/en-US/component/button.html#button-attributes"
      }, computed(() => props.type === "text"));
      const buttonGroupContext = inject(buttonGroupContextKey, void 0);
      const globalConfig2 = useGlobalConfig("button");
      const { form } = useFormItem();
      const _size = useFormSize(computed(() => buttonGroupContext == null ? void 0 : buttonGroupContext.size));
      const _disabled = useFormDisabled();
      const _ref = ref();
      const slots = useSlots();
      const _type = computed(() => props.type || (buttonGroupContext == null ? void 0 : buttonGroupContext.type) || "");
      const autoInsertSpace = computed(() => {
        var _a2, _b, _c;
        return (_c = (_b = props.autoInsertSpace) != null ? _b : (_a2 = globalConfig2.value) == null ? void 0 : _a2.autoInsertSpace) != null ? _c : false;
      });
      const _props = computed(() => {
        if (props.tag === "button") {
          return {
            ariaDisabled: _disabled.value || props.loading,
            disabled: _disabled.value || props.loading,
            autofocus: props.autofocus,
            type: props.nativeType
          };
        }
        return {};
      });
      const shouldAddSpace = computed(() => {
        var _a2;
        const defaultSlot = (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
        if (autoInsertSpace.value && (defaultSlot == null ? void 0 : defaultSlot.length) === 1) {
          const slot = defaultSlot[0];
          if ((slot == null ? void 0 : slot.type) === Text$1) {
            const text = slot.children;
            return /^\p{Unified_Ideograph}{2}$/u.test(text.trim());
          }
        }
        return false;
      });
      const handleClick = (evt) => {
        if (props.nativeType === "reset") {
          form == null ? void 0 : form.resetFields();
        }
        emit2("click", evt);
      };
      return {
        _disabled,
        _size,
        _type,
        _ref,
        _props,
        shouldAddSpace,
        handleClick
      };
    };
    const buttonTypes = [
      "default",
      "primary",
      "success",
      "warning",
      "info",
      "danger",
      "text",
      ""
    ];
    const buttonNativeTypes = ["button", "submit", "reset"];
    const buttonProps = buildProps({
      size: useSizeProp,
      disabled: Boolean,
      type: {
        type: String,
        values: buttonTypes,
        default: ""
      },
      icon: {
        type: iconPropType
      },
      nativeType: {
        type: String,
        values: buttonNativeTypes,
        default: "button"
      },
      loading: Boolean,
      loadingIcon: {
        type: iconPropType,
        default: () => loading_default
      },
      plain: Boolean,
      text: Boolean,
      link: Boolean,
      bg: Boolean,
      autofocus: Boolean,
      round: Boolean,
      circle: Boolean,
      color: String,
      dark: Boolean,
      autoInsertSpace: {
        type: Boolean,
        default: void 0
      },
      tag: {
        type: definePropType([String, Object]),
        default: "button"
      }
    });
    const buttonEmits = {
      click: (evt) => evt instanceof MouseEvent
    };
    function bound01(n, max) {
      if (isOnePointZero(n)) {
        n = "100%";
      }
      var isPercent = isPercentage(n);
      n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
      if (isPercent) {
        n = parseInt(String(n * max), 10) / 100;
      }
      if (Math.abs(n - max) < 1e-6) {
        return 1;
      }
      if (max === 360) {
        n = (n < 0 ? n % max + max : n % max) / parseFloat(String(max));
      } else {
        n = n % max / parseFloat(String(max));
      }
      return n;
    }
    function clamp01(val) {
      return Math.min(1, Math.max(0, val));
    }
    function isOnePointZero(n) {
      return typeof n === "string" && n.indexOf(".") !== -1 && parseFloat(n) === 1;
    }
    function isPercentage(n) {
      return typeof n === "string" && n.indexOf("%") !== -1;
    }
    function boundAlpha(a) {
      a = parseFloat(a);
      if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
      }
      return a;
    }
    function convertToPercentage(n) {
      if (n <= 1) {
        return "".concat(Number(n) * 100, "%");
      }
      return n;
    }
    function pad2(c2) {
      return c2.length === 1 ? "0" + c2 : String(c2);
    }
    function rgbToRgb(r, g, b) {
      return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255
      };
    }
    function rgbToHsl(r, g, b) {
      r = bound01(r, 255);
      g = bound01(g, 255);
      b = bound01(b, 255);
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var h2 = 0;
      var s = 0;
      var l = (max + min) / 2;
      if (max === min) {
        s = 0;
        h2 = 0;
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h2 = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h2 = (b - r) / d + 2;
            break;
          case b:
            h2 = (r - g) / d + 4;
            break;
        }
        h2 /= 6;
      }
      return { h: h2, s, l };
    }
    function hue2rgb(p2, q2, t) {
      if (t < 0) {
        t += 1;
      }
      if (t > 1) {
        t -= 1;
      }
      if (t < 1 / 6) {
        return p2 + (q2 - p2) * (6 * t);
      }
      if (t < 1 / 2) {
        return q2;
      }
      if (t < 2 / 3) {
        return p2 + (q2 - p2) * (2 / 3 - t) * 6;
      }
      return p2;
    }
    function hslToRgb(h2, s, l) {
      var r;
      var g;
      var b;
      h2 = bound01(h2, 360);
      s = bound01(s, 100);
      l = bound01(l, 100);
      if (s === 0) {
        g = l;
        b = l;
        r = l;
      } else {
        var q2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p2 = 2 * l - q2;
        r = hue2rgb(p2, q2, h2 + 1 / 3);
        g = hue2rgb(p2, q2, h2);
        b = hue2rgb(p2, q2, h2 - 1 / 3);
      }
      return { r: r * 255, g: g * 255, b: b * 255 };
    }
    function rgbToHsv(r, g, b) {
      r = bound01(r, 255);
      g = bound01(g, 255);
      b = bound01(b, 255);
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var h2 = 0;
      var v = max;
      var d = max - min;
      var s = max === 0 ? 0 : d / max;
      if (max === min) {
        h2 = 0;
      } else {
        switch (max) {
          case r:
            h2 = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h2 = (b - r) / d + 2;
            break;
          case b:
            h2 = (r - g) / d + 4;
            break;
        }
        h2 /= 6;
      }
      return { h: h2, s, v };
    }
    function hsvToRgb(h2, s, v) {
      h2 = bound01(h2, 360) * 6;
      s = bound01(s, 100);
      v = bound01(v, 100);
      var i = Math.floor(h2);
      var f = h2 - i;
      var p2 = v * (1 - s);
      var q2 = v * (1 - f * s);
      var t = v * (1 - (1 - f) * s);
      var mod = i % 6;
      var r = [v, q2, p2, p2, t, v][mod];
      var g = [t, v, v, q2, p2, p2][mod];
      var b = [p2, p2, t, v, v, q2][mod];
      return { r: r * 255, g: g * 255, b: b * 255 };
    }
    function rgbToHex(r, g, b, allow3Char) {
      var hex = [
        pad2(Math.round(r).toString(16)),
        pad2(Math.round(g).toString(16)),
        pad2(Math.round(b).toString(16))
      ];
      if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
      }
      return hex.join("");
    }
    function rgbaToHex(r, g, b, a, allow4Char) {
      var hex = [
        pad2(Math.round(r).toString(16)),
        pad2(Math.round(g).toString(16)),
        pad2(Math.round(b).toString(16)),
        pad2(convertDecimalToHex(a))
      ];
      if (allow4Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1)) && hex[3].startsWith(hex[3].charAt(1))) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
      }
      return hex.join("");
    }
    function convertDecimalToHex(d) {
      return Math.round(parseFloat(d) * 255).toString(16);
    }
    function convertHexToDecimal(h2) {
      return parseIntFromHex(h2) / 255;
    }
    function parseIntFromHex(val) {
      return parseInt(val, 16);
    }
    function numberInputToObject(color) {
      return {
        r: color >> 16,
        g: (color & 65280) >> 8,
        b: color & 255
      };
    }
    var names = {
      aliceblue: "#f0f8ff",
      antiquewhite: "#faebd7",
      aqua: "#00ffff",
      aquamarine: "#7fffd4",
      azure: "#f0ffff",
      beige: "#f5f5dc",
      bisque: "#ffe4c4",
      black: "#000000",
      blanchedalmond: "#ffebcd",
      blue: "#0000ff",
      blueviolet: "#8a2be2",
      brown: "#a52a2a",
      burlywood: "#deb887",
      cadetblue: "#5f9ea0",
      chartreuse: "#7fff00",
      chocolate: "#d2691e",
      coral: "#ff7f50",
      cornflowerblue: "#6495ed",
      cornsilk: "#fff8dc",
      crimson: "#dc143c",
      cyan: "#00ffff",
      darkblue: "#00008b",
      darkcyan: "#008b8b",
      darkgoldenrod: "#b8860b",
      darkgray: "#a9a9a9",
      darkgreen: "#006400",
      darkgrey: "#a9a9a9",
      darkkhaki: "#bdb76b",
      darkmagenta: "#8b008b",
      darkolivegreen: "#556b2f",
      darkorange: "#ff8c00",
      darkorchid: "#9932cc",
      darkred: "#8b0000",
      darksalmon: "#e9967a",
      darkseagreen: "#8fbc8f",
      darkslateblue: "#483d8b",
      darkslategray: "#2f4f4f",
      darkslategrey: "#2f4f4f",
      darkturquoise: "#00ced1",
      darkviolet: "#9400d3",
      deeppink: "#ff1493",
      deepskyblue: "#00bfff",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1e90ff",
      firebrick: "#b22222",
      floralwhite: "#fffaf0",
      forestgreen: "#228b22",
      fuchsia: "#ff00ff",
      gainsboro: "#dcdcdc",
      ghostwhite: "#f8f8ff",
      goldenrod: "#daa520",
      gold: "#ffd700",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#adff2f",
      grey: "#808080",
      honeydew: "#f0fff0",
      hotpink: "#ff69b4",
      indianred: "#cd5c5c",
      indigo: "#4b0082",
      ivory: "#fffff0",
      khaki: "#f0e68c",
      lavenderblush: "#fff0f5",
      lavender: "#e6e6fa",
      lawngreen: "#7cfc00",
      lemonchiffon: "#fffacd",
      lightblue: "#add8e6",
      lightcoral: "#f08080",
      lightcyan: "#e0ffff",
      lightgoldenrodyellow: "#fafad2",
      lightgray: "#d3d3d3",
      lightgreen: "#90ee90",
      lightgrey: "#d3d3d3",
      lightpink: "#ffb6c1",
      lightsalmon: "#ffa07a",
      lightseagreen: "#20b2aa",
      lightskyblue: "#87cefa",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#b0c4de",
      lightyellow: "#ffffe0",
      lime: "#00ff00",
      limegreen: "#32cd32",
      linen: "#faf0e6",
      magenta: "#ff00ff",
      maroon: "#800000",
      mediumaquamarine: "#66cdaa",
      mediumblue: "#0000cd",
      mediumorchid: "#ba55d3",
      mediumpurple: "#9370db",
      mediumseagreen: "#3cb371",
      mediumslateblue: "#7b68ee",
      mediumspringgreen: "#00fa9a",
      mediumturquoise: "#48d1cc",
      mediumvioletred: "#c71585",
      midnightblue: "#191970",
      mintcream: "#f5fffa",
      mistyrose: "#ffe4e1",
      moccasin: "#ffe4b5",
      navajowhite: "#ffdead",
      navy: "#000080",
      oldlace: "#fdf5e6",
      olive: "#808000",
      olivedrab: "#6b8e23",
      orange: "#ffa500",
      orangered: "#ff4500",
      orchid: "#da70d6",
      palegoldenrod: "#eee8aa",
      palegreen: "#98fb98",
      paleturquoise: "#afeeee",
      palevioletred: "#db7093",
      papayawhip: "#ffefd5",
      peachpuff: "#ffdab9",
      peru: "#cd853f",
      pink: "#ffc0cb",
      plum: "#dda0dd",
      powderblue: "#b0e0e6",
      purple: "#800080",
      rebeccapurple: "#663399",
      red: "#ff0000",
      rosybrown: "#bc8f8f",
      royalblue: "#4169e1",
      saddlebrown: "#8b4513",
      salmon: "#fa8072",
      sandybrown: "#f4a460",
      seagreen: "#2e8b57",
      seashell: "#fff5ee",
      sienna: "#a0522d",
      silver: "#c0c0c0",
      skyblue: "#87ceeb",
      slateblue: "#6a5acd",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#fffafa",
      springgreen: "#00ff7f",
      steelblue: "#4682b4",
      tan: "#d2b48c",
      teal: "#008080",
      thistle: "#d8bfd8",
      tomato: "#ff6347",
      turquoise: "#40e0d0",
      violet: "#ee82ee",
      wheat: "#f5deb3",
      white: "#ffffff",
      whitesmoke: "#f5f5f5",
      yellow: "#ffff00",
      yellowgreen: "#9acd32"
    };
    function inputToRGB(color) {
      var rgb = { r: 0, g: 0, b: 0 };
      var a = 1;
      var s = null;
      var v = null;
      var l = null;
      var ok = false;
      var format2 = false;
      if (typeof color === "string") {
        color = stringInputToObject(color);
      }
      if (typeof color === "object") {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
          rgb = rgbToRgb(color.r, color.g, color.b);
          ok = true;
          format2 = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
        } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
          s = convertToPercentage(color.s);
          v = convertToPercentage(color.v);
          rgb = hsvToRgb(color.h, s, v);
          ok = true;
          format2 = "hsv";
        } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
          s = convertToPercentage(color.s);
          l = convertToPercentage(color.l);
          rgb = hslToRgb(color.h, s, l);
          ok = true;
          format2 = "hsl";
        }
        if (Object.prototype.hasOwnProperty.call(color, "a")) {
          a = color.a;
        }
      }
      a = boundAlpha(a);
      return {
        ok,
        format: color.format || format2,
        r: Math.min(255, Math.max(rgb.r, 0)),
        g: Math.min(255, Math.max(rgb.g, 0)),
        b: Math.min(255, Math.max(rgb.b, 0)),
        a
      };
    }
    var CSS_INTEGER = "[-\\+]?\\d+%?";
    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
    var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
    var matchers = {
      CSS_UNIT: new RegExp(CSS_UNIT),
      rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
      rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
      hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
      hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
      hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
      hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
      hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
    function stringInputToObject(color) {
      color = color.trim().toLowerCase();
      if (color.length === 0) {
        return false;
      }
      var named = false;
      if (names[color]) {
        color = names[color];
        named = true;
      } else if (color === "transparent") {
        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
      }
      var match = matchers.rgb.exec(color);
      if (match) {
        return { r: match[1], g: match[2], b: match[3] };
      }
      match = matchers.rgba.exec(color);
      if (match) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
      }
      match = matchers.hsl.exec(color);
      if (match) {
        return { h: match[1], s: match[2], l: match[3] };
      }
      match = matchers.hsla.exec(color);
      if (match) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
      }
      match = matchers.hsv.exec(color);
      if (match) {
        return { h: match[1], s: match[2], v: match[3] };
      }
      match = matchers.hsva.exec(color);
      if (match) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
      }
      match = matchers.hex8.exec(color);
      if (match) {
        return {
          r: parseIntFromHex(match[1]),
          g: parseIntFromHex(match[2]),
          b: parseIntFromHex(match[3]),
          a: convertHexToDecimal(match[4]),
          format: named ? "name" : "hex8"
        };
      }
      match = matchers.hex6.exec(color);
      if (match) {
        return {
          r: parseIntFromHex(match[1]),
          g: parseIntFromHex(match[2]),
          b: parseIntFromHex(match[3]),
          format: named ? "name" : "hex"
        };
      }
      match = matchers.hex4.exec(color);
      if (match) {
        return {
          r: parseIntFromHex(match[1] + match[1]),
          g: parseIntFromHex(match[2] + match[2]),
          b: parseIntFromHex(match[3] + match[3]),
          a: convertHexToDecimal(match[4] + match[4]),
          format: named ? "name" : "hex8"
        };
      }
      match = matchers.hex3.exec(color);
      if (match) {
        return {
          r: parseIntFromHex(match[1] + match[1]),
          g: parseIntFromHex(match[2] + match[2]),
          b: parseIntFromHex(match[3] + match[3]),
          format: named ? "name" : "hex"
        };
      }
      return false;
    }
    function isValidCSSUnit(color) {
      return Boolean(matchers.CSS_UNIT.exec(String(color)));
    }
    var TinyColor = (
      /** @class */
      function() {
        function TinyColor2(color, opts) {
          if (color === void 0) {
            color = "";
          }
          if (opts === void 0) {
            opts = {};
          }
          var _a2;
          if (color instanceof TinyColor2) {
            return color;
          }
          if (typeof color === "number") {
            color = numberInputToObject(color);
          }
          this.originalInput = color;
          var rgb = inputToRGB(color);
          this.originalInput = color;
          this.r = rgb.r;
          this.g = rgb.g;
          this.b = rgb.b;
          this.a = rgb.a;
          this.roundA = Math.round(100 * this.a) / 100;
          this.format = (_a2 = opts.format) !== null && _a2 !== void 0 ? _a2 : rgb.format;
          this.gradientType = opts.gradientType;
          if (this.r < 1) {
            this.r = Math.round(this.r);
          }
          if (this.g < 1) {
            this.g = Math.round(this.g);
          }
          if (this.b < 1) {
            this.b = Math.round(this.b);
          }
          this.isValid = rgb.ok;
        }
        TinyColor2.prototype.isDark = function() {
          return this.getBrightness() < 128;
        };
        TinyColor2.prototype.isLight = function() {
          return !this.isDark();
        };
        TinyColor2.prototype.getBrightness = function() {
          var rgb = this.toRgb();
          return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
        };
        TinyColor2.prototype.getLuminance = function() {
          var rgb = this.toRgb();
          var R2;
          var G2;
          var B2;
          var RsRGB = rgb.r / 255;
          var GsRGB = rgb.g / 255;
          var BsRGB = rgb.b / 255;
          if (RsRGB <= 0.03928) {
            R2 = RsRGB / 12.92;
          } else {
            R2 = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
          }
          if (GsRGB <= 0.03928) {
            G2 = GsRGB / 12.92;
          } else {
            G2 = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
          }
          if (BsRGB <= 0.03928) {
            B2 = BsRGB / 12.92;
          } else {
            B2 = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
          }
          return 0.2126 * R2 + 0.7152 * G2 + 0.0722 * B2;
        };
        TinyColor2.prototype.getAlpha = function() {
          return this.a;
        };
        TinyColor2.prototype.setAlpha = function(alpha) {
          this.a = boundAlpha(alpha);
          this.roundA = Math.round(100 * this.a) / 100;
          return this;
        };
        TinyColor2.prototype.isMonochrome = function() {
          var s = this.toHsl().s;
          return s === 0;
        };
        TinyColor2.prototype.toHsv = function() {
          var hsv = rgbToHsv(this.r, this.g, this.b);
          return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
        };
        TinyColor2.prototype.toHsvString = function() {
          var hsv = rgbToHsv(this.r, this.g, this.b);
          var h2 = Math.round(hsv.h * 360);
          var s = Math.round(hsv.s * 100);
          var v = Math.round(hsv.v * 100);
          return this.a === 1 ? "hsv(".concat(h2, ", ").concat(s, "%, ").concat(v, "%)") : "hsva(".concat(h2, ", ").concat(s, "%, ").concat(v, "%, ").concat(this.roundA, ")");
        };
        TinyColor2.prototype.toHsl = function() {
          var hsl = rgbToHsl(this.r, this.g, this.b);
          return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
        };
        TinyColor2.prototype.toHslString = function() {
          var hsl = rgbToHsl(this.r, this.g, this.b);
          var h2 = Math.round(hsl.h * 360);
          var s = Math.round(hsl.s * 100);
          var l = Math.round(hsl.l * 100);
          return this.a === 1 ? "hsl(".concat(h2, ", ").concat(s, "%, ").concat(l, "%)") : "hsla(".concat(h2, ", ").concat(s, "%, ").concat(l, "%, ").concat(this.roundA, ")");
        };
        TinyColor2.prototype.toHex = function(allow3Char) {
          if (allow3Char === void 0) {
            allow3Char = false;
          }
          return rgbToHex(this.r, this.g, this.b, allow3Char);
        };
        TinyColor2.prototype.toHexString = function(allow3Char) {
          if (allow3Char === void 0) {
            allow3Char = false;
          }
          return "#" + this.toHex(allow3Char);
        };
        TinyColor2.prototype.toHex8 = function(allow4Char) {
          if (allow4Char === void 0) {
            allow4Char = false;
          }
          return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
        };
        TinyColor2.prototype.toHex8String = function(allow4Char) {
          if (allow4Char === void 0) {
            allow4Char = false;
          }
          return "#" + this.toHex8(allow4Char);
        };
        TinyColor2.prototype.toHexShortString = function(allowShortChar) {
          if (allowShortChar === void 0) {
            allowShortChar = false;
          }
          return this.a === 1 ? this.toHexString(allowShortChar) : this.toHex8String(allowShortChar);
        };
        TinyColor2.prototype.toRgb = function() {
          return {
            r: Math.round(this.r),
            g: Math.round(this.g),
            b: Math.round(this.b),
            a: this.a
          };
        };
        TinyColor2.prototype.toRgbString = function() {
          var r = Math.round(this.r);
          var g = Math.round(this.g);
          var b = Math.round(this.b);
          return this.a === 1 ? "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")") : "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(this.roundA, ")");
        };
        TinyColor2.prototype.toPercentageRgb = function() {
          var fmt = function(x) {
            return "".concat(Math.round(bound01(x, 255) * 100), "%");
          };
          return {
            r: fmt(this.r),
            g: fmt(this.g),
            b: fmt(this.b),
            a: this.a
          };
        };
        TinyColor2.prototype.toPercentageRgbString = function() {
          var rnd = function(x) {
            return Math.round(bound01(x, 255) * 100);
          };
          return this.a === 1 ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)") : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
        };
        TinyColor2.prototype.toName = function() {
          if (this.a === 0) {
            return "transparent";
          }
          if (this.a < 1) {
            return false;
          }
          var hex = "#" + rgbToHex(this.r, this.g, this.b, false);
          for (var _i = 0, _a2 = Object.entries(names); _i < _a2.length; _i++) {
            var _b = _a2[_i], key2 = _b[0], value = _b[1];
            if (hex === value) {
              return key2;
            }
          }
          return false;
        };
        TinyColor2.prototype.toString = function(format2) {
          var formatSet = Boolean(format2);
          format2 = format2 !== null && format2 !== void 0 ? format2 : this.format;
          var formattedString = false;
          var hasAlpha = this.a < 1 && this.a >= 0;
          var needsAlphaFormat = !formatSet && hasAlpha && (format2.startsWith("hex") || format2 === "name");
          if (needsAlphaFormat) {
            if (format2 === "name" && this.a === 0) {
              return this.toName();
            }
            return this.toRgbString();
          }
          if (format2 === "rgb") {
            formattedString = this.toRgbString();
          }
          if (format2 === "prgb") {
            formattedString = this.toPercentageRgbString();
          }
          if (format2 === "hex" || format2 === "hex6") {
            formattedString = this.toHexString();
          }
          if (format2 === "hex3") {
            formattedString = this.toHexString(true);
          }
          if (format2 === "hex4") {
            formattedString = this.toHex8String(true);
          }
          if (format2 === "hex8") {
            formattedString = this.toHex8String();
          }
          if (format2 === "name") {
            formattedString = this.toName();
          }
          if (format2 === "hsl") {
            formattedString = this.toHslString();
          }
          if (format2 === "hsv") {
            formattedString = this.toHsvString();
          }
          return formattedString || this.toHexString();
        };
        TinyColor2.prototype.toNumber = function() {
          return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
        };
        TinyColor2.prototype.clone = function() {
          return new TinyColor2(this.toString());
        };
        TinyColor2.prototype.lighten = function(amount) {
          if (amount === void 0) {
            amount = 10;
          }
          var hsl = this.toHsl();
          hsl.l += amount / 100;
          hsl.l = clamp01(hsl.l);
          return new TinyColor2(hsl);
        };
        TinyColor2.prototype.brighten = function(amount) {
          if (amount === void 0) {
            amount = 10;
          }
          var rgb = this.toRgb();
          rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
          rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
          rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
          return new TinyColor2(rgb);
        };
        TinyColor2.prototype.darken = function(amount) {
          if (amount === void 0) {
            amount = 10;
          }
          var hsl = this.toHsl();
          hsl.l -= amount / 100;
          hsl.l = clamp01(hsl.l);
          return new TinyColor2(hsl);
        };
        TinyColor2.prototype.tint = function(amount) {
          if (amount === void 0) {
            amount = 10;
          }
          return this.mix("white", amount);
        };
        TinyColor2.prototype.shade = function(amount) {
          if (amount === void 0) {
            amount = 10;
          }
          return this.mix("black", amount);
        };
        TinyColor2.prototype.desaturate = function(amount) {
          if (amount === void 0) {
            amount = 10;
          }
          var hsl = this.toHsl();
          hsl.s -= amount / 100;
          hsl.s = clamp01(hsl.s);
          return new TinyColor2(hsl);
        };
        TinyColor2.prototype.saturate = function(amount) {
          if (amount === void 0) {
            amount = 10;
          }
          var hsl = this.toHsl();
          hsl.s += amount / 100;
          hsl.s = clamp01(hsl.s);
          return new TinyColor2(hsl);
        };
        TinyColor2.prototype.greyscale = function() {
          return this.desaturate(100);
        };
        TinyColor2.prototype.spin = function(amount) {
          var hsl = this.toHsl();
          var hue = (hsl.h + amount) % 360;
          hsl.h = hue < 0 ? 360 + hue : hue;
          return new TinyColor2(hsl);
        };
        TinyColor2.prototype.mix = function(color, amount) {
          if (amount === void 0) {
            amount = 50;
          }
          var rgb1 = this.toRgb();
          var rgb2 = new TinyColor2(color).toRgb();
          var p2 = amount / 100;
          var rgba = {
            r: (rgb2.r - rgb1.r) * p2 + rgb1.r,
            g: (rgb2.g - rgb1.g) * p2 + rgb1.g,
            b: (rgb2.b - rgb1.b) * p2 + rgb1.b,
            a: (rgb2.a - rgb1.a) * p2 + rgb1.a
          };
          return new TinyColor2(rgba);
        };
        TinyColor2.prototype.analogous = function(results, slices) {
          if (results === void 0) {
            results = 6;
          }
          if (slices === void 0) {
            slices = 30;
          }
          var hsl = this.toHsl();
          var part = 360 / slices;
          var ret = [this];
          for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
            hsl.h = (hsl.h + part) % 360;
            ret.push(new TinyColor2(hsl));
          }
          return ret;
        };
        TinyColor2.prototype.complement = function() {
          var hsl = this.toHsl();
          hsl.h = (hsl.h + 180) % 360;
          return new TinyColor2(hsl);
        };
        TinyColor2.prototype.monochromatic = function(results) {
          if (results === void 0) {
            results = 6;
          }
          var hsv = this.toHsv();
          var h2 = hsv.h;
          var s = hsv.s;
          var v = hsv.v;
          var res = [];
          var modification = 1 / results;
          while (results--) {
            res.push(new TinyColor2({ h: h2, s, v }));
            v = (v + modification) % 1;
          }
          return res;
        };
        TinyColor2.prototype.splitcomplement = function() {
          var hsl = this.toHsl();
          var h2 = hsl.h;
          return [
            this,
            new TinyColor2({ h: (h2 + 72) % 360, s: hsl.s, l: hsl.l }),
            new TinyColor2({ h: (h2 + 216) % 360, s: hsl.s, l: hsl.l })
          ];
        };
        TinyColor2.prototype.onBackground = function(background) {
          var fg = this.toRgb();
          var bg = new TinyColor2(background).toRgb();
          var alpha = fg.a + bg.a * (1 - fg.a);
          return new TinyColor2({
            r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha,
            g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha,
            b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha,
            a: alpha
          });
        };
        TinyColor2.prototype.triad = function() {
          return this.polyad(3);
        };
        TinyColor2.prototype.tetrad = function() {
          return this.polyad(4);
        };
        TinyColor2.prototype.polyad = function(n) {
          var hsl = this.toHsl();
          var h2 = hsl.h;
          var result = [this];
          var increment = 360 / n;
          for (var i = 1; i < n; i++) {
            result.push(new TinyColor2({ h: (h2 + i * increment) % 360, s: hsl.s, l: hsl.l }));
          }
          return result;
        };
        TinyColor2.prototype.equals = function(color) {
          return this.toRgbString() === new TinyColor2(color).toRgbString();
        };
        return TinyColor2;
      }()
    );
    function darken(color, amount = 20) {
      return color.mix("#141414", amount).toString();
    }
    function useButtonCustomStyle(props) {
      const _disabled = useFormDisabled();
      const ns = useNamespace("button");
      return computed(() => {
        let styles = {};
        const buttonColor = props.color;
        if (buttonColor) {
          const color = new TinyColor(buttonColor);
          const activeBgColor = props.dark ? color.tint(20).toString() : darken(color, 20);
          if (props.plain) {
            styles = ns.cssVarBlock({
              "bg-color": props.dark ? darken(color, 90) : color.tint(90).toString(),
              "text-color": buttonColor,
              "border-color": props.dark ? darken(color, 50) : color.tint(50).toString(),
              "hover-text-color": `var(${ns.cssVarName("color-white")})`,
              "hover-bg-color": buttonColor,
              "hover-border-color": buttonColor,
              "active-bg-color": activeBgColor,
              "active-text-color": `var(${ns.cssVarName("color-white")})`,
              "active-border-color": activeBgColor
            });
            if (_disabled.value) {
              styles[ns.cssVarBlockName("disabled-bg-color")] = props.dark ? darken(color, 90) : color.tint(90).toString();
              styles[ns.cssVarBlockName("disabled-text-color")] = props.dark ? darken(color, 50) : color.tint(50).toString();
              styles[ns.cssVarBlockName("disabled-border-color")] = props.dark ? darken(color, 80) : color.tint(80).toString();
            }
          } else {
            const hoverBgColor = props.dark ? darken(color, 30) : color.tint(30).toString();
            const textColor = color.isDark() ? `var(${ns.cssVarName("color-white")})` : `var(${ns.cssVarName("color-black")})`;
            styles = ns.cssVarBlock({
              "bg-color": buttonColor,
              "text-color": textColor,
              "border-color": buttonColor,
              "hover-bg-color": hoverBgColor,
              "hover-text-color": textColor,
              "hover-border-color": hoverBgColor,
              "active-bg-color": activeBgColor,
              "active-border-color": activeBgColor
            });
            if (_disabled.value) {
              const disabledButtonColor = props.dark ? darken(color, 50) : color.tint(50).toString();
              styles[ns.cssVarBlockName("disabled-bg-color")] = disabledButtonColor;
              styles[ns.cssVarBlockName("disabled-text-color")] = props.dark ? "rgba(255, 255, 255, 0.5)" : `var(${ns.cssVarName("color-white")})`;
              styles[ns.cssVarBlockName("disabled-border-color")] = disabledButtonColor;
            }
          }
        }
        return styles;
      });
    }
    const __default__$b = /* @__PURE__ */ defineComponent({
      name: "ElButton"
    });
    const _sfc_main$l = /* @__PURE__ */ defineComponent({
      ...__default__$b,
      props: buttonProps,
      emits: buttonEmits,
      setup(__props, { expose, emit: emit2 }) {
        const props = __props;
        const buttonStyle = useButtonCustomStyle(props);
        const ns = useNamespace("button");
        const { _ref, _size, _type, _disabled, _props, shouldAddSpace, handleClick } = useButton(props, emit2);
        const buttonKls = computed(() => [
          ns.b(),
          ns.m(_type.value),
          ns.m(_size.value),
          ns.is("disabled", _disabled.value),
          ns.is("loading", props.loading),
          ns.is("plain", props.plain),
          ns.is("round", props.round),
          ns.is("circle", props.circle),
          ns.is("text", props.text),
          ns.is("link", props.link),
          ns.is("has-bg", props.bg)
        ]);
        expose({
          ref: _ref,
          size: _size,
          type: _type,
          disabled: _disabled,
          shouldAddSpace
        });
        return (_ctx, _cache) => {
          return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), mergeProps({
            ref_key: "_ref",
            ref: _ref
          }, unref(_props), {
            class: unref(buttonKls),
            style: unref(buttonStyle),
            onClick: unref(handleClick)
          }), {
            default: withCtx(() => [
              _ctx.loading ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                _ctx.$slots.loading ? renderSlot(_ctx.$slots, "loading", { key: 0 }) : (openBlock(), createBlock(unref(ElIcon), {
                  key: 1,
                  class: normalizeClass(unref(ns).is("loading"))
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(_ctx.loadingIcon)))
                  ]),
                  _: 1
                }, 8, ["class"]))
              ], 64)) : _ctx.icon || _ctx.$slots.icon ? (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
                default: withCtx(() => [
                  _ctx.icon ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.icon), { key: 0 })) : renderSlot(_ctx.$slots, "icon", { key: 1 })
                ]),
                _: 3
              })) : createCommentVNode("v-if", true),
              _ctx.$slots.default ? (openBlock(), createElementBlock("span", {
                key: 2,
                class: normalizeClass({ [unref(ns).em("text", "expand")]: unref(shouldAddSpace) })
              }, [
                renderSlot(_ctx.$slots, "default")
              ], 2)) : createCommentVNode("v-if", true)
            ]),
            _: 3
          }, 16, ["class", "style", "onClick"]);
        };
      }
    });
    var Button = /* @__PURE__ */ _export_sfc$1(_sfc_main$l, [["__file", "button.vue"]]);
    const buttonGroupProps = {
      size: buttonProps.size,
      type: buttonProps.type
    };
    const __default__$a = /* @__PURE__ */ defineComponent({
      name: "ElButtonGroup"
    });
    const _sfc_main$k = /* @__PURE__ */ defineComponent({
      ...__default__$a,
      props: buttonGroupProps,
      setup(__props) {
        const props = __props;
        provide(buttonGroupContextKey, reactive({
          size: toRef(props, "size"),
          type: toRef(props, "type")
        }));
        const ns = useNamespace("button");
        return (_ctx, _cache) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(`${unref(ns).b("group")}`)
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2);
        };
      }
    });
    var ButtonGroup = /* @__PURE__ */ _export_sfc$1(_sfc_main$k, [["__file", "button-group.vue"]]);
    const ElButton = withInstall(Button, {
      ButtonGroup
    });
    withNoopInstall(ButtonGroup);
    const nodeList = /* @__PURE__ */ new Map();
    let startClick;
    if (isClient) {
      document.addEventListener("mousedown", (e) => startClick = e);
      document.addEventListener("mouseup", (e) => {
        for (const handlers of nodeList.values()) {
          for (const { documentHandler } of handlers) {
            documentHandler(e, startClick);
          }
        }
      });
    }
    function createDocumentHandler(el, binding) {
      let excludes = [];
      if (Array.isArray(binding.arg)) {
        excludes = binding.arg;
      } else if (isElement(binding.arg)) {
        excludes.push(binding.arg);
      }
      return function(mouseup, mousedown) {
        const popperRef = binding.instance.popperRef;
        const mouseUpTarget = mouseup.target;
        const mouseDownTarget = mousedown == null ? void 0 : mousedown.target;
        const isBound = !binding || !binding.instance;
        const isTargetExists = !mouseUpTarget || !mouseDownTarget;
        const isContainedByEl = el.contains(mouseUpTarget) || el.contains(mouseDownTarget);
        const isSelf = el === mouseUpTarget;
        const isTargetExcluded = excludes.length && excludes.some((item) => item == null ? void 0 : item.contains(mouseUpTarget)) || excludes.length && excludes.includes(mouseDownTarget);
        const isContainedByPopper = popperRef && (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget));
        if (isBound || isTargetExists || isContainedByEl || isSelf || isTargetExcluded || isContainedByPopper) {
          return;
        }
        binding.value(mouseup, mousedown);
      };
    }
    const ClickOutside = {
      beforeMount(el, binding) {
        if (!nodeList.has(el)) {
          nodeList.set(el, []);
        }
        nodeList.get(el).push({
          documentHandler: createDocumentHandler(el, binding),
          bindingFn: binding.value
        });
      },
      updated(el, binding) {
        if (!nodeList.has(el)) {
          nodeList.set(el, []);
        }
        const handlers = nodeList.get(el);
        const oldHandlerIndex = handlers.findIndex((item) => item.bindingFn === binding.oldValue);
        const newHandler = {
          documentHandler: createDocumentHandler(el, binding),
          bindingFn: binding.value
        };
        if (oldHandlerIndex >= 0) {
          handlers.splice(oldHandlerIndex, 1, newHandler);
        } else {
          handlers.push(newHandler);
        }
      },
      unmounted(el) {
        nodeList.delete(el);
      }
    };
    const FOCUSABLE_CHILDREN = "_trap-focus-children";
    const FOCUS_STACK = [];
    const FOCUS_HANDLER = (e) => {
      if (FOCUS_STACK.length === 0)
        return;
      const focusableElement = FOCUS_STACK[FOCUS_STACK.length - 1][FOCUSABLE_CHILDREN];
      if (focusableElement.length > 0 && e.code === EVENT_CODE.tab) {
        if (focusableElement.length === 1) {
          e.preventDefault();
          if (document.activeElement !== focusableElement[0]) {
            focusableElement[0].focus();
          }
          return;
        }
        const goingBackward = e.shiftKey;
        const isFirst = e.target === focusableElement[0];
        const isLast = e.target === focusableElement[focusableElement.length - 1];
        if (isFirst && goingBackward) {
          e.preventDefault();
          focusableElement[focusableElement.length - 1].focus();
        }
        if (isLast && !goingBackward) {
          e.preventDefault();
          focusableElement[0].focus();
        }
      }
    };
    const TrapFocus = {
      beforeMount(el) {
        el[FOCUSABLE_CHILDREN] = obtainAllFocusableElements$1(el);
        FOCUS_STACK.push(el);
        if (FOCUS_STACK.length <= 1) {
          document.addEventListener("keydown", FOCUS_HANDLER);
        }
      },
      updated(el) {
        nextTick(() => {
          el[FOCUSABLE_CHILDREN] = obtainAllFocusableElements$1(el);
        });
      },
      unmounted() {
        FOCUS_STACK.shift();
        if (FOCUS_STACK.length === 0) {
          document.removeEventListener("keydown", FOCUS_HANDLER);
        }
      }
    };
    const tagProps = buildProps({
      type: {
        type: String,
        values: ["primary", "success", "info", "warning", "danger"],
        default: "primary"
      },
      closable: Boolean,
      disableTransitions: Boolean,
      hit: Boolean,
      color: String,
      size: {
        type: String,
        values: componentSizes
      },
      effect: {
        type: String,
        values: ["dark", "light", "plain"],
        default: "light"
      },
      round: Boolean
    });
    const tagEmits = {
      close: (evt) => evt instanceof MouseEvent,
      click: (evt) => evt instanceof MouseEvent
    };
    const __default__$9 = /* @__PURE__ */ defineComponent({
      name: "ElTag"
    });
    const _sfc_main$j = /* @__PURE__ */ defineComponent({
      ...__default__$9,
      props: tagProps,
      emits: tagEmits,
      setup(__props, { emit: emit2 }) {
        const props = __props;
        const tagSize = useFormSize();
        const ns = useNamespace("tag");
        const containerKls = computed(() => {
          const { type: type2, hit, effect, closable, round } = props;
          return [
            ns.b(),
            ns.is("closable", closable),
            ns.m(type2 || "primary"),
            ns.m(tagSize.value),
            ns.m(effect),
            ns.is("hit", hit),
            ns.is("round", round)
          ];
        });
        const handleClose = (event) => {
          emit2("close", event);
        };
        const handleClick = (event) => {
          emit2("click", event);
        };
        return (_ctx, _cache) => {
          return _ctx.disableTransitions ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: normalizeClass(unref(containerKls)),
            style: normalizeStyle({ backgroundColor: _ctx.color }),
            onClick: handleClick
          }, [
            createBaseVNode("span", {
              class: normalizeClass(unref(ns).e("content"))
            }, [
              renderSlot(_ctx.$slots, "default")
            ], 2),
            _ctx.closable ? (openBlock(), createBlock(unref(ElIcon), {
              key: 0,
              class: normalizeClass(unref(ns).e("close")),
              onClick: withModifiers(handleClose, ["stop"])
            }, {
              default: withCtx(() => [
                createVNode(unref(close_default))
              ]),
              _: 1
            }, 8, ["class", "onClick"])) : createCommentVNode("v-if", true)
          ], 6)) : (openBlock(), createBlock(Transition, {
            key: 1,
            name: `${unref(ns).namespace.value}-zoom-in-center`,
            appear: ""
          }, {
            default: withCtx(() => [
              createBaseVNode("span", {
                class: normalizeClass(unref(containerKls)),
                style: normalizeStyle({ backgroundColor: _ctx.color }),
                onClick: handleClick
              }, [
                createBaseVNode("span", {
                  class: normalizeClass(unref(ns).e("content"))
                }, [
                  renderSlot(_ctx.$slots, "default")
                ], 2),
                _ctx.closable ? (openBlock(), createBlock(unref(ElIcon), {
                  key: 0,
                  class: normalizeClass(unref(ns).e("close")),
                  onClick: withModifiers(handleClose, ["stop"])
                }, {
                  default: withCtx(() => [
                    createVNode(unref(close_default))
                  ]),
                  _: 1
                }, 8, ["class", "onClick"])) : createCommentVNode("v-if", true)
              ], 6)
            ]),
            _: 3
          }, 8, ["name"]));
        };
      }
    });
    var Tag = /* @__PURE__ */ _export_sfc$1(_sfc_main$j, [["__file", "tag.vue"]]);
    const ElTag = withInstall(Tag);
    const overlayProps = buildProps({
      mask: {
        type: Boolean,
        default: true
      },
      customMaskEvent: {
        type: Boolean,
        default: false
      },
      overlayClass: {
        type: definePropType([
          String,
          Array,
          Object
        ])
      },
      zIndex: {
        type: definePropType([String, Number])
      }
    });
    const overlayEmits = {
      click: (evt) => evt instanceof MouseEvent
    };
    const BLOCK = "overlay";
    var Overlay = /* @__PURE__ */ defineComponent({
      name: "ElOverlay",
      props: overlayProps,
      emits: overlayEmits,
      setup(props, { slots, emit: emit2 }) {
        const ns = useNamespace(BLOCK);
        const onMaskClick = (e) => {
          emit2("click", e);
        };
        const { onClick, onMousedown, onMouseup } = useSameTarget(props.customMaskEvent ? void 0 : onMaskClick);
        return () => {
          return props.mask ? createVNode("div", {
            class: [ns.b(), props.overlayClass],
            style: {
              zIndex: props.zIndex
            },
            onClick,
            onMousedown,
            onMouseup
          }, [renderSlot(slots, "default")], PatchFlags.STYLE | PatchFlags.CLASS | PatchFlags.PROPS, ["onClick", "onMouseup", "onMousedown"]) : h("div", {
            class: props.overlayClass,
            style: {
              zIndex: props.zIndex,
              position: "fixed",
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px"
            }
          }, [renderSlot(slots, "default")]);
        };
      }
    });
    const ElOverlay = Overlay;
    const dialogInjectionKey = Symbol("dialogInjectionKey");
    const dialogContentProps = buildProps({
      center: Boolean,
      alignCenter: Boolean,
      closeIcon: {
        type: iconPropType
      },
      draggable: Boolean,
      overflow: Boolean,
      fullscreen: Boolean,
      showClose: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ""
      },
      ariaLevel: {
        type: String,
        default: "2"
      }
    });
    const dialogContentEmits = {
      close: () => true
    };
    const _hoisted_1$a = ["aria-level"];
    const _hoisted_2$8 = ["aria-label"];
    const _hoisted_3$6 = ["id"];
    const __default__$8 = /* @__PURE__ */ defineComponent({ name: "ElDialogContent" });
    const _sfc_main$i = /* @__PURE__ */ defineComponent({
      ...__default__$8,
      props: dialogContentProps,
      emits: dialogContentEmits,
      setup(__props) {
        const props = __props;
        const { t } = useLocale();
        const { Close } = CloseComponents;
        const { dialogRef, headerRef, bodyId, ns, style } = inject(dialogInjectionKey);
        const { focusTrapRef } = inject(FOCUS_TRAP_INJECTION_KEY);
        const dialogKls = computed(() => [
          ns.b(),
          ns.is("fullscreen", props.fullscreen),
          ns.is("draggable", props.draggable),
          ns.is("align-center", props.alignCenter),
          { [ns.m("center")]: props.center }
        ]);
        const composedDialogRef = composeRefs(focusTrapRef, dialogRef);
        const draggable = computed(() => props.draggable);
        const overflow = computed(() => props.overflow);
        useDraggable(dialogRef, headerRef, draggable, overflow);
        return (_ctx, _cache) => {
          return openBlock(), createElementBlock("div", {
            ref: unref(composedDialogRef),
            class: normalizeClass(unref(dialogKls)),
            style: normalizeStyle(unref(style)),
            tabindex: "-1"
          }, [
            createBaseVNode("header", {
              ref_key: "headerRef",
              ref: headerRef,
              class: normalizeClass([unref(ns).e("header"), { "show-close": _ctx.showClose }])
            }, [
              renderSlot(_ctx.$slots, "header", {}, () => [
                createBaseVNode("span", {
                  role: "heading",
                  "aria-level": _ctx.ariaLevel,
                  class: normalizeClass(unref(ns).e("title"))
                }, toDisplayString(_ctx.title), 11, _hoisted_1$a)
              ]),
              _ctx.showClose ? (openBlock(), createElementBlock("button", {
                key: 0,
                "aria-label": unref(t)("el.dialog.close"),
                class: normalizeClass(unref(ns).e("headerbtn")),
                type: "button",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
              }, [
                createVNode(unref(ElIcon), {
                  class: normalizeClass(unref(ns).e("close"))
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(_ctx.closeIcon || unref(Close))))
                  ]),
                  _: 1
                }, 8, ["class"])
              ], 10, _hoisted_2$8)) : createCommentVNode("v-if", true)
            ], 2),
            createBaseVNode("div", {
              id: unref(bodyId),
              class: normalizeClass(unref(ns).e("body"))
            }, [
              renderSlot(_ctx.$slots, "default")
            ], 10, _hoisted_3$6),
            _ctx.$slots.footer ? (openBlock(), createElementBlock("footer", {
              key: 0,
              class: normalizeClass(unref(ns).e("footer"))
            }, [
              renderSlot(_ctx.$slots, "footer")
            ], 2)) : createCommentVNode("v-if", true)
          ], 6);
        };
      }
    });
    var ElDialogContent = /* @__PURE__ */ _export_sfc$1(_sfc_main$i, [["__file", "dialog-content.vue"]]);
    const dialogProps = buildProps({
      ...dialogContentProps,
      appendToBody: Boolean,
      appendTo: {
        type: definePropType(String),
        default: "body"
      },
      beforeClose: {
        type: definePropType(Function)
      },
      destroyOnClose: Boolean,
      closeOnClickModal: {
        type: Boolean,
        default: true
      },
      closeOnPressEscape: {
        type: Boolean,
        default: true
      },
      lockScroll: {
        type: Boolean,
        default: true
      },
      modal: {
        type: Boolean,
        default: true
      },
      openDelay: {
        type: Number,
        default: 0
      },
      closeDelay: {
        type: Number,
        default: 0
      },
      top: {
        type: String
      },
      modelValue: Boolean,
      modalClass: String,
      width: {
        type: [String, Number]
      },
      zIndex: {
        type: Number
      },
      trapFocus: {
        type: Boolean,
        default: false
      },
      headerAriaLevel: {
        type: String,
        default: "2"
      }
    });
    const dialogEmits = {
      open: () => true,
      opened: () => true,
      close: () => true,
      closed: () => true,
      [UPDATE_MODEL_EVENT]: (value) => isBoolean(value),
      openAutoFocus: () => true,
      closeAutoFocus: () => true
    };
    const useDialog = (props, targetRef) => {
      var _a2;
      const instance = getCurrentInstance();
      const emit2 = instance.emit;
      const { nextZIndex } = useZIndex();
      let lastPosition = "";
      const titleId = useId();
      const bodyId = useId();
      const visible = ref(false);
      const closed = ref(false);
      const rendered = ref(false);
      const zIndex2 = ref((_a2 = props.zIndex) != null ? _a2 : nextZIndex());
      let openTimer = void 0;
      let closeTimer = void 0;
      const namespace = useGlobalConfig("namespace", defaultNamespace);
      const style = computed(() => {
        const style2 = {};
        const varPrefix = `--${namespace.value}-dialog`;
        if (!props.fullscreen) {
          if (props.top) {
            style2[`${varPrefix}-margin-top`] = props.top;
          }
          if (props.width) {
            style2[`${varPrefix}-width`] = addUnit(props.width);
          }
        }
        return style2;
      });
      const overlayDialogStyle = computed(() => {
        if (props.alignCenter) {
          return { display: "flex" };
        }
        return {};
      });
      function afterEnter() {
        emit2("opened");
      }
      function afterLeave() {
        emit2("closed");
        emit2(UPDATE_MODEL_EVENT, false);
        if (props.destroyOnClose) {
          rendered.value = false;
        }
      }
      function beforeLeave() {
        emit2("close");
      }
      function open() {
        closeTimer == null ? void 0 : closeTimer();
        openTimer == null ? void 0 : openTimer();
        if (props.openDelay && props.openDelay > 0) {
          ({ stop: openTimer } = useTimeoutFn(() => doOpen(), props.openDelay));
        } else {
          doOpen();
        }
      }
      function close2() {
        openTimer == null ? void 0 : openTimer();
        closeTimer == null ? void 0 : closeTimer();
        if (props.closeDelay && props.closeDelay > 0) {
          ({ stop: closeTimer } = useTimeoutFn(() => doClose(), props.closeDelay));
        } else {
          doClose();
        }
      }
      function handleClose() {
        function hide(shouldCancel) {
          if (shouldCancel)
            return;
          closed.value = true;
          visible.value = false;
        }
        if (props.beforeClose) {
          props.beforeClose(hide);
        } else {
          close2();
        }
      }
      function onModalClick() {
        if (props.closeOnClickModal) {
          handleClose();
        }
      }
      function doOpen() {
        if (!isClient)
          return;
        visible.value = true;
      }
      function doClose() {
        visible.value = false;
      }
      function onOpenAutoFocus() {
        emit2("openAutoFocus");
      }
      function onCloseAutoFocus() {
        emit2("closeAutoFocus");
      }
      function onFocusoutPrevented(event) {
        var _a22;
        if (((_a22 = event.detail) == null ? void 0 : _a22.focusReason) === "pointer") {
          event.preventDefault();
        }
      }
      if (props.lockScroll) {
        useLockscreen(visible);
      }
      function onCloseRequested() {
        if (props.closeOnPressEscape) {
          handleClose();
        }
      }
      watch(() => props.modelValue, (val) => {
        if (val) {
          closed.value = false;
          open();
          rendered.value = true;
          zIndex2.value = isUndefined$1(props.zIndex) ? nextZIndex() : zIndex2.value++;
          nextTick(() => {
            emit2("open");
            if (targetRef.value) {
              targetRef.value.scrollTop = 0;
            }
          });
        } else {
          if (visible.value) {
            close2();
          }
        }
      });
      watch(() => props.fullscreen, (val) => {
        if (!targetRef.value)
          return;
        if (val) {
          lastPosition = targetRef.value.style.transform;
          targetRef.value.style.transform = "";
        } else {
          targetRef.value.style.transform = lastPosition;
        }
      });
      onMounted(() => {
        if (props.modelValue) {
          visible.value = true;
          rendered.value = true;
          open();
        }
      });
      return {
        afterEnter,
        afterLeave,
        beforeLeave,
        handleClose,
        onModalClick,
        close: close2,
        doClose,
        onOpenAutoFocus,
        onCloseAutoFocus,
        onCloseRequested,
        onFocusoutPrevented,
        titleId,
        bodyId,
        closed,
        style,
        overlayDialogStyle,
        rendered,
        visible,
        zIndex: zIndex2
      };
    };
    const _hoisted_1$9 = ["aria-label", "aria-labelledby", "aria-describedby"];
    const __default__$7 = /* @__PURE__ */ defineComponent({
      name: "ElDialog",
      inheritAttrs: false
    });
    const _sfc_main$h = /* @__PURE__ */ defineComponent({
      ...__default__$7,
      props: dialogProps,
      emits: dialogEmits,
      setup(__props, { expose }) {
        const props = __props;
        const slots = useSlots();
        useDeprecated({
          scope: "el-dialog",
          from: "the title slot",
          replacement: "the header slot",
          version: "3.0.0",
          ref: "https://element-plus.org/en-US/component/dialog.html#slots"
        }, computed(() => !!slots.title));
        const ns = useNamespace("dialog");
        const dialogRef = ref();
        const headerRef = ref();
        const dialogContentRef = ref();
        const {
          visible,
          titleId,
          bodyId,
          style,
          overlayDialogStyle,
          rendered,
          zIndex: zIndex2,
          afterEnter,
          afterLeave,
          beforeLeave,
          handleClose,
          onModalClick,
          onOpenAutoFocus,
          onCloseAutoFocus,
          onCloseRequested,
          onFocusoutPrevented
        } = useDialog(props, dialogRef);
        provide(dialogInjectionKey, {
          dialogRef,
          headerRef,
          bodyId,
          ns,
          rendered,
          style
        });
        const overlayEvent = useSameTarget(onModalClick);
        const draggable = computed(() => props.draggable && !props.fullscreen);
        expose({
          visible,
          dialogContentRef
        });
        return (_ctx, _cache) => {
          return openBlock(), createBlock(Teleport, {
            to: _ctx.appendTo,
            disabled: _ctx.appendTo !== "body" ? false : !_ctx.appendToBody
          }, [
            createVNode(Transition, {
              name: "dialog-fade",
              onAfterEnter: unref(afterEnter),
              onAfterLeave: unref(afterLeave),
              onBeforeLeave: unref(beforeLeave),
              persisted: ""
            }, {
              default: withCtx(() => [
                withDirectives(createVNode(unref(ElOverlay), {
                  "custom-mask-event": "",
                  mask: _ctx.modal,
                  "overlay-class": _ctx.modalClass,
                  "z-index": unref(zIndex2)
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", {
                      role: "dialog",
                      "aria-modal": "true",
                      "aria-label": _ctx.title || void 0,
                      "aria-labelledby": !_ctx.title ? unref(titleId) : void 0,
                      "aria-describedby": unref(bodyId),
                      class: normalizeClass(`${unref(ns).namespace.value}-overlay-dialog`),
                      style: normalizeStyle(unref(overlayDialogStyle)),
                      onClick: _cache[0] || (_cache[0] = (...args) => unref(overlayEvent).onClick && unref(overlayEvent).onClick(...args)),
                      onMousedown: _cache[1] || (_cache[1] = (...args) => unref(overlayEvent).onMousedown && unref(overlayEvent).onMousedown(...args)),
                      onMouseup: _cache[2] || (_cache[2] = (...args) => unref(overlayEvent).onMouseup && unref(overlayEvent).onMouseup(...args))
                    }, [
                      createVNode(unref(ElFocusTrap), {
                        loop: "",
                        trapped: unref(visible),
                        "focus-start-el": "container",
                        onFocusAfterTrapped: unref(onOpenAutoFocus),
                        onFocusAfterReleased: unref(onCloseAutoFocus),
                        onFocusoutPrevented: unref(onFocusoutPrevented),
                        onReleaseRequested: unref(onCloseRequested)
                      }, {
                        default: withCtx(() => [
                          unref(rendered) ? (openBlock(), createBlock(ElDialogContent, mergeProps({
                            key: 0,
                            ref_key: "dialogContentRef",
                            ref: dialogContentRef
                          }, _ctx.$attrs, {
                            center: _ctx.center,
                            "align-center": _ctx.alignCenter,
                            "close-icon": _ctx.closeIcon,
                            draggable: unref(draggable),
                            overflow: _ctx.overflow,
                            fullscreen: _ctx.fullscreen,
                            "show-close": _ctx.showClose,
                            title: _ctx.title,
                            "aria-level": _ctx.headerAriaLevel,
                            onClose: unref(handleClose)
                          }), createSlots({
                            header: withCtx(() => [
                              !_ctx.$slots.title ? renderSlot(_ctx.$slots, "header", {
                                key: 0,
                                close: unref(handleClose),
                                titleId: unref(titleId),
                                titleClass: unref(ns).e("title")
                              }) : renderSlot(_ctx.$slots, "title", { key: 1 })
                            ]),
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "default")
                            ]),
                            _: 2
                          }, [
                            _ctx.$slots.footer ? {
                              name: "footer",
                              fn: withCtx(() => [
                                renderSlot(_ctx.$slots, "footer")
                              ])
                            } : void 0
                          ]), 1040, ["center", "align-center", "close-icon", "draggable", "overflow", "fullscreen", "show-close", "title", "aria-level", "onClose"])) : createCommentVNode("v-if", true)
                        ]),
                        _: 3
                      }, 8, ["trapped", "onFocusAfterTrapped", "onFocusAfterReleased", "onFocusoutPrevented", "onReleaseRequested"])
                    ], 46, _hoisted_1$9)
                  ]),
                  _: 3
                }, 8, ["mask", "overlay-class", "z-index"]), [
                  [vShow, unref(visible)]
                ])
              ]),
              _: 3
            }, 8, ["onAfterEnter", "onAfterLeave", "onBeforeLeave"])
          ], 8, ["to", "disabled"]);
        };
      }
    });
    var Dialog = /* @__PURE__ */ _export_sfc$1(_sfc_main$h, [["__file", "dialog.vue"]]);
    const ElDialog = withInstall(Dialog);
    const drawerProps = buildProps({
      ...dialogProps,
      direction: {
        type: String,
        default: "rtl",
        values: ["ltr", "rtl", "ttb", "btt"]
      },
      size: {
        type: [String, Number],
        default: "30%"
      },
      withHeader: {
        type: Boolean,
        default: true
      },
      modalFade: {
        type: Boolean,
        default: true
      },
      headerAriaLevel: {
        type: String,
        default: "2"
      }
    });
    const drawerEmits = dialogEmits;
    const _hoisted_1$8 = ["aria-label", "aria-labelledby", "aria-describedby"];
    const _hoisted_2$7 = ["id", "aria-level"];
    const _hoisted_3$5 = ["aria-label"];
    const _hoisted_4$4 = ["id"];
    const __default__$6 = /* @__PURE__ */ defineComponent({
      name: "ElDrawer",
      inheritAttrs: false
    });
    const _sfc_main$g = /* @__PURE__ */ defineComponent({
      ...__default__$6,
      props: drawerProps,
      emits: drawerEmits,
      setup(__props, { expose }) {
        const props = __props;
        const slots = useSlots();
        useDeprecated({
          scope: "el-drawer",
          from: "the title slot",
          replacement: "the header slot",
          version: "3.0.0",
          ref: "https://element-plus.org/en-US/component/drawer.html#slots"
        }, computed(() => !!slots.title));
        const drawerRef = ref();
        const focusStartRef = ref();
        const ns = useNamespace("drawer");
        const { t } = useLocale();
        const {
          afterEnter,
          afterLeave,
          beforeLeave,
          visible,
          rendered,
          titleId,
          bodyId,
          zIndex: zIndex2,
          onModalClick,
          onOpenAutoFocus,
          onCloseAutoFocus,
          onFocusoutPrevented,
          onCloseRequested,
          handleClose
        } = useDialog(props, drawerRef);
        const isHorizontal = computed(() => props.direction === "rtl" || props.direction === "ltr");
        const drawerSize = computed(() => addUnit(props.size));
        expose({
          handleClose,
          afterEnter,
          afterLeave
        });
        return (_ctx, _cache) => {
          return openBlock(), createBlock(Teleport, {
            to: "body",
            disabled: !_ctx.appendToBody
          }, [
            createVNode(Transition, {
              name: unref(ns).b("fade"),
              onAfterEnter: unref(afterEnter),
              onAfterLeave: unref(afterLeave),
              onBeforeLeave: unref(beforeLeave),
              persisted: ""
            }, {
              default: withCtx(() => [
                withDirectives(createVNode(unref(ElOverlay), {
                  mask: _ctx.modal,
                  "overlay-class": _ctx.modalClass,
                  "z-index": unref(zIndex2),
                  onClick: unref(onModalClick)
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ElFocusTrap), {
                      loop: "",
                      trapped: unref(visible),
                      "focus-trap-el": drawerRef.value,
                      "focus-start-el": focusStartRef.value,
                      onFocusAfterTrapped: unref(onOpenAutoFocus),
                      onFocusAfterReleased: unref(onCloseAutoFocus),
                      onFocusoutPrevented: unref(onFocusoutPrevented),
                      onReleaseRequested: unref(onCloseRequested)
                    }, {
                      default: withCtx(() => [
                        createBaseVNode("div", mergeProps({
                          ref_key: "drawerRef",
                          ref: drawerRef,
                          "aria-modal": "true",
                          "aria-label": _ctx.title || void 0,
                          "aria-labelledby": !_ctx.title ? unref(titleId) : void 0,
                          "aria-describedby": unref(bodyId)
                        }, _ctx.$attrs, {
                          class: [unref(ns).b(), _ctx.direction, unref(visible) && "open"],
                          style: unref(isHorizontal) ? "width: " + unref(drawerSize) : "height: " + unref(drawerSize),
                          role: "dialog",
                          onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                          }, ["stop"]))
                        }), [
                          createBaseVNode("span", {
                            ref_key: "focusStartRef",
                            ref: focusStartRef,
                            class: normalizeClass(unref(ns).e("sr-focus")),
                            tabindex: "-1"
                          }, null, 2),
                          _ctx.withHeader ? (openBlock(), createElementBlock("header", {
                            key: 0,
                            class: normalizeClass(unref(ns).e("header"))
                          }, [
                            !_ctx.$slots.title ? renderSlot(_ctx.$slots, "header", {
                              key: 0,
                              close: unref(handleClose),
                              titleId: unref(titleId),
                              titleClass: unref(ns).e("title")
                            }, () => [
                              !_ctx.$slots.title ? (openBlock(), createElementBlock("span", {
                                key: 0,
                                id: unref(titleId),
                                role: "heading",
                                "aria-level": _ctx.headerAriaLevel,
                                class: normalizeClass(unref(ns).e("title"))
                              }, toDisplayString(_ctx.title), 11, _hoisted_2$7)) : createCommentVNode("v-if", true)
                            ]) : renderSlot(_ctx.$slots, "title", { key: 1 }, () => [
                              createCommentVNode(" DEPRECATED SLOT ")
                            ]),
                            _ctx.showClose ? (openBlock(), createElementBlock("button", {
                              key: 2,
                              "aria-label": unref(t)("el.drawer.close"),
                              class: normalizeClass(unref(ns).e("close-btn")),
                              type: "button",
                              onClick: _cache[0] || (_cache[0] = (...args) => unref(handleClose) && unref(handleClose)(...args))
                            }, [
                              createVNode(unref(ElIcon), {
                                class: normalizeClass(unref(ns).e("close"))
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(close_default))
                                ]),
                                _: 1
                              }, 8, ["class"])
                            ], 10, _hoisted_3$5)) : createCommentVNode("v-if", true)
                          ], 2)) : createCommentVNode("v-if", true),
                          unref(rendered) ? (openBlock(), createElementBlock("div", {
                            key: 1,
                            id: unref(bodyId),
                            class: normalizeClass(unref(ns).e("body"))
                          }, [
                            renderSlot(_ctx.$slots, "default")
                          ], 10, _hoisted_4$4)) : createCommentVNode("v-if", true),
                          _ctx.$slots.footer ? (openBlock(), createElementBlock("div", {
                            key: 2,
                            class: normalizeClass(unref(ns).e("footer"))
                          }, [
                            renderSlot(_ctx.$slots, "footer")
                          ], 2)) : createCommentVNode("v-if", true)
                        ], 16, _hoisted_1$8)
                      ]),
                      _: 3
                    }, 8, ["trapped", "focus-trap-el", "focus-start-el", "onFocusAfterTrapped", "onFocusAfterReleased", "onFocusoutPrevented", "onReleaseRequested"])
                  ]),
                  _: 3
                }, 8, ["mask", "overlay-class", "z-index", "onClick"]), [
                  [vShow, unref(visible)]
                ])
              ]),
              _: 3
            }, 8, ["name", "onAfterEnter", "onAfterLeave", "onBeforeLeave"])
          ], 8, ["disabled"]);
        };
      }
    });
    var Drawer = /* @__PURE__ */ _export_sfc$1(_sfc_main$g, [["__file", "drawer.vue"]]);
    const ElDrawer = withInstall(Drawer);
    const _sfc_main$f = /* @__PURE__ */ defineComponent({
      inheritAttrs: false
    });
    function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
      return renderSlot(_ctx.$slots, "default");
    }
    var Collection = /* @__PURE__ */ _export_sfc$1(_sfc_main$f, [["render", _sfc_render$6], ["__file", "collection.vue"]]);
    const _sfc_main$e = /* @__PURE__ */ defineComponent({
      name: "ElCollectionItem",
      inheritAttrs: false
    });
    function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
      return renderSlot(_ctx.$slots, "default");
    }
    var CollectionItem = /* @__PURE__ */ _export_sfc$1(_sfc_main$e, [["render", _sfc_render$5], ["__file", "collection-item.vue"]]);
    const COLLECTION_ITEM_SIGN = `data-el-collection-item`;
    const createCollectionWithScope = (name) => {
      const COLLECTION_NAME = `El${name}Collection`;
      const COLLECTION_ITEM_NAME = `${COLLECTION_NAME}Item`;
      const COLLECTION_INJECTION_KEY = Symbol(COLLECTION_NAME);
      const COLLECTION_ITEM_INJECTION_KEY = Symbol(COLLECTION_ITEM_NAME);
      const ElCollection = {
        ...Collection,
        name: COLLECTION_NAME,
        setup() {
          const collectionRef = ref(null);
          const itemMap = /* @__PURE__ */ new Map();
          const getItems = () => {
            const collectionEl = unref(collectionRef);
            if (!collectionEl)
              return [];
            const orderedNodes = Array.from(collectionEl.querySelectorAll(`[${COLLECTION_ITEM_SIGN}]`));
            const items = [...itemMap.values()];
            return items.sort((a, b) => orderedNodes.indexOf(a.ref) - orderedNodes.indexOf(b.ref));
          };
          provide(COLLECTION_INJECTION_KEY, {
            itemMap,
            getItems,
            collectionRef
          });
        }
      };
      const ElCollectionItem = {
        ...CollectionItem,
        name: COLLECTION_ITEM_NAME,
        setup(_, { attrs }) {
          const collectionItemRef = ref(null);
          const collectionInjection = inject(COLLECTION_INJECTION_KEY, void 0);
          provide(COLLECTION_ITEM_INJECTION_KEY, {
            collectionItemRef
          });
          onMounted(() => {
            const collectionItemEl = unref(collectionItemRef);
            if (collectionItemEl) {
              collectionInjection.itemMap.set(collectionItemEl, {
                ref: collectionItemEl,
                ...attrs
              });
            }
          });
          onBeforeUnmount(() => {
            const collectionItemEl = unref(collectionItemRef);
            collectionInjection.itemMap.delete(collectionItemEl);
          });
        }
      };
      return {
        COLLECTION_INJECTION_KEY,
        COLLECTION_ITEM_INJECTION_KEY,
        ElCollection,
        ElCollectionItem
      };
    };
    const dropdownProps = buildProps({
      trigger: useTooltipTriggerProps.trigger,
      effect: {
        ...useTooltipContentProps.effect,
        default: "light"
      },
      type: {
        type: definePropType(String)
      },
      placement: {
        type: definePropType(String),
        default: "bottom"
      },
      popperOptions: {
        type: definePropType(Object),
        default: () => ({})
      },
      id: String,
      size: {
        type: String,
        default: ""
      },
      splitButton: Boolean,
      hideOnClick: {
        type: Boolean,
        default: true
      },
      loop: {
        type: Boolean,
        default: true
      },
      showTimeout: {
        type: Number,
        default: 150
      },
      hideTimeout: {
        type: Number,
        default: 150
      },
      tabindex: {
        type: definePropType([Number, String]),
        default: 0
      },
      maxHeight: {
        type: definePropType([Number, String]),
        default: ""
      },
      popperClass: {
        type: String,
        default: ""
      },
      disabled: {
        type: Boolean,
        default: false
      },
      role: {
        type: String,
        default: "menu"
      },
      buttonProps: {
        type: definePropType(Object)
      },
      teleported: useTooltipContentProps.teleported
    });
    buildProps({
      command: {
        type: [Object, String, Number],
        default: () => ({})
      },
      disabled: Boolean,
      divided: Boolean,
      textValue: String,
      icon: {
        type: iconPropType
      }
    });
    buildProps({
      onKeydown: { type: definePropType(Function) }
    });
    createCollectionWithScope("Dropdown");
    const selectGroupKey = Symbol("ElSelectGroup");
    const selectKey = Symbol("ElSelect");
    function useOption(props, states) {
      const select = inject(selectKey);
      const selectGroup = inject(selectGroupKey, { disabled: false });
      const itemSelected = computed(() => {
        if (select.props.multiple) {
          return contains(select.props.modelValue, props.value);
        } else {
          return contains([select.props.modelValue], props.value);
        }
      });
      const limitReached = computed(() => {
        if (select.props.multiple) {
          const modelValue = select.props.modelValue || [];
          return !itemSelected.value && modelValue.length >= select.props.multipleLimit && select.props.multipleLimit > 0;
        } else {
          return false;
        }
      });
      const currentLabel = computed(() => {
        return props.label || (isObject$1(props.value) ? "" : props.value);
      });
      const currentValue = computed(() => {
        return props.value || props.label || "";
      });
      const isDisabled = computed(() => {
        return props.disabled || states.groupDisabled || limitReached.value;
      });
      const instance = getCurrentInstance();
      const contains = (arr = [], target) => {
        if (!isObject$1(props.value)) {
          return arr && arr.includes(target);
        } else {
          const valueKey = select.props.valueKey;
          return arr && arr.some((item) => {
            return toRaw(get(item, valueKey)) === get(target, valueKey);
          });
        }
      };
      const hoverItem = () => {
        if (!props.disabled && !selectGroup.disabled) {
          select.states.hoveringIndex = select.optionsArray.indexOf(instance.proxy);
        }
      };
      const updateOption = (query) => {
        const regexp2 = new RegExp(escapeStringRegexp(query), "i");
        states.visible = regexp2.test(currentLabel.value) || props.created;
      };
      watch(() => currentLabel.value, () => {
        if (!props.created && !select.props.remote)
          select.setSelected();
      });
      watch(() => props.value, (val, oldVal) => {
        const { remote, valueKey } = select.props;
        if (!isEqual(val, oldVal)) {
          select.onOptionDestroy(oldVal, instance.proxy);
          select.onOptionCreate(instance.proxy);
        }
        if (!props.created && !remote) {
          if (valueKey && isObject$1(val) && isObject$1(oldVal) && val[valueKey] === oldVal[valueKey]) {
            return;
          }
          select.setSelected();
        }
      });
      watch(() => selectGroup.disabled, () => {
        states.groupDisabled = selectGroup.disabled;
      }, { immediate: true });
      return {
        select,
        currentLabel,
        currentValue,
        itemSelected,
        isDisabled,
        hoverItem,
        updateOption
      };
    }
    const _sfc_main$d = /* @__PURE__ */ defineComponent({
      name: "ElOption",
      componentName: "ElOption",
      props: {
        value: {
          required: true,
          type: [String, Number, Boolean, Object]
        },
        label: [String, Number],
        created: Boolean,
        disabled: Boolean
      },
      setup(props) {
        const ns = useNamespace("select");
        const id = useId();
        const containerKls = computed(() => [
          ns.be("dropdown", "item"),
          ns.is("disabled", unref(isDisabled)),
          ns.is("selected", unref(itemSelected)),
          ns.is("hovering", unref(hover))
        ]);
        const states = reactive({
          index: -1,
          groupDisabled: false,
          visible: true,
          hover: false
        });
        const {
          currentLabel,
          itemSelected,
          isDisabled,
          select,
          hoverItem,
          updateOption
        } = useOption(props, states);
        const { visible, hover } = toRefs(states);
        const vm = getCurrentInstance().proxy;
        select.onOptionCreate(vm);
        onBeforeUnmount(() => {
          const key2 = vm.value;
          const { selected } = select.states;
          const selectedOptions = select.props.multiple ? selected : [selected];
          const doesSelected = selectedOptions.some((item) => {
            return item.value === vm.value;
          });
          nextTick(() => {
            if (select.states.cachedOptions.get(key2) === vm && !doesSelected) {
              select.states.cachedOptions.delete(key2);
            }
          });
          select.onOptionDestroy(key2, vm);
        });
        function selectOptionClick() {
          if (props.disabled !== true && states.groupDisabled !== true) {
            select.handleOptionSelect(vm);
          }
        }
        return {
          ns,
          id,
          containerKls,
          currentLabel,
          itemSelected,
          isDisabled,
          select,
          hoverItem,
          updateOption,
          visible,
          hover,
          selectOptionClick,
          states
        };
      }
    });
    const _hoisted_1$7 = ["id", "aria-disabled", "aria-selected"];
    function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
      return withDirectives((openBlock(), createElementBlock("li", {
        id: _ctx.id,
        class: normalizeClass(_ctx.containerKls),
        role: "option",
        "aria-disabled": _ctx.isDisabled || void 0,
        "aria-selected": _ctx.itemSelected,
        onMouseenter: _cache[0] || (_cache[0] = (...args) => _ctx.hoverItem && _ctx.hoverItem(...args)),
        onClick: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.selectOptionClick && _ctx.selectOptionClick(...args), ["stop"]))
      }, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          createBaseVNode("span", null, toDisplayString(_ctx.currentLabel), 1)
        ])
      ], 42, _hoisted_1$7)), [
        [vShow, _ctx.visible]
      ]);
    }
    var Option = /* @__PURE__ */ _export_sfc$1(_sfc_main$d, [["render", _sfc_render$4], ["__file", "option.vue"]]);
    const _sfc_main$c = /* @__PURE__ */ defineComponent({
      name: "ElSelectDropdown",
      componentName: "ElSelectDropdown",
      setup() {
        const select = inject(selectKey);
        const ns = useNamespace("select");
        const popperClass = computed(() => select.props.popperClass);
        const isMultiple = computed(() => select.props.multiple);
        const isFitInputWidth = computed(() => select.props.fitInputWidth);
        const minWidth = ref("");
        function updateMinWidth() {
          var _a2;
          minWidth.value = `${(_a2 = select.selectRef) == null ? void 0 : _a2.offsetWidth}px`;
        }
        onMounted(() => {
          updateMinWidth();
          useResizeObserver(select.selectRef, updateMinWidth);
        });
        return {
          ns,
          minWidth,
          popperClass,
          isMultiple,
          isFitInputWidth
        };
      }
    });
    function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([_ctx.ns.b("dropdown"), _ctx.ns.is("multiple", _ctx.isMultiple), _ctx.popperClass]),
        style: normalizeStyle({ [_ctx.isFitInputWidth ? "width" : "minWidth"]: _ctx.minWidth })
      }, [
        _ctx.$slots.header ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(_ctx.ns.be("dropdown", "header"))
        }, [
          renderSlot(_ctx.$slots, "header")
        ], 2)) : createCommentVNode("v-if", true),
        renderSlot(_ctx.$slots, "default"),
        _ctx.$slots.footer ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(_ctx.ns.be("dropdown", "footer"))
        }, [
          renderSlot(_ctx.$slots, "footer")
        ], 2)) : createCommentVNode("v-if", true)
      ], 6);
    }
    var ElSelectMenu = /* @__PURE__ */ _export_sfc$1(_sfc_main$c, [["render", _sfc_render$3], ["__file", "select-dropdown.vue"]]);
    function useInput(handleInput) {
      const isComposing = ref(false);
      const handleCompositionStart = () => {
        isComposing.value = true;
      };
      const handleCompositionUpdate = (event) => {
        const text = event.target.value;
        const lastCharacter = text[text.length - 1] || "";
        isComposing.value = !isKorean(lastCharacter);
      };
      const handleCompositionEnd = (event) => {
        if (isComposing.value) {
          isComposing.value = false;
          if (isFunction$1(handleInput)) {
            handleInput(event);
          }
        }
      };
      return {
        handleCompositionStart,
        handleCompositionUpdate,
        handleCompositionEnd
      };
    }
    const MINIMUM_INPUT_WIDTH = 11;
    const useSelect = (props, emit2) => {
      const { t } = useLocale();
      const contentId = useId();
      const nsSelect = useNamespace("select");
      const nsInput = useNamespace("input");
      const states = reactive({
        inputValue: "",
        options: /* @__PURE__ */ new Map(),
        cachedOptions: /* @__PURE__ */ new Map(),
        disabledOptions: /* @__PURE__ */ new Map(),
        optionValues: [],
        selected: props.multiple ? [] : {},
        selectionWidth: 0,
        calculatorWidth: 0,
        collapseItemWidth: 0,
        selectedLabel: "",
        hoveringIndex: -1,
        previousQuery: null,
        inputHovering: false,
        menuVisibleOnFocus: false,
        isBeforeHide: false
      });
      const selectRef = ref(null);
      const selectionRef = ref(null);
      const tooltipRef = ref(null);
      const tagTooltipRef = ref(null);
      const inputRef = ref(null);
      const calculatorRef = ref(null);
      const prefixRef = ref(null);
      const suffixRef = ref(null);
      const menuRef = ref(null);
      const tagMenuRef = ref(null);
      const collapseItemRef = ref(null);
      const scrollbarRef = ref(null);
      const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(inputRef, {
        afterFocus() {
          if (props.automaticDropdown && !expanded.value) {
            expanded.value = true;
            states.menuVisibleOnFocus = true;
          }
        },
        beforeBlur(event) {
          var _a2, _b;
          return ((_a2 = tooltipRef.value) == null ? void 0 : _a2.isFocusInsideContent(event)) || ((_b = tagTooltipRef.value) == null ? void 0 : _b.isFocusInsideContent(event));
        },
        afterBlur() {
          expanded.value = false;
          states.menuVisibleOnFocus = false;
        }
      });
      const expanded = ref(false);
      const hoverOption = ref();
      const { form, formItem } = useFormItem();
      const { inputId } = useFormItemInputId(props, {
        formItemContext: formItem
      });
      const { valueOnClear, isEmptyValue: isEmptyValue2 } = useEmptyValues(props);
      const selectDisabled = computed(() => props.disabled || (form == null ? void 0 : form.disabled));
      const hasModelValue = computed(() => {
        return props.multiple ? isArray$2(props.modelValue) && props.modelValue.length > 0 : !isEmptyValue2(props.modelValue);
      });
      const showClose = computed(() => {
        return props.clearable && !selectDisabled.value && states.inputHovering && hasModelValue.value;
      });
      const iconComponent = computed(() => props.remote && props.filterable && !props.remoteShowSuffix ? "" : props.suffixIcon);
      const iconReverse = computed(() => nsSelect.is("reverse", iconComponent.value && expanded.value));
      const validateState = computed(() => (formItem == null ? void 0 : formItem.validateState) || "");
      const validateIcon = computed(() => ValidateComponentsMap[validateState.value]);
      const debounce$1 = computed(() => props.remote ? 300 : 0);
      const emptyText = computed(() => {
        if (props.loading) {
          return props.loadingText || t("el.select.loading");
        } else {
          if (props.remote && !states.inputValue && states.options.size === 0)
            return false;
          if (props.filterable && states.inputValue && states.options.size > 0 && filteredOptionsCount.value === 0) {
            return props.noMatchText || t("el.select.noMatch");
          }
          if (states.options.size === 0) {
            return props.noDataText || t("el.select.noData");
          }
        }
        return null;
      });
      const filteredOptionsCount = computed(() => optionsArray.value.filter((option) => option.visible).length);
      const optionsArray = computed(() => {
        const list = Array.from(states.options.values());
        const newList = [];
        states.optionValues.forEach((item) => {
          const index = list.findIndex((i) => i.value === item);
          if (index > -1) {
            newList.push(list[index]);
          }
        });
        return newList.length >= list.length ? newList : list;
      });
      const cachedOptionsArray = computed(() => Array.from(states.cachedOptions.values()));
      const showNewOption = computed(() => {
        const hasExistingOption = optionsArray.value.filter((option) => {
          return !option.created;
        }).some((option) => {
          return option.currentLabel === states.inputValue;
        });
        return props.filterable && props.allowCreate && states.inputValue !== "" && !hasExistingOption;
      });
      const updateOptions2 = () => {
        if (props.filterable && isFunction$1(props.filterMethod))
          return;
        if (props.filterable && props.remote && isFunction$1(props.remoteMethod))
          return;
        optionsArray.value.forEach((option) => {
          var _a2;
          (_a2 = option.updateOption) == null ? void 0 : _a2.call(option, states.inputValue);
        });
      };
      const selectSize = useFormSize();
      const collapseTagSize = computed(() => ["small"].includes(selectSize.value) ? "small" : "default");
      const dropdownMenuVisible = computed({
        get() {
          return expanded.value && emptyText.value !== false;
        },
        set(val) {
          expanded.value = val;
        }
      });
      const shouldShowPlaceholder = computed(() => {
        if (isArray$2(props.modelValue)) {
          return props.modelValue.length === 0 && !states.inputValue;
        }
        return props.filterable ? !states.inputValue : true;
      });
      const currentPlaceholder = computed(() => {
        var _a2;
        const _placeholder = (_a2 = props.placeholder) != null ? _a2 : t("el.select.placeholder");
        return props.multiple || !hasModelValue.value ? _placeholder : states.selectedLabel;
      });
      watch(() => props.modelValue, (val, oldVal) => {
        if (props.multiple) {
          if (props.filterable && !props.reserveKeyword) {
            states.inputValue = "";
            handleQueryChange("");
          }
        }
        setSelected();
        if (!isEqual(val, oldVal) && props.validateEvent) {
          formItem == null ? void 0 : formItem.validate("change").catch((err) => debugWarn());
        }
      }, {
        flush: "post",
        deep: true
      });
      watch(() => expanded.value, (val) => {
        if (val) {
          handleQueryChange(states.inputValue);
        } else {
          states.inputValue = "";
          states.previousQuery = null;
          states.isBeforeHide = true;
        }
        emit2("visible-change", val);
      });
      watch(() => states.options.entries(), () => {
        var _a2;
        if (!isClient)
          return;
        const inputs = ((_a2 = selectRef.value) == null ? void 0 : _a2.querySelectorAll("input")) || [];
        if (!props.filterable && !props.defaultFirstOption && !isUndefined(props.modelValue) || !Array.from(inputs).includes(document.activeElement)) {
          setSelected();
        }
        if (props.defaultFirstOption && (props.filterable || props.remote) && filteredOptionsCount.value) {
          checkDefaultFirstOption();
        }
      }, {
        flush: "post"
      });
      watch(() => states.hoveringIndex, (val) => {
        if (isNumber(val) && val > -1) {
          hoverOption.value = optionsArray.value[val] || {};
        } else {
          hoverOption.value = {};
        }
        optionsArray.value.forEach((option) => {
          option.hover = hoverOption.value === option;
        });
      });
      watchEffect(() => {
        if (states.isBeforeHide)
          return;
        updateOptions2();
      });
      const handleQueryChange = (val) => {
        if (states.previousQuery === val) {
          return;
        }
        states.previousQuery = val;
        if (props.filterable && isFunction$1(props.filterMethod)) {
          props.filterMethod(val);
        } else if (props.filterable && props.remote && isFunction$1(props.remoteMethod)) {
          props.remoteMethod(val);
        }
        if (props.defaultFirstOption && (props.filterable || props.remote) && filteredOptionsCount.value) {
          nextTick(checkDefaultFirstOption);
        } else {
          nextTick(updateHoveringIndex);
        }
      };
      const checkDefaultFirstOption = () => {
        const optionsInDropdown = optionsArray.value.filter((n) => n.visible && !n.disabled && !n.states.groupDisabled);
        const userCreatedOption = optionsInDropdown.find((n) => n.created);
        const firstOriginOption = optionsInDropdown[0];
        states.hoveringIndex = getValueIndex(optionsArray.value, userCreatedOption || firstOriginOption);
      };
      const setSelected = () => {
        if (!props.multiple) {
          const option = getOption(props.modelValue);
          states.selectedLabel = option.currentLabel;
          states.selected = option;
          return;
        } else {
          states.selectedLabel = "";
        }
        const result = [];
        if (isArray$2(props.modelValue)) {
          props.modelValue.forEach((value) => {
            result.push(getOption(value));
          });
        }
        states.selected = result;
      };
      const getOption = (value) => {
        let option;
        const isObjectValue = toRawType(value).toLowerCase() === "object";
        const isNull = toRawType(value).toLowerCase() === "null";
        const isUndefined2 = toRawType(value).toLowerCase() === "undefined";
        for (let i = states.cachedOptions.size - 1; i >= 0; i--) {
          const cachedOption = cachedOptionsArray.value[i];
          const isEqualValue = isObjectValue ? get(cachedOption.value, props.valueKey) === get(value, props.valueKey) : cachedOption.value === value;
          if (isEqualValue) {
            option = {
              value,
              currentLabel: cachedOption.currentLabel,
              isDisabled: cachedOption.isDisabled
            };
            break;
          }
        }
        if (option)
          return option;
        const label = isObjectValue ? value.label : !isNull && !isUndefined2 ? value : "";
        const newOption = {
          value,
          currentLabel: label
        };
        return newOption;
      };
      const updateHoveringIndex = () => {
        if (!props.multiple) {
          states.hoveringIndex = optionsArray.value.findIndex((item) => {
            return getValueKey(item) === getValueKey(states.selected);
          });
        } else {
          states.hoveringIndex = optionsArray.value.findIndex((item) => states.selected.some((selected) => getValueKey(selected) === getValueKey(item)));
        }
      };
      const resetSelectionWidth = () => {
        states.selectionWidth = selectionRef.value.getBoundingClientRect().width;
      };
      const resetCalculatorWidth = () => {
        states.calculatorWidth = calculatorRef.value.getBoundingClientRect().width;
      };
      const resetCollapseItemWidth = () => {
        states.collapseItemWidth = collapseItemRef.value.getBoundingClientRect().width;
      };
      const updateTooltip = () => {
        var _a2, _b;
        (_b = (_a2 = tooltipRef.value) == null ? void 0 : _a2.updatePopper) == null ? void 0 : _b.call(_a2);
      };
      const updateTagTooltip = () => {
        var _a2, _b;
        (_b = (_a2 = tagTooltipRef.value) == null ? void 0 : _a2.updatePopper) == null ? void 0 : _b.call(_a2);
      };
      const onInputChange = () => {
        if (states.inputValue.length > 0 && !expanded.value) {
          expanded.value = true;
        }
        handleQueryChange(states.inputValue);
      };
      const onInput = (event) => {
        states.inputValue = event.target.value;
        if (props.remote) {
          debouncedOnInputChange();
        } else {
          return onInputChange();
        }
      };
      const debouncedOnInputChange = debounce(() => {
        onInputChange();
      }, debounce$1.value);
      const emitChange = (val) => {
        if (!isEqual(props.modelValue, val)) {
          emit2(CHANGE_EVENT, val);
        }
      };
      const getLastNotDisabledIndex = (value) => findLastIndex(value, (it2) => !states.disabledOptions.has(it2));
      const deletePrevTag = (e) => {
        if (!props.multiple)
          return;
        if (e.code === EVENT_CODE.delete)
          return;
        if (e.target.value.length <= 0) {
          const value = props.modelValue.slice();
          const lastNotDisabledIndex = getLastNotDisabledIndex(value);
          if (lastNotDisabledIndex < 0)
            return;
          value.splice(lastNotDisabledIndex, 1);
          emit2(UPDATE_MODEL_EVENT, value);
          emitChange(value);
        }
      };
      const deleteTag = (event, tag) => {
        const index = states.selected.indexOf(tag);
        if (index > -1 && !selectDisabled.value) {
          const value = props.modelValue.slice();
          value.splice(index, 1);
          emit2(UPDATE_MODEL_EVENT, value);
          emitChange(value);
          emit2("remove-tag", tag.value);
        }
        event.stopPropagation();
        focus();
      };
      const deleteSelected = (event) => {
        event.stopPropagation();
        const value = props.multiple ? [] : valueOnClear.value;
        if (props.multiple) {
          for (const item of states.selected) {
            if (item.isDisabled)
              value.push(item.value);
          }
        }
        emit2(UPDATE_MODEL_EVENT, value);
        emitChange(value);
        states.hoveringIndex = -1;
        expanded.value = false;
        emit2("clear");
        focus();
      };
      const handleOptionSelect = (option) => {
        if (props.multiple) {
          const value = (props.modelValue || []).slice();
          const optionIndex = getValueIndex(value, option.value);
          if (optionIndex > -1) {
            value.splice(optionIndex, 1);
          } else if (props.multipleLimit <= 0 || value.length < props.multipleLimit) {
            value.push(option.value);
          }
          emit2(UPDATE_MODEL_EVENT, value);
          emitChange(value);
          if (option.created) {
            handleQueryChange("");
          }
          if (props.filterable && !props.reserveKeyword) {
            states.inputValue = "";
          }
        } else {
          emit2(UPDATE_MODEL_EVENT, option.value);
          emitChange(option.value);
          expanded.value = false;
        }
        focus();
        if (expanded.value)
          return;
        nextTick(() => {
          scrollToOption(option);
        });
      };
      const getValueIndex = (arr = [], value) => {
        if (!isObject$1(value))
          return arr.indexOf(value);
        const valueKey = props.valueKey;
        let index = -1;
        arr.some((item, i) => {
          if (toRaw(get(item, valueKey)) === get(value, valueKey)) {
            index = i;
            return true;
          }
          return false;
        });
        return index;
      };
      const scrollToOption = (option) => {
        var _a2, _b, _c, _d, _e;
        const targetOption = isArray$2(option) ? option[0] : option;
        let target = null;
        if (targetOption == null ? void 0 : targetOption.value) {
          const options = optionsArray.value.filter((item) => item.value === targetOption.value);
          if (options.length > 0) {
            target = options[0].$el;
          }
        }
        if (tooltipRef.value && target) {
          const menu = (_d = (_c = (_b = (_a2 = tooltipRef.value) == null ? void 0 : _a2.popperRef) == null ? void 0 : _b.contentRef) == null ? void 0 : _c.querySelector) == null ? void 0 : _d.call(_c, `.${nsSelect.be("dropdown", "wrap")}`);
          if (menu) {
            scrollIntoView(menu, target);
          }
        }
        (_e = scrollbarRef.value) == null ? void 0 : _e.handleScroll();
      };
      const onOptionCreate = (vm) => {
        states.options.set(vm.value, vm);
        states.cachedOptions.set(vm.value, vm);
        vm.disabled && states.disabledOptions.set(vm.value, vm);
      };
      const onOptionDestroy = (key2, vm) => {
        if (states.options.get(key2) === vm) {
          states.options.delete(key2);
        }
      };
      const {
        handleCompositionStart,
        handleCompositionUpdate,
        handleCompositionEnd
      } = useInput((e) => onInput(e));
      const popperRef = computed(() => {
        var _a2, _b;
        return (_b = (_a2 = tooltipRef.value) == null ? void 0 : _a2.popperRef) == null ? void 0 : _b.contentRef;
      });
      const handleMenuEnter = () => {
        states.isBeforeHide = false;
        nextTick(() => scrollToOption(states.selected));
      };
      const focus = () => {
        var _a2;
        (_a2 = inputRef.value) == null ? void 0 : _a2.focus();
      };
      const blur = () => {
        handleClickOutside();
      };
      const handleClearClick = (event) => {
        deleteSelected(event);
      };
      const handleClickOutside = (event) => {
        expanded.value = false;
        if (isFocused.value) {
          const _event2 = new FocusEvent("focus", event);
          nextTick(() => handleBlur(_event2));
        }
      };
      const handleEsc = () => {
        if (states.inputValue.length > 0) {
          states.inputValue = "";
        } else {
          expanded.value = false;
        }
      };
      const toggleMenu = () => {
        if (selectDisabled.value)
          return;
        if (states.menuVisibleOnFocus) {
          states.menuVisibleOnFocus = false;
        } else {
          expanded.value = !expanded.value;
        }
      };
      const selectOption = () => {
        if (!expanded.value) {
          toggleMenu();
        } else {
          if (optionsArray.value[states.hoveringIndex]) {
            handleOptionSelect(optionsArray.value[states.hoveringIndex]);
          }
        }
      };
      const getValueKey = (item) => {
        return isObject$1(item.value) ? get(item.value, props.valueKey) : item.value;
      };
      const optionsAllDisabled = computed(() => optionsArray.value.filter((option) => option.visible).every((option) => option.disabled));
      const showTagList = computed(() => {
        if (!props.multiple) {
          return [];
        }
        return props.collapseTags ? states.selected.slice(0, props.maxCollapseTags) : states.selected;
      });
      const collapseTagList = computed(() => {
        if (!props.multiple) {
          return [];
        }
        return props.collapseTags ? states.selected.slice(props.maxCollapseTags) : [];
      });
      const navigateOptions = (direction) => {
        if (!expanded.value) {
          expanded.value = true;
          return;
        }
        if (states.options.size === 0 || filteredOptionsCount.value === 0)
          return;
        if (!optionsAllDisabled.value) {
          if (direction === "next") {
            states.hoveringIndex++;
            if (states.hoveringIndex === states.options.size) {
              states.hoveringIndex = 0;
            }
          } else if (direction === "prev") {
            states.hoveringIndex--;
            if (states.hoveringIndex < 0) {
              states.hoveringIndex = states.options.size - 1;
            }
          }
          const option = optionsArray.value[states.hoveringIndex];
          if (option.disabled === true || option.states.groupDisabled === true || !option.visible) {
            navigateOptions(direction);
          }
          nextTick(() => scrollToOption(hoverOption.value));
        }
      };
      const getGapWidth = () => {
        if (!selectionRef.value)
          return 0;
        const style = window.getComputedStyle(selectionRef.value);
        return Number.parseFloat(style.gap || "6px");
      };
      const tagStyle = computed(() => {
        const gapWidth = getGapWidth();
        const maxWidth = collapseItemRef.value && props.maxCollapseTags === 1 ? states.selectionWidth - states.collapseItemWidth - gapWidth : states.selectionWidth;
        return { maxWidth: `${maxWidth}px` };
      });
      const collapseTagStyle = computed(() => {
        return { maxWidth: `${states.selectionWidth}px` };
      });
      const inputStyle = computed(() => ({
        width: `${Math.max(states.calculatorWidth, MINIMUM_INPUT_WIDTH)}px`
      }));
      if (props.multiple && !isArray$2(props.modelValue)) {
        emit2(UPDATE_MODEL_EVENT, []);
      }
      if (!props.multiple && isArray$2(props.modelValue)) {
        emit2(UPDATE_MODEL_EVENT, "");
      }
      useResizeObserver(selectionRef, resetSelectionWidth);
      useResizeObserver(calculatorRef, resetCalculatorWidth);
      useResizeObserver(menuRef, updateTooltip);
      useResizeObserver(wrapperRef, updateTooltip);
      useResizeObserver(tagMenuRef, updateTagTooltip);
      useResizeObserver(collapseItemRef, resetCollapseItemWidth);
      onMounted(() => {
        setSelected();
      });
      return {
        inputId,
        contentId,
        nsSelect,
        nsInput,
        states,
        isFocused,
        expanded,
        optionsArray,
        hoverOption,
        selectSize,
        filteredOptionsCount,
        resetCalculatorWidth,
        updateTooltip,
        updateTagTooltip,
        debouncedOnInputChange,
        onInput,
        deletePrevTag,
        deleteTag,
        deleteSelected,
        handleOptionSelect,
        scrollToOption,
        hasModelValue,
        shouldShowPlaceholder,
        currentPlaceholder,
        showClose,
        iconComponent,
        iconReverse,
        validateState,
        validateIcon,
        showNewOption,
        updateOptions: updateOptions2,
        collapseTagSize,
        setSelected,
        selectDisabled,
        emptyText,
        handleCompositionStart,
        handleCompositionUpdate,
        handleCompositionEnd,
        onOptionCreate,
        onOptionDestroy,
        handleMenuEnter,
        handleFocus,
        focus,
        blur,
        handleBlur,
        handleClearClick,
        handleClickOutside,
        handleEsc,
        toggleMenu,
        selectOption,
        getValueKey,
        navigateOptions,
        dropdownMenuVisible,
        showTagList,
        collapseTagList,
        tagStyle,
        collapseTagStyle,
        inputStyle,
        popperRef,
        inputRef,
        tooltipRef,
        tagTooltipRef,
        calculatorRef,
        prefixRef,
        suffixRef,
        selectRef,
        wrapperRef,
        selectionRef,
        scrollbarRef,
        menuRef,
        tagMenuRef,
        collapseItemRef
      };
    };
    var ElOptions = /* @__PURE__ */ defineComponent({
      name: "ElOptions",
      setup(_, { slots }) {
        const select = inject(selectKey);
        let cachedValueList = [];
        return () => {
          var _a2, _b;
          const children = (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
          const valueList = [];
          function filterOptions(children2) {
            if (!isArray$2(children2))
              return;
            children2.forEach((item) => {
              var _a22, _b2, _c, _d;
              const name = (_a22 = (item == null ? void 0 : item.type) || {}) == null ? void 0 : _a22.name;
              if (name === "ElOptionGroup") {
                filterOptions(!isString$1(item.children) && !isArray$2(item.children) && isFunction$1((_b2 = item.children) == null ? void 0 : _b2.default) ? (_c = item.children) == null ? void 0 : _c.default() : item.children);
              } else if (name === "ElOption") {
                valueList.push((_d = item.props) == null ? void 0 : _d.value);
              } else if (isArray$2(item.children)) {
                filterOptions(item.children);
              }
            });
          }
          if (children.length) {
            filterOptions((_b = children[0]) == null ? void 0 : _b.children);
          }
          if (!isEqual(valueList, cachedValueList)) {
            cachedValueList = valueList;
            if (select) {
              select.states.optionValues = valueList;
            }
          }
          return children;
        };
      }
    });
    const SelectProps = buildProps({
      name: String,
      id: String,
      modelValue: {
        type: [Array, String, Number, Boolean, Object],
        default: void 0
      },
      autocomplete: {
        type: String,
        default: "off"
      },
      automaticDropdown: Boolean,
      size: useSizeProp,
      effect: {
        type: definePropType(String),
        default: "light"
      },
      disabled: Boolean,
      clearable: Boolean,
      filterable: Boolean,
      allowCreate: Boolean,
      loading: Boolean,
      popperClass: {
        type: String,
        default: ""
      },
      popperOptions: {
        type: definePropType(Object),
        default: () => ({})
      },
      remote: Boolean,
      loadingText: String,
      noMatchText: String,
      noDataText: String,
      remoteMethod: Function,
      filterMethod: Function,
      multiple: Boolean,
      multipleLimit: {
        type: Number,
        default: 0
      },
      placeholder: {
        type: String
      },
      defaultFirstOption: Boolean,
      reserveKeyword: {
        type: Boolean,
        default: true
      },
      valueKey: {
        type: String,
        default: "value"
      },
      collapseTags: Boolean,
      collapseTagsTooltip: Boolean,
      maxCollapseTags: {
        type: Number,
        default: 1
      },
      teleported: useTooltipContentProps.teleported,
      persistent: {
        type: Boolean,
        default: true
      },
      clearIcon: {
        type: iconPropType,
        default: circle_close_default
      },
      fitInputWidth: Boolean,
      suffixIcon: {
        type: iconPropType,
        default: arrow_down_default
      },
      tagType: { ...tagProps.type, default: "info" },
      validateEvent: {
        type: Boolean,
        default: true
      },
      remoteShowSuffix: Boolean,
      placement: {
        type: definePropType(String),
        values: Ee,
        default: "bottom-start"
      },
      fallbackPlacements: {
        type: definePropType(Array),
        default: ["bottom-start", "top-start", "right", "left"]
      },
      ariaLabel: {
        type: String,
        default: void 0
      },
      ...useEmptyValuesProps
    });
    const COMPONENT_NAME$1 = "ElSelect";
    const _sfc_main$b = /* @__PURE__ */ defineComponent({
      name: COMPONENT_NAME$1,
      componentName: COMPONENT_NAME$1,
      components: {
        ElInput,
        ElSelectMenu,
        ElOption: Option,
        ElOptions,
        ElTag,
        ElScrollbar,
        ElTooltip,
        ElIcon
      },
      directives: { ClickOutside },
      props: SelectProps,
      emits: [
        UPDATE_MODEL_EVENT,
        CHANGE_EVENT,
        "remove-tag",
        "clear",
        "visible-change",
        "focus",
        "blur"
      ],
      setup(props, { emit: emit2 }) {
        const API = useSelect(props, emit2);
        provide(selectKey, reactive({
          props,
          states: API.states,
          optionsArray: API.optionsArray,
          handleOptionSelect: API.handleOptionSelect,
          onOptionCreate: API.onOptionCreate,
          onOptionDestroy: API.onOptionDestroy,
          selectRef: API.selectRef,
          setSelected: API.setSelected
        }));
        return {
          ...API
        };
      }
    });
    const _hoisted_1$6 = ["id", "disabled", "autocomplete", "readonly", "aria-activedescendant", "aria-controls", "aria-expanded", "aria-label"];
    const _hoisted_2$6 = ["textContent"];
    function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_el_tag = resolveComponent("el-tag");
      const _component_el_tooltip = resolveComponent("el-tooltip");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_option = resolveComponent("el-option");
      const _component_el_options = resolveComponent("el-options");
      const _component_el_scrollbar = resolveComponent("el-scrollbar");
      const _component_el_select_menu = resolveComponent("el-select-menu");
      const _directive_click_outside = resolveDirective("click-outside");
      return withDirectives((openBlock(), createElementBlock("div", {
        ref: "selectRef",
        class: normalizeClass([_ctx.nsSelect.b(), _ctx.nsSelect.m(_ctx.selectSize)]),
        onMouseenter: _cache[16] || (_cache[16] = ($event) => _ctx.states.inputHovering = true),
        onMouseleave: _cache[17] || (_cache[17] = ($event) => _ctx.states.inputHovering = false),
        onClick: _cache[18] || (_cache[18] = withModifiers((...args) => _ctx.toggleMenu && _ctx.toggleMenu(...args), ["prevent", "stop"]))
      }, [
        createVNode(_component_el_tooltip, {
          ref: "tooltipRef",
          visible: _ctx.dropdownMenuVisible,
          placement: _ctx.placement,
          teleported: _ctx.teleported,
          "popper-class": [_ctx.nsSelect.e("popper"), _ctx.popperClass],
          "popper-options": _ctx.popperOptions,
          "fallback-placements": _ctx.fallbackPlacements,
          effect: _ctx.effect,
          pure: "",
          trigger: "click",
          transition: `${_ctx.nsSelect.namespace.value}-zoom-in-top`,
          "stop-popper-mouse-event": false,
          "gpu-acceleration": false,
          persistent: _ctx.persistent,
          onBeforeShow: _ctx.handleMenuEnter,
          onHide: _cache[15] || (_cache[15] = ($event) => _ctx.states.isBeforeHide = false)
        }, {
          default: withCtx(() => {
            var _a2;
            return [
              createBaseVNode("div", {
                ref: "wrapperRef",
                class: normalizeClass([
                  _ctx.nsSelect.e("wrapper"),
                  _ctx.nsSelect.is("focused", _ctx.isFocused),
                  _ctx.nsSelect.is("hovering", _ctx.states.inputHovering),
                  _ctx.nsSelect.is("filterable", _ctx.filterable),
                  _ctx.nsSelect.is("disabled", _ctx.selectDisabled)
                ])
              }, [
                _ctx.$slots.prefix ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  ref: "prefixRef",
                  class: normalizeClass(_ctx.nsSelect.e("prefix"))
                }, [
                  renderSlot(_ctx.$slots, "prefix")
                ], 2)) : createCommentVNode("v-if", true),
                createBaseVNode("div", {
                  ref: "selectionRef",
                  class: normalizeClass([
                    _ctx.nsSelect.e("selection"),
                    _ctx.nsSelect.is("near", _ctx.multiple && !_ctx.$slots.prefix && !!_ctx.states.selected.length)
                  ])
                }, [
                  _ctx.multiple ? renderSlot(_ctx.$slots, "tag", { key: 0 }, () => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.showTagList, (item) => {
                      return openBlock(), createElementBlock("div", {
                        key: _ctx.getValueKey(item),
                        class: normalizeClass(_ctx.nsSelect.e("selected-item"))
                      }, [
                        createVNode(_component_el_tag, {
                          closable: !_ctx.selectDisabled && !item.isDisabled,
                          size: _ctx.collapseTagSize,
                          type: _ctx.tagType,
                          "disable-transitions": "",
                          style: normalizeStyle(_ctx.tagStyle),
                          onClose: ($event) => _ctx.deleteTag($event, item)
                        }, {
                          default: withCtx(() => [
                            createBaseVNode("span", {
                              class: normalizeClass(_ctx.nsSelect.e("tags-text"))
                            }, toDisplayString(item.currentLabel), 3)
                          ]),
                          _: 2
                        }, 1032, ["closable", "size", "type", "style", "onClose"])
                      ], 2);
                    }), 128)),
                    _ctx.collapseTags && _ctx.states.selected.length > _ctx.maxCollapseTags ? (openBlock(), createBlock(_component_el_tooltip, {
                      key: 0,
                      ref: "tagTooltipRef",
                      disabled: _ctx.dropdownMenuVisible || !_ctx.collapseTagsTooltip,
                      "fallback-placements": ["bottom", "top", "right", "left"],
                      effect: _ctx.effect,
                      placement: "bottom",
                      teleported: _ctx.teleported
                    }, {
                      default: withCtx(() => [
                        createBaseVNode("div", {
                          ref: "collapseItemRef",
                          class: normalizeClass(_ctx.nsSelect.e("selected-item"))
                        }, [
                          createVNode(_component_el_tag, {
                            closable: false,
                            size: _ctx.collapseTagSize,
                            type: _ctx.tagType,
                            "disable-transitions": "",
                            style: normalizeStyle(_ctx.collapseTagStyle)
                          }, {
                            default: withCtx(() => [
                              createBaseVNode("span", {
                                class: normalizeClass(_ctx.nsSelect.e("tags-text"))
                              }, " + " + toDisplayString(_ctx.states.selected.length - _ctx.maxCollapseTags), 3)
                            ]),
                            _: 1
                          }, 8, ["size", "type", "style"])
                        ], 2)
                      ]),
                      content: withCtx(() => [
                        createBaseVNode("div", {
                          ref: "tagMenuRef",
                          class: normalizeClass(_ctx.nsSelect.e("selection"))
                        }, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.collapseTagList, (item) => {
                            return openBlock(), createElementBlock("div", {
                              key: _ctx.getValueKey(item),
                              class: normalizeClass(_ctx.nsSelect.e("selected-item"))
                            }, [
                              createVNode(_component_el_tag, {
                                class: "in-tooltip",
                                closable: !_ctx.selectDisabled && !item.isDisabled,
                                size: _ctx.collapseTagSize,
                                type: _ctx.tagType,
                                "disable-transitions": "",
                                onClose: ($event) => _ctx.deleteTag($event, item)
                              }, {
                                default: withCtx(() => [
                                  createBaseVNode("span", {
                                    class: normalizeClass(_ctx.nsSelect.e("tags-text"))
                                  }, toDisplayString(item.currentLabel), 3)
                                ]),
                                _: 2
                              }, 1032, ["closable", "size", "type", "onClose"])
                            ], 2);
                          }), 128))
                        ], 2)
                      ]),
                      _: 1
                    }, 8, ["disabled", "effect", "teleported"])) : createCommentVNode("v-if", true)
                  ]) : createCommentVNode("v-if", true),
                  !_ctx.selectDisabled ? (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass([
                      _ctx.nsSelect.e("selected-item"),
                      _ctx.nsSelect.e("input-wrapper"),
                      _ctx.nsSelect.is("hidden", !_ctx.filterable)
                    ])
                  }, [
                    withDirectives(createBaseVNode("input", {
                      id: _ctx.inputId,
                      ref: "inputRef",
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.states.inputValue = $event),
                      type: "text",
                      class: normalizeClass([_ctx.nsSelect.e("input"), _ctx.nsSelect.is(_ctx.selectSize)]),
                      disabled: _ctx.selectDisabled,
                      autocomplete: _ctx.autocomplete,
                      style: normalizeStyle(_ctx.inputStyle),
                      role: "combobox",
                      readonly: !_ctx.filterable,
                      spellcheck: "false",
                      "aria-activedescendant": ((_a2 = _ctx.hoverOption) == null ? void 0 : _a2.id) || "",
                      "aria-controls": _ctx.contentId,
                      "aria-expanded": _ctx.dropdownMenuVisible,
                      "aria-label": _ctx.ariaLabel,
                      "aria-autocomplete": "none",
                      "aria-haspopup": "listbox",
                      onFocus: _cache[1] || (_cache[1] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
                      onBlur: _cache[2] || (_cache[2] = (...args) => _ctx.handleBlur && _ctx.handleBlur(...args)),
                      onKeydown: [
                        _cache[3] || (_cache[3] = withKeys(withModifiers(($event) => _ctx.navigateOptions("next"), ["stop", "prevent"]), ["down"])),
                        _cache[4] || (_cache[4] = withKeys(withModifiers(($event) => _ctx.navigateOptions("prev"), ["stop", "prevent"]), ["up"])),
                        _cache[5] || (_cache[5] = withKeys(withModifiers((...args) => _ctx.handleEsc && _ctx.handleEsc(...args), ["stop", "prevent"]), ["esc"])),
                        _cache[6] || (_cache[6] = withKeys(withModifiers((...args) => _ctx.selectOption && _ctx.selectOption(...args), ["stop", "prevent"]), ["enter"])),
                        _cache[7] || (_cache[7] = withKeys(withModifiers((...args) => _ctx.deletePrevTag && _ctx.deletePrevTag(...args), ["stop"]), ["delete"]))
                      ],
                      onCompositionstart: _cache[8] || (_cache[8] = (...args) => _ctx.handleCompositionStart && _ctx.handleCompositionStart(...args)),
                      onCompositionupdate: _cache[9] || (_cache[9] = (...args) => _ctx.handleCompositionUpdate && _ctx.handleCompositionUpdate(...args)),
                      onCompositionend: _cache[10] || (_cache[10] = (...args) => _ctx.handleCompositionEnd && _ctx.handleCompositionEnd(...args)),
                      onInput: _cache[11] || (_cache[11] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
                      onClick: _cache[12] || (_cache[12] = withModifiers((...args) => _ctx.toggleMenu && _ctx.toggleMenu(...args), ["stop"]))
                    }, null, 46, _hoisted_1$6), [
                      [vModelText, _ctx.states.inputValue]
                    ]),
                    _ctx.filterable ? (openBlock(), createElementBlock("span", {
                      key: 0,
                      ref: "calculatorRef",
                      "aria-hidden": "true",
                      class: normalizeClass(_ctx.nsSelect.e("input-calculator")),
                      textContent: toDisplayString(_ctx.states.inputValue)
                    }, null, 10, _hoisted_2$6)) : createCommentVNode("v-if", true)
                  ], 2)) : createCommentVNode("v-if", true),
                  _ctx.shouldShowPlaceholder ? (openBlock(), createElementBlock("div", {
                    key: 2,
                    class: normalizeClass([
                      _ctx.nsSelect.e("selected-item"),
                      _ctx.nsSelect.e("placeholder"),
                      _ctx.nsSelect.is("transparent", !_ctx.hasModelValue || _ctx.expanded && !_ctx.states.inputValue)
                    ])
                  }, [
                    createBaseVNode("span", null, toDisplayString(_ctx.currentPlaceholder), 1)
                  ], 2)) : createCommentVNode("v-if", true)
                ], 2),
                createBaseVNode("div", {
                  ref: "suffixRef",
                  class: normalizeClass(_ctx.nsSelect.e("suffix"))
                }, [
                  _ctx.iconComponent && !_ctx.showClose ? (openBlock(), createBlock(_component_el_icon, {
                    key: 0,
                    class: normalizeClass([_ctx.nsSelect.e("caret"), _ctx.nsSelect.e("icon"), _ctx.iconReverse])
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(_ctx.iconComponent)))
                    ]),
                    _: 1
                  }, 8, ["class"])) : createCommentVNode("v-if", true),
                  _ctx.showClose && _ctx.clearIcon ? (openBlock(), createBlock(_component_el_icon, {
                    key: 1,
                    class: normalizeClass([_ctx.nsSelect.e("caret"), _ctx.nsSelect.e("icon")]),
                    onClick: _ctx.handleClearClick
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(_ctx.clearIcon)))
                    ]),
                    _: 1
                  }, 8, ["class", "onClick"])) : createCommentVNode("v-if", true),
                  _ctx.validateState && _ctx.validateIcon ? (openBlock(), createBlock(_component_el_icon, {
                    key: 2,
                    class: normalizeClass([_ctx.nsInput.e("icon"), _ctx.nsInput.e("validateIcon")])
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(_ctx.validateIcon)))
                    ]),
                    _: 1
                  }, 8, ["class"])) : createCommentVNode("v-if", true)
                ], 2)
              ], 2)
            ];
          }),
          content: withCtx(() => [
            createVNode(_component_el_select_menu, { ref: "menuRef" }, {
              default: withCtx(() => [
                _ctx.$slots.header ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(_ctx.nsSelect.be("dropdown", "header")),
                  onClick: _cache[13] || (_cache[13] = withModifiers(() => {
                  }, ["stop"]))
                }, [
                  renderSlot(_ctx.$slots, "header")
                ], 2)) : createCommentVNode("v-if", true),
                withDirectives(createVNode(_component_el_scrollbar, {
                  id: _ctx.contentId,
                  ref: "scrollbarRef",
                  tag: "ul",
                  "wrap-class": _ctx.nsSelect.be("dropdown", "wrap"),
                  "view-class": _ctx.nsSelect.be("dropdown", "list"),
                  class: normalizeClass([_ctx.nsSelect.is("empty", _ctx.filteredOptionsCount === 0)]),
                  role: "listbox",
                  "aria-label": _ctx.ariaLabel,
                  "aria-orientation": "vertical"
                }, {
                  default: withCtx(() => [
                    _ctx.showNewOption ? (openBlock(), createBlock(_component_el_option, {
                      key: 0,
                      value: _ctx.states.inputValue,
                      created: true
                    }, null, 8, ["value"])) : createCommentVNode("v-if", true),
                    createVNode(_component_el_options, null, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "default")
                      ]),
                      _: 3
                    })
                  ]),
                  _: 3
                }, 8, ["id", "wrap-class", "view-class", "class", "aria-label"]), [
                  [vShow, _ctx.states.options.size > 0 && !_ctx.loading]
                ]),
                _ctx.$slots.loading && _ctx.loading ? (openBlock(), createElementBlock("div", {
                  key: 1,
                  class: normalizeClass(_ctx.nsSelect.be("dropdown", "loading"))
                }, [
                  renderSlot(_ctx.$slots, "loading")
                ], 2)) : _ctx.loading || _ctx.filteredOptionsCount === 0 ? (openBlock(), createElementBlock("div", {
                  key: 2,
                  class: normalizeClass(_ctx.nsSelect.be("dropdown", "empty"))
                }, [
                  renderSlot(_ctx.$slots, "empty", {}, () => [
                    createBaseVNode("span", null, toDisplayString(_ctx.emptyText), 1)
                  ])
                ], 2)) : createCommentVNode("v-if", true),
                _ctx.$slots.footer ? (openBlock(), createElementBlock("div", {
                  key: 3,
                  class: normalizeClass(_ctx.nsSelect.be("dropdown", "footer")),
                  onClick: _cache[14] || (_cache[14] = withModifiers(() => {
                  }, ["stop"]))
                }, [
                  renderSlot(_ctx.$slots, "footer")
                ], 2)) : createCommentVNode("v-if", true)
              ]),
              _: 3
            }, 512)
          ]),
          _: 3
        }, 8, ["visible", "placement", "teleported", "popper-class", "popper-options", "fallback-placements", "effect", "transition", "persistent", "onBeforeShow"])
      ], 34)), [
        [_directive_click_outside, _ctx.handleClickOutside, _ctx.popperRef]
      ]);
    }
    var Select = /* @__PURE__ */ _export_sfc$1(_sfc_main$b, [["render", _sfc_render$2], ["__file", "select.vue"]]);
    const _sfc_main$a = /* @__PURE__ */ defineComponent({
      name: "ElOptionGroup",
      componentName: "ElOptionGroup",
      props: {
        label: String,
        disabled: Boolean
      },
      setup(props) {
        const ns = useNamespace("select");
        const groupRef = ref(null);
        const instance = getCurrentInstance();
        const children = ref([]);
        provide(selectGroupKey, reactive({
          ...toRefs(props)
        }));
        const visible = computed(() => children.value.some((option) => option.visible === true));
        const flattedChildren = (node) => {
          const children2 = [];
          if (isArray$2(node.children)) {
            node.children.forEach((child) => {
              var _a2, _b;
              if (child.type && child.type.name === "ElOption" && child.component && child.component.proxy) {
                children2.push(child.component.proxy);
              } else if ((_a2 = child.children) == null ? void 0 : _a2.length) {
                children2.push(...flattedChildren(child));
              } else if ((_b = child.component) == null ? void 0 : _b.subTree) {
                children2.push(...flattedChildren(child.component.subTree));
              }
            });
          }
          return children2;
        };
        const updateChildren = () => {
          children.value = flattedChildren(instance.subTree);
        };
        onMounted(() => {
          updateChildren();
        });
        useMutationObserver(groupRef, updateChildren, {
          attributes: true,
          subtree: true,
          childList: true
        });
        return {
          groupRef,
          visible,
          ns
        };
      }
    });
    function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
      return withDirectives((openBlock(), createElementBlock("ul", {
        ref: "groupRef",
        class: normalizeClass(_ctx.ns.be("group", "wrap"))
      }, [
        createBaseVNode("li", {
          class: normalizeClass(_ctx.ns.be("group", "title"))
        }, toDisplayString(_ctx.label), 3),
        createBaseVNode("li", null, [
          createBaseVNode("ul", {
            class: normalizeClass(_ctx.ns.b("group"))
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2)
        ])
      ], 2)), [
        [vShow, _ctx.visible]
      ]);
    }
    var OptionGroup = /* @__PURE__ */ _export_sfc$1(_sfc_main$a, [["render", _sfc_render$1], ["__file", "option-group.vue"]]);
    const ElSelect = withInstall(Select, {
      Option,
      OptionGroup
    });
    const ElOption = withNoopInstall(Option);
    withNoopInstall(OptionGroup);
    const popoverProps = buildProps({
      trigger: useTooltipTriggerProps.trigger,
      placement: dropdownProps.placement,
      disabled: useTooltipTriggerProps.disabled,
      visible: useTooltipContentProps.visible,
      transition: useTooltipContentProps.transition,
      popperOptions: dropdownProps.popperOptions,
      tabindex: dropdownProps.tabindex,
      content: useTooltipContentProps.content,
      popperStyle: useTooltipContentProps.popperStyle,
      popperClass: useTooltipContentProps.popperClass,
      enterable: {
        ...useTooltipContentProps.enterable,
        default: true
      },
      effect: {
        ...useTooltipContentProps.effect,
        default: "light"
      },
      teleported: useTooltipContentProps.teleported,
      title: String,
      width: {
        type: [String, Number],
        default: 150
      },
      offset: {
        type: Number,
        default: void 0
      },
      showAfter: {
        type: Number,
        default: 0
      },
      hideAfter: {
        type: Number,
        default: 200
      },
      autoClose: {
        type: Number,
        default: 0
      },
      showArrow: {
        type: Boolean,
        default: true
      },
      persistent: {
        type: Boolean,
        default: true
      },
      "onUpdate:visible": {
        type: Function
      }
    });
    const popoverEmits = {
      "update:visible": (value) => isBoolean(value),
      "before-enter": () => true,
      "before-leave": () => true,
      "after-enter": () => true,
      "after-leave": () => true
    };
    const updateEventKeyRaw = `onUpdate:visible`;
    const __default__$5 = /* @__PURE__ */ defineComponent({
      name: "ElPopover"
    });
    const _sfc_main$9 = /* @__PURE__ */ defineComponent({
      ...__default__$5,
      props: popoverProps,
      emits: popoverEmits,
      setup(__props, { expose, emit: emit2 }) {
        const props = __props;
        const onUpdateVisible = computed(() => {
          return props[updateEventKeyRaw];
        });
        const ns = useNamespace("popover");
        const tooltipRef = ref();
        const popperRef = computed(() => {
          var _a2;
          return (_a2 = unref(tooltipRef)) == null ? void 0 : _a2.popperRef;
        });
        const style = computed(() => {
          return [
            {
              width: addUnit(props.width)
            },
            props.popperStyle
          ];
        });
        const kls = computed(() => {
          return [ns.b(), props.popperClass, { [ns.m("plain")]: !!props.content }];
        });
        const gpuAcceleration = computed(() => {
          return props.transition === `${ns.namespace.value}-fade-in-linear`;
        });
        const hide = () => {
          var _a2;
          (_a2 = tooltipRef.value) == null ? void 0 : _a2.hide();
        };
        const beforeEnter = () => {
          emit2("before-enter");
        };
        const beforeLeave = () => {
          emit2("before-leave");
        };
        const afterEnter = () => {
          emit2("after-enter");
        };
        const afterLeave = () => {
          emit2("update:visible", false);
          emit2("after-leave");
        };
        expose({
          popperRef,
          hide
        });
        return (_ctx, _cache) => {
          return openBlock(), createBlock(unref(ElTooltip), mergeProps({
            ref_key: "tooltipRef",
            ref: tooltipRef
          }, _ctx.$attrs, {
            trigger: _ctx.trigger,
            placement: _ctx.placement,
            disabled: _ctx.disabled,
            visible: _ctx.visible,
            transition: _ctx.transition,
            "popper-options": _ctx.popperOptions,
            tabindex: _ctx.tabindex,
            content: _ctx.content,
            offset: _ctx.offset,
            "show-after": _ctx.showAfter,
            "hide-after": _ctx.hideAfter,
            "auto-close": _ctx.autoClose,
            "show-arrow": _ctx.showArrow,
            "aria-label": _ctx.title,
            effect: _ctx.effect,
            enterable: _ctx.enterable,
            "popper-class": unref(kls),
            "popper-style": unref(style),
            teleported: _ctx.teleported,
            persistent: _ctx.persistent,
            "gpu-acceleration": unref(gpuAcceleration),
            "onUpdate:visible": unref(onUpdateVisible),
            onBeforeShow: beforeEnter,
            onBeforeHide: beforeLeave,
            onShow: afterEnter,
            onHide: afterLeave
          }), {
            content: withCtx(() => [
              _ctx.title ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(unref(ns).e("title")),
                role: "title"
              }, toDisplayString(_ctx.title), 3)) : createCommentVNode("v-if", true),
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode(toDisplayString(_ctx.content), 1)
              ])
            ]),
            default: withCtx(() => [
              _ctx.$slots.reference ? renderSlot(_ctx.$slots, "reference", { key: 0 }) : createCommentVNode("v-if", true)
            ]),
            _: 3
          }, 16, ["trigger", "placement", "disabled", "visible", "transition", "popper-options", "tabindex", "content", "offset", "show-after", "hide-after", "auto-close", "show-arrow", "aria-label", "effect", "enterable", "popper-class", "popper-style", "teleported", "persistent", "gpu-acceleration", "onUpdate:visible"]);
        };
      }
    });
    var Popover = /* @__PURE__ */ _export_sfc$1(_sfc_main$9, [["__file", "popover.vue"]]);
    const attachEvents = (el, binding) => {
      const popperComponent = binding.arg || binding.value;
      const popover = popperComponent == null ? void 0 : popperComponent.popperRef;
      if (popover) {
        popover.triggerRef = el;
      }
    };
    var PopoverDirective = {
      mounted(el, binding) {
        attachEvents(el, binding);
      },
      updated(el, binding) {
        attachEvents(el, binding);
      }
    };
    const VPopover = "popover";
    const ElPopoverDirective = withInstallDirective(PopoverDirective, VPopover);
    const ElPopover = withInstall(Popover, {
      directive: ElPopoverDirective
    });
    const progressProps = buildProps({
      type: {
        type: String,
        default: "line",
        values: ["line", "circle", "dashboard"]
      },
      percentage: {
        type: Number,
        default: 0,
        validator: (val) => val >= 0 && val <= 100
      },
      status: {
        type: String,
        default: "",
        values: ["", "success", "exception", "warning"]
      },
      indeterminate: {
        type: Boolean,
        default: false
      },
      duration: {
        type: Number,
        default: 3
      },
      strokeWidth: {
        type: Number,
        default: 6
      },
      strokeLinecap: {
        type: definePropType(String),
        default: "round"
      },
      textInside: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 126
      },
      showText: {
        type: Boolean,
        default: true
      },
      color: {
        type: definePropType([
          String,
          Array,
          Function
        ]),
        default: ""
      },
      striped: Boolean,
      stripedFlow: Boolean,
      format: {
        type: definePropType(Function),
        default: (percentage) => `${percentage}%`
      }
    });
    const _hoisted_1$5 = ["aria-valuenow"];
    const _hoisted_2$5 = { viewBox: "0 0 100 100" };
    const _hoisted_3$4 = ["d", "stroke", "stroke-linecap", "stroke-width"];
    const _hoisted_4$3 = ["d", "stroke", "opacity", "stroke-linecap", "stroke-width"];
    const _hoisted_5$2 = { key: 0 };
    const __default__$4 = /* @__PURE__ */ defineComponent({
      name: "ElProgress"
    });
    const _sfc_main$8 = /* @__PURE__ */ defineComponent({
      ...__default__$4,
      props: progressProps,
      setup(__props) {
        const props = __props;
        const STATUS_COLOR_MAP = {
          success: "#13ce66",
          exception: "#ff4949",
          warning: "#e6a23c",
          default: "#20a0ff"
        };
        const ns = useNamespace("progress");
        const barStyle = computed(() => ({
          width: `${props.percentage}%`,
          animationDuration: `${props.duration}s`,
          backgroundColor: getCurrentColor(props.percentage)
        }));
        const relativeStrokeWidth = computed(() => (props.strokeWidth / props.width * 100).toFixed(1));
        const radius = computed(() => {
          if (["circle", "dashboard"].includes(props.type)) {
            return Number.parseInt(`${50 - Number.parseFloat(relativeStrokeWidth.value) / 2}`, 10);
          }
          return 0;
        });
        const trackPath = computed(() => {
          const r = radius.value;
          const isDashboard = props.type === "dashboard";
          return `
          M 50 50
          m 0 ${isDashboard ? "" : "-"}${r}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? "-" : ""}${r * 2}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? "" : "-"}${r * 2}
          `;
        });
        const perimeter = computed(() => 2 * Math.PI * radius.value);
        const rate = computed(() => props.type === "dashboard" ? 0.75 : 1);
        const strokeDashoffset = computed(() => {
          const offset = -1 * perimeter.value * (1 - rate.value) / 2;
          return `${offset}px`;
        });
        const trailPathStyle = computed(() => ({
          strokeDasharray: `${perimeter.value * rate.value}px, ${perimeter.value}px`,
          strokeDashoffset: strokeDashoffset.value
        }));
        const circlePathStyle = computed(() => ({
          strokeDasharray: `${perimeter.value * rate.value * (props.percentage / 100)}px, ${perimeter.value}px`,
          strokeDashoffset: strokeDashoffset.value,
          transition: "stroke-dasharray 0.6s ease 0s, stroke 0.6s ease, opacity ease 0.6s"
        }));
        const stroke = computed(() => {
          let ret;
          if (props.color) {
            ret = getCurrentColor(props.percentage);
          } else {
            ret = STATUS_COLOR_MAP[props.status] || STATUS_COLOR_MAP.default;
          }
          return ret;
        });
        const statusIcon = computed(() => {
          if (props.status === "warning") {
            return warning_filled_default;
          }
          if (props.type === "line") {
            return props.status === "success" ? circle_check_default : circle_close_default;
          } else {
            return props.status === "success" ? check_default : close_default;
          }
        });
        const progressTextSize = computed(() => {
          return props.type === "line" ? 12 + props.strokeWidth * 0.4 : props.width * 0.111111 + 2;
        });
        const content = computed(() => props.format(props.percentage));
        function getColors(color) {
          const span = 100 / color.length;
          const seriesColors = color.map((seriesColor, index) => {
            if (isString$1(seriesColor)) {
              return {
                color: seriesColor,
                percentage: (index + 1) * span
              };
            }
            return seriesColor;
          });
          return seriesColors.sort((a, b) => a.percentage - b.percentage);
        }
        const getCurrentColor = (percentage) => {
          var _a2;
          const { color } = props;
          if (isFunction$1(color)) {
            return color(percentage);
          } else if (isString$1(color)) {
            return color;
          } else {
            const colors = getColors(color);
            for (const color2 of colors) {
              if (color2.percentage > percentage)
                return color2.color;
            }
            return (_a2 = colors[colors.length - 1]) == null ? void 0 : _a2.color;
          }
        };
        return (_ctx, _cache) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass([
              unref(ns).b(),
              unref(ns).m(_ctx.type),
              unref(ns).is(_ctx.status),
              {
                [unref(ns).m("without-text")]: !_ctx.showText,
                [unref(ns).m("text-inside")]: _ctx.textInside
              }
            ]),
            role: "progressbar",
            "aria-valuenow": _ctx.percentage,
            "aria-valuemin": "0",
            "aria-valuemax": "100"
          }, [
            _ctx.type === "line" ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(unref(ns).b("bar"))
            }, [
              createBaseVNode("div", {
                class: normalizeClass(unref(ns).be("bar", "outer")),
                style: normalizeStyle({ height: `${_ctx.strokeWidth}px` })
              }, [
                createBaseVNode("div", {
                  class: normalizeClass([
                    unref(ns).be("bar", "inner"),
                    { [unref(ns).bem("bar", "inner", "indeterminate")]: _ctx.indeterminate },
                    { [unref(ns).bem("bar", "inner", "striped")]: _ctx.striped },
                    { [unref(ns).bem("bar", "inner", "striped-flow")]: _ctx.stripedFlow }
                  ]),
                  style: normalizeStyle(unref(barStyle))
                }, [
                  (_ctx.showText || _ctx.$slots.default) && _ctx.textInside ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: normalizeClass(unref(ns).be("bar", "innerText"))
                  }, [
                    renderSlot(_ctx.$slots, "default", { percentage: _ctx.percentage }, () => [
                      createBaseVNode("span", null, toDisplayString(unref(content)), 1)
                    ])
                  ], 2)) : createCommentVNode("v-if", true)
                ], 6)
              ], 6)
            ], 2)) : (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(unref(ns).b("circle")),
              style: normalizeStyle({ height: `${_ctx.width}px`, width: `${_ctx.width}px` })
            }, [
              (openBlock(), createElementBlock("svg", _hoisted_2$5, [
                createBaseVNode("path", {
                  class: normalizeClass(unref(ns).be("circle", "track")),
                  d: unref(trackPath),
                  stroke: `var(${unref(ns).cssVarName("fill-color-light")}, #e5e9f2)`,
                  "stroke-linecap": _ctx.strokeLinecap,
                  "stroke-width": unref(relativeStrokeWidth),
                  fill: "none",
                  style: normalizeStyle(unref(trailPathStyle))
                }, null, 14, _hoisted_3$4),
                createBaseVNode("path", {
                  class: normalizeClass(unref(ns).be("circle", "path")),
                  d: unref(trackPath),
                  stroke: unref(stroke),
                  fill: "none",
                  opacity: _ctx.percentage ? 1 : 0,
                  "stroke-linecap": _ctx.strokeLinecap,
                  "stroke-width": unref(relativeStrokeWidth),
                  style: normalizeStyle(unref(circlePathStyle))
                }, null, 14, _hoisted_4$3)
              ]))
            ], 6)),
            (_ctx.showText || _ctx.$slots.default) && !_ctx.textInside ? (openBlock(), createElementBlock("div", {
              key: 2,
              class: normalizeClass(unref(ns).e("text")),
              style: normalizeStyle({ fontSize: `${unref(progressTextSize)}px` })
            }, [
              renderSlot(_ctx.$slots, "default", { percentage: _ctx.percentage }, () => [
                !_ctx.status ? (openBlock(), createElementBlock("span", _hoisted_5$2, toDisplayString(unref(content)), 1)) : (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(unref(statusIcon))))
                  ]),
                  _: 1
                }))
              ])
            ], 6)) : createCommentVNode("v-if", true)
          ], 10, _hoisted_1$5);
        };
      }
    });
    var Progress = /* @__PURE__ */ _export_sfc$1(_sfc_main$8, [["__file", "progress.vue"]]);
    const ElProgress = withInstall(Progress);
    const switchProps = buildProps({
      modelValue: {
        type: [Boolean, String, Number],
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        validator: isValidComponentSize
      },
      width: {
        type: [String, Number],
        default: ""
      },
      inlinePrompt: {
        type: Boolean,
        default: false
      },
      inactiveActionIcon: {
        type: iconPropType
      },
      activeActionIcon: {
        type: iconPropType
      },
      activeIcon: {
        type: iconPropType
      },
      inactiveIcon: {
        type: iconPropType
      },
      activeText: {
        type: String,
        default: ""
      },
      inactiveText: {
        type: String,
        default: ""
      },
      activeValue: {
        type: [Boolean, String, Number],
        default: true
      },
      inactiveValue: {
        type: [Boolean, String, Number],
        default: false
      },
      name: {
        type: String,
        default: ""
      },
      validateEvent: {
        type: Boolean,
        default: true
      },
      beforeChange: {
        type: definePropType(Function)
      },
      id: String,
      tabindex: {
        type: [String, Number]
      },
      label: {
        type: String,
        default: void 0
      }
    });
    const switchEmits = {
      [UPDATE_MODEL_EVENT]: (val) => isBoolean(val) || isString$1(val) || isNumber(val),
      [CHANGE_EVENT]: (val) => isBoolean(val) || isString$1(val) || isNumber(val),
      [INPUT_EVENT]: (val) => isBoolean(val) || isString$1(val) || isNumber(val)
    };
    const _hoisted_1$4 = ["onClick"];
    const _hoisted_2$4 = ["id", "aria-checked", "aria-disabled", "aria-label", "name", "true-value", "false-value", "disabled", "tabindex", "onKeydown"];
    const _hoisted_3$3 = ["aria-hidden"];
    const _hoisted_4$2 = ["aria-hidden"];
    const _hoisted_5$1 = ["aria-hidden"];
    const COMPONENT_NAME = "ElSwitch";
    const __default__$3 = /* @__PURE__ */ defineComponent({
      name: COMPONENT_NAME
    });
    const _sfc_main$7 = /* @__PURE__ */ defineComponent({
      ...__default__$3,
      props: switchProps,
      emits: switchEmits,
      setup(__props, { expose, emit: emit2 }) {
        const props = __props;
        const { formItem } = useFormItem();
        const switchSize = useFormSize();
        const ns = useNamespace("switch");
        const { inputId } = useFormItemInputId(props, {
          formItemContext: formItem
        });
        const switchDisabled = useFormDisabled(computed(() => props.loading));
        const isControlled = ref(props.modelValue !== false);
        const input = ref();
        const core = ref();
        const switchKls = computed(() => [
          ns.b(),
          ns.m(switchSize.value),
          ns.is("disabled", switchDisabled.value),
          ns.is("checked", checked.value)
        ]);
        const labelLeftKls = computed(() => [
          ns.e("label"),
          ns.em("label", "left"),
          ns.is("active", !checked.value)
        ]);
        const labelRightKls = computed(() => [
          ns.e("label"),
          ns.em("label", "right"),
          ns.is("active", checked.value)
        ]);
        const coreStyle = computed(() => ({
          width: addUnit(props.width)
        }));
        watch(() => props.modelValue, () => {
          isControlled.value = true;
        });
        const actualValue = computed(() => {
          return isControlled.value ? props.modelValue : false;
        });
        const checked = computed(() => actualValue.value === props.activeValue);
        if (![props.activeValue, props.inactiveValue].includes(actualValue.value)) {
          emit2(UPDATE_MODEL_EVENT, props.inactiveValue);
          emit2(CHANGE_EVENT, props.inactiveValue);
          emit2(INPUT_EVENT, props.inactiveValue);
        }
        watch(checked, (val) => {
          var _a2;
          input.value.checked = val;
          if (props.validateEvent) {
            (_a2 = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _a2.call(formItem, "change").catch((err) => debugWarn());
          }
        });
        const handleChange = () => {
          const val = checked.value ? props.inactiveValue : props.activeValue;
          emit2(UPDATE_MODEL_EVENT, val);
          emit2(CHANGE_EVENT, val);
          emit2(INPUT_EVENT, val);
          nextTick(() => {
            input.value.checked = checked.value;
          });
        };
        const switchValue = () => {
          if (switchDisabled.value)
            return;
          const { beforeChange } = props;
          if (!beforeChange) {
            handleChange();
            return;
          }
          const shouldChange = beforeChange();
          const isPromiseOrBool = [
            isPromise(shouldChange),
            isBoolean(shouldChange)
          ].includes(true);
          if (!isPromiseOrBool) {
            throwError(COMPONENT_NAME, "beforeChange must return type `Promise<boolean>` or `boolean`");
          }
          if (isPromise(shouldChange)) {
            shouldChange.then((result) => {
              if (result) {
                handleChange();
              }
            }).catch((e) => {
            });
          } else if (shouldChange) {
            handleChange();
          }
        };
        const focus = () => {
          var _a2, _b;
          (_b = (_a2 = input.value) == null ? void 0 : _a2.focus) == null ? void 0 : _b.call(_a2);
        };
        onMounted(() => {
          input.value.checked = checked.value;
        });
        expose({
          focus,
          checked
        });
        return (_ctx, _cache) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(unref(switchKls)),
            onClick: withModifiers(switchValue, ["prevent"])
          }, [
            createBaseVNode("input", {
              id: unref(inputId),
              ref_key: "input",
              ref: input,
              class: normalizeClass(unref(ns).e("input")),
              type: "checkbox",
              role: "switch",
              "aria-checked": unref(checked),
              "aria-disabled": unref(switchDisabled),
              "aria-label": _ctx.label,
              name: _ctx.name,
              "true-value": _ctx.activeValue,
              "false-value": _ctx.inactiveValue,
              disabled: unref(switchDisabled),
              tabindex: _ctx.tabindex,
              onChange: handleChange,
              onKeydown: withKeys(switchValue, ["enter"])
            }, null, 42, _hoisted_2$4),
            !_ctx.inlinePrompt && (_ctx.inactiveIcon || _ctx.inactiveText) ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass(unref(labelLeftKls))
            }, [
              _ctx.inactiveIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(_ctx.inactiveIcon)))
                ]),
                _: 1
              })) : createCommentVNode("v-if", true),
              !_ctx.inactiveIcon && _ctx.inactiveText ? (openBlock(), createElementBlock("span", {
                key: 1,
                "aria-hidden": unref(checked)
              }, toDisplayString(_ctx.inactiveText), 9, _hoisted_3$3)) : createCommentVNode("v-if", true)
            ], 2)) : createCommentVNode("v-if", true),
            createBaseVNode("span", {
              ref_key: "core",
              ref: core,
              class: normalizeClass(unref(ns).e("core")),
              style: normalizeStyle(unref(coreStyle))
            }, [
              _ctx.inlinePrompt ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(unref(ns).e("inner"))
              }, [
                _ctx.activeIcon || _ctx.inactiveIcon ? (openBlock(), createBlock(unref(ElIcon), {
                  key: 0,
                  class: normalizeClass(unref(ns).is("icon"))
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(unref(checked) ? _ctx.activeIcon : _ctx.inactiveIcon)))
                  ]),
                  _: 1
                }, 8, ["class"])) : _ctx.activeText || _ctx.inactiveText ? (openBlock(), createElementBlock("span", {
                  key: 1,
                  class: normalizeClass(unref(ns).is("text")),
                  "aria-hidden": !unref(checked)
                }, toDisplayString(unref(checked) ? _ctx.activeText : _ctx.inactiveText), 11, _hoisted_4$2)) : createCommentVNode("v-if", true)
              ], 2)) : createCommentVNode("v-if", true),
              createBaseVNode("div", {
                class: normalizeClass(unref(ns).e("action"))
              }, [
                _ctx.loading ? (openBlock(), createBlock(unref(ElIcon), {
                  key: 0,
                  class: normalizeClass(unref(ns).is("loading"))
                }, {
                  default: withCtx(() => [
                    createVNode(unref(loading_default))
                  ]),
                  _: 1
                }, 8, ["class"])) : unref(checked) ? renderSlot(_ctx.$slots, "active-action", { key: 1 }, () => [
                  _ctx.activeActionIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(_ctx.activeActionIcon)))
                    ]),
                    _: 1
                  })) : createCommentVNode("v-if", true)
                ]) : !unref(checked) ? renderSlot(_ctx.$slots, "inactive-action", { key: 2 }, () => [
                  _ctx.inactiveActionIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(_ctx.inactiveActionIcon)))
                    ]),
                    _: 1
                  })) : createCommentVNode("v-if", true)
                ]) : createCommentVNode("v-if", true)
              ], 2)
            ], 6),
            !_ctx.inlinePrompt && (_ctx.activeIcon || _ctx.activeText) ? (openBlock(), createElementBlock("span", {
              key: 1,
              class: normalizeClass(unref(labelRightKls))
            }, [
              _ctx.activeIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(_ctx.activeIcon)))
                ]),
                _: 1
              })) : createCommentVNode("v-if", true),
              !_ctx.activeIcon && _ctx.activeText ? (openBlock(), createElementBlock("span", {
                key: 1,
                "aria-hidden": !unref(checked)
              }, toDisplayString(_ctx.activeText), 9, _hoisted_5$1)) : createCommentVNode("v-if", true)
            ], 2)) : createCommentVNode("v-if", true)
          ], 10, _hoisted_1$4);
        };
      }
    });
    var Switch = /* @__PURE__ */ _export_sfc$1(_sfc_main$7, [["__file", "switch.vue"]]);
    const ElSwitch = withInstall(Switch);
    const textProps = buildProps({
      type: {
        type: String,
        values: ["primary", "success", "info", "warning", "danger", ""],
        default: ""
      },
      size: {
        type: String,
        values: componentSizes,
        default: ""
      },
      truncated: {
        type: Boolean
      },
      lineClamp: {
        type: [String, Number]
      },
      tag: {
        type: String,
        default: "span"
      }
    });
    const __default__$2 = /* @__PURE__ */ defineComponent({
      name: "ElText"
    });
    const _sfc_main$6 = /* @__PURE__ */ defineComponent({
      ...__default__$2,
      props: textProps,
      setup(__props) {
        const props = __props;
        const textSize = useFormSize();
        const ns = useNamespace("text");
        const textKls = computed(() => [
          ns.b(),
          ns.m(props.type),
          ns.m(textSize.value),
          ns.is("truncated", props.truncated),
          ns.is("line-clamp", !isUndefined(props.lineClamp))
        ]);
        return (_ctx, _cache) => {
          return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
            class: normalizeClass(unref(textKls)),
            style: normalizeStyle({ "-webkit-line-clamp": _ctx.lineClamp })
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["class", "style"]);
        };
      }
    });
    var Text = /* @__PURE__ */ _export_sfc$1(_sfc_main$6, [["__file", "text.vue"]]);
    const ElText = withInstall(Text);
    function createLoadingComponent(options) {
      let afterLeaveTimer;
      const afterLeaveFlag = ref(false);
      const data = reactive({
        ...options,
        originalPosition: "",
        originalOverflow: "",
        visible: false
      });
      function setText(text) {
        data.text = text;
      }
      function destroySelf() {
        const target = data.parent;
        const ns = vm.ns;
        if (!target.vLoadingAddClassList) {
          let loadingNumber = target.getAttribute("loading-number");
          loadingNumber = Number.parseInt(loadingNumber) - 1;
          if (!loadingNumber) {
            removeClass(target, ns.bm("parent", "relative"));
            target.removeAttribute("loading-number");
          } else {
            target.setAttribute("loading-number", loadingNumber.toString());
          }
          removeClass(target, ns.bm("parent", "hidden"));
        }
        removeElLoadingChild();
        loadingInstance.unmount();
      }
      function removeElLoadingChild() {
        var _a2, _b;
        (_b = (_a2 = vm.$el) == null ? void 0 : _a2.parentNode) == null ? void 0 : _b.removeChild(vm.$el);
      }
      function close2() {
        var _a2;
        if (options.beforeClose && !options.beforeClose())
          return;
        afterLeaveFlag.value = true;
        clearTimeout(afterLeaveTimer);
        afterLeaveTimer = window.setTimeout(handleAfterLeave, 400);
        data.visible = false;
        (_a2 = options.closed) == null ? void 0 : _a2.call(options);
      }
      function handleAfterLeave() {
        if (!afterLeaveFlag.value)
          return;
        const target = data.parent;
        afterLeaveFlag.value = false;
        target.vLoadingAddClassList = void 0;
        destroySelf();
      }
      const elLoadingComponent = /* @__PURE__ */ defineComponent({
        name: "ElLoading",
        setup(_, { expose }) {
          const { ns, zIndex: zIndex2 } = useGlobalComponentSettings("loading");
          expose({
            ns,
            zIndex: zIndex2
          });
          return () => {
            const svg = data.spinner || data.svg;
            const spinner = h("svg", {
              class: "circular",
              viewBox: data.svgViewBox ? data.svgViewBox : "0 0 50 50",
              ...svg ? { innerHTML: svg } : {}
            }, [
              h("circle", {
                class: "path",
                cx: "25",
                cy: "25",
                r: "20",
                fill: "none"
              })
            ]);
            const spinnerText = data.text ? h("p", { class: ns.b("text") }, [data.text]) : void 0;
            return h(Transition, {
              name: ns.b("fade"),
              onAfterLeave: handleAfterLeave
            }, {
              default: withCtx(() => [
                withDirectives(createVNode("div", {
                  style: {
                    backgroundColor: data.background || ""
                  },
                  class: [
                    ns.b("mask"),
                    data.customClass,
                    data.fullscreen ? "is-fullscreen" : ""
                  ]
                }, [
                  h("div", {
                    class: ns.b("spinner")
                  }, [spinner, spinnerText])
                ]), [[vShow, data.visible]])
              ])
            });
          };
        }
      });
      const loadingInstance = createApp(elLoadingComponent);
      const vm = loadingInstance.mount(document.createElement("div"));
      return {
        ...toRefs(data),
        setText,
        removeElLoadingChild,
        close: close2,
        handleAfterLeave,
        vm,
        get $el() {
          return vm.$el;
        }
      };
    }
    let fullscreenInstance = void 0;
    const Loading = function(options = {}) {
      if (!isClient)
        return void 0;
      const resolved = resolveOptions(options);
      if (resolved.fullscreen && fullscreenInstance) {
        return fullscreenInstance;
      }
      const instance = createLoadingComponent({
        ...resolved,
        closed: () => {
          var _a2;
          (_a2 = resolved.closed) == null ? void 0 : _a2.call(resolved);
          if (resolved.fullscreen)
            fullscreenInstance = void 0;
        }
      });
      addStyle(resolved, resolved.parent, instance);
      addClassList(resolved, resolved.parent, instance);
      resolved.parent.vLoadingAddClassList = () => addClassList(resolved, resolved.parent, instance);
      let loadingNumber = resolved.parent.getAttribute("loading-number");
      if (!loadingNumber) {
        loadingNumber = "1";
      } else {
        loadingNumber = `${Number.parseInt(loadingNumber) + 1}`;
      }
      resolved.parent.setAttribute("loading-number", loadingNumber);
      resolved.parent.appendChild(instance.$el);
      nextTick(() => instance.visible.value = resolved.visible);
      if (resolved.fullscreen) {
        fullscreenInstance = instance;
      }
      return instance;
    };
    const resolveOptions = (options) => {
      var _a2, _b, _c, _d;
      let target;
      if (isString$1(options.target)) {
        target = (_a2 = document.querySelector(options.target)) != null ? _a2 : document.body;
      } else {
        target = options.target || document.body;
      }
      return {
        parent: target === document.body || options.body ? document.body : target,
        background: options.background || "",
        svg: options.svg || "",
        svgViewBox: options.svgViewBox || "",
        spinner: options.spinner || false,
        text: options.text || "",
        fullscreen: target === document.body && ((_b = options.fullscreen) != null ? _b : true),
        lock: (_c = options.lock) != null ? _c : false,
        customClass: options.customClass || "",
        visible: (_d = options.visible) != null ? _d : true,
        target
      };
    };
    const addStyle = async (options, parent, instance) => {
      const { nextZIndex } = instance.vm.zIndex || instance.vm._.exposed.zIndex;
      const maskStyle = {};
      if (options.fullscreen) {
        instance.originalPosition.value = getStyle(document.body, "position");
        instance.originalOverflow.value = getStyle(document.body, "overflow");
        maskStyle.zIndex = nextZIndex();
      } else if (options.parent === document.body) {
        instance.originalPosition.value = getStyle(document.body, "position");
        await nextTick();
        for (const property2 of ["top", "left"]) {
          const scroll = property2 === "top" ? "scrollTop" : "scrollLeft";
          maskStyle[property2] = `${options.target.getBoundingClientRect()[property2] + document.body[scroll] + document.documentElement[scroll] - Number.parseInt(getStyle(document.body, `margin-${property2}`), 10)}px`;
        }
        for (const property2 of ["height", "width"]) {
          maskStyle[property2] = `${options.target.getBoundingClientRect()[property2]}px`;
        }
      } else {
        instance.originalPosition.value = getStyle(parent, "position");
      }
      for (const [key2, value] of Object.entries(maskStyle)) {
        instance.$el.style[key2] = value;
      }
    };
    const addClassList = (options, parent, instance) => {
      const ns = instance.vm.ns || instance.vm._.exposed.ns;
      if (!["absolute", "fixed", "sticky"].includes(instance.originalPosition.value)) {
        addClass(parent, ns.bm("parent", "relative"));
      } else {
        removeClass(parent, ns.bm("parent", "relative"));
      }
      if (options.fullscreen && options.lock) {
        addClass(parent, ns.bm("parent", "hidden"));
      } else {
        removeClass(parent, ns.bm("parent", "hidden"));
      }
    };
    const INSTANCE_KEY = Symbol("ElLoading");
    const createInstance = (el, binding) => {
      var _a2, _b, _c, _d;
      const vm = binding.instance;
      const getBindingProp = (key2) => isObject$1(binding.value) ? binding.value[key2] : void 0;
      const resolveExpression = (key2) => {
        const data = isString$1(key2) && (vm == null ? void 0 : vm[key2]) || key2;
        if (data)
          return ref(data);
        else
          return data;
      };
      const getProp2 = (name) => resolveExpression(getBindingProp(name) || el.getAttribute(`element-loading-${hyphenate(name)}`));
      const fullscreen = (_a2 = getBindingProp("fullscreen")) != null ? _a2 : binding.modifiers.fullscreen;
      const options = {
        text: getProp2("text"),
        svg: getProp2("svg"),
        svgViewBox: getProp2("svgViewBox"),
        spinner: getProp2("spinner"),
        background: getProp2("background"),
        customClass: getProp2("customClass"),
        fullscreen,
        target: (_b = getBindingProp("target")) != null ? _b : fullscreen ? void 0 : el,
        body: (_c = getBindingProp("body")) != null ? _c : binding.modifiers.body,
        lock: (_d = getBindingProp("lock")) != null ? _d : binding.modifiers.lock
      };
      el[INSTANCE_KEY] = {
        options,
        instance: Loading(options)
      };
    };
    const updateOptions = (newOptions, originalOptions) => {
      for (const key2 of Object.keys(originalOptions)) {
        if (isRef(originalOptions[key2]))
          originalOptions[key2].value = newOptions[key2];
      }
    };
    const vLoading = {
      mounted(el, binding) {
        if (binding.value) {
          createInstance(el, binding);
        }
      },
      updated(el, binding) {
        const instance = el[INSTANCE_KEY];
        if (binding.oldValue !== binding.value) {
          if (binding.value && !binding.oldValue) {
            createInstance(el, binding);
          } else if (binding.value && binding.oldValue) {
            if (isObject$1(binding.value))
              updateOptions(binding.value, instance.options);
          } else {
            instance == null ? void 0 : instance.instance.close();
          }
        }
      },
      unmounted(el) {
        var _a2;
        (_a2 = el[INSTANCE_KEY]) == null ? void 0 : _a2.instance.close();
        el[INSTANCE_KEY] = null;
      }
    };
    const messageTypes = ["success", "info", "warning", "error"];
    const messageDefaults = mutable({
      customClass: "",
      center: false,
      dangerouslyUseHTMLString: false,
      duration: 3e3,
      icon: void 0,
      id: "",
      message: "",
      onClose: void 0,
      showClose: false,
      type: "info",
      plain: false,
      offset: 16,
      zIndex: 0,
      grouping: false,
      repeatNum: 1,
      appendTo: isClient ? document.body : void 0
    });
    const messageProps = buildProps({
      customClass: {
        type: String,
        default: messageDefaults.customClass
      },
      center: {
        type: Boolean,
        default: messageDefaults.center
      },
      dangerouslyUseHTMLString: {
        type: Boolean,
        default: messageDefaults.dangerouslyUseHTMLString
      },
      duration: {
        type: Number,
        default: messageDefaults.duration
      },
      icon: {
        type: iconPropType,
        default: messageDefaults.icon
      },
      id: {
        type: String,
        default: messageDefaults.id
      },
      message: {
        type: definePropType([
          String,
          Object,
          Function
        ]),
        default: messageDefaults.message
      },
      onClose: {
        type: definePropType(Function),
        default: messageDefaults.onClose
      },
      showClose: {
        type: Boolean,
        default: messageDefaults.showClose
      },
      type: {
        type: String,
        values: messageTypes,
        default: messageDefaults.type
      },
      plain: {
        type: Boolean,
        default: messageDefaults.plain
      },
      offset: {
        type: Number,
        default: messageDefaults.offset
      },
      zIndex: {
        type: Number,
        default: messageDefaults.zIndex
      },
      grouping: {
        type: Boolean,
        default: messageDefaults.grouping
      },
      repeatNum: {
        type: Number,
        default: messageDefaults.repeatNum
      }
    });
    const messageEmits = {
      destroy: () => true
    };
    const instances = shallowReactive([]);
    const getInstance = (id) => {
      const idx = instances.findIndex((instance) => instance.id === id);
      const current = instances[idx];
      let prev;
      if (idx > 0) {
        prev = instances[idx - 1];
      }
      return { current, prev };
    };
    const getLastOffset = (id) => {
      const { prev } = getInstance(id);
      if (!prev)
        return 0;
      return prev.vm.exposed.bottom.value;
    };
    const getOffsetOrSpace = (id, offset) => {
      const idx = instances.findIndex((instance) => instance.id === id);
      return idx > 0 ? 16 : offset;
    };
    const _hoisted_1$3 = ["id"];
    const _hoisted_2$3 = ["innerHTML"];
    const __default__$1 = /* @__PURE__ */ defineComponent({
      name: "ElMessage"
    });
    const _sfc_main$5 = /* @__PURE__ */ defineComponent({
      ...__default__$1,
      props: messageProps,
      emits: messageEmits,
      setup(__props, { expose }) {
        const props = __props;
        const { Close } = TypeComponents;
        const { ns, zIndex: zIndex2 } = useGlobalComponentSettings("message");
        const { currentZIndex, nextZIndex } = zIndex2;
        const messageRef = ref();
        const visible = ref(false);
        const height = ref(0);
        let stopTimer = void 0;
        const badgeType = computed(() => props.type ? props.type === "error" ? "danger" : props.type : "info");
        const typeClass = computed(() => {
          const type2 = props.type;
          return { [ns.bm("icon", type2)]: type2 && TypeComponentsMap[type2] };
        });
        const iconComponent = computed(() => props.icon || TypeComponentsMap[props.type] || "");
        const lastOffset = computed(() => getLastOffset(props.id));
        const offset = computed(() => getOffsetOrSpace(props.id, props.offset) + lastOffset.value);
        const bottom = computed(() => height.value + offset.value);
        const customStyle = computed(() => ({
          top: `${offset.value}px`,
          zIndex: currentZIndex.value
        }));
        function startTimer() {
          if (props.duration === 0)
            return;
          ({ stop: stopTimer } = useTimeoutFn(() => {
            close2();
          }, props.duration));
        }
        function clearTimer() {
          stopTimer == null ? void 0 : stopTimer();
        }
        function close2() {
          visible.value = false;
        }
        function keydown({ code }) {
          if (code === EVENT_CODE.esc) {
            close2();
          }
        }
        onMounted(() => {
          startTimer();
          nextZIndex();
          visible.value = true;
        });
        watch(() => props.repeatNum, () => {
          clearTimer();
          startTimer();
        });
        useEventListener(document, "keydown", keydown);
        useResizeObserver(messageRef, () => {
          height.value = messageRef.value.getBoundingClientRect().height;
        });
        expose({
          visible,
          bottom,
          close: close2
        });
        return (_ctx, _cache) => {
          return openBlock(), createBlock(Transition, {
            name: unref(ns).b("fade"),
            onBeforeLeave: _ctx.onClose,
            onAfterLeave: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("destroy")),
            persisted: ""
          }, {
            default: withCtx(() => [
              withDirectives(createBaseVNode("div", {
                id: _ctx.id,
                ref_key: "messageRef",
                ref: messageRef,
                class: normalizeClass([
                  unref(ns).b(),
                  { [unref(ns).m(_ctx.type)]: _ctx.type },
                  unref(ns).is("center", _ctx.center),
                  unref(ns).is("closable", _ctx.showClose),
                  unref(ns).is("plain", _ctx.plain),
                  _ctx.customClass
                ]),
                style: normalizeStyle(unref(customStyle)),
                role: "alert",
                onMouseenter: clearTimer,
                onMouseleave: startTimer
              }, [
                _ctx.repeatNum > 1 ? (openBlock(), createBlock(unref(ElBadge), {
                  key: 0,
                  value: _ctx.repeatNum,
                  type: unref(badgeType),
                  class: normalizeClass(unref(ns).e("badge"))
                }, null, 8, ["value", "type", "class"])) : createCommentVNode("v-if", true),
                unref(iconComponent) ? (openBlock(), createBlock(unref(ElIcon), {
                  key: 1,
                  class: normalizeClass([unref(ns).e("icon"), unref(typeClass)])
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(unref(iconComponent))))
                  ]),
                  _: 1
                }, 8, ["class"])) : createCommentVNode("v-if", true),
                renderSlot(_ctx.$slots, "default", {}, () => [
                  !_ctx.dangerouslyUseHTMLString ? (openBlock(), createElementBlock("p", {
                    key: 0,
                    class: normalizeClass(unref(ns).e("content"))
                  }, toDisplayString(_ctx.message), 3)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createCommentVNode(" Caution here, message could've been compromised, never use user's input as message "),
                    createBaseVNode("p", {
                      class: normalizeClass(unref(ns).e("content")),
                      innerHTML: _ctx.message
                    }, null, 10, _hoisted_2$3)
                  ], 2112))
                ]),
                _ctx.showClose ? (openBlock(), createBlock(unref(ElIcon), {
                  key: 2,
                  class: normalizeClass(unref(ns).e("closeBtn")),
                  onClick: withModifiers(close2, ["stop"])
                }, {
                  default: withCtx(() => [
                    createVNode(unref(Close))
                  ]),
                  _: 1
                }, 8, ["class", "onClick"])) : createCommentVNode("v-if", true)
              ], 46, _hoisted_1$3), [
                [vShow, visible.value]
              ])
            ]),
            _: 3
          }, 8, ["name", "onBeforeLeave"]);
        };
      }
    });
    var MessageConstructor = /* @__PURE__ */ _export_sfc$1(_sfc_main$5, [["__file", "message.vue"]]);
    let seed$1 = 1;
    const normalizeOptions = (params) => {
      const options = !params || isString$1(params) || isVNode(params) || isFunction$1(params) ? { message: params } : params;
      const normalized = {
        ...messageDefaults,
        ...options
      };
      if (!normalized.appendTo) {
        normalized.appendTo = document.body;
      } else if (isString$1(normalized.appendTo)) {
        let appendTo = document.querySelector(normalized.appendTo);
        if (!isElement(appendTo)) {
          appendTo = document.body;
        }
        normalized.appendTo = appendTo;
      }
      return normalized;
    };
    const closeMessage = (instance) => {
      const idx = instances.indexOf(instance);
      if (idx === -1)
        return;
      instances.splice(idx, 1);
      const { handler } = instance;
      handler.close();
    };
    const createMessage = ({ appendTo, ...options }, context) => {
      const id = `message_${seed$1++}`;
      const userOnClose = options.onClose;
      const container = document.createElement("div");
      const props = {
        ...options,
        id,
        onClose: () => {
          userOnClose == null ? void 0 : userOnClose();
          closeMessage(instance);
        },
        onDestroy: () => {
          render(null, container);
        }
      };
      const vnode = createVNode(MessageConstructor, props, isFunction$1(props.message) || isVNode(props.message) ? {
        default: isFunction$1(props.message) ? props.message : () => props.message
      } : null);
      vnode.appContext = context || message._context;
      render(vnode, container);
      appendTo.appendChild(container.firstElementChild);
      const vm = vnode.component;
      const handler = {
        close: () => {
          vm.exposed.visible.value = false;
        }
      };
      const instance = {
        id,
        vnode,
        vm,
        handler,
        props: vnode.component.props
      };
      return instance;
    };
    const message = (options = {}, context) => {
      if (!isClient)
        return { close: () => void 0 };
      if (isNumber(messageConfig.max) && instances.length >= messageConfig.max) {
        return { close: () => void 0 };
      }
      const normalized = normalizeOptions(options);
      if (normalized.grouping && instances.length) {
        const instance2 = instances.find(({ vnode: vm }) => {
          var _a2;
          return ((_a2 = vm.props) == null ? void 0 : _a2.message) === normalized.message;
        });
        if (instance2) {
          instance2.props.repeatNum += 1;
          instance2.props.type = normalized.type;
          return instance2.handler;
        }
      }
      const instance = createMessage(normalized, context);
      instances.push(instance);
      return instance.handler;
    };
    messageTypes.forEach((type2) => {
      message[type2] = (options = {}, appContext) => {
        const normalized = normalizeOptions(options);
        return message({ ...normalized, type: type2 }, appContext);
      };
    });
    function closeAll$1(type2) {
      for (const instance of instances) {
        if (!type2 || type2 === instance.props.type) {
          instance.handler.close();
        }
      }
    }
    message.closeAll = closeAll$1;
    message._context = null;
    const ElMessage = withInstallFunction(message, "$message");
    const _sfc_main$4 = /* @__PURE__ */ defineComponent({
      name: "ElMessageBox",
      directives: {
        TrapFocus
      },
      components: {
        ElButton,
        ElFocusTrap,
        ElInput,
        ElOverlay,
        ElIcon,
        ...TypeComponents
      },
      inheritAttrs: false,
      props: {
        buttonSize: {
          type: String,
          validator: isValidComponentSize
        },
        modal: {
          type: Boolean,
          default: true
        },
        lockScroll: {
          type: Boolean,
          default: true
        },
        showClose: {
          type: Boolean,
          default: true
        },
        closeOnClickModal: {
          type: Boolean,
          default: true
        },
        closeOnPressEscape: {
          type: Boolean,
          default: true
        },
        closeOnHashChange: {
          type: Boolean,
          default: true
        },
        center: Boolean,
        draggable: Boolean,
        overflow: Boolean,
        roundButton: {
          default: false,
          type: Boolean
        },
        container: {
          type: String,
          default: "body"
        },
        boxType: {
          type: String,
          default: ""
        }
      },
      emits: ["vanish", "action"],
      setup(props, { emit: emit2 }) {
        const {
          locale,
          zIndex: zIndex2,
          ns,
          size: btnSize
        } = useGlobalComponentSettings("message-box", computed(() => props.buttonSize));
        const { t } = locale;
        const { nextZIndex } = zIndex2;
        const visible = ref(false);
        const state = reactive({
          autofocus: true,
          beforeClose: null,
          callback: null,
          cancelButtonText: "",
          cancelButtonClass: "",
          confirmButtonText: "",
          confirmButtonClass: "",
          customClass: "",
          customStyle: {},
          dangerouslyUseHTMLString: false,
          distinguishCancelAndClose: false,
          icon: "",
          inputPattern: null,
          inputPlaceholder: "",
          inputType: "text",
          inputValue: null,
          inputValidator: null,
          inputErrorMessage: "",
          message: null,
          modalFade: true,
          modalClass: "",
          showCancelButton: false,
          showConfirmButton: true,
          type: "",
          title: void 0,
          showInput: false,
          action: "",
          confirmButtonLoading: false,
          cancelButtonLoading: false,
          confirmButtonDisabled: false,
          editorErrorMessage: "",
          validateError: false,
          zIndex: nextZIndex()
        });
        const typeClass = computed(() => {
          const type2 = state.type;
          return { [ns.bm("icon", type2)]: type2 && TypeComponentsMap[type2] };
        });
        const contentId = useId();
        const inputId = useId();
        const iconComponent = computed(() => state.icon || TypeComponentsMap[state.type] || "");
        const hasMessage = computed(() => !!state.message);
        const rootRef = ref();
        const headerRef = ref();
        const focusStartRef = ref();
        const inputRef = ref();
        const confirmRef = ref();
        const confirmButtonClasses = computed(() => state.confirmButtonClass);
        watch(() => state.inputValue, async (val) => {
          await nextTick();
          if (props.boxType === "prompt" && val !== null) {
            validate();
          }
        }, { immediate: true });
        watch(() => visible.value, (val) => {
          var _a2, _b;
          if (val) {
            if (props.boxType !== "prompt") {
              if (state.autofocus) {
                focusStartRef.value = (_b = (_a2 = confirmRef.value) == null ? void 0 : _a2.$el) != null ? _b : rootRef.value;
              } else {
                focusStartRef.value = rootRef.value;
              }
            }
            state.zIndex = nextZIndex();
          }
          if (props.boxType !== "prompt")
            return;
          if (val) {
            nextTick().then(() => {
              var _a22;
              if (inputRef.value && inputRef.value.$el) {
                if (state.autofocus) {
                  focusStartRef.value = (_a22 = getInputElement()) != null ? _a22 : rootRef.value;
                } else {
                  focusStartRef.value = rootRef.value;
                }
              }
            });
          } else {
            state.editorErrorMessage = "";
            state.validateError = false;
          }
        });
        const draggable = computed(() => props.draggable);
        const overflow = computed(() => props.overflow);
        useDraggable(rootRef, headerRef, draggable, overflow);
        onMounted(async () => {
          await nextTick();
          if (props.closeOnHashChange) {
            window.addEventListener("hashchange", doClose);
          }
        });
        onBeforeUnmount(() => {
          if (props.closeOnHashChange) {
            window.removeEventListener("hashchange", doClose);
          }
        });
        function doClose() {
          if (!visible.value)
            return;
          visible.value = false;
          nextTick(() => {
            if (state.action)
              emit2("action", state.action);
          });
        }
        const handleWrapperClick = () => {
          if (props.closeOnClickModal) {
            handleAction(state.distinguishCancelAndClose ? "close" : "cancel");
          }
        };
        const overlayEvent = useSameTarget(handleWrapperClick);
        const handleInputEnter = (e) => {
          if (state.inputType !== "textarea") {
            e.preventDefault();
            return handleAction("confirm");
          }
        };
        const handleAction = (action) => {
          var _a2;
          if (props.boxType === "prompt" && action === "confirm" && !validate()) {
            return;
          }
          state.action = action;
          if (state.beforeClose) {
            (_a2 = state.beforeClose) == null ? void 0 : _a2.call(state, action, state, doClose);
          } else {
            doClose();
          }
        };
        const validate = () => {
          if (props.boxType === "prompt") {
            const inputPattern = state.inputPattern;
            if (inputPattern && !inputPattern.test(state.inputValue || "")) {
              state.editorErrorMessage = state.inputErrorMessage || t("el.messagebox.error");
              state.validateError = true;
              return false;
            }
            const inputValidator = state.inputValidator;
            if (typeof inputValidator === "function") {
              const validateResult = inputValidator(state.inputValue);
              if (validateResult === false) {
                state.editorErrorMessage = state.inputErrorMessage || t("el.messagebox.error");
                state.validateError = true;
                return false;
              }
              if (typeof validateResult === "string") {
                state.editorErrorMessage = validateResult;
                state.validateError = true;
                return false;
              }
            }
          }
          state.editorErrorMessage = "";
          state.validateError = false;
          return true;
        };
        const getInputElement = () => {
          const inputRefs = inputRef.value.$refs;
          return inputRefs.input || inputRefs.textarea;
        };
        const handleClose = () => {
          handleAction("close");
        };
        const onCloseRequested = () => {
          if (props.closeOnPressEscape) {
            handleClose();
          }
        };
        if (props.lockScroll) {
          useLockscreen(visible);
        }
        return {
          ...toRefs(state),
          ns,
          overlayEvent,
          visible,
          hasMessage,
          typeClass,
          contentId,
          inputId,
          btnSize,
          iconComponent,
          confirmButtonClasses,
          rootRef,
          focusStartRef,
          headerRef,
          inputRef,
          confirmRef,
          doClose,
          handleClose,
          onCloseRequested,
          handleWrapperClick,
          handleInputEnter,
          handleAction,
          t
        };
      }
    });
    const _hoisted_1$2 = ["aria-label", "aria-describedby"];
    const _hoisted_2$2 = ["aria-label"];
    const _hoisted_3$2 = ["id"];
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_el_icon = resolveComponent("el-icon");
      const _component_close = resolveComponent("close");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_focus_trap = resolveComponent("el-focus-trap");
      const _component_el_overlay = resolveComponent("el-overlay");
      return openBlock(), createBlock(Transition, {
        name: "fade-in-linear",
        onAfterLeave: _cache[11] || (_cache[11] = ($event) => _ctx.$emit("vanish")),
        persisted: ""
      }, {
        default: withCtx(() => [
          withDirectives(createVNode(_component_el_overlay, {
            "z-index": _ctx.zIndex,
            "overlay-class": [_ctx.ns.is("message-box"), _ctx.modalClass],
            mask: _ctx.modal
          }, {
            default: withCtx(() => [
              createBaseVNode("div", {
                role: "dialog",
                "aria-label": _ctx.title,
                "aria-modal": "true",
                "aria-describedby": !_ctx.showInput ? _ctx.contentId : void 0,
                class: normalizeClass(`${_ctx.ns.namespace.value}-overlay-message-box`),
                onClick: _cache[8] || (_cache[8] = (...args) => _ctx.overlayEvent.onClick && _ctx.overlayEvent.onClick(...args)),
                onMousedown: _cache[9] || (_cache[9] = (...args) => _ctx.overlayEvent.onMousedown && _ctx.overlayEvent.onMousedown(...args)),
                onMouseup: _cache[10] || (_cache[10] = (...args) => _ctx.overlayEvent.onMouseup && _ctx.overlayEvent.onMouseup(...args))
              }, [
                createVNode(_component_el_focus_trap, {
                  loop: "",
                  trapped: _ctx.visible,
                  "focus-trap-el": _ctx.rootRef,
                  "focus-start-el": _ctx.focusStartRef,
                  onReleaseRequested: _ctx.onCloseRequested
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", {
                      ref: "rootRef",
                      class: normalizeClass([
                        _ctx.ns.b(),
                        _ctx.customClass,
                        _ctx.ns.is("draggable", _ctx.draggable),
                        { [_ctx.ns.m("center")]: _ctx.center }
                      ]),
                      style: normalizeStyle(_ctx.customStyle),
                      tabindex: "-1",
                      onClick: _cache[7] || (_cache[7] = withModifiers(() => {
                      }, ["stop"]))
                    }, [
                      _ctx.title !== null && _ctx.title !== void 0 ? (openBlock(), createElementBlock("div", {
                        key: 0,
                        ref: "headerRef",
                        class: normalizeClass([_ctx.ns.e("header"), { "show-close": _ctx.showClose }])
                      }, [
                        createBaseVNode("div", {
                          class: normalizeClass(_ctx.ns.e("title"))
                        }, [
                          _ctx.iconComponent && _ctx.center ? (openBlock(), createBlock(_component_el_icon, {
                            key: 0,
                            class: normalizeClass([_ctx.ns.e("status"), _ctx.typeClass])
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(_ctx.iconComponent)))
                            ]),
                            _: 1
                          }, 8, ["class"])) : createCommentVNode("v-if", true),
                          createBaseVNode("span", null, toDisplayString(_ctx.title), 1)
                        ], 2),
                        _ctx.showClose ? (openBlock(), createElementBlock("button", {
                          key: 0,
                          type: "button",
                          class: normalizeClass(_ctx.ns.e("headerbtn")),
                          "aria-label": _ctx.t("el.messagebox.close"),
                          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.handleAction(_ctx.distinguishCancelAndClose ? "close" : "cancel")),
                          onKeydown: _cache[1] || (_cache[1] = withKeys(withModifiers(($event) => _ctx.handleAction(_ctx.distinguishCancelAndClose ? "close" : "cancel"), ["prevent"]), ["enter"]))
                        }, [
                          createVNode(_component_el_icon, {
                            class: normalizeClass(_ctx.ns.e("close"))
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_close)
                            ]),
                            _: 1
                          }, 8, ["class"])
                        ], 42, _hoisted_2$2)) : createCommentVNode("v-if", true)
                      ], 2)) : createCommentVNode("v-if", true),
                      createBaseVNode("div", {
                        id: _ctx.contentId,
                        class: normalizeClass(_ctx.ns.e("content"))
                      }, [
                        createBaseVNode("div", {
                          class: normalizeClass(_ctx.ns.e("container"))
                        }, [
                          _ctx.iconComponent && !_ctx.center && _ctx.hasMessage ? (openBlock(), createBlock(_component_el_icon, {
                            key: 0,
                            class: normalizeClass([_ctx.ns.e("status"), _ctx.typeClass])
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(_ctx.iconComponent)))
                            ]),
                            _: 1
                          }, 8, ["class"])) : createCommentVNode("v-if", true),
                          _ctx.hasMessage ? (openBlock(), createElementBlock("div", {
                            key: 1,
                            class: normalizeClass(_ctx.ns.e("message"))
                          }, [
                            renderSlot(_ctx.$slots, "default", {}, () => [
                              !_ctx.dangerouslyUseHTMLString ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.showInput ? "label" : "p"), {
                                key: 0,
                                for: _ctx.showInput ? _ctx.inputId : void 0
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(!_ctx.dangerouslyUseHTMLString ? _ctx.message : ""), 1)
                                ]),
                                _: 1
                              }, 8, ["for"])) : (openBlock(), createBlock(resolveDynamicComponent(_ctx.showInput ? "label" : "p"), {
                                key: 1,
                                for: _ctx.showInput ? _ctx.inputId : void 0,
                                innerHTML: _ctx.message
                              }, null, 8, ["for", "innerHTML"]))
                            ])
                          ], 2)) : createCommentVNode("v-if", true)
                        ], 2),
                        withDirectives(createBaseVNode("div", {
                          class: normalizeClass(_ctx.ns.e("input"))
                        }, [
                          createVNode(_component_el_input, {
                            id: _ctx.inputId,
                            ref: "inputRef",
                            modelValue: _ctx.inputValue,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.inputValue = $event),
                            type: _ctx.inputType,
                            placeholder: _ctx.inputPlaceholder,
                            "aria-invalid": _ctx.validateError,
                            class: normalizeClass({ invalid: _ctx.validateError }),
                            onKeydown: withKeys(_ctx.handleInputEnter, ["enter"])
                          }, null, 8, ["id", "modelValue", "type", "placeholder", "aria-invalid", "class", "onKeydown"]),
                          createBaseVNode("div", {
                            class: normalizeClass(_ctx.ns.e("errormsg")),
                            style: normalizeStyle({
                              visibility: !!_ctx.editorErrorMessage ? "visible" : "hidden"
                            })
                          }, toDisplayString(_ctx.editorErrorMessage), 7)
                        ], 2), [
                          [vShow, _ctx.showInput]
                        ])
                      ], 10, _hoisted_3$2),
                      createBaseVNode("div", {
                        class: normalizeClass(_ctx.ns.e("btns"))
                      }, [
                        _ctx.showCancelButton ? (openBlock(), createBlock(_component_el_button, {
                          key: 0,
                          loading: _ctx.cancelButtonLoading,
                          class: normalizeClass([_ctx.cancelButtonClass]),
                          round: _ctx.roundButton,
                          size: _ctx.btnSize,
                          onClick: _cache[3] || (_cache[3] = ($event) => _ctx.handleAction("cancel")),
                          onKeydown: _cache[4] || (_cache[4] = withKeys(withModifiers(($event) => _ctx.handleAction("cancel"), ["prevent"]), ["enter"]))
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.cancelButtonText || _ctx.t("el.messagebox.cancel")), 1)
                          ]),
                          _: 1
                        }, 8, ["loading", "class", "round", "size"])) : createCommentVNode("v-if", true),
                        withDirectives(createVNode(_component_el_button, {
                          ref: "confirmRef",
                          type: "primary",
                          loading: _ctx.confirmButtonLoading,
                          class: normalizeClass([_ctx.confirmButtonClasses]),
                          round: _ctx.roundButton,
                          disabled: _ctx.confirmButtonDisabled,
                          size: _ctx.btnSize,
                          onClick: _cache[5] || (_cache[5] = ($event) => _ctx.handleAction("confirm")),
                          onKeydown: _cache[6] || (_cache[6] = withKeys(withModifiers(($event) => _ctx.handleAction("confirm"), ["prevent"]), ["enter"]))
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.confirmButtonText || _ctx.t("el.messagebox.confirm")), 1)
                          ]),
                          _: 1
                        }, 8, ["loading", "class", "round", "disabled", "size"]), [
                          [vShow, _ctx.showConfirmButton]
                        ])
                      ], 2)
                    ], 6)
                  ]),
                  _: 3
                }, 8, ["trapped", "focus-trap-el", "focus-start-el", "onReleaseRequested"])
              ], 42, _hoisted_1$2)
            ]),
            _: 3
          }, 8, ["z-index", "overlay-class", "mask"]), [
            [vShow, _ctx.visible]
          ])
        ]),
        _: 3
      });
    }
    var MessageBoxConstructor = /* @__PURE__ */ _export_sfc$1(_sfc_main$4, [["render", _sfc_render], ["__file", "index.vue"]]);
    const messageInstance = /* @__PURE__ */ new Map();
    const getAppendToElement = (props) => {
      let appendTo = document.body;
      if (props.appendTo) {
        if (isString$1(props.appendTo)) {
          appendTo = document.querySelector(props.appendTo);
        }
        if (isElement(props.appendTo)) {
          appendTo = props.appendTo;
        }
        if (!isElement(appendTo)) {
          appendTo = document.body;
        }
      }
      return appendTo;
    };
    const initInstance = (props, container, appContext = null) => {
      const vnode = createVNode(MessageBoxConstructor, props, isFunction$1(props.message) || isVNode(props.message) ? {
        default: isFunction$1(props.message) ? props.message : () => props.message
      } : null);
      vnode.appContext = appContext;
      render(vnode, container);
      getAppendToElement(props).appendChild(container.firstElementChild);
      return vnode.component;
    };
    const genContainer = () => {
      return document.createElement("div");
    };
    const showMessage = (options, appContext) => {
      const container = genContainer();
      options.onVanish = () => {
        render(null, container);
        messageInstance.delete(vm);
      };
      options.onAction = (action) => {
        const currentMsg = messageInstance.get(vm);
        let resolve2;
        if (options.showInput) {
          resolve2 = { value: vm.inputValue, action };
        } else {
          resolve2 = action;
        }
        if (options.callback) {
          options.callback(resolve2, instance.proxy);
        } else {
          if (action === "cancel" || action === "close") {
            if (options.distinguishCancelAndClose && action !== "cancel") {
              currentMsg.reject("close");
            } else {
              currentMsg.reject("cancel");
            }
          } else {
            currentMsg.resolve(resolve2);
          }
        }
      };
      const instance = initInstance(options, container, appContext);
      const vm = instance.proxy;
      for (const prop in options) {
        if (hasOwn(options, prop) && !hasOwn(vm.$props, prop)) {
          vm[prop] = options[prop];
        }
      }
      vm.visible = true;
      return vm;
    };
    function MessageBox(options, appContext = null) {
      if (!isClient)
        return Promise.reject();
      let callback;
      if (isString$1(options) || isVNode(options)) {
        options = {
          message: options
        };
      } else {
        callback = options.callback;
      }
      return new Promise((resolve2, reject) => {
        const vm = showMessage(options, appContext != null ? appContext : MessageBox._context);
        messageInstance.set(vm, {
          options,
          callback,
          resolve: resolve2,
          reject
        });
      });
    }
    const MESSAGE_BOX_VARIANTS = ["alert", "confirm", "prompt"];
    const MESSAGE_BOX_DEFAULT_OPTS = {
      alert: { closeOnPressEscape: false, closeOnClickModal: false },
      confirm: { showCancelButton: true },
      prompt: { showCancelButton: true, showInput: true }
    };
    MESSAGE_BOX_VARIANTS.forEach((boxType) => {
      MessageBox[boxType] = messageBoxFactory(boxType);
    });
    function messageBoxFactory(boxType) {
      return (message2, title, options, appContext) => {
        let titleOrOpts = "";
        if (isObject$1(title)) {
          options = title;
          titleOrOpts = "";
        } else if (isUndefined(title)) {
          titleOrOpts = "";
        } else {
          titleOrOpts = title;
        }
        return MessageBox(Object.assign({
          title: titleOrOpts,
          message: message2,
          type: "",
          ...MESSAGE_BOX_DEFAULT_OPTS[boxType]
        }, options, {
          boxType
        }), appContext);
      };
    }
    MessageBox.close = () => {
      messageInstance.forEach((_, vm) => {
        vm.doClose();
      });
      messageInstance.clear();
    };
    MessageBox._context = null;
    const _MessageBox = MessageBox;
    _MessageBox.install = (app) => {
      _MessageBox._context = app._context;
      app.config.globalProperties.$msgbox = _MessageBox;
      app.config.globalProperties.$messageBox = _MessageBox;
      app.config.globalProperties.$alert = _MessageBox.alert;
      app.config.globalProperties.$confirm = _MessageBox.confirm;
      app.config.globalProperties.$prompt = _MessageBox.prompt;
    };
    const ElMessageBox = _MessageBox;
    const notificationTypes = [
      "success",
      "info",
      "warning",
      "error"
    ];
    const notificationProps = buildProps({
      customClass: {
        type: String,
        default: ""
      },
      dangerouslyUseHTMLString: {
        type: Boolean,
        default: false
      },
      duration: {
        type: Number,
        default: 4500
      },
      icon: {
        type: iconPropType
      },
      id: {
        type: String,
        default: ""
      },
      message: {
        type: definePropType([String, Object]),
        default: ""
      },
      offset: {
        type: Number,
        default: 0
      },
      onClick: {
        type: definePropType(Function),
        default: () => void 0
      },
      onClose: {
        type: definePropType(Function),
        required: true
      },
      position: {
        type: String,
        values: ["top-right", "top-left", "bottom-right", "bottom-left"],
        default: "top-right"
      },
      showClose: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ""
      },
      type: {
        type: String,
        values: [...notificationTypes, ""],
        default: ""
      },
      zIndex: Number
    });
    const notificationEmits = {
      destroy: () => true
    };
    const _hoisted_1$1 = ["id"];
    const _hoisted_2$1 = ["textContent"];
    const _hoisted_3$1 = { key: 0 };
    const _hoisted_4$1 = ["innerHTML"];
    const __default__ = /* @__PURE__ */ defineComponent({
      name: "ElNotification"
    });
    const _sfc_main$3 = /* @__PURE__ */ defineComponent({
      ...__default__,
      props: notificationProps,
      emits: notificationEmits,
      setup(__props, { expose }) {
        const props = __props;
        const { ns, zIndex: zIndex2 } = useGlobalComponentSettings("notification");
        const { nextZIndex, currentZIndex } = zIndex2;
        const { Close } = CloseComponents;
        const visible = ref(false);
        let timer = void 0;
        const typeClass = computed(() => {
          const type2 = props.type;
          return type2 && TypeComponentsMap[props.type] ? ns.m(type2) : "";
        });
        const iconComponent = computed(() => {
          if (!props.type)
            return props.icon;
          return TypeComponentsMap[props.type] || props.icon;
        });
        const horizontalClass = computed(() => props.position.endsWith("right") ? "right" : "left");
        const verticalProperty = computed(() => props.position.startsWith("top") ? "top" : "bottom");
        const positionStyle = computed(() => {
          var _a2;
          return {
            [verticalProperty.value]: `${props.offset}px`,
            zIndex: (_a2 = props.zIndex) != null ? _a2 : currentZIndex.value
          };
        });
        function startTimer() {
          if (props.duration > 0) {
            ({ stop: timer } = useTimeoutFn(() => {
              if (visible.value)
                close2();
            }, props.duration));
          }
        }
        function clearTimer() {
          timer == null ? void 0 : timer();
        }
        function close2() {
          visible.value = false;
        }
        function onKeydown({ code }) {
          if (code === EVENT_CODE.delete || code === EVENT_CODE.backspace) {
            clearTimer();
          } else if (code === EVENT_CODE.esc) {
            if (visible.value) {
              close2();
            }
          } else {
            startTimer();
          }
        }
        onMounted(() => {
          startTimer();
          nextZIndex();
          visible.value = true;
        });
        useEventListener(document, "keydown", onKeydown);
        expose({
          visible,
          close: close2
        });
        return (_ctx, _cache) => {
          return openBlock(), createBlock(Transition, {
            name: unref(ns).b("fade"),
            onBeforeLeave: _ctx.onClose,
            onAfterLeave: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("destroy")),
            persisted: ""
          }, {
            default: withCtx(() => [
              withDirectives(createBaseVNode("div", {
                id: _ctx.id,
                class: normalizeClass([unref(ns).b(), _ctx.customClass, unref(horizontalClass)]),
                style: normalizeStyle(unref(positionStyle)),
                role: "alert",
                onMouseenter: clearTimer,
                onMouseleave: startTimer,
                onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
              }, [
                unref(iconComponent) ? (openBlock(), createBlock(unref(ElIcon), {
                  key: 0,
                  class: normalizeClass([unref(ns).e("icon"), unref(typeClass)])
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(unref(iconComponent))))
                  ]),
                  _: 1
                }, 8, ["class"])) : createCommentVNode("v-if", true),
                createBaseVNode("div", {
                  class: normalizeClass(unref(ns).e("group"))
                }, [
                  createBaseVNode("h2", {
                    class: normalizeClass(unref(ns).e("title")),
                    textContent: toDisplayString(_ctx.title)
                  }, null, 10, _hoisted_2$1),
                  withDirectives(createBaseVNode("div", {
                    class: normalizeClass(unref(ns).e("content")),
                    style: normalizeStyle(!!_ctx.title ? void 0 : { margin: 0 })
                  }, [
                    renderSlot(_ctx.$slots, "default", {}, () => [
                      !_ctx.dangerouslyUseHTMLString ? (openBlock(), createElementBlock("p", _hoisted_3$1, toDisplayString(_ctx.message), 1)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                        createCommentVNode(" Caution here, message could've been compromised, never use user's input as message "),
                        createBaseVNode("p", { innerHTML: _ctx.message }, null, 8, _hoisted_4$1)
                      ], 2112))
                    ])
                  ], 6), [
                    [vShow, _ctx.message]
                  ]),
                  _ctx.showClose ? (openBlock(), createBlock(unref(ElIcon), {
                    key: 0,
                    class: normalizeClass(unref(ns).e("closeBtn")),
                    onClick: withModifiers(close2, ["stop"])
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Close))
                    ]),
                    _: 1
                  }, 8, ["class", "onClick"])) : createCommentVNode("v-if", true)
                ], 2)
              ], 46, _hoisted_1$1), [
                [vShow, visible.value]
              ])
            ]),
            _: 3
          }, 8, ["name", "onBeforeLeave"]);
        };
      }
    });
    var NotificationConstructor = /* @__PURE__ */ _export_sfc$1(_sfc_main$3, [["__file", "notification.vue"]]);
    const notifications = {
      "top-left": [],
      "top-right": [],
      "bottom-left": [],
      "bottom-right": []
    };
    const GAP_SIZE = 16;
    let seed = 1;
    const notify = function(options = {}, context = null) {
      if (!isClient)
        return { close: () => void 0 };
      if (typeof options === "string" || isVNode(options)) {
        options = { message: options };
      }
      const position = options.position || "top-right";
      let verticalOffset = options.offset || 0;
      notifications[position].forEach(({ vm: vm2 }) => {
        var _a2;
        verticalOffset += (((_a2 = vm2.el) == null ? void 0 : _a2.offsetHeight) || 0) + GAP_SIZE;
      });
      verticalOffset += GAP_SIZE;
      const id = `notification_${seed++}`;
      const userOnClose = options.onClose;
      const props = {
        ...options,
        offset: verticalOffset,
        id,
        onClose: () => {
          close(id, position, userOnClose);
        }
      };
      let appendTo = document.body;
      if (isElement(options.appendTo)) {
        appendTo = options.appendTo;
      } else if (isString$1(options.appendTo)) {
        appendTo = document.querySelector(options.appendTo);
      }
      if (!isElement(appendTo)) {
        appendTo = document.body;
      }
      const container = document.createElement("div");
      const vm = createVNode(NotificationConstructor, props, isVNode(props.message) ? {
        default: () => props.message
      } : null);
      vm.appContext = context != null ? context : notify._context;
      vm.props.onDestroy = () => {
        render(null, container);
      };
      render(vm, container);
      notifications[position].push({ vm });
      appendTo.appendChild(container.firstElementChild);
      return {
        close: () => {
          vm.component.exposed.visible.value = false;
        }
      };
    };
    notificationTypes.forEach((type2) => {
      notify[type2] = (options = {}) => {
        if (typeof options === "string" || isVNode(options)) {
          options = {
            message: options
          };
        }
        return notify({
          ...options,
          type: type2
        });
      };
    });
    function close(id, position, userOnClose) {
      const orientedNotifications = notifications[position];
      const idx = orientedNotifications.findIndex(({ vm: vm2 }) => {
        var _a2;
        return ((_a2 = vm2.component) == null ? void 0 : _a2.props.id) === id;
      });
      if (idx === -1)
        return;
      const { vm } = orientedNotifications[idx];
      if (!vm)
        return;
      userOnClose == null ? void 0 : userOnClose(vm);
      const removedHeight = vm.el.offsetHeight;
      const verticalPos = position.split("-")[0];
      orientedNotifications.splice(idx, 1);
      const len = orientedNotifications.length;
      if (len < 1)
        return;
      for (let i = idx; i < len; i++) {
        const { el, component } = orientedNotifications[i].vm;
        const pos2 = Number.parseInt(el.style[verticalPos], 10) - removedHeight - GAP_SIZE;
        component.props.offset = pos2;
      }
    }
    function closeAll() {
      for (const orientedNotifications of Object.values(notifications)) {
        orientedNotifications.forEach(({ vm }) => {
          vm.component.exposed.visible.value = false;
        });
      }
    }
    notify.closeAll = closeAll;
    notify._context = null;
    const ElNotification = withInstallFunction(notify, "$notify");
    const base = "";
    const elLoading = "";
    const elForm = "";
    const elFormItem = "";
    const elDialog = "";
    const elOverlay = "";
    const elDrawer = "";
    const elText = "";
    const elSwitch = "";
    const elInput = "";
    const elTag = "";
    const elOption = "";
    const elOptionGroup = "";
    const elScrollbar = "";
    const elPopper = "";
    const elSelect = "";
    const elTooltip = "";
    const elPopover = "";
    const elAutocomplete = "";
    const elButton = "";
    var Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/;
    var ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
    var ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;
    var unicode = {
      Space_Separator,
      ID_Start,
      ID_Continue
    };
    var util = {
      isSpaceSeparator(c2) {
        return typeof c2 === "string" && unicode.Space_Separator.test(c2);
      },
      isIdStartChar(c2) {
        return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 === "$" || c2 === "_" || unicode.ID_Start.test(c2));
      },
      isIdContinueChar(c2) {
        return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 >= "0" && c2 <= "9" || c2 === "$" || c2 === "_" || c2 === "‌" || c2 === "‍" || unicode.ID_Continue.test(c2));
      },
      isDigit(c2) {
        return typeof c2 === "string" && /[0-9]/.test(c2);
      },
      isHexDigit(c2) {
        return typeof c2 === "string" && /[0-9A-Fa-f]/.test(c2);
      }
    };
    let source;
    let parseState;
    let stack;
    let pos;
    let line;
    let column;
    let token;
    let key;
    let root;
    var parse = function parse2(text, reviver) {
      source = String(text);
      parseState = "start";
      stack = [];
      pos = 0;
      line = 1;
      column = 0;
      token = void 0;
      key = void 0;
      root = void 0;
      do {
        token = lex();
        parseStates[parseState]();
      } while (token.type !== "eof");
      if (typeof reviver === "function") {
        return internalize({ "": root }, "", reviver);
      }
      return root;
    };
    function internalize(holder, name, reviver) {
      const value = holder[name];
      if (value != null && typeof value === "object") {
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            const key2 = String(i);
            const replacement = internalize(value, key2, reviver);
            if (replacement === void 0) {
              delete value[key2];
            } else {
              Object.defineProperty(value, key2, {
                value: replacement,
                writable: true,
                enumerable: true,
                configurable: true
              });
            }
          }
        } else {
          for (const key2 in value) {
            const replacement = internalize(value, key2, reviver);
            if (replacement === void 0) {
              delete value[key2];
            } else {
              Object.defineProperty(value, key2, {
                value: replacement,
                writable: true,
                enumerable: true,
                configurable: true
              });
            }
          }
        }
      }
      return reviver.call(holder, name, value);
    }
    let lexState;
    let buffer;
    let doubleQuote;
    let sign;
    let c;
    function lex() {
      lexState = "default";
      buffer = "";
      doubleQuote = false;
      sign = 1;
      for (; ; ) {
        c = peek();
        const token2 = lexStates[lexState]();
        if (token2) {
          return token2;
        }
      }
    }
    function peek() {
      if (source[pos]) {
        return String.fromCodePoint(source.codePointAt(pos));
      }
    }
    function read() {
      const c2 = peek();
      if (c2 === "\n") {
        line++;
        column = 0;
      } else if (c2) {
        column += c2.length;
      } else {
        column++;
      }
      if (c2) {
        pos += c2.length;
      }
      return c2;
    }
    const lexStates = {
      default() {
        switch (c) {
          case "	":
          case "\v":
          case "\f":
          case " ":
          case " ":
          case "\uFEFF":
          case "\n":
          case "\r":
          case "\u2028":
          case "\u2029":
            read();
            return;
          case "/":
            read();
            lexState = "comment";
            return;
          case void 0:
            read();
            return newToken("eof");
        }
        if (util.isSpaceSeparator(c)) {
          read();
          return;
        }
        return lexStates[parseState]();
      },
      comment() {
        switch (c) {
          case "*":
            read();
            lexState = "multiLineComment";
            return;
          case "/":
            read();
            lexState = "singleLineComment";
            return;
        }
        throw invalidChar(read());
      },
      multiLineComment() {
        switch (c) {
          case "*":
            read();
            lexState = "multiLineCommentAsterisk";
            return;
          case void 0:
            throw invalidChar(read());
        }
        read();
      },
      multiLineCommentAsterisk() {
        switch (c) {
          case "*":
            read();
            return;
          case "/":
            read();
            lexState = "default";
            return;
          case void 0:
            throw invalidChar(read());
        }
        read();
        lexState = "multiLineComment";
      },
      singleLineComment() {
        switch (c) {
          case "\n":
          case "\r":
          case "\u2028":
          case "\u2029":
            read();
            lexState = "default";
            return;
          case void 0:
            read();
            return newToken("eof");
        }
        read();
      },
      value() {
        switch (c) {
          case "{":
          case "[":
            return newToken("punctuator", read());
          case "n":
            read();
            literal("ull");
            return newToken("null", null);
          case "t":
            read();
            literal("rue");
            return newToken("boolean", true);
          case "f":
            read();
            literal("alse");
            return newToken("boolean", false);
          case "-":
          case "+":
            if (read() === "-") {
              sign = -1;
            }
            lexState = "sign";
            return;
          case ".":
            buffer = read();
            lexState = "decimalPointLeading";
            return;
          case "0":
            buffer = read();
            lexState = "zero";
            return;
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            buffer = read();
            lexState = "decimalInteger";
            return;
          case "I":
            read();
            literal("nfinity");
            return newToken("numeric", Infinity);
          case "N":
            read();
            literal("aN");
            return newToken("numeric", NaN);
          case '"':
          case "'":
            doubleQuote = read() === '"';
            buffer = "";
            lexState = "string";
            return;
        }
        throw invalidChar(read());
      },
      identifierNameStartEscape() {
        if (c !== "u") {
          throw invalidChar(read());
        }
        read();
        const u = unicodeEscape();
        switch (u) {
          case "$":
          case "_":
            break;
          default:
            if (!util.isIdStartChar(u)) {
              throw invalidIdentifier();
            }
            break;
        }
        buffer += u;
        lexState = "identifierName";
      },
      identifierName() {
        switch (c) {
          case "$":
          case "_":
          case "‌":
          case "‍":
            buffer += read();
            return;
          case "\\":
            read();
            lexState = "identifierNameEscape";
            return;
        }
        if (util.isIdContinueChar(c)) {
          buffer += read();
          return;
        }
        return newToken("identifier", buffer);
      },
      identifierNameEscape() {
        if (c !== "u") {
          throw invalidChar(read());
        }
        read();
        const u = unicodeEscape();
        switch (u) {
          case "$":
          case "_":
          case "‌":
          case "‍":
            break;
          default:
            if (!util.isIdContinueChar(u)) {
              throw invalidIdentifier();
            }
            break;
        }
        buffer += u;
        lexState = "identifierName";
      },
      sign() {
        switch (c) {
          case ".":
            buffer = read();
            lexState = "decimalPointLeading";
            return;
          case "0":
            buffer = read();
            lexState = "zero";
            return;
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            buffer = read();
            lexState = "decimalInteger";
            return;
          case "I":
            read();
            literal("nfinity");
            return newToken("numeric", sign * Infinity);
          case "N":
            read();
            literal("aN");
            return newToken("numeric", NaN);
        }
        throw invalidChar(read());
      },
      zero() {
        switch (c) {
          case ".":
            buffer += read();
            lexState = "decimalPoint";
            return;
          case "e":
          case "E":
            buffer += read();
            lexState = "decimalExponent";
            return;
          case "x":
          case "X":
            buffer += read();
            lexState = "hexadecimal";
            return;
        }
        return newToken("numeric", sign * 0);
      },
      decimalInteger() {
        switch (c) {
          case ".":
            buffer += read();
            lexState = "decimalPoint";
            return;
          case "e":
          case "E":
            buffer += read();
            lexState = "decimalExponent";
            return;
        }
        if (util.isDigit(c)) {
          buffer += read();
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      decimalPointLeading() {
        if (util.isDigit(c)) {
          buffer += read();
          lexState = "decimalFraction";
          return;
        }
        throw invalidChar(read());
      },
      decimalPoint() {
        switch (c) {
          case "e":
          case "E":
            buffer += read();
            lexState = "decimalExponent";
            return;
        }
        if (util.isDigit(c)) {
          buffer += read();
          lexState = "decimalFraction";
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      decimalFraction() {
        switch (c) {
          case "e":
          case "E":
            buffer += read();
            lexState = "decimalExponent";
            return;
        }
        if (util.isDigit(c)) {
          buffer += read();
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      decimalExponent() {
        switch (c) {
          case "+":
          case "-":
            buffer += read();
            lexState = "decimalExponentSign";
            return;
        }
        if (util.isDigit(c)) {
          buffer += read();
          lexState = "decimalExponentInteger";
          return;
        }
        throw invalidChar(read());
      },
      decimalExponentSign() {
        if (util.isDigit(c)) {
          buffer += read();
          lexState = "decimalExponentInteger";
          return;
        }
        throw invalidChar(read());
      },
      decimalExponentInteger() {
        if (util.isDigit(c)) {
          buffer += read();
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      hexadecimal() {
        if (util.isHexDigit(c)) {
          buffer += read();
          lexState = "hexadecimalInteger";
          return;
        }
        throw invalidChar(read());
      },
      hexadecimalInteger() {
        if (util.isHexDigit(c)) {
          buffer += read();
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      string() {
        switch (c) {
          case "\\":
            read();
            buffer += escape();
            return;
          case '"':
            if (doubleQuote) {
              read();
              return newToken("string", buffer);
            }
            buffer += read();
            return;
          case "'":
            if (!doubleQuote) {
              read();
              return newToken("string", buffer);
            }
            buffer += read();
            return;
          case "\n":
          case "\r":
            throw invalidChar(read());
          case "\u2028":
          case "\u2029":
            separatorChar(c);
            break;
          case void 0:
            throw invalidChar(read());
        }
        buffer += read();
      },
      start() {
        switch (c) {
          case "{":
          case "[":
            return newToken("punctuator", read());
        }
        lexState = "value";
      },
      beforePropertyName() {
        switch (c) {
          case "$":
          case "_":
            buffer = read();
            lexState = "identifierName";
            return;
          case "\\":
            read();
            lexState = "identifierNameStartEscape";
            return;
          case "}":
            return newToken("punctuator", read());
          case '"':
          case "'":
            doubleQuote = read() === '"';
            lexState = "string";
            return;
        }
        if (util.isIdStartChar(c)) {
          buffer += read();
          lexState = "identifierName";
          return;
        }
        throw invalidChar(read());
      },
      afterPropertyName() {
        if (c === ":") {
          return newToken("punctuator", read());
        }
        throw invalidChar(read());
      },
      beforePropertyValue() {
        lexState = "value";
      },
      afterPropertyValue() {
        switch (c) {
          case ",":
          case "}":
            return newToken("punctuator", read());
        }
        throw invalidChar(read());
      },
      beforeArrayValue() {
        if (c === "]") {
          return newToken("punctuator", read());
        }
        lexState = "value";
      },
      afterArrayValue() {
        switch (c) {
          case ",":
          case "]":
            return newToken("punctuator", read());
        }
        throw invalidChar(read());
      },
      end() {
        throw invalidChar(read());
      }
    };
    function newToken(type2, value) {
      return {
        type: type2,
        value,
        line,
        column
      };
    }
    function literal(s) {
      for (const c2 of s) {
        const p2 = peek();
        if (p2 !== c2) {
          throw invalidChar(read());
        }
        read();
      }
    }
    function escape() {
      const c2 = peek();
      switch (c2) {
        case "b":
          read();
          return "\b";
        case "f":
          read();
          return "\f";
        case "n":
          read();
          return "\n";
        case "r":
          read();
          return "\r";
        case "t":
          read();
          return "	";
        case "v":
          read();
          return "\v";
        case "0":
          read();
          if (util.isDigit(peek())) {
            throw invalidChar(read());
          }
          return "\0";
        case "x":
          read();
          return hexEscape();
        case "u":
          read();
          return unicodeEscape();
        case "\n":
        case "\u2028":
        case "\u2029":
          read();
          return "";
        case "\r":
          read();
          if (peek() === "\n") {
            read();
          }
          return "";
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          throw invalidChar(read());
        case void 0:
          throw invalidChar(read());
      }
      return read();
    }
    function hexEscape() {
      let buffer2 = "";
      let c2 = peek();
      if (!util.isHexDigit(c2)) {
        throw invalidChar(read());
      }
      buffer2 += read();
      c2 = peek();
      if (!util.isHexDigit(c2)) {
        throw invalidChar(read());
      }
      buffer2 += read();
      return String.fromCodePoint(parseInt(buffer2, 16));
    }
    function unicodeEscape() {
      let buffer2 = "";
      let count = 4;
      while (count-- > 0) {
        const c2 = peek();
        if (!util.isHexDigit(c2)) {
          throw invalidChar(read());
        }
        buffer2 += read();
      }
      return String.fromCodePoint(parseInt(buffer2, 16));
    }
    const parseStates = {
      start() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        push();
      },
      beforePropertyName() {
        switch (token.type) {
          case "identifier":
          case "string":
            key = token.value;
            parseState = "afterPropertyName";
            return;
          case "punctuator":
            pop();
            return;
          case "eof":
            throw invalidEOF();
        }
      },
      afterPropertyName() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        parseState = "beforePropertyValue";
      },
      beforePropertyValue() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        push();
      },
      beforeArrayValue() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        if (token.type === "punctuator" && token.value === "]") {
          pop();
          return;
        }
        push();
      },
      afterPropertyValue() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        switch (token.value) {
          case ",":
            parseState = "beforePropertyName";
            return;
          case "}":
            pop();
        }
      },
      afterArrayValue() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        switch (token.value) {
          case ",":
            parseState = "beforeArrayValue";
            return;
          case "]":
            pop();
        }
      },
      end() {
      }
    };
    function push() {
      let value;
      switch (token.type) {
        case "punctuator":
          switch (token.value) {
            case "{":
              value = {};
              break;
            case "[":
              value = [];
              break;
          }
          break;
        case "null":
        case "boolean":
        case "numeric":
        case "string":
          value = token.value;
          break;
      }
      if (root === void 0) {
        root = value;
      } else {
        const parent = stack[stack.length - 1];
        if (Array.isArray(parent)) {
          parent.push(value);
        } else {
          Object.defineProperty(parent, key, {
            value,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }
      if (value !== null && typeof value === "object") {
        stack.push(value);
        if (Array.isArray(value)) {
          parseState = "beforeArrayValue";
        } else {
          parseState = "beforePropertyName";
        }
      } else {
        const current = stack[stack.length - 1];
        if (current == null) {
          parseState = "end";
        } else if (Array.isArray(current)) {
          parseState = "afterArrayValue";
        } else {
          parseState = "afterPropertyValue";
        }
      }
    }
    function pop() {
      stack.pop();
      const current = stack[stack.length - 1];
      if (current == null) {
        parseState = "end";
      } else if (Array.isArray(current)) {
        parseState = "afterArrayValue";
      } else {
        parseState = "afterPropertyValue";
      }
    }
    function invalidChar(c2) {
      if (c2 === void 0) {
        return syntaxError(`JSON5: invalid end of input at ${line}:${column}`);
      }
      return syntaxError(`JSON5: invalid character '${formatChar(c2)}' at ${line}:${column}`);
    }
    function invalidEOF() {
      return syntaxError(`JSON5: invalid end of input at ${line}:${column}`);
    }
    function invalidIdentifier() {
      column -= 5;
      return syntaxError(`JSON5: invalid identifier character at ${line}:${column}`);
    }
    function separatorChar(c2) {
      console.warn(`JSON5: '${formatChar(c2)}' in strings is not valid ECMAScript; consider escaping`);
    }
    function formatChar(c2) {
      const replacements = {
        "'": "\\'",
        '"': '\\"',
        "\\": "\\\\",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "	": "\\t",
        "\v": "\\v",
        "\0": "\\0",
        "\u2028": "\\u2028",
        "\u2029": "\\u2029"
      };
      if (replacements[c2]) {
        return replacements[c2];
      }
      if (c2 < " ") {
        const hexString = c2.charCodeAt(0).toString(16);
        return "\\x" + ("00" + hexString).substring(hexString.length);
      }
      return c2;
    }
    function syntaxError(message2) {
      const err = new SyntaxError(message2);
      err.lineNumber = line;
      err.columnNumber = column;
      return err;
    }
    var stringify = function stringify2(value, replacer2, space) {
      const stack2 = [];
      let indent = "";
      let propertyList;
      let replacerFunc;
      let gap = "";
      let quote;
      if (replacer2 != null && typeof replacer2 === "object" && !Array.isArray(replacer2)) {
        space = replacer2.space;
        quote = replacer2.quote;
        replacer2 = replacer2.replacer;
      }
      if (typeof replacer2 === "function") {
        replacerFunc = replacer2;
      } else if (Array.isArray(replacer2)) {
        propertyList = [];
        for (const v of replacer2) {
          let item;
          if (typeof v === "string") {
            item = v;
          } else if (typeof v === "number" || v instanceof String || v instanceof Number) {
            item = String(v);
          }
          if (item !== void 0 && propertyList.indexOf(item) < 0) {
            propertyList.push(item);
          }
        }
      }
      if (space instanceof Number) {
        space = Number(space);
      } else if (space instanceof String) {
        space = String(space);
      }
      if (typeof space === "number") {
        if (space > 0) {
          space = Math.min(10, Math.floor(space));
          gap = "          ".substr(0, space);
        }
      } else if (typeof space === "string") {
        gap = space.substr(0, 10);
      }
      return serializeProperty("", { "": value });
      function serializeProperty(key2, holder) {
        let value2 = holder[key2];
        if (value2 != null) {
          if (typeof value2.toJSON5 === "function") {
            value2 = value2.toJSON5(key2);
          } else if (typeof value2.toJSON === "function") {
            value2 = value2.toJSON(key2);
          }
        }
        if (replacerFunc) {
          value2 = replacerFunc.call(holder, key2, value2);
        }
        if (value2 instanceof Number) {
          value2 = Number(value2);
        } else if (value2 instanceof String) {
          value2 = String(value2);
        } else if (value2 instanceof Boolean) {
          value2 = value2.valueOf();
        }
        switch (value2) {
          case null:
            return "null";
          case true:
            return "true";
          case false:
            return "false";
        }
        if (typeof value2 === "string") {
          return quoteString(value2);
        }
        if (typeof value2 === "number") {
          return String(value2);
        }
        if (typeof value2 === "object") {
          return Array.isArray(value2) ? serializeArray(value2) : serializeObject(value2);
        }
        return void 0;
      }
      function quoteString(value2) {
        const quotes = {
          "'": 0.1,
          '"': 0.2
        };
        const replacements = {
          "'": "\\'",
          '"': '\\"',
          "\\": "\\\\",
          "\b": "\\b",
          "\f": "\\f",
          "\n": "\\n",
          "\r": "\\r",
          "	": "\\t",
          "\v": "\\v",
          "\0": "\\0",
          "\u2028": "\\u2028",
          "\u2029": "\\u2029"
        };
        let product = "";
        for (let i = 0; i < value2.length; i++) {
          const c2 = value2[i];
          switch (c2) {
            case "'":
            case '"':
              quotes[c2]++;
              product += c2;
              continue;
            case "\0":
              if (util.isDigit(value2[i + 1])) {
                product += "\\x00";
                continue;
              }
          }
          if (replacements[c2]) {
            product += replacements[c2];
            continue;
          }
          if (c2 < " ") {
            let hexString = c2.charCodeAt(0).toString(16);
            product += "\\x" + ("00" + hexString).substring(hexString.length);
            continue;
          }
          product += c2;
        }
        const quoteChar = quote || Object.keys(quotes).reduce((a, b) => quotes[a] < quotes[b] ? a : b);
        product = product.replace(new RegExp(quoteChar, "g"), replacements[quoteChar]);
        return quoteChar + product + quoteChar;
      }
      function serializeObject(value2) {
        if (stack2.indexOf(value2) >= 0) {
          throw TypeError("Converting circular structure to JSON5");
        }
        stack2.push(value2);
        let stepback = indent;
        indent = indent + gap;
        let keys2 = propertyList || Object.keys(value2);
        let partial = [];
        for (const key2 of keys2) {
          const propertyString = serializeProperty(key2, value2);
          if (propertyString !== void 0) {
            let member = serializeKey(key2) + ":";
            if (gap !== "") {
              member += " ";
            }
            member += propertyString;
            partial.push(member);
          }
        }
        let final;
        if (partial.length === 0) {
          final = "{}";
        } else {
          let properties;
          if (gap === "") {
            properties = partial.join(",");
            final = "{" + properties + "}";
          } else {
            let separator = ",\n" + indent;
            properties = partial.join(separator);
            final = "{\n" + indent + properties + ",\n" + stepback + "}";
          }
        }
        stack2.pop();
        indent = stepback;
        return final;
      }
      function serializeKey(key2) {
        if (key2.length === 0) {
          return quoteString(key2);
        }
        const firstChar = String.fromCodePoint(key2.codePointAt(0));
        if (!util.isIdStartChar(firstChar)) {
          return quoteString(key2);
        }
        for (let i = firstChar.length; i < key2.length; i++) {
          if (!util.isIdContinueChar(String.fromCodePoint(key2.codePointAt(i)))) {
            return quoteString(key2);
          }
        }
        return key2;
      }
      function serializeArray(value2) {
        if (stack2.indexOf(value2) >= 0) {
          throw TypeError("Converting circular structure to JSON5");
        }
        stack2.push(value2);
        let stepback = indent;
        indent = indent + gap;
        let partial = [];
        for (let i = 0; i < value2.length; i++) {
          const propertyString = serializeProperty(String(i), value2);
          partial.push(propertyString !== void 0 ? propertyString : "null");
        }
        let final;
        if (partial.length === 0) {
          final = "[]";
        } else {
          if (gap === "") {
            let properties = partial.join(",");
            final = "[" + properties + "]";
          } else {
            let separator = ",\n" + indent;
            let properties = partial.join(separator);
            final = "[\n" + indent + properties + ",\n" + stepback + "]";
          }
        }
        stack2.pop();
        indent = stepback;
        return final;
      }
    };
    const JSON5 = {
      parse,
      stringify
    };
    var lib = JSON5;
    const Ua_vue_vue_type_style_index_0_scoped_9f66e1eb_lang = "";
    const Ua_vue_vue_type_style_index_1_lang = "";
    const _export_sfc = (sfc, props) => {
      const target = sfc.__vccOpts || sfc;
      for (const [key2, val] of props) {
        target[key2] = val;
      }
      return target;
    };
    const elBadge = "";
    const elMessage = "";
    const elNotification = "";
    const _withScopeId = (n) => (pushScopeId("data-v-9f66e1eb"), n = n(), popScopeId(), n);
    const _hoisted_1 = {
      class: "container",
      "element-loading-text": "下载中，莫着急..."
    };
    const _hoisted_2 = { class: "row" };
    const _hoisted_3 = { class: "name" };
    const _hoisted_4 = { class: "addr" };
    const _hoisted_5 = {
      class: "row",
      "element-loading-text": "解密中，莫着急..."
    };
    const _hoisted_6 = {
      class: "row btn-row",
      style: { "text-align": "center" }
    };
    const _hoisted_7 = { class: "popover-div" };
    const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h3", null, "本地包配置", -1));
    const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", { class: "mx-info" }, "实时下载在线线路，可自定义配置", -1));
    const _hoisted_10 = { class: "popover-flex" };
    const _hoisted_11 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("a", {
      href: "https://lige.chat",
      target: "_blank",
      class: "back"
    }, null, -1));
    const _hoisted_12 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h4", null, "本地包下载配置", -1));
    const _hoisted_13 = { class: "drawer-list" };
    const _hoisted_14 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", null, [
      /* @__PURE__ */ createTextVNode("自定义Token"),
      /* @__PURE__ */ createBaseVNode("span")
    ], -1));
    const _hoisted_15 = { class: "drawer-item-div" };
    const _hoisted_16 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", null, [
      /* @__PURE__ */ createTextVNode("自定义壁纸"),
      /* @__PURE__ */ createBaseVNode("span")
    ], -1));
    const _hoisted_17 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", null, [
      /* @__PURE__ */ createTextVNode("线路更新提醒"),
      /* @__PURE__ */ createBaseVNode("span")
    ], -1));
    const _hoisted_18 = { class: "flex" };
    const _hoisted_19 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", null, "生成多线路", -1));
    const _hoisted_20 = { style: { "flex": "auto" } };
    const _hoisted_21 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("img", {
      src: "https://lige.chat/images/QRCode.jpg",
      class: "qrcode"
    }, null, -1));
    const _hoisted_22 = { class: "dialog-footer" };
    const _hoisted_23 = ["href"];
    const _hoisted_24 = { class: "dialog-footer" };
    const _hoisted_25 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("img", {
      src: "https://www.lige.chat/images/QRCode.jpg",
      class: "preload"
    }, null, -1));
    const _sfc_main$2 = {
      __name: "Ua",
      setup(__props) {
        const urls = ref(JSON.parse(localStorage.getItem("urls")) || []);
        const selectedUrl = ref("");
        const selectedName = ref("");
        const resultData = ref("");
        const crawling = ref(false);
        const downing = ref(false);
        const tokening = ref(false);
        const drawer = ref(false);
        const qrDialogVisible = ref(false);
        const pushdialogVisible = ref(false);
        const pushLinedialogVisible = ref(false);
        const pushing = ref(false);
        const tvboxIp = ref("");
        const ips = ref([]);
        let pushLine = reactive({
          pushStore_name: "",
          pushStore_url: "",
          do: "pushStore"
        });
        let configCopy = reactive({});
        const initConfig = () => {
          return {
            token: "",
            wallpaper: "",
            isLines: false,
            lineTip: { name: "", url: "", hash: "" }
          };
        };
        let config = reactive(initConfig());
        const querySearch = (queryString, cb) => {
          const results = queryString ? urls.value.filter(createFilter(queryString)) : urls.value;
          cb(results);
        };
        const createFilter = (queryString) => {
          return (urls2) => {
            return urls2.url.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
          };
        };
        const handleSelect = async (item) => {
          selectedUrl.value = item.url;
          selectedName.value = item.name;
          resultData.value = "";
        };
        const handleInput = () => {
          selectedName.value = "";
        };
        const getUrlsData = async () => {
          try {
            const data = await window.api.getJson();
            if (data && data.length >= 10) {
              urls.value = data;
              localStorage.setItem("urls", JSON.stringify(data));
            }
          } catch (error) {
            console.error(error.message);
          }
        };
        const crawl = async () => {
          const url = selectedUrl.value;
          if (!url) {
            ElMessage("请先选择线路再解密");
            return;
          }
          crawling.value = true;
          try {
            let resData = await window.api.ua(url);
            try {
              resData = lib.parse(resData);
              resData = JSON.stringify(resData, null, 2);
            } catch (err) {
              console.error(`JSON5 解析失败：${err}`);
            }
            resultData.value = resData;
          } catch (err) {
            ElMessage.error("解密失败，请检查线路");
            window.open(`http://lige.unaux.com?url=${encodeURIComponent(url)}`);
          } finally {
            crawling.value = false;
          }
        };
        const getJar = async () => {
          const url = selectedUrl.value;
          if (!url) {
            ElMessage("请先选择线路再下载");
            return;
          }
          downing.value = true;
          try {
            const result = await window.api.downloadJar(url);
            if (result.status == "success") {
              ElMessage({
                message: "下载Jar成功，放在桌面",
                type: "success"
              });
            } else {
              ElMessage.error("下载失败，请检查线路");
            }
            downing.value = false;
          } catch (err) {
            downing.value = false;
            ElMessage.error("下载失败，请检查线路");
            console.log(err);
          }
        };
        const downLocal = async () => {
          const url = selectedUrl.value;
          const name = selectedName.value;
          if (!url) {
            ElMessage("请先选择线路再下载");
            return;
          }
          downing.value = true;
          setTimeout(() => {
            downing.value = false;
          }, 18e4);
          try {
            const result = await window.api.update(url, name, toRaw(config));
            console.log(result);
            if (result == "error") {
              ElMessage.error("下载失败，请检查线路");
            } else {
              ElMessage({
                message: "下载本地包成功，放在桌面",
                type: "success"
              });
              setTimeout(() => {
                copyContent(result, 2);
              }, 1500);
            }
            downing.value = false;
          } catch (err) {
            downing.value = false;
            ElMessage.error("下载失败，请检查线路");
            console.log(err);
          }
        };
        const copyContent = (content, type2) => {
          if (!content) {
            return;
          }
          var ele = document.createElement("input");
          ele.setAttribute("value", content);
          document.body.appendChild(ele);
          ele.select();
          document.execCommand("copy");
          document.body.removeChild(ele);
          const message2 = type2 == 2 ? `复制线路成功:${content}` : `复制内容成功`;
          ElMessage({
            message: message2,
            type: "success"
          });
        };
        const drawerSetting = () => {
          drawer.value = true;
          getConfig();
          configCopy = JSON.parse(JSON.stringify(config));
        };
        const clearClick = () => {
          Object.assign(config, initConfig());
          window.store.deleteItem("config");
          console.log(config);
          ElMessage({
            message: "清空成功",
            type: "success"
          });
        };
        const setHash = async () => {
          try {
            const url = config?.lineTip?.url;
            if (url) {
              if (url != configCopy?.lineTip.url) {
                const newHash = await window.api.getHashToWeb(url);
                config.lineTip.hash = newHash;
              }
            } else {
              config.lineTip.hash = "";
            }
          } catch (error) {
            config.lineTip.hash = "";
            console.log(error);
          } finally {
            console.log("finally");
            window.store.setItem("config", toRaw(config));
          }
        };
        const confirmClick = () => {
          window.store.setItem("config", toRaw(config));
          ElMessage({
            message: "保存成功",
            type: "success"
          });
          drawer.value = false;
          setHash();
        };
        const lineChange = (val) => {
          const result = urls.value.find((item) => {
            return item.url == val;
          });
          if (result) {
            config.lineTip.name = result.name;
          } else {
            config.lineTip.name = "";
          }
        };
        const getConfig = async () => {
          const configStr = await window.store.getItem("config");
          if (configStr) {
            Object.assign(config, configStr);
          }
        };
        const tokenRefresh = async () => {
          const token2 = config.token;
          const regex = /^[a-zA-Z0-9]{32}$/;
          const isMatch = regex.test(token2);
          if (!isMatch) {
            ElMessage("请输入正确的token后再进行刷新");
            return;
          }
          tokening.value = true;
          try {
            let resData = await window.api.getToken(token2);
            config.token = resData;
            ElMessage({
              message: "刷新成功，点击“保存配置”按钮生效",
              type: "success"
            });
          } catch (err) {
            console.log(err);
            ElMessage.error("刷新失败，Token已失效");
          } finally {
            tokening.value = false;
          }
        };
        const lineUpdateTip = async () => {
          const configStr = await window.store.getItem("config");
          const url = configStr?.lineTip?.url;
          const name = configStr?.lineTip?.name;
          const hash = configStr?.lineTip?.hash;
          if (url && hash) {
            const newHash = await window.api.getHashToWeb(url);
            if (hash != newHash) {
              ElNotification({
                title: "线路更新提醒",
                message: `${name}已更新`,
                type: "success"
              });
              console.log("线路更新提醒");
            } else {
              console.log("提醒线路无更新");
            }
          } else {
            console.log("没设置线路提醒");
          }
        };
        const pushDialog = async () => {
          try {
            const result = await window.api.getIps();
            if (result.status == "success") {
              ips.value = result.ips;
              tvboxIp.value = result.ips[0];
              pushdialogVisible.value = true;
            } else {
              ips.value = [];
              tvboxIp.value = "";
              ElMessage.error(result.message);
            }
            console.log(result);
          } catch (error) {
          }
        };
        const pushLocal = async () => {
          if (!tvboxIp.value) {
            ElMessage("请在手机或电视打开TVBOX");
            return;
          }
          pushing.value = true;
          try {
            const result = await window.api.pushToAndroid(tvboxIp.value);
            if (result.status == "success") {
              ElMessage({
                message: result.message,
                type: "success"
              });
              pushdialogVisible.value = false;
            } else {
              ElMessage.error(result.message);
            }
            console.log(result);
          } catch (error) {
            ElMessage.error("上传失败");
          } finally {
            console.log("finally");
            pushing.value = false;
          }
        };
        const pushLinedialog = () => {
          pushLinedialogVisible.value = true;
          pushLine.pushStore_name = "";
          pushLine.pushStore_url = "";
        };
        const pushStore = async () => {
          const urlRegex = /^(clan|http).*$/;
          if (!urlRegex.test(pushLine.pushStore_url)) {
            ElMessage("请输入正确的仓库/线路地址再推送");
            return;
          }
          if (!tvboxIp.value) {
            ElMessage("请在手机或电视打开TVBOX");
            return;
          }
          try {
            console.log((tvboxIp.value, toRaw(pushLine)));
            const result = await window.api.actionToAndroid(tvboxIp.value, toRaw(pushLine));
            window.api.actionToAndroid(tvboxIp.value, { url: pushLine.pushStore_url, do: "api" });
            if (result.status == "success") {
              ElMessage({
                message: result.message,
                type: "success"
              });
              pushLinedialogVisible.value = false;
            } else {
              ElMessage.error(result.message);
            }
            console.log(result);
          } catch (error) {
            ElMessage.error("推送失败");
          }
        };
        onMounted(() => {
          getConfig();
          getUrlsData();
          lineUpdateTip();
        });
        return (_ctx, _cache) => {
          const _component_el_button = ElButton;
          const _component_el_autocomplete = ElAutocomplete;
          const _component_el_input = ElInput;
          const _component_el_popover = ElPopover;
          const _component_el_tooltip = ElTooltip;
          const _component_el_option = ElOption;
          const _component_el_select = ElSelect;
          const _component_el_switch = ElSwitch;
          const _component_el_text = ElText;
          const _component_el_drawer = ElDrawer;
          const _component_el_dialog = ElDialog;
          const _component_el_form_item = ElFormItem;
          const _component_el_form = ElForm;
          const _directive_loading = vLoading;
          return withDirectives((openBlock(), createElementBlock("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, [
              createVNode(_component_el_autocomplete, {
                size: "large",
                modelValue: selectedUrl.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => selectedUrl.value = $event),
                "fetch-suggestions": querySearch,
                placeholder: "可下拉选择",
                onSelect: handleSelect,
                onInput: handleInput,
                clearable: ""
              }, {
                default: withCtx(({ item }) => [
                  createBaseVNode("span", _hoisted_3, toDisplayString(item.name) + ":", 1),
                  createBaseVNode("span", _hoisted_4, toDisplayString(item.url), 1)
                ]),
                append: withCtx(() => [
                  createVNode(_component_el_button, {
                    class: "btn_oper",
                    plain: "",
                    onClick: _cache[0] || (_cache[0] = ($event) => crawl()),
                    disabled: crawling.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 一键解密 ")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            withDirectives((openBlock(), createElementBlock("div", _hoisted_5, [
              createVNode(_component_el_input, {
                class: "textarea",
                type: "textarea",
                autosize: { maxRows: 20 },
                modelValue: resultData.value,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => resultData.value = $event),
                readonly: ""
              }, null, 8, ["modelValue"])
            ])), [
              [_directive_loading, crawling.value]
            ]),
            createBaseVNode("div", _hoisted_6, [
              createVNode(_component_el_button, {
                size: "large",
                type: "primary",
                id: "copyResult",
                onClick: _cache[3] || (_cache[3] = ($event) => copyContent(resultData.value))
              }, {
                default: withCtx(() => [
                  createTextVNode(" 复制内容 ")
                ]),
                _: 1
              }),
              createVNode(_component_el_button, {
                size: "large",
                type: "success",
                onClick: _cache[4] || (_cache[4] = ($event) => getJar()),
                disabled: downing.value
              }, {
                default: withCtx(() => [
                  createTextVNode("下载Jar")
                ]),
                _: 1
              }, 8, ["disabled"]),
              createVNode(_component_el_popover, { width: 208 }, {
                reference: withCtx(() => [
                  createVNode(_component_el_button, {
                    size: "large",
                    type: "danger",
                    onClick: _cache[5] || (_cache[5] = ($event) => downLocal()),
                    disabled: downing.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode("下载本地包")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_7, [
                    _hoisted_8,
                    _hoisted_9,
                    createBaseVNode("p", _hoisted_10, [
                      createVNode(_component_el_button, {
                        onClick: _cache[6] || (_cache[6] = ($event) => drawerSetting())
                      }, {
                        default: withCtx(() => [
                          createTextVNode("去配置")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_button, {
                        onClick: _cache[7] || (_cache[7] = ($event) => qrDialogVisible.value = true)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("QQ频道")
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_button, {
                size: "large",
                color: "#00B89F",
                onClick: _cache[8] || (_cache[8] = ($event) => pushDialog())
              }, {
                default: withCtx(() => [
                  createTextVNode("推送本地包")
                ]),
                _: 1
              }),
              createVNode(_component_el_button, {
                size: "large",
                type: "warning"
              }, {
                default: withCtx(() => [
                  createTextVNode("前往主页 "),
                  _hoisted_11
                ]),
                _: 1
              })
            ]),
            createVNode(_component_el_drawer, {
              modelValue: drawer.value,
              "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => drawer.value = $event),
              size: "50%"
            }, {
              header: withCtx(() => [
                _hoisted_12
              ]),
              default: withCtx(() => [
                createBaseVNode("ul", _hoisted_13, [
                  createBaseVNode("li", null, [
                    _hoisted_14,
                    createBaseVNode("div", _hoisted_15, [
                      createVNode(_component_el_input, {
                        modelValue: unref(config).token,
                        "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => unref(config).token = $event),
                        placeholder: "支持Token值或链接（如需统一Token，下载前需要设置Token值）"
                      }, null, 8, ["modelValue"]),
                      createVNode(_component_el_tooltip, {
                        effect: "light",
                        content: "刷新Token值",
                        placement: "top"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_button, {
                            onClick: tokenRefresh,
                            disabled: tokening.value,
                            icon: unref(refresh_default)
                          }, null, 8, ["disabled", "icon"])
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  createBaseVNode("li", null, [
                    _hoisted_16,
                    createVNode(_component_el_input, {
                      modelValue: unref(config).wallpaper,
                      "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => unref(config).wallpaper = $event),
                      placeholder: "支持随机壁纸接口或本地壁纸（如：clan://localhost/tvbox/1.png）"
                    }, null, 8, ["modelValue"])
                  ]),
                  createBaseVNode("li", null, [
                    _hoisted_17,
                    createVNode(_component_el_select, {
                      modelValue: unref(config).lineTip.url,
                      "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => unref(config).lineTip.url = $event),
                      clearable: "",
                      placeholder: "请选择（若线路更新，会收到提醒通知）",
                      onChange: _cache[12] || (_cache[12] = ($event) => lineChange($event))
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(urls.value, (item) => {
                          return openBlock(), createBlock(_component_el_option, {
                            key: item.url,
                            label: item.name,
                            value: item.url
                          }, null, 8, ["label", "value"]);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  createBaseVNode("li", _hoisted_18, [
                    _hoisted_19,
                    createVNode(_component_el_switch, {
                      modelValue: unref(config).isLines,
                      "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => unref(config).isLines = $event)
                    }, null, 8, ["modelValue"])
                  ]),
                  createBaseVNode("li", null, [
                    createVNode(_component_el_text, {
                      class: "mx-info",
                      type: "info"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("所有配置数据仅保存本地，需点击“保存配置”按钮生效")
                      ]),
                      _: 1
                    })
                  ])
                ])
              ]),
              footer: withCtx(() => [
                createBaseVNode("div", _hoisted_20, [
                  createVNode(_component_el_button, { onClick: clearClick }, {
                    default: withCtx(() => [
                      createTextVNode("清空缓存")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: confirmClick
                  }, {
                    default: withCtx(() => [
                      createTextVNode("保存配置")
                    ]),
                    _: 1
                  })
                ])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            createVNode(_component_el_dialog, {
              modelValue: qrDialogVisible.value,
              "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => qrDialogVisible.value = $event),
              width: "300px",
              title: "加入频道"
            }, {
              default: withCtx(() => [
                _hoisted_21
              ]),
              _: 1
            }, 8, ["modelValue"]),
            createVNode(_component_el_dialog, {
              modelValue: pushdialogVisible.value,
              "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => pushdialogVisible.value = $event),
              title: "推送本地包",
              width: "448px",
              "show-close": false,
              "close-on-click-modal": false
            }, {
              footer: withCtx(() => [
                createBaseVNode("span", _hoisted_22, [
                  createVNode(_component_el_button, {
                    onClick: _cache[19] || (_cache[19] = ($event) => pushdialogVisible.value = false)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("取消")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: _cache[20] || (_cache[20] = ($event) => pushLocal()),
                    disabled: pushing.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode("上传")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ]),
              default: withCtx(() => [
                withDirectives((openBlock(), createBlock(_component_el_form, {
                  class: "push-form",
                  "element-loading-text": "上传中"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_form_item, { label: "设备IP" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: tvboxIp.value,
                          "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => tvboxIp.value = $event),
                          placeholder: "请选择"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(ips.value, (ip) => {
                              return openBlock(), createBlock(_component_el_option, {
                                key: ip,
                                label: ip,
                                value: ip
                              }, null, 8, ["label", "value"]);
                            }), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue"]),
                        createVNode(_component_el_button, {
                          class: "push-button",
                          icon: unref(refresh_default),
                          circle: "",
                          onClick: _cache[17] || (_cache[17] = ($event) => pushDialog())
                        }, null, 8, ["icon"]),
                        createVNode(_component_el_button, {
                          class: "push-button",
                          icon: unref(position_default),
                          circle: "",
                          onClick: _cache[18] || (_cache[18] = ($event) => pushLinedialog())
                        }, null, 8, ["icon"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })), [
                  [_directive_loading, pushing.value]
                ])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            createVNode(_component_el_dialog, {
              modelValue: pushLinedialogVisible.value,
              "onUpdate:modelValue": _cache[26] || (_cache[26] = ($event) => pushLinedialogVisible.value = $event),
              title: "推送仓库/线路",
              width: "448px",
              "show-close": false,
              "close-on-click-modal": false
            }, {
              footer: withCtx(() => [
                createBaseVNode("span", _hoisted_24, [
                  createVNode(_component_el_button, {
                    onClick: _cache[24] || (_cache[24] = ($event) => pushLinedialogVisible.value = false)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("取消")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: _cache[25] || (_cache[25] = ($event) => pushStore())
                  }, {
                    default: withCtx(() => [
                      createTextVNode("推送")
                    ]),
                    _: 1
                  })
                ])
              ]),
              default: withCtx(() => [
                createVNode(_component_el_form, { class: "push-form" }, {
                  default: withCtx(() => [
                    createVNode(_component_el_form_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(pushLine).pushStore_name,
                          "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => unref(pushLine).pushStore_name = $event),
                          placeholder: "仓库/线路名称(选填)"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(pushLine).pushStore_url,
                          "onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => unref(pushLine).pushStore_url = $event),
                          placeholder: "输入仓库/线路地址"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_text, {
                          class: "mx-info",
                          type: "info"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("需要打开TVBOX配置地址的页面再推送，如推送失败，"),
                            createBaseVNode("a", {
                              href: tvboxIp.value,
                              target: "_blank"
                            }, "请点击此处推送", 8, _hoisted_23)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"]),
            _hoisted_25
          ])), [
            [_directive_loading, downing.value]
          ]);
        };
      }
    };
    const Ua = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-9f66e1eb"]]);
    const elProgress = "";
    const elMessageBox = "";
    const _sfc_main$1 = {
      __name: "Update",
      setup(__props) {
        const progressDialogVisible = ref(false);
        const percent = ref(0);
        const handleUpdaterError = () => {
          progressDialogVisible.value = false;
          percent.value = 0;
          console.log("下载出错，请重启后再重新下载");
        };
        const handleUpdateAvailable = ({ message: message2 }) => {
          ElMessageBox.confirm(`发现新版本（v${message2.version}），是否立即升级?`, "版本更新", {
            confirmButtonText: "立即更新",
            cancelButtonText: "取消"
          }).then(() => {
            window.updateIpc.updateNow();
          }).catch(() => {
          });
        };
        const handleDownloadProgress = ({ message: message2 }) => {
          progressDialogVisible.value = true;
          percent.value = message2.percent.toFixed(2);
          if (message2.percent >= 100) {
            progressDialogVisible.value = false;
          }
        };
        const autoUpdater = () => {
          window.updateIpc.autoUpdater((data) => {
            console.log("autoUpdater", data);
            if (data.status == "error") {
              handleUpdaterError();
            } else if (data.status == "update-available") {
              handleUpdateAvailable(data);
            } else if (data.status == "download-progress") {
              handleDownloadProgress(data);
            }
          });
        };
        onMounted(() => {
          autoUpdater();
        });
        return (_ctx, _cache) => {
          const _component_el_progress = ElProgress;
          const _component_el_dialog = ElDialog;
          return openBlock(), createBlock(_component_el_dialog, {
            modelValue: progressDialogVisible.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => progressDialogVisible.value = $event),
            title: "更新进度",
            center: ""
          }, {
            default: withCtx(() => [
              createVNode(_component_el_progress, {
                "text-inside": true,
                "stroke-width": 26,
                percentage: percent.value
              }, null, 8, ["percentage"])
            ]),
            _: 1
          }, 8, ["modelValue"]);
        };
      }
    };
    const App_vue_vue_type_style_index_0_lang = "";
    const _sfc_main = {
      __name: "App",
      setup(__props) {
        return (_ctx, _cache) => {
          return openBlock(), createElementBlock(Fragment, null, [
            createVNode(Ua),
            createVNode(_sfc_main$1)
          ], 64);
        };
      }
    };
    createApp(_sfc_main).mount("#app");
  }
});
export default require_index_001();
