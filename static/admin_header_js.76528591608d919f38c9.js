!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/assets/",n(n.s=175)}({1:function(t,e,n){"use strict";n.d(e,"b",function(){return o}),n.d(e,"a",function(){return r});var o="https://fast-food-fast-bb.herokuapp.com",r="".concat(o,"/api/v1")},12:function(t,e,n){t.exports=n.p+"b889e74d914d77a04de009eac356924d.png"},175:function(t,e,n){"use strict";n.r(e);var o=n(12),r=n.n(o),a=n(9);function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function u(t,e){return!e||"object"!==c(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function s(t){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function f(t,e){return(f=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var l=new(function(t){function e(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(t=u(this,s(e).call(this,n))).state={headerType:void 0==n.type?"black":n.type,buttons:[],toggleMenu:!1},t.components={},t}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}(e,a["a"]),function(t,e,n){e&&i(t.prototype,e),n&&i(t,n)}(e,[{key:"init",value:function(){var t=this,e=document.querySelector(".header__menuButton"),n=document.querySelector(".navMenu");this.addLogOutButton();var o=new Image;o.src=r.a,o.alt="Dropdown menu button",e.appendChild(o),e.addEventListener("click",function(){t.toggleSideBarMenu()}),this.changeHeaderType(this.state.headerType),this.components.headerMenuButton=e,this.components.sideBarMenu=n}},{key:"toggleSideBarMenu",value:function(){this.state.toggleMenu=!this.state.toggleMenu,this.state.toggleMenu?this.components.sideBarMenu.classList.replace("navMenu","navMenu--active"):this.components.sideBarMenu.classList.replace("navMenu--active","navMenu")}}]),e}());document.addEventListener("DOMContentLoaded",function(){l.init()})},2:function(t,e,n){"use strict";function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var r=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._state={},this._components={},this._props=e}return function(t,e,n){e&&o(t.prototype,e),n&&o(t,n)}(t,[{key:"state",get:function(){return this._state},set:function(t){this._state=t}},{key:"components",get:function(){return this._components},set:function(t){this._components=t}},{key:"props",get:function(){return this._props},set:function(t){this._props=t}}]),t}();e.a=r},3:function(t,e,n){"use strict";n.d(e,"d",function(){return r}),n.d(e,"b",function(){return a}),n.d(e,"c",function(){return c}),n.d(e,"a",function(){return i});var o=n(1);function r(t){var e=JSON.parse(localStorage.getItem("tokens"));fetch("".concat(o.a,"/token/refresh"),{method:"GET",headers:{Authorization:"Bearer ".concat(e.refresh_token)}}).then(function(e){if(201==e.status)return e.json();t.onFailure()}).then(function(n){void 0!=n&&(e.access_token=n.access_token,localStorage.setItem("tokens",JSON.stringify(e)),t.onSuccess())})}function a(){var t=JSON.parse(localStorage.getItem("tokens"));return null==t?"":t.access_token}function c(t){fetch("".concat(o.a,"/auth/login"),{body:JSON.stringify({password:t.password,username:t.username}),headers:{"Content-Type":"application/json"},method:"POST"}).then(function(e){switch(e.status){case 200:return e.json();case 400:case 401:case 404:e.json().then(function(e){t.component.displayErrorMessage(e.message)})}}).then(function(e){console.log("Login Successful!"),localStorage.setItem("tokens",JSON.stringify({access_token:e.access_token,refresh_token:e.refresh_token})),window.location.href=o.b+t.successUrl})}function i(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3e3;console.log("Displaying error: "+e);var o=document.querySelector(t);o.classList.replace("errorComment--disabled","errorComment--active"),o.innerHTML=e,setTimeout(function(){o.classList.replace("errorComment--active","errorComment--disabled"),o.innerHTML=""},n)}},4:function(t,e,n){"use strict";var o=n(2);function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function c(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function i(t){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var s=function(t){function e(t){var n;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=c(this,i(e).call(this,t))).state={status:t.status};var o=document.createElement("button");return o.setAttribute("type","button"),o.classList.add(t.textClass),o.classList.add(n.getButtonClass(t.class,t.status)),o.innerHTML=t.label,o.addEventListener("click",t.action),n.component={main:o},n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}(e,o["a"]),function(t,e,n){e&&a(t.prototype,e),n&&a(t,n)}(e,[{key:"init",value:function(){var t=this.props.parent.state;t.buttons.push(this),this.props.parent.state=t}},{key:"setStatus",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e3,o=this.state,r=this.component,a=this.props,c=this,i=this.getButtonClass(a.class,o.status),u=this.getButtonClass(a.class,t);r.main.classList.replace(i,u),1==t||2==t?setTimeout(function(){var n=e.getButtonClass(a.class,t),i=e.getButtonClass(a.class,a.status);r.main.classList.replace(n,i),o.status=a.status,c.state=o},n):(o.status=t,c.state=o)}},{key:"getButtonClass",value:function(t,e){switch(e){case 0:return"".concat(t);case 1:case 5:return"".concat(t,"--fail");case 2:case 6:return"".concat(t,"--success");case 3:return"".concat(t,"--loading");case 4:return"".concat(t,"--warning")}}},{key:"getButton",value:function(){return this.component.main}}]),e}();e.a=s},5:function(t,e,n){t.exports=n.p+"4d13aad5b435a3e7bd5832e9199db4a5.png"},8:function(t,e,n){t.exports=n.p+"3e2d929931fcf869c79d01a08df4eddd.png"},9:function(t,e,n){"use strict";var o=n(2),r=n(8),a=n.n(r),c=n(5),i=n.n(c),u=n(3),s=n(1),f=n(4);function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function p(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function y(t,e){return!e||"object"!==l(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function d(t){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function b(t,e){return(b=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var h=function(t){function e(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),y(this,d(e).call(this,t))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&b(t,e)}(e,o["a"]),function(t,e,n){e&&p(t.prototype,e),n&&p(t,n)}(e,[{key:"changeHeaderType",value:function(t){var e=document.querySelector(".header__logo"),n=new Image;switch(n.alt="FastFoodFast Logo",t){case"black":n.src=a.a;break;case"white":n.src=i.a}e.appendChild(n)}},{key:"addLogOutButton",value:function(){var t=document.querySelector(".header__logOut"),e=this,n=new f.a({class:"btn_1",textClass:"f_button_1",label:"Log Out",parent:e,status:0,action:function(){e.logOut()}});n.init(),t.appendChild(n.getButton())}},{key:"logOut",value:function(){var t=this;fetch("".concat(s.a,"/auth/logout"),{headers:{Authorization:"Bearer ".concat(Object(u.b)())}}).then(function(e){switch(e.status){case 200:localStorage.setItem("tokens",JSON.stringify({})),window.location.href=s.b+"/";break;case 401:Object(u.d)({onSuccess:function(){t.logOut()},onFailure:function(){window.location.href=s.b+"/admin/login"}});break;case 422:window.location.href=s.b+"/admin/login"}})}}]),e}();e.a=h}});