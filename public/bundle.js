/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* Riot v3.4.4, @license MIT */
(function (global, factory) {
	 true ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.riot = global.riot || {})));
}(this, (function (exports) { 'use strict';

var __TAGS_CACHE = [];
var __TAG_IMPL = {};
var GLOBAL_MIXIN = '__global_mixin';
var ATTRS_PREFIX = 'riot-';
var REF_DIRECTIVES = ['ref', 'data-ref'];
var IS_DIRECTIVE = 'data-is';
var CONDITIONAL_DIRECTIVE = 'if';
var LOOP_DIRECTIVE = 'each';
var LOOP_NO_REORDER_DIRECTIVE = 'no-reorder';
var SHOW_DIRECTIVE = 'show';
var HIDE_DIRECTIVE = 'hide';
var RIOT_EVENTS_KEY = '__riot-events__';
var T_STRING = 'string';
var T_OBJECT = 'object';
var T_UNDEF  = 'undefined';
var T_FUNCTION = 'function';
var XLINK_NS = 'http://www.w3.org/1999/xlink';
var XLINK_REGEX = /^xlink:(\w+)/;
var WIN = typeof window === T_UNDEF ? undefined : window;
var RE_SPECIAL_TAGS = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/;
var RE_SPECIAL_TAGS_NO_OPTION = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/;
var RE_EVENTS_PREFIX = /^on/;
var RE_RESERVED_NAMES = /^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|refs|parent|opts|trigger|o(?:n|ff|ne))$/;
var RE_HTML_ATTRS = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g;
var CASE_SENSITIVE_ATTRIBUTES = { 'viewbox': 'viewBox' };
var RE_BOOL_ATTRS = /^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|selected|sortable|truespeed|typemustmatch)$/;
var IE_VERSION = (WIN && WIN.document || {}).documentMode | 0;

/**
 * Check Check if the passed argument is undefined
 * @param   { String } value -
 * @returns { Boolean } -
 */
function isBoolAttr(value) {
  return RE_BOOL_ATTRS.test(value)
}

/**
 * Check if passed argument is a function
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isFunction(value) {
  return typeof value === T_FUNCTION
}

/**
 * Check if passed argument is an object, exclude null
 * NOTE: use isObject(x) && !isArray(x) to excludes arrays.
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isObject(value) {
  return value && typeof value === T_OBJECT // typeof null is 'object'
}

/**
 * Check if passed argument is undefined
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isUndefined(value) {
  return typeof value === T_UNDEF
}

/**
 * Check if passed argument is a string
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isString(value) {
  return typeof value === T_STRING
}

/**
 * Check if passed argument is empty. Different from falsy, because we dont consider 0 or false to be blank
 * @param { * } value -
 * @returns { Boolean } -
 */
function isBlank(value) {
  return isUndefined(value) || value === null || value === ''
}

/**
 * Check if passed argument is a kind of array
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isArray(value) {
  return Array.isArray(value) || value instanceof Array
}

/**
 * Check whether object's property could be overridden
 * @param   { Object }  obj - source object
 * @param   { String }  key - object property
 * @returns { Boolean } -
 */
function isWritable(obj, key) {
  var descriptor = Object.getOwnPropertyDescriptor(obj, key);
  return isUndefined(obj[key]) || descriptor && descriptor.writable
}

/**
 * Check if passed argument is a reserved name
 * @param   { String } value -
 * @returns { Boolean } -
 */
function isReservedName(value) {
  return RE_RESERVED_NAMES.test(value)
}

var check = Object.freeze({
	isBoolAttr: isBoolAttr,
	isFunction: isFunction,
	isObject: isObject,
	isUndefined: isUndefined,
	isString: isString,
	isBlank: isBlank,
	isArray: isArray,
	isWritable: isWritable,
	isReservedName: isReservedName
});

/**
 * Shorter and fast way to select multiple nodes in the DOM
 * @param   { String } selector - DOM selector
 * @param   { Object } ctx - DOM node where the targets of our search will is located
 * @returns { Object } dom nodes found
 */
function $$(selector, ctx) {
  return Array.prototype.slice.call((ctx || document).querySelectorAll(selector))
}

/**
 * Shorter and fast way to select a single node in the DOM
 * @param   { String } selector - unique dom selector
 * @param   { Object } ctx - DOM node where the target of our search will is located
 * @returns { Object } dom node found
 */
function $(selector, ctx) {
  return (ctx || document).querySelector(selector)
}

/**
 * Create a document fragment
 * @returns { Object } document fragment
 */
function createFrag() {
  return document.createDocumentFragment()
}

/**
 * Create a document text node
 * @returns { Object } create a text node to use as placeholder
 */
function createDOMPlaceholder() {
  return document.createTextNode('')
}

/**
 * Create a generic DOM node
 * @param   { String } name - name of the DOM node we want to create
 * @returns { Object } DOM node just created
 */
function mkEl(name) {
  return document.createElement(name)
}

/**
 * Set the inner html of any DOM node SVGs included
 * @param { Object } container - DOM node where we'll inject new html
 * @param { String } html - html to inject
 */
/* istanbul ignore next */
function setInnerHTML(container, html) {
  if (!isUndefined(container.innerHTML))
    { container.innerHTML = html; }
    // some browsers do not support innerHTML on the SVGs tags
  else {
    var doc = new DOMParser().parseFromString(html, 'application/xml');
    var node = container.ownerDocument.importNode(doc.documentElement, true);
    container.appendChild(node);
  }
}

/**
 * Toggle the visibility of any DOM node
 * @param   { Object }  dom - DOM node we want to hide
 * @param   { Boolean } show - do we want to show it?
 */

function toggleVisibility(dom, show) {
  dom.style.display = show ? '' : 'none';
  dom['hidden'] = show ? false : true;
}

/**
 * Remove any DOM attribute from a node
 * @param   { Object } dom - DOM node we want to update
 * @param   { String } name - name of the property we want to remove
 */
function remAttr(dom, name) {
  dom.removeAttribute(name);
}

/**
 * Convert a style object to a string
 * @param   { Object } style - style object we need to parse
 * @returns { String } resulting css string
 * @example
 * styleObjectToString({ color: 'red', height: '10px'}) // => 'color: red; height: 10px'
 */
function styleObjectToString(style) {
  return Object.keys(style).reduce(function (acc, prop) {
    return (acc + " " + prop + ": " + (style[prop]) + ";")
  }, '')
}

/**
 * Get the value of any DOM attribute on a node
 * @param   { Object } dom - DOM node we want to parse
 * @param   { String } name - name of the attribute we want to get
 * @returns { String | undefined } name of the node attribute whether it exists
 */
function getAttr(dom, name) {
  return dom.getAttribute(name)
}

/**
 * Set any DOM attribute
 * @param { Object } dom - DOM node we want to update
 * @param { String } name - name of the property we want to set
 * @param { String } val - value of the property we want to set
 */
function setAttr(dom, name, val) {
  var xlink = XLINK_REGEX.exec(name);
  if (xlink && xlink[1])
    { dom.setAttributeNS(XLINK_NS, xlink[1], val); }
  else
    { dom.setAttribute(name, val); }
}

/**
 * Insert safely a tag to fix #1962 #1649
 * @param   { HTMLElement } root - children container
 * @param   { HTMLElement } curr - node to insert
 * @param   { HTMLElement } next - node that should preceed the current node inserted
 */
function safeInsert(root, curr, next) {
  root.insertBefore(curr, next.parentNode && next);
}

/**
 * Minimize risk: only zero or one _space_ between attr & value
 * @param   { String }   html - html string we want to parse
 * @param   { Function } fn - callback function to apply on any attribute found
 */
function walkAttrs(html, fn) {
  if (!html)
    { return }
  var m;
  while (m = RE_HTML_ATTRS.exec(html))
    { fn(m[1].toLowerCase(), m[2] || m[3] || m[4]); }
}

/**
 * Walk down recursively all the children tags starting dom node
 * @param   { Object }   dom - starting node where we will start the recursion
 * @param   { Function } fn - callback to transform the child node just found
 * @param   { Object }   context - fn can optionally return an object, which is passed to children
 */
function walkNodes(dom, fn, context) {
  if (dom) {
    var res = fn(dom, context);
    var next;
    // stop the recursion
    if (res === false) { return }

    dom = dom.firstChild;

    while (dom) {
      next = dom.nextSibling;
      walkNodes(dom, fn, res);
      dom = next;
    }
  }
}

var dom = Object.freeze({
	$$: $$,
	$: $,
	createFrag: createFrag,
	createDOMPlaceholder: createDOMPlaceholder,
	mkEl: mkEl,
	setInnerHTML: setInnerHTML,
	toggleVisibility: toggleVisibility,
	remAttr: remAttr,
	styleObjectToString: styleObjectToString,
	getAttr: getAttr,
	setAttr: setAttr,
	safeInsert: safeInsert,
	walkAttrs: walkAttrs,
	walkNodes: walkNodes
});

var styleNode;
var cssTextProp;
var byName = {};
var remainder = [];
var needsInject = false;

// skip the following code on the server
if (WIN) {
  styleNode = (function () {
    // create a new style element with the correct type
    var newNode = mkEl('style');
    setAttr(newNode, 'type', 'text/css');

    // replace any user node or insert the new one into the head
    var userNode = $('style[type=riot]');
    /* istanbul ignore next */
    if (userNode) {
      if (userNode.id) { newNode.id = userNode.id; }
      userNode.parentNode.replaceChild(newNode, userNode);
    }
    else { document.getElementsByTagName('head')[0].appendChild(newNode); }

    return newNode
  })();
  cssTextProp = styleNode.styleSheet;
}

/**
 * Object that will be used to inject and manage the css of every tag instance
 */
var styleManager = {
  styleNode: styleNode,
  /**
   * Save a tag style to be later injected into DOM
   * @param { String } css - css string
   * @param { String } name - if it's passed we will map the css to a tagname
   */
  add: function add(css, name) {
    if (name) { byName[name] = css; }
    else { remainder.push(css); }
    needsInject = true;
  },
  /**
   * Inject all previously saved tag styles into DOM
   * innerHTML seems slow: http://jsperf.com/riot-insert-style
   */
  inject: function inject() {
    if (!WIN || !needsInject) { return }
    needsInject = false;
    var style = Object.keys(byName)
      .map(function(k) { return byName[k] })
      .concat(remainder).join('\n');
    /* istanbul ignore next */
    if (cssTextProp) { cssTextProp.cssText = style; }
    else { styleNode.innerHTML = style; }
  }
};

/**
 * The riot template engine
 * @version v3.0.3
 */
/**
 * riot.util.brackets
 *
 * - `brackets    ` - Returns a string or regex based on its parameter
 * - `brackets.set` - Change the current riot brackets
 *
 * @module
 */

/* global riot */

/* istanbul ignore next */
var brackets = (function (UNDEF) {

  var
    REGLOB = 'g',

    R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,

    R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|`[^`\\]*(?:\\[\S\s][^`\\]*)*`/g,

    S_QBLOCKS = R_STRINGS.source + '|' +
      /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' +
      /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?(\/)[gim]*/.source,

    UNSUPPORTED = RegExp('[\\' + 'x00-\\x1F<>a-zA-Z0-9\'",;\\\\]'),

    NEED_ESCAPE = /(?=[[\]()*+?.^$|])/g,

    FINDBRACES = {
      '(': RegExp('([()])|'   + S_QBLOCKS, REGLOB),
      '[': RegExp('([[\\]])|' + S_QBLOCKS, REGLOB),
      '{': RegExp('([{}])|'   + S_QBLOCKS, REGLOB)
    },

    DEFAULT = '{ }';

  var _pairs = [
    '{', '}',
    '{', '}',
    /{[^}]*}/,
    /\\([{}])/g,
    /\\({)|{/g,
    RegExp('\\\\(})|([[({])|(})|' + S_QBLOCKS, REGLOB),
    DEFAULT,
    /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/,
    /(^|[^\\]){=[\S\s]*?}/
  ];

  var
    cachedBrackets = UNDEF,
    _regex,
    _cache = [],
    _settings;

  function _loopback (re) { return re }

  function _rewrite (re, bp) {
    if (!bp) { bp = _cache; }
    return new RegExp(
      re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : ''
    )
  }

  function _create (pair) {
    if (pair === DEFAULT) { return _pairs }

    var arr = pair.split(' ');

    if (arr.length !== 2 || UNSUPPORTED.test(pair)) {
      throw new Error('Unsupported brackets "' + pair + '"')
    }
    arr = arr.concat(pair.replace(NEED_ESCAPE, '\\').split(' '));

    arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr);
    arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr);
    arr[6] = _rewrite(_pairs[6], arr);
    arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCKS, REGLOB);
    arr[8] = pair;
    return arr
  }

  function _brackets (reOrIdx) {
    return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx]
  }

  _brackets.split = function split (str, tmpl, _bp) {
    // istanbul ignore next: _bp is for the compiler
    if (!_bp) { _bp = _cache; }

    var
      parts = [],
      match,
      isexpr,
      start,
      pos,
      re = _bp[6];

    isexpr = start = re.lastIndex = 0;

    while ((match = re.exec(str))) {

      pos = match.index;

      if (isexpr) {

        if (match[2]) {
          re.lastIndex = skipBraces(str, match[2], re.lastIndex);
          continue
        }
        if (!match[3]) {
          continue
        }
      }

      if (!match[1]) {
        unescapeStr(str.slice(start, pos));
        start = re.lastIndex;
        re = _bp[6 + (isexpr ^= 1)];
        re.lastIndex = start;
      }
    }

    if (str && start < str.length) {
      unescapeStr(str.slice(start));
    }

    return parts

    function unescapeStr (s) {
      if (tmpl || isexpr) {
        parts.push(s && s.replace(_bp[5], '$1'));
      } else {
        parts.push(s);
      }
    }

    function skipBraces (s, ch, ix) {
      var
        match,
        recch = FINDBRACES[ch];

      recch.lastIndex = ix;
      ix = 1;
      while ((match = recch.exec(s))) {
        if (match[1] &&
          !(match[1] === ch ? ++ix : --ix)) { break }
      }
      return ix ? s.length : recch.lastIndex
    }
  };

  _brackets.hasExpr = function hasExpr (str) {
    return _cache[4].test(str)
  };

  _brackets.loopKeys = function loopKeys (expr) {
    var m = expr.match(_cache[9]);

    return m
      ? { key: m[1], pos: m[2], val: _cache[0] + m[3].trim() + _cache[1] }
      : { val: expr.trim() }
  };

  _brackets.array = function array (pair) {
    return pair ? _create(pair) : _cache
  };

  function _reset (pair) {
    if ((pair || (pair = DEFAULT)) !== _cache[8]) {
      _cache = _create(pair);
      _regex = pair === DEFAULT ? _loopback : _rewrite;
      _cache[9] = _regex(_pairs[9]);
    }
    cachedBrackets = pair;
  }

  function _setSettings (o) {
    var b;

    o = o || {};
    b = o.brackets;
    Object.defineProperty(o, 'brackets', {
      set: _reset,
      get: function () { return cachedBrackets },
      enumerable: true
    });
    _settings = o;
    _reset(b);
  }

  Object.defineProperty(_brackets, 'settings', {
    set: _setSettings,
    get: function () { return _settings }
  });

  /* istanbul ignore next: in the browser riot is always in the scope */
  _brackets.settings = typeof riot !== 'undefined' && riot.settings || {};
  _brackets.set = _reset;

  _brackets.R_STRINGS = R_STRINGS;
  _brackets.R_MLCOMMS = R_MLCOMMS;
  _brackets.S_QBLOCKS = S_QBLOCKS;

  return _brackets

})();

/**
 * @module tmpl
 *
 * tmpl          - Root function, returns the template value, render with data
 * tmpl.hasExpr  - Test the existence of a expression inside a string
 * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
 */

/* istanbul ignore next */
var tmpl = (function () {

  var _cache = {};

  function _tmpl (str, data) {
    if (!str) { return str }

    return (_cache[str] || (_cache[str] = _create(str))).call(data, _logErr)
  }

  _tmpl.hasExpr = brackets.hasExpr;

  _tmpl.loopKeys = brackets.loopKeys;

  // istanbul ignore next
  _tmpl.clearCache = function () { _cache = {}; };

  _tmpl.errorHandler = null;

  function _logErr (err, ctx) {

    err.riotData = {
      tagName: ctx && ctx.__ && ctx.__.tagName,
      _riot_id: ctx && ctx._riot_id  //eslint-disable-line camelcase
    };

    if (_tmpl.errorHandler) { _tmpl.errorHandler(err); }
    else if (
      typeof console !== 'undefined' &&
      typeof console.error === 'function'
    ) {
      if (err.riotData.tagName) {
        console.error('Riot template error thrown in the <%s> tag', err.riotData.tagName);
      }
      console.error(err);
    }
  }

  function _create (str) {
    var expr = _getTmpl(str);

    if (expr.slice(0, 11) !== 'try{return ') { expr = 'return ' + expr; }

    return new Function('E', expr + ';')    // eslint-disable-line no-new-func
  }

  var
    CH_IDEXPR = String.fromCharCode(0x2057),
    RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/,
    RE_QBLOCK = RegExp(brackets.S_QBLOCKS, 'g'),
    RE_DQUOTE = /\u2057/g,
    RE_QBMARK = /\u2057(\d+)~/g;

  function _getTmpl (str) {
    var
      qstr = [],
      expr,
      parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1);

    if (parts.length > 2 || parts[0]) {
      var i, j, list = [];

      for (i = j = 0; i < parts.length; ++i) {

        expr = parts[i];

        if (expr && (expr = i & 1

            ? _parseExpr(expr, 1, qstr)

            : '"' + expr
                .replace(/\\/g, '\\\\')
                .replace(/\r\n?|\n/g, '\\n')
                .replace(/"/g, '\\"') +
              '"'

          )) { list[j++] = expr; }

      }

      expr = j < 2 ? list[0]
           : '[' + list.join(',') + '].join("")';

    } else {

      expr = _parseExpr(parts[1], 0, qstr);
    }

    if (qstr[0]) {
      expr = expr.replace(RE_QBMARK, function (_, pos) {
        return qstr[pos]
          .replace(/\r/g, '\\r')
          .replace(/\n/g, '\\n')
      });
    }
    return expr
  }

  var
    RE_BREND = {
      '(': /[()]/g,
      '[': /[[\]]/g,
      '{': /[{}]/g
    };

  function _parseExpr (expr, asText, qstr) {

    expr = expr
          .replace(RE_QBLOCK, function (s, div) {
            return s.length > 2 && !div ? CH_IDEXPR + (qstr.push(s) - 1) + '~' : s
          })
          .replace(/\s+/g, ' ').trim()
          .replace(/\ ?([[\({},?\.:])\ ?/g, '$1');

    if (expr) {
      var
        list = [],
        cnt = 0,
        match;

      while (expr &&
            (match = expr.match(RE_CSNAME)) &&
            !match.index
        ) {
        var
          key,
          jsb,
          re = /,|([[{(])|$/g;

        expr = RegExp.rightContext;
        key  = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1];

        while (jsb = (match = re.exec(expr))[1]) { skipBraces(jsb, re); }

        jsb  = expr.slice(0, match.index);
        expr = RegExp.rightContext;

        list[cnt++] = _wrapExpr(jsb, 1, key);
      }

      expr = !cnt ? _wrapExpr(expr, asText)
           : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0];
    }
    return expr

    function skipBraces (ch, re) {
      var
        mm,
        lv = 1,
        ir = RE_BREND[ch];

      ir.lastIndex = re.lastIndex;
      while (mm = ir.exec(expr)) {
        if (mm[0] === ch) { ++lv; }
        else if (!--lv) { break }
      }
      re.lastIndex = lv ? expr.length : ir.lastIndex;
    }
  }

  // istanbul ignore next: not both
  var // eslint-disable-next-line max-len
    JS_CONTEXT = '"in this?this:' + (typeof window !== 'object' ? 'global' : 'window') + ').',
    JS_VARNAME = /[,{][\$\w]+(?=:)|(^ *|[^$\w\.{])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
    JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;

  function _wrapExpr (expr, asText, key) {
    var tb;

    expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
      if (mvar) {
        pos = tb ? 0 : pos + match.length;

        if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
          match = p + '("' + mvar + JS_CONTEXT + mvar;
          if (pos) { tb = (s = s[pos]) === '.' || s === '(' || s === '['; }
        } else if (pos) {
          tb = !JS_NOPROPS.test(s.slice(pos));
        }
      }
      return match
    });

    if (tb) {
      expr = 'try{return ' + expr + '}catch(e){E(e,this)}';
    }

    if (key) {

      expr = (tb
          ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')'
        ) + '?"' + key + '":""';

    } else if (asText) {

      expr = 'function(v){' + (tb
          ? expr.replace('return ', 'v=') : 'v=(' + expr + ')'
        ) + ';return v||v===0?v:""}.call(this)';
    }

    return expr
  }

  _tmpl.version = brackets.version = 'v3.0.3';

  return _tmpl

})();

/* istanbul ignore next */
var observable$1 = function(el) {

  /**
   * Extend the original object or create a new empty one
   * @type { Object }
   */

  el = el || {};

  /**
   * Private variables
   */
  var callbacks = {},
    slice = Array.prototype.slice;

  /**
   * Public Api
   */

  // extend the el object adding the observable methods
  Object.defineProperties(el, {
    /**
     * Listen to the given `event` ands
     * execute the `callback` each time an event is triggered.
     * @param  { String } event - event id
     * @param  { Function } fn - callback function
     * @returns { Object } el
     */
    on: {
      value: function(event, fn) {
        if (typeof fn == 'function')
          { (callbacks[event] = callbacks[event] || []).push(fn); }
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Removes the given `event` listeners
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    off: {
      value: function(event, fn) {
        if (event == '*' && !fn) { callbacks = {}; }
        else {
          if (fn) {
            var arr = callbacks[event];
            for (var i = 0, cb; cb = arr && arr[i]; ++i) {
              if (cb == fn) { arr.splice(i--, 1); }
            }
          } else { delete callbacks[event]; }
        }
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Listen to the given `event` and
     * execute the `callback` at most once
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    one: {
      value: function(event, fn) {
        function on() {
          el.off(event, on);
          fn.apply(el, arguments);
        }
        return el.on(event, on)
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Execute all callback functions that listen to
     * the given `event`
     * @param   { String } event - event id
     * @returns { Object } el
     */
    trigger: {
      value: function(event) {
        var arguments$1 = arguments;


        // getting the arguments
        var arglen = arguments.length - 1,
          args = new Array(arglen),
          fns,
          fn,
          i;

        for (i = 0; i < arglen; i++) {
          args[i] = arguments$1[i + 1]; // skip first argument
        }

        fns = slice.call(callbacks[event] || [], 0);

        for (i = 0; fn = fns[i]; ++i) {
          fn.apply(el, args);
        }

        if (callbacks['*'] && event != '*')
          { el.trigger.apply(el, ['*', event].concat(args)); }

        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    }
  });

  return el

};

/**
 * Specialized function for looping an array-like collection with `each={}`
 * @param   { Array } list - collection of items
 * @param   {Function} fn - callback function
 * @returns { Array } the array looped
 */
function each(list, fn) {
  var len = list ? list.length : 0;
  var i = 0;
  for (; i < len; ++i) {
    fn(list[i], i);
  }
  return list
}

/**
 * Check whether an array contains an item
 * @param   { Array } array - target array
 * @param   { * } item - item to test
 * @returns { Boolean } -
 */
function contains(array, item) {
  return array.indexOf(item) !== -1
}

/**
 * Convert a string containing dashes to camel case
 * @param   { String } str - input string
 * @returns { String } my-string -> myString
 */
function toCamel(str) {
  return str.replace(/-(\w)/g, function (_, c) { return c.toUpperCase(); })
}

/**
 * Faster String startsWith alternative
 * @param   { String } str - source string
 * @param   { String } value - test string
 * @returns { Boolean } -
 */
function startsWith(str, value) {
  return str.slice(0, value.length) === value
}

/**
 * Helper function to set an immutable property
 * @param   { Object } el - object where the new property will be set
 * @param   { String } key - object key where the new property will be stored
 * @param   { * } value - value of the new property
 * @param   { Object } options - set the propery overriding the default options
 * @returns { Object } - the initial object
 */
function defineProperty(el, key, value, options) {
  Object.defineProperty(el, key, extend({
    value: value,
    enumerable: false,
    writable: false,
    configurable: true
  }, options));
  return el
}

/**
 * Extend any object with other properties
 * @param   { Object } src - source object
 * @returns { Object } the resulting extended object
 *
 * var obj = { foo: 'baz' }
 * extend(obj, {bar: 'bar', foo: 'bar'})
 * console.log(obj) => {bar: 'bar', foo: 'bar'}
 *
 */
function extend(src) {
  var obj, args = arguments;
  for (var i = 1; i < args.length; ++i) {
    if (obj = args[i]) {
      for (var key in obj) {
        // check if this property of the source object could be overridden
        if (isWritable(src, key))
          { src[key] = obj[key]; }
      }
    }
  }
  return src
}

var misc = Object.freeze({
	each: each,
	contains: contains,
	toCamel: toCamel,
	startsWith: startsWith,
	defineProperty: defineProperty,
	extend: extend
});

var settings$1 = extend(Object.create(brackets.settings), {
  skipAnonymousTags: true
});

/**
 * Trigger DOM events
 * @param   { HTMLElement } dom - dom element target of the event
 * @param   { Function } handler - user function
 * @param   { Object } e - event object
 */
function handleEvent(dom, handler, e) {
  var ptag = this.__.parent,
    item = this.__.item;

  if (!item)
    { while (ptag && !item) {
      item = ptag.__.item;
      ptag = ptag.__.parent;
    } }

  // override the event properties
  /* istanbul ignore next */
  if (isWritable(e, 'currentTarget')) { e.currentTarget = dom; }
  /* istanbul ignore next */
  if (isWritable(e, 'target')) { e.target = e.srcElement; }
  /* istanbul ignore next */
  if (isWritable(e, 'which')) { e.which = e.charCode || e.keyCode; }

  e.item = item;

  handler.call(this, e);

  if (!e.preventUpdate) {
    var p = getImmediateCustomParentTag(this);
    // fixes #2083
    if (p.isMounted) { p.update(); }
  }
}

/**
 * Attach an event to a DOM node
 * @param { String } name - event name
 * @param { Function } handler - event callback
 * @param { Object } dom - dom node
 * @param { Tag } tag - tag instance
 */
function setEventHandler(name, handler, dom, tag) {
  var eventName,
    cb = handleEvent.bind(tag, dom, handler);

  // avoid to bind twice the same event
  // possible fix for #2332
  dom[name] = null;

  // normalize event name
  eventName = name.replace(RE_EVENTS_PREFIX, '');

  // cache the listener into the listeners array
  if (!contains(tag.__.listeners, dom)) { tag.__.listeners.push(dom); }
  if (!dom[RIOT_EVENTS_KEY]) { dom[RIOT_EVENTS_KEY] = {}; }
  if (dom[RIOT_EVENTS_KEY][name]) { dom.removeEventListener(eventName, dom[RIOT_EVENTS_KEY][name]); }

  dom[RIOT_EVENTS_KEY][name] = cb;
  dom.addEventListener(eventName, cb, false);
}

/**
 * Update dynamically created data-is tags with changing expressions
 * @param { Object } expr - expression tag and expression info
 * @param { Tag }    parent - parent for tag creation
 * @param { String } tagName - tag implementation we want to use
 */
function updateDataIs(expr, parent, tagName) {
  var conf, isVirtual, head, ref;

  if (expr.tag && expr.tagName === tagName) {
    expr.tag.update();
    return
  }

  isVirtual = expr.dom.tagName === 'VIRTUAL';
  // sync _parent to accommodate changing tagnames
  if (expr.tag) {
    // need placeholder before unmount
    if(isVirtual) {
      head = expr.tag.__.head;
      ref = createDOMPlaceholder();
      head.parentNode.insertBefore(ref, head);
    }

    expr.tag.unmount(true);
  }

  if (!isString(tagName)) { return }

  expr.impl = __TAG_IMPL[tagName];
  conf = {root: expr.dom, parent: parent, hasImpl: true, tagName: tagName};
  expr.tag = initChildTag(expr.impl, conf, expr.dom.innerHTML, parent);
  each(expr.attrs, function (a) { return setAttr(expr.tag.root, a.name, a.value); });
  expr.tagName = tagName;
  expr.tag.mount();
  if (isVirtual)
    { makeReplaceVirtual(expr.tag, ref || expr.tag.root); } // root exist first time, after use placeholder

  // parent is the placeholder tag, not the dynamic tag so clean up
  parent.__.onUnmount = function() {
    var delName = expr.tag.opts.dataIs,
      tags = expr.tag.parent.tags,
      _tags = expr.tag.__.parent.tags;
    arrayishRemove(tags, delName, expr.tag);
    arrayishRemove(_tags, delName, expr.tag);
    expr.tag.unmount();
  };
}

/**
 * Nomalize any attribute removing the "riot-" prefix
 * @param   { String } attrName - original attribute name
 * @returns { String } valid html attribute name
 */
function normalizeAttrName(attrName) {
  if (!attrName) { return null }
  attrName = attrName.replace(ATTRS_PREFIX, '');
  if (CASE_SENSITIVE_ATTRIBUTES[attrName]) { attrName = CASE_SENSITIVE_ATTRIBUTES[attrName]; }
  return attrName
}

/**
 * Update on single tag expression
 * @this Tag
 * @param { Object } expr - expression logic
 * @returns { undefined }
 */
function updateExpression(expr) {
  if (this.root && getAttr(this.root,'virtualized')) { return }

  var dom = expr.dom,
    // remove the riot- prefix
    attrName = normalizeAttrName(expr.attr),
    isToggle = contains([SHOW_DIRECTIVE, HIDE_DIRECTIVE], attrName),
    isVirtual = expr.root && expr.root.tagName === 'VIRTUAL',
    parent = dom && (expr.parent || dom.parentNode),
    // detect the style attributes
    isStyleAttr = attrName === 'style',
    isClassAttr = attrName === 'class',
    hasValue,
    isObj,
    value;

  // if it's a tag we could totally skip the rest
  if (expr._riot_id) {
    if (expr.isMounted) {
      expr.update();
    // if it hasn't been mounted yet, do that now.
    } else {
      expr.mount();
      if (isVirtual) {
        makeReplaceVirtual(expr, expr.root);
      }
    }
    return
  }
  // if this expression has the update method it means it can handle the DOM changes by itself
  if (expr.update) { return expr.update() }

  // ...it seems to be a simple expression so we try to calculat its value
  value = tmpl(expr.expr, isToggle ? extend(Object.create(this.parent), this) : this);
  hasValue = !isBlank(value);
  isObj = isObject(value);

  // convert the style/class objects to strings
  if (isObj) {
    isObj = !isClassAttr && !isStyleAttr;
    if (isClassAttr) {
      value = tmpl(JSON.stringify(value), this);
    } else if (isStyleAttr) {
      value = styleObjectToString(value);
    }
  }

  // remove original attribute
  if (expr.attr && (!expr.isAttrRemoved || !hasValue)) {
    remAttr(dom, expr.attr);
    expr.isAttrRemoved = true;
  }

  // for the boolean attributes we don't need the value
  // we can convert it to checked=true to checked=checked
  if (expr.bool) { value = value ? attrName : false; }
  if (expr.isRtag) { return updateDataIs(expr, this, value) }
  if (expr.wasParsedOnce && expr.value === value) { return }

  // update the expression value
  expr.value = value;
  expr.wasParsedOnce = true;

  // if the value is an object we can not do much more with it
  if (isObj && !isToggle) { return }
  // avoid to render undefined/null values
  if (isBlank(value)) { value = ''; }

  // textarea and text nodes have no attribute name
  if (!attrName) {
    // about #815 w/o replace: the browser converts the value to a string,
    // the comparison by "==" does too, but not in the server
    value += '';
    // test for parent avoids error with invalid assignment to nodeValue
    if (parent) {
      // cache the parent node because somehow it will become null on IE
      // on the next iteration
      expr.parent = parent;
      if (parent.tagName === 'TEXTAREA') {
        parent.value = value;                    // #1113
        if (!IE_VERSION) { dom.nodeValue = value; }  // #1625 IE throws here, nodeValue
      }                                         // will be available on 'updated'
      else { dom.nodeValue = value; }
    }
    return
  }


  // event handler
  if (isFunction(value)) {
    setEventHandler(attrName, value, dom, this);
  // show / hide
  } else if (isToggle) {
    toggleVisibility(dom, attrName === HIDE_DIRECTIVE ? !value : value);
  // handle attributes
  } else {
    if (expr.bool) {
      dom[attrName] = value;
    }

    if (attrName === 'value' && dom.value !== value) {
      dom.value = value;
    }

    if (hasValue && value !== false) {
      setAttr(dom, attrName, value);
    }

    // make sure that in case of style changes
    // the element stays hidden
    if (isStyleAttr && dom.hidden) { toggleVisibility(dom, false); }
  }
}

/**
 * Update all the expressions in a Tag instance
 * @this Tag
 * @param { Array } expressions - expression that must be re evaluated
 */
function updateAllExpressions(expressions) {
  each(expressions, updateExpression.bind(this));
}

var IfExpr = {
  init: function init(dom, tag, expr) {
    remAttr(dom, CONDITIONAL_DIRECTIVE);
    this.tag = tag;
    this.expr = expr;
    this.stub = document.createTextNode('');
    this.pristine = dom;

    var p = dom.parentNode;
    p.insertBefore(this.stub, dom);
    p.removeChild(dom);

    return this
  },
  update: function update() {
    this.value = tmpl(this.expr, this.tag);

    if (this.value && !this.current) { // insert
      this.current = this.pristine.cloneNode(true);
      this.stub.parentNode.insertBefore(this.current, this.stub);
      this.expressions = [];
      parseExpressions.apply(this.tag, [this.current, this.expressions, true]);
    } else if (!this.value && this.current) { // remove
      unmountAll(this.expressions);
      if (this.current._tag) {
        this.current._tag.unmount();
      } else if (this.current.parentNode) {
        this.current.parentNode.removeChild(this.current);
      }
      this.current = null;
      this.expressions = [];
    }

    if (this.value) { updateAllExpressions.call(this.tag, this.expressions); }
  },
  unmount: function unmount() {
    unmountAll(this.expressions || []);
    delete this.pristine;
    delete this.parentNode;
    delete this.stub;
  }
};

var RefExpr = {
  init: function init(dom, parent, attrName, attrValue) {
    this.dom = dom;
    this.attr = attrName;
    this.rawValue = attrValue;
    this.parent = parent;
    this.hasExp = tmpl.hasExpr(attrValue);
    return this
  },
  update: function update() {
    var old = this.value;
    var customParent = this.parent && getImmediateCustomParentTag(this.parent);
    // if the referenced element is a custom tag, then we set the tag itself, rather than DOM
    var tagOrDom = this.tag || this.dom;

    this.value = this.hasExp ? tmpl(this.rawValue, this.parent) : this.rawValue;

    // the name changed, so we need to remove it from the old key (if present)
    if (!isBlank(old) && customParent) { arrayishRemove(customParent.refs, old, tagOrDom); }
    if (!isBlank(this.value)) {
      // add it to the refs of parent tag (this behavior was changed >=3.0)
      if (customParent) { arrayishAdd(
        customParent.refs,
        this.value,
        tagOrDom,
        // use an array if it's a looped node and the ref is not an expression
        null,
        this.parent.__.index
      ); }
    }

    // if it's the first time we pass here let's remove the ref attribute
    // #2329
    if (!old) { remAttr(this.dom, this.attr); }
  },
  unmount: function unmount() {
    var tagOrDom = this.tag || this.dom;
    var customParent = this.parent && getImmediateCustomParentTag(this.parent);
    if (!isBlank(this.value) && customParent)
      { arrayishRemove(customParent.refs, this.value, tagOrDom); }
    delete this.dom;
    delete this.parent;
  }
};

/**
 * Convert the item looped into an object used to extend the child tag properties
 * @param   { Object } expr - object containing the keys used to extend the children tags
 * @param   { * } key - value to assign to the new object returned
 * @param   { * } val - value containing the position of the item in the array
 * @param   { Object } base - prototype object for the new item
 * @returns { Object } - new object containing the values of the original item
 *
 * The variables 'key' and 'val' are arbitrary.
 * They depend on the collection type looped (Array, Object)
 * and on the expression used on the each tag
 *
 */
function mkitem(expr, key, val, base) {
  var item = base ? Object.create(base) : {};
  item[expr.key] = key;
  if (expr.pos) { item[expr.pos] = val; }
  return item
}

/**
 * Unmount the redundant tags
 * @param   { Array } items - array containing the current items to loop
 * @param   { Array } tags - array containing all the children tags
 */
function unmountRedundant(items, tags) {
  var i = tags.length,
    j = items.length;

  while (i > j) {
    i--;
    remove.apply(tags[i], [tags, i]);
  }
}


/**
 * Remove a child tag
 * @this Tag
 * @param   { Array } tags - tags collection
 * @param   { Number } i - index of the tag to remove
 */
function remove(tags, i) {
  tags.splice(i, 1);
  this.unmount();
  arrayishRemove(this.parent, this, this.__.tagName, true);
}

/**
 * Move the nested custom tags in non custom loop tags
 * @this Tag
 * @param   { Number } i - current position of the loop tag
 */
function moveNestedTags(i) {
  var this$1 = this;

  each(Object.keys(this.tags), function (tagName) {
    moveChildTag.apply(this$1.tags[tagName], [tagName, i]);
  });
}

/**
 * Move a child tag
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to move
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function move(root, nextTag, isVirtual) {
  if (isVirtual)
    { moveVirtual.apply(this, [root, nextTag]); }
  else
    { safeInsert(root, this.root, nextTag.root); }
}

/**
 * Insert and mount a child tag
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to insert
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function insert(root, nextTag, isVirtual) {
  if (isVirtual)
    { makeVirtual.apply(this, [root, nextTag]); }
  else
    { safeInsert(root, this.root, nextTag.root); }
}

/**
 * Append a new tag into the DOM
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function append(root, isVirtual) {
  if (isVirtual)
    { makeVirtual.call(this, root); }
  else
    { root.appendChild(this.root); }
}

/**
 * Manage tags having the 'each'
 * @param   { HTMLElement } dom - DOM node we need to loop
 * @param   { Tag } parent - parent tag instance where the dom node is contained
 * @param   { String } expr - string contained in the 'each' attribute
 * @returns { Object } expression object for this each loop
 */
function _each(dom, parent, expr) {

  // remove the each property from the original tag
  remAttr(dom, LOOP_DIRECTIVE);

  var mustReorder = typeof getAttr(dom, LOOP_NO_REORDER_DIRECTIVE) !== T_STRING || remAttr(dom, LOOP_NO_REORDER_DIRECTIVE),
    tagName = getTagName(dom),
    impl = __TAG_IMPL[tagName],
    parentNode = dom.parentNode,
    placeholder = createDOMPlaceholder(),
    child = getTag(dom),
    ifExpr = getAttr(dom, CONDITIONAL_DIRECTIVE),
    tags = [],
    oldItems = [],
    hasKeys,
    isLoop = true,
    isAnonymous = !__TAG_IMPL[tagName],
    isVirtual = dom.tagName === 'VIRTUAL';

  // parse the each expression
  expr = tmpl.loopKeys(expr);
  expr.isLoop = true;

  if (ifExpr) { remAttr(dom, CONDITIONAL_DIRECTIVE); }

  // insert a marked where the loop tags will be injected
  parentNode.insertBefore(placeholder, dom);
  parentNode.removeChild(dom);

  expr.update = function updateEach() {
    // get the new items collection
    expr.value = tmpl(expr.val, parent);

    var frag = createFrag(),
      items = expr.value,
      isObject$$1 = !isArray(items) && !isString(items),
      root = placeholder.parentNode;

    // if this DOM was removed the update here is useless
    // this condition fixes also a weird async issue on IE in our unit test
    if (!root) { return }

    // object loop. any changes cause full redraw
    if (isObject$$1) {
      hasKeys = items || false;
      items = hasKeys ?
        Object.keys(items).map(function (key) {
          return mkitem(expr, items[key], key)
        }) : [];
    } else {
      hasKeys = false;
    }

    if (ifExpr) {
      items = items.filter(function(item, i) {
        if (expr.key && !isObject$$1)
          { return !!tmpl(ifExpr, mkitem(expr, item, i, parent)) }

        return !!tmpl(ifExpr, extend(Object.create(parent), item))
      });
    }

    // loop all the new items
    each(items, function(item, i) {
      // reorder only if the items are objects
      var
        doReorder = mustReorder && typeof item === T_OBJECT && !hasKeys,
        oldPos = oldItems.indexOf(item),
        isNew = oldPos === -1,
        pos = !isNew && doReorder ? oldPos : i,
        // does a tag exist in this position?
        tag = tags[pos],
        mustAppend = i >= oldItems.length,
        mustCreate =  doReorder && isNew || !doReorder && !tag;

      item = !hasKeys && expr.key ? mkitem(expr, item, i) : item;

      // new tag
      if (mustCreate) {
        tag = new Tag$1(impl, {
          parent: parent,
          isLoop: isLoop,
          isAnonymous: isAnonymous,
          tagName: tagName,
          root: dom.cloneNode(isAnonymous),
          item: item,
          index: i,
        }, dom.innerHTML);

        // mount the tag
        tag.mount();

        if (mustAppend)
          { append.apply(tag, [frag || root, isVirtual]); }
        else
          { insert.apply(tag, [root, tags[i], isVirtual]); }

        if (!mustAppend) { oldItems.splice(i, 0, item); }
        tags.splice(i, 0, tag);
        if (child) { arrayishAdd(parent.tags, tagName, tag, true); }
      } else if (pos !== i && doReorder) {
        // move
        if (contains(items, oldItems[pos])) {
          move.apply(tag, [root, tags[i], isVirtual]);
          // move the old tag instance
          tags.splice(i, 0, tags.splice(pos, 1)[0]);
          // move the old item
          oldItems.splice(i, 0, oldItems.splice(pos, 1)[0]);
        }

        // update the position attribute if it exists
        if (expr.pos) { tag[expr.pos] = i; }

        // if the loop tags are not custom
        // we need to move all their custom tags into the right position
        if (!child && tag.tags) { moveNestedTags.call(tag, i); }
      }

      // cache the original item to use it in the events bound to this node
      // and its children
      tag.__.item = item;
      tag.__.index = i;
      tag.__.parent = parent;

      if (!mustCreate) { tag.update(item); }
    });

    // remove the redundant tags
    unmountRedundant(items, tags);

    // clone the items array
    oldItems = items.slice();

    // this condition is weird u
    root.insertBefore(frag, placeholder);
  };

  expr.unmount = function() {
    each(tags, function(t) { t.unmount(); });
  };

  return expr
}

/**
 * Walk the tag DOM to detect the expressions to evaluate
 * @this Tag
 * @param   { HTMLElement } root - root tag where we will start digging the expressions
 * @param   { Array } expressions - empty array where the expressions will be added
 * @param   { Boolean } mustIncludeRoot - flag to decide whether the root must be parsed as well
 * @returns { Object } an object containing the root noode and the dom tree
 */
function parseExpressions(root, expressions, mustIncludeRoot) {
  var this$1 = this;

  var tree = {parent: {children: expressions}};

  walkNodes(root, function (dom, ctx) {
    var type = dom.nodeType, parent = ctx.parent, attr, expr, tagImpl;
    if (!mustIncludeRoot && dom === root) { return {parent: parent} }

    // text node
    if (type === 3 && dom.parentNode.tagName !== 'STYLE' && tmpl.hasExpr(dom.nodeValue))
      { parent.children.push({dom: dom, expr: dom.nodeValue}); }

    if (type !== 1) { return ctx } // not an element

    var isVirtual = dom.tagName === 'VIRTUAL';

    // loop. each does it's own thing (for now)
    if (attr = getAttr(dom, LOOP_DIRECTIVE)) {
      if(isVirtual) { setAttr(dom, 'loopVirtual', true); } // ignore here, handled in _each
      parent.children.push(_each(dom, this$1, attr));
      return false
    }

    // if-attrs become the new parent. Any following expressions (either on the current
    // element, or below it) become children of this expression.
    if (attr = getAttr(dom, CONDITIONAL_DIRECTIVE)) {
      parent.children.push(Object.create(IfExpr).init(dom, this$1, attr));
      return false
    }

    if (expr = getAttr(dom, IS_DIRECTIVE)) {
      if (tmpl.hasExpr(expr)) {
        parent.children.push({isRtag: true, expr: expr, dom: dom, attrs: [].slice.call(dom.attributes)});
        return false
      }
    }

    // if this is a tag, stop traversing here.
    // we ignore the root, since parseExpressions is called while we're mounting that root
    tagImpl = getTag(dom);
    if(isVirtual) {
      if(getAttr(dom, 'virtualized')) {dom.parentElement.removeChild(dom); } // tag created, remove from dom
      if(!tagImpl && !getAttr(dom, 'virtualized') && !getAttr(dom, 'loopVirtual'))  // ok to create virtual tag
        { tagImpl = { tmpl: dom.outerHTML }; }
    }

    if (tagImpl && (dom !== root || mustIncludeRoot)) {
      if(isVirtual && !getAttr(dom, IS_DIRECTIVE)) { // handled in update
        // can not remove attribute like directives
        // so flag for removal after creation to prevent maximum stack error
        setAttr(dom, 'virtualized', true);

        var tag = new Tag$1({ tmpl: dom.outerHTML },
          {root: dom, parent: this$1},
          dom.innerHTML);
        parent.children.push(tag); // no return, anonymous tag, keep parsing
      } else {
        var conf = {root: dom, parent: this$1, hasImpl: true};
        parent.children.push(initChildTag(tagImpl, conf, dom.innerHTML, this$1));
        return false
      }
    }

    // attribute expressions
    parseAttributes.apply(this$1, [dom, dom.attributes, function(attr, expr) {
      if (!expr) { return }
      parent.children.push(expr);
    }]);

    // whatever the parent is, all child elements get the same parent.
    // If this element had an if-attr, that's the parent for all child elements
    return {parent: parent}
  }, tree);
}

/**
 * Calls `fn` for every attribute on an element. If that attr has an expression,
 * it is also passed to fn.
 * @this Tag
 * @param   { HTMLElement } dom - dom node to parse
 * @param   { Array } attrs - array of attributes
 * @param   { Function } fn - callback to exec on any iteration
 */
function parseAttributes(dom, attrs, fn) {
  var this$1 = this;

  each(attrs, function (attr) {
    var name = attr.name, bool = isBoolAttr(name), expr;

    if (contains(REF_DIRECTIVES, name)) {
      expr =  Object.create(RefExpr).init(dom, this$1, name, attr.value);
    } else if (tmpl.hasExpr(attr.value)) {
      expr = {dom: dom, expr: attr.value, attr: name, bool: bool};
    }

    fn(attr, expr);
  });
}

/*
  Includes hacks needed for the Internet Explorer version 9 and below
  See: http://kangax.github.io/compat-table/es5/#ie8
       http://codeplanet.io/dropping-ie8/
*/

var reHasYield  = /<yield\b/i;
var reYieldAll  = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig;
var reYieldSrc  = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig;
var reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig;
var rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' };
var tblTags = IE_VERSION && IE_VERSION < 10 ? RE_SPECIAL_TAGS : RE_SPECIAL_TAGS_NO_OPTION;
var GENERIC = 'div';


/*
  Creates the root element for table or select child elements:
  tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
*/
function specialTags(el, tmpl, tagName) {

  var
    select = tagName[0] === 'o',
    parent = select ? 'select>' : 'table>';

  // trim() is important here, this ensures we don't have artifacts,
  // so we can check if we have only one element inside the parent
  el.innerHTML = '<' + parent + tmpl.trim() + '</' + parent;
  parent = el.firstChild;

  // returns the immediate parent if tr/th/td/col is the only element, if not
  // returns the whole tree, as this can include additional elements
  /* istanbul ignore next */
  if (select) {
    parent.selectedIndex = -1;  // for IE9, compatible w/current riot behavior
  } else {
    // avoids insertion of cointainer inside container (ex: tbody inside tbody)
    var tname = rootEls[tagName];
    if (tname && parent.childElementCount === 1) { parent = $(tname, parent); }
  }
  return parent
}

/*
  Replace the yield tag from any tag template with the innerHTML of the
  original tag in the page
*/
function replaceYield(tmpl, html) {
  // do nothing if no yield
  if (!reHasYield.test(tmpl)) { return tmpl }

  // be careful with #1343 - string on the source having `$1`
  var src = {};

  html = html && html.replace(reYieldSrc, function (_, ref, text) {
    src[ref] = src[ref] || text;   // preserve first definition
    return ''
  }).trim();

  return tmpl
    .replace(reYieldDest, function (_, ref, def) {  // yield with from - to attrs
      return src[ref] || def || ''
    })
    .replace(reYieldAll, function (_, def) {        // yield without any "from"
      return html || def || ''
    })
}

/**
 * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
 * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
 *
 * @param   { String } tmpl  - The template coming from the custom tag definition
 * @param   { String } html - HTML content that comes from the DOM element where you
 *           will mount the tag, mostly the original tag in the page
 * @returns { HTMLElement } DOM element with _tmpl_ merged through `YIELD` with the _html_.
 */
function mkdom(tmpl, html) {
  var match   = tmpl && tmpl.match(/^\s*<([-\w]+)/),
    tagName = match && match[1].toLowerCase(),
    el = mkEl(GENERIC);

  // replace all the yield tags with the tag inner html
  tmpl = replaceYield(tmpl, html);

  /* istanbul ignore next */
  if (tblTags.test(tagName))
    { el = specialTags(el, tmpl, tagName); }
  else
    { setInnerHTML(el, tmpl); }

  return el
}

/**
 * Another way to create a riot tag a bit more es6 friendly
 * @param { HTMLElement } el - tag DOM selector or DOM node/s
 * @param { Object } opts - tag logic
 * @returns { Tag } new riot tag instance
 */
function Tag$2(el, opts) {
  // get the tag properties from the class constructor
  var ref = this;
  var name = ref.name;
  var tmpl = ref.tmpl;
  var css = ref.css;
  var attrs = ref.attrs;
  var onCreate = ref.onCreate;
  // register a new tag and cache the class prototype
  if (!__TAG_IMPL[name]) {
    tag$1(name, tmpl, css, attrs, onCreate);
    // cache the class constructor
    __TAG_IMPL[name].class = this.constructor;
  }

  // mount the tag using the class instance
  mountTo(el, name, opts, this);
  // inject the component css
  if (css) { styleManager.inject(); }

  return this
}

/**
 * Create a new riot tag implementation
 * @param   { String }   name - name/id of the new riot tag
 * @param   { String }   tmpl - tag template
 * @param   { String }   css - custom tag css
 * @param   { String }   attrs - root tag attributes
 * @param   { Function } fn - user function
 * @returns { String } name/id of the tag just created
 */
function tag$1(name, tmpl, css, attrs, fn) {
  if (isFunction(attrs)) {
    fn = attrs;

    if (/^[\w\-]+\s?=/.test(css)) {
      attrs = css;
      css = '';
    } else
      { attrs = ''; }
  }

  if (css) {
    if (isFunction(css))
      { fn = css; }
    else
      { styleManager.add(css); }
  }

  name = name.toLowerCase();
  __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

  return name
}

/**
 * Create a new riot tag implementation (for use by the compiler)
 * @param   { String }   name - name/id of the new riot tag
 * @param   { String }   tmpl - tag template
 * @param   { String }   css - custom tag css
 * @param   { String }   attrs - root tag attributes
 * @param   { Function } fn - user function
 * @returns { String } name/id of the tag just created
 */
function tag2$1(name, tmpl, css, attrs, fn) {
  if (css) { styleManager.add(css, name); }

  __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

  return name
}

/**
 * Mount a tag using a specific tag implementation
 * @param   { * } selector - tag DOM selector or DOM node/s
 * @param   { String } tagName - tag implementation name
 * @param   { Object } opts - tag logic
 * @returns { Array } new tags instances
 */
function mount$1(selector, tagName, opts) {
  var tags = [];

  function pushTagsTo(root) {
    if (root.tagName) {
      var riotTag = getAttr(root, IS_DIRECTIVE);

      // have tagName? force riot-tag to be the same
      if (tagName && riotTag !== tagName) {
        riotTag = tagName;
        setAttr(root, IS_DIRECTIVE, tagName);
      }

      var tag = mountTo(root, riotTag || root.tagName.toLowerCase(), opts);

      if (tag)
        { tags.push(tag); }
    } else if (root.length)
      { each(root, pushTagsTo); } // assume nodeList
  }

  // inject styles into DOM
  styleManager.inject();

  if (isObject(tagName)) {
    opts = tagName;
    tagName = 0;
  }

  var elem;
  var allTags;

  // crawl the DOM to find the tag
  if (isString(selector)) {
    selector = selector === '*' ?
      // select all registered tags
      // & tags found with the riot-tag attribute set
      allTags = selectTags() :
      // or just the ones named like the selector
      selector + selectTags(selector.split(/, */));

    // make sure to pass always a selector
    // to the querySelectorAll function
    elem = selector ? $$(selector) : [];
  }
  else
    // probably you have passed already a tag or a NodeList
    { elem = selector; }

  // select all the registered and mount them inside their root elements
  if (tagName === '*') {
    // get all custom tags
    tagName = allTags || selectTags();
    // if the root els it's just a single tag
    if (elem.tagName)
      { elem = $$(tagName, elem); }
    else {
      // select all the children for all the different root elements
      var nodeList = [];

      each(elem, function (_el) { return nodeList.push($$(tagName, _el)); });

      elem = nodeList;
    }
    // get rid of the tagName
    tagName = 0;
  }

  pushTagsTo(elem);

  return tags
}

// Create a mixin that could be globally shared across all the tags
var mixins = {};
var globals = mixins[GLOBAL_MIXIN] = {};
var mixins_id = 0;

/**
 * Create/Return a mixin by its name
 * @param   { String }  name - mixin name (global mixin if object)
 * @param   { Object }  mix - mixin logic
 * @param   { Boolean } g - is global?
 * @returns { Object }  the mixin logic
 */
function mixin$1(name, mix, g) {
  // Unnamed global
  if (isObject(name)) {
    mixin$1(("__unnamed_" + (mixins_id++)), name, true);
    return
  }

  var store = g ? globals : mixins;

  // Getter
  if (!mix) {
    if (isUndefined(store[name]))
      { throw new Error('Unregistered mixin: ' + name) }

    return store[name]
  }

  // Setter
  store[name] = isFunction(mix) ?
    extend(mix.prototype, store[name] || {}) && mix :
    extend(store[name] || {}, mix);
}

/**
 * Update all the tags instances created
 * @returns { Array } all the tags instances
 */
function update$1() {
  return each(__TAGS_CACHE, function (tag) { return tag.update(); })
}

function unregister$1(name) {
  delete __TAG_IMPL[name];
}

var version$1 = 'v3.4.4';


var core = Object.freeze({
	Tag: Tag$2,
	tag: tag$1,
	tag2: tag2$1,
	mount: mount$1,
	mixin: mixin$1,
	update: update$1,
	unregister: unregister$1,
	version: version$1
});

// counter to give a unique id to all the Tag instances
var __uid = 0;

/**
 * We need to update opts for this tag. That requires updating the expressions
 * in any attributes on the tag, and then copying the result onto opts.
 * @this Tag
 * @param   {Boolean} isLoop - is it a loop tag?
 * @param   { Tag }  parent - parent tag node
 * @param   { Boolean }  isAnonymous - is it a tag without any impl? (a tag not registered)
 * @param   { Object }  opts - tag options
 * @param   { Array }  instAttrs - tag attributes array
 */
function updateOpts(isLoop, parent, isAnonymous, opts, instAttrs) {
  // isAnonymous `each` tags treat `dom` and `root` differently. In this case
  // (and only this case) we don't need to do updateOpts, because the regular parse
  // will update those attrs. Plus, isAnonymous tags don't need opts anyway
  if (isLoop && isAnonymous) { return }

  var ctx = !isAnonymous && isLoop ? this : parent || this;
  each(instAttrs, function (attr) {
    if (attr.expr) { updateAllExpressions.call(ctx, [attr.expr]); }
    // normalize the attribute names
    opts[toCamel(attr.name).replace(ATTRS_PREFIX, '')] = attr.expr ? attr.expr.value : attr.value;
  });
}


/**
 * Tag class
 * @constructor
 * @param { Object } impl - it contains the tag template, and logic
 * @param { Object } conf - tag options
 * @param { String } innerHTML - html that eventually we need to inject in the tag
 */
function Tag$1(impl, conf, innerHTML) {
  if ( impl === void 0 ) impl = {};
  if ( conf === void 0 ) conf = {};

  var opts = extend({}, conf.opts),
    parent = conf.parent,
    isLoop = conf.isLoop,
    isAnonymous = !!conf.isAnonymous,
    skipAnonymous = settings$1.skipAnonymousTags && isAnonymous,
    item = cleanUpData(conf.item),
    index = conf.index, // available only for the looped nodes
    instAttrs = [], // All attributes on the Tag when it's first parsed
    implAttrs = [], // expressions on this type of Tag
    expressions = [],
    root = conf.root,
    tagName = conf.tagName || getTagName(root),
    isVirtual = tagName === 'virtual',
    propsInSyncWithParent = [],
    dom;

  // make this tag observable
  if (!skipAnonymous) { observable$1(this); }
  // only call unmount if we have a valid __TAG_IMPL (has name property)
  if (impl.name && root._tag) { root._tag.unmount(true); }

  // not yet mounted
  this.isMounted = false;

  defineProperty(this, '__', {
    isAnonymous: isAnonymous,
    instAttrs: instAttrs,
    innerHTML: innerHTML,
    tagName: tagName,
    index: index,
    isLoop: isLoop,
    // tags having event listeners
    // it would be better to use weak maps here but we can not introduce breaking changes now
    listeners: [],
    // these vars will be needed only for the virtual tags
    virts: [],
    tail: null,
    head: null,
    parent: null,
    item: null
  });

  // create a unique id to this tag
  // it could be handy to use it also to improve the virtual dom rendering speed
  defineProperty(this, '_riot_id', ++__uid); // base 1 allows test !t._riot_id
  defineProperty(this, 'root', root);
  extend(this, { opts: opts }, item);
  // protect the "tags" and "refs" property from being overridden
  defineProperty(this, 'parent', parent || null);
  defineProperty(this, 'tags', {});
  defineProperty(this, 'refs', {});

  dom = isLoop && isAnonymous ? root : mkdom(impl.tmpl, innerHTML, isLoop);

  /**
   * Update the tag expressions and options
   * @param   { * }  data - data we want to use to extend the tag properties
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'update', function tagUpdate(data) {
    var nextOpts = {},
      canTrigger = this.isMounted && !skipAnonymous;

    // make sure the data passed will not override
    // the component core methods
    data = cleanUpData(data);
    extend(this, data);
    updateOpts.apply(this, [isLoop, parent, isAnonymous, nextOpts, instAttrs]);

    if (canTrigger && this.isMounted && isFunction(this.shouldUpdate) && !this.shouldUpdate(data, nextOpts)) {
      return this
    }

    // inherit properties from the parent, but only for isAnonymous tags
    if (isLoop && isAnonymous) { inheritFrom.apply(this, [this.parent, propsInSyncWithParent]); }
    extend(opts, nextOpts);
    if (canTrigger) { this.trigger('update', data); }
    updateAllExpressions.call(this, expressions);
    if (canTrigger) { this.trigger('updated'); }

    return this

  }.bind(this));

  /**
   * Add a mixin to this tag
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'mixin', function tagMixin() {
    var this$1 = this;

    each(arguments, function (mix) {
      var instance, obj;
      var props = [];

      // properties blacklisted and will not be bound to the tag instance
      var propsBlacklist = ['init', '__proto__'];

      mix = isString(mix) ? mixin$1(mix) : mix;

      // check if the mixin is a function
      if (isFunction(mix)) {
        // create the new mixin instance
        instance = new mix();
      } else { instance = mix; }

      var proto = Object.getPrototypeOf(instance);

      // build multilevel prototype inheritance chain property list
      do { props = props.concat(Object.getOwnPropertyNames(obj || instance)); }
      while (obj = Object.getPrototypeOf(obj || instance))

      // loop the keys in the function prototype or the all object keys
      each(props, function (key) {
        // bind methods to this
        // allow mixins to override other properties/parent mixins
        if (!contains(propsBlacklist, key)) {
          // check for getters/setters
          var descriptor = Object.getOwnPropertyDescriptor(instance, key) || Object.getOwnPropertyDescriptor(proto, key);
          var hasGetterSetter = descriptor && (descriptor.get || descriptor.set);

          // apply method only if it does not already exist on the instance
          if (!this$1.hasOwnProperty(key) && hasGetterSetter) {
            Object.defineProperty(this$1, key, descriptor);
          } else {
            this$1[key] = isFunction(instance[key]) ?
              instance[key].bind(this$1) :
              instance[key];
          }
        }
      });

      // init method will be called automatically
      if (instance.init)
        { instance.init.bind(this$1)(); }
    });
    return this
  }.bind(this));

  /**
   * Mount the current tag instance
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'mount', function tagMount() {
    var this$1 = this;

    root._tag = this; // keep a reference to the tag just created

    // Read all the attrs on this instance. This give us the info we need for updateOpts
    parseAttributes.apply(parent, [root, root.attributes, function (attr, expr) {
      if (!isAnonymous && RefExpr.isPrototypeOf(expr)) { expr.tag = this$1; }
      attr.expr = expr;
      instAttrs.push(attr);
    }]);

    // update the root adding custom attributes coming from the compiler
    implAttrs = [];
    walkAttrs(impl.attrs, function (k, v) { implAttrs.push({name: k, value: v}); });
    parseAttributes.apply(this, [root, implAttrs, function (attr, expr) {
      if (expr) { expressions.push(expr); }
      else { setAttr(root, attr.name, attr.value); }
    }]);

    // initialiation
    updateOpts.apply(this, [isLoop, parent, isAnonymous, opts, instAttrs]);

    // add global mixins
    var globalMixin = mixin$1(GLOBAL_MIXIN);

    if (globalMixin && !skipAnonymous) {
      for (var i in globalMixin) {
        if (globalMixin.hasOwnProperty(i)) {
          this$1.mixin(globalMixin[i]);
        }
      }
    }

    if (impl.fn) { impl.fn.call(this, opts); }

    if (!skipAnonymous) { this.trigger('before-mount'); }

    // parse layout after init. fn may calculate args for nested custom tags
    parseExpressions.apply(this, [dom, expressions, isAnonymous]);

    this.update(item);

    if (!isAnonymous) {
      while (dom.firstChild) { root.appendChild(dom.firstChild); }
    }

    defineProperty(this, 'root', root);
    defineProperty(this, 'isMounted', true);

    if (skipAnonymous) { return }

    // if it's not a child tag we can trigger its mount event
    if (!this.parent) {
      this.trigger('mount');
    }
    // otherwise we need to wait that the parent "mount" or "updated" event gets triggered
    else {
      var p = getImmediateCustomParentTag(this.parent);
      p.one(!p.isMounted ? 'mount' : 'updated', function () {
        this$1.trigger('mount');
      });
    }

    return this

  }.bind(this));

  /**
   * Unmount the tag instance
   * @param { Boolean } mustKeepRoot - if it's true the root node will not be removed
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'unmount', function tagUnmount(mustKeepRoot) {
    var this$1 = this;

    var el = this.root,
      p = el.parentNode,
      ptag,
      tagIndex = __TAGS_CACHE.indexOf(this);

    if (!skipAnonymous) { this.trigger('before-unmount'); }

    // clear all attributes coming from the mounted tag
    walkAttrs(impl.attrs, function (name) {
      if (startsWith(name, ATTRS_PREFIX))
        { name = name.slice(ATTRS_PREFIX.length); }
      remAttr(root, name);
    });

    // remove all the event listeners
    this.__.listeners.forEach(function (dom) {
      Object.keys(dom[RIOT_EVENTS_KEY]).forEach(function (eventName) {
        dom.removeEventListener(eventName, dom[RIOT_EVENTS_KEY][eventName]);
      });
    });

    // remove this tag instance from the global virtualDom variable
    if (tagIndex !== -1)
      { __TAGS_CACHE.splice(tagIndex, 1); }

    if (p || isVirtual) {
      if (parent) {
        ptag = getImmediateCustomParentTag(parent);

        if (isVirtual) {
          Object.keys(this.tags).forEach(function (tagName) {
            arrayishRemove(ptag.tags, tagName, this$1.tags[tagName]);
          });
        } else {
          arrayishRemove(ptag.tags, tagName, this);
          if(parent !== ptag) // remove from _parent too
            { arrayishRemove(parent.tags, tagName, this); }
        }
      } else {
        // remove the tag contents
        setInnerHTML(el, '');
      }

      if (p && !mustKeepRoot) { p.removeChild(el); }
    }

    if (this.__.virts) {
      each(this.__.virts, function (v) {
        if (v.parentNode) { v.parentNode.removeChild(v); }
      });
    }

    // allow expressions to unmount themselves
    unmountAll(expressions);
    each(instAttrs, function (a) { return a.expr && a.expr.unmount && a.expr.unmount(); });

    // custom internal unmount function to avoid relying on the observable
    if (this.__.onUnmount) { this.__.onUnmount(); }

    if (!skipAnonymous) {
      this.trigger('unmount');
      this.off('*');
    }

    defineProperty(this, 'isMounted', false);

    delete this.root._tag;

    return this

  }.bind(this));
}

/**
 * Detect the tag implementation by a DOM node
 * @param   { Object } dom - DOM node we need to parse to get its tag implementation
 * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
 */
function getTag(dom) {
  return dom.tagName && __TAG_IMPL[getAttr(dom, IS_DIRECTIVE) ||
    getAttr(dom, IS_DIRECTIVE) || dom.tagName.toLowerCase()]
}

/**
 * Inherit properties from a target tag instance
 * @this Tag
 * @param   { Tag } target - tag where we will inherit properties
 * @param   { Array } propsInSyncWithParent - array of properties to sync with the target
 */
function inheritFrom(target, propsInSyncWithParent) {
  var this$1 = this;

  each(Object.keys(target), function (k) {
    // some properties must be always in sync with the parent tag
    var mustSync = !isReservedName(k) && contains(propsInSyncWithParent, k);

    if (isUndefined(this$1[k]) || mustSync) {
      // track the property to keep in sync
      // so we can keep it updated
      if (!mustSync) { propsInSyncWithParent.push(k); }
      this$1[k] = target[k];
    }
  });
}

/**
 * Move the position of a custom tag in its parent tag
 * @this Tag
 * @param   { String } tagName - key where the tag was stored
 * @param   { Number } newPos - index where the new tag will be stored
 */
function moveChildTag(tagName, newPos) {
  var parent = this.parent,
    tags;
  // no parent no move
  if (!parent) { return }

  tags = parent.tags[tagName];

  if (isArray(tags))
    { tags.splice(newPos, 0, tags.splice(tags.indexOf(this), 1)[0]); }
  else { arrayishAdd(parent.tags, tagName, this); }
}

/**
 * Create a new child tag including it correctly into its parent
 * @param   { Object } child - child tag implementation
 * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
 * @param   { String } innerHTML - inner html of the child node
 * @param   { Object } parent - instance of the parent tag including the child custom tag
 * @returns { Object } instance of the new child tag just created
 */
function initChildTag(child, opts, innerHTML, parent) {
  var tag = new Tag$1(child, opts, innerHTML),
    tagName = opts.tagName || getTagName(opts.root, true),
    ptag = getImmediateCustomParentTag(parent);
  // fix for the parent attribute in the looped elements
  defineProperty(tag, 'parent', ptag);
  // store the real parent tag
  // in some cases this could be different from the custom parent tag
  // for example in nested loops
  tag.__.parent = parent;

  // add this tag to the custom parent tag
  arrayishAdd(ptag.tags, tagName, tag);

  // and also to the real parent tag
  if (ptag !== parent)
    { arrayishAdd(parent.tags, tagName, tag); }

  // empty the child node once we got its template
  // to avoid that its children get compiled multiple times
  opts.root.innerHTML = '';

  return tag
}

/**
 * Loop backward all the parents tree to detect the first custom parent tag
 * @param   { Object } tag - a Tag instance
 * @returns { Object } the instance of the first custom parent tag found
 */
function getImmediateCustomParentTag(tag) {
  var ptag = tag;
  while (ptag.__.isAnonymous) {
    if (!ptag.parent) { break }
    ptag = ptag.parent;
  }
  return ptag
}

/**
 * Trigger the unmount method on all the expressions
 * @param   { Array } expressions - DOM expressions
 */
function unmountAll(expressions) {
  each(expressions, function(expr) {
    if (expr instanceof Tag$1) { expr.unmount(true); }
    else if (expr.tagName) { expr.tag.unmount(true); }
    else if (expr.unmount) { expr.unmount(); }
  });
}

/**
 * Get the tag name of any DOM node
 * @param   { Object } dom - DOM node we want to parse
 * @param   { Boolean } skipDataIs - hack to ignore the data-is attribute when attaching to parent
 * @returns { String } name to identify this dom node in riot
 */
function getTagName(dom, skipDataIs) {
  var child = getTag(dom),
    namedTag = !skipDataIs && getAttr(dom, IS_DIRECTIVE);
  return namedTag && !tmpl.hasExpr(namedTag) ?
                namedTag :
              child ? child.name : dom.tagName.toLowerCase()
}

/**
 * With this function we avoid that the internal Tag methods get overridden
 * @param   { Object } data - options we want to use to extend the tag instance
 * @returns { Object } clean object without containing the riot internal reserved words
 */
function cleanUpData(data) {
  if (!(data instanceof Tag$1) && !(data && isFunction(data.trigger)))
    { return data }

  var o = {};
  for (var key in data) {
    if (!RE_RESERVED_NAMES.test(key)) { o[key] = data[key]; }
  }
  return o
}

/**
 * Set the property of an object for a given key. If something already
 * exists there, then it becomes an array containing both the old and new value.
 * @param { Object } obj - object on which to set the property
 * @param { String } key - property name
 * @param { Object } value - the value of the property to be set
 * @param { Boolean } ensureArray - ensure that the property remains an array
 * @param { Number } index - add the new item in a certain array position
 */
function arrayishAdd(obj, key, value, ensureArray, index) {
  var dest = obj[key];
  var isArr = isArray(dest);
  var hasIndex = !isUndefined(index);

  if (dest && dest === value) { return }

  // if the key was never set, set it once
  if (!dest && ensureArray) { obj[key] = [value]; }
  else if (!dest) { obj[key] = value; }
  // if it was an array and not yet set
  else {
    if (isArr) {
      var oldIndex = dest.indexOf(value);
      // this item never changed its position
      if (oldIndex === index) { return }
      // remove the item from its old position
      if (oldIndex !== -1) { dest.splice(oldIndex, 1); }
      // move or add the item
      if (hasIndex) {
        dest.splice(index, 0, value);
      } else {
        dest.push(value);
      }
    } else { obj[key] = [dest, value]; }
  }
}

/**
 * Removes an item from an object at a given key. If the key points to an array,
 * then the item is just removed from the array.
 * @param { Object } obj - object on which to remove the property
 * @param { String } key - property name
 * @param { Object } value - the value of the property to be removed
 * @param { Boolean } ensureArray - ensure that the property remains an array
*/
function arrayishRemove(obj, key, value, ensureArray) {
  if (isArray(obj[key])) {
    var index = obj[key].indexOf(value);
    if (index !== -1) { obj[key].splice(index, 1); }
    if (!obj[key].length) { delete obj[key]; }
    else if (obj[key].length === 1 && !ensureArray) { obj[key] = obj[key][0]; }
  } else
    { delete obj[key]; } // otherwise just delete the key
}

/**
 * Mount a tag creating new Tag instance
 * @param   { Object } root - dom node where the tag will be mounted
 * @param   { String } tagName - name of the riot tag we want to mount
 * @param   { Object } opts - options to pass to the Tag instance
 * @param   { Object } ctx - optional context that will be used to extend an existing class ( used in riot.Tag )
 * @returns { Tag } a new Tag instance
 */
function mountTo(root, tagName, opts, ctx) {
  var impl = __TAG_IMPL[tagName],
    implClass = __TAG_IMPL[tagName].class,
    tag = ctx || (implClass ? Object.create(implClass.prototype) : {}),
    // cache the inner HTML to fix #855
    innerHTML = root._innerHTML = root._innerHTML || root.innerHTML;

  // clear the inner html
  root.innerHTML = '';

  var conf = extend({ root: root, opts: opts }, { parent: opts ? opts.parent : null });

  if (impl && root) { Tag$1.apply(tag, [impl, conf, innerHTML]); }

  if (tag && tag.mount) {
    tag.mount(true);
    // add this tag to the virtualDom variable
    if (!contains(__TAGS_CACHE, tag)) { __TAGS_CACHE.push(tag); }
  }

  return tag
}

/**
 * makes a tag virtual and replaces a reference in the dom
 * @this Tag
 * @param { tag } the tag to make virtual
 * @param { ref } the dom reference location
 */
function makeReplaceVirtual(tag, ref) {
  var frag = createFrag();
  makeVirtual.call(tag, frag);
  ref.parentNode.replaceChild(frag, ref);
}

/**
 * Adds the elements for a virtual tag
 * @this Tag
 * @param { Node } src - the node that will do the inserting or appending
 * @param { Tag } target - only if inserting, insert before this tag's first child
 */
function makeVirtual(src, target) {
  var this$1 = this;

  var head = createDOMPlaceholder(),
    tail = createDOMPlaceholder(),
    frag = createFrag(),
    sib, el;

  this.root.insertBefore(head, this.root.firstChild);
  this.root.appendChild(tail);

  this.__.head = el = head;
  this.__.tail = tail;

  while (el) {
    sib = el.nextSibling;
    frag.appendChild(el);
    this$1.__.virts.push(el); // hold for unmounting
    el = sib;
  }

  if (target)
    { src.insertBefore(frag, target.__.head); }
  else
    { src.appendChild(frag); }
}

/**
 * Move virtual tag and all child nodes
 * @this Tag
 * @param { Node } src  - the node that will do the inserting
 * @param { Tag } target - insert before this tag's first child
 */
function moveVirtual(src, target) {
  var this$1 = this;

  var el = this.__.head,
    frag = createFrag(),
    sib;

  while (el) {
    sib = el.nextSibling;
    frag.appendChild(el);
    el = sib;
    if (el === this$1.__.tail) {
      frag.appendChild(el);
      src.insertBefore(frag, target.__.head);
      break
    }
  }
}

/**
 * Get selectors for tags
 * @param   { Array } tags - tag names to select
 * @returns { String } selector
 */
function selectTags(tags) {
  // select all tags
  if (!tags) {
    var keys = Object.keys(__TAG_IMPL);
    return keys + selectTags(keys)
  }

  return tags
    .filter(function (t) { return !/[^-\w]/.test(t); })
    .reduce(function (list, t) {
      var name = t.trim().toLowerCase();
      return list + ",[" + IS_DIRECTIVE + "=\"" + name + "\"]"
    }, '')
}


var tags = Object.freeze({
	getTag: getTag,
	inheritFrom: inheritFrom,
	moveChildTag: moveChildTag,
	initChildTag: initChildTag,
	getImmediateCustomParentTag: getImmediateCustomParentTag,
	unmountAll: unmountAll,
	getTagName: getTagName,
	cleanUpData: cleanUpData,
	arrayishAdd: arrayishAdd,
	arrayishRemove: arrayishRemove,
	mountTo: mountTo,
	makeReplaceVirtual: makeReplaceVirtual,
	makeVirtual: makeVirtual,
	moveVirtual: moveVirtual,
	selectTags: selectTags
});

/**
 * Riot public api
 */
var settings = settings$1;
var util = {
  tmpl: tmpl,
  brackets: brackets,
  styleManager: styleManager,
  vdom: __TAGS_CACHE,
  styleNode: styleManager.styleNode,
  // export the riot internal utils as well
  dom: dom,
  check: check,
  misc: misc,
  tags: tags
};

// export the core props/methods
var Tag$$1 = Tag$2;
var tag$$1 = tag$1;
var tag2$$1 = tag2$1;
var mount$$1 = mount$1;
var mixin$$1 = mixin$1;
var update$$1 = update$1;
var unregister$$1 = unregister$1;
var version$$1 = version$1;
var observable = observable$1;

var riot$1 = extend({}, core, {
  observable: observable$1,
  settings: settings,
  util: util,
});

exports.settings = settings;
exports.util = util;
exports.Tag = Tag$$1;
exports.tag = tag$$1;
exports.tag2 = tag2$$1;
exports.mount = mount$$1;
exports.mixin = mixin$$1;
exports.update = update$$1;
exports.unregister = unregister$$1;
exports.version = version$$1;
exports.observable = observable;
exports['default'] = riot$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? factory(exports, __webpack_require__(0)) :
	typeof define === 'function' && define.amd ? define(['exports', 'riot'], factory) :
	(factory((global.riotHotReload = global.riotHotReload || {}),global.riot));
}(this, (function (exports,riot) { 'use strict';

var nonState = 'isMounted opts'.split(' ');

function reload(name) {
  riot.util.styleManager.inject();

  var elems = document.querySelectorAll((name + ", [data-is=" + name + "]"));
  var tags = [];

  for (var i = 0; i < elems.length; i++) {
    var el = elems[i], oldTag = el._tag, v;
    reload.trigger('before-unmount', oldTag);
    oldTag.unmount(true); // detach the old tag

    // reset the innerHTML and attributes to how they were before mount
    el.innerHTML = oldTag.__.innerHTML;
    (oldTag.__.instAttrs || []).map(function(attr) {
      el.setAttribute(attr.name, attr.value);
    });

    // copy options for creating the new tag
    var newOpts = {};
    for(key in oldTag.opts) {
      newOpts[key] = oldTag.opts[key];
    }
    newOpts.parent = oldTag.parent;

    // create the new tag
    reload.trigger('before-mount', newOpts, oldTag);
    var newTag = riot.mount(el, newOpts)[0];

    // copy state from the old to new tag
    for(var key in oldTag) {
      v = oldTag[key];
      if (~nonState.indexOf(key)) { continue }
      newTag[key] = v;
    }
    newTag.update();
    tags.push(newTag);
    reload.trigger('after-mount', newTag, oldTag);
  }

  return tags
}

riot.observable(reload);
riot.reload = reload;
if (riot.default) { riot.default.reload = reload; }

exports.reload = reload;
exports['default'] = reload;

Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    //src: C:/dev/js/riotjs/webpack/app/random.tag
riot.tag2('random',
  '<h3>{opts.title}</h3> <button onclick="{generate}"> Generate </button> <h1> {number} </h1> <img src="svg-logo-h.svg" height="30"> <logs logs="{logs}" onclear="{clearLogs}"></logs>',
  '',
  '', function(opts) {
'use strict';

var _this = this;

__webpack_require__(4);

this.number = null;
this.logs = [];

this.generate = function (e) {
  _this.logs.push({ text: 'Generate button clicked. Even type is ' + e.type });
  _this.number = Math.floor(Math.random() * 10000);
};

this.clearLogs = function (e) {
  _this.logs = [];
};

this.generate({ type: 'custom' });
});

    
  if (false) {
    module.hot.accept()
    if (module.hot.data) {
      riot.reload('random')
    }
  }
  

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _riot = __webpack_require__(0);

var _riot2 = _interopRequireDefault(_riot);

__webpack_require__(1);

__webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_riot2.default.mount('random', {
  title: 'Hi there!'
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    //src: C:/dev/js/riotjs/webpack/app/logs.tag
riot.tag2('logs',
  '<h4>Logs</h4> <button onclick="{opts.onclear}"> Clear logs </button> <ul> <li each="{opts.logs}">{text}</li> </ul>',
  '',
  '', function(opts) {
});

    
  if (false) {
    module.hot.accept()
    if (module.hot.data) {
      riot.reload('logs')
    }
  }
  

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjAxNGMzNWJmN2UzODg3YzgxYjIiLCJ3ZWJwYWNrOi8vLy4vfi9yaW90L3Jpb3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yaW90LWhvdC1yZWxvYWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3JhbmRvbS50YWciLCJ3ZWJwYWNrOi8vLy4vYXBwL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2xvZ3MudGFnIl0sIm5hbWVzIjpbIm1vdW50IiwidGl0bGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQyxDQUFDLDRCQUE0Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxHQUFHLEdBQUc7QUFDL0QsaUNBQWlDO0FBQ2pDO0FBQ0EsMkNBQTJDOztBQUUzQztBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxJQUFJO0FBQ2pCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLElBQUk7QUFDakIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLElBQUk7QUFDakIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLElBQUk7QUFDakIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLElBQUk7QUFDZixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsSUFBSTtBQUNqQixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QixhQUFhLFNBQVM7QUFDdEIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEIsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsU0FBUztBQUN0QixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtB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QTs7QUFFQTtBQUNBLG1CQUFtQiwwREFBMEQ7QUFDN0U7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZSxpQkFBaUI7QUFDaEMsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDbENBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxlQUFLQSxLQUFMLENBQVcsUUFBWCxFQUFxQjtBQUNuQkMsU0FBTztBQURZLENBQXJCLEU7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsYUFBYSx3Q0FBd0MsVUFBVSxHQUFHLEtBQUs7QUFDMUc7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGYwMTRjMzViZjdlMzg4N2M4MWIyIiwiLyogUmlvdCB2My40LjQsIEBsaWNlbnNlIE1JVCAqL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuXHQoZmFjdG9yeSgoZ2xvYmFsLnJpb3QgPSBnbG9iYWwucmlvdCB8fCB7fSkpKTtcbn0odGhpcywgKGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxudmFyIF9fVEFHU19DQUNIRSA9IFtdO1xudmFyIF9fVEFHX0lNUEwgPSB7fTtcbnZhciBHTE9CQUxfTUlYSU4gPSAnX19nbG9iYWxfbWl4aW4nO1xudmFyIEFUVFJTX1BSRUZJWCA9ICdyaW90LSc7XG52YXIgUkVGX0RJUkVDVElWRVMgPSBbJ3JlZicsICdkYXRhLXJlZiddO1xudmFyIElTX0RJUkVDVElWRSA9ICdkYXRhLWlzJztcbnZhciBDT05ESVRJT05BTF9ESVJFQ1RJVkUgPSAnaWYnO1xudmFyIExPT1BfRElSRUNUSVZFID0gJ2VhY2gnO1xudmFyIExPT1BfTk9fUkVPUkRFUl9ESVJFQ1RJVkUgPSAnbm8tcmVvcmRlcic7XG52YXIgU0hPV19ESVJFQ1RJVkUgPSAnc2hvdyc7XG52YXIgSElERV9ESVJFQ1RJVkUgPSAnaGlkZSc7XG52YXIgUklPVF9FVkVOVFNfS0VZID0gJ19fcmlvdC1ldmVudHNfXyc7XG52YXIgVF9TVFJJTkcgPSAnc3RyaW5nJztcbnZhciBUX09CSkVDVCA9ICdvYmplY3QnO1xudmFyIFRfVU5ERUYgID0gJ3VuZGVmaW5lZCc7XG52YXIgVF9GVU5DVElPTiA9ICdmdW5jdGlvbic7XG52YXIgWExJTktfTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc7XG52YXIgWExJTktfUkVHRVggPSAvXnhsaW5rOihcXHcrKS87XG52YXIgV0lOID0gdHlwZW9mIHdpbmRvdyA9PT0gVF9VTkRFRiA/IHVuZGVmaW5lZCA6IHdpbmRvdztcbnZhciBSRV9TUEVDSUFMX1RBR1MgPSAvXig/OnQoPzpib2R5fGhlYWR8Zm9vdHxbcmhkXSl8Y2FwdGlvbnxjb2woPzpncm91cCk/fG9wdCg/Omlvbnxncm91cCkpJC87XG52YXIgUkVfU1BFQ0lBTF9UQUdTX05PX09QVElPTiA9IC9eKD86dCg/OmJvZHl8aGVhZHxmb290fFtyaGRdKXxjYXB0aW9ufGNvbCg/Omdyb3VwKT8pJC87XG52YXIgUkVfRVZFTlRTX1BSRUZJWCA9IC9eb24vO1xudmFyIFJFX1JFU0VSVkVEX05BTUVTID0gL14oPzpfKD86aXRlbXxpZHxwYXJlbnQpfHVwZGF0ZXxyb290fCg/OnVuKT9tb3VudHxtaXhpbnxpcyg/Ok1vdW50ZWR8TG9vcCl8dGFnc3xyZWZzfHBhcmVudHxvcHRzfHRyaWdnZXJ8byg/Om58ZmZ8bmUpKSQvO1xudmFyIFJFX0hUTUxfQVRUUlMgPSAvKFstXFx3XSspID89ID8oPzpcIihbXlwiXSopfCcoW14nXSopfCh7W159XSp9KSkvZztcbnZhciBDQVNFX1NFTlNJVElWRV9BVFRSSUJVVEVTID0geyAndmlld2JveCc6ICd2aWV3Qm94JyB9O1xudmFyIFJFX0JPT0xfQVRUUlMgPSAvXig/OmRpc2FibGVkfGNoZWNrZWR8cmVhZG9ubHl8cmVxdWlyZWR8YWxsb3dmdWxsc2NyZWVufGF1dG8oPzpmb2N1c3xwbGF5KXxjb21wYWN0fGNvbnRyb2xzfGRlZmF1bHR8Zm9ybW5vdmFsaWRhdGV8aGlkZGVufGlzbWFwfGl0ZW1zY29wZXxsb29wfG11bHRpcGxlfG11dGVkfG5vKD86cmVzaXplfHNoYWRlfHZhbGlkYXRlfHdyYXApP3xvcGVufHJldmVyc2VkfHNlYW1sZXNzfHNlbGVjdGVkfHNvcnRhYmxlfHRydWVzcGVlZHx0eXBlbXVzdG1hdGNoKSQvO1xudmFyIElFX1ZFUlNJT04gPSAoV0lOICYmIFdJTi5kb2N1bWVudCB8fCB7fSkuZG9jdW1lbnRNb2RlIHwgMDtcblxuLyoqXG4gKiBDaGVjayBDaGVjayBpZiB0aGUgcGFzc2VkIGFyZ3VtZW50IGlzIHVuZGVmaW5lZFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzQm9vbEF0dHIodmFsdWUpIHtcbiAgcmV0dXJuIFJFX0JPT0xfQVRUUlMudGVzdCh2YWx1ZSlcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgYSBmdW5jdGlvblxuICogQHBhcmFtICAgeyAqIH0gdmFsdWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFRfRlVOQ1RJT05cbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgYW4gb2JqZWN0LCBleGNsdWRlIG51bGxcbiAqIE5PVEU6IHVzZSBpc09iamVjdCh4KSAmJiAhaXNBcnJheSh4KSB0byBleGNsdWRlcyBhcnJheXMuXG4gKiBAcGFyYW0gICB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFRfT0JKRUNUIC8vIHR5cGVvZiBudWxsIGlzICdvYmplY3QnXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIHVuZGVmaW5lZFxuICogQHBhcmFtICAgeyAqIH0gdmFsdWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBUX1VOREVGXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIGEgc3RyaW5nXG4gKiBAcGFyYW0gICB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFRfU1RSSU5HXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIGVtcHR5LiBEaWZmZXJlbnQgZnJvbSBmYWxzeSwgYmVjYXVzZSB3ZSBkb250IGNvbnNpZGVyIDAgb3IgZmFsc2UgdG8gYmUgYmxhbmtcbiAqIEBwYXJhbSB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzQmxhbmsodmFsdWUpIHtcbiAgcmV0dXJuIGlzVW5kZWZpbmVkKHZhbHVlKSB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gJydcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgYSBraW5kIG9mIGFycmF5XG4gKiBAcGFyYW0gICB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHZhbHVlIGluc3RhbmNlb2YgQXJyYXlcbn1cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIG9iamVjdCdzIHByb3BlcnR5IGNvdWxkIGJlIG92ZXJyaWRkZW5cbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gIG9iaiAtIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gIGtleSAtIG9iamVjdCBwcm9wZXJ0eVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc1dyaXRhYmxlKG9iaiwga2V5KSB7XG4gIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gIHJldHVybiBpc1VuZGVmaW5lZChvYmpba2V5XSkgfHwgZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLndyaXRhYmxlXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIGEgcmVzZXJ2ZWQgbmFtZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzUmVzZXJ2ZWROYW1lKHZhbHVlKSB7XG4gIHJldHVybiBSRV9SRVNFUlZFRF9OQU1FUy50ZXN0KHZhbHVlKVxufVxuXG52YXIgY2hlY2sgPSBPYmplY3QuZnJlZXplKHtcblx0aXNCb29sQXR0cjogaXNCb29sQXR0cixcblx0aXNGdW5jdGlvbjogaXNGdW5jdGlvbixcblx0aXNPYmplY3Q6IGlzT2JqZWN0LFxuXHRpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG5cdGlzU3RyaW5nOiBpc1N0cmluZyxcblx0aXNCbGFuazogaXNCbGFuayxcblx0aXNBcnJheTogaXNBcnJheSxcblx0aXNXcml0YWJsZTogaXNXcml0YWJsZSxcblx0aXNSZXNlcnZlZE5hbWU6IGlzUmVzZXJ2ZWROYW1lXG59KTtcblxuLyoqXG4gKiBTaG9ydGVyIGFuZCBmYXN0IHdheSB0byBzZWxlY3QgbXVsdGlwbGUgbm9kZXMgaW4gdGhlIERPTVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBzZWxlY3RvciAtIERPTSBzZWxlY3RvclxuICogQHBhcmFtICAgeyBPYmplY3QgfSBjdHggLSBET00gbm9kZSB3aGVyZSB0aGUgdGFyZ2V0cyBvZiBvdXIgc2VhcmNoIHdpbGwgaXMgbG9jYXRlZFxuICogQHJldHVybnMgeyBPYmplY3QgfSBkb20gbm9kZXMgZm91bmRcbiAqL1xuZnVuY3Rpb24gJCQoc2VsZWN0b3IsIGN0eCkge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoKGN0eCB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXG59XG5cbi8qKlxuICogU2hvcnRlciBhbmQgZmFzdCB3YXkgdG8gc2VsZWN0IGEgc2luZ2xlIG5vZGUgaW4gdGhlIERPTVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBzZWxlY3RvciAtIHVuaXF1ZSBkb20gc2VsZWN0b3JcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gY3R4IC0gRE9NIG5vZGUgd2hlcmUgdGhlIHRhcmdldCBvZiBvdXIgc2VhcmNoIHdpbGwgaXMgbG9jYXRlZFxuICogQHJldHVybnMgeyBPYmplY3QgfSBkb20gbm9kZSBmb3VuZFxuICovXG5mdW5jdGlvbiAkKHNlbGVjdG9yLCBjdHgpIHtcbiAgcmV0dXJuIChjdHggfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZG9jdW1lbnQgZnJhZ21lbnRcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZG9jdW1lbnQgZnJhZ21lbnRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlRnJhZygpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRvY3VtZW50IHRleHQgbm9kZVxuICogQHJldHVybnMgeyBPYmplY3QgfSBjcmVhdGUgYSB0ZXh0IG5vZGUgdG8gdXNlIGFzIHBsYWNlaG9sZGVyXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZURPTVBsYWNlaG9sZGVyKCkge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZ2VuZXJpYyBET00gbm9kZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBuYW1lIC0gbmFtZSBvZiB0aGUgRE9NIG5vZGUgd2Ugd2FudCB0byBjcmVhdGVcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gRE9NIG5vZGUganVzdCBjcmVhdGVkXG4gKi9cbmZ1bmN0aW9uIG1rRWwobmFtZSkge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKVxufVxuXG4vKipcbiAqIFNldCB0aGUgaW5uZXIgaHRtbCBvZiBhbnkgRE9NIG5vZGUgU1ZHcyBpbmNsdWRlZFxuICogQHBhcmFtIHsgT2JqZWN0IH0gY29udGFpbmVyIC0gRE9NIG5vZGUgd2hlcmUgd2UnbGwgaW5qZWN0IG5ldyBodG1sXG4gKiBAcGFyYW0geyBTdHJpbmcgfSBodG1sIC0gaHRtbCB0byBpbmplY3RcbiAqL1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmZ1bmN0aW9uIHNldElubmVySFRNTChjb250YWluZXIsIGh0bWwpIHtcbiAgaWYgKCFpc1VuZGVmaW5lZChjb250YWluZXIuaW5uZXJIVE1MKSlcbiAgICB7IGNvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sOyB9XG4gICAgLy8gc29tZSBicm93c2VycyBkbyBub3Qgc3VwcG9ydCBpbm5lckhUTUwgb24gdGhlIFNWR3MgdGFnc1xuICBlbHNlIHtcbiAgICB2YXIgZG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhodG1sLCAnYXBwbGljYXRpb24veG1sJyk7XG4gICAgdmFyIG5vZGUgPSBjb250YWluZXIub3duZXJEb2N1bWVudC5pbXBvcnROb2RlKGRvYy5kb2N1bWVudEVsZW1lbnQsIHRydWUpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChub2RlKTtcbiAgfVxufVxuXG4vKipcbiAqIFRvZ2dsZSB0aGUgdmlzaWJpbGl0eSBvZiBhbnkgRE9NIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gIGRvbSAtIERPTSBub2RlIHdlIHdhbnQgdG8gaGlkZVxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gc2hvdyAtIGRvIHdlIHdhbnQgdG8gc2hvdyBpdD9cbiAqL1xuXG5mdW5jdGlvbiB0b2dnbGVWaXNpYmlsaXR5KGRvbSwgc2hvdykge1xuICBkb20uc3R5bGUuZGlzcGxheSA9IHNob3cgPyAnJyA6ICdub25lJztcbiAgZG9tWydoaWRkZW4nXSA9IHNob3cgPyBmYWxzZSA6IHRydWU7XG59XG5cbi8qKlxuICogUmVtb3ZlIGFueSBET00gYXR0cmlidXRlIGZyb20gYSBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGRvbSAtIERPTSBub2RlIHdlIHdhbnQgdG8gdXBkYXRlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IG5hbWUgLSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB3ZSB3YW50IHRvIHJlbW92ZVxuICovXG5mdW5jdGlvbiByZW1BdHRyKGRvbSwgbmFtZSkge1xuICBkb20ucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xufVxuXG4vKipcbiAqIENvbnZlcnQgYSBzdHlsZSBvYmplY3QgdG8gYSBzdHJpbmdcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gc3R5bGUgLSBzdHlsZSBvYmplY3Qgd2UgbmVlZCB0byBwYXJzZVxuICogQHJldHVybnMgeyBTdHJpbmcgfSByZXN1bHRpbmcgY3NzIHN0cmluZ1xuICogQGV4YW1wbGVcbiAqIHN0eWxlT2JqZWN0VG9TdHJpbmcoeyBjb2xvcjogJ3JlZCcsIGhlaWdodDogJzEwcHgnfSkgLy8gPT4gJ2NvbG9yOiByZWQ7IGhlaWdodDogMTBweCdcbiAqL1xuZnVuY3Rpb24gc3R5bGVPYmplY3RUb1N0cmluZyhzdHlsZSkge1xuICByZXR1cm4gT2JqZWN0LmtleXMoc3R5bGUpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwcm9wKSB7XG4gICAgcmV0dXJuIChhY2MgKyBcIiBcIiArIHByb3AgKyBcIjogXCIgKyAoc3R5bGVbcHJvcF0pICsgXCI7XCIpXG4gIH0sICcnKVxufVxuXG4vKipcbiAqIEdldCB0aGUgdmFsdWUgb2YgYW55IERPTSBhdHRyaWJ1dGUgb24gYSBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGRvbSAtIERPTSBub2RlIHdlIHdhbnQgdG8gcGFyc2VcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gbmFtZSAtIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZSB3ZSB3YW50IHRvIGdldFxuICogQHJldHVybnMgeyBTdHJpbmcgfCB1bmRlZmluZWQgfSBuYW1lIG9mIHRoZSBub2RlIGF0dHJpYnV0ZSB3aGV0aGVyIGl0IGV4aXN0c1xuICovXG5mdW5jdGlvbiBnZXRBdHRyKGRvbSwgbmFtZSkge1xuICByZXR1cm4gZG9tLmdldEF0dHJpYnV0ZShuYW1lKVxufVxuXG4vKipcbiAqIFNldCBhbnkgRE9NIGF0dHJpYnV0ZVxuICogQHBhcmFtIHsgT2JqZWN0IH0gZG9tIC0gRE9NIG5vZGUgd2Ugd2FudCB0byB1cGRhdGVcbiAqIEBwYXJhbSB7IFN0cmluZyB9IG5hbWUgLSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB3ZSB3YW50IHRvIHNldFxuICogQHBhcmFtIHsgU3RyaW5nIH0gdmFsIC0gdmFsdWUgb2YgdGhlIHByb3BlcnR5IHdlIHdhbnQgdG8gc2V0XG4gKi9cbmZ1bmN0aW9uIHNldEF0dHIoZG9tLCBuYW1lLCB2YWwpIHtcbiAgdmFyIHhsaW5rID0gWExJTktfUkVHRVguZXhlYyhuYW1lKTtcbiAgaWYgKHhsaW5rICYmIHhsaW5rWzFdKVxuICAgIHsgZG9tLnNldEF0dHJpYnV0ZU5TKFhMSU5LX05TLCB4bGlua1sxXSwgdmFsKTsgfVxuICBlbHNlXG4gICAgeyBkb20uc2V0QXR0cmlidXRlKG5hbWUsIHZhbCk7IH1cbn1cblxuLyoqXG4gKiBJbnNlcnQgc2FmZWx5IGEgdGFnIHRvIGZpeCAjMTk2MiAjMTY0OVxuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IHJvb3QgLSBjaGlsZHJlbiBjb250YWluZXJcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSBjdXJyIC0gbm9kZSB0byBpbnNlcnRcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSBuZXh0IC0gbm9kZSB0aGF0IHNob3VsZCBwcmVjZWVkIHRoZSBjdXJyZW50IG5vZGUgaW5zZXJ0ZWRcbiAqL1xuZnVuY3Rpb24gc2FmZUluc2VydChyb290LCBjdXJyLCBuZXh0KSB7XG4gIHJvb3QuaW5zZXJ0QmVmb3JlKGN1cnIsIG5leHQucGFyZW50Tm9kZSAmJiBuZXh0KTtcbn1cblxuLyoqXG4gKiBNaW5pbWl6ZSByaXNrOiBvbmx5IHplcm8gb3Igb25lIF9zcGFjZV8gYmV0d2VlbiBhdHRyICYgdmFsdWVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBodG1sIC0gaHRtbCBzdHJpbmcgd2Ugd2FudCB0byBwYXJzZVxuICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gYXBwbHkgb24gYW55IGF0dHJpYnV0ZSBmb3VuZFxuICovXG5mdW5jdGlvbiB3YWxrQXR0cnMoaHRtbCwgZm4pIHtcbiAgaWYgKCFodG1sKVxuICAgIHsgcmV0dXJuIH1cbiAgdmFyIG07XG4gIHdoaWxlIChtID0gUkVfSFRNTF9BVFRSUy5leGVjKGh0bWwpKVxuICAgIHsgZm4obVsxXS50b0xvd2VyQ2FzZSgpLCBtWzJdIHx8IG1bM10gfHwgbVs0XSk7IH1cbn1cblxuLyoqXG4gKiBXYWxrIGRvd24gcmVjdXJzaXZlbHkgYWxsIHRoZSBjaGlsZHJlbiB0YWdzIHN0YXJ0aW5nIGRvbSBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9ICAgZG9tIC0gc3RhcnRpbmcgbm9kZSB3aGVyZSB3ZSB3aWxsIHN0YXJ0IHRoZSByZWN1cnNpb25cbiAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIGNhbGxiYWNrIHRvIHRyYW5zZm9ybSB0aGUgY2hpbGQgbm9kZSBqdXN0IGZvdW5kXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9ICAgY29udGV4dCAtIGZuIGNhbiBvcHRpb25hbGx5IHJldHVybiBhbiBvYmplY3QsIHdoaWNoIGlzIHBhc3NlZCB0byBjaGlsZHJlblxuICovXG5mdW5jdGlvbiB3YWxrTm9kZXMoZG9tLCBmbiwgY29udGV4dCkge1xuICBpZiAoZG9tKSB7XG4gICAgdmFyIHJlcyA9IGZuKGRvbSwgY29udGV4dCk7XG4gICAgdmFyIG5leHQ7XG4gICAgLy8gc3RvcCB0aGUgcmVjdXJzaW9uXG4gICAgaWYgKHJlcyA9PT0gZmFsc2UpIHsgcmV0dXJuIH1cblxuICAgIGRvbSA9IGRvbS5maXJzdENoaWxkO1xuXG4gICAgd2hpbGUgKGRvbSkge1xuICAgICAgbmV4dCA9IGRvbS5uZXh0U2libGluZztcbiAgICAgIHdhbGtOb2Rlcyhkb20sIGZuLCByZXMpO1xuICAgICAgZG9tID0gbmV4dDtcbiAgICB9XG4gIH1cbn1cblxudmFyIGRvbSA9IE9iamVjdC5mcmVlemUoe1xuXHQkJDogJCQsXG5cdCQ6ICQsXG5cdGNyZWF0ZUZyYWc6IGNyZWF0ZUZyYWcsXG5cdGNyZWF0ZURPTVBsYWNlaG9sZGVyOiBjcmVhdGVET01QbGFjZWhvbGRlcixcblx0bWtFbDogbWtFbCxcblx0c2V0SW5uZXJIVE1MOiBzZXRJbm5lckhUTUwsXG5cdHRvZ2dsZVZpc2liaWxpdHk6IHRvZ2dsZVZpc2liaWxpdHksXG5cdHJlbUF0dHI6IHJlbUF0dHIsXG5cdHN0eWxlT2JqZWN0VG9TdHJpbmc6IHN0eWxlT2JqZWN0VG9TdHJpbmcsXG5cdGdldEF0dHI6IGdldEF0dHIsXG5cdHNldEF0dHI6IHNldEF0dHIsXG5cdHNhZmVJbnNlcnQ6IHNhZmVJbnNlcnQsXG5cdHdhbGtBdHRyczogd2Fsa0F0dHJzLFxuXHR3YWxrTm9kZXM6IHdhbGtOb2Rlc1xufSk7XG5cbnZhciBzdHlsZU5vZGU7XG52YXIgY3NzVGV4dFByb3A7XG52YXIgYnlOYW1lID0ge307XG52YXIgcmVtYWluZGVyID0gW107XG52YXIgbmVlZHNJbmplY3QgPSBmYWxzZTtcblxuLy8gc2tpcCB0aGUgZm9sbG93aW5nIGNvZGUgb24gdGhlIHNlcnZlclxuaWYgKFdJTikge1xuICBzdHlsZU5vZGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8vIGNyZWF0ZSBhIG5ldyBzdHlsZSBlbGVtZW50IHdpdGggdGhlIGNvcnJlY3QgdHlwZVxuICAgIHZhciBuZXdOb2RlID0gbWtFbCgnc3R5bGUnKTtcbiAgICBzZXRBdHRyKG5ld05vZGUsICd0eXBlJywgJ3RleHQvY3NzJyk7XG5cbiAgICAvLyByZXBsYWNlIGFueSB1c2VyIG5vZGUgb3IgaW5zZXJ0IHRoZSBuZXcgb25lIGludG8gdGhlIGhlYWRcbiAgICB2YXIgdXNlck5vZGUgPSAkKCdzdHlsZVt0eXBlPXJpb3RdJyk7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAodXNlck5vZGUpIHtcbiAgICAgIGlmICh1c2VyTm9kZS5pZCkgeyBuZXdOb2RlLmlkID0gdXNlck5vZGUuaWQ7IH1cbiAgICAgIHVzZXJOb2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld05vZGUsIHVzZXJOb2RlKTtcbiAgICB9XG4gICAgZWxzZSB7IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQobmV3Tm9kZSk7IH1cblxuICAgIHJldHVybiBuZXdOb2RlXG4gIH0pKCk7XG4gIGNzc1RleHRQcm9wID0gc3R5bGVOb2RlLnN0eWxlU2hlZXQ7XG59XG5cbi8qKlxuICogT2JqZWN0IHRoYXQgd2lsbCBiZSB1c2VkIHRvIGluamVjdCBhbmQgbWFuYWdlIHRoZSBjc3Mgb2YgZXZlcnkgdGFnIGluc3RhbmNlXG4gKi9cbnZhciBzdHlsZU1hbmFnZXIgPSB7XG4gIHN0eWxlTm9kZTogc3R5bGVOb2RlLFxuICAvKipcbiAgICogU2F2ZSBhIHRhZyBzdHlsZSB0byBiZSBsYXRlciBpbmplY3RlZCBpbnRvIERPTVxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBjc3MgLSBjc3Mgc3RyaW5nXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IG5hbWUgLSBpZiBpdCdzIHBhc3NlZCB3ZSB3aWxsIG1hcCB0aGUgY3NzIHRvIGEgdGFnbmFtZVxuICAgKi9cbiAgYWRkOiBmdW5jdGlvbiBhZGQoY3NzLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUpIHsgYnlOYW1lW25hbWVdID0gY3NzOyB9XG4gICAgZWxzZSB7IHJlbWFpbmRlci5wdXNoKGNzcyk7IH1cbiAgICBuZWVkc0luamVjdCA9IHRydWU7XG4gIH0sXG4gIC8qKlxuICAgKiBJbmplY3QgYWxsIHByZXZpb3VzbHkgc2F2ZWQgdGFnIHN0eWxlcyBpbnRvIERPTVxuICAgKiBpbm5lckhUTUwgc2VlbXMgc2xvdzogaHR0cDovL2pzcGVyZi5jb20vcmlvdC1pbnNlcnQtc3R5bGVcbiAgICovXG4gIGluamVjdDogZnVuY3Rpb24gaW5qZWN0KCkge1xuICAgIGlmICghV0lOIHx8ICFuZWVkc0luamVjdCkgeyByZXR1cm4gfVxuICAgIG5lZWRzSW5qZWN0ID0gZmFsc2U7XG4gICAgdmFyIHN0eWxlID0gT2JqZWN0LmtleXMoYnlOYW1lKVxuICAgICAgLm1hcChmdW5jdGlvbihrKSB7IHJldHVybiBieU5hbWVba10gfSlcbiAgICAgIC5jb25jYXQocmVtYWluZGVyKS5qb2luKCdcXG4nKTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmIChjc3NUZXh0UHJvcCkgeyBjc3NUZXh0UHJvcC5jc3NUZXh0ID0gc3R5bGU7IH1cbiAgICBlbHNlIHsgc3R5bGVOb2RlLmlubmVySFRNTCA9IHN0eWxlOyB9XG4gIH1cbn07XG5cbi8qKlxuICogVGhlIHJpb3QgdGVtcGxhdGUgZW5naW5lXG4gKiBAdmVyc2lvbiB2My4wLjNcbiAqL1xuLyoqXG4gKiByaW90LnV0aWwuYnJhY2tldHNcbiAqXG4gKiAtIGBicmFja2V0cyAgICBgIC0gUmV0dXJucyBhIHN0cmluZyBvciByZWdleCBiYXNlZCBvbiBpdHMgcGFyYW1ldGVyXG4gKiAtIGBicmFja2V0cy5zZXRgIC0gQ2hhbmdlIHRoZSBjdXJyZW50IHJpb3QgYnJhY2tldHNcbiAqXG4gKiBAbW9kdWxlXG4gKi9cblxuLyogZ2xvYmFsIHJpb3QgKi9cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbnZhciBicmFja2V0cyA9IChmdW5jdGlvbiAoVU5ERUYpIHtcblxuICB2YXJcbiAgICBSRUdMT0IgPSAnZycsXG5cbiAgICBSX01MQ09NTVMgPSAvXFwvXFwqW14qXSpcXCorKD86W14qXFwvXVteKl0qXFwqKykqXFwvL2csXG5cbiAgICBSX1NUUklOR1MgPSAvXCJbXlwiXFxcXF0qKD86XFxcXFtcXFNcXHNdW15cIlxcXFxdKikqXCJ8J1teJ1xcXFxdKig/OlxcXFxbXFxTXFxzXVteJ1xcXFxdKikqJ3xgW15gXFxcXF0qKD86XFxcXFtcXFNcXHNdW15gXFxcXF0qKSpgL2csXG5cbiAgICBTX1FCTE9DS1MgPSBSX1NUUklOR1Muc291cmNlICsgJ3wnICtcbiAgICAgIC8oPzpcXGJyZXR1cm5cXHMrfCg/OlskXFx3XFwpXFxdXXxcXCtcXCt8LS0pXFxzKihcXC8pKD8hWypcXC9dKSkvLnNvdXJjZSArICd8JyArXG4gICAgICAvXFwvKD89W14qXFwvXSlbXltcXC9cXFxcXSooPzooPzpcXFsoPzpcXFxcLnxbXlxcXVxcXFxdKikqXFxdfFxcXFwuKVteW1xcL1xcXFxdKikqPyhcXC8pW2dpbV0qLy5zb3VyY2UsXG5cbiAgICBVTlNVUFBPUlRFRCA9IFJlZ0V4cCgnW1xcXFwnICsgJ3gwMC1cXFxceDFGPD5hLXpBLVowLTlcXCdcIiw7XFxcXFxcXFxdJyksXG5cbiAgICBORUVEX0VTQ0FQRSA9IC8oPz1bW1xcXSgpKis/Ll4kfF0pL2csXG5cbiAgICBGSU5EQlJBQ0VTID0ge1xuICAgICAgJygnOiBSZWdFeHAoJyhbKCldKXwnICAgKyBTX1FCTE9DS1MsIFJFR0xPQiksXG4gICAgICAnWyc6IFJlZ0V4cCgnKFtbXFxcXF1dKXwnICsgU19RQkxPQ0tTLCBSRUdMT0IpLFxuICAgICAgJ3snOiBSZWdFeHAoJyhbe31dKXwnICAgKyBTX1FCTE9DS1MsIFJFR0xPQilcbiAgICB9LFxuXG4gICAgREVGQVVMVCA9ICd7IH0nO1xuXG4gIHZhciBfcGFpcnMgPSBbXG4gICAgJ3snLCAnfScsXG4gICAgJ3snLCAnfScsXG4gICAgL3tbXn1dKn0vLFxuICAgIC9cXFxcKFt7fV0pL2csXG4gICAgL1xcXFwoeyl8ey9nLFxuICAgIFJlZ0V4cCgnXFxcXFxcXFwofSl8KFtbKHtdKXwofSl8JyArIFNfUUJMT0NLUywgUkVHTE9CKSxcbiAgICBERUZBVUxULFxuICAgIC9eXFxzKntcXF4/XFxzKihbJFxcd10rKSg/OlxccyosXFxzKihcXFMrKSk/XFxzK2luXFxzKyhcXFMuKilcXHMqfS8sXG4gICAgLyhefFteXFxcXF0pez1bXFxTXFxzXSo/fS9cbiAgXTtcblxuICB2YXJcbiAgICBjYWNoZWRCcmFja2V0cyA9IFVOREVGLFxuICAgIF9yZWdleCxcbiAgICBfY2FjaGUgPSBbXSxcbiAgICBfc2V0dGluZ3M7XG5cbiAgZnVuY3Rpb24gX2xvb3BiYWNrIChyZSkgeyByZXR1cm4gcmUgfVxuXG4gIGZ1bmN0aW9uIF9yZXdyaXRlIChyZSwgYnApIHtcbiAgICBpZiAoIWJwKSB7IGJwID0gX2NhY2hlOyB9XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgICByZS5zb3VyY2UucmVwbGFjZSgvey9nLCBicFsyXSkucmVwbGFjZSgvfS9nLCBicFszXSksIHJlLmdsb2JhbCA/IFJFR0xPQiA6ICcnXG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gX2NyZWF0ZSAocGFpcikge1xuICAgIGlmIChwYWlyID09PSBERUZBVUxUKSB7IHJldHVybiBfcGFpcnMgfVxuXG4gICAgdmFyIGFyciA9IHBhaXIuc3BsaXQoJyAnKTtcblxuICAgIGlmIChhcnIubGVuZ3RoICE9PSAyIHx8IFVOU1VQUE9SVEVELnRlc3QocGFpcikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgYnJhY2tldHMgXCInICsgcGFpciArICdcIicpXG4gICAgfVxuICAgIGFyciA9IGFyci5jb25jYXQocGFpci5yZXBsYWNlKE5FRURfRVNDQVBFLCAnXFxcXCcpLnNwbGl0KCcgJykpO1xuXG4gICAgYXJyWzRdID0gX3Jld3JpdGUoYXJyWzFdLmxlbmd0aCA+IDEgPyAve1tcXFNcXHNdKj99LyA6IF9wYWlyc1s0XSwgYXJyKTtcbiAgICBhcnJbNV0gPSBfcmV3cml0ZShwYWlyLmxlbmd0aCA+IDMgPyAvXFxcXCh7fH0pL2cgOiBfcGFpcnNbNV0sIGFycik7XG4gICAgYXJyWzZdID0gX3Jld3JpdGUoX3BhaXJzWzZdLCBhcnIpO1xuICAgIGFycls3XSA9IFJlZ0V4cCgnXFxcXFxcXFwoJyArIGFyclszXSArICcpfChbWyh7XSl8KCcgKyBhcnJbM10gKyAnKXwnICsgU19RQkxPQ0tTLCBSRUdMT0IpO1xuICAgIGFycls4XSA9IHBhaXI7XG4gICAgcmV0dXJuIGFyclxuICB9XG5cbiAgZnVuY3Rpb24gX2JyYWNrZXRzIChyZU9ySWR4KSB7XG4gICAgcmV0dXJuIHJlT3JJZHggaW5zdGFuY2VvZiBSZWdFeHAgPyBfcmVnZXgocmVPcklkeCkgOiBfY2FjaGVbcmVPcklkeF1cbiAgfVxuXG4gIF9icmFja2V0cy5zcGxpdCA9IGZ1bmN0aW9uIHNwbGl0IChzdHIsIHRtcGwsIF9icCkge1xuICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBfYnAgaXMgZm9yIHRoZSBjb21waWxlclxuICAgIGlmICghX2JwKSB7IF9icCA9IF9jYWNoZTsgfVxuXG4gICAgdmFyXG4gICAgICBwYXJ0cyA9IFtdLFxuICAgICAgbWF0Y2gsXG4gICAgICBpc2V4cHIsXG4gICAgICBzdGFydCxcbiAgICAgIHBvcyxcbiAgICAgIHJlID0gX2JwWzZdO1xuXG4gICAgaXNleHByID0gc3RhcnQgPSByZS5sYXN0SW5kZXggPSAwO1xuXG4gICAgd2hpbGUgKChtYXRjaCA9IHJlLmV4ZWMoc3RyKSkpIHtcblxuICAgICAgcG9zID0gbWF0Y2guaW5kZXg7XG5cbiAgICAgIGlmIChpc2V4cHIpIHtcblxuICAgICAgICBpZiAobWF0Y2hbMl0pIHtcbiAgICAgICAgICByZS5sYXN0SW5kZXggPSBza2lwQnJhY2VzKHN0ciwgbWF0Y2hbMl0sIHJlLmxhc3RJbmRleCk7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1hdGNoWzNdKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIW1hdGNoWzFdKSB7XG4gICAgICAgIHVuZXNjYXBlU3RyKHN0ci5zbGljZShzdGFydCwgcG9zKSk7XG4gICAgICAgIHN0YXJ0ID0gcmUubGFzdEluZGV4O1xuICAgICAgICByZSA9IF9icFs2ICsgKGlzZXhwciBePSAxKV07XG4gICAgICAgIHJlLmxhc3RJbmRleCA9IHN0YXJ0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdHIgJiYgc3RhcnQgPCBzdHIubGVuZ3RoKSB7XG4gICAgICB1bmVzY2FwZVN0cihzdHIuc2xpY2Uoc3RhcnQpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFydHNcblxuICAgIGZ1bmN0aW9uIHVuZXNjYXBlU3RyIChzKSB7XG4gICAgICBpZiAodG1wbCB8fCBpc2V4cHIpIHtcbiAgICAgICAgcGFydHMucHVzaChzICYmIHMucmVwbGFjZShfYnBbNV0sICckMScpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnRzLnB1c2gocyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2tpcEJyYWNlcyAocywgY2gsIGl4KSB7XG4gICAgICB2YXJcbiAgICAgICAgbWF0Y2gsXG4gICAgICAgIHJlY2NoID0gRklOREJSQUNFU1tjaF07XG5cbiAgICAgIHJlY2NoLmxhc3RJbmRleCA9IGl4O1xuICAgICAgaXggPSAxO1xuICAgICAgd2hpbGUgKChtYXRjaCA9IHJlY2NoLmV4ZWMocykpKSB7XG4gICAgICAgIGlmIChtYXRjaFsxXSAmJlxuICAgICAgICAgICEobWF0Y2hbMV0gPT09IGNoID8gKytpeCA6IC0taXgpKSB7IGJyZWFrIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBpeCA/IHMubGVuZ3RoIDogcmVjY2gubGFzdEluZGV4XG4gICAgfVxuICB9O1xuXG4gIF9icmFja2V0cy5oYXNFeHByID0gZnVuY3Rpb24gaGFzRXhwciAoc3RyKSB7XG4gICAgcmV0dXJuIF9jYWNoZVs0XS50ZXN0KHN0cilcbiAgfTtcblxuICBfYnJhY2tldHMubG9vcEtleXMgPSBmdW5jdGlvbiBsb29wS2V5cyAoZXhwcikge1xuICAgIHZhciBtID0gZXhwci5tYXRjaChfY2FjaGVbOV0pO1xuXG4gICAgcmV0dXJuIG1cbiAgICAgID8geyBrZXk6IG1bMV0sIHBvczogbVsyXSwgdmFsOiBfY2FjaGVbMF0gKyBtWzNdLnRyaW0oKSArIF9jYWNoZVsxXSB9XG4gICAgICA6IHsgdmFsOiBleHByLnRyaW0oKSB9XG4gIH07XG5cbiAgX2JyYWNrZXRzLmFycmF5ID0gZnVuY3Rpb24gYXJyYXkgKHBhaXIpIHtcbiAgICByZXR1cm4gcGFpciA/IF9jcmVhdGUocGFpcikgOiBfY2FjaGVcbiAgfTtcblxuICBmdW5jdGlvbiBfcmVzZXQgKHBhaXIpIHtcbiAgICBpZiAoKHBhaXIgfHwgKHBhaXIgPSBERUZBVUxUKSkgIT09IF9jYWNoZVs4XSkge1xuICAgICAgX2NhY2hlID0gX2NyZWF0ZShwYWlyKTtcbiAgICAgIF9yZWdleCA9IHBhaXIgPT09IERFRkFVTFQgPyBfbG9vcGJhY2sgOiBfcmV3cml0ZTtcbiAgICAgIF9jYWNoZVs5XSA9IF9yZWdleChfcGFpcnNbOV0pO1xuICAgIH1cbiAgICBjYWNoZWRCcmFja2V0cyA9IHBhaXI7XG4gIH1cblxuICBmdW5jdGlvbiBfc2V0U2V0dGluZ3MgKG8pIHtcbiAgICB2YXIgYjtcblxuICAgIG8gPSBvIHx8IHt9O1xuICAgIGIgPSBvLmJyYWNrZXRzO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCAnYnJhY2tldHMnLCB7XG4gICAgICBzZXQ6IF9yZXNldCxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY2FjaGVkQnJhY2tldHMgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBfc2V0dGluZ3MgPSBvO1xuICAgIF9yZXNldChiKTtcbiAgfVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfYnJhY2tldHMsICdzZXR0aW5ncycsIHtcbiAgICBzZXQ6IF9zZXRTZXR0aW5ncyxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9zZXR0aW5ncyB9XG4gIH0pO1xuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBpbiB0aGUgYnJvd3NlciByaW90IGlzIGFsd2F5cyBpbiB0aGUgc2NvcGUgKi9cbiAgX2JyYWNrZXRzLnNldHRpbmdzID0gdHlwZW9mIHJpb3QgIT09ICd1bmRlZmluZWQnICYmIHJpb3Quc2V0dGluZ3MgfHwge307XG4gIF9icmFja2V0cy5zZXQgPSBfcmVzZXQ7XG5cbiAgX2JyYWNrZXRzLlJfU1RSSU5HUyA9IFJfU1RSSU5HUztcbiAgX2JyYWNrZXRzLlJfTUxDT01NUyA9IFJfTUxDT01NUztcbiAgX2JyYWNrZXRzLlNfUUJMT0NLUyA9IFNfUUJMT0NLUztcblxuICByZXR1cm4gX2JyYWNrZXRzXG5cbn0pKCk7XG5cbi8qKlxuICogQG1vZHVsZSB0bXBsXG4gKlxuICogdG1wbCAgICAgICAgICAtIFJvb3QgZnVuY3Rpb24sIHJldHVybnMgdGhlIHRlbXBsYXRlIHZhbHVlLCByZW5kZXIgd2l0aCBkYXRhXG4gKiB0bXBsLmhhc0V4cHIgIC0gVGVzdCB0aGUgZXhpc3RlbmNlIG9mIGEgZXhwcmVzc2lvbiBpbnNpZGUgYSBzdHJpbmdcbiAqIHRtcGwubG9vcEtleXMgLSBHZXQgdGhlIGtleXMgZm9yIGFuICdlYWNoJyBsb29wICh1c2VkIGJ5IGBfZWFjaGApXG4gKi9cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbnZhciB0bXBsID0gKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgX2NhY2hlID0ge307XG5cbiAgZnVuY3Rpb24gX3RtcGwgKHN0ciwgZGF0YSkge1xuICAgIGlmICghc3RyKSB7IHJldHVybiBzdHIgfVxuXG4gICAgcmV0dXJuIChfY2FjaGVbc3RyXSB8fCAoX2NhY2hlW3N0cl0gPSBfY3JlYXRlKHN0cikpKS5jYWxsKGRhdGEsIF9sb2dFcnIpXG4gIH1cblxuICBfdG1wbC5oYXNFeHByID0gYnJhY2tldHMuaGFzRXhwcjtcblxuICBfdG1wbC5sb29wS2V5cyA9IGJyYWNrZXRzLmxvb3BLZXlzO1xuXG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gIF90bXBsLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiAoKSB7IF9jYWNoZSA9IHt9OyB9O1xuXG4gIF90bXBsLmVycm9ySGFuZGxlciA9IG51bGw7XG5cbiAgZnVuY3Rpb24gX2xvZ0VyciAoZXJyLCBjdHgpIHtcblxuICAgIGVyci5yaW90RGF0YSA9IHtcbiAgICAgIHRhZ05hbWU6IGN0eCAmJiBjdHguX18gJiYgY3R4Ll9fLnRhZ05hbWUsXG4gICAgICBfcmlvdF9pZDogY3R4ICYmIGN0eC5fcmlvdF9pZCAgLy9lc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAgIH07XG5cbiAgICBpZiAoX3RtcGwuZXJyb3JIYW5kbGVyKSB7IF90bXBsLmVycm9ySGFuZGxlcihlcnIpOyB9XG4gICAgZWxzZSBpZiAoXG4gICAgICB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nXG4gICAgKSB7XG4gICAgICBpZiAoZXJyLnJpb3REYXRhLnRhZ05hbWUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignUmlvdCB0ZW1wbGF0ZSBlcnJvciB0aHJvd24gaW4gdGhlIDwlcz4gdGFnJywgZXJyLnJpb3REYXRhLnRhZ05hbWUpO1xuICAgICAgfVxuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9jcmVhdGUgKHN0cikge1xuICAgIHZhciBleHByID0gX2dldFRtcGwoc3RyKTtcblxuICAgIGlmIChleHByLnNsaWNlKDAsIDExKSAhPT0gJ3RyeXtyZXR1cm4gJykgeyBleHByID0gJ3JldHVybiAnICsgZXhwcjsgfVxuXG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbignRScsIGV4cHIgKyAnOycpICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LWZ1bmNcbiAgfVxuXG4gIHZhclxuICAgIENIX0lERVhQUiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHgyMDU3KSxcbiAgICBSRV9DU05BTUUgPSAvXig/OigtP1tfQS1aYS16XFx4QTAtXFx4RkZdWy1cXHdcXHhBMC1cXHhGRl0qKXxcXHUyMDU3KFxcZCspfik6LyxcbiAgICBSRV9RQkxPQ0sgPSBSZWdFeHAoYnJhY2tldHMuU19RQkxPQ0tTLCAnZycpLFxuICAgIFJFX0RRVU9URSA9IC9cXHUyMDU3L2csXG4gICAgUkVfUUJNQVJLID0gL1xcdTIwNTcoXFxkKyl+L2c7XG5cbiAgZnVuY3Rpb24gX2dldFRtcGwgKHN0cikge1xuICAgIHZhclxuICAgICAgcXN0ciA9IFtdLFxuICAgICAgZXhwcixcbiAgICAgIHBhcnRzID0gYnJhY2tldHMuc3BsaXQoc3RyLnJlcGxhY2UoUkVfRFFVT1RFLCAnXCInKSwgMSk7XG5cbiAgICBpZiAocGFydHMubGVuZ3RoID4gMiB8fCBwYXJ0c1swXSkge1xuICAgICAgdmFyIGksIGosIGxpc3QgPSBbXTtcblxuICAgICAgZm9yIChpID0gaiA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIGV4cHIgPSBwYXJ0c1tpXTtcblxuICAgICAgICBpZiAoZXhwciAmJiAoZXhwciA9IGkgJiAxXG5cbiAgICAgICAgICAgID8gX3BhcnNlRXhwcihleHByLCAxLCBxc3RyKVxuXG4gICAgICAgICAgICA6ICdcIicgKyBleHByXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFwvZywgJ1xcXFxcXFxcJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxyXFxuP3xcXG4vZywgJ1xcXFxuJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICtcbiAgICAgICAgICAgICAgJ1wiJ1xuXG4gICAgICAgICAgKSkgeyBsaXN0W2orK10gPSBleHByOyB9XG5cbiAgICAgIH1cblxuICAgICAgZXhwciA9IGogPCAyID8gbGlzdFswXVxuICAgICAgICAgICA6ICdbJyArIGxpc3Quam9pbignLCcpICsgJ10uam9pbihcIlwiKSc7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBleHByID0gX3BhcnNlRXhwcihwYXJ0c1sxXSwgMCwgcXN0cik7XG4gICAgfVxuXG4gICAgaWYgKHFzdHJbMF0pIHtcbiAgICAgIGV4cHIgPSBleHByLnJlcGxhY2UoUkVfUUJNQVJLLCBmdW5jdGlvbiAoXywgcG9zKSB7XG4gICAgICAgIHJldHVybiBxc3RyW3Bvc11cbiAgICAgICAgICAucmVwbGFjZSgvXFxyL2csICdcXFxccicpXG4gICAgICAgICAgLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBleHByXG4gIH1cblxuICB2YXJcbiAgICBSRV9CUkVORCA9IHtcbiAgICAgICcoJzogL1soKV0vZyxcbiAgICAgICdbJzogL1tbXFxdXS9nLFxuICAgICAgJ3snOiAvW3t9XS9nXG4gICAgfTtcblxuICBmdW5jdGlvbiBfcGFyc2VFeHByIChleHByLCBhc1RleHQsIHFzdHIpIHtcblxuICAgIGV4cHIgPSBleHByXG4gICAgICAgICAgLnJlcGxhY2UoUkVfUUJMT0NLLCBmdW5jdGlvbiAocywgZGl2KSB7XG4gICAgICAgICAgICByZXR1cm4gcy5sZW5ndGggPiAyICYmICFkaXYgPyBDSF9JREVYUFIgKyAocXN0ci5wdXNoKHMpIC0gMSkgKyAnficgOiBzXG4gICAgICAgICAgfSlcbiAgICAgICAgICAucmVwbGFjZSgvXFxzKy9nLCAnICcpLnRyaW0oKVxuICAgICAgICAgIC5yZXBsYWNlKC9cXCA/KFtbXFwoe30sP1xcLjpdKVxcID8vZywgJyQxJyk7XG5cbiAgICBpZiAoZXhwcikge1xuICAgICAgdmFyXG4gICAgICAgIGxpc3QgPSBbXSxcbiAgICAgICAgY250ID0gMCxcbiAgICAgICAgbWF0Y2g7XG5cbiAgICAgIHdoaWxlIChleHByICYmXG4gICAgICAgICAgICAobWF0Y2ggPSBleHByLm1hdGNoKFJFX0NTTkFNRSkpICYmXG4gICAgICAgICAgICAhbWF0Y2guaW5kZXhcbiAgICAgICAgKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgIGtleSxcbiAgICAgICAgICBqc2IsXG4gICAgICAgICAgcmUgPSAvLHwoW1t7KF0pfCQvZztcblxuICAgICAgICBleHByID0gUmVnRXhwLnJpZ2h0Q29udGV4dDtcbiAgICAgICAga2V5ICA9IG1hdGNoWzJdID8gcXN0clttYXRjaFsyXV0uc2xpY2UoMSwgLTEpLnRyaW0oKS5yZXBsYWNlKC9cXHMrL2csICcgJykgOiBtYXRjaFsxXTtcblxuICAgICAgICB3aGlsZSAoanNiID0gKG1hdGNoID0gcmUuZXhlYyhleHByKSlbMV0pIHsgc2tpcEJyYWNlcyhqc2IsIHJlKTsgfVxuXG4gICAgICAgIGpzYiAgPSBleHByLnNsaWNlKDAsIG1hdGNoLmluZGV4KTtcbiAgICAgICAgZXhwciA9IFJlZ0V4cC5yaWdodENvbnRleHQ7XG5cbiAgICAgICAgbGlzdFtjbnQrK10gPSBfd3JhcEV4cHIoanNiLCAxLCBrZXkpO1xuICAgICAgfVxuXG4gICAgICBleHByID0gIWNudCA/IF93cmFwRXhwcihleHByLCBhc1RleHQpXG4gICAgICAgICAgIDogY250ID4gMSA/ICdbJyArIGxpc3Quam9pbignLCcpICsgJ10uam9pbihcIiBcIikudHJpbSgpJyA6IGxpc3RbMF07XG4gICAgfVxuICAgIHJldHVybiBleHByXG5cbiAgICBmdW5jdGlvbiBza2lwQnJhY2VzIChjaCwgcmUpIHtcbiAgICAgIHZhclxuICAgICAgICBtbSxcbiAgICAgICAgbHYgPSAxLFxuICAgICAgICBpciA9IFJFX0JSRU5EW2NoXTtcblxuICAgICAgaXIubGFzdEluZGV4ID0gcmUubGFzdEluZGV4O1xuICAgICAgd2hpbGUgKG1tID0gaXIuZXhlYyhleHByKSkge1xuICAgICAgICBpZiAobW1bMF0gPT09IGNoKSB7ICsrbHY7IH1cbiAgICAgICAgZWxzZSBpZiAoIS0tbHYpIHsgYnJlYWsgfVxuICAgICAgfVxuICAgICAgcmUubGFzdEluZGV4ID0gbHYgPyBleHByLmxlbmd0aCA6IGlyLmxhc3RJbmRleDtcbiAgICB9XG4gIH1cblxuICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogbm90IGJvdGhcbiAgdmFyIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgSlNfQ09OVEVYVCA9ICdcImluIHRoaXM/dGhpczonICsgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnID8gJ2dsb2JhbCcgOiAnd2luZG93JykgKyAnKS4nLFxuICAgIEpTX1ZBUk5BTUUgPSAvWyx7XVtcXCRcXHddKyg/PTopfCheICp8W14kXFx3XFwue10pKD8hKD86dHlwZW9mfHRydWV8ZmFsc2V8bnVsbHx1bmRlZmluZWR8aW58aW5zdGFuY2VvZnxpcyg/OkZpbml0ZXxOYU4pfHZvaWR8TmFOfG5ld3xEYXRlfFJlZ0V4cHxNYXRoKSg/IVskXFx3XSkpKFskX0EtWmEtel1bJFxcd10qKS9nLFxuICAgIEpTX05PUFJPUFMgPSAvXig/PShcXC5bJFxcd10rKSlcXDEoPzpbXi5bKF18JCkvO1xuXG4gIGZ1bmN0aW9uIF93cmFwRXhwciAoZXhwciwgYXNUZXh0LCBrZXkpIHtcbiAgICB2YXIgdGI7XG5cbiAgICBleHByID0gZXhwci5yZXBsYWNlKEpTX1ZBUk5BTUUsIGZ1bmN0aW9uIChtYXRjaCwgcCwgbXZhciwgcG9zLCBzKSB7XG4gICAgICBpZiAobXZhcikge1xuICAgICAgICBwb3MgPSB0YiA/IDAgOiBwb3MgKyBtYXRjaC5sZW5ndGg7XG5cbiAgICAgICAgaWYgKG12YXIgIT09ICd0aGlzJyAmJiBtdmFyICE9PSAnZ2xvYmFsJyAmJiBtdmFyICE9PSAnd2luZG93Jykge1xuICAgICAgICAgIG1hdGNoID0gcCArICcoXCInICsgbXZhciArIEpTX0NPTlRFWFQgKyBtdmFyO1xuICAgICAgICAgIGlmIChwb3MpIHsgdGIgPSAocyA9IHNbcG9zXSkgPT09ICcuJyB8fCBzID09PSAnKCcgfHwgcyA9PT0gJ1snOyB9XG4gICAgICAgIH0gZWxzZSBpZiAocG9zKSB7XG4gICAgICAgICAgdGIgPSAhSlNfTk9QUk9QUy50ZXN0KHMuc2xpY2UocG9zKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaFxuICAgIH0pO1xuXG4gICAgaWYgKHRiKSB7XG4gICAgICBleHByID0gJ3RyeXtyZXR1cm4gJyArIGV4cHIgKyAnfWNhdGNoKGUpe0UoZSx0aGlzKX0nO1xuICAgIH1cblxuICAgIGlmIChrZXkpIHtcblxuICAgICAgZXhwciA9ICh0YlxuICAgICAgICAgID8gJ2Z1bmN0aW9uKCl7JyArIGV4cHIgKyAnfS5jYWxsKHRoaXMpJyA6ICcoJyArIGV4cHIgKyAnKSdcbiAgICAgICAgKSArICc/XCInICsga2V5ICsgJ1wiOlwiXCInO1xuXG4gICAgfSBlbHNlIGlmIChhc1RleHQpIHtcblxuICAgICAgZXhwciA9ICdmdW5jdGlvbih2KXsnICsgKHRiXG4gICAgICAgICAgPyBleHByLnJlcGxhY2UoJ3JldHVybiAnLCAndj0nKSA6ICd2PSgnICsgZXhwciArICcpJ1xuICAgICAgICApICsgJztyZXR1cm4gdnx8dj09PTA/djpcIlwifS5jYWxsKHRoaXMpJztcbiAgICB9XG5cbiAgICByZXR1cm4gZXhwclxuICB9XG5cbiAgX3RtcGwudmVyc2lvbiA9IGJyYWNrZXRzLnZlcnNpb24gPSAndjMuMC4zJztcblxuICByZXR1cm4gX3RtcGxcblxufSkoKTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbnZhciBvYnNlcnZhYmxlJDEgPSBmdW5jdGlvbihlbCkge1xuXG4gIC8qKlxuICAgKiBFeHRlbmQgdGhlIG9yaWdpbmFsIG9iamVjdCBvciBjcmVhdGUgYSBuZXcgZW1wdHkgb25lXG4gICAqIEB0eXBlIHsgT2JqZWN0IH1cbiAgICovXG5cbiAgZWwgPSBlbCB8fCB7fTtcblxuICAvKipcbiAgICogUHJpdmF0ZSB2YXJpYWJsZXNcbiAgICovXG4gIHZhciBjYWxsYmFja3MgPSB7fSxcbiAgICBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuICAvKipcbiAgICogUHVibGljIEFwaVxuICAgKi9cblxuICAvLyBleHRlbmQgdGhlIGVsIG9iamVjdCBhZGRpbmcgdGhlIG9ic2VydmFibGUgbWV0aG9kc1xuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlbCwge1xuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byB0aGUgZ2l2ZW4gYGV2ZW50YCBhbmRzXG4gICAgICogZXhlY3V0ZSB0aGUgYGNhbGxiYWNrYCBlYWNoIHRpbWUgYW4gZXZlbnQgaXMgdHJpZ2dlcmVkLlxuICAgICAqIEBwYXJhbSAgeyBTdHJpbmcgfSBldmVudCAtIGV2ZW50IGlkXG4gICAgICogQHBhcmFtICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZWxcbiAgICAgKi9cbiAgICBvbjoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xuICAgICAgICBpZiAodHlwZW9mIGZuID09ICdmdW5jdGlvbicpXG4gICAgICAgICAgeyAoY2FsbGJhY2tzW2V2ZW50XSA9IGNhbGxiYWNrc1tldmVudF0gfHwgW10pLnB1c2goZm4pOyB9XG4gICAgICAgIHJldHVybiBlbFxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBnaXZlbiBgZXZlbnRgIGxpc3RlbmVyc1xuICAgICAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gZXZlbnQgLSBldmVudCBpZFxuICAgICAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMgeyBPYmplY3QgfSBlbFxuICAgICAqL1xuICAgIG9mZjoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xuICAgICAgICBpZiAoZXZlbnQgPT0gJyonICYmICFmbikgeyBjYWxsYmFja3MgPSB7fTsgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgIHZhciBhcnIgPSBjYWxsYmFja3NbZXZlbnRdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGNiOyBjYiA9IGFyciAmJiBhcnJbaV07ICsraSkge1xuICAgICAgICAgICAgICBpZiAoY2IgPT0gZm4pIHsgYXJyLnNwbGljZShpLS0sIDEpOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHsgZGVsZXRlIGNhbGxiYWNrc1tldmVudF07IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTGlzdGVuIHRvIHRoZSBnaXZlbiBgZXZlbnRgIGFuZFxuICAgICAqIGV4ZWN1dGUgdGhlIGBjYWxsYmFja2AgYXQgbW9zdCBvbmNlXG4gICAgICogQHBhcmFtICAgeyBTdHJpbmcgfSBldmVudCAtIGV2ZW50IGlkXG4gICAgICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IGVsXG4gICAgICovXG4gICAgb25lOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uKCkge1xuICAgICAgICAgIGVsLm9mZihldmVudCwgb24pO1xuICAgICAgICAgIGZuLmFwcGx5KGVsLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbC5vbihldmVudCwgb24pXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgYWxsIGNhbGxiYWNrIGZ1bmN0aW9ucyB0aGF0IGxpc3RlbiB0b1xuICAgICAqIHRoZSBnaXZlbiBgZXZlbnRgXG4gICAgICogQHBhcmFtICAgeyBTdHJpbmcgfSBldmVudCAtIGV2ZW50IGlkXG4gICAgICogQHJldHVybnMgeyBPYmplY3QgfSBlbFxuICAgICAqL1xuICAgIHRyaWdnZXI6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgYXJndW1lbnRzJDEgPSBhcmd1bWVudHM7XG5cblxuICAgICAgICAvLyBnZXR0aW5nIHRoZSBhcmd1bWVudHNcbiAgICAgICAgdmFyIGFyZ2xlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxLFxuICAgICAgICAgIGFyZ3MgPSBuZXcgQXJyYXkoYXJnbGVuKSxcbiAgICAgICAgICBmbnMsXG4gICAgICAgICAgZm4sXG4gICAgICAgICAgaTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJnbGVuOyBpKyspIHtcbiAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzJDFbaSArIDFdOyAvLyBza2lwIGZpcnN0IGFyZ3VtZW50XG4gICAgICAgIH1cblxuICAgICAgICBmbnMgPSBzbGljZS5jYWxsKGNhbGxiYWNrc1tldmVudF0gfHwgW10sIDApO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGZuID0gZm5zW2ldOyArK2kpIHtcbiAgICAgICAgICBmbi5hcHBseShlbCwgYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FsbGJhY2tzWycqJ10gJiYgZXZlbnQgIT0gJyonKVxuICAgICAgICAgIHsgZWwudHJpZ2dlci5hcHBseShlbCwgWycqJywgZXZlbnRdLmNvbmNhdChhcmdzKSk7IH1cblxuICAgICAgICByZXR1cm4gZWxcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBlbFxuXG59O1xuXG4vKipcbiAqIFNwZWNpYWxpemVkIGZ1bmN0aW9uIGZvciBsb29waW5nIGFuIGFycmF5LWxpa2UgY29sbGVjdGlvbiB3aXRoIGBlYWNoPXt9YFxuICogQHBhcmFtICAgeyBBcnJheSB9IGxpc3QgLSBjb2xsZWN0aW9uIG9mIGl0ZW1zXG4gKiBAcGFyYW0gICB7RnVuY3Rpb259IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHsgQXJyYXkgfSB0aGUgYXJyYXkgbG9vcGVkXG4gKi9cbmZ1bmN0aW9uIGVhY2gobGlzdCwgZm4pIHtcbiAgdmFyIGxlbiA9IGxpc3QgPyBsaXN0Lmxlbmd0aCA6IDA7XG4gIHZhciBpID0gMDtcbiAgZm9yICg7IGkgPCBsZW47ICsraSkge1xuICAgIGZuKGxpc3RbaV0sIGkpO1xuICB9XG4gIHJldHVybiBsaXN0XG59XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciBhbiBhcnJheSBjb250YWlucyBhbiBpdGVtXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gYXJyYXkgLSB0YXJnZXQgYXJyYXlcbiAqIEBwYXJhbSAgIHsgKiB9IGl0ZW0gLSBpdGVtIHRvIHRlc3RcbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gY29udGFpbnMoYXJyYXksIGl0ZW0pIHtcbiAgcmV0dXJuIGFycmF5LmluZGV4T2YoaXRlbSkgIT09IC0xXG59XG5cbi8qKlxuICogQ29udmVydCBhIHN0cmluZyBjb250YWluaW5nIGRhc2hlcyB0byBjYW1lbCBjYXNlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHN0ciAtIGlucHV0IHN0cmluZ1xuICogQHJldHVybnMgeyBTdHJpbmcgfSBteS1zdHJpbmcgLT4gbXlTdHJpbmdcbiAqL1xuZnVuY3Rpb24gdG9DYW1lbChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8tKFxcdykvZywgZnVuY3Rpb24gKF8sIGMpIHsgcmV0dXJuIGMudG9VcHBlckNhc2UoKTsgfSlcbn1cblxuLyoqXG4gKiBGYXN0ZXIgU3RyaW5nIHN0YXJ0c1dpdGggYWx0ZXJuYXRpdmVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gc3RyIC0gc291cmNlIHN0cmluZ1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSB2YWx1ZSAtIHRlc3Qgc3RyaW5nXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0c1dpdGgoc3RyLCB2YWx1ZSkge1xuICByZXR1cm4gc3RyLnNsaWNlKDAsIHZhbHVlLmxlbmd0aCkgPT09IHZhbHVlXG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIHNldCBhbiBpbW11dGFibGUgcHJvcGVydHlcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZWwgLSBvYmplY3Qgd2hlcmUgdGhlIG5ldyBwcm9wZXJ0eSB3aWxsIGJlIHNldFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBrZXkgLSBvYmplY3Qga2V5IHdoZXJlIHRoZSBuZXcgcHJvcGVydHkgd2lsbCBiZSBzdG9yZWRcbiAqIEBwYXJhbSAgIHsgKiB9IHZhbHVlIC0gdmFsdWUgb2YgdGhlIG5ldyBwcm9wZXJ0eVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBvcHRpb25zIC0gc2V0IHRoZSBwcm9wZXJ5IG92ZXJyaWRpbmcgdGhlIGRlZmF1bHQgb3B0aW9uc1xuICogQHJldHVybnMgeyBPYmplY3QgfSAtIHRoZSBpbml0aWFsIG9iamVjdFxuICovXG5mdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShlbCwga2V5LCB2YWx1ZSwgb3B0aW9ucykge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWwsIGtleSwgZXh0ZW5kKHtcbiAgICB2YWx1ZTogdmFsdWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9LCBvcHRpb25zKSk7XG4gIHJldHVybiBlbFxufVxuXG4vKipcbiAqIEV4dGVuZCBhbnkgb2JqZWN0IHdpdGggb3RoZXIgcHJvcGVydGllc1xuICogQHBhcmFtICAgeyBPYmplY3QgfSBzcmMgLSBzb3VyY2Ugb2JqZWN0XG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IHRoZSByZXN1bHRpbmcgZXh0ZW5kZWQgb2JqZWN0XG4gKlxuICogdmFyIG9iaiA9IHsgZm9vOiAnYmF6JyB9XG4gKiBleHRlbmQob2JqLCB7YmFyOiAnYmFyJywgZm9vOiAnYmFyJ30pXG4gKiBjb25zb2xlLmxvZyhvYmopID0+IHtiYXI6ICdiYXInLCBmb286ICdiYXInfVxuICpcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKHNyYykge1xuICB2YXIgb2JqLCBhcmdzID0gYXJndW1lbnRzO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAob2JqID0gYXJnc1tpXSkge1xuICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAvLyBjaGVjayBpZiB0aGlzIHByb3BlcnR5IG9mIHRoZSBzb3VyY2Ugb2JqZWN0IGNvdWxkIGJlIG92ZXJyaWRkZW5cbiAgICAgICAgaWYgKGlzV3JpdGFibGUoc3JjLCBrZXkpKVxuICAgICAgICAgIHsgc3JjW2tleV0gPSBvYmpba2V5XTsgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3JjXG59XG5cbnZhciBtaXNjID0gT2JqZWN0LmZyZWV6ZSh7XG5cdGVhY2g6IGVhY2gsXG5cdGNvbnRhaW5zOiBjb250YWlucyxcblx0dG9DYW1lbDogdG9DYW1lbCxcblx0c3RhcnRzV2l0aDogc3RhcnRzV2l0aCxcblx0ZGVmaW5lUHJvcGVydHk6IGRlZmluZVByb3BlcnR5LFxuXHRleHRlbmQ6IGV4dGVuZFxufSk7XG5cbnZhciBzZXR0aW5ncyQxID0gZXh0ZW5kKE9iamVjdC5jcmVhdGUoYnJhY2tldHMuc2V0dGluZ3MpLCB7XG4gIHNraXBBbm9ueW1vdXNUYWdzOiB0cnVlXG59KTtcblxuLyoqXG4gKiBUcmlnZ2VyIERPTSBldmVudHNcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSBkb20gLSBkb20gZWxlbWVudCB0YXJnZXQgb2YgdGhlIGV2ZW50XG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gaGFuZGxlciAtIHVzZXIgZnVuY3Rpb25cbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZSAtIGV2ZW50IG9iamVjdFxuICovXG5mdW5jdGlvbiBoYW5kbGVFdmVudChkb20sIGhhbmRsZXIsIGUpIHtcbiAgdmFyIHB0YWcgPSB0aGlzLl9fLnBhcmVudCxcbiAgICBpdGVtID0gdGhpcy5fXy5pdGVtO1xuXG4gIGlmICghaXRlbSlcbiAgICB7IHdoaWxlIChwdGFnICYmICFpdGVtKSB7XG4gICAgICBpdGVtID0gcHRhZy5fXy5pdGVtO1xuICAgICAgcHRhZyA9IHB0YWcuX18ucGFyZW50O1xuICAgIH0gfVxuXG4gIC8vIG92ZXJyaWRlIHRoZSBldmVudCBwcm9wZXJ0aWVzXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChpc1dyaXRhYmxlKGUsICdjdXJyZW50VGFyZ2V0JykpIHsgZS5jdXJyZW50VGFyZ2V0ID0gZG9tOyB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChpc1dyaXRhYmxlKGUsICd0YXJnZXQnKSkgeyBlLnRhcmdldCA9IGUuc3JjRWxlbWVudDsgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAoaXNXcml0YWJsZShlLCAnd2hpY2gnKSkgeyBlLndoaWNoID0gZS5jaGFyQ29kZSB8fCBlLmtleUNvZGU7IH1cblxuICBlLml0ZW0gPSBpdGVtO1xuXG4gIGhhbmRsZXIuY2FsbCh0aGlzLCBlKTtcblxuICBpZiAoIWUucHJldmVudFVwZGF0ZSkge1xuICAgIHZhciBwID0gZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHRoaXMpO1xuICAgIC8vIGZpeGVzICMyMDgzXG4gICAgaWYgKHAuaXNNb3VudGVkKSB7IHAudXBkYXRlKCk7IH1cbiAgfVxufVxuXG4vKipcbiAqIEF0dGFjaCBhbiBldmVudCB0byBhIERPTSBub2RlXG4gKiBAcGFyYW0geyBTdHJpbmcgfSBuYW1lIC0gZXZlbnQgbmFtZVxuICogQHBhcmFtIHsgRnVuY3Rpb24gfSBoYW5kbGVyIC0gZXZlbnQgY2FsbGJhY2tcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGRvbSAtIGRvbSBub2RlXG4gKiBAcGFyYW0geyBUYWcgfSB0YWcgLSB0YWcgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gc2V0RXZlbnRIYW5kbGVyKG5hbWUsIGhhbmRsZXIsIGRvbSwgdGFnKSB7XG4gIHZhciBldmVudE5hbWUsXG4gICAgY2IgPSBoYW5kbGVFdmVudC5iaW5kKHRhZywgZG9tLCBoYW5kbGVyKTtcblxuICAvLyBhdm9pZCB0byBiaW5kIHR3aWNlIHRoZSBzYW1lIGV2ZW50XG4gIC8vIHBvc3NpYmxlIGZpeCBmb3IgIzIzMzJcbiAgZG9tW25hbWVdID0gbnVsbDtcblxuICAvLyBub3JtYWxpemUgZXZlbnQgbmFtZVxuICBldmVudE5hbWUgPSBuYW1lLnJlcGxhY2UoUkVfRVZFTlRTX1BSRUZJWCwgJycpO1xuXG4gIC8vIGNhY2hlIHRoZSBsaXN0ZW5lciBpbnRvIHRoZSBsaXN0ZW5lcnMgYXJyYXlcbiAgaWYgKCFjb250YWlucyh0YWcuX18ubGlzdGVuZXJzLCBkb20pKSB7IHRhZy5fXy5saXN0ZW5lcnMucHVzaChkb20pOyB9XG4gIGlmICghZG9tW1JJT1RfRVZFTlRTX0tFWV0pIHsgZG9tW1JJT1RfRVZFTlRTX0tFWV0gPSB7fTsgfVxuICBpZiAoZG9tW1JJT1RfRVZFTlRTX0tFWV1bbmFtZV0pIHsgZG9tLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBkb21bUklPVF9FVkVOVFNfS0VZXVtuYW1lXSk7IH1cblxuICBkb21bUklPVF9FVkVOVFNfS0VZXVtuYW1lXSA9IGNiO1xuICBkb20uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNiLCBmYWxzZSk7XG59XG5cbi8qKlxuICogVXBkYXRlIGR5bmFtaWNhbGx5IGNyZWF0ZWQgZGF0YS1pcyB0YWdzIHdpdGggY2hhbmdpbmcgZXhwcmVzc2lvbnNcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGV4cHIgLSBleHByZXNzaW9uIHRhZyBhbmQgZXhwcmVzc2lvbiBpbmZvXG4gKiBAcGFyYW0geyBUYWcgfSAgICBwYXJlbnQgLSBwYXJlbnQgZm9yIHRhZyBjcmVhdGlvblxuICogQHBhcmFtIHsgU3RyaW5nIH0gdGFnTmFtZSAtIHRhZyBpbXBsZW1lbnRhdGlvbiB3ZSB3YW50IHRvIHVzZVxuICovXG5mdW5jdGlvbiB1cGRhdGVEYXRhSXMoZXhwciwgcGFyZW50LCB0YWdOYW1lKSB7XG4gIHZhciBjb25mLCBpc1ZpcnR1YWwsIGhlYWQsIHJlZjtcblxuICBpZiAoZXhwci50YWcgJiYgZXhwci50YWdOYW1lID09PSB0YWdOYW1lKSB7XG4gICAgZXhwci50YWcudXBkYXRlKCk7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpc1ZpcnR1YWwgPSBleHByLmRvbS50YWdOYW1lID09PSAnVklSVFVBTCc7XG4gIC8vIHN5bmMgX3BhcmVudCB0byBhY2NvbW1vZGF0ZSBjaGFuZ2luZyB0YWduYW1lc1xuICBpZiAoZXhwci50YWcpIHtcbiAgICAvLyBuZWVkIHBsYWNlaG9sZGVyIGJlZm9yZSB1bm1vdW50XG4gICAgaWYoaXNWaXJ0dWFsKSB7XG4gICAgICBoZWFkID0gZXhwci50YWcuX18uaGVhZDtcbiAgICAgIHJlZiA9IGNyZWF0ZURPTVBsYWNlaG9sZGVyKCk7XG4gICAgICBoZWFkLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHJlZiwgaGVhZCk7XG4gICAgfVxuXG4gICAgZXhwci50YWcudW5tb3VudCh0cnVlKTtcbiAgfVxuXG4gIGlmICghaXNTdHJpbmcodGFnTmFtZSkpIHsgcmV0dXJuIH1cblxuICBleHByLmltcGwgPSBfX1RBR19JTVBMW3RhZ05hbWVdO1xuICBjb25mID0ge3Jvb3Q6IGV4cHIuZG9tLCBwYXJlbnQ6IHBhcmVudCwgaGFzSW1wbDogdHJ1ZSwgdGFnTmFtZTogdGFnTmFtZX07XG4gIGV4cHIudGFnID0gaW5pdENoaWxkVGFnKGV4cHIuaW1wbCwgY29uZiwgZXhwci5kb20uaW5uZXJIVE1MLCBwYXJlbnQpO1xuICBlYWNoKGV4cHIuYXR0cnMsIGZ1bmN0aW9uIChhKSB7IHJldHVybiBzZXRBdHRyKGV4cHIudGFnLnJvb3QsIGEubmFtZSwgYS52YWx1ZSk7IH0pO1xuICBleHByLnRhZ05hbWUgPSB0YWdOYW1lO1xuICBleHByLnRhZy5tb3VudCgpO1xuICBpZiAoaXNWaXJ0dWFsKVxuICAgIHsgbWFrZVJlcGxhY2VWaXJ0dWFsKGV4cHIudGFnLCByZWYgfHwgZXhwci50YWcucm9vdCk7IH0gLy8gcm9vdCBleGlzdCBmaXJzdCB0aW1lLCBhZnRlciB1c2UgcGxhY2Vob2xkZXJcblxuICAvLyBwYXJlbnQgaXMgdGhlIHBsYWNlaG9sZGVyIHRhZywgbm90IHRoZSBkeW5hbWljIHRhZyBzbyBjbGVhbiB1cFxuICBwYXJlbnQuX18ub25Vbm1vdW50ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRlbE5hbWUgPSBleHByLnRhZy5vcHRzLmRhdGFJcyxcbiAgICAgIHRhZ3MgPSBleHByLnRhZy5wYXJlbnQudGFncyxcbiAgICAgIF90YWdzID0gZXhwci50YWcuX18ucGFyZW50LnRhZ3M7XG4gICAgYXJyYXlpc2hSZW1vdmUodGFncywgZGVsTmFtZSwgZXhwci50YWcpO1xuICAgIGFycmF5aXNoUmVtb3ZlKF90YWdzLCBkZWxOYW1lLCBleHByLnRhZyk7XG4gICAgZXhwci50YWcudW5tb3VudCgpO1xuICB9O1xufVxuXG4vKipcbiAqIE5vbWFsaXplIGFueSBhdHRyaWJ1dGUgcmVtb3ZpbmcgdGhlIFwicmlvdC1cIiBwcmVmaXhcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gYXR0ck5hbWUgLSBvcmlnaW5hbCBhdHRyaWJ1dGUgbmFtZVxuICogQHJldHVybnMgeyBTdHJpbmcgfSB2YWxpZCBodG1sIGF0dHJpYnV0ZSBuYW1lXG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZUF0dHJOYW1lKGF0dHJOYW1lKSB7XG4gIGlmICghYXR0ck5hbWUpIHsgcmV0dXJuIG51bGwgfVxuICBhdHRyTmFtZSA9IGF0dHJOYW1lLnJlcGxhY2UoQVRUUlNfUFJFRklYLCAnJyk7XG4gIGlmIChDQVNFX1NFTlNJVElWRV9BVFRSSUJVVEVTW2F0dHJOYW1lXSkgeyBhdHRyTmFtZSA9IENBU0VfU0VOU0lUSVZFX0FUVFJJQlVURVNbYXR0ck5hbWVdOyB9XG4gIHJldHVybiBhdHRyTmFtZVxufVxuXG4vKipcbiAqIFVwZGF0ZSBvbiBzaW5nbGUgdGFnIGV4cHJlc3Npb25cbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtIHsgT2JqZWN0IH0gZXhwciAtIGV4cHJlc3Npb24gbG9naWNcbiAqIEByZXR1cm5zIHsgdW5kZWZpbmVkIH1cbiAqL1xuZnVuY3Rpb24gdXBkYXRlRXhwcmVzc2lvbihleHByKSB7XG4gIGlmICh0aGlzLnJvb3QgJiYgZ2V0QXR0cih0aGlzLnJvb3QsJ3ZpcnR1YWxpemVkJykpIHsgcmV0dXJuIH1cblxuICB2YXIgZG9tID0gZXhwci5kb20sXG4gICAgLy8gcmVtb3ZlIHRoZSByaW90LSBwcmVmaXhcbiAgICBhdHRyTmFtZSA9IG5vcm1hbGl6ZUF0dHJOYW1lKGV4cHIuYXR0ciksXG4gICAgaXNUb2dnbGUgPSBjb250YWlucyhbU0hPV19ESVJFQ1RJVkUsIEhJREVfRElSRUNUSVZFXSwgYXR0ck5hbWUpLFxuICAgIGlzVmlydHVhbCA9IGV4cHIucm9vdCAmJiBleHByLnJvb3QudGFnTmFtZSA9PT0gJ1ZJUlRVQUwnLFxuICAgIHBhcmVudCA9IGRvbSAmJiAoZXhwci5wYXJlbnQgfHwgZG9tLnBhcmVudE5vZGUpLFxuICAgIC8vIGRldGVjdCB0aGUgc3R5bGUgYXR0cmlidXRlc1xuICAgIGlzU3R5bGVBdHRyID0gYXR0ck5hbWUgPT09ICdzdHlsZScsXG4gICAgaXNDbGFzc0F0dHIgPSBhdHRyTmFtZSA9PT0gJ2NsYXNzJyxcbiAgICBoYXNWYWx1ZSxcbiAgICBpc09iaixcbiAgICB2YWx1ZTtcblxuICAvLyBpZiBpdCdzIGEgdGFnIHdlIGNvdWxkIHRvdGFsbHkgc2tpcCB0aGUgcmVzdFxuICBpZiAoZXhwci5fcmlvdF9pZCkge1xuICAgIGlmIChleHByLmlzTW91bnRlZCkge1xuICAgICAgZXhwci51cGRhdGUoKTtcbiAgICAvLyBpZiBpdCBoYXNuJ3QgYmVlbiBtb3VudGVkIHlldCwgZG8gdGhhdCBub3cuXG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cHIubW91bnQoKTtcbiAgICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgICAgbWFrZVJlcGxhY2VWaXJ0dWFsKGV4cHIsIGV4cHIucm9vdCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVyblxuICB9XG4gIC8vIGlmIHRoaXMgZXhwcmVzc2lvbiBoYXMgdGhlIHVwZGF0ZSBtZXRob2QgaXQgbWVhbnMgaXQgY2FuIGhhbmRsZSB0aGUgRE9NIGNoYW5nZXMgYnkgaXRzZWxmXG4gIGlmIChleHByLnVwZGF0ZSkgeyByZXR1cm4gZXhwci51cGRhdGUoKSB9XG5cbiAgLy8gLi4uaXQgc2VlbXMgdG8gYmUgYSBzaW1wbGUgZXhwcmVzc2lvbiBzbyB3ZSB0cnkgdG8gY2FsY3VsYXQgaXRzIHZhbHVlXG4gIHZhbHVlID0gdG1wbChleHByLmV4cHIsIGlzVG9nZ2xlID8gZXh0ZW5kKE9iamVjdC5jcmVhdGUodGhpcy5wYXJlbnQpLCB0aGlzKSA6IHRoaXMpO1xuICBoYXNWYWx1ZSA9ICFpc0JsYW5rKHZhbHVlKTtcbiAgaXNPYmogPSBpc09iamVjdCh2YWx1ZSk7XG5cbiAgLy8gY29udmVydCB0aGUgc3R5bGUvY2xhc3Mgb2JqZWN0cyB0byBzdHJpbmdzXG4gIGlmIChpc09iaikge1xuICAgIGlzT2JqID0gIWlzQ2xhc3NBdHRyICYmICFpc1N0eWxlQXR0cjtcbiAgICBpZiAoaXNDbGFzc0F0dHIpIHtcbiAgICAgIHZhbHVlID0gdG1wbChKU09OLnN0cmluZ2lmeSh2YWx1ZSksIHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoaXNTdHlsZUF0dHIpIHtcbiAgICAgIHZhbHVlID0gc3R5bGVPYmplY3RUb1N0cmluZyh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gcmVtb3ZlIG9yaWdpbmFsIGF0dHJpYnV0ZVxuICBpZiAoZXhwci5hdHRyICYmICghZXhwci5pc0F0dHJSZW1vdmVkIHx8ICFoYXNWYWx1ZSkpIHtcbiAgICByZW1BdHRyKGRvbSwgZXhwci5hdHRyKTtcbiAgICBleHByLmlzQXR0clJlbW92ZWQgPSB0cnVlO1xuICB9XG5cbiAgLy8gZm9yIHRoZSBib29sZWFuIGF0dHJpYnV0ZXMgd2UgZG9uJ3QgbmVlZCB0aGUgdmFsdWVcbiAgLy8gd2UgY2FuIGNvbnZlcnQgaXQgdG8gY2hlY2tlZD10cnVlIHRvIGNoZWNrZWQ9Y2hlY2tlZFxuICBpZiAoZXhwci5ib29sKSB7IHZhbHVlID0gdmFsdWUgPyBhdHRyTmFtZSA6IGZhbHNlOyB9XG4gIGlmIChleHByLmlzUnRhZykgeyByZXR1cm4gdXBkYXRlRGF0YUlzKGV4cHIsIHRoaXMsIHZhbHVlKSB9XG4gIGlmIChleHByLndhc1BhcnNlZE9uY2UgJiYgZXhwci52YWx1ZSA9PT0gdmFsdWUpIHsgcmV0dXJuIH1cblxuICAvLyB1cGRhdGUgdGhlIGV4cHJlc3Npb24gdmFsdWVcbiAgZXhwci52YWx1ZSA9IHZhbHVlO1xuICBleHByLndhc1BhcnNlZE9uY2UgPSB0cnVlO1xuXG4gIC8vIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3Qgd2UgY2FuIG5vdCBkbyBtdWNoIG1vcmUgd2l0aCBpdFxuICBpZiAoaXNPYmogJiYgIWlzVG9nZ2xlKSB7IHJldHVybiB9XG4gIC8vIGF2b2lkIHRvIHJlbmRlciB1bmRlZmluZWQvbnVsbCB2YWx1ZXNcbiAgaWYgKGlzQmxhbmsodmFsdWUpKSB7IHZhbHVlID0gJyc7IH1cblxuICAvLyB0ZXh0YXJlYSBhbmQgdGV4dCBub2RlcyBoYXZlIG5vIGF0dHJpYnV0ZSBuYW1lXG4gIGlmICghYXR0ck5hbWUpIHtcbiAgICAvLyBhYm91dCAjODE1IHcvbyByZXBsYWNlOiB0aGUgYnJvd3NlciBjb252ZXJ0cyB0aGUgdmFsdWUgdG8gYSBzdHJpbmcsXG4gICAgLy8gdGhlIGNvbXBhcmlzb24gYnkgXCI9PVwiIGRvZXMgdG9vLCBidXQgbm90IGluIHRoZSBzZXJ2ZXJcbiAgICB2YWx1ZSArPSAnJztcbiAgICAvLyB0ZXN0IGZvciBwYXJlbnQgYXZvaWRzIGVycm9yIHdpdGggaW52YWxpZCBhc3NpZ25tZW50IHRvIG5vZGVWYWx1ZVxuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIC8vIGNhY2hlIHRoZSBwYXJlbnQgbm9kZSBiZWNhdXNlIHNvbWVob3cgaXQgd2lsbCBiZWNvbWUgbnVsbCBvbiBJRVxuICAgICAgLy8gb24gdGhlIG5leHQgaXRlcmF0aW9uXG4gICAgICBleHByLnBhcmVudCA9IHBhcmVudDtcbiAgICAgIGlmIChwYXJlbnQudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJykge1xuICAgICAgICBwYXJlbnQudmFsdWUgPSB2YWx1ZTsgICAgICAgICAgICAgICAgICAgIC8vICMxMTEzXG4gICAgICAgIGlmICghSUVfVkVSU0lPTikgeyBkb20ubm9kZVZhbHVlID0gdmFsdWU7IH0gIC8vICMxNjI1IElFIHRocm93cyBoZXJlLCBub2RlVmFsdWVcbiAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdpbGwgYmUgYXZhaWxhYmxlIG9uICd1cGRhdGVkJ1xuICAgICAgZWxzZSB7IGRvbS5ub2RlVmFsdWUgPSB2YWx1ZTsgfVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG5cbiAgLy8gZXZlbnQgaGFuZGxlclxuICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICBzZXRFdmVudEhhbmRsZXIoYXR0ck5hbWUsIHZhbHVlLCBkb20sIHRoaXMpO1xuICAvLyBzaG93IC8gaGlkZVxuICB9IGVsc2UgaWYgKGlzVG9nZ2xlKSB7XG4gICAgdG9nZ2xlVmlzaWJpbGl0eShkb20sIGF0dHJOYW1lID09PSBISURFX0RJUkVDVElWRSA/ICF2YWx1ZSA6IHZhbHVlKTtcbiAgLy8gaGFuZGxlIGF0dHJpYnV0ZXNcbiAgfSBlbHNlIHtcbiAgICBpZiAoZXhwci5ib29sKSB7XG4gICAgICBkb21bYXR0ck5hbWVdID0gdmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKGF0dHJOYW1lID09PSAndmFsdWUnICYmIGRvbS52YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIGRvbS52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGlmIChoYXNWYWx1ZSAmJiB2YWx1ZSAhPT0gZmFsc2UpIHtcbiAgICAgIHNldEF0dHIoZG9tLCBhdHRyTmFtZSwgdmFsdWUpO1xuICAgIH1cblxuICAgIC8vIG1ha2Ugc3VyZSB0aGF0IGluIGNhc2Ugb2Ygc3R5bGUgY2hhbmdlc1xuICAgIC8vIHRoZSBlbGVtZW50IHN0YXlzIGhpZGRlblxuICAgIGlmIChpc1N0eWxlQXR0ciAmJiBkb20uaGlkZGVuKSB7IHRvZ2dsZVZpc2liaWxpdHkoZG9tLCBmYWxzZSk7IH1cbiAgfVxufVxuXG4vKipcbiAqIFVwZGF0ZSBhbGwgdGhlIGV4cHJlc3Npb25zIGluIGEgVGFnIGluc3RhbmNlXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSB7IEFycmF5IH0gZXhwcmVzc2lvbnMgLSBleHByZXNzaW9uIHRoYXQgbXVzdCBiZSByZSBldmFsdWF0ZWRcbiAqL1xuZnVuY3Rpb24gdXBkYXRlQWxsRXhwcmVzc2lvbnMoZXhwcmVzc2lvbnMpIHtcbiAgZWFjaChleHByZXNzaW9ucywgdXBkYXRlRXhwcmVzc2lvbi5iaW5kKHRoaXMpKTtcbn1cblxudmFyIElmRXhwciA9IHtcbiAgaW5pdDogZnVuY3Rpb24gaW5pdChkb20sIHRhZywgZXhwcikge1xuICAgIHJlbUF0dHIoZG9tLCBDT05ESVRJT05BTF9ESVJFQ1RJVkUpO1xuICAgIHRoaXMudGFnID0gdGFnO1xuICAgIHRoaXMuZXhwciA9IGV4cHI7XG4gICAgdGhpcy5zdHViID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgIHRoaXMucHJpc3RpbmUgPSBkb207XG5cbiAgICB2YXIgcCA9IGRvbS5wYXJlbnROb2RlO1xuICAgIHAuaW5zZXJ0QmVmb3JlKHRoaXMuc3R1YiwgZG9tKTtcbiAgICBwLnJlbW92ZUNoaWxkKGRvbSk7XG5cbiAgICByZXR1cm4gdGhpc1xuICB9LFxuICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICB0aGlzLnZhbHVlID0gdG1wbCh0aGlzLmV4cHIsIHRoaXMudGFnKTtcblxuICAgIGlmICh0aGlzLnZhbHVlICYmICF0aGlzLmN1cnJlbnQpIHsgLy8gaW5zZXJ0XG4gICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLnByaXN0aW5lLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgIHRoaXMuc3R1Yi5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLmN1cnJlbnQsIHRoaXMuc3R1Yik7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zID0gW107XG4gICAgICBwYXJzZUV4cHJlc3Npb25zLmFwcGx5KHRoaXMudGFnLCBbdGhpcy5jdXJyZW50LCB0aGlzLmV4cHJlc3Npb25zLCB0cnVlXSk7XG4gICAgfSBlbHNlIGlmICghdGhpcy52YWx1ZSAmJiB0aGlzLmN1cnJlbnQpIHsgLy8gcmVtb3ZlXG4gICAgICB1bm1vdW50QWxsKHRoaXMuZXhwcmVzc2lvbnMpO1xuICAgICAgaWYgKHRoaXMuY3VycmVudC5fdGFnKSB7XG4gICAgICAgIHRoaXMuY3VycmVudC5fdGFnLnVubW91bnQoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50LnBhcmVudE5vZGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5jdXJyZW50KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY3VycmVudCA9IG51bGw7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zID0gW107XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudmFsdWUpIHsgdXBkYXRlQWxsRXhwcmVzc2lvbnMuY2FsbCh0aGlzLnRhZywgdGhpcy5leHByZXNzaW9ucyk7IH1cbiAgfSxcbiAgdW5tb3VudDogZnVuY3Rpb24gdW5tb3VudCgpIHtcbiAgICB1bm1vdW50QWxsKHRoaXMuZXhwcmVzc2lvbnMgfHwgW10pO1xuICAgIGRlbGV0ZSB0aGlzLnByaXN0aW5lO1xuICAgIGRlbGV0ZSB0aGlzLnBhcmVudE5vZGU7XG4gICAgZGVsZXRlIHRoaXMuc3R1YjtcbiAgfVxufTtcblxudmFyIFJlZkV4cHIgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoZG9tLCBwYXJlbnQsIGF0dHJOYW1lLCBhdHRyVmFsdWUpIHtcbiAgICB0aGlzLmRvbSA9IGRvbTtcbiAgICB0aGlzLmF0dHIgPSBhdHRyTmFtZTtcbiAgICB0aGlzLnJhd1ZhbHVlID0gYXR0clZhbHVlO1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuaGFzRXhwID0gdG1wbC5oYXNFeHByKGF0dHJWYWx1ZSk7XG4gICAgcmV0dXJuIHRoaXNcbiAgfSxcbiAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdmFyIG9sZCA9IHRoaXMudmFsdWU7XG4gICAgdmFyIGN1c3RvbVBhcmVudCA9IHRoaXMucGFyZW50ICYmIGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyh0aGlzLnBhcmVudCk7XG4gICAgLy8gaWYgdGhlIHJlZmVyZW5jZWQgZWxlbWVudCBpcyBhIGN1c3RvbSB0YWcsIHRoZW4gd2Ugc2V0IHRoZSB0YWcgaXRzZWxmLCByYXRoZXIgdGhhbiBET01cbiAgICB2YXIgdGFnT3JEb20gPSB0aGlzLnRhZyB8fCB0aGlzLmRvbTtcblxuICAgIHRoaXMudmFsdWUgPSB0aGlzLmhhc0V4cCA/IHRtcGwodGhpcy5yYXdWYWx1ZSwgdGhpcy5wYXJlbnQpIDogdGhpcy5yYXdWYWx1ZTtcblxuICAgIC8vIHRoZSBuYW1lIGNoYW5nZWQsIHNvIHdlIG5lZWQgdG8gcmVtb3ZlIGl0IGZyb20gdGhlIG9sZCBrZXkgKGlmIHByZXNlbnQpXG4gICAgaWYgKCFpc0JsYW5rKG9sZCkgJiYgY3VzdG9tUGFyZW50KSB7IGFycmF5aXNoUmVtb3ZlKGN1c3RvbVBhcmVudC5yZWZzLCBvbGQsIHRhZ09yRG9tKTsgfVxuICAgIGlmICghaXNCbGFuayh0aGlzLnZhbHVlKSkge1xuICAgICAgLy8gYWRkIGl0IHRvIHRoZSByZWZzIG9mIHBhcmVudCB0YWcgKHRoaXMgYmVoYXZpb3Igd2FzIGNoYW5nZWQgPj0zLjApXG4gICAgICBpZiAoY3VzdG9tUGFyZW50KSB7IGFycmF5aXNoQWRkKFxuICAgICAgICBjdXN0b21QYXJlbnQucmVmcyxcbiAgICAgICAgdGhpcy52YWx1ZSxcbiAgICAgICAgdGFnT3JEb20sXG4gICAgICAgIC8vIHVzZSBhbiBhcnJheSBpZiBpdCdzIGEgbG9vcGVkIG5vZGUgYW5kIHRoZSByZWYgaXMgbm90IGFuIGV4cHJlc3Npb25cbiAgICAgICAgbnVsbCxcbiAgICAgICAgdGhpcy5wYXJlbnQuX18uaW5kZXhcbiAgICAgICk7IH1cbiAgICB9XG5cbiAgICAvLyBpZiBpdCdzIHRoZSBmaXJzdCB0aW1lIHdlIHBhc3MgaGVyZSBsZXQncyByZW1vdmUgdGhlIHJlZiBhdHRyaWJ1dGVcbiAgICAvLyAjMjMyOVxuICAgIGlmICghb2xkKSB7IHJlbUF0dHIodGhpcy5kb20sIHRoaXMuYXR0cik7IH1cbiAgfSxcbiAgdW5tb3VudDogZnVuY3Rpb24gdW5tb3VudCgpIHtcbiAgICB2YXIgdGFnT3JEb20gPSB0aGlzLnRhZyB8fCB0aGlzLmRvbTtcbiAgICB2YXIgY3VzdG9tUGFyZW50ID0gdGhpcy5wYXJlbnQgJiYgZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHRoaXMucGFyZW50KTtcbiAgICBpZiAoIWlzQmxhbmsodGhpcy52YWx1ZSkgJiYgY3VzdG9tUGFyZW50KVxuICAgICAgeyBhcnJheWlzaFJlbW92ZShjdXN0b21QYXJlbnQucmVmcywgdGhpcy52YWx1ZSwgdGFnT3JEb20pOyB9XG4gICAgZGVsZXRlIHRoaXMuZG9tO1xuICAgIGRlbGV0ZSB0aGlzLnBhcmVudDtcbiAgfVxufTtcblxuLyoqXG4gKiBDb252ZXJ0IHRoZSBpdGVtIGxvb3BlZCBpbnRvIGFuIG9iamVjdCB1c2VkIHRvIGV4dGVuZCB0aGUgY2hpbGQgdGFnIHByb3BlcnRpZXNcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZXhwciAtIG9iamVjdCBjb250YWluaW5nIHRoZSBrZXlzIHVzZWQgdG8gZXh0ZW5kIHRoZSBjaGlsZHJlbiB0YWdzXG4gKiBAcGFyYW0gICB7ICogfSBrZXkgLSB2YWx1ZSB0byBhc3NpZ24gdG8gdGhlIG5ldyBvYmplY3QgcmV0dXJuZWRcbiAqIEBwYXJhbSAgIHsgKiB9IHZhbCAtIHZhbHVlIGNvbnRhaW5pbmcgdGhlIHBvc2l0aW9uIG9mIHRoZSBpdGVtIGluIHRoZSBhcnJheVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBiYXNlIC0gcHJvdG90eXBlIG9iamVjdCBmb3IgdGhlIG5ldyBpdGVtXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IC0gbmV3IG9iamVjdCBjb250YWluaW5nIHRoZSB2YWx1ZXMgb2YgdGhlIG9yaWdpbmFsIGl0ZW1cbiAqXG4gKiBUaGUgdmFyaWFibGVzICdrZXknIGFuZCAndmFsJyBhcmUgYXJiaXRyYXJ5LlxuICogVGhleSBkZXBlbmQgb24gdGhlIGNvbGxlY3Rpb24gdHlwZSBsb29wZWQgKEFycmF5LCBPYmplY3QpXG4gKiBhbmQgb24gdGhlIGV4cHJlc3Npb24gdXNlZCBvbiB0aGUgZWFjaCB0YWdcbiAqXG4gKi9cbmZ1bmN0aW9uIG1raXRlbShleHByLCBrZXksIHZhbCwgYmFzZSkge1xuICB2YXIgaXRlbSA9IGJhc2UgPyBPYmplY3QuY3JlYXRlKGJhc2UpIDoge307XG4gIGl0ZW1bZXhwci5rZXldID0ga2V5O1xuICBpZiAoZXhwci5wb3MpIHsgaXRlbVtleHByLnBvc10gPSB2YWw7IH1cbiAgcmV0dXJuIGl0ZW1cbn1cblxuLyoqXG4gKiBVbm1vdW50IHRoZSByZWR1bmRhbnQgdGFnc1xuICogQHBhcmFtICAgeyBBcnJheSB9IGl0ZW1zIC0gYXJyYXkgY29udGFpbmluZyB0aGUgY3VycmVudCBpdGVtcyB0byBsb29wXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gdGFncyAtIGFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSBjaGlsZHJlbiB0YWdzXG4gKi9cbmZ1bmN0aW9uIHVubW91bnRSZWR1bmRhbnQoaXRlbXMsIHRhZ3MpIHtcbiAgdmFyIGkgPSB0YWdzLmxlbmd0aCxcbiAgICBqID0gaXRlbXMubGVuZ3RoO1xuXG4gIHdoaWxlIChpID4gaikge1xuICAgIGktLTtcbiAgICByZW1vdmUuYXBwbHkodGFnc1tpXSwgW3RhZ3MsIGldKTtcbiAgfVxufVxuXG5cbi8qKlxuICogUmVtb3ZlIGEgY2hpbGQgdGFnXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSB0YWdzIC0gdGFncyBjb2xsZWN0aW9uXG4gKiBAcGFyYW0gICB7IE51bWJlciB9IGkgLSBpbmRleCBvZiB0aGUgdGFnIHRvIHJlbW92ZVxuICovXG5mdW5jdGlvbiByZW1vdmUodGFncywgaSkge1xuICB0YWdzLnNwbGljZShpLCAxKTtcbiAgdGhpcy51bm1vdW50KCk7XG4gIGFycmF5aXNoUmVtb3ZlKHRoaXMucGFyZW50LCB0aGlzLCB0aGlzLl9fLnRhZ05hbWUsIHRydWUpO1xufVxuXG4vKipcbiAqIE1vdmUgdGhlIG5lc3RlZCBjdXN0b20gdGFncyBpbiBub24gY3VzdG9tIGxvb3AgdGFnc1xuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IE51bWJlciB9IGkgLSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSBsb29wIHRhZ1xuICovXG5mdW5jdGlvbiBtb3ZlTmVzdGVkVGFncyhpKSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIGVhY2goT2JqZWN0LmtleXModGhpcy50YWdzKSwgZnVuY3Rpb24gKHRhZ05hbWUpIHtcbiAgICBtb3ZlQ2hpbGRUYWcuYXBwbHkodGhpcyQxLnRhZ3NbdGFnTmFtZV0sIFt0YWdOYW1lLCBpXSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIE1vdmUgYSBjaGlsZCB0YWdcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IHJvb3QgLSBkb20gbm9kZSBjb250YWluaW5nIGFsbCB0aGUgbG9vcCBjaGlsZHJlblxuICogQHBhcmFtICAgeyBUYWcgfSBuZXh0VGFnIC0gaW5zdGFuY2Ugb2YgdGhlIG5leHQgdGFnIHByZWNlZGluZyB0aGUgb25lIHdlIHdhbnQgdG8gbW92ZVxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gaXNWaXJ0dWFsIC0gaXMgaXQgYSB2aXJ0dWFsIHRhZz9cbiAqL1xuZnVuY3Rpb24gbW92ZShyb290LCBuZXh0VGFnLCBpc1ZpcnR1YWwpIHtcbiAgaWYgKGlzVmlydHVhbClcbiAgICB7IG1vdmVWaXJ0dWFsLmFwcGx5KHRoaXMsIFtyb290LCBuZXh0VGFnXSk7IH1cbiAgZWxzZVxuICAgIHsgc2FmZUluc2VydChyb290LCB0aGlzLnJvb3QsIG5leHRUYWcucm9vdCk7IH1cbn1cblxuLyoqXG4gKiBJbnNlcnQgYW5kIG1vdW50IGEgY2hpbGQgdGFnXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSByb290IC0gZG9tIG5vZGUgY29udGFpbmluZyBhbGwgdGhlIGxvb3AgY2hpbGRyZW5cbiAqIEBwYXJhbSAgIHsgVGFnIH0gbmV4dFRhZyAtIGluc3RhbmNlIG9mIHRoZSBuZXh0IHRhZyBwcmVjZWRpbmcgdGhlIG9uZSB3ZSB3YW50IHRvIGluc2VydFxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gaXNWaXJ0dWFsIC0gaXMgaXQgYSB2aXJ0dWFsIHRhZz9cbiAqL1xuZnVuY3Rpb24gaW5zZXJ0KHJvb3QsIG5leHRUYWcsIGlzVmlydHVhbCkge1xuICBpZiAoaXNWaXJ0dWFsKVxuICAgIHsgbWFrZVZpcnR1YWwuYXBwbHkodGhpcywgW3Jvb3QsIG5leHRUYWddKTsgfVxuICBlbHNlXG4gICAgeyBzYWZlSW5zZXJ0KHJvb3QsIHRoaXMucm9vdCwgbmV4dFRhZy5yb290KTsgfVxufVxuXG4vKipcbiAqIEFwcGVuZCBhIG5ldyB0YWcgaW50byB0aGUgRE9NXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSByb290IC0gZG9tIG5vZGUgY29udGFpbmluZyBhbGwgdGhlIGxvb3AgY2hpbGRyZW5cbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IGlzVmlydHVhbCAtIGlzIGl0IGEgdmlydHVhbCB0YWc/XG4gKi9cbmZ1bmN0aW9uIGFwcGVuZChyb290LCBpc1ZpcnR1YWwpIHtcbiAgaWYgKGlzVmlydHVhbClcbiAgICB7IG1ha2VWaXJ0dWFsLmNhbGwodGhpcywgcm9vdCk7IH1cbiAgZWxzZVxuICAgIHsgcm9vdC5hcHBlbmRDaGlsZCh0aGlzLnJvb3QpOyB9XG59XG5cbi8qKlxuICogTWFuYWdlIHRhZ3MgaGF2aW5nIHRoZSAnZWFjaCdcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSBkb20gLSBET00gbm9kZSB3ZSBuZWVkIHRvIGxvb3BcbiAqIEBwYXJhbSAgIHsgVGFnIH0gcGFyZW50IC0gcGFyZW50IHRhZyBpbnN0YW5jZSB3aGVyZSB0aGUgZG9tIG5vZGUgaXMgY29udGFpbmVkXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IGV4cHIgLSBzdHJpbmcgY29udGFpbmVkIGluIHRoZSAnZWFjaCcgYXR0cmlidXRlXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGV4cHJlc3Npb24gb2JqZWN0IGZvciB0aGlzIGVhY2ggbG9vcFxuICovXG5mdW5jdGlvbiBfZWFjaChkb20sIHBhcmVudCwgZXhwcikge1xuXG4gIC8vIHJlbW92ZSB0aGUgZWFjaCBwcm9wZXJ0eSBmcm9tIHRoZSBvcmlnaW5hbCB0YWdcbiAgcmVtQXR0cihkb20sIExPT1BfRElSRUNUSVZFKTtcblxuICB2YXIgbXVzdFJlb3JkZXIgPSB0eXBlb2YgZ2V0QXR0cihkb20sIExPT1BfTk9fUkVPUkRFUl9ESVJFQ1RJVkUpICE9PSBUX1NUUklORyB8fCByZW1BdHRyKGRvbSwgTE9PUF9OT19SRU9SREVSX0RJUkVDVElWRSksXG4gICAgdGFnTmFtZSA9IGdldFRhZ05hbWUoZG9tKSxcbiAgICBpbXBsID0gX19UQUdfSU1QTFt0YWdOYW1lXSxcbiAgICBwYXJlbnROb2RlID0gZG9tLnBhcmVudE5vZGUsXG4gICAgcGxhY2Vob2xkZXIgPSBjcmVhdGVET01QbGFjZWhvbGRlcigpLFxuICAgIGNoaWxkID0gZ2V0VGFnKGRvbSksXG4gICAgaWZFeHByID0gZ2V0QXR0cihkb20sIENPTkRJVElPTkFMX0RJUkVDVElWRSksXG4gICAgdGFncyA9IFtdLFxuICAgIG9sZEl0ZW1zID0gW10sXG4gICAgaGFzS2V5cyxcbiAgICBpc0xvb3AgPSB0cnVlLFxuICAgIGlzQW5vbnltb3VzID0gIV9fVEFHX0lNUExbdGFnTmFtZV0sXG4gICAgaXNWaXJ0dWFsID0gZG9tLnRhZ05hbWUgPT09ICdWSVJUVUFMJztcblxuICAvLyBwYXJzZSB0aGUgZWFjaCBleHByZXNzaW9uXG4gIGV4cHIgPSB0bXBsLmxvb3BLZXlzKGV4cHIpO1xuICBleHByLmlzTG9vcCA9IHRydWU7XG5cbiAgaWYgKGlmRXhwcikgeyByZW1BdHRyKGRvbSwgQ09ORElUSU9OQUxfRElSRUNUSVZFKTsgfVxuXG4gIC8vIGluc2VydCBhIG1hcmtlZCB3aGVyZSB0aGUgbG9vcCB0YWdzIHdpbGwgYmUgaW5qZWN0ZWRcbiAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocGxhY2Vob2xkZXIsIGRvbSk7XG4gIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZG9tKTtcblxuICBleHByLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZUVhY2goKSB7XG4gICAgLy8gZ2V0IHRoZSBuZXcgaXRlbXMgY29sbGVjdGlvblxuICAgIGV4cHIudmFsdWUgPSB0bXBsKGV4cHIudmFsLCBwYXJlbnQpO1xuXG4gICAgdmFyIGZyYWcgPSBjcmVhdGVGcmFnKCksXG4gICAgICBpdGVtcyA9IGV4cHIudmFsdWUsXG4gICAgICBpc09iamVjdCQkMSA9ICFpc0FycmF5KGl0ZW1zKSAmJiAhaXNTdHJpbmcoaXRlbXMpLFxuICAgICAgcm9vdCA9IHBsYWNlaG9sZGVyLnBhcmVudE5vZGU7XG5cbiAgICAvLyBpZiB0aGlzIERPTSB3YXMgcmVtb3ZlZCB0aGUgdXBkYXRlIGhlcmUgaXMgdXNlbGVzc1xuICAgIC8vIHRoaXMgY29uZGl0aW9uIGZpeGVzIGFsc28gYSB3ZWlyZCBhc3luYyBpc3N1ZSBvbiBJRSBpbiBvdXIgdW5pdCB0ZXN0XG4gICAgaWYgKCFyb290KSB7IHJldHVybiB9XG5cbiAgICAvLyBvYmplY3QgbG9vcC4gYW55IGNoYW5nZXMgY2F1c2UgZnVsbCByZWRyYXdcbiAgICBpZiAoaXNPYmplY3QkJDEpIHtcbiAgICAgIGhhc0tleXMgPSBpdGVtcyB8fCBmYWxzZTtcbiAgICAgIGl0ZW1zID0gaGFzS2V5cyA/XG4gICAgICAgIE9iamVjdC5rZXlzKGl0ZW1zKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIHJldHVybiBta2l0ZW0oZXhwciwgaXRlbXNba2V5XSwga2V5KVxuICAgICAgICB9KSA6IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICBoYXNLZXlzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGlmRXhwcikge1xuICAgICAgaXRlbXMgPSBpdGVtcy5maWx0ZXIoZnVuY3Rpb24oaXRlbSwgaSkge1xuICAgICAgICBpZiAoZXhwci5rZXkgJiYgIWlzT2JqZWN0JCQxKVxuICAgICAgICAgIHsgcmV0dXJuICEhdG1wbChpZkV4cHIsIG1raXRlbShleHByLCBpdGVtLCBpLCBwYXJlbnQpKSB9XG5cbiAgICAgICAgcmV0dXJuICEhdG1wbChpZkV4cHIsIGV4dGVuZChPYmplY3QuY3JlYXRlKHBhcmVudCksIGl0ZW0pKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gbG9vcCBhbGwgdGhlIG5ldyBpdGVtc1xuICAgIGVhY2goaXRlbXMsIGZ1bmN0aW9uKGl0ZW0sIGkpIHtcbiAgICAgIC8vIHJlb3JkZXIgb25seSBpZiB0aGUgaXRlbXMgYXJlIG9iamVjdHNcbiAgICAgIHZhclxuICAgICAgICBkb1Jlb3JkZXIgPSBtdXN0UmVvcmRlciAmJiB0eXBlb2YgaXRlbSA9PT0gVF9PQkpFQ1QgJiYgIWhhc0tleXMsXG4gICAgICAgIG9sZFBvcyA9IG9sZEl0ZW1zLmluZGV4T2YoaXRlbSksXG4gICAgICAgIGlzTmV3ID0gb2xkUG9zID09PSAtMSxcbiAgICAgICAgcG9zID0gIWlzTmV3ICYmIGRvUmVvcmRlciA/IG9sZFBvcyA6IGksXG4gICAgICAgIC8vIGRvZXMgYSB0YWcgZXhpc3QgaW4gdGhpcyBwb3NpdGlvbj9cbiAgICAgICAgdGFnID0gdGFnc1twb3NdLFxuICAgICAgICBtdXN0QXBwZW5kID0gaSA+PSBvbGRJdGVtcy5sZW5ndGgsXG4gICAgICAgIG11c3RDcmVhdGUgPSAgZG9SZW9yZGVyICYmIGlzTmV3IHx8ICFkb1Jlb3JkZXIgJiYgIXRhZztcblxuICAgICAgaXRlbSA9ICFoYXNLZXlzICYmIGV4cHIua2V5ID8gbWtpdGVtKGV4cHIsIGl0ZW0sIGkpIDogaXRlbTtcblxuICAgICAgLy8gbmV3IHRhZ1xuICAgICAgaWYgKG11c3RDcmVhdGUpIHtcbiAgICAgICAgdGFnID0gbmV3IFRhZyQxKGltcGwsIHtcbiAgICAgICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgICAgICBpc0xvb3A6IGlzTG9vcCxcbiAgICAgICAgICBpc0Fub255bW91czogaXNBbm9ueW1vdXMsXG4gICAgICAgICAgdGFnTmFtZTogdGFnTmFtZSxcbiAgICAgICAgICByb290OiBkb20uY2xvbmVOb2RlKGlzQW5vbnltb3VzKSxcbiAgICAgICAgICBpdGVtOiBpdGVtLFxuICAgICAgICAgIGluZGV4OiBpLFxuICAgICAgICB9LCBkb20uaW5uZXJIVE1MKTtcblxuICAgICAgICAvLyBtb3VudCB0aGUgdGFnXG4gICAgICAgIHRhZy5tb3VudCgpO1xuXG4gICAgICAgIGlmIChtdXN0QXBwZW5kKVxuICAgICAgICAgIHsgYXBwZW5kLmFwcGx5KHRhZywgW2ZyYWcgfHwgcm9vdCwgaXNWaXJ0dWFsXSk7IH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgIHsgaW5zZXJ0LmFwcGx5KHRhZywgW3Jvb3QsIHRhZ3NbaV0sIGlzVmlydHVhbF0pOyB9XG5cbiAgICAgICAgaWYgKCFtdXN0QXBwZW5kKSB7IG9sZEl0ZW1zLnNwbGljZShpLCAwLCBpdGVtKTsgfVxuICAgICAgICB0YWdzLnNwbGljZShpLCAwLCB0YWcpO1xuICAgICAgICBpZiAoY2hpbGQpIHsgYXJyYXlpc2hBZGQocGFyZW50LnRhZ3MsIHRhZ05hbWUsIHRhZywgdHJ1ZSk7IH1cbiAgICAgIH0gZWxzZSBpZiAocG9zICE9PSBpICYmIGRvUmVvcmRlcikge1xuICAgICAgICAvLyBtb3ZlXG4gICAgICAgIGlmIChjb250YWlucyhpdGVtcywgb2xkSXRlbXNbcG9zXSkpIHtcbiAgICAgICAgICBtb3ZlLmFwcGx5KHRhZywgW3Jvb3QsIHRhZ3NbaV0sIGlzVmlydHVhbF0pO1xuICAgICAgICAgIC8vIG1vdmUgdGhlIG9sZCB0YWcgaW5zdGFuY2VcbiAgICAgICAgICB0YWdzLnNwbGljZShpLCAwLCB0YWdzLnNwbGljZShwb3MsIDEpWzBdKTtcbiAgICAgICAgICAvLyBtb3ZlIHRoZSBvbGQgaXRlbVxuICAgICAgICAgIG9sZEl0ZW1zLnNwbGljZShpLCAwLCBvbGRJdGVtcy5zcGxpY2UocG9zLCAxKVswXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHBvc2l0aW9uIGF0dHJpYnV0ZSBpZiBpdCBleGlzdHNcbiAgICAgICAgaWYgKGV4cHIucG9zKSB7IHRhZ1tleHByLnBvc10gPSBpOyB9XG5cbiAgICAgICAgLy8gaWYgdGhlIGxvb3AgdGFncyBhcmUgbm90IGN1c3RvbVxuICAgICAgICAvLyB3ZSBuZWVkIHRvIG1vdmUgYWxsIHRoZWlyIGN1c3RvbSB0YWdzIGludG8gdGhlIHJpZ2h0IHBvc2l0aW9uXG4gICAgICAgIGlmICghY2hpbGQgJiYgdGFnLnRhZ3MpIHsgbW92ZU5lc3RlZFRhZ3MuY2FsbCh0YWcsIGkpOyB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNhY2hlIHRoZSBvcmlnaW5hbCBpdGVtIHRvIHVzZSBpdCBpbiB0aGUgZXZlbnRzIGJvdW5kIHRvIHRoaXMgbm9kZVxuICAgICAgLy8gYW5kIGl0cyBjaGlsZHJlblxuICAgICAgdGFnLl9fLml0ZW0gPSBpdGVtO1xuICAgICAgdGFnLl9fLmluZGV4ID0gaTtcbiAgICAgIHRhZy5fXy5wYXJlbnQgPSBwYXJlbnQ7XG5cbiAgICAgIGlmICghbXVzdENyZWF0ZSkgeyB0YWcudXBkYXRlKGl0ZW0pOyB9XG4gICAgfSk7XG5cbiAgICAvLyByZW1vdmUgdGhlIHJlZHVuZGFudCB0YWdzXG4gICAgdW5tb3VudFJlZHVuZGFudChpdGVtcywgdGFncyk7XG5cbiAgICAvLyBjbG9uZSB0aGUgaXRlbXMgYXJyYXlcbiAgICBvbGRJdGVtcyA9IGl0ZW1zLnNsaWNlKCk7XG5cbiAgICAvLyB0aGlzIGNvbmRpdGlvbiBpcyB3ZWlyZCB1XG4gICAgcm9vdC5pbnNlcnRCZWZvcmUoZnJhZywgcGxhY2Vob2xkZXIpO1xuICB9O1xuXG4gIGV4cHIudW5tb3VudCA9IGZ1bmN0aW9uKCkge1xuICAgIGVhY2godGFncywgZnVuY3Rpb24odCkgeyB0LnVubW91bnQoKTsgfSk7XG4gIH07XG5cbiAgcmV0dXJuIGV4cHJcbn1cblxuLyoqXG4gKiBXYWxrIHRoZSB0YWcgRE9NIHRvIGRldGVjdCB0aGUgZXhwcmVzc2lvbnMgdG8gZXZhbHVhdGVcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IHJvb3QgLSByb290IHRhZyB3aGVyZSB3ZSB3aWxsIHN0YXJ0IGRpZ2dpbmcgdGhlIGV4cHJlc3Npb25zXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gZXhwcmVzc2lvbnMgLSBlbXB0eSBhcnJheSB3aGVyZSB0aGUgZXhwcmVzc2lvbnMgd2lsbCBiZSBhZGRlZFxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gbXVzdEluY2x1ZGVSb290IC0gZmxhZyB0byBkZWNpZGUgd2hldGhlciB0aGUgcm9vdCBtdXN0IGJlIHBhcnNlZCBhcyB3ZWxsXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGFuIG9iamVjdCBjb250YWluaW5nIHRoZSByb290IG5vb2RlIGFuZCB0aGUgZG9tIHRyZWVcbiAqL1xuZnVuY3Rpb24gcGFyc2VFeHByZXNzaW9ucyhyb290LCBleHByZXNzaW9ucywgbXVzdEluY2x1ZGVSb290KSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIHZhciB0cmVlID0ge3BhcmVudDoge2NoaWxkcmVuOiBleHByZXNzaW9uc319O1xuXG4gIHdhbGtOb2Rlcyhyb290LCBmdW5jdGlvbiAoZG9tLCBjdHgpIHtcbiAgICB2YXIgdHlwZSA9IGRvbS5ub2RlVHlwZSwgcGFyZW50ID0gY3R4LnBhcmVudCwgYXR0ciwgZXhwciwgdGFnSW1wbDtcbiAgICBpZiAoIW11c3RJbmNsdWRlUm9vdCAmJiBkb20gPT09IHJvb3QpIHsgcmV0dXJuIHtwYXJlbnQ6IHBhcmVudH0gfVxuXG4gICAgLy8gdGV4dCBub2RlXG4gICAgaWYgKHR5cGUgPT09IDMgJiYgZG9tLnBhcmVudE5vZGUudGFnTmFtZSAhPT0gJ1NUWUxFJyAmJiB0bXBsLmhhc0V4cHIoZG9tLm5vZGVWYWx1ZSkpXG4gICAgICB7IHBhcmVudC5jaGlsZHJlbi5wdXNoKHtkb206IGRvbSwgZXhwcjogZG9tLm5vZGVWYWx1ZX0pOyB9XG5cbiAgICBpZiAodHlwZSAhPT0gMSkgeyByZXR1cm4gY3R4IH0gLy8gbm90IGFuIGVsZW1lbnRcblxuICAgIHZhciBpc1ZpcnR1YWwgPSBkb20udGFnTmFtZSA9PT0gJ1ZJUlRVQUwnO1xuXG4gICAgLy8gbG9vcC4gZWFjaCBkb2VzIGl0J3Mgb3duIHRoaW5nIChmb3Igbm93KVxuICAgIGlmIChhdHRyID0gZ2V0QXR0cihkb20sIExPT1BfRElSRUNUSVZFKSkge1xuICAgICAgaWYoaXNWaXJ0dWFsKSB7IHNldEF0dHIoZG9tLCAnbG9vcFZpcnR1YWwnLCB0cnVlKTsgfSAvLyBpZ25vcmUgaGVyZSwgaGFuZGxlZCBpbiBfZWFjaFxuICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goX2VhY2goZG9tLCB0aGlzJDEsIGF0dHIpKTtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIGlmLWF0dHJzIGJlY29tZSB0aGUgbmV3IHBhcmVudC4gQW55IGZvbGxvd2luZyBleHByZXNzaW9ucyAoZWl0aGVyIG9uIHRoZSBjdXJyZW50XG4gICAgLy8gZWxlbWVudCwgb3IgYmVsb3cgaXQpIGJlY29tZSBjaGlsZHJlbiBvZiB0aGlzIGV4cHJlc3Npb24uXG4gICAgaWYgKGF0dHIgPSBnZXRBdHRyKGRvbSwgQ09ORElUSU9OQUxfRElSRUNUSVZFKSkge1xuICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goT2JqZWN0LmNyZWF0ZShJZkV4cHIpLmluaXQoZG9tLCB0aGlzJDEsIGF0dHIpKTtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmIChleHByID0gZ2V0QXR0cihkb20sIElTX0RJUkVDVElWRSkpIHtcbiAgICAgIGlmICh0bXBsLmhhc0V4cHIoZXhwcikpIHtcbiAgICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goe2lzUnRhZzogdHJ1ZSwgZXhwcjogZXhwciwgZG9tOiBkb20sIGF0dHJzOiBbXS5zbGljZS5jYWxsKGRvbS5hdHRyaWJ1dGVzKX0pO1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiB0aGlzIGlzIGEgdGFnLCBzdG9wIHRyYXZlcnNpbmcgaGVyZS5cbiAgICAvLyB3ZSBpZ25vcmUgdGhlIHJvb3QsIHNpbmNlIHBhcnNlRXhwcmVzc2lvbnMgaXMgY2FsbGVkIHdoaWxlIHdlJ3JlIG1vdW50aW5nIHRoYXQgcm9vdFxuICAgIHRhZ0ltcGwgPSBnZXRUYWcoZG9tKTtcbiAgICBpZihpc1ZpcnR1YWwpIHtcbiAgICAgIGlmKGdldEF0dHIoZG9tLCAndmlydHVhbGl6ZWQnKSkge2RvbS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGRvbSk7IH0gLy8gdGFnIGNyZWF0ZWQsIHJlbW92ZSBmcm9tIGRvbVxuICAgICAgaWYoIXRhZ0ltcGwgJiYgIWdldEF0dHIoZG9tLCAndmlydHVhbGl6ZWQnKSAmJiAhZ2V0QXR0cihkb20sICdsb29wVmlydHVhbCcpKSAgLy8gb2sgdG8gY3JlYXRlIHZpcnR1YWwgdGFnXG4gICAgICAgIHsgdGFnSW1wbCA9IHsgdG1wbDogZG9tLm91dGVySFRNTCB9OyB9XG4gICAgfVxuXG4gICAgaWYgKHRhZ0ltcGwgJiYgKGRvbSAhPT0gcm9vdCB8fCBtdXN0SW5jbHVkZVJvb3QpKSB7XG4gICAgICBpZihpc1ZpcnR1YWwgJiYgIWdldEF0dHIoZG9tLCBJU19ESVJFQ1RJVkUpKSB7IC8vIGhhbmRsZWQgaW4gdXBkYXRlXG4gICAgICAgIC8vIGNhbiBub3QgcmVtb3ZlIGF0dHJpYnV0ZSBsaWtlIGRpcmVjdGl2ZXNcbiAgICAgICAgLy8gc28gZmxhZyBmb3IgcmVtb3ZhbCBhZnRlciBjcmVhdGlvbiB0byBwcmV2ZW50IG1heGltdW0gc3RhY2sgZXJyb3JcbiAgICAgICAgc2V0QXR0cihkb20sICd2aXJ0dWFsaXplZCcsIHRydWUpO1xuXG4gICAgICAgIHZhciB0YWcgPSBuZXcgVGFnJDEoeyB0bXBsOiBkb20ub3V0ZXJIVE1MIH0sXG4gICAgICAgICAge3Jvb3Q6IGRvbSwgcGFyZW50OiB0aGlzJDF9LFxuICAgICAgICAgIGRvbS5pbm5lckhUTUwpO1xuICAgICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaCh0YWcpOyAvLyBubyByZXR1cm4sIGFub255bW91cyB0YWcsIGtlZXAgcGFyc2luZ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGNvbmYgPSB7cm9vdDogZG9tLCBwYXJlbnQ6IHRoaXMkMSwgaGFzSW1wbDogdHJ1ZX07XG4gICAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKGluaXRDaGlsZFRhZyh0YWdJbXBsLCBjb25mLCBkb20uaW5uZXJIVE1MLCB0aGlzJDEpKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gYXR0cmlidXRlIGV4cHJlc3Npb25zXG4gICAgcGFyc2VBdHRyaWJ1dGVzLmFwcGx5KHRoaXMkMSwgW2RvbSwgZG9tLmF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGF0dHIsIGV4cHIpIHtcbiAgICAgIGlmICghZXhwcikgeyByZXR1cm4gfVxuICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goZXhwcik7XG4gICAgfV0pO1xuXG4gICAgLy8gd2hhdGV2ZXIgdGhlIHBhcmVudCBpcywgYWxsIGNoaWxkIGVsZW1lbnRzIGdldCB0aGUgc2FtZSBwYXJlbnQuXG4gICAgLy8gSWYgdGhpcyBlbGVtZW50IGhhZCBhbiBpZi1hdHRyLCB0aGF0J3MgdGhlIHBhcmVudCBmb3IgYWxsIGNoaWxkIGVsZW1lbnRzXG4gICAgcmV0dXJuIHtwYXJlbnQ6IHBhcmVudH1cbiAgfSwgdHJlZSk7XG59XG5cbi8qKlxuICogQ2FsbHMgYGZuYCBmb3IgZXZlcnkgYXR0cmlidXRlIG9uIGFuIGVsZW1lbnQuIElmIHRoYXQgYXR0ciBoYXMgYW4gZXhwcmVzc2lvbixcbiAqIGl0IGlzIGFsc28gcGFzc2VkIHRvIGZuLlxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gZG9tIC0gZG9tIG5vZGUgdG8gcGFyc2VcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBhdHRycyAtIGFycmF5IG9mIGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIGNhbGxiYWNrIHRvIGV4ZWMgb24gYW55IGl0ZXJhdGlvblxuICovXG5mdW5jdGlvbiBwYXJzZUF0dHJpYnV0ZXMoZG9tLCBhdHRycywgZm4pIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgZWFjaChhdHRycywgZnVuY3Rpb24gKGF0dHIpIHtcbiAgICB2YXIgbmFtZSA9IGF0dHIubmFtZSwgYm9vbCA9IGlzQm9vbEF0dHIobmFtZSksIGV4cHI7XG5cbiAgICBpZiAoY29udGFpbnMoUkVGX0RJUkVDVElWRVMsIG5hbWUpKSB7XG4gICAgICBleHByID0gIE9iamVjdC5jcmVhdGUoUmVmRXhwcikuaW5pdChkb20sIHRoaXMkMSwgbmFtZSwgYXR0ci52YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh0bXBsLmhhc0V4cHIoYXR0ci52YWx1ZSkpIHtcbiAgICAgIGV4cHIgPSB7ZG9tOiBkb20sIGV4cHI6IGF0dHIudmFsdWUsIGF0dHI6IG5hbWUsIGJvb2w6IGJvb2x9O1xuICAgIH1cblxuICAgIGZuKGF0dHIsIGV4cHIpO1xuICB9KTtcbn1cblxuLypcbiAgSW5jbHVkZXMgaGFja3MgbmVlZGVkIGZvciB0aGUgSW50ZXJuZXQgRXhwbG9yZXIgdmVyc2lvbiA5IGFuZCBiZWxvd1xuICBTZWU6IGh0dHA6Ly9rYW5nYXguZ2l0aHViLmlvL2NvbXBhdC10YWJsZS9lczUvI2llOFxuICAgICAgIGh0dHA6Ly9jb2RlcGxhbmV0LmlvL2Ryb3BwaW5nLWllOC9cbiovXG5cbnZhciByZUhhc1lpZWxkICA9IC88eWllbGRcXGIvaTtcbnZhciByZVlpZWxkQWxsICA9IC88eWllbGRcXHMqKD86XFwvPnw+KFtcXFNcXHNdKj8pPFxcL3lpZWxkXFxzKj58PikvaWc7XG52YXIgcmVZaWVsZFNyYyAgPSAvPHlpZWxkXFxzK3RvPVsnXCJdKFteJ1wiPl0qKVsnXCJdXFxzKj4oW1xcU1xcc10qPyk8XFwveWllbGRcXHMqPi9pZztcbnZhciByZVlpZWxkRGVzdCA9IC88eWllbGRcXHMrZnJvbT1bJ1wiXT8oWy1cXHddKylbJ1wiXT9cXHMqKD86XFwvPnw+KFtcXFNcXHNdKj8pPFxcL3lpZWxkXFxzKj4pL2lnO1xudmFyIHJvb3RFbHMgPSB7IHRyOiAndGJvZHknLCB0aDogJ3RyJywgdGQ6ICd0cicsIGNvbDogJ2NvbGdyb3VwJyB9O1xudmFyIHRibFRhZ3MgPSBJRV9WRVJTSU9OICYmIElFX1ZFUlNJT04gPCAxMCA/IFJFX1NQRUNJQUxfVEFHUyA6IFJFX1NQRUNJQUxfVEFHU19OT19PUFRJT047XG52YXIgR0VORVJJQyA9ICdkaXYnO1xuXG5cbi8qXG4gIENyZWF0ZXMgdGhlIHJvb3QgZWxlbWVudCBmb3IgdGFibGUgb3Igc2VsZWN0IGNoaWxkIGVsZW1lbnRzOlxuICB0ci90aC90ZC90aGVhZC90Zm9vdC90Ym9keS9jYXB0aW9uL2NvbC9jb2xncm91cC9vcHRpb24vb3B0Z3JvdXBcbiovXG5mdW5jdGlvbiBzcGVjaWFsVGFncyhlbCwgdG1wbCwgdGFnTmFtZSkge1xuXG4gIHZhclxuICAgIHNlbGVjdCA9IHRhZ05hbWVbMF0gPT09ICdvJyxcbiAgICBwYXJlbnQgPSBzZWxlY3QgPyAnc2VsZWN0PicgOiAndGFibGU+JztcblxuICAvLyB0cmltKCkgaXMgaW1wb3J0YW50IGhlcmUsIHRoaXMgZW5zdXJlcyB3ZSBkb24ndCBoYXZlIGFydGlmYWN0cyxcbiAgLy8gc28gd2UgY2FuIGNoZWNrIGlmIHdlIGhhdmUgb25seSBvbmUgZWxlbWVudCBpbnNpZGUgdGhlIHBhcmVudFxuICBlbC5pbm5lckhUTUwgPSAnPCcgKyBwYXJlbnQgKyB0bXBsLnRyaW0oKSArICc8LycgKyBwYXJlbnQ7XG4gIHBhcmVudCA9IGVsLmZpcnN0Q2hpbGQ7XG5cbiAgLy8gcmV0dXJucyB0aGUgaW1tZWRpYXRlIHBhcmVudCBpZiB0ci90aC90ZC9jb2wgaXMgdGhlIG9ubHkgZWxlbWVudCwgaWYgbm90XG4gIC8vIHJldHVybnMgdGhlIHdob2xlIHRyZWUsIGFzIHRoaXMgY2FuIGluY2x1ZGUgYWRkaXRpb25hbCBlbGVtZW50c1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAoc2VsZWN0KSB7XG4gICAgcGFyZW50LnNlbGVjdGVkSW5kZXggPSAtMTsgIC8vIGZvciBJRTksIGNvbXBhdGlibGUgdy9jdXJyZW50IHJpb3QgYmVoYXZpb3JcbiAgfSBlbHNlIHtcbiAgICAvLyBhdm9pZHMgaW5zZXJ0aW9uIG9mIGNvaW50YWluZXIgaW5zaWRlIGNvbnRhaW5lciAoZXg6IHRib2R5IGluc2lkZSB0Ym9keSlcbiAgICB2YXIgdG5hbWUgPSByb290RWxzW3RhZ05hbWVdO1xuICAgIGlmICh0bmFtZSAmJiBwYXJlbnQuY2hpbGRFbGVtZW50Q291bnQgPT09IDEpIHsgcGFyZW50ID0gJCh0bmFtZSwgcGFyZW50KTsgfVxuICB9XG4gIHJldHVybiBwYXJlbnRcbn1cblxuLypcbiAgUmVwbGFjZSB0aGUgeWllbGQgdGFnIGZyb20gYW55IHRhZyB0ZW1wbGF0ZSB3aXRoIHRoZSBpbm5lckhUTUwgb2YgdGhlXG4gIG9yaWdpbmFsIHRhZyBpbiB0aGUgcGFnZVxuKi9cbmZ1bmN0aW9uIHJlcGxhY2VZaWVsZCh0bXBsLCBodG1sKSB7XG4gIC8vIGRvIG5vdGhpbmcgaWYgbm8geWllbGRcbiAgaWYgKCFyZUhhc1lpZWxkLnRlc3QodG1wbCkpIHsgcmV0dXJuIHRtcGwgfVxuXG4gIC8vIGJlIGNhcmVmdWwgd2l0aCAjMTM0MyAtIHN0cmluZyBvbiB0aGUgc291cmNlIGhhdmluZyBgJDFgXG4gIHZhciBzcmMgPSB7fTtcblxuICBodG1sID0gaHRtbCAmJiBodG1sLnJlcGxhY2UocmVZaWVsZFNyYywgZnVuY3Rpb24gKF8sIHJlZiwgdGV4dCkge1xuICAgIHNyY1tyZWZdID0gc3JjW3JlZl0gfHwgdGV4dDsgICAvLyBwcmVzZXJ2ZSBmaXJzdCBkZWZpbml0aW9uXG4gICAgcmV0dXJuICcnXG4gIH0pLnRyaW0oKTtcblxuICByZXR1cm4gdG1wbFxuICAgIC5yZXBsYWNlKHJlWWllbGREZXN0LCBmdW5jdGlvbiAoXywgcmVmLCBkZWYpIHsgIC8vIHlpZWxkIHdpdGggZnJvbSAtIHRvIGF0dHJzXG4gICAgICByZXR1cm4gc3JjW3JlZl0gfHwgZGVmIHx8ICcnXG4gICAgfSlcbiAgICAucmVwbGFjZShyZVlpZWxkQWxsLCBmdW5jdGlvbiAoXywgZGVmKSB7ICAgICAgICAvLyB5aWVsZCB3aXRob3V0IGFueSBcImZyb21cIlxuICAgICAgcmV0dXJuIGh0bWwgfHwgZGVmIHx8ICcnXG4gICAgfSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgRE9NIGVsZW1lbnQgdG8gd3JhcCB0aGUgZ2l2ZW4gY29udGVudC4gTm9ybWFsbHkgYW4gYERJVmAsIGJ1dCBjYW4gYmVcbiAqIGFsc28gYSBgVEFCTEVgLCBgU0VMRUNUYCwgYFRCT0RZYCwgYFRSYCwgb3IgYENPTEdST1VQYCBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdG1wbCAgLSBUaGUgdGVtcGxhdGUgY29taW5nIGZyb20gdGhlIGN1c3RvbSB0YWcgZGVmaW5pdGlvblxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBodG1sIC0gSFRNTCBjb250ZW50IHRoYXQgY29tZXMgZnJvbSB0aGUgRE9NIGVsZW1lbnQgd2hlcmUgeW91XG4gKiAgICAgICAgICAgd2lsbCBtb3VudCB0aGUgdGFnLCBtb3N0bHkgdGhlIG9yaWdpbmFsIHRhZyBpbiB0aGUgcGFnZVxuICogQHJldHVybnMgeyBIVE1MRWxlbWVudCB9IERPTSBlbGVtZW50IHdpdGggX3RtcGxfIG1lcmdlZCB0aHJvdWdoIGBZSUVMRGAgd2l0aCB0aGUgX2h0bWxfLlxuICovXG5mdW5jdGlvbiBta2RvbSh0bXBsLCBodG1sKSB7XG4gIHZhciBtYXRjaCAgID0gdG1wbCAmJiB0bXBsLm1hdGNoKC9eXFxzKjwoWy1cXHddKykvKSxcbiAgICB0YWdOYW1lID0gbWF0Y2ggJiYgbWF0Y2hbMV0udG9Mb3dlckNhc2UoKSxcbiAgICBlbCA9IG1rRWwoR0VORVJJQyk7XG5cbiAgLy8gcmVwbGFjZSBhbGwgdGhlIHlpZWxkIHRhZ3Mgd2l0aCB0aGUgdGFnIGlubmVyIGh0bWxcbiAgdG1wbCA9IHJlcGxhY2VZaWVsZCh0bXBsLCBodG1sKTtcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAodGJsVGFncy50ZXN0KHRhZ05hbWUpKVxuICAgIHsgZWwgPSBzcGVjaWFsVGFncyhlbCwgdG1wbCwgdGFnTmFtZSk7IH1cbiAgZWxzZVxuICAgIHsgc2V0SW5uZXJIVE1MKGVsLCB0bXBsKTsgfVxuXG4gIHJldHVybiBlbFxufVxuXG4vKipcbiAqIEFub3RoZXIgd2F5IHRvIGNyZWF0ZSBhIHJpb3QgdGFnIGEgYml0IG1vcmUgZXM2IGZyaWVuZGx5XG4gKiBAcGFyYW0geyBIVE1MRWxlbWVudCB9IGVsIC0gdGFnIERPTSBzZWxlY3RvciBvciBET00gbm9kZS9zXG4gKiBAcGFyYW0geyBPYmplY3QgfSBvcHRzIC0gdGFnIGxvZ2ljXG4gKiBAcmV0dXJucyB7IFRhZyB9IG5ldyByaW90IHRhZyBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBUYWckMihlbCwgb3B0cykge1xuICAvLyBnZXQgdGhlIHRhZyBwcm9wZXJ0aWVzIGZyb20gdGhlIGNsYXNzIGNvbnN0cnVjdG9yXG4gIHZhciByZWYgPSB0aGlzO1xuICB2YXIgbmFtZSA9IHJlZi5uYW1lO1xuICB2YXIgdG1wbCA9IHJlZi50bXBsO1xuICB2YXIgY3NzID0gcmVmLmNzcztcbiAgdmFyIGF0dHJzID0gcmVmLmF0dHJzO1xuICB2YXIgb25DcmVhdGUgPSByZWYub25DcmVhdGU7XG4gIC8vIHJlZ2lzdGVyIGEgbmV3IHRhZyBhbmQgY2FjaGUgdGhlIGNsYXNzIHByb3RvdHlwZVxuICBpZiAoIV9fVEFHX0lNUExbbmFtZV0pIHtcbiAgICB0YWckMShuYW1lLCB0bXBsLCBjc3MsIGF0dHJzLCBvbkNyZWF0ZSk7XG4gICAgLy8gY2FjaGUgdGhlIGNsYXNzIGNvbnN0cnVjdG9yXG4gICAgX19UQUdfSU1QTFtuYW1lXS5jbGFzcyA9IHRoaXMuY29uc3RydWN0b3I7XG4gIH1cblxuICAvLyBtb3VudCB0aGUgdGFnIHVzaW5nIHRoZSBjbGFzcyBpbnN0YW5jZVxuICBtb3VudFRvKGVsLCBuYW1lLCBvcHRzLCB0aGlzKTtcbiAgLy8gaW5qZWN0IHRoZSBjb21wb25lbnQgY3NzXG4gIGlmIChjc3MpIHsgc3R5bGVNYW5hZ2VyLmluamVjdCgpOyB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgcmlvdCB0YWcgaW1wbGVtZW50YXRpb25cbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBuYW1lIC0gbmFtZS9pZCBvZiB0aGUgbmV3IHJpb3QgdGFnXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgdG1wbCAtIHRhZyB0ZW1wbGF0ZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGNzcyAtIGN1c3RvbSB0YWcgY3NzXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgYXR0cnMgLSByb290IHRhZyBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSB1c2VyIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IG5hbWUvaWQgb2YgdGhlIHRhZyBqdXN0IGNyZWF0ZWRcbiAqL1xuZnVuY3Rpb24gdGFnJDEobmFtZSwgdG1wbCwgY3NzLCBhdHRycywgZm4pIHtcbiAgaWYgKGlzRnVuY3Rpb24oYXR0cnMpKSB7XG4gICAgZm4gPSBhdHRycztcblxuICAgIGlmICgvXltcXHdcXC1dK1xccz89Ly50ZXN0KGNzcykpIHtcbiAgICAgIGF0dHJzID0gY3NzO1xuICAgICAgY3NzID0gJyc7XG4gICAgfSBlbHNlXG4gICAgICB7IGF0dHJzID0gJyc7IH1cbiAgfVxuXG4gIGlmIChjc3MpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihjc3MpKVxuICAgICAgeyBmbiA9IGNzczsgfVxuICAgIGVsc2VcbiAgICAgIHsgc3R5bGVNYW5hZ2VyLmFkZChjc3MpOyB9XG4gIH1cblxuICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICBfX1RBR19JTVBMW25hbWVdID0geyBuYW1lOiBuYW1lLCB0bXBsOiB0bXBsLCBhdHRyczogYXR0cnMsIGZuOiBmbiB9O1xuXG4gIHJldHVybiBuYW1lXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IHJpb3QgdGFnIGltcGxlbWVudGF0aW9uIChmb3IgdXNlIGJ5IHRoZSBjb21waWxlcilcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBuYW1lIC0gbmFtZS9pZCBvZiB0aGUgbmV3IHJpb3QgdGFnXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgdG1wbCAtIHRhZyB0ZW1wbGF0ZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGNzcyAtIGN1c3RvbSB0YWcgY3NzXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgYXR0cnMgLSByb290IHRhZyBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSB1c2VyIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IG5hbWUvaWQgb2YgdGhlIHRhZyBqdXN0IGNyZWF0ZWRcbiAqL1xuZnVuY3Rpb24gdGFnMiQxKG5hbWUsIHRtcGwsIGNzcywgYXR0cnMsIGZuKSB7XG4gIGlmIChjc3MpIHsgc3R5bGVNYW5hZ2VyLmFkZChjc3MsIG5hbWUpOyB9XG5cbiAgX19UQUdfSU1QTFtuYW1lXSA9IHsgbmFtZTogbmFtZSwgdG1wbDogdG1wbCwgYXR0cnM6IGF0dHJzLCBmbjogZm4gfTtcblxuICByZXR1cm4gbmFtZVxufVxuXG4vKipcbiAqIE1vdW50IGEgdGFnIHVzaW5nIGEgc3BlY2lmaWMgdGFnIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0gICB7ICogfSBzZWxlY3RvciAtIHRhZyBET00gc2VsZWN0b3Igb3IgRE9NIG5vZGUvc1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSB0YWdOYW1lIC0gdGFnIGltcGxlbWVudGF0aW9uIG5hbWVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gb3B0cyAtIHRhZyBsb2dpY1xuICogQHJldHVybnMgeyBBcnJheSB9IG5ldyB0YWdzIGluc3RhbmNlc1xuICovXG5mdW5jdGlvbiBtb3VudCQxKHNlbGVjdG9yLCB0YWdOYW1lLCBvcHRzKSB7XG4gIHZhciB0YWdzID0gW107XG5cbiAgZnVuY3Rpb24gcHVzaFRhZ3NUbyhyb290KSB7XG4gICAgaWYgKHJvb3QudGFnTmFtZSkge1xuICAgICAgdmFyIHJpb3RUYWcgPSBnZXRBdHRyKHJvb3QsIElTX0RJUkVDVElWRSk7XG5cbiAgICAgIC8vIGhhdmUgdGFnTmFtZT8gZm9yY2UgcmlvdC10YWcgdG8gYmUgdGhlIHNhbWVcbiAgICAgIGlmICh0YWdOYW1lICYmIHJpb3RUYWcgIT09IHRhZ05hbWUpIHtcbiAgICAgICAgcmlvdFRhZyA9IHRhZ05hbWU7XG4gICAgICAgIHNldEF0dHIocm9vdCwgSVNfRElSRUNUSVZFLCB0YWdOYW1lKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhZyA9IG1vdW50VG8ocm9vdCwgcmlvdFRhZyB8fCByb290LnRhZ05hbWUudG9Mb3dlckNhc2UoKSwgb3B0cyk7XG5cbiAgICAgIGlmICh0YWcpXG4gICAgICAgIHsgdGFncy5wdXNoKHRhZyk7IH1cbiAgICB9IGVsc2UgaWYgKHJvb3QubGVuZ3RoKVxuICAgICAgeyBlYWNoKHJvb3QsIHB1c2hUYWdzVG8pOyB9IC8vIGFzc3VtZSBub2RlTGlzdFxuICB9XG5cbiAgLy8gaW5qZWN0IHN0eWxlcyBpbnRvIERPTVxuICBzdHlsZU1hbmFnZXIuaW5qZWN0KCk7XG5cbiAgaWYgKGlzT2JqZWN0KHRhZ05hbWUpKSB7XG4gICAgb3B0cyA9IHRhZ05hbWU7XG4gICAgdGFnTmFtZSA9IDA7XG4gIH1cblxuICB2YXIgZWxlbTtcbiAgdmFyIGFsbFRhZ3M7XG5cbiAgLy8gY3Jhd2wgdGhlIERPTSB0byBmaW5kIHRoZSB0YWdcbiAgaWYgKGlzU3RyaW5nKHNlbGVjdG9yKSkge1xuICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgPT09ICcqJyA/XG4gICAgICAvLyBzZWxlY3QgYWxsIHJlZ2lzdGVyZWQgdGFnc1xuICAgICAgLy8gJiB0YWdzIGZvdW5kIHdpdGggdGhlIHJpb3QtdGFnIGF0dHJpYnV0ZSBzZXRcbiAgICAgIGFsbFRhZ3MgPSBzZWxlY3RUYWdzKCkgOlxuICAgICAgLy8gb3IganVzdCB0aGUgb25lcyBuYW1lZCBsaWtlIHRoZSBzZWxlY3RvclxuICAgICAgc2VsZWN0b3IgKyBzZWxlY3RUYWdzKHNlbGVjdG9yLnNwbGl0KC8sICovKSk7XG5cbiAgICAvLyBtYWtlIHN1cmUgdG8gcGFzcyBhbHdheXMgYSBzZWxlY3RvclxuICAgIC8vIHRvIHRoZSBxdWVyeVNlbGVjdG9yQWxsIGZ1bmN0aW9uXG4gICAgZWxlbSA9IHNlbGVjdG9yID8gJCQoc2VsZWN0b3IpIDogW107XG4gIH1cbiAgZWxzZVxuICAgIC8vIHByb2JhYmx5IHlvdSBoYXZlIHBhc3NlZCBhbHJlYWR5IGEgdGFnIG9yIGEgTm9kZUxpc3RcbiAgICB7IGVsZW0gPSBzZWxlY3RvcjsgfVxuXG4gIC8vIHNlbGVjdCBhbGwgdGhlIHJlZ2lzdGVyZWQgYW5kIG1vdW50IHRoZW0gaW5zaWRlIHRoZWlyIHJvb3QgZWxlbWVudHNcbiAgaWYgKHRhZ05hbWUgPT09ICcqJykge1xuICAgIC8vIGdldCBhbGwgY3VzdG9tIHRhZ3NcbiAgICB0YWdOYW1lID0gYWxsVGFncyB8fCBzZWxlY3RUYWdzKCk7XG4gICAgLy8gaWYgdGhlIHJvb3QgZWxzIGl0J3MganVzdCBhIHNpbmdsZSB0YWdcbiAgICBpZiAoZWxlbS50YWdOYW1lKVxuICAgICAgeyBlbGVtID0gJCQodGFnTmFtZSwgZWxlbSk7IH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIHNlbGVjdCBhbGwgdGhlIGNoaWxkcmVuIGZvciBhbGwgdGhlIGRpZmZlcmVudCByb290IGVsZW1lbnRzXG4gICAgICB2YXIgbm9kZUxpc3QgPSBbXTtcblxuICAgICAgZWFjaChlbGVtLCBmdW5jdGlvbiAoX2VsKSB7IHJldHVybiBub2RlTGlzdC5wdXNoKCQkKHRhZ05hbWUsIF9lbCkpOyB9KTtcblxuICAgICAgZWxlbSA9IG5vZGVMaXN0O1xuICAgIH1cbiAgICAvLyBnZXQgcmlkIG9mIHRoZSB0YWdOYW1lXG4gICAgdGFnTmFtZSA9IDA7XG4gIH1cblxuICBwdXNoVGFnc1RvKGVsZW0pO1xuXG4gIHJldHVybiB0YWdzXG59XG5cbi8vIENyZWF0ZSBhIG1peGluIHRoYXQgY291bGQgYmUgZ2xvYmFsbHkgc2hhcmVkIGFjcm9zcyBhbGwgdGhlIHRhZ3NcbnZhciBtaXhpbnMgPSB7fTtcbnZhciBnbG9iYWxzID0gbWl4aW5zW0dMT0JBTF9NSVhJTl0gPSB7fTtcbnZhciBtaXhpbnNfaWQgPSAwO1xuXG4vKipcbiAqIENyZWF0ZS9SZXR1cm4gYSBtaXhpbiBieSBpdHMgbmFtZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgbmFtZSAtIG1peGluIG5hbWUgKGdsb2JhbCBtaXhpbiBpZiBvYmplY3QpXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9ICBtaXggLSBtaXhpbiBsb2dpY1xuICogQHBhcmFtICAgeyBCb29sZWFuIH0gZyAtIGlzIGdsb2JhbD9cbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gIHRoZSBtaXhpbiBsb2dpY1xuICovXG5mdW5jdGlvbiBtaXhpbiQxKG5hbWUsIG1peCwgZykge1xuICAvLyBVbm5hbWVkIGdsb2JhbFxuICBpZiAoaXNPYmplY3QobmFtZSkpIHtcbiAgICBtaXhpbiQxKChcIl9fdW5uYW1lZF9cIiArIChtaXhpbnNfaWQrKykpLCBuYW1lLCB0cnVlKTtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBzdG9yZSA9IGcgPyBnbG9iYWxzIDogbWl4aW5zO1xuXG4gIC8vIEdldHRlclxuICBpZiAoIW1peCkge1xuICAgIGlmIChpc1VuZGVmaW5lZChzdG9yZVtuYW1lXSkpXG4gICAgICB7IHRocm93IG5ldyBFcnJvcignVW5yZWdpc3RlcmVkIG1peGluOiAnICsgbmFtZSkgfVxuXG4gICAgcmV0dXJuIHN0b3JlW25hbWVdXG4gIH1cblxuICAvLyBTZXR0ZXJcbiAgc3RvcmVbbmFtZV0gPSBpc0Z1bmN0aW9uKG1peCkgP1xuICAgIGV4dGVuZChtaXgucHJvdG90eXBlLCBzdG9yZVtuYW1lXSB8fCB7fSkgJiYgbWl4IDpcbiAgICBleHRlbmQoc3RvcmVbbmFtZV0gfHwge30sIG1peCk7XG59XG5cbi8qKlxuICogVXBkYXRlIGFsbCB0aGUgdGFncyBpbnN0YW5jZXMgY3JlYXRlZFxuICogQHJldHVybnMgeyBBcnJheSB9IGFsbCB0aGUgdGFncyBpbnN0YW5jZXNcbiAqL1xuZnVuY3Rpb24gdXBkYXRlJDEoKSB7XG4gIHJldHVybiBlYWNoKF9fVEFHU19DQUNIRSwgZnVuY3Rpb24gKHRhZykgeyByZXR1cm4gdGFnLnVwZGF0ZSgpOyB9KVxufVxuXG5mdW5jdGlvbiB1bnJlZ2lzdGVyJDEobmFtZSkge1xuICBkZWxldGUgX19UQUdfSU1QTFtuYW1lXTtcbn1cblxudmFyIHZlcnNpb24kMSA9ICd2My40LjQnO1xuXG5cbnZhciBjb3JlID0gT2JqZWN0LmZyZWV6ZSh7XG5cdFRhZzogVGFnJDIsXG5cdHRhZzogdGFnJDEsXG5cdHRhZzI6IHRhZzIkMSxcblx0bW91bnQ6IG1vdW50JDEsXG5cdG1peGluOiBtaXhpbiQxLFxuXHR1cGRhdGU6IHVwZGF0ZSQxLFxuXHR1bnJlZ2lzdGVyOiB1bnJlZ2lzdGVyJDEsXG5cdHZlcnNpb246IHZlcnNpb24kMVxufSk7XG5cbi8vIGNvdW50ZXIgdG8gZ2l2ZSBhIHVuaXF1ZSBpZCB0byBhbGwgdGhlIFRhZyBpbnN0YW5jZXNcbnZhciBfX3VpZCA9IDA7XG5cbi8qKlxuICogV2UgbmVlZCB0byB1cGRhdGUgb3B0cyBmb3IgdGhpcyB0YWcuIFRoYXQgcmVxdWlyZXMgdXBkYXRpbmcgdGhlIGV4cHJlc3Npb25zXG4gKiBpbiBhbnkgYXR0cmlidXRlcyBvbiB0aGUgdGFnLCBhbmQgdGhlbiBjb3B5aW5nIHRoZSByZXN1bHQgb250byBvcHRzLlxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7Qm9vbGVhbn0gaXNMb29wIC0gaXMgaXQgYSBsb29wIHRhZz9cbiAqIEBwYXJhbSAgIHsgVGFnIH0gIHBhcmVudCAtIHBhcmVudCB0YWcgbm9kZVxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gIGlzQW5vbnltb3VzIC0gaXMgaXQgYSB0YWcgd2l0aG91dCBhbnkgaW1wbD8gKGEgdGFnIG5vdCByZWdpc3RlcmVkKVxuICogQHBhcmFtICAgeyBPYmplY3QgfSAgb3B0cyAtIHRhZyBvcHRpb25zXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gIGluc3RBdHRycyAtIHRhZyBhdHRyaWJ1dGVzIGFycmF5XG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZU9wdHMoaXNMb29wLCBwYXJlbnQsIGlzQW5vbnltb3VzLCBvcHRzLCBpbnN0QXR0cnMpIHtcbiAgLy8gaXNBbm9ueW1vdXMgYGVhY2hgIHRhZ3MgdHJlYXQgYGRvbWAgYW5kIGByb290YCBkaWZmZXJlbnRseS4gSW4gdGhpcyBjYXNlXG4gIC8vIChhbmQgb25seSB0aGlzIGNhc2UpIHdlIGRvbid0IG5lZWQgdG8gZG8gdXBkYXRlT3B0cywgYmVjYXVzZSB0aGUgcmVndWxhciBwYXJzZVxuICAvLyB3aWxsIHVwZGF0ZSB0aG9zZSBhdHRycy4gUGx1cywgaXNBbm9ueW1vdXMgdGFncyBkb24ndCBuZWVkIG9wdHMgYW55d2F5XG4gIGlmIChpc0xvb3AgJiYgaXNBbm9ueW1vdXMpIHsgcmV0dXJuIH1cblxuICB2YXIgY3R4ID0gIWlzQW5vbnltb3VzICYmIGlzTG9vcCA/IHRoaXMgOiBwYXJlbnQgfHwgdGhpcztcbiAgZWFjaChpbnN0QXR0cnMsIGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgaWYgKGF0dHIuZXhwcikgeyB1cGRhdGVBbGxFeHByZXNzaW9ucy5jYWxsKGN0eCwgW2F0dHIuZXhwcl0pOyB9XG4gICAgLy8gbm9ybWFsaXplIHRoZSBhdHRyaWJ1dGUgbmFtZXNcbiAgICBvcHRzW3RvQ2FtZWwoYXR0ci5uYW1lKS5yZXBsYWNlKEFUVFJTX1BSRUZJWCwgJycpXSA9IGF0dHIuZXhwciA/IGF0dHIuZXhwci52YWx1ZSA6IGF0dHIudmFsdWU7XG4gIH0pO1xufVxuXG5cbi8qKlxuICogVGFnIGNsYXNzXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGltcGwgLSBpdCBjb250YWlucyB0aGUgdGFnIHRlbXBsYXRlLCBhbmQgbG9naWNcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGNvbmYgLSB0YWcgb3B0aW9uc1xuICogQHBhcmFtIHsgU3RyaW5nIH0gaW5uZXJIVE1MIC0gaHRtbCB0aGF0IGV2ZW50dWFsbHkgd2UgbmVlZCB0byBpbmplY3QgaW4gdGhlIHRhZ1xuICovXG5mdW5jdGlvbiBUYWckMShpbXBsLCBjb25mLCBpbm5lckhUTUwpIHtcbiAgaWYgKCBpbXBsID09PSB2b2lkIDAgKSBpbXBsID0ge307XG4gIGlmICggY29uZiA9PT0gdm9pZCAwICkgY29uZiA9IHt9O1xuXG4gIHZhciBvcHRzID0gZXh0ZW5kKHt9LCBjb25mLm9wdHMpLFxuICAgIHBhcmVudCA9IGNvbmYucGFyZW50LFxuICAgIGlzTG9vcCA9IGNvbmYuaXNMb29wLFxuICAgIGlzQW5vbnltb3VzID0gISFjb25mLmlzQW5vbnltb3VzLFxuICAgIHNraXBBbm9ueW1vdXMgPSBzZXR0aW5ncyQxLnNraXBBbm9ueW1vdXNUYWdzICYmIGlzQW5vbnltb3VzLFxuICAgIGl0ZW0gPSBjbGVhblVwRGF0YShjb25mLml0ZW0pLFxuICAgIGluZGV4ID0gY29uZi5pbmRleCwgLy8gYXZhaWxhYmxlIG9ubHkgZm9yIHRoZSBsb29wZWQgbm9kZXNcbiAgICBpbnN0QXR0cnMgPSBbXSwgLy8gQWxsIGF0dHJpYnV0ZXMgb24gdGhlIFRhZyB3aGVuIGl0J3MgZmlyc3QgcGFyc2VkXG4gICAgaW1wbEF0dHJzID0gW10sIC8vIGV4cHJlc3Npb25zIG9uIHRoaXMgdHlwZSBvZiBUYWdcbiAgICBleHByZXNzaW9ucyA9IFtdLFxuICAgIHJvb3QgPSBjb25mLnJvb3QsXG4gICAgdGFnTmFtZSA9IGNvbmYudGFnTmFtZSB8fCBnZXRUYWdOYW1lKHJvb3QpLFxuICAgIGlzVmlydHVhbCA9IHRhZ05hbWUgPT09ICd2aXJ0dWFsJyxcbiAgICBwcm9wc0luU3luY1dpdGhQYXJlbnQgPSBbXSxcbiAgICBkb207XG5cbiAgLy8gbWFrZSB0aGlzIHRhZyBvYnNlcnZhYmxlXG4gIGlmICghc2tpcEFub255bW91cykgeyBvYnNlcnZhYmxlJDEodGhpcyk7IH1cbiAgLy8gb25seSBjYWxsIHVubW91bnQgaWYgd2UgaGF2ZSBhIHZhbGlkIF9fVEFHX0lNUEwgKGhhcyBuYW1lIHByb3BlcnR5KVxuICBpZiAoaW1wbC5uYW1lICYmIHJvb3QuX3RhZykgeyByb290Ll90YWcudW5tb3VudCh0cnVlKTsgfVxuXG4gIC8vIG5vdCB5ZXQgbW91bnRlZFxuICB0aGlzLmlzTW91bnRlZCA9IGZhbHNlO1xuXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdfXycsIHtcbiAgICBpc0Fub255bW91czogaXNBbm9ueW1vdXMsXG4gICAgaW5zdEF0dHJzOiBpbnN0QXR0cnMsXG4gICAgaW5uZXJIVE1MOiBpbm5lckhUTUwsXG4gICAgdGFnTmFtZTogdGFnTmFtZSxcbiAgICBpbmRleDogaW5kZXgsXG4gICAgaXNMb29wOiBpc0xvb3AsXG4gICAgLy8gdGFncyBoYXZpbmcgZXZlbnQgbGlzdGVuZXJzXG4gICAgLy8gaXQgd291bGQgYmUgYmV0dGVyIHRvIHVzZSB3ZWFrIG1hcHMgaGVyZSBidXQgd2UgY2FuIG5vdCBpbnRyb2R1Y2UgYnJlYWtpbmcgY2hhbmdlcyBub3dcbiAgICBsaXN0ZW5lcnM6IFtdLFxuICAgIC8vIHRoZXNlIHZhcnMgd2lsbCBiZSBuZWVkZWQgb25seSBmb3IgdGhlIHZpcnR1YWwgdGFnc1xuICAgIHZpcnRzOiBbXSxcbiAgICB0YWlsOiBudWxsLFxuICAgIGhlYWQ6IG51bGwsXG4gICAgcGFyZW50OiBudWxsLFxuICAgIGl0ZW06IG51bGxcbiAgfSk7XG5cbiAgLy8gY3JlYXRlIGEgdW5pcXVlIGlkIHRvIHRoaXMgdGFnXG4gIC8vIGl0IGNvdWxkIGJlIGhhbmR5IHRvIHVzZSBpdCBhbHNvIHRvIGltcHJvdmUgdGhlIHZpcnR1YWwgZG9tIHJlbmRlcmluZyBzcGVlZFxuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX3Jpb3RfaWQnLCArK19fdWlkKTsgLy8gYmFzZSAxIGFsbG93cyB0ZXN0ICF0Ll9yaW90X2lkXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdyb290Jywgcm9vdCk7XG4gIGV4dGVuZCh0aGlzLCB7IG9wdHM6IG9wdHMgfSwgaXRlbSk7XG4gIC8vIHByb3RlY3QgdGhlIFwidGFnc1wiIGFuZCBcInJlZnNcIiBwcm9wZXJ0eSBmcm9tIGJlaW5nIG92ZXJyaWRkZW5cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3BhcmVudCcsIHBhcmVudCB8fCBudWxsKTtcbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3RhZ3MnLCB7fSk7XG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdyZWZzJywge30pO1xuXG4gIGRvbSA9IGlzTG9vcCAmJiBpc0Fub255bW91cyA/IHJvb3QgOiBta2RvbShpbXBsLnRtcGwsIGlubmVySFRNTCwgaXNMb29wKTtcblxuICAvKipcbiAgICogVXBkYXRlIHRoZSB0YWcgZXhwcmVzc2lvbnMgYW5kIG9wdGlvbnNcbiAgICogQHBhcmFtICAgeyAqIH0gIGRhdGEgLSBkYXRhIHdlIHdhbnQgdG8gdXNlIHRvIGV4dGVuZCB0aGUgdGFnIHByb3BlcnRpZXNcbiAgICogQHJldHVybnMgeyBUYWcgfSB0aGUgY3VycmVudCB0YWcgaW5zdGFuY2VcbiAgICovXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICd1cGRhdGUnLCBmdW5jdGlvbiB0YWdVcGRhdGUoZGF0YSkge1xuICAgIHZhciBuZXh0T3B0cyA9IHt9LFxuICAgICAgY2FuVHJpZ2dlciA9IHRoaXMuaXNNb3VudGVkICYmICFza2lwQW5vbnltb3VzO1xuXG4gICAgLy8gbWFrZSBzdXJlIHRoZSBkYXRhIHBhc3NlZCB3aWxsIG5vdCBvdmVycmlkZVxuICAgIC8vIHRoZSBjb21wb25lbnQgY29yZSBtZXRob2RzXG4gICAgZGF0YSA9IGNsZWFuVXBEYXRhKGRhdGEpO1xuICAgIGV4dGVuZCh0aGlzLCBkYXRhKTtcbiAgICB1cGRhdGVPcHRzLmFwcGx5KHRoaXMsIFtpc0xvb3AsIHBhcmVudCwgaXNBbm9ueW1vdXMsIG5leHRPcHRzLCBpbnN0QXR0cnNdKTtcblxuICAgIGlmIChjYW5UcmlnZ2VyICYmIHRoaXMuaXNNb3VudGVkICYmIGlzRnVuY3Rpb24odGhpcy5zaG91bGRVcGRhdGUpICYmICF0aGlzLnNob3VsZFVwZGF0ZShkYXRhLCBuZXh0T3B0cykpIHtcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgLy8gaW5oZXJpdCBwcm9wZXJ0aWVzIGZyb20gdGhlIHBhcmVudCwgYnV0IG9ubHkgZm9yIGlzQW5vbnltb3VzIHRhZ3NcbiAgICBpZiAoaXNMb29wICYmIGlzQW5vbnltb3VzKSB7IGluaGVyaXRGcm9tLmFwcGx5KHRoaXMsIFt0aGlzLnBhcmVudCwgcHJvcHNJblN5bmNXaXRoUGFyZW50XSk7IH1cbiAgICBleHRlbmQob3B0cywgbmV4dE9wdHMpO1xuICAgIGlmIChjYW5UcmlnZ2VyKSB7IHRoaXMudHJpZ2dlcigndXBkYXRlJywgZGF0YSk7IH1cbiAgICB1cGRhdGVBbGxFeHByZXNzaW9ucy5jYWxsKHRoaXMsIGV4cHJlc3Npb25zKTtcbiAgICBpZiAoY2FuVHJpZ2dlcikgeyB0aGlzLnRyaWdnZXIoJ3VwZGF0ZWQnKTsgfVxuXG4gICAgcmV0dXJuIHRoaXNcblxuICB9LmJpbmQodGhpcykpO1xuXG4gIC8qKlxuICAgKiBBZGQgYSBtaXhpbiB0byB0aGlzIHRhZ1xuICAgKiBAcmV0dXJucyB7IFRhZyB9IHRoZSBjdXJyZW50IHRhZyBpbnN0YW5jZVxuICAgKi9cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ21peGluJywgZnVuY3Rpb24gdGFnTWl4aW4oKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICBlYWNoKGFyZ3VtZW50cywgZnVuY3Rpb24gKG1peCkge1xuICAgICAgdmFyIGluc3RhbmNlLCBvYmo7XG4gICAgICB2YXIgcHJvcHMgPSBbXTtcblxuICAgICAgLy8gcHJvcGVydGllcyBibGFja2xpc3RlZCBhbmQgd2lsbCBub3QgYmUgYm91bmQgdG8gdGhlIHRhZyBpbnN0YW5jZVxuICAgICAgdmFyIHByb3BzQmxhY2tsaXN0ID0gWydpbml0JywgJ19fcHJvdG9fXyddO1xuXG4gICAgICBtaXggPSBpc1N0cmluZyhtaXgpID8gbWl4aW4kMShtaXgpIDogbWl4O1xuXG4gICAgICAvLyBjaGVjayBpZiB0aGUgbWl4aW4gaXMgYSBmdW5jdGlvblxuICAgICAgaWYgKGlzRnVuY3Rpb24obWl4KSkge1xuICAgICAgICAvLyBjcmVhdGUgdGhlIG5ldyBtaXhpbiBpbnN0YW5jZVxuICAgICAgICBpbnN0YW5jZSA9IG5ldyBtaXgoKTtcbiAgICAgIH0gZWxzZSB7IGluc3RhbmNlID0gbWl4OyB9XG5cbiAgICAgIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihpbnN0YW5jZSk7XG5cbiAgICAgIC8vIGJ1aWxkIG11bHRpbGV2ZWwgcHJvdG90eXBlIGluaGVyaXRhbmNlIGNoYWluIHByb3BlcnR5IGxpc3RcbiAgICAgIGRvIHsgcHJvcHMgPSBwcm9wcy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqIHx8IGluc3RhbmNlKSk7IH1cbiAgICAgIHdoaWxlIChvYmogPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqIHx8IGluc3RhbmNlKSlcblxuICAgICAgLy8gbG9vcCB0aGUga2V5cyBpbiB0aGUgZnVuY3Rpb24gcHJvdG90eXBlIG9yIHRoZSBhbGwgb2JqZWN0IGtleXNcbiAgICAgIGVhY2gocHJvcHMsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgLy8gYmluZCBtZXRob2RzIHRvIHRoaXNcbiAgICAgICAgLy8gYWxsb3cgbWl4aW5zIHRvIG92ZXJyaWRlIG90aGVyIHByb3BlcnRpZXMvcGFyZW50IG1peGluc1xuICAgICAgICBpZiAoIWNvbnRhaW5zKHByb3BzQmxhY2tsaXN0LCBrZXkpKSB7XG4gICAgICAgICAgLy8gY2hlY2sgZm9yIGdldHRlcnMvc2V0dGVyc1xuICAgICAgICAgIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihpbnN0YW5jZSwga2V5KSB8fCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBrZXkpO1xuICAgICAgICAgIHZhciBoYXNHZXR0ZXJTZXR0ZXIgPSBkZXNjcmlwdG9yICYmIChkZXNjcmlwdG9yLmdldCB8fCBkZXNjcmlwdG9yLnNldCk7XG5cbiAgICAgICAgICAvLyBhcHBseSBtZXRob2Qgb25seSBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0IG9uIHRoZSBpbnN0YW5jZVxuICAgICAgICAgIGlmICghdGhpcyQxLmhhc093blByb3BlcnR5KGtleSkgJiYgaGFzR2V0dGVyU2V0dGVyKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyQxLCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzJDFba2V5XSA9IGlzRnVuY3Rpb24oaW5zdGFuY2Vba2V5XSkgP1xuICAgICAgICAgICAgICBpbnN0YW5jZVtrZXldLmJpbmQodGhpcyQxKSA6XG4gICAgICAgICAgICAgIGluc3RhbmNlW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gaW5pdCBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgYXV0b21hdGljYWxseVxuICAgICAgaWYgKGluc3RhbmNlLmluaXQpXG4gICAgICAgIHsgaW5zdGFuY2UuaW5pdC5iaW5kKHRoaXMkMSkoKTsgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzXG4gIH0uYmluZCh0aGlzKSk7XG5cbiAgLyoqXG4gICAqIE1vdW50IHRoZSBjdXJyZW50IHRhZyBpbnN0YW5jZVxuICAgKiBAcmV0dXJucyB7IFRhZyB9IHRoZSBjdXJyZW50IHRhZyBpbnN0YW5jZVxuICAgKi9cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ21vdW50JywgZnVuY3Rpb24gdGFnTW91bnQoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICByb290Ll90YWcgPSB0aGlzOyAvLyBrZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSB0YWcganVzdCBjcmVhdGVkXG5cbiAgICAvLyBSZWFkIGFsbCB0aGUgYXR0cnMgb24gdGhpcyBpbnN0YW5jZS4gVGhpcyBnaXZlIHVzIHRoZSBpbmZvIHdlIG5lZWQgZm9yIHVwZGF0ZU9wdHNcbiAgICBwYXJzZUF0dHJpYnV0ZXMuYXBwbHkocGFyZW50LCBbcm9vdCwgcm9vdC5hdHRyaWJ1dGVzLCBmdW5jdGlvbiAoYXR0ciwgZXhwcikge1xuICAgICAgaWYgKCFpc0Fub255bW91cyAmJiBSZWZFeHByLmlzUHJvdG90eXBlT2YoZXhwcikpIHsgZXhwci50YWcgPSB0aGlzJDE7IH1cbiAgICAgIGF0dHIuZXhwciA9IGV4cHI7XG4gICAgICBpbnN0QXR0cnMucHVzaChhdHRyKTtcbiAgICB9XSk7XG5cbiAgICAvLyB1cGRhdGUgdGhlIHJvb3QgYWRkaW5nIGN1c3RvbSBhdHRyaWJ1dGVzIGNvbWluZyBmcm9tIHRoZSBjb21waWxlclxuICAgIGltcGxBdHRycyA9IFtdO1xuICAgIHdhbGtBdHRycyhpbXBsLmF0dHJzLCBmdW5jdGlvbiAoaywgdikgeyBpbXBsQXR0cnMucHVzaCh7bmFtZTogaywgdmFsdWU6IHZ9KTsgfSk7XG4gICAgcGFyc2VBdHRyaWJ1dGVzLmFwcGx5KHRoaXMsIFtyb290LCBpbXBsQXR0cnMsIGZ1bmN0aW9uIChhdHRyLCBleHByKSB7XG4gICAgICBpZiAoZXhwcikgeyBleHByZXNzaW9ucy5wdXNoKGV4cHIpOyB9XG4gICAgICBlbHNlIHsgc2V0QXR0cihyb290LCBhdHRyLm5hbWUsIGF0dHIudmFsdWUpOyB9XG4gICAgfV0pO1xuXG4gICAgLy8gaW5pdGlhbGlhdGlvblxuICAgIHVwZGF0ZU9wdHMuYXBwbHkodGhpcywgW2lzTG9vcCwgcGFyZW50LCBpc0Fub255bW91cywgb3B0cywgaW5zdEF0dHJzXSk7XG5cbiAgICAvLyBhZGQgZ2xvYmFsIG1peGluc1xuICAgIHZhciBnbG9iYWxNaXhpbiA9IG1peGluJDEoR0xPQkFMX01JWElOKTtcblxuICAgIGlmIChnbG9iYWxNaXhpbiAmJiAhc2tpcEFub255bW91cykge1xuICAgICAgZm9yICh2YXIgaSBpbiBnbG9iYWxNaXhpbikge1xuICAgICAgICBpZiAoZ2xvYmFsTWl4aW4uaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICB0aGlzJDEubWl4aW4oZ2xvYmFsTWl4aW5baV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGltcGwuZm4pIHsgaW1wbC5mbi5jYWxsKHRoaXMsIG9wdHMpOyB9XG5cbiAgICBpZiAoIXNraXBBbm9ueW1vdXMpIHsgdGhpcy50cmlnZ2VyKCdiZWZvcmUtbW91bnQnKTsgfVxuXG4gICAgLy8gcGFyc2UgbGF5b3V0IGFmdGVyIGluaXQuIGZuIG1heSBjYWxjdWxhdGUgYXJncyBmb3IgbmVzdGVkIGN1c3RvbSB0YWdzXG4gICAgcGFyc2VFeHByZXNzaW9ucy5hcHBseSh0aGlzLCBbZG9tLCBleHByZXNzaW9ucywgaXNBbm9ueW1vdXNdKTtcblxuICAgIHRoaXMudXBkYXRlKGl0ZW0pO1xuXG4gICAgaWYgKCFpc0Fub255bW91cykge1xuICAgICAgd2hpbGUgKGRvbS5maXJzdENoaWxkKSB7IHJvb3QuYXBwZW5kQ2hpbGQoZG9tLmZpcnN0Q2hpbGQpOyB9XG4gICAgfVxuXG4gICAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3Jvb3QnLCByb290KTtcbiAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaXNNb3VudGVkJywgdHJ1ZSk7XG5cbiAgICBpZiAoc2tpcEFub255bW91cykgeyByZXR1cm4gfVxuXG4gICAgLy8gaWYgaXQncyBub3QgYSBjaGlsZCB0YWcgd2UgY2FuIHRyaWdnZXIgaXRzIG1vdW50IGV2ZW50XG4gICAgaWYgKCF0aGlzLnBhcmVudCkge1xuICAgICAgdGhpcy50cmlnZ2VyKCdtb3VudCcpO1xuICAgIH1cbiAgICAvLyBvdGhlcndpc2Ugd2UgbmVlZCB0byB3YWl0IHRoYXQgdGhlIHBhcmVudCBcIm1vdW50XCIgb3IgXCJ1cGRhdGVkXCIgZXZlbnQgZ2V0cyB0cmlnZ2VyZWRcbiAgICBlbHNlIHtcbiAgICAgIHZhciBwID0gZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHRoaXMucGFyZW50KTtcbiAgICAgIHAub25lKCFwLmlzTW91bnRlZCA/ICdtb3VudCcgOiAndXBkYXRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcyQxLnRyaWdnZXIoJ21vdW50Jyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuXG4gIH0uYmluZCh0aGlzKSk7XG5cbiAgLyoqXG4gICAqIFVubW91bnQgdGhlIHRhZyBpbnN0YW5jZVxuICAgKiBAcGFyYW0geyBCb29sZWFuIH0gbXVzdEtlZXBSb290IC0gaWYgaXQncyB0cnVlIHRoZSByb290IG5vZGUgd2lsbCBub3QgYmUgcmVtb3ZlZFxuICAgKiBAcmV0dXJucyB7IFRhZyB9IHRoZSBjdXJyZW50IHRhZyBpbnN0YW5jZVxuICAgKi9cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3VubW91bnQnLCBmdW5jdGlvbiB0YWdVbm1vdW50KG11c3RLZWVwUm9vdCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIGVsID0gdGhpcy5yb290LFxuICAgICAgcCA9IGVsLnBhcmVudE5vZGUsXG4gICAgICBwdGFnLFxuICAgICAgdGFnSW5kZXggPSBfX1RBR1NfQ0FDSEUuaW5kZXhPZih0aGlzKTtcblxuICAgIGlmICghc2tpcEFub255bW91cykgeyB0aGlzLnRyaWdnZXIoJ2JlZm9yZS11bm1vdW50Jyk7IH1cblxuICAgIC8vIGNsZWFyIGFsbCBhdHRyaWJ1dGVzIGNvbWluZyBmcm9tIHRoZSBtb3VudGVkIHRhZ1xuICAgIHdhbGtBdHRycyhpbXBsLmF0dHJzLCBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgaWYgKHN0YXJ0c1dpdGgobmFtZSwgQVRUUlNfUFJFRklYKSlcbiAgICAgICAgeyBuYW1lID0gbmFtZS5zbGljZShBVFRSU19QUkVGSVgubGVuZ3RoKTsgfVxuICAgICAgcmVtQXR0cihyb290LCBuYW1lKTtcbiAgICB9KTtcblxuICAgIC8vIHJlbW92ZSBhbGwgdGhlIGV2ZW50IGxpc3RlbmVyc1xuICAgIHRoaXMuX18ubGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGRvbSkge1xuICAgICAgT2JqZWN0LmtleXMoZG9tW1JJT1RfRVZFTlRTX0tFWV0pLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICBkb20ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGRvbVtSSU9UX0VWRU5UU19LRVldW2V2ZW50TmFtZV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyByZW1vdmUgdGhpcyB0YWcgaW5zdGFuY2UgZnJvbSB0aGUgZ2xvYmFsIHZpcnR1YWxEb20gdmFyaWFibGVcbiAgICBpZiAodGFnSW5kZXggIT09IC0xKVxuICAgICAgeyBfX1RBR1NfQ0FDSEUuc3BsaWNlKHRhZ0luZGV4LCAxKTsgfVxuXG4gICAgaWYgKHAgfHwgaXNWaXJ0dWFsKSB7XG4gICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgIHB0YWcgPSBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcocGFyZW50KTtcblxuICAgICAgICBpZiAoaXNWaXJ0dWFsKSB7XG4gICAgICAgICAgT2JqZWN0LmtleXModGhpcy50YWdzKS5mb3JFYWNoKGZ1bmN0aW9uICh0YWdOYW1lKSB7XG4gICAgICAgICAgICBhcnJheWlzaFJlbW92ZShwdGFnLnRhZ3MsIHRhZ05hbWUsIHRoaXMkMS50YWdzW3RhZ05hbWVdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcnJheWlzaFJlbW92ZShwdGFnLnRhZ3MsIHRhZ05hbWUsIHRoaXMpO1xuICAgICAgICAgIGlmKHBhcmVudCAhPT0gcHRhZykgLy8gcmVtb3ZlIGZyb20gX3BhcmVudCB0b29cbiAgICAgICAgICAgIHsgYXJyYXlpc2hSZW1vdmUocGFyZW50LnRhZ3MsIHRhZ05hbWUsIHRoaXMpOyB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJlbW92ZSB0aGUgdGFnIGNvbnRlbnRzXG4gICAgICAgIHNldElubmVySFRNTChlbCwgJycpO1xuICAgICAgfVxuXG4gICAgICBpZiAocCAmJiAhbXVzdEtlZXBSb290KSB7IHAucmVtb3ZlQ2hpbGQoZWwpOyB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX18udmlydHMpIHtcbiAgICAgIGVhY2godGhpcy5fXy52aXJ0cywgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgaWYgKHYucGFyZW50Tm9kZSkgeyB2LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodik7IH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGFsbG93IGV4cHJlc3Npb25zIHRvIHVubW91bnQgdGhlbXNlbHZlc1xuICAgIHVubW91bnRBbGwoZXhwcmVzc2lvbnMpO1xuICAgIGVhY2goaW5zdEF0dHJzLCBmdW5jdGlvbiAoYSkgeyByZXR1cm4gYS5leHByICYmIGEuZXhwci51bm1vdW50ICYmIGEuZXhwci51bm1vdW50KCk7IH0pO1xuXG4gICAgLy8gY3VzdG9tIGludGVybmFsIHVubW91bnQgZnVuY3Rpb24gdG8gYXZvaWQgcmVseWluZyBvbiB0aGUgb2JzZXJ2YWJsZVxuICAgIGlmICh0aGlzLl9fLm9uVW5tb3VudCkgeyB0aGlzLl9fLm9uVW5tb3VudCgpOyB9XG5cbiAgICBpZiAoIXNraXBBbm9ueW1vdXMpIHtcbiAgICAgIHRoaXMudHJpZ2dlcigndW5tb3VudCcpO1xuICAgICAgdGhpcy5vZmYoJyonKTtcbiAgICB9XG5cbiAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaXNNb3VudGVkJywgZmFsc2UpO1xuXG4gICAgZGVsZXRlIHRoaXMucm9vdC5fdGFnO1xuXG4gICAgcmV0dXJuIHRoaXNcblxuICB9LmJpbmQodGhpcykpO1xufVxuXG4vKipcbiAqIERldGVjdCB0aGUgdGFnIGltcGxlbWVudGF0aW9uIGJ5IGEgRE9NIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZG9tIC0gRE9NIG5vZGUgd2UgbmVlZCB0byBwYXJzZSB0byBnZXQgaXRzIHRhZyBpbXBsZW1lbnRhdGlvblxuICogQHJldHVybnMgeyBPYmplY3QgfSBpdCByZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiBhIGN1c3RvbSB0YWcgKHRlbXBsYXRlIGFuZCBib290IGZ1bmN0aW9uKVxuICovXG5mdW5jdGlvbiBnZXRUYWcoZG9tKSB7XG4gIHJldHVybiBkb20udGFnTmFtZSAmJiBfX1RBR19JTVBMW2dldEF0dHIoZG9tLCBJU19ESVJFQ1RJVkUpIHx8XG4gICAgZ2V0QXR0cihkb20sIElTX0RJUkVDVElWRSkgfHwgZG9tLnRhZ05hbWUudG9Mb3dlckNhc2UoKV1cbn1cblxuLyoqXG4gKiBJbmhlcml0IHByb3BlcnRpZXMgZnJvbSBhIHRhcmdldCB0YWcgaW5zdGFuY2VcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBUYWcgfSB0YXJnZXQgLSB0YWcgd2hlcmUgd2Ugd2lsbCBpbmhlcml0IHByb3BlcnRpZXNcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBwcm9wc0luU3luY1dpdGhQYXJlbnQgLSBhcnJheSBvZiBwcm9wZXJ0aWVzIHRvIHN5bmMgd2l0aCB0aGUgdGFyZ2V0XG4gKi9cbmZ1bmN0aW9uIGluaGVyaXRGcm9tKHRhcmdldCwgcHJvcHNJblN5bmNXaXRoUGFyZW50KSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIGVhY2goT2JqZWN0LmtleXModGFyZ2V0KSwgZnVuY3Rpb24gKGspIHtcbiAgICAvLyBzb21lIHByb3BlcnRpZXMgbXVzdCBiZSBhbHdheXMgaW4gc3luYyB3aXRoIHRoZSBwYXJlbnQgdGFnXG4gICAgdmFyIG11c3RTeW5jID0gIWlzUmVzZXJ2ZWROYW1lKGspICYmIGNvbnRhaW5zKHByb3BzSW5TeW5jV2l0aFBhcmVudCwgayk7XG5cbiAgICBpZiAoaXNVbmRlZmluZWQodGhpcyQxW2tdKSB8fCBtdXN0U3luYykge1xuICAgICAgLy8gdHJhY2sgdGhlIHByb3BlcnR5IHRvIGtlZXAgaW4gc3luY1xuICAgICAgLy8gc28gd2UgY2FuIGtlZXAgaXQgdXBkYXRlZFxuICAgICAgaWYgKCFtdXN0U3luYykgeyBwcm9wc0luU3luY1dpdGhQYXJlbnQucHVzaChrKTsgfVxuICAgICAgdGhpcyQxW2tdID0gdGFyZ2V0W2tdO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogTW92ZSB0aGUgcG9zaXRpb24gb2YgYSBjdXN0b20gdGFnIGluIGl0cyBwYXJlbnQgdGFnXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdGFnTmFtZSAtIGtleSB3aGVyZSB0aGUgdGFnIHdhcyBzdG9yZWRcbiAqIEBwYXJhbSAgIHsgTnVtYmVyIH0gbmV3UG9zIC0gaW5kZXggd2hlcmUgdGhlIG5ldyB0YWcgd2lsbCBiZSBzdG9yZWRcbiAqL1xuZnVuY3Rpb24gbW92ZUNoaWxkVGFnKHRhZ05hbWUsIG5ld1Bvcykge1xuICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnQsXG4gICAgdGFncztcbiAgLy8gbm8gcGFyZW50IG5vIG1vdmVcbiAgaWYgKCFwYXJlbnQpIHsgcmV0dXJuIH1cblxuICB0YWdzID0gcGFyZW50LnRhZ3NbdGFnTmFtZV07XG5cbiAgaWYgKGlzQXJyYXkodGFncykpXG4gICAgeyB0YWdzLnNwbGljZShuZXdQb3MsIDAsIHRhZ3Muc3BsaWNlKHRhZ3MuaW5kZXhPZih0aGlzKSwgMSlbMF0pOyB9XG4gIGVsc2UgeyBhcnJheWlzaEFkZChwYXJlbnQudGFncywgdGFnTmFtZSwgdGhpcyk7IH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgY2hpbGQgdGFnIGluY2x1ZGluZyBpdCBjb3JyZWN0bHkgaW50byBpdHMgcGFyZW50XG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGNoaWxkIC0gY2hpbGQgdGFnIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IG9wdHMgLSB0YWcgb3B0aW9ucyBjb250YWluaW5nIHRoZSBET00gbm9kZSB3aGVyZSB0aGUgdGFnIHdpbGwgYmUgbW91bnRlZFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBpbm5lckhUTUwgLSBpbm5lciBodG1sIG9mIHRoZSBjaGlsZCBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IHBhcmVudCAtIGluc3RhbmNlIG9mIHRoZSBwYXJlbnQgdGFnIGluY2x1ZGluZyB0aGUgY2hpbGQgY3VzdG9tIHRhZ1xuICogQHJldHVybnMgeyBPYmplY3QgfSBpbnN0YW5jZSBvZiB0aGUgbmV3IGNoaWxkIHRhZyBqdXN0IGNyZWF0ZWRcbiAqL1xuZnVuY3Rpb24gaW5pdENoaWxkVGFnKGNoaWxkLCBvcHRzLCBpbm5lckhUTUwsIHBhcmVudCkge1xuICB2YXIgdGFnID0gbmV3IFRhZyQxKGNoaWxkLCBvcHRzLCBpbm5lckhUTUwpLFxuICAgIHRhZ05hbWUgPSBvcHRzLnRhZ05hbWUgfHwgZ2V0VGFnTmFtZShvcHRzLnJvb3QsIHRydWUpLFxuICAgIHB0YWcgPSBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcocGFyZW50KTtcbiAgLy8gZml4IGZvciB0aGUgcGFyZW50IGF0dHJpYnV0ZSBpbiB0aGUgbG9vcGVkIGVsZW1lbnRzXG4gIGRlZmluZVByb3BlcnR5KHRhZywgJ3BhcmVudCcsIHB0YWcpO1xuICAvLyBzdG9yZSB0aGUgcmVhbCBwYXJlbnQgdGFnXG4gIC8vIGluIHNvbWUgY2FzZXMgdGhpcyBjb3VsZCBiZSBkaWZmZXJlbnQgZnJvbSB0aGUgY3VzdG9tIHBhcmVudCB0YWdcbiAgLy8gZm9yIGV4YW1wbGUgaW4gbmVzdGVkIGxvb3BzXG4gIHRhZy5fXy5wYXJlbnQgPSBwYXJlbnQ7XG5cbiAgLy8gYWRkIHRoaXMgdGFnIHRvIHRoZSBjdXN0b20gcGFyZW50IHRhZ1xuICBhcnJheWlzaEFkZChwdGFnLnRhZ3MsIHRhZ05hbWUsIHRhZyk7XG5cbiAgLy8gYW5kIGFsc28gdG8gdGhlIHJlYWwgcGFyZW50IHRhZ1xuICBpZiAocHRhZyAhPT0gcGFyZW50KVxuICAgIHsgYXJyYXlpc2hBZGQocGFyZW50LnRhZ3MsIHRhZ05hbWUsIHRhZyk7IH1cblxuICAvLyBlbXB0eSB0aGUgY2hpbGQgbm9kZSBvbmNlIHdlIGdvdCBpdHMgdGVtcGxhdGVcbiAgLy8gdG8gYXZvaWQgdGhhdCBpdHMgY2hpbGRyZW4gZ2V0IGNvbXBpbGVkIG11bHRpcGxlIHRpbWVzXG4gIG9wdHMucm9vdC5pbm5lckhUTUwgPSAnJztcblxuICByZXR1cm4gdGFnXG59XG5cbi8qKlxuICogTG9vcCBiYWNrd2FyZCBhbGwgdGhlIHBhcmVudHMgdHJlZSB0byBkZXRlY3QgdGhlIGZpcnN0IGN1c3RvbSBwYXJlbnQgdGFnXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IHRhZyAtIGEgVGFnIGluc3RhbmNlXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IHRoZSBpbnN0YW5jZSBvZiB0aGUgZmlyc3QgY3VzdG9tIHBhcmVudCB0YWcgZm91bmRcbiAqL1xuZnVuY3Rpb24gZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHRhZykge1xuICB2YXIgcHRhZyA9IHRhZztcbiAgd2hpbGUgKHB0YWcuX18uaXNBbm9ueW1vdXMpIHtcbiAgICBpZiAoIXB0YWcucGFyZW50KSB7IGJyZWFrIH1cbiAgICBwdGFnID0gcHRhZy5wYXJlbnQ7XG4gIH1cbiAgcmV0dXJuIHB0YWdcbn1cblxuLyoqXG4gKiBUcmlnZ2VyIHRoZSB1bm1vdW50IG1ldGhvZCBvbiBhbGwgdGhlIGV4cHJlc3Npb25zXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gZXhwcmVzc2lvbnMgLSBET00gZXhwcmVzc2lvbnNcbiAqL1xuZnVuY3Rpb24gdW5tb3VudEFsbChleHByZXNzaW9ucykge1xuICBlYWNoKGV4cHJlc3Npb25zLCBmdW5jdGlvbihleHByKSB7XG4gICAgaWYgKGV4cHIgaW5zdGFuY2VvZiBUYWckMSkgeyBleHByLnVubW91bnQodHJ1ZSk7IH1cbiAgICBlbHNlIGlmIChleHByLnRhZ05hbWUpIHsgZXhwci50YWcudW5tb3VudCh0cnVlKTsgfVxuICAgIGVsc2UgaWYgKGV4cHIudW5tb3VudCkgeyBleHByLnVubW91bnQoKTsgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHRhZyBuYW1lIG9mIGFueSBET00gbm9kZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBkb20gLSBET00gbm9kZSB3ZSB3YW50IHRvIHBhcnNlXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBza2lwRGF0YUlzIC0gaGFjayB0byBpZ25vcmUgdGhlIGRhdGEtaXMgYXR0cmlidXRlIHdoZW4gYXR0YWNoaW5nIHRvIHBhcmVudFxuICogQHJldHVybnMgeyBTdHJpbmcgfSBuYW1lIHRvIGlkZW50aWZ5IHRoaXMgZG9tIG5vZGUgaW4gcmlvdFxuICovXG5mdW5jdGlvbiBnZXRUYWdOYW1lKGRvbSwgc2tpcERhdGFJcykge1xuICB2YXIgY2hpbGQgPSBnZXRUYWcoZG9tKSxcbiAgICBuYW1lZFRhZyA9ICFza2lwRGF0YUlzICYmIGdldEF0dHIoZG9tLCBJU19ESVJFQ1RJVkUpO1xuICByZXR1cm4gbmFtZWRUYWcgJiYgIXRtcGwuaGFzRXhwcihuYW1lZFRhZykgP1xuICAgICAgICAgICAgICAgIG5hbWVkVGFnIDpcbiAgICAgICAgICAgICAgY2hpbGQgPyBjaGlsZC5uYW1lIDogZG9tLnRhZ05hbWUudG9Mb3dlckNhc2UoKVxufVxuXG4vKipcbiAqIFdpdGggdGhpcyBmdW5jdGlvbiB3ZSBhdm9pZCB0aGF0IHRoZSBpbnRlcm5hbCBUYWcgbWV0aG9kcyBnZXQgb3ZlcnJpZGRlblxuICogQHBhcmFtICAgeyBPYmplY3QgfSBkYXRhIC0gb3B0aW9ucyB3ZSB3YW50IHRvIHVzZSB0byBleHRlbmQgdGhlIHRhZyBpbnN0YW5jZVxuICogQHJldHVybnMgeyBPYmplY3QgfSBjbGVhbiBvYmplY3Qgd2l0aG91dCBjb250YWluaW5nIHRoZSByaW90IGludGVybmFsIHJlc2VydmVkIHdvcmRzXG4gKi9cbmZ1bmN0aW9uIGNsZWFuVXBEYXRhKGRhdGEpIHtcbiAgaWYgKCEoZGF0YSBpbnN0YW5jZW9mIFRhZyQxKSAmJiAhKGRhdGEgJiYgaXNGdW5jdGlvbihkYXRhLnRyaWdnZXIpKSlcbiAgICB7IHJldHVybiBkYXRhIH1cblxuICB2YXIgbyA9IHt9O1xuICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgIGlmICghUkVfUkVTRVJWRURfTkFNRVMudGVzdChrZXkpKSB7IG9ba2V5XSA9IGRhdGFba2V5XTsgfVxuICB9XG4gIHJldHVybiBvXG59XG5cbi8qKlxuICogU2V0IHRoZSBwcm9wZXJ0eSBvZiBhbiBvYmplY3QgZm9yIGEgZ2l2ZW4ga2V5LiBJZiBzb21ldGhpbmcgYWxyZWFkeVxuICogZXhpc3RzIHRoZXJlLCB0aGVuIGl0IGJlY29tZXMgYW4gYXJyYXkgY29udGFpbmluZyBib3RoIHRoZSBvbGQgYW5kIG5ldyB2YWx1ZS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IG9iaiAtIG9iamVjdCBvbiB3aGljaCB0byBzZXQgdGhlIHByb3BlcnR5XG4gKiBAcGFyYW0geyBTdHJpbmcgfSBrZXkgLSBwcm9wZXJ0eSBuYW1lXG4gKiBAcGFyYW0geyBPYmplY3QgfSB2YWx1ZSAtIHRoZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgc2V0XG4gKiBAcGFyYW0geyBCb29sZWFuIH0gZW5zdXJlQXJyYXkgLSBlbnN1cmUgdGhhdCB0aGUgcHJvcGVydHkgcmVtYWlucyBhbiBhcnJheVxuICogQHBhcmFtIHsgTnVtYmVyIH0gaW5kZXggLSBhZGQgdGhlIG5ldyBpdGVtIGluIGEgY2VydGFpbiBhcnJheSBwb3NpdGlvblxuICovXG5mdW5jdGlvbiBhcnJheWlzaEFkZChvYmosIGtleSwgdmFsdWUsIGVuc3VyZUFycmF5LCBpbmRleCkge1xuICB2YXIgZGVzdCA9IG9ialtrZXldO1xuICB2YXIgaXNBcnIgPSBpc0FycmF5KGRlc3QpO1xuICB2YXIgaGFzSW5kZXggPSAhaXNVbmRlZmluZWQoaW5kZXgpO1xuXG4gIGlmIChkZXN0ICYmIGRlc3QgPT09IHZhbHVlKSB7IHJldHVybiB9XG5cbiAgLy8gaWYgdGhlIGtleSB3YXMgbmV2ZXIgc2V0LCBzZXQgaXQgb25jZVxuICBpZiAoIWRlc3QgJiYgZW5zdXJlQXJyYXkpIHsgb2JqW2tleV0gPSBbdmFsdWVdOyB9XG4gIGVsc2UgaWYgKCFkZXN0KSB7IG9ialtrZXldID0gdmFsdWU7IH1cbiAgLy8gaWYgaXQgd2FzIGFuIGFycmF5IGFuZCBub3QgeWV0IHNldFxuICBlbHNlIHtcbiAgICBpZiAoaXNBcnIpIHtcbiAgICAgIHZhciBvbGRJbmRleCA9IGRlc3QuaW5kZXhPZih2YWx1ZSk7XG4gICAgICAvLyB0aGlzIGl0ZW0gbmV2ZXIgY2hhbmdlZCBpdHMgcG9zaXRpb25cbiAgICAgIGlmIChvbGRJbmRleCA9PT0gaW5kZXgpIHsgcmV0dXJuIH1cbiAgICAgIC8vIHJlbW92ZSB0aGUgaXRlbSBmcm9tIGl0cyBvbGQgcG9zaXRpb25cbiAgICAgIGlmIChvbGRJbmRleCAhPT0gLTEpIHsgZGVzdC5zcGxpY2Uob2xkSW5kZXgsIDEpOyB9XG4gICAgICAvLyBtb3ZlIG9yIGFkZCB0aGUgaXRlbVxuICAgICAgaWYgKGhhc0luZGV4KSB7XG4gICAgICAgIGRlc3Quc3BsaWNlKGluZGV4LCAwLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZXN0LnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7IG9ialtrZXldID0gW2Rlc3QsIHZhbHVlXTsgfVxuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gYW4gb2JqZWN0IGF0IGEgZ2l2ZW4ga2V5LiBJZiB0aGUga2V5IHBvaW50cyB0byBhbiBhcnJheSxcbiAqIHRoZW4gdGhlIGl0ZW0gaXMganVzdCByZW1vdmVkIGZyb20gdGhlIGFycmF5LlxuICogQHBhcmFtIHsgT2JqZWN0IH0gb2JqIC0gb2JqZWN0IG9uIHdoaWNoIHRvIHJlbW92ZSB0aGUgcHJvcGVydHlcbiAqIEBwYXJhbSB7IFN0cmluZyB9IGtleSAtIHByb3BlcnR5IG5hbWVcbiAqIEBwYXJhbSB7IE9iamVjdCB9IHZhbHVlIC0gdGhlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSByZW1vdmVkXG4gKiBAcGFyYW0geyBCb29sZWFuIH0gZW5zdXJlQXJyYXkgLSBlbnN1cmUgdGhhdCB0aGUgcHJvcGVydHkgcmVtYWlucyBhbiBhcnJheVxuKi9cbmZ1bmN0aW9uIGFycmF5aXNoUmVtb3ZlKG9iaiwga2V5LCB2YWx1ZSwgZW5zdXJlQXJyYXkpIHtcbiAgaWYgKGlzQXJyYXkob2JqW2tleV0pKSB7XG4gICAgdmFyIGluZGV4ID0gb2JqW2tleV0uaW5kZXhPZih2YWx1ZSk7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkgeyBvYmpba2V5XS5zcGxpY2UoaW5kZXgsIDEpOyB9XG4gICAgaWYgKCFvYmpba2V5XS5sZW5ndGgpIHsgZGVsZXRlIG9ialtrZXldOyB9XG4gICAgZWxzZSBpZiAob2JqW2tleV0ubGVuZ3RoID09PSAxICYmICFlbnN1cmVBcnJheSkgeyBvYmpba2V5XSA9IG9ialtrZXldWzBdOyB9XG4gIH0gZWxzZVxuICAgIHsgZGVsZXRlIG9ialtrZXldOyB9IC8vIG90aGVyd2lzZSBqdXN0IGRlbGV0ZSB0aGUga2V5XG59XG5cbi8qKlxuICogTW91bnQgYSB0YWcgY3JlYXRpbmcgbmV3IFRhZyBpbnN0YW5jZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSByb290IC0gZG9tIG5vZGUgd2hlcmUgdGhlIHRhZyB3aWxsIGJlIG1vdW50ZWRcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdGFnTmFtZSAtIG5hbWUgb2YgdGhlIHJpb3QgdGFnIHdlIHdhbnQgdG8gbW91bnRcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gb3B0cyAtIG9wdGlvbnMgdG8gcGFzcyB0byB0aGUgVGFnIGluc3RhbmNlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGN0eCAtIG9wdGlvbmFsIGNvbnRleHQgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZXh0ZW5kIGFuIGV4aXN0aW5nIGNsYXNzICggdXNlZCBpbiByaW90LlRhZyApXG4gKiBAcmV0dXJucyB7IFRhZyB9IGEgbmV3IFRhZyBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBtb3VudFRvKHJvb3QsIHRhZ05hbWUsIG9wdHMsIGN0eCkge1xuICB2YXIgaW1wbCA9IF9fVEFHX0lNUExbdGFnTmFtZV0sXG4gICAgaW1wbENsYXNzID0gX19UQUdfSU1QTFt0YWdOYW1lXS5jbGFzcyxcbiAgICB0YWcgPSBjdHggfHwgKGltcGxDbGFzcyA/IE9iamVjdC5jcmVhdGUoaW1wbENsYXNzLnByb3RvdHlwZSkgOiB7fSksXG4gICAgLy8gY2FjaGUgdGhlIGlubmVyIEhUTUwgdG8gZml4ICM4NTVcbiAgICBpbm5lckhUTUwgPSByb290Ll9pbm5lckhUTUwgPSByb290Ll9pbm5lckhUTUwgfHwgcm9vdC5pbm5lckhUTUw7XG5cbiAgLy8gY2xlYXIgdGhlIGlubmVyIGh0bWxcbiAgcm9vdC5pbm5lckhUTUwgPSAnJztcblxuICB2YXIgY29uZiA9IGV4dGVuZCh7IHJvb3Q6IHJvb3QsIG9wdHM6IG9wdHMgfSwgeyBwYXJlbnQ6IG9wdHMgPyBvcHRzLnBhcmVudCA6IG51bGwgfSk7XG5cbiAgaWYgKGltcGwgJiYgcm9vdCkgeyBUYWckMS5hcHBseSh0YWcsIFtpbXBsLCBjb25mLCBpbm5lckhUTUxdKTsgfVxuXG4gIGlmICh0YWcgJiYgdGFnLm1vdW50KSB7XG4gICAgdGFnLm1vdW50KHRydWUpO1xuICAgIC8vIGFkZCB0aGlzIHRhZyB0byB0aGUgdmlydHVhbERvbSB2YXJpYWJsZVxuICAgIGlmICghY29udGFpbnMoX19UQUdTX0NBQ0hFLCB0YWcpKSB7IF9fVEFHU19DQUNIRS5wdXNoKHRhZyk7IH1cbiAgfVxuXG4gIHJldHVybiB0YWdcbn1cblxuLyoqXG4gKiBtYWtlcyBhIHRhZyB2aXJ0dWFsIGFuZCByZXBsYWNlcyBhIHJlZmVyZW5jZSBpbiB0aGUgZG9tXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSB7IHRhZyB9IHRoZSB0YWcgdG8gbWFrZSB2aXJ0dWFsXG4gKiBAcGFyYW0geyByZWYgfSB0aGUgZG9tIHJlZmVyZW5jZSBsb2NhdGlvblxuICovXG5mdW5jdGlvbiBtYWtlUmVwbGFjZVZpcnR1YWwodGFnLCByZWYpIHtcbiAgdmFyIGZyYWcgPSBjcmVhdGVGcmFnKCk7XG4gIG1ha2VWaXJ0dWFsLmNhbGwodGFnLCBmcmFnKTtcbiAgcmVmLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGZyYWcsIHJlZik7XG59XG5cbi8qKlxuICogQWRkcyB0aGUgZWxlbWVudHMgZm9yIGEgdmlydHVhbCB0YWdcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtIHsgTm9kZSB9IHNyYyAtIHRoZSBub2RlIHRoYXQgd2lsbCBkbyB0aGUgaW5zZXJ0aW5nIG9yIGFwcGVuZGluZ1xuICogQHBhcmFtIHsgVGFnIH0gdGFyZ2V0IC0gb25seSBpZiBpbnNlcnRpbmcsIGluc2VydCBiZWZvcmUgdGhpcyB0YWcncyBmaXJzdCBjaGlsZFxuICovXG5mdW5jdGlvbiBtYWtlVmlydHVhbChzcmMsIHRhcmdldCkge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgaGVhZCA9IGNyZWF0ZURPTVBsYWNlaG9sZGVyKCksXG4gICAgdGFpbCA9IGNyZWF0ZURPTVBsYWNlaG9sZGVyKCksXG4gICAgZnJhZyA9IGNyZWF0ZUZyYWcoKSxcbiAgICBzaWIsIGVsO1xuXG4gIHRoaXMucm9vdC5pbnNlcnRCZWZvcmUoaGVhZCwgdGhpcy5yb290LmZpcnN0Q2hpbGQpO1xuICB0aGlzLnJvb3QuYXBwZW5kQ2hpbGQodGFpbCk7XG5cbiAgdGhpcy5fXy5oZWFkID0gZWwgPSBoZWFkO1xuICB0aGlzLl9fLnRhaWwgPSB0YWlsO1xuXG4gIHdoaWxlIChlbCkge1xuICAgIHNpYiA9IGVsLm5leHRTaWJsaW5nO1xuICAgIGZyYWcuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIHRoaXMkMS5fXy52aXJ0cy5wdXNoKGVsKTsgLy8gaG9sZCBmb3IgdW5tb3VudGluZ1xuICAgIGVsID0gc2liO1xuICB9XG5cbiAgaWYgKHRhcmdldClcbiAgICB7IHNyYy5pbnNlcnRCZWZvcmUoZnJhZywgdGFyZ2V0Ll9fLmhlYWQpOyB9XG4gIGVsc2VcbiAgICB7IHNyYy5hcHBlbmRDaGlsZChmcmFnKTsgfVxufVxuXG4vKipcbiAqIE1vdmUgdmlydHVhbCB0YWcgYW5kIGFsbCBjaGlsZCBub2Rlc1xuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0geyBOb2RlIH0gc3JjICAtIHRoZSBub2RlIHRoYXQgd2lsbCBkbyB0aGUgaW5zZXJ0aW5nXG4gKiBAcGFyYW0geyBUYWcgfSB0YXJnZXQgLSBpbnNlcnQgYmVmb3JlIHRoaXMgdGFnJ3MgZmlyc3QgY2hpbGRcbiAqL1xuZnVuY3Rpb24gbW92ZVZpcnR1YWwoc3JjLCB0YXJnZXQpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdmFyIGVsID0gdGhpcy5fXy5oZWFkLFxuICAgIGZyYWcgPSBjcmVhdGVGcmFnKCksXG4gICAgc2liO1xuXG4gIHdoaWxlIChlbCkge1xuICAgIHNpYiA9IGVsLm5leHRTaWJsaW5nO1xuICAgIGZyYWcuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIGVsID0gc2liO1xuICAgIGlmIChlbCA9PT0gdGhpcyQxLl9fLnRhaWwpIHtcbiAgICAgIGZyYWcuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgc3JjLmluc2VydEJlZm9yZShmcmFnLCB0YXJnZXQuX18uaGVhZCk7XG4gICAgICBicmVha1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEdldCBzZWxlY3RvcnMgZm9yIHRhZ3NcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSB0YWdzIC0gdGFnIG5hbWVzIHRvIHNlbGVjdFxuICogQHJldHVybnMgeyBTdHJpbmcgfSBzZWxlY3RvclxuICovXG5mdW5jdGlvbiBzZWxlY3RUYWdzKHRhZ3MpIHtcbiAgLy8gc2VsZWN0IGFsbCB0YWdzXG4gIGlmICghdGFncykge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoX19UQUdfSU1QTCk7XG4gICAgcmV0dXJuIGtleXMgKyBzZWxlY3RUYWdzKGtleXMpXG4gIH1cblxuICByZXR1cm4gdGFnc1xuICAgIC5maWx0ZXIoZnVuY3Rpb24gKHQpIHsgcmV0dXJuICEvW14tXFx3XS8udGVzdCh0KTsgfSlcbiAgICAucmVkdWNlKGZ1bmN0aW9uIChsaXN0LCB0KSB7XG4gICAgICB2YXIgbmFtZSA9IHQudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICByZXR1cm4gbGlzdCArIFwiLFtcIiArIElTX0RJUkVDVElWRSArIFwiPVxcXCJcIiArIG5hbWUgKyBcIlxcXCJdXCJcbiAgICB9LCAnJylcbn1cblxuXG52YXIgdGFncyA9IE9iamVjdC5mcmVlemUoe1xuXHRnZXRUYWc6IGdldFRhZyxcblx0aW5oZXJpdEZyb206IGluaGVyaXRGcm9tLFxuXHRtb3ZlQ2hpbGRUYWc6IG1vdmVDaGlsZFRhZyxcblx0aW5pdENoaWxkVGFnOiBpbml0Q2hpbGRUYWcsXG5cdGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZzogZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnLFxuXHR1bm1vdW50QWxsOiB1bm1vdW50QWxsLFxuXHRnZXRUYWdOYW1lOiBnZXRUYWdOYW1lLFxuXHRjbGVhblVwRGF0YTogY2xlYW5VcERhdGEsXG5cdGFycmF5aXNoQWRkOiBhcnJheWlzaEFkZCxcblx0YXJyYXlpc2hSZW1vdmU6IGFycmF5aXNoUmVtb3ZlLFxuXHRtb3VudFRvOiBtb3VudFRvLFxuXHRtYWtlUmVwbGFjZVZpcnR1YWw6IG1ha2VSZXBsYWNlVmlydHVhbCxcblx0bWFrZVZpcnR1YWw6IG1ha2VWaXJ0dWFsLFxuXHRtb3ZlVmlydHVhbDogbW92ZVZpcnR1YWwsXG5cdHNlbGVjdFRhZ3M6IHNlbGVjdFRhZ3Ncbn0pO1xuXG4vKipcbiAqIFJpb3QgcHVibGljIGFwaVxuICovXG52YXIgc2V0dGluZ3MgPSBzZXR0aW5ncyQxO1xudmFyIHV0aWwgPSB7XG4gIHRtcGw6IHRtcGwsXG4gIGJyYWNrZXRzOiBicmFja2V0cyxcbiAgc3R5bGVNYW5hZ2VyOiBzdHlsZU1hbmFnZXIsXG4gIHZkb206IF9fVEFHU19DQUNIRSxcbiAgc3R5bGVOb2RlOiBzdHlsZU1hbmFnZXIuc3R5bGVOb2RlLFxuICAvLyBleHBvcnQgdGhlIHJpb3QgaW50ZXJuYWwgdXRpbHMgYXMgd2VsbFxuICBkb206IGRvbSxcbiAgY2hlY2s6IGNoZWNrLFxuICBtaXNjOiBtaXNjLFxuICB0YWdzOiB0YWdzXG59O1xuXG4vLyBleHBvcnQgdGhlIGNvcmUgcHJvcHMvbWV0aG9kc1xudmFyIFRhZyQkMSA9IFRhZyQyO1xudmFyIHRhZyQkMSA9IHRhZyQxO1xudmFyIHRhZzIkJDEgPSB0YWcyJDE7XG52YXIgbW91bnQkJDEgPSBtb3VudCQxO1xudmFyIG1peGluJCQxID0gbWl4aW4kMTtcbnZhciB1cGRhdGUkJDEgPSB1cGRhdGUkMTtcbnZhciB1bnJlZ2lzdGVyJCQxID0gdW5yZWdpc3RlciQxO1xudmFyIHZlcnNpb24kJDEgPSB2ZXJzaW9uJDE7XG52YXIgb2JzZXJ2YWJsZSA9IG9ic2VydmFibGUkMTtcblxudmFyIHJpb3QkMSA9IGV4dGVuZCh7fSwgY29yZSwge1xuICBvYnNlcnZhYmxlOiBvYnNlcnZhYmxlJDEsXG4gIHNldHRpbmdzOiBzZXR0aW5ncyxcbiAgdXRpbDogdXRpbCxcbn0pO1xuXG5leHBvcnRzLnNldHRpbmdzID0gc2V0dGluZ3M7XG5leHBvcnRzLnV0aWwgPSB1dGlsO1xuZXhwb3J0cy5UYWcgPSBUYWckJDE7XG5leHBvcnRzLnRhZyA9IHRhZyQkMTtcbmV4cG9ydHMudGFnMiA9IHRhZzIkJDE7XG5leHBvcnRzLm1vdW50ID0gbW91bnQkJDE7XG5leHBvcnRzLm1peGluID0gbWl4aW4kJDE7XG5leHBvcnRzLnVwZGF0ZSA9IHVwZGF0ZSQkMTtcbmV4cG9ydHMudW5yZWdpc3RlciA9IHVucmVnaXN0ZXIkJDE7XG5leHBvcnRzLnZlcnNpb24gPSB2ZXJzaW9uJCQxO1xuZXhwb3J0cy5vYnNlcnZhYmxlID0gb2JzZXJ2YWJsZTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHJpb3QkMTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxufSkpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yaW90L3Jpb3QuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzLCByZXF1aXJlKCdyaW90JykpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cycsICdyaW90J10sIGZhY3RvcnkpIDpcblx0KGZhY3RvcnkoKGdsb2JhbC5yaW90SG90UmVsb2FkID0gZ2xvYmFsLnJpb3RIb3RSZWxvYWQgfHwge30pLGdsb2JhbC5yaW90KSk7XG59KHRoaXMsIChmdW5jdGlvbiAoZXhwb3J0cyxyaW90KSB7ICd1c2Ugc3RyaWN0JztcblxudmFyIG5vblN0YXRlID0gJ2lzTW91bnRlZCBvcHRzJy5zcGxpdCgnICcpO1xuXG5mdW5jdGlvbiByZWxvYWQobmFtZSkge1xuICByaW90LnV0aWwuc3R5bGVNYW5hZ2VyLmluamVjdCgpO1xuXG4gIHZhciBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoKG5hbWUgKyBcIiwgW2RhdGEtaXM9XCIgKyBuYW1lICsgXCJdXCIpKTtcbiAgdmFyIHRhZ3MgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGVsID0gZWxlbXNbaV0sIG9sZFRhZyA9IGVsLl90YWcsIHY7XG4gICAgcmVsb2FkLnRyaWdnZXIoJ2JlZm9yZS11bm1vdW50Jywgb2xkVGFnKTtcbiAgICBvbGRUYWcudW5tb3VudCh0cnVlKTsgLy8gZGV0YWNoIHRoZSBvbGQgdGFnXG5cbiAgICAvLyByZXNldCB0aGUgaW5uZXJIVE1MIGFuZCBhdHRyaWJ1dGVzIHRvIGhvdyB0aGV5IHdlcmUgYmVmb3JlIG1vdW50XG4gICAgZWwuaW5uZXJIVE1MID0gb2xkVGFnLl9fLmlubmVySFRNTDtcbiAgICAob2xkVGFnLl9fLmluc3RBdHRycyB8fCBbXSkubWFwKGZ1bmN0aW9uKGF0dHIpIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuICAgIH0pO1xuXG4gICAgLy8gY29weSBvcHRpb25zIGZvciBjcmVhdGluZyB0aGUgbmV3IHRhZ1xuICAgIHZhciBuZXdPcHRzID0ge307XG4gICAgZm9yKGtleSBpbiBvbGRUYWcub3B0cykge1xuICAgICAgbmV3T3B0c1trZXldID0gb2xkVGFnLm9wdHNba2V5XTtcbiAgICB9XG4gICAgbmV3T3B0cy5wYXJlbnQgPSBvbGRUYWcucGFyZW50O1xuXG4gICAgLy8gY3JlYXRlIHRoZSBuZXcgdGFnXG4gICAgcmVsb2FkLnRyaWdnZXIoJ2JlZm9yZS1tb3VudCcsIG5ld09wdHMsIG9sZFRhZyk7XG4gICAgdmFyIG5ld1RhZyA9IHJpb3QubW91bnQoZWwsIG5ld09wdHMpWzBdO1xuXG4gICAgLy8gY29weSBzdGF0ZSBmcm9tIHRoZSBvbGQgdG8gbmV3IHRhZ1xuICAgIGZvcih2YXIga2V5IGluIG9sZFRhZykge1xuICAgICAgdiA9IG9sZFRhZ1trZXldO1xuICAgICAgaWYgKH5ub25TdGF0ZS5pbmRleE9mKGtleSkpIHsgY29udGludWUgfVxuICAgICAgbmV3VGFnW2tleV0gPSB2O1xuICAgIH1cbiAgICBuZXdUYWcudXBkYXRlKCk7XG4gICAgdGFncy5wdXNoKG5ld1RhZyk7XG4gICAgcmVsb2FkLnRyaWdnZXIoJ2FmdGVyLW1vdW50JywgbmV3VGFnLCBvbGRUYWcpO1xuICB9XG5cbiAgcmV0dXJuIHRhZ3Ncbn1cblxucmlvdC5vYnNlcnZhYmxlKHJlbG9hZCk7XG5yaW90LnJlbG9hZCA9IHJlbG9hZDtcbmlmIChyaW90LmRlZmF1bHQpIHsgcmlvdC5kZWZhdWx0LnJlbG9hZCA9IHJlbG9hZDsgfVxuXG5leHBvcnRzLnJlbG9hZCA9IHJlbG9hZDtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHJlbG9hZDtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxufSkpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yaW90LWhvdC1yZWxvYWQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4gICAgdmFyIHJpb3QgPSByZXF1aXJlKCdyaW90JylcbiAgICAvL3NyYzogQzovZGV2L2pzL3Jpb3Rqcy93ZWJwYWNrL2FwcC9yYW5kb20udGFnXG5yaW90LnRhZzIoJ3JhbmRvbScsXG4gICc8aDM+e29wdHMudGl0bGV9PC9oMz4gPGJ1dHRvbiBvbmNsaWNrPVwie2dlbmVyYXRlfVwiPiBHZW5lcmF0ZSA8L2J1dHRvbj4gPGgxPiB7bnVtYmVyfSA8L2gxPiA8aW1nIHNyYz1cInN2Zy1sb2dvLWguc3ZnXCIgaGVpZ2h0PVwiMzBcIj4gPGxvZ3MgbG9ncz1cIntsb2dzfVwiIG9uY2xlYXI9XCJ7Y2xlYXJMb2dzfVwiPjwvbG9ncz4nLFxuICAnJyxcbiAgJycsIGZ1bmN0aW9uKG9wdHMpIHtcbid1c2Ugc3RyaWN0JztcblxudmFyIF90aGlzID0gdGhpcztcblxucmVxdWlyZSgnLi9sb2dzLnRhZycpO1xuXG50aGlzLm51bWJlciA9IG51bGw7XG50aGlzLmxvZ3MgPSBbXTtcblxudGhpcy5nZW5lcmF0ZSA9IGZ1bmN0aW9uIChlKSB7XG4gIF90aGlzLmxvZ3MucHVzaCh7IHRleHQ6ICdHZW5lcmF0ZSBidXR0b24gY2xpY2tlZC4gRXZlbiB0eXBlIGlzICcgKyBlLnR5cGUgfSk7XG4gIF90aGlzLm51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwKTtcbn07XG5cbnRoaXMuY2xlYXJMb2dzID0gZnVuY3Rpb24gKGUpIHtcbiAgX3RoaXMubG9ncyA9IFtdO1xufTtcblxudGhpcy5nZW5lcmF0ZSh7IHR5cGU6ICdjdXN0b20nIH0pO1xufSk7XG5cbiAgICBcbiAgaWYgKG1vZHVsZS5ob3QpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICAgcmlvdC5yZWxvYWQoJ3JhbmRvbScpXG4gICAgfVxuICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL3JhbmRvbS50YWdcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHJpb3QgZnJvbSAncmlvdCdcclxuaW1wb3J0ICdyaW90LWhvdC1yZWxvYWQnXHJcbmltcG9ydCAnLi9yYW5kb20udGFnJ1xyXG5cclxucmlvdC5tb3VudCgncmFuZG9tJywge1xyXG4gIHRpdGxlOiAnSGkgdGhlcmUhJ1xyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9tYWluLmpzIiwiXG4gICAgdmFyIHJpb3QgPSByZXF1aXJlKCdyaW90JylcbiAgICAvL3NyYzogQzovZGV2L2pzL3Jpb3Rqcy93ZWJwYWNrL2FwcC9sb2dzLnRhZ1xucmlvdC50YWcyKCdsb2dzJyxcbiAgJzxoND5Mb2dzPC9oND4gPGJ1dHRvbiBvbmNsaWNrPVwie29wdHMub25jbGVhcn1cIj4gQ2xlYXIgbG9ncyA8L2J1dHRvbj4gPHVsPiA8bGkgZWFjaD1cIntvcHRzLmxvZ3N9XCI+e3RleHR9PC9saT4gPC91bD4nLFxuICAnJyxcbiAgJycsIGZ1bmN0aW9uKG9wdHMpIHtcbn0pO1xuXG4gICAgXG4gIGlmIChtb2R1bGUuaG90KSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgIHJpb3QucmVsb2FkKCdsb2dzJylcbiAgICB9XG4gIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvbG9ncy50YWdcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==