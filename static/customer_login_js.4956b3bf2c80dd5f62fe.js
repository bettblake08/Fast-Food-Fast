!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/assets/",n(n.s=165)}({1:function(t,e,n){"use strict";n.d(e,"b",function(){return o}),n.d(e,"a",function(){return r});var o="https://fast-food-fast-bb.herokuapp.com",r="".concat(o,"/api/v1")},10:function(t,e,n){"use strict";var o=n(11);function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function a(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function i(t){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var u=function(t){function e(t){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=a(this,i(e).call(this,t))).state={inputValue:"",status:void 0==t.status?0:t.status,test:void 0==t.test?function(){return!0}:t.test},n.parent=t.parent,n.create(),n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(e,o["a"]),function(t,e,n){e&&s(t.prototype,e),n&&s(t,n)}(e,[{key:"create",value:function(){var t=this,e=document.createElement("div"),n=document.createElement("input"),o=document.createElement("label"),r=document.createElement("div"),s=document.createElement("div");s.classList.add("errorComment--disabled","".concat(this.props.class,"__error"),"f_comment_1"),r.classList.add("".concat(this.props.class,"__comment--active"),"f_comment_1"),r.innerHTML=void 0==this.props.comment?"":this.props.comment,o.setAttribute("htmlFor",this.props.name),o.innerHTML=this.props.label,n.setAttribute("type",this.props.type),n.setAttribute("id",this.props.name),n.setAttribute("placeholder",this.props.placeholder),n.classList.add(this.props.textClass),n.addEventListener("focusout",function(){t.testInput()}),e.classList.add("has-float-label",this.props.textClass,this.getInputClass(this.props.class,this.props.status)),e.appendChild(n),e.appendChild(o),e.appendChild(r),e.appendChild(s),this.components={main:e,textInput:n,inputLabel:o,inputComment:r,inputErrorComment:s}}},{key:"init",value:function(){var t=this.props,e=t.parent.state;e.textInputs.push(this),t.parent.state=e,this.props=t}},{key:"testInput",value:function(){var t=this.state.test(this.components.textInput.value);return t.status?(this.setStatus(2),this.closeErrorDisplay()):(this.displayError(t.message,5e3),this.setStatus(1)),t.status}},{key:"getInput",value:function(){return this.components.main}},{key:"focus",value:function(){this.components.textInput.focus()}},{key:"getInputValue",value:function(){return this.components.textInput.value}}]),e}();e.a=u},11:function(t,e,n){"use strict";var o=n(2);function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function a(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function i(t){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var u=function(t){function e(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),a(this,i(e).call(this,t))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(e,o["a"]),function(t,e,n){e&&s(t.prototype,e),n&&s(t,n)}(e,[{key:"displayError",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e3,n=this,o=this.components.inputComment,r=this.components.inputErrorComment;o.classList.replace("".concat(this.props.class,"__comment--active"),"".concat(this.props.class,"__comment--disabled")),r.innerHTML=t,r.classList.replace("errorComment--disabled","errorComment--active"),this.setStatus(1,e),setTimeout(function(){n.closeErrorDisplay()},e)}},{key:"closeErrorDisplay",value:function(){var t=this.components.inputComment,e=this.components.inputErrorComment;e.classList.contains("errorComment--active")&&(t.classList.replace("".concat(this.props.class,"__comment--disabled"),"".concat(this.props.class,"__comment--active")),e.innerHTML="",e.classList.replace("errorComment--active","errorComment--disabled"))}},{key:"setStatus",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=this.state,r=this.components,s=this.props,a=this,i=this.getInputClass(s.class,o.status),c=this.getInputClass(s.class,t);r.main.classList.replace(i,c),1!==t&&2!==t||0===n?(o.status=t,a.state=o):setTimeout(function(){var n=e.getInputClass(s.class,t),i=e.getInputClass(s.class,s.status);r.main.classList.replace(n,i),o.status=s.status,a.state=o},n)}},{key:"getInputClass",value:function(t,e){switch(e){case 0:return"".concat(t,"--normal");case 1:return"".concat(t,"--fail");case 2:return"".concat(t,"--success");case 3:return"".concat(t,"--loading");case 4:return"".concat(t,"--warning")}}}]),e}();e.a=u},165:function(t,e,n){"use strict";n.r(e),n.d(e,"LoginForm",function(){return h});var o=n(5),r=n.n(o),s=n(4),a=n(10),i=n(2),c=n(3);function u(t){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function l(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function p(t,e){return!e||"object"!==u(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function m(t,e){return(m=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var h=function(t){function e(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(t=p(this,f(e).call(this))).state={errorMsg:"",buttons:[],textInputs:[]},t}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&m(t,e)}(e,i["a"]),function(t,e,n){e&&l(t.prototype,e),n&&l(t,n)}(e,[{key:"init",value:function(){var t=this,e=document.querySelector(".login__save"),n=document.querySelector(".login__logo"),o=document.querySelectorAll(".login__text"),i=new s.a({class:"btn_1",textClass:"f_button_2",label:"Sign In",parent:y,status:0,action:function(){t.loginAuth()}});i.init(),e.appendChild(i.getButton());var c=new Image;c.src=r.a,c.alt="FastFoodFast logo",n.appendChild(c);var u=new a.a({parent:this,name:"username",label:"Username",placeholder:"Eg. JesseC7",class:"text_input",textClass:"f_input_1",type:"text",status:0,test:function(t){return 0===t.length?{status:!1,message:"Username field empty."}:t.length>30?{status:!1,message:"Username too long. Please input a username less than 30 characters."}:{status:!0}}}),l=new a.a({parent:this,name:"password",label:"Password",placeholder:"Password",class:"text_input",textClass:"f_input_1",type:"password",status:0,test:function(t){if(0===t.length)return{status:!1,message:"Password field empty."};return/^((?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$#.!])).{8,16}$/.test(t)?{status:!0}:{status:!1,message:"Password is incorrect.Please input a password with 1 upper case, 1 lower case, 1 digit and 1 special character including [@$#.!] ."}}});u.init(),l.init(),o[0].appendChild(u.getInput()),o[1].appendChild(l.getInput())}},{key:"displayErrorMessage",value:function(t){Object(c.a)(".login__error",t,5e3)}},{key:"loginAuth",value:function(){console.log("Login authentication started");var t=this.state.textInputs.find(function(t){return 2!=t.state.status});void 0==t?Object(c.c)({password:this.state.textInputs[1].getInputValue(),username:this.state.textInputs[0].getInputValue(),successUrl:"/customer/order",component:this}):t.focus()}}]),e}(),y=new h;document.addEventListener("DOMContentLoaded",function(){y.init()})},2:function(t,e,n){"use strict";function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var r=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._state={},this._components={},this._props=e}return function(t,e,n){e&&o(t.prototype,e),n&&o(t,n)}(t,[{key:"state",get:function(){return this._state},set:function(t){this._state=t}},{key:"components",get:function(){return this._components},set:function(t){this._components=t}},{key:"props",get:function(){return this._props},set:function(t){this._props=t}}]),t}();e.a=r},3:function(t,e,n){"use strict";n.d(e,"d",function(){return r}),n.d(e,"b",function(){return s}),n.d(e,"c",function(){return a}),n.d(e,"a",function(){return i});var o=n(1);function r(t){var e=JSON.parse(localStorage.getItem("tokens"));fetch("".concat(o.a,"/token/refresh"),{method:"GET",headers:{Authorization:"Bearer ".concat(e.refresh_token)}}).then(function(e){if(201==e.status)return e.json();t.onFailure()}).then(function(n){void 0!=n&&(e.access_token=n.access_token,localStorage.setItem("tokens",JSON.stringify(e)),t.onSuccess())})}function s(){var t=JSON.parse(localStorage.getItem("tokens"));return null==t?"":t.access_token}function a(t){fetch("".concat(o.a,"/auth/login"),{body:JSON.stringify({password:t.password,username:t.username}),headers:{"Content-Type":"application/json"},method:"POST"}).then(function(e){switch(e.status){case 200:return e.json();case 400:case 401:case 404:e.json().then(function(e){t.component.displayErrorMessage(e.message)})}}).then(function(e){console.log("Login Successful!"),localStorage.setItem("tokens",JSON.stringify({access_token:e.access_token,refresh_token:e.refresh_token})),window.location.href=o.b+t.successUrl})}function i(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3e3;console.log("Displaying error: "+e);var o=document.querySelector(t);o.classList.replace("errorComment--disabled","errorComment--active"),o.innerHTML=e,setTimeout(function(){o.classList.replace("errorComment--active","errorComment--disabled"),o.innerHTML=""},n)}},4:function(t,e,n){"use strict";var o=n(2);function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function a(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function i(t){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var u=function(t){function e(t){var n;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=a(this,i(e).call(this,t))).state={status:t.status};var o=document.createElement("button");return o.setAttribute("type","button"),o.classList.add(t.textClass),o.classList.add(n.getButtonClass(t.class,t.status)),o.innerHTML=t.label,o.addEventListener("click",t.action),n.component={main:o},n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(e,o["a"]),function(t,e,n){e&&s(t.prototype,e),n&&s(t,n)}(e,[{key:"init",value:function(){var t=this.props.parent.state;t.buttons.push(this),this.props.parent.state=t}},{key:"setStatus",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e3,o=this.state,r=this.component,s=this.props,a=this,i=this.getButtonClass(s.class,o.status),c=this.getButtonClass(s.class,t);r.main.classList.replace(i,c),1==t||2==t?setTimeout(function(){var n=e.getButtonClass(s.class,t),i=e.getButtonClass(s.class,s.status);r.main.classList.replace(n,i),o.status=s.status,a.state=o},n):(o.status=t,a.state=o)}},{key:"getButtonClass",value:function(t,e){switch(e){case 0:return"".concat(t);case 1:case 5:return"".concat(t,"--fail");case 2:case 6:return"".concat(t,"--success");case 3:return"".concat(t,"--loading");case 4:return"".concat(t,"--warning")}}},{key:"getButton",value:function(){return this.component.main}}]),e}();e.a=u},5:function(t,e,n){t.exports=n.p+"4d13aad5b435a3e7bd5832e9199db4a5.png"}});