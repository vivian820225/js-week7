(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d225006"],{e313:function(t,a,n){"use strict";n.r(a);var s=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",[n("Loading",{attrs:{active:t.isLoading},on:{"update:active":function(a){t.isLoading=a}}}),n("nav",{staticClass:"navbar navbar-expand-lg navbar-light bg-light"},[n("router-link",{staticClass:"navbar-brand",attrs:{to:"/admin"}},[t._v("後台首頁")]),t._m(0),n("div",{staticClass:"collapse navbar-collapse justify-content-between",attrs:{id:"navbarNavAltMarkup"}},[n("div",{staticClass:"navbar-nav"},[n("router-link",{staticClass:"nav-link",attrs:{to:"/admin/products"}},[t._v("商品管理")]),n("router-link",{staticClass:"nav-link",attrs:{to:"/admin/orders"}},[t._v("訂單管理")]),n("router-link",{staticClass:"nav-link",attrs:{to:"/admin/coupons"}},[t._v("優惠券列表")]),n("router-link",{staticClass:"nav-link",attrs:{to:"/admin/storage"}},[t._v("圖片列表")])],1),n("a",{attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.logout()}}},[t._v("登出")])])],1),t.checkSuccess?n("router-view",{attrs:{token:t.token}}):t._e()],1)},e=[function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarNavAltMarkup","aria-controls":"navbarNavAltMarkup","aria-expanded":"false","aria-label":"Toggle navigation"}},[n("span",{staticClass:"navbar-toggler-icon"})])}],i=(n("ac1f"),n("5319"),{name:"Dashboard",data:function(){return{token:"",uuid:"21acf264-850e-4f92-95d0-23bf823dd286",checkSuccess:!1,isLoading:!1}},created:function(){this.checkToken()},methods:{checkToken:function(){var t=this;this.isLoading=!0,this.token=document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,"$1"),this.axios.defaults.headers.common.Authorization="Bearer ".concat(this.token);var a="".concat("https://course-ec-api.hexschool.io","/api/auth/check");this.axios.post(a,{api_token:this.token}).then((function(a){a.data.success&&(t.checkSuccess=!0,t.isLoading=!1)})).catch((function(){t.$router.push("/login"),t.$bus.$emit("message:push","請先登入","warning"),t.isLoading=!1}))},logout:function(){document.cookie="token=; expired=;",this.$router.push("/login"),this.$bus.$emit("message:push","登出成功","success")}}}),o=i,c=n("2877"),r=Object(c["a"])(o,s,e,!1,null,null,null);a["default"]=r.exports}}]);
//# sourceMappingURL=chunk-2d225006.6fb97f4a.js.map