(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{197:function(e,t,a){e.exports=a(336)},336:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(17),s=a.n(l),c=a(25),o=a(26),i=a(28),m=a(27),u=a(29),p=a(44),g=a(6),d=a(16),h=a(117),f=a.n(h),b=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(i.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={curdeposit:0,levelcost:0,overtake:0,fpwin:0,fielderror:!1,remain:0,msg1:"",msgcolor:"#000000"},a.calculateResults=function(){var e=a.state,t=e.remain,n=e.overtake,r=e.fpwin;isNaN(t)&&(t=0),isNaN(n)&&(n=0),isNaN(r)&&(r=0);var l=Math.ceil((t+n)/2),s=Math.floor(1.9*r);t>l?s>l?a.setState({msg1:"There will be a profit of "+(s-l)+" FP(s)",msgcolor:"#177e0e"}):s===l?a.setState({msg1:"No profit nor loss on this transaction",msgcolor:"#fed029"}):a.setState({msg1:"There will be a loss of "+(s-l)+" FP(s)",msgcolor:"#b70431"}):a.setState({msg1:"Player can't win",msgcolor:"#b70431"})},a.handleChange=function(e){a.setState({msg1:""});var t=e.target,n=t.name,r=t.value,l=parseInt(r,10);l<0&&(l=0),a.setState(Object(p.a)({},n,l),function(){a.state.curdeposit>=a.state.levelcost?a.setState({fielderror:!0}):(a.setState({fielderror:!1}),a.setState({remain:a.state.levelcost-a.state.curdeposit},function(){a.calculateResults()}))})},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.root},r.a.createElement(g.d,{className:e.paper,elevation:4},r.a.createElement(g.c,{container:!0,spacing:24},r.a.createElement(g.c,{item:!0,xs:12},r.a.createElement(g.g,{variant:"h4",align:"center",color:"primary"},"FP Profit Calculator")),r.a.createElement(g.c,{item:!0,xs:6},r.a.createElement(g.e,{value:this.state.curdeposit,error:this.state.fielderror,name:"curdeposit",label:"Sum of current deposits",type:"number",fullWidth:!0,margin:"normal",onChange:this.handleChange})),r.a.createElement(g.c,{item:!0,xs:6},r.a.createElement(g.e,{value:this.state.levelcost,error:this.state.fielderror,name:"levelcost",label:"Level Cost",type:"number",fullWidth:!0,margin:"normal",onChange:this.handleChange})),r.a.createElement(g.c,{item:!0,xs:6},r.a.createElement(g.e,{value:this.state.overtake,name:"overtake",label:"FP nb of the player to overtake",type:"number",fullWidth:!0,margin:"normal",onChange:this.handleChange})),r.a.createElement(g.c,{item:!0,xs:6},r.a.createElement(g.e,{value:this.state.fpwin,name:"fpwin",label:"FP of the targeted place",type:"number",fullWidth:!0,margin:"normal",onChange:this.handleChange})),r.a.createElement(g.c,{item:!0,xs:12},r.a.createElement(g.g,{className:e.result,variant:"body1",align:"left"},"FPs remaining for current level: ",!isNaN(this.state.remain)&&this.state.remain),""!==this.state.msg1&&r.a.createElement(g.g,{variant:"body1",align:"left",paragraph:!0},r.a.createElement("strong",null,r.a.createElement("span",{style:{color:"".concat(this.state.msgcolor)}},this.state.msg1)))))," ",r.a.createElement(g.c,{className:e.result,container:!0,spacing:0,direction:"row",justify:"flex-start"},r.a.createElement(g.c,{item:!0,xs:12},r.a.createElement(g.g,{color:"secondary"},r.a.createElement(f.a,{className:e.icon}),r.a.createElement("span",{className:e.icon},"\xa0Profit is calculated based on the investing player owning a level 80 Arc"))))," "))}}]),t}(n.Component),v=Object(d.withStyles)(function(e){return{root:{flexGrow:1,margin:40,overflow:"hidden",padding:"0 ".concat(3*e.spacing.unit,"px")},paper:{margin:"".concat(e.spacing.unit,"px auto"),padding:2*e.spacing.unit},result:{marginTop:30},icon:{verticalAlign:"middle"}}})(b),E=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.root},r.a.createElement(g.a,{position:"static",color:"primary"},r.a.createElement(g.c,{container:!0,spacing:24,alignItems:"baseline"},r.a.createElement(g.c,{item:!0,xs:12,className:e.flex},r.a.createElement(g.f,null,r.a.createElement(g.g,{variant:"h6",color:"inherit"},"My Tools"),r.a.createElement("div",{className:e.productLogo},r.a.createElement(g.g,{color:"inherit"},"Some useful tools... \xa0\xa0\xa0\xa0\xa0\xa0")),r.a.createElement(g.b,{variant:"contained",color:"secondary",className:e.button},"Profit Calc"),r.a.createElement(g.b,{variant:"contained",color:"secondary",className:e.button},"Secure Place"))))))}}]),t}(n.Component),y=Object(d.withStyles)(function(e){return{root:{flexGrow:1},productLogo:{display:"inline-block",borderLeft:"1px solid ".concat(e.palette.grey.A100),marginLeft:32,paddingLeft:24},flex:Object(p.a)({display:"flex"},e.breakpoints.down("sm"),{display:"flex",justifyContent:"space-evenly",alignItems:"center"}),button:{margin:e.spacing.unit}}})(E),w=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(y,null),r.a.createElement(v,null))}}]),t}(n.Component);s.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[197,2,1]]]);
//# sourceMappingURL=main.8d2fcb02.chunk.js.map