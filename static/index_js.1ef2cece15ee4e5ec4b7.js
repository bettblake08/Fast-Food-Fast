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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/images/logo.png":
/*!***********************************!*\
  !*** ./resources/images/logo.png ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"3e2d929931fcf869c79d01a08df4eddd.png\";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZXNvdXJjZXMvaW1hZ2VzL2xvZ28ucG5nLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2ltYWdlcy9sb2dvLnBuZz8xYjBiIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjNlMmQ5Mjk5MzFmY2Y4NjljNzlkMDFhMDhkZjRlZGRkLnBuZ1wiOyJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./resources/images/logo.png\n");

/***/ }),

/***/ "./resources/images/logo2.png":
/*!************************************!*\
  !*** ./resources/images/logo2.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"4d13aad5b435a3e7bd5832e9199db4a5.png\";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZXNvdXJjZXMvaW1hZ2VzL2xvZ28yLnBuZy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3Jlc291cmNlcy9pbWFnZXMvbG9nbzIucG5nPzgyMTgiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiNGQxM2FhZDViNDM1YTNlN2JkNTgzMmU5MTk5ZGI0YTUucG5nXCI7Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./resources/images/logo2.png\n");

/***/ }),

/***/ "./resources/js/components/headers/main.js":
/*!*************************************************!*\
  !*** ./resources/js/components/headers/main.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _images_logo2_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../images/logo2.png */ \"./resources/images/logo2.png\");\n/* harmony import */ var _images_logo2_png__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_images_logo2_png__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _images_logo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../images/logo.png */ \"./resources/images/logo.png\");\n/* harmony import */ var _images_logo_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_images_logo_png__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nclass MainHeader {\n  constructor(params) {\n    /* \n          This is the MainHeader model constructor\n           :args\n              type    :   The header types\n          */\n    this._state = {\n      headerType: params.type == undefined ? \"black\" : params.type\n    };\n    this._components = {};\n  }\n\n  get state() {\n    return this._state;\n  }\n\n  set state(value) {\n    this._state = value;\n  }\n\n  get component() {\n    return this._component;\n  }\n\n  set component(value) {\n    this._component = value;\n  }\n\n  init() {\n    let headerLogo = document.querySelector(\".header__logo\"),\n        logoImg = new Image();\n    logoImg.alt = \"FastFoodFast Logo\";\n\n    switch (this.state.headerType) {\n      case \"black\":\n        {\n          logoImg.src = _images_logo_png__WEBPACK_IMPORTED_MODULE_1___default.a;\n          break;\n        }\n\n      case \"white\":\n        {\n          logoImg.src = _images_logo2_png__WEBPACK_IMPORTED_MODULE_0___default.a;\n          break;\n        }\n    }\n\n    headerLogo.appendChild(logoImg);\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MainHeader);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9oZWFkZXJzL21haW4uanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9oZWFkZXJzL21haW4uanM/NDEzNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbG9nb1doaXRlIGZyb20gXCIuLi8uLi8uLi9pbWFnZXMvbG9nbzIucG5nXCI7XG5pbXBvcnQgbG9nb0JsYWNrIGZyb20gXCIuLi8uLi8uLi9pbWFnZXMvbG9nby5wbmdcIjtcblxuY2xhc3MgTWFpbkhlYWRlcntcblx0Y29uc3RydWN0b3IocGFyYW1zKSB7XG5cdFx0LyogXG4gICAgICAgIFRoaXMgaXMgdGhlIE1haW5IZWFkZXIgbW9kZWwgY29uc3RydWN0b3JcblxuICAgICAgICA6YXJnc1xuICAgICAgICAgICAgdHlwZSAgICA6ICAgVGhlIGhlYWRlciB0eXBlc1xuICAgICAgICAqL1xuXHRcdHRoaXMuX3N0YXRlID0ge1xuXHRcdFx0aGVhZGVyVHlwZTogcGFyYW1zLnR5cGUgPT0gdW5kZWZpbmVkID8gXCJibGFja1wiIDogcGFyYW1zLnR5cGVcblx0XHR9O1xuXG5cdFx0dGhpcy5fY29tcG9uZW50cyA9IHt9O1xuXHR9XG5cblx0Z2V0IHN0YXRlKCkge1xuXHRcdHJldHVybiB0aGlzLl9zdGF0ZTtcblx0fVxuXG5cdHNldCBzdGF0ZSh2YWx1ZSkge1xuXHRcdHRoaXMuX3N0YXRlID0gdmFsdWU7XG5cdH1cblxuXHRnZXQgY29tcG9uZW50KCkge1xuXHRcdHJldHVybiB0aGlzLl9jb21wb25lbnQ7XG5cdH1cblxuXHRzZXQgY29tcG9uZW50KHZhbHVlKSB7XG5cdFx0dGhpcy5fY29tcG9uZW50ID0gdmFsdWU7XG5cdH1cblxuXHRpbml0KCl7XG5cdFx0bGV0IGhlYWRlckxvZ28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlcl9fbG9nb1wiKSxcblx0XHRcdGxvZ29JbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIFxuXHRcdGxvZ29JbWcuYWx0ID0gXCJGYXN0Rm9vZEZhc3QgTG9nb1wiO1xuXG5cdFx0c3dpdGNoICh0aGlzLnN0YXRlLmhlYWRlclR5cGUpe1xuXHRcdGNhc2UgXCJibGFja1wiOntcblx0XHRcdGxvZ29JbWcuc3JjID0gbG9nb0JsYWNrO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJ3aGl0ZVwiOntcblx0XHRcdGxvZ29JbWcuc3JjID0gbG9nb1doaXRlO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdH1cblxuXHRcdGhlYWRlckxvZ28uYXBwZW5kQ2hpbGQobG9nb0ltZyk7ICAgICAgICBcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNYWluSGVhZGVyOyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFNQTtBQUNBO0FBREE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQUNBO0FBVUE7QUFDQTtBQUNBO0FBbERBO0FBQ0E7QUFtREEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./resources/js/components/headers/main.js\n");

/***/ }),

/***/ "./resources/js/pages/index.js":
/*!*************************************!*\
  !*** ./resources/js/pages/index.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_headers_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/headers/main */ \"./resources/js/components/headers/main.js\");\n\nlet mainHeader = new _components_headers_main__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  type: \"white\"\n});\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  mainHeader.init();\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZXNvdXJjZXMvanMvcGFnZXMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvcGFnZXMvaW5kZXguanM/MjhkMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFpbkhlYWRlciBmcm9tIFwiLi4vY29tcG9uZW50cy9oZWFkZXJzL21haW5cIjtcblxubGV0IG1haW5IZWFkZXIgPSBuZXcgTWFpbkhlYWRlcih7XG5cdHR5cGU6XCJ3aGl0ZVwiXG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXHRtYWluSGVhZGVyLmluaXQoKTtcbn0pOyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQURBO0FBSUE7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./resources/js/pages/index.js\n");

/***/ }),

/***/ 9:
/*!*******************************************!*\
  !*** multi ./resources/js/pages/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./resources/js/pages/index.js */"./resources/js/pages/index.js");


/***/ })

/******/ });