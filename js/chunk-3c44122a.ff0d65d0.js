(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3c44122a"],{"01f8":function(t,e,a){},3939:function(t,e,a){"use strict";var s=a("01f8"),o=a.n(s);o.a},"99af":function(t,e,a){"use strict";var s=a("23e7"),o=a("d039"),i=a("e8b5"),n=a("861d"),r=a("7b0b"),c=a("50c4"),u=a("8418"),l=a("65f0"),d=a("1dde"),p=a("b622"),m=a("2d00"),f=p("isConcatSpreadable"),v=9007199254740991,g="Maximum allowed index exceeded",h=m>=51||!o((function(){var t=[];return t[f]=!1,t.concat()[0]!==t})),b=d("concat"),w=function(t){if(!n(t))return!1;var e=t[f];return void 0!==e?!!e:i(t)},x=!h||!b;s({target:"Array",proto:!0,forced:x},{concat:function(t){var e,a,s,o,i,n=r(this),d=l(n,0),p=0;for(e=-1,s=arguments.length;e<s;e++)if(i=-1===e?n:arguments[e],w(i)){if(o=c(i.length),p+o>v)throw TypeError(g);for(a=0;a<o;a++,p++)a in i&&u(d,p,i[a])}else{if(p>=v)throw TypeError(g);u(d,p++,i)}return d.length=p,d}})},a55b:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"loginSection d-flex justify-content-center flex-column"},[a("Loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}}),a("h1",{staticClass:"mb-4 text-center"},[t._v("請先登入")]),a("div",{staticClass:"container"},[a("div",{staticClass:"row justify-content-center"},[a("div",{staticClass:"col-md-4 text-left"},[a("form",{staticClass:"form-login mb-3",on:{submit:function(e){return e.preventDefault(),t.login()}}},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"loginInputEmail"}},[t._v("Email")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.email,expression:"user.email"}],staticClass:"form-control",attrs:{type:"email",id:"loginInputEmail","aria-describedby":"emailHelp",placeholder:"example@service.com",required:"",autofocus:""},domProps:{value:t.user.email},on:{input:function(e){e.target.composing||t.$set(t.user,"email",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"loginInputPassword"}},[t._v("Password")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.password,expression:"user.password"}],staticClass:"form-control",attrs:{type:"password",id:"loginInputPassword",placeholder:"password",required:""},domProps:{value:t.user.password},on:{input:function(e){e.target.composing||t.$set(t.user,"password",e.target.value)}}})]),a("button",{staticClass:"btn btn-primary btn-block",attrs:{type:"submit"}},[t._v("登入")])]),a("router-link",{staticClass:"text-muted text-decoration-none",attrs:{to:"/"}},[t._v("返回首頁")])],1)])])],1)},o=[],i=(a("99af"),{name:"Login",data:function(){return{user:{email:"",password:""},token:"",isLoading:!1}},methods:{login:function(){var t=this;this.isLoading=!0;var e="".concat("https://course-ec-api.hexschool.io","/api/auth/login");this.axios.post(e,this.user).then((function(e){var a=e.data.token,s=e.data.expired;document.cookie="token = ".concat(a,"; expired = ").concat(new Date(1e3*s),";"),t.$bus.$emit("message:push","登入成功","success"),t.isLoading=!1,t.$router.push("/admin")})).catch((function(e){t.$bus.$emit("message:push","登入失敗 | ".concat(e),"danger"),t.isLoading=!1}))}}}),n=i,r=(a("3939"),a("2877")),c=Object(r["a"])(n,s,o,!1,null,"369c49e2",null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-3c44122a.ff0d65d0.js.map