!function(t){var e={};function s(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=t,s.c=e,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(n,o,function(e){return t[e]}.bind(null,o));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/assets/",s(s.s=40)}({0:function(t,e,s){"use strict";s.d(e,"b",function(){return n}),s.d(e,"a",function(){return o});const n="http://localhost:5000",o=`${n}/api/v1`},1:function(t,e,s){"use strict";e.a=class{constructor(t){this._state={status:t.status},this._props=t;let e=document.createElement("button");e.setAttribute("type","button"),e.classList.add(t.textClass),e.classList.add(this.getButtonClass(t.class,t.status)),e.innerHTML=t.label,e.addEventListener("click",t.action),this._component={main:e}}get state(){return this._state}set state(t){this._state=t}get component(){return this._component}set component(t){this._component=t}get props(){return this._props}set props(t){this._props=t}getButton(){return this.component.main}init(){let t=this.props.parent.state;t.buttons.push(this),this.props.parent.state=t}setStatus(t,e=3e3){let s=this.state,n=this.component,o=this.props,a=this,r=this.getButtonClass(o.class,s.status),c=this.getButtonClass(o.class,t);n.main.classList.replace(r,c),1==t||2==t?setTimeout(()=>{let e=this.getButtonClass(o.class,t),r=this.getButtonClass(o.class,o.status);n.main.classList.replace(e,r),s.status=o.status,a.state=s},e):(s.status=t,a.state=s)}getButtonClass(t,e){switch(e){case 0:return`${t}`;case 1:case 5:return`${t}--fail`;case 2:case 6:return`${t}--success`;case 3:return`${t}--loading`;case 4:return`${t}--warning`}}}},15:function(t,e,s){"use strict";s.r(e);var n=s(6),o=s.n(n),a=s(5),r=s.n(a),c=s(1),i=s(2),u=s(0);e.default=class{constructor(t={}){this._state={headerType:void 0==t.type?"black":t.type,buttons:[]},this._components={}}get state(){return this._state}set state(t){this._state=t}get component(){return this._component}set component(t){this._component=t}init(){let t=this,e=document.querySelector(".header__logout"),s=new c.a({class:"btn_1",textClass:"f_button_1",label:"Log Out",parent:t,status:0,action:()=>{t.logOut()}});s.init(),e.appendChild(s.getButton()),this.changeHeaderType(this.state.headerType)}changeHeaderType(){let t=document.querySelector(".header__logo"),e=new Image;switch(e.alt="FastFoodFast Logo",this.state.headerType){case"black":e.src=o.a;break;case"white":e.src=r.a}t.appendChild(e)}logOut(){let t=this;fetch(`${u.a}/auth/logout`,{headers:{Authorization:`Bearer ${Object(i.a)()}`}}).then(e=>{switch(e.status){case 200:localStorage.setItem("tokens",JSON.stringify({})),window.location.href=u.b+"/";break;case 401:Object(i.b)({onSuccess:()=>{t.logOut()},onFailure:()=>{window.location.href=u.b+"/customer/login"}});break;case 422:window.location.href=u.b+"/customer/login"}})}}},2:function(t,e,s){"use strict";s.d(e,"b",function(){return o}),s.d(e,"a",function(){return a});var n=s(0);function o(t){let e=JSON.parse(localStorage.getItem("tokens"));fetch(`${n.a}/token/refresh`,{method:"GET",headers:{Authorization:`Bearer ${e.refresh_token}`}}).then(e=>{if(201==e.status)return e.json();t.onFailure()}).then(s=>{void 0!=s&&(e.access_token=s.access_token,localStorage.setItem("tokens",JSON.stringify(e)),t.onSuccess())})}function a(){return JSON.parse(localStorage.getItem("tokens")).access_token}},40:function(t,e,s){t.exports=s(15)},5:function(t,e,s){t.exports=s.p+"4d13aad5b435a3e7bd5832e9199db4a5.png"},6:function(t,e,s){t.exports=s.p+"3e2d929931fcf869c79d01a08df4eddd.png"}});