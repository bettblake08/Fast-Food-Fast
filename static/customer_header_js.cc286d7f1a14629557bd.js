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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/images/icons/menu.png":
/*!*****************************************!*\
  !*** ./resources/images/icons/menu.png ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"b889e74d914d77a04de009eac356924d.png\";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZXNvdXJjZXMvaW1hZ2VzL2ljb25zL21lbnUucG5nLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2ltYWdlcy9pY29ucy9tZW51LnBuZz8wM2Q4Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImI4ODllNzRkOTE0ZDc3YTA0ZGUwMDllYWMzNTY5MjRkLnBuZ1wiOyJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./resources/images/icons/menu.png\n");

/***/ }),

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

/***/ "./resources/js/abstract/mixins.js":
/*!*****************************************!*\
  !*** ./resources/js/abstract/mixins.js ***!
  \*****************************************/
/*! exports provided: refreshToken, getAccessToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"refreshToken\", function() { return refreshToken; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAccessToken\", function() { return getAccessToken; });\n/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./variables */ \"./resources/js/abstract/variables.js\");\n\n\nfunction refreshToken(actions) {\n  let tokens = JSON.parse(localStorage.getItem(\"tokens\"));\n  fetch(`${_variables__WEBPACK_IMPORTED_MODULE_0__[\"apiV1\"]}/token/refresh`, {\n    method: \"GET\",\n    headers: {\n      \"Authorization\": `Bearer ${tokens.refresh_token}`\n    }\n  }).then(response => {\n    if (response.status == 201) {\n      return response.json();\n    }\n\n    actions.onFailure();\n  }).then(response => {\n    if (response != undefined) {\n      tokens.access_token = response.access_token;\n      localStorage.setItem(\"tokens\", JSON.stringify(tokens));\n      actions.onSuccess();\n    }\n  });\n}\n\nfunction getAccessToken() {\n  let tokens = JSON.parse(localStorage.getItem(\"tokens\"));\n  return tokens == null ? \"\" : tokens.access_token;\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZXNvdXJjZXMvanMvYWJzdHJhY3QvbWl4aW5zLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2Fic3RyYWN0L21peGlucy5qcz85ZTY4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBpVjF9IGZyb20gXCIuL3ZhcmlhYmxlc1wiO1xuXG5mdW5jdGlvbiByZWZyZXNoVG9rZW4oYWN0aW9ucyl7XG5cdGxldCB0b2tlbnMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5zXCIpKTtcblxuXHRmZXRjaChgJHthcGlWMX0vdG9rZW4vcmVmcmVzaGAse1xuICAgICAgICBtZXRob2Q6XCJHRVRcIixcblx0XHRoZWFkZXJzOntcblx0XHRcdFwiQXV0aG9yaXphdGlvblwiOmBCZWFyZXIgJHt0b2tlbnMucmVmcmVzaF90b2tlbn1gXG5cdFx0fSAgXG5cdH0pLnRoZW4oKHJlc3BvbnNlKT0+e1xuXHRcdGlmKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDEpe1xuXHRcdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYWN0aW9ucy5vbkZhaWx1cmUoKTtcblx0fSkudGhlbigocmVzcG9uc2UpPT57XG5cdFx0aWYocmVzcG9uc2UgIT0gdW5kZWZpbmVkKXtcblx0XHRcdHRva2Vucy5hY2Nlc3NfdG9rZW4gPSByZXNwb25zZS5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRva2Vuc1wiLCBKU09OLnN0cmluZ2lmeSh0b2tlbnMpKTtcbiAgICAgICAgICAgIGFjdGlvbnMub25TdWNjZXNzKCk7XG5cdFx0fVxuXHR9KTtcbn1cblxuZnVuY3Rpb24gZ2V0QWNjZXNzVG9rZW4oKXtcblx0bGV0IHRva2VucyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlbnNcIikpO1xuICAgIHJldHVybiB0b2tlbnMgPT0gbnVsbCA/IFwiXCIgOiB0b2tlbnMuYWNjZXNzX3Rva2VuO1xufVxuXG5leHBvcnQge1xuICAgIHJlZnJlc2hUb2tlbixcbiAgICBnZXRBY2Nlc3NUb2tlblxufTsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./resources/js/abstract/mixins.js\n");

/***/ }),

/***/ "./resources/js/abstract/variables.js":
/*!********************************************!*\
  !*** ./resources/js/abstract/variables.js ***!
  \********************************************/
/*! exports provided: webUrl, apiV1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"webUrl\", function() { return webUrl; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"apiV1\", function() { return apiV1; });\n//const webUrl = \"http://localhost:5000\";\nconst webUrl = \"https://fast-food-fast-bb.herokuapp.com\";\nconst apiV1 = `${webUrl}/api/v1`;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZXNvdXJjZXMvanMvYWJzdHJhY3QvdmFyaWFibGVzLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2Fic3RyYWN0L3ZhcmlhYmxlcy5qcz8xM2Y0Il0sInNvdXJjZXNDb250ZW50IjpbIi8vY29uc3Qgd2ViVXJsID0gXCJodHRwOi8vbG9jYWxob3N0OjUwMDBcIjtcbmNvbnN0IHdlYlVybCA9IFwiaHR0cHM6Ly9mYXN0LWZvb2QtZmFzdC1iYi5oZXJva3VhcHAuY29tXCI7XG5jb25zdCBhcGlWMSA9IGAke3dlYlVybH0vYXBpL3YxYDtcblxuZXhwb3J0IHtcblx0d2ViVXJsLFxuXHRhcGlWMVxufTsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./resources/js/abstract/variables.js\n");

/***/ }),

/***/ "./resources/js/components/headers/customer.js":
/*!*****************************************************!*\
  !*** ./resources/js/components/headers/customer.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _images_logo_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../images/logo.png */ \"./resources/images/logo.png\");\n/* harmony import */ var _images_logo_png__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_images_logo_png__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _images_logo2_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../images/logo2.png */ \"./resources/images/logo2.png\");\n/* harmony import */ var _images_logo2_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_images_logo2_png__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ui/button */ \"./resources/js/ui/button.js\");\n/* harmony import */ var _abstract_mixins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../abstract/mixins */ \"./resources/js/abstract/mixins.js\");\n/* harmony import */ var _abstract_variables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../abstract/variables */ \"./resources/js/abstract/variables.js\");\n/* harmony import */ var _images_icons_menu_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../images/icons/menu.png */ \"./resources/images/icons/menu.png\");\n/* harmony import */ var _images_icons_menu_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_images_icons_menu_png__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\n\nclass CustomerHeader {\n  constructor(params = {}) {\n    /* \n          This is the MainHeader model constructor\n           :args\n    \ttype    :   The header types. [\"black\",\"white\"]\n          */\n    this._state = {\n      headerType: params.type == undefined ? \"black\" : params.type,\n      buttons: [],\n      toggleMenu: false\n    };\n    this._components = {};\n  }\n\n  get state() {\n    return this._state;\n  }\n\n  set state(value) {\n    this._state = value;\n  }\n\n  get components() {\n    return this._components;\n  }\n\n  set components(value) {\n    this._components = value;\n  }\n\n  init() {\n    let header = this,\n        logOutButton = document.querySelector(\".header__logout\"),\n        headerMenuButton = document.querySelector(\".header__menuButton\"),\n        headerDropDownMenu = document.querySelector(\".header__dropDownMenu--disabled\");\n    let logout = new _ui_button__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n      class: \"btn_1\",\n      textClass: \"f_button_1\",\n      label: \"Log Out\",\n      parent: header,\n      status: 0,\n      action: () => {\n        header.logOut();\n      }\n    });\n    logout.init();\n    logOutButton.appendChild(logout.getButton());\n    let menuButtonImg = new Image();\n    menuButtonImg.src = _images_icons_menu_png__WEBPACK_IMPORTED_MODULE_5___default.a;\n    menuButtonImg.alt = \"Dropdown menu button\";\n    headerMenuButton.appendChild(menuButtonImg);\n    headerMenuButton.addEventListener(\"click\", () => {\n      header.toggleDropDownMenu();\n    });\n    this.changeHeaderType(this.state.headerType);\n    this.components[\"headerMenuButton\"] = headerMenuButton;\n    this.components[\"headerDropDownMenu\"] = headerDropDownMenu;\n  }\n\n  changeHeaderType() {\n    let headerLogo = document.querySelector(\".header__logo\"),\n        logoImg = new Image();\n    logoImg.alt = \"FastFoodFast Logo\";\n\n    switch (this.state.headerType) {\n      case \"black\":\n        {\n          logoImg.src = _images_logo_png__WEBPACK_IMPORTED_MODULE_0___default.a;\n          break;\n        }\n\n      case \"white\":\n        {\n          logoImg.src = _images_logo2_png__WEBPACK_IMPORTED_MODULE_1___default.a;\n          break;\n        }\n    }\n\n    headerLogo.appendChild(logoImg);\n  }\n\n  toggleDropDownMenu() {\n    this.state.toggleMenu = this.state.toggleMenu ? false : true;\n\n    if (this.state.toggleMenu) {\n      let headerDropDownMenuLogOut = document.querySelector(\".header__dropDownMenu__logOut\");\n      headerDropDownMenuLogOut.appendChild(this.state.buttons[0].getButton());\n      this.components.headerDropDownMenu.classList.replace(\"header__dropDownMenu--disabled\", \"header__dropDownMenu--active\");\n    } else {\n      let headerLogOut = document.querySelector(\".header__logOut\");\n      headerLogOut.appendChild(this.state.buttons[0].getButton());\n      this.components.headerDropDownMenu.classList.replace(\"header__dropDownMenu--active\", \"header__dropDownMenu--disabled\");\n    }\n  }\n\n  logOut() {\n    let header = this;\n    fetch(`${_abstract_variables__WEBPACK_IMPORTED_MODULE_4__[\"apiV1\"]}/auth/logout`, {\n      headers: {\n        \"Authorization\": `Bearer ${Object(_abstract_mixins__WEBPACK_IMPORTED_MODULE_3__[\"getAccessToken\"])()}`\n      }\n    }).then(response => {\n      switch (response.status) {\n        case 200:\n          {\n            localStorage.setItem(\"tokens\", JSON.stringify({}));\n            window.location.href = _abstract_variables__WEBPACK_IMPORTED_MODULE_4__[\"webUrl\"] + \"/\";\n            break;\n          }\n\n        case 401:\n          {\n            Object(_abstract_mixins__WEBPACK_IMPORTED_MODULE_3__[\"refreshToken\"])({\n              onSuccess: () => {\n                header.logOut();\n              },\n              onFailure: () => {\n                window.location.href = _abstract_variables__WEBPACK_IMPORTED_MODULE_4__[\"webUrl\"] + \"/customer/login\";\n              }\n            });\n            break;\n          }\n\n        case 422:\n          {\n            window.location.href = _abstract_variables__WEBPACK_IMPORTED_MODULE_4__[\"webUrl\"] + \"/customer/login\";\n            break;\n          }\n      }\n    });\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (CustomerHeader);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9oZWFkZXJzL2N1c3RvbWVyLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvaGVhZGVycy9jdXN0b21lci5qcz81YTIwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2dvQmxhY2sgZnJvbSBcIi4uLy4uLy4uL2ltYWdlcy9sb2dvLnBuZ1wiO1xuaW1wb3J0IGxvZ29XaGl0ZSBmcm9tIFwiLi4vLi4vLi4vaW1hZ2VzL2xvZ28yLnBuZ1wiO1xuaW1wb3J0IEJ1dHRvbiBmcm9tIFwiLi4vLi4vdWkvYnV0dG9uXCI7XG5pbXBvcnQge3JlZnJlc2hUb2tlbiwgZ2V0QWNjZXNzVG9rZW59IGZyb20gXCIuLi8uLi9hYnN0cmFjdC9taXhpbnNcIjtcbmltcG9ydCB7YXBpVjEsIHdlYlVybH0gZnJvbSBcIi4uLy4uL2Fic3RyYWN0L3ZhcmlhYmxlc1wiO1xuaW1wb3J0IG1lbnVJY29uIGZyb20gXCIuLi8uLi8uLi9pbWFnZXMvaWNvbnMvbWVudS5wbmdcIjtcblxuY2xhc3MgQ3VzdG9tZXJIZWFkZXJ7XG5cdGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG5cdFx0LyogXG4gICAgICAgIFRoaXMgaXMgdGhlIE1haW5IZWFkZXIgbW9kZWwgY29uc3RydWN0b3JcblxuICAgICAgICA6YXJnc1xuXHRcdFx0dHlwZSAgICA6ICAgVGhlIGhlYWRlciB0eXBlcy4gW1wiYmxhY2tcIixcIndoaXRlXCJdXG4gICAgICAgICovXG5cblx0XHR0aGlzLl9zdGF0ZSA9IHtcblx0XHRcdGhlYWRlclR5cGU6IHBhcmFtcy50eXBlID09IHVuZGVmaW5lZCA/IFwiYmxhY2tcIiA6IHBhcmFtcy50eXBlLFxuXHRcdFx0YnV0dG9uczpbXSxcblx0XHRcdHRvZ2dsZU1lbnU6ZmFsc2Vcblx0XHR9O1xuXG5cdFx0dGhpcy5fY29tcG9uZW50cyA9IHt9O1xuXHR9XG5cblx0Z2V0IHN0YXRlKCkge1xuXHRcdHJldHVybiB0aGlzLl9zdGF0ZTtcblx0fVxuXG5cdHNldCBzdGF0ZSh2YWx1ZSkge1xuXHRcdHRoaXMuX3N0YXRlID0gdmFsdWU7XG5cdH1cblxuXHRnZXQgY29tcG9uZW50cygpIHtcblx0XHRyZXR1cm4gdGhpcy5fY29tcG9uZW50cztcblx0fVxuXG5cdHNldCBjb21wb25lbnRzKHZhbHVlKSB7XG5cdFx0dGhpcy5fY29tcG9uZW50cyA9IHZhbHVlO1xuXHR9XG5cblx0aW5pdCgpe1xuXHRcdGxldCBoZWFkZXIgPSB0aGlzLFxuXHRcdFx0bG9nT3V0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJfX2xvZ291dFwiKSxcblx0XHRcdGhlYWRlck1lbnVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlcl9fbWVudUJ1dHRvblwiKSxcblx0XHRcdGhlYWRlckRyb3BEb3duTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyX19kcm9wRG93bk1lbnUtLWRpc2FibGVkXCIpO1xuXHRcdFxuXHRcdGxldCBsb2dvdXQgPSBuZXcgQnV0dG9uKHtcblx0XHRcdGNsYXNzOiBcImJ0bl8xXCIsXG5cdFx0XHR0ZXh0Q2xhc3M6IFwiZl9idXR0b25fMVwiLFxuXHRcdFx0bGFiZWw6IFwiTG9nIE91dFwiLFxuXHRcdFx0cGFyZW50OiBoZWFkZXIsXG5cdFx0XHRzdGF0dXM6IDAsXG5cdFx0XHRhY3Rpb246ICgpID0+IHtcblx0XHRcdFx0aGVhZGVyLmxvZ091dCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0bG9nb3V0LmluaXQoKTtcblx0XHRsb2dPdXRCdXR0b24uYXBwZW5kQ2hpbGQobG9nb3V0LmdldEJ1dHRvbigpKTtcblxuXHRcdGxldCBtZW51QnV0dG9uSW1nID0gbmV3IEltYWdlKCk7XG5cdFx0bWVudUJ1dHRvbkltZy5zcmMgPSBtZW51SWNvbjtcblx0XHRtZW51QnV0dG9uSW1nLmFsdCA9IFwiRHJvcGRvd24gbWVudSBidXR0b25cIjtcblxuXHRcdGhlYWRlck1lbnVCdXR0b24uYXBwZW5kQ2hpbGQobWVudUJ1dHRvbkltZyk7XG5cblx0XHRoZWFkZXJNZW51QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCgpID0+IHtcblx0XHRcdGhlYWRlci50b2dnbGVEcm9wRG93bk1lbnUoKTtcblx0XHR9KTtcblxuXHRcdHRoaXMuY2hhbmdlSGVhZGVyVHlwZSh0aGlzLnN0YXRlLmhlYWRlclR5cGUpO1xuXG5cdFx0dGhpcy5jb21wb25lbnRzW1wiaGVhZGVyTWVudUJ1dHRvblwiXSA9IGhlYWRlck1lbnVCdXR0b247XG5cdFx0dGhpcy5jb21wb25lbnRzW1wiaGVhZGVyRHJvcERvd25NZW51XCJdID0gaGVhZGVyRHJvcERvd25NZW51O1xuXHR9XG5cblxuXHRjaGFuZ2VIZWFkZXJUeXBlKCkge1xuXHRcdGxldCBoZWFkZXJMb2dvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJfX2xvZ29cIiksXG5cdFx0XHRsb2dvSW1nID0gbmV3IEltYWdlKCk7XG5cblx0XHRsb2dvSW1nLmFsdCA9IFwiRmFzdEZvb2RGYXN0IExvZ29cIjtcblxuXHRcdHN3aXRjaCAodGhpcy5zdGF0ZS5oZWFkZXJUeXBlKSB7XG5cdFx0Y2FzZSBcImJsYWNrXCI6XG5cdFx0e1xuXHRcdFx0bG9nb0ltZy5zcmMgPSBsb2dvQmxhY2s7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIndoaXRlXCI6XG5cdFx0e1xuXHRcdFx0bG9nb0ltZy5zcmMgPSBsb2dvV2hpdGU7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0fVxuXG5cdFx0aGVhZGVyTG9nby5hcHBlbmRDaGlsZChsb2dvSW1nKTtcblx0fVxuXG5cdHRvZ2dsZURyb3BEb3duTWVudSgpe1xuXHRcdHRoaXMuc3RhdGUudG9nZ2xlTWVudSA9IHRoaXMuc3RhdGUudG9nZ2xlTWVudSA/IGZhbHNlIDogdHJ1ZTtcblx0XHRcblxuXHRcdGlmKHRoaXMuc3RhdGUudG9nZ2xlTWVudSl7XG5cdFx0XHRsZXQgaGVhZGVyRHJvcERvd25NZW51TG9nT3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJfX2Ryb3BEb3duTWVudV9fbG9nT3V0XCIpO1xuXHRcdFx0aGVhZGVyRHJvcERvd25NZW51TG9nT3V0LmFwcGVuZENoaWxkKHRoaXMuc3RhdGUuYnV0dG9uc1swXS5nZXRCdXR0b24oKSk7XG5cblx0XHRcdHRoaXMuY29tcG9uZW50cy5oZWFkZXJEcm9wRG93bk1lbnUuY2xhc3NMaXN0LnJlcGxhY2UoXG5cdFx0XHRcdFwiaGVhZGVyX19kcm9wRG93bk1lbnUtLWRpc2FibGVkXCIsXG5cdFx0XHRcdFwiaGVhZGVyX19kcm9wRG93bk1lbnUtLWFjdGl2ZVwiXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGxldCBoZWFkZXJMb2dPdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlcl9fbG9nT3V0XCIpO1xuXHRcdFx0aGVhZGVyTG9nT3V0LmFwcGVuZENoaWxkKHRoaXMuc3RhdGUuYnV0dG9uc1swXS5nZXRCdXR0b24oKSk7XG5cblx0XHRcdHRoaXMuY29tcG9uZW50cy5oZWFkZXJEcm9wRG93bk1lbnUuY2xhc3NMaXN0LnJlcGxhY2UoXG5cdFx0XHRcdFwiaGVhZGVyX19kcm9wRG93bk1lbnUtLWFjdGl2ZVwiLFxuXHRcdFx0XHRcImhlYWRlcl9fZHJvcERvd25NZW51LS1kaXNhYmxlZFwiXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXG5cdGxvZ091dCgpe1xuXHRcdGxldCBoZWFkZXIgPSB0aGlzO1xuXG5cdFx0ZmV0Y2goYCR7YXBpVjF9L2F1dGgvbG9nb3V0YCwge1xuXHRcdFx0aGVhZGVyczp7XG5cdFx0XHRcdFwiQXV0aG9yaXphdGlvblwiOmBCZWFyZXIgJHtnZXRBY2Nlc3NUb2tlbigpfWBcblx0XHRcdH1cblx0XHR9KS50aGVuKChyZXNwb25zZSk9PntcblxuXHRcdFx0c3dpdGNoKHJlc3BvbnNlLnN0YXR1cyl7XG5cdFx0XHRjYXNlIDIwMDp7XG5cdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9rZW5zXCIsSlNPTi5zdHJpbmdpZnkoe30pKTtcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSB3ZWJVcmwgKyBcIi9cIjtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIDQwMTp7XG5cdFx0XHRcdHJlZnJlc2hUb2tlbih7XG5cdFx0XHRcdFx0b25TdWNjZXNzOiAoKSA9PiB7XG5cdFx0XHRcdFx0XHRoZWFkZXIubG9nT3V0KCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRvbkZhaWx1cmU6ICgpID0+IHtcblx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2ViVXJsICsgXCIvY3VzdG9tZXIvbG9naW5cIjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgNDIyOntcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSB3ZWJVcmwgKyBcIi9jdXN0b21lci9sb2dpblwiO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBDdXN0b21lckhlYWRlcjsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBV0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWQTtBQUNBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFJQTtBQUVBO0FBQ0E7QUFFQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQURBO0FBTUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQXBCQTtBQXNCQTtBQUNBO0FBQ0E7QUF0SkE7QUFDQTtBQXVKQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./resources/js/components/headers/customer.js\n");

/***/ }),

/***/ "./resources/js/ui/button.js":
/*!***********************************!*\
  !*** ./resources/js/ui/button.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Button {\n  constructor(params) {\n    /*\n          This is the Button Model class constructor\n           :args\n              class   :   Button main css class\n              textClass   :   Button typography css class\n              action  :   On click function\n              label   :   Button label\n              parent  :   Parent object instance\n              status  :   Main button status\n                          0:  normal\n                          1:  fail - temporary state\n                          2:  success - temporary state\n                          3:  loading\n                          4:  warning\n                          5:  fail \n                          6:  success \n          */\n    this._state = {\n      status: params.status\n    };\n    this._props = params;\n    let main = document.createElement(\"button\");\n    main.setAttribute(\"type\", \"button\");\n    main.classList.add(params.textClass);\n    main.classList.add(this.getButtonClass(params.class, params.status));\n    main.innerHTML = params.label;\n    main.addEventListener(\"click\", params.action);\n    this._component = {\n      main\n    };\n  }\n\n  get state() {\n    return this._state;\n  }\n\n  set state(value) {\n    this._state = value;\n  }\n\n  get component() {\n    return this._component;\n  }\n\n  set component(value) {\n    this._component = value;\n  }\n\n  get props() {\n    return this._props;\n  }\n\n  set props(value) {\n    this._props = value;\n  }\n\n  getButton() {\n    return this.component.main;\n  }\n\n  init() {\n    let parentState = this.props.parent.state;\n    parentState.buttons.push(this);\n    this.props.parent.state = parentState;\n  }\n\n  setStatus(option, STATE_DISPLAY_DELAY = 3000) {\n    let state = this.state,\n        component = this.component,\n        props = this.props,\n        main = this;\n    let oldStatusClass = this.getButtonClass(props.class, state.status);\n    let newStatusClass = this.getButtonClass(props.class, option);\n    component.main.classList.replace(oldStatusClass, newStatusClass);\n\n    if (option == 1 || option == 2) {\n      setTimeout(() => {\n        let newStatusClass = this.getButtonClass(props.class, option);\n        let mainStatusClass = this.getButtonClass(props.class, props.status);\n        component.main.classList.replace(newStatusClass, mainStatusClass);\n        state.status = props.status;\n        main.state = state;\n      }, STATE_DISPLAY_DELAY);\n    } else {\n      state.status = option;\n      main.state = state;\n    }\n  }\n\n  getButtonClass(className, status) {\n    switch (status) {\n      case 0:\n        return `${className}`;\n\n      case 1:\n      case 5:\n        return `${className}--fail`;\n\n      case 2:\n      case 6:\n        return `${className}--success`;\n\n      case 3:\n        return `${className}--loading`;\n\n      case 4:\n        return `${className}--warning`;\n    }\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Button);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZXNvdXJjZXMvanMvdWkvYnV0dG9uLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL3VpL2J1dHRvbi5qcz8yN2NkIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEJ1dHRvbiB7XG5cdGNvbnN0cnVjdG9yKHBhcmFtcykge1xuXHRcdC8qXG4gICAgICAgIFRoaXMgaXMgdGhlIEJ1dHRvbiBNb2RlbCBjbGFzcyBjb25zdHJ1Y3RvclxuXG4gICAgICAgIDphcmdzXG4gICAgICAgICAgICBjbGFzcyAgIDogICBCdXR0b24gbWFpbiBjc3MgY2xhc3NcbiAgICAgICAgICAgIHRleHRDbGFzcyAgIDogICBCdXR0b24gdHlwb2dyYXBoeSBjc3MgY2xhc3NcbiAgICAgICAgICAgIGFjdGlvbiAgOiAgIE9uIGNsaWNrIGZ1bmN0aW9uXG4gICAgICAgICAgICBsYWJlbCAgIDogICBCdXR0b24gbGFiZWxcbiAgICAgICAgICAgIHBhcmVudCAgOiAgIFBhcmVudCBvYmplY3QgaW5zdGFuY2VcbiAgICAgICAgICAgIHN0YXR1cyAgOiAgIE1haW4gYnV0dG9uIHN0YXR1c1xuICAgICAgICAgICAgICAgICAgICAgICAgMDogIG5vcm1hbFxuICAgICAgICAgICAgICAgICAgICAgICAgMTogIGZhaWwgLSB0ZW1wb3Jhcnkgc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIDI6ICBzdWNjZXNzIC0gdGVtcG9yYXJ5IHN0YXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAzOiAgbG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgNDogIHdhcm5pbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIDU6ICBmYWlsIFxuICAgICAgICAgICAgICAgICAgICAgICAgNjogIHN1Y2Nlc3MgXG4gICAgICAgICovXG5cblx0XHR0aGlzLl9zdGF0ZSA9IHtcblx0XHRcdHN0YXR1czogcGFyYW1zLnN0YXR1c1xuXHRcdH07XG5cblx0XHR0aGlzLl9wcm9wcyA9IHBhcmFtcztcblxuXHRcdGxldCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuXHRcdG1haW4uc2V0QXR0cmlidXRlKFwidHlwZVwiLFwiYnV0dG9uXCIpO1xuXHRcdG1haW4uY2xhc3NMaXN0LmFkZChwYXJhbXMudGV4dENsYXNzKTtcblx0XHRtYWluLmNsYXNzTGlzdC5hZGQodGhpcy5nZXRCdXR0b25DbGFzcyhwYXJhbXMuY2xhc3MscGFyYW1zLnN0YXR1cykpO1xuXHRcdG1haW4uaW5uZXJIVE1MID0gcGFyYW1zLmxhYmVsO1xuXHRcdG1haW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIscGFyYW1zLmFjdGlvbik7XG5cblx0XHR0aGlzLl9jb21wb25lbnQgPSB7XG5cdFx0XHRtYWluXG5cdFx0fTtcblx0fVxuICAgIFxuXHRnZXQgc3RhdGUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3N0YXRlO1xuXHR9XG5cblx0c2V0IHN0YXRlKHZhbHVlKSB7XG5cdFx0dGhpcy5fc3RhdGUgPSB2YWx1ZTtcblx0fVxuXG5cdGdldCBjb21wb25lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2NvbXBvbmVudDtcblx0fVxuXG5cdHNldCBjb21wb25lbnQodmFsdWUpIHtcblx0XHR0aGlzLl9jb21wb25lbnQgPSB2YWx1ZTtcblx0fVxuXG5cdGdldCBwcm9wcygpIHtcblx0XHRyZXR1cm4gdGhpcy5fcHJvcHM7XG5cdH1cblxuXHRzZXQgcHJvcHModmFsdWUpIHtcblx0XHR0aGlzLl9wcm9wcyA9IHZhbHVlO1xuXHR9XG5cblx0Z2V0QnV0dG9uKCl7XG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50Lm1haW47XG5cdH1cblxuXHRpbml0KCl7XG5cdFx0bGV0IHBhcmVudFN0YXRlID0gdGhpcy5wcm9wcy5wYXJlbnQuc3RhdGU7XG5cdFx0cGFyZW50U3RhdGUuYnV0dG9ucy5wdXNoKHRoaXMpO1xuXHRcdHRoaXMucHJvcHMucGFyZW50LnN0YXRlID0gcGFyZW50U3RhdGU7XG5cdH1cblxuXHRzZXRTdGF0dXMob3B0aW9uLCBTVEFURV9ESVNQTEFZX0RFTEFZID0gMzAwMCkge1xuXHRcdGxldCBzdGF0ZSA9IHRoaXMuc3RhdGUsXG5cdFx0XHRjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudCxcblx0XHRcdHByb3BzID0gdGhpcy5wcm9wcyxcblx0XHRcdG1haW4gPSB0aGlzO1xuXG5cdFx0bGV0IG9sZFN0YXR1c0NsYXNzID0gdGhpcy5nZXRCdXR0b25DbGFzcyhwcm9wcy5jbGFzcywgc3RhdGUuc3RhdHVzKTtcblx0XHRsZXQgbmV3U3RhdHVzQ2xhc3MgPSB0aGlzLmdldEJ1dHRvbkNsYXNzKHByb3BzLmNsYXNzLCBvcHRpb24pO1xuXG5cdFx0Y29tcG9uZW50Lm1haW4uY2xhc3NMaXN0LnJlcGxhY2Uob2xkU3RhdHVzQ2xhc3MsbmV3U3RhdHVzQ2xhc3MpO1xuICAgICAgICBcblx0XHRpZiAob3B0aW9uID09IDEgfHwgb3B0aW9uID09IDIpIHtcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHRsZXQgbmV3U3RhdHVzQ2xhc3MgPSB0aGlzLmdldEJ1dHRvbkNsYXNzKHByb3BzLmNsYXNzLCBvcHRpb24pO1xuXHRcdFx0XHRsZXQgbWFpblN0YXR1c0NsYXNzID0gdGhpcy5nZXRCdXR0b25DbGFzcyhwcm9wcy5jbGFzcywgcHJvcHMuc3RhdHVzKTtcblxuXHRcdFx0XHRjb21wb25lbnQubWFpbi5jbGFzc0xpc3QucmVwbGFjZShuZXdTdGF0dXNDbGFzcywgbWFpblN0YXR1c0NsYXNzKTtcblxuXHRcdFx0XHRzdGF0ZS5zdGF0dXMgPSBwcm9wcy5zdGF0dXM7XG5cdFx0XHRcdG1haW4uc3RhdGUgPSBzdGF0ZTtcblx0XHRcdH0sIFNUQVRFX0RJU1BMQVlfREVMQVkpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHN0YXRlLnN0YXR1cyA9IG9wdGlvbjtcblx0XHRcdG1haW4uc3RhdGUgPSBzdGF0ZTtcblx0XHR9XG5cdH1cbiAgICBcblx0Z2V0QnV0dG9uQ2xhc3MoY2xhc3NOYW1lLCBzdGF0dXMpIHtcblx0XHRzd2l0Y2ggKHN0YXR1cykge1xuXHRcdGNhc2UgMDpcblx0XHRcdHJldHVybiBgJHtjbGFzc05hbWV9YDtcblx0XHRjYXNlIDE6XG5cdFx0Y2FzZSA1OlxuXHRcdFx0cmV0dXJuIGAke2NsYXNzTmFtZX0tLWZhaWxgO1xuXHRcdGNhc2UgMjpcblx0XHRjYXNlIDY6XG5cdFx0XHRyZXR1cm4gYCR7Y2xhc3NOYW1lfS0tc3VjY2Vzc2A7XG5cdFx0Y2FzZSAzOlxuXHRcdFx0cmV0dXJuIGAke2NsYXNzTmFtZX0tLWxvYWRpbmdgO1xuXHRcdGNhc2UgNDpcblx0XHRcdHJldHVybiBgJHtjbGFzc05hbWV9LS13YXJuaW5nYDtcblx0XHR9XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBCdXR0b247Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkE7QUFDQTtBQURBO0FBSUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBWkE7QUFjQTtBQUNBO0FBdEhBO0FBQ0E7QUF3SEEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./resources/js/ui/button.js\n");

/***/ }),

/***/ 6:
/*!***********************************************************!*\
  !*** multi ./resources/js/components/headers/customer.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./resources/js/components/headers/customer.js */"./resources/js/components/headers/customer.js");


/***/ })

/******/ });