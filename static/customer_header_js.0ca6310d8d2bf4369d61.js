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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/components/headers/customer.js":
/*!*****************************************************!*\
  !*** ./resources/js/components/headers/customer.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/resources/js/components/headers/customer.js: Invalid left-hand side in assignment expression (75:2)\\n\\n\\u001b[0m \\u001b[90m 73 | \\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 74 | \\u001b[39m\\t\\t\\u001b[36mthis\\u001b[39m\\u001b[33m.\\u001b[39mcomponents[\\u001b[32m\\\"headerMenuButton\\\"\\u001b[39m] \\u001b[33m=\\u001b[39m headerMenuButton\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 75 | \\u001b[39m\\t\\t\\u001b[36mthis\\u001b[39m\\u001b[33m.\\u001b[39mcomponents(\\u001b[32m\\\"headerDropDownMenu\\\"\\u001b[39m) \\u001b[33m=\\u001b[39m headerDropDownMenu\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m    | \\u001b[39m\\t\\t\\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 76 | \\u001b[39m\\t}\\u001b[0m\\n\\u001b[0m \\u001b[90m 77 | \\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 78 | \\u001b[39m\\u001b[0m\\n    at Parser.raise (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:3939:15)\\n    at Parser.toAssignable (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:5411:18)\\n    at Parser.parseMaybeAssign (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:5752:49)\\n    at Parser.parseExpression (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:5684:21)\\n    at Parser.parseStatementContent (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:7259:21)\\n    at Parser.parseStatement (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:7145:17)\\n    at Parser.parseBlockOrModuleBlockBody (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:7696:23)\\n    at Parser.parseBlockBody (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:7683:10)\\n    at Parser.parseBlock (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:7672:10)\\n    at Parser.parseFunctionBody (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:6925:24)\\n    at Parser.parseFunctionBodyAndFinish (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:6905:10)\\n    at Parser.parseMethod (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:6857:10)\\n    at Parser.pushClassMethod (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:8076:30)\\n    at Parser.parseClassMemberWithIsStatic (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:7995:12)\\n    at Parser.parseClassMember (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:7937:10)\\n    at Parser.parseClassBody (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:7892:12)\\n    at Parser.parseClass (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:7842:10)\\n    at Parser.parseStatementContent (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:7173:21)\\n    at Parser.parseStatement (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:7145:17)\\n    at Parser.parseBlockOrModuleBlockBody (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:7696:23)\\n    at Parser.parseBlockBody (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:7683:10)\\n    at Parser.parseTopLevel (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:7110:10)\\n    at Parser.parse (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:8510:17)\\n    at parse (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/parser/lib/index.js:10465:38)\\n    at parser (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/core/lib/transformation/normalize-file.js:170:34)\\n    at normalizeFile (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/core/lib/transformation/normalize-file.js:138:11)\\n    at runSync (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/core/lib/transformation/index.js:44:43)\\n    at runAsync (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/core/lib/transformation/index.js:35:14)\\n    at process.nextTick (/home/bettblake08/Desktop/Development/Projects/Fast-Food-Fast/node_modules/@babel/core/lib/transform.js:34:34)\\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9oZWFkZXJzL2N1c3RvbWVyLmpzLmpzIiwic291cmNlcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./resources/js/components/headers/customer.js\n");

/***/ }),

/***/ 10:
/*!***********************************************************!*\
  !*** multi ./resources/js/components/headers/customer.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./resources/js/components/headers/customer.js */"./resources/js/components/headers/customer.js");


/***/ })

/******/ });