(function(e){function t(t){for(var a,n,i=t[0],s=t[1],c=t[2],u=0,l=[];u<i.length;u++)n=i[u],Object.prototype.hasOwnProperty.call(r,n)&&r[n]&&l.push(r[n][0]),r[n]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);p&&p(t);while(l.length)l.shift()();return o.push.apply(o,c||[]),A()}function A(){for(var e,t=0;t<o.length;t++){for(var A=o[t],a=!0,n=1;n<A.length;n++){var i=A[n];0!==r[i]&&(a=!1)}a&&(o.splice(t--,1),e=s(s.s=A[0]))}return e}var a={},n={app:0},r={app:0},o=[];function i(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-4da1157a":"8017c6e7","chunk-6356bb85":"7e138119"}[e]+".js"}function s(t){if(a[t])return a[t].exports;var A=a[t]={i:t,l:!1,exports:{}};return e[t].call(A.exports,A,A.exports,s),A.l=!0,A.exports}s.e=function(e){var t=[],A={"chunk-4da1157a":1,"chunk-6356bb85":1};n[e]?t.push(n[e]):0!==n[e]&&A[e]&&t.push(n[e]=new Promise((function(t,A){for(var a="css/"+({}[e]||e)+"."+{"chunk-4da1157a":"618d4b46","chunk-6356bb85":"06537df9"}[e]+".css",r=s.p+a,o=document.getElementsByTagName("link"),i=0;i<o.length;i++){var c=o[i],u=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(u===a||u===r))return t()}var l=document.getElementsByTagName("style");for(i=0;i<l.length;i++){c=l[i],u=c.getAttribute("data-href");if(u===a||u===r)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var a=t&&t.target&&t.target.src||r,o=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=a,delete n[e],p.parentNode.removeChild(p),A(o)},p.href=r;var d=document.getElementsByTagName("head")[0];d.appendChild(p)})).then((function(){n[e]=0})));var a=r[e];if(0!==a)if(a)t.push(a[2]);else{var o=new Promise((function(t,A){a=r[e]=[t,A]}));t.push(a[2]=o);var c,u=document.createElement("script");u.charset="utf-8",u.timeout=120,s.nc&&u.setAttribute("nonce",s.nc),u.src=i(e);var l=new Error;c=function(t){u.onerror=u.onload=null,clearTimeout(p);var A=r[e];if(0!==A){if(A){var a=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+a+": "+n+")",l.name="ChunkLoadError",l.type=a,l.request=n,A[1](l)}r[e]=void 0}};var p=setTimeout((function(){c({type:"timeout",target:u})}),12e4);u.onerror=u.onload=c,document.head.appendChild(u)}return Promise.all(t)},s.m=e,s.c=a,s.d=function(e,t,A){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:A})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var A=Object.create(null);if(s.r(A),Object.defineProperty(A,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(A,a,function(t){return e[t]}.bind(null,a));return A},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var p=u;o.push([0,"chunk-vendors"]),A()})({0:function(e,t,A){e.exports=A("56d7")},"1a7c":function(e,t,A){"use strict";var a=A("a184"),n=A.n(a);n.a},"1e4d":function(e,t,A){"use strict";var a=A("ea6f"),n=A.n(a);n.a},"56d7":function(e,t,A){"use strict";A.r(t);A("e260"),A("e6cf"),A("cca6"),A("a79d");var a=A("5ee5"),n=A.n(a),r=function(){var e=this,t=e.$createElement,A=e._self._c||t;return A("div",{style:{height:e.setheight+"px"},attrs:{id:"app"}},[A("router-view")],1)},o=[],i={name:"App",components:{},data:function(){return{setheight:0}},mounted:function(){this.setheight=window.innerHeight}},s=i,c=(A("7c55"),A("2877")),u=Object(c["a"])(s,r,o,!1,null,null,null),l=u.exports,p=(A("d3b7"),A("78f8")),d=A.n(p);n.a.use(d.a);var f=[{path:"/",redirect:"/carList"},{path:"/addInfo",name:"addInfo",component:function(){return A.e("chunk-4da1157a").then(A.bind(null,"3757"))}},{path:"/carList",name:"carList",component:function(){return A.e("chunk-6356bb85").then(A.bind(null,"d696"))}}],m=new d.a({mode:"hash",routes:f}),h=(A("b0c0"),A("96cf"),A("1da1")),g=A("18a0"),v=A.n(g),b=A("bc3a"),y=A.n(b),w=A("6aa0"),_=A.n(w),x={production:{baseURL:"",authBaseURL:""},development:{baseURL:"/api",authBaseURL:""},test:{baseURL:"http://testcarapi.hileader.com/",authBaseURL:""}};console.log(x["production"],"production","环境路径");var C=x["production"],S=function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(){var t,A,a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t="http://testcarapi.hileader.com/wechat/wechat_login/getSign",e.next=3,y.a.post(C.baseURL+"/wechat/wechat_login/getSign",{url:t});case 3:return A=e.sent,v.a.config({debug:!0,appId:A.data.data.appId,timestamp:A.data.data.timestamp,nonceStr:A.data.data.nonceStr,signature:A.data.data.signature,jsApiList:["chooseImage","uploadImage"]}),a="081FzkaF0jod7f2AIMcF0FLeaF0FzkaY",e.next=8,y.a.post(C.baseURL+"wechat/wechat_login/login",{code:a});case 8:n=e.sent,localStorage.setItem("code",_.a.encode(n.data.data.openid)),localStorage.setItem("user_info",JSON.stringify(n.data.data));case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=S;m.beforeEach((function(e,t,A){if("addInfo"===e.name||"carList"===e.name){var a=localStorage.getItem("code");a||(console.log("缺少token"),k()),A()}}));var j=A("1e55"),O=A.n(j),L=(A("157a"),new n.a.observable({code:"",active:1,basic_form:{},car_form:{},current_form:{},original_form:{},post_form:{}})),P={toNext:function(e){e.active++},toPre:function(e){e.active--},getCode:function(){return localStorage.getItem("code")},setCode:function(e){localStorage.setItem("code",e)}},I={vm:{},install:function(e,t){this.installed||(this.installed=!0,t?(e.axios=t,Object.defineProperties(e.prototype,{axios:{get:function(){return t}},$http:{get:function(){return t}}})):console.error("You have to install axios"))}},U=y.a.create({baseURL:C.baseURL,timeout:6e3}),B=function(e){return Promise.reject(e)};U.interceptors.request.use((function(e){return P.getCode()&&(e.headers["Authorization"]=P.getCode()),e}),B),U.interceptors.response.use((function(e){return e.data}),B);var R={vm:{},install:function(e){e.use(I,U)}},E=function(){var e=this,t=e.$createElement,A=e._self._c||t;return A("div",{staticClass:"button-box"},[A("button",{staticClass:"pre-button",attrs:{disabled:e.pre_disabled},on:{click:e.preStep}},[e._v(" 上一步 ")]),A("button",{staticClass:"next-button",attrs:{disabled:e.next_disabled},on:{click:e.nextStep}},[e._v(" 下一步 ")])])},N=[],T={name:"buttons",data:function(){return{next_disabled:!1,pre_disabled:!1}},methods:{preStep:function(){var e=this;this.$_mutations.toPre(this.$_store),this.pre_disabled=!0,setTimeout((function(){return e.pre_disabled=!1}),500)},nextStep:function(e){var t=this;return Object(h["a"])(regeneratorRuntime.mark((function A(){return regeneratorRuntime.wrap((function(A){while(1)switch(A.prev=A.next){case 0:return A.prev=0,A.next=3,t.$refs.basicInfo.validate();case 3:t.$_store.basic_form=e,t.$_mutations.toNext(t.$_store),t.next_disabled=!0,setTimeout((function(){return t.next_disabled=!1}),500),A.next=12;break;case 9:A.prev=9,A.t0=A["catch"](0),console.error(A.t0);case 12:case"end":return A.stop()}}),A,null,[[0,9]])})))()}}},F=T,J=Object(c["a"])(F,E,N,!1,null,"07db9e70",null),V=J.exports,W=function(){var e=this,t=e.$createElement,A=e._self._c||t;return A("div",{staticClass:"commonLable"},[e.is_require?A("span",{staticClass:"require"},[e._v("*")]):e._e(),A("span",[e._v(e._s(e.label))]),e._t("default")],2)},q=[],D={name:"lable",props:{label:{type:String,required:!0,default:""},is_require:{type:Boolean,default:!0}}},K=D,Q=Object(c["a"])(K,W,q,!1,null,"6267c3d4",null),M=Q.exports,Y=function(){var e=this,t=e.$createElement,A=e._self._c||t;return A("div",[A("div",{staticClass:"uploadImg",on:{click:function(t){e.showPicker=!0}}},[A("img",{attrs:{src:e.imgSrc,alt:""}})]),A("van-popup",{attrs:{round:"",position:"bottom"},model:{value:e.showPicker,callback:function(t){e.showPicker=t},expression:"showPicker"}},[A("van-picker",{attrs:{"show-toolbar":"",title:"选择上传方式",columns:e.columns},on:{cancel:function(t){e.showPicker=!1},change:e.onChange}},[[e.is_media?A("van-uploader",{staticStyle:{position:"absolute",right:"10px"},attrs:{capture:"camera","after-read":e.afterRead}},[A("van-icon",{attrs:{name:"share",color:"#FF5C5C"}}),A("span",{staticStyle:{color:"#FF5C5C"}},[e._v("拍照上传")])],1):A("van-uploader",{staticStyle:{position:"absolute",right:"10px"},attrs:{"max-count":1,"after-read":e.afterRead}},[A("van-icon",{attrs:{name:"share",color:"#FF5C5C"}}),A("span",{staticStyle:{color:"#FF5C5C"}},[e._v("选择图片")])],1)]],2)],1),A("van-overlay",{attrs:{show:e.show_overlay},on:{click:function(t){e.show_overlay=!1}}},[A("div",{staticClass:"wrapper",on:{click:function(e){e.stopPropagation()}}},[A("van-loading",{staticStyle:{"font-size":"40px"},attrs:{color:"#1989fa",size:"45px"}},[e._v("正在上传中，请耐心等待...")])],1)])],1)},z=[],Z=(A("a9e3"),A("b06f")),H=A.n(Z),G=A("b110"),X=A.n(G),$={name:"ocr",props:{parentName:{type:String,require:!0},card_type:{type:Number,require:!1}},data:function(){return{imgSrc:H.a,columns:["本地图片上传","拍照上传"],showPicker:!1,is_media:!1,fileList:[],show_overlay:!1,image_type:6}},created:function(){"车辆信息"!==this.parentName&&(this.image_type=1,this.imgSrc=X.a)},methods:{onChange:function(e,t){this.is_media="本地图片上传"!==t},afterRead:function(e){var t=this;return Object(h["a"])(regeneratorRuntime.mark((function A(){var a,n;return regeneratorRuntime.wrap((function(A){while(1)switch(A.prev=A.next){case 0:return A.prev=0,t.showPicker=!1,t.show_overlay=!0,A.next=5,t.axios.post("wechat/Uploads/imageBase64_upload",{image_type:t.image_type,image_url:e.content});case 5:if(a=A.sent,200==a.code){A.next=8;break}return A.abrupt("return",j["Toast"].fail(a.message));case 8:return A.next=10,t.axios.post("wechat/ocr_sign/aliOcr",{type:t.card_type,image_url:a.data.image_url});case 10:if(n=A.sent,t.imgSrc=C.baseURL+"/dataapi/Image/read?image_url=/"+a.data.image_url,console.log(t.imgSrc),200==n.code){A.next=15;break}return A.abrupt("return",j["Toast"].fail("识别信息失败！ 请重新上传图片或者手动输入信息"));case 15:if("false"!=n.data.ocr.success){A.next=17;break}return A.abrupt("return",j["Toast"].fail("识别信息失败！ 请重新上传图片或者手动输入信息"));case 17:"车辆信息"===t.parentName&&t.$emit("carOcr",n.data.ocr),"原车主信息"===t.parentName&&t.$emit("originalOcr",n.data.ocr),"现车主信息"===t.parentName&&t.$emit("currentOcr",n.data.ocr),A.next=25;break;case 22:A.prev=22,A.t0=A["catch"](0),j["Toast"].fail("识别信息失败！ 请重新上传图片或者手动输入信息");case 25:return A.prev=25,t.show_overlay=!1,A.finish(25);case 28:case"end":return A.stop()}}),A,null,[[0,22,25,28]])})))()}}},ee=$,te=(A("1e4d"),Object(c["a"])(ee,Y,z,!1,null,"55f61122",null)),Ae=te.exports,ae=function(){var e=this,t=e.$createElement,A=e._self._c||t;return A("div",{staticClass:"tip"},[A("img",{attrs:{src:e.src,alt:""}}),A("span",{staticClass:"text"},[e._v("根据监管要求证件照片仅用于业务办理")])])},ne=[],re=A("b6d9"),oe=A.n(re),ie={name:"tip",data:function(){return{src:oe.a}}},se=ie,ce=(A("1a7c"),Object(c["a"])(se,ae,ne,!1,null,"9c3fcd88",null)),ue=ce.exports;n.a.use(R),n.a.use(O.a),n.a.use(k),n.a.config.productionTip=!1,n.a.prototype.$_store=L,n.a.prototype.$_mutations=P,n.a.component("my-buttons",V),n.a.component("my-label",M),n.a.component("my-ocr",Ae),n.a.component("my-tip",ue),new n.a({render:function(e){return e(l)},router:m}).$mount("#app")},"5ba8":function(e,t,A){},"7c55":function(e,t,A){"use strict";var a=A("5ba8"),n=A.n(a);n.a},a184:function(e,t,A){},b06f:function(e,t,A){e.exports=A.p+"img/upload@2x.fc61480c.png"},b110:function(e,t,A){e.exports=A.p+"img/upload2.8f24528b.png"},b6d9:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA+CAMAAABXyBiCAAABm1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2E+W/AAAAiXRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFxgZGhscHR4gISIjJCUmJykqKywtLi8wMzQ1Njc4OTo7PD4/QkNERUZHSElKS05PUFFSU1RVVldZWltdXl9gYWJjZWZnaGlrbG1ucXJ0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmVe12+oAAAM0SURBVEjHrZdrWxNnEIYfEkGQg4EKlBZBLCAonipaFamIKBWh2ELLQcspVtoKTaQNhppmIU2y98/uh43ZDewhe13Op7zPzr377uy8MxPJyzouNym83Sxy0BWaGjeBbH84qG4RAAr3wlCf7/LRVhqqhSIP8wCbVw4A0sNVQTVX3wLwJKLY7wCsdgc/6VYCgMyQJNUtWDvduOgLfTm9b/nFW0vKqGEJ22OxY76d31w8Jal+YCpZCkNuMlK+ena5JJrx8euD3Z19I7eH6yVdKICZSRnl2BUXKm/cG+eYGY3STKWUmW47sffepXyl07C05FimZvsjri9df20p6/C7I21C7td3id9Wvrv7hV+4ogNjc2tv3yW2gQlpB3bCZFATMCPtwVYYLALMS2l4FSrNj2BRysJqKMyAFSkPL8Niv0hGWOwQVqX3sBYKy8OClIA3oQ4+MCdtQzLAcWp5xF61Ak+lTcj4UqfjUGi0D5eVJYtgRgMoinbJvAR8LT0GOgIoxmzhHnBBugFcDqC+dSizQJPUCTyontIapCXVHMILZ9wivpT+KuXwFvxpqw/NdJ8f1QxMSlZMWsqHsQC5IW9K14CvJKkPuFmW94DCdU9K85CvlaToEfxYlrsOAPOuF6UkvLZ+rUPajkN7CmDCgyqlliQ9AIYcV5IA+66UJoDBkp8JK84i80eprp2klIAPH1NxAwrOPt3w2ovqAWadQR2vOCob7pS+B8pt69S/8E9dRS29NT7oQjUfwa69fA48quJkzwD37WVLDowzgVRLDtK1DmEaeBaIzQEVo8OZLJi9AdT5IqSiJz7j3mlfqjYB3HbRXvhiz4CtmmNidwG44UP1m2C0uWZbfsCT6soCoy59Kw4YXg01to9Hr4ilgHS7K9WwC+y4j18dGeBDj8uVtl0gddZjJz05IHeyaJ4/ADLeNfhSHjDvH1NHjoBsj0+U+zIA6y3O1/oB4O9O32/angTIXLU38B7gTXNA4jVuWUOrFdH2nwFYrg2eOx7lAQpzTTq3UAQw7lTVZrusodV4WQBgvbXK9hyd/M+e+EZD9PXYvPWk7OP6cP8Ezv1kcjjVoND2WW+jPrX9DzfJgAIxROW1AAAAAElFTkSuQmCC"},ea6f:function(e,t,A){}});
//# sourceMappingURL=app.ce07fa2d.js.map