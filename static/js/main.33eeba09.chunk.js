(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{249:function(e,t,a){e.exports=a(436)},436:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(17),i=a.n(s),l=a(23),o=a(24),c=a(26),m=a(25),g=a(27),u=a(67),p=a.n(u),h=a(16),d=a(51),f=a(19),b=a(2),v=a(69),E=a.n(v),y=a(70),N=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(c.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={curdeposit:0,levelcost:0,overtake:0,fpwin:0,fielderror:!1,remain:0,msg1:"",msg2:!1,msgcolor:"#000000",reward:0,bidcost:0,progressbar:0},a.calculateResults=function(){var e=a.state,t=e.remain,n=e.overtake,r=e.fpwin,s=e.curdeposit,i=e.levelcost;isNaN(t)&&(t=0),isNaN(n)&&(n=0),isNaN(r)&&(r=0),isNaN(s)&&(s=0),isNaN(i)&&(i=0),i>0&&s>0?a.setState({progressbar:Math.ceil(s/i*100)}):a.setState({progressbar:0});var l=Math.ceil((t+n)/2),o=Math.floor(1.9*r);a.setState({reward:o}),a.setState({bidcost:l}),t>l?o>l?a.setState({msg1:"There will be a profit of "+(o-l)+" FP(s)",msgcolor:"#177e0e",msg2:!0}):o===l?a.setState({msg1:"No profit nor loss on this transaction",msgcolor:"#fed029",msg2:!0}):a.setState({msg1:"There will be a loss of "+(o-l)+" FP(s)",msgcolor:"#b70431",msg2:!0}):a.setState({msg1:"Player can't win",msgcolor:"#b70431",msg2:!1})},a.handleChange=function(e){a.setState({msg1:""});var t=e.target,n=t.name,r=t.value,s=parseInt(r,10);s<0&&(s=0),a.setState(Object(f.a)({},n,s),function(){a.state.curdeposit>=a.state.levelcost?a.setState({fielderror:!0}):(a.setState({fielderror:!1}),a.setState({remain:a.state.levelcost-a.state.curdeposit},function(){a.calculateResults()}))})},a}return Object(g.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.layout},r.a.createElement(b.d,{className:e.paper,elevation:4},r.a.createElement(b.c,{container:!0,spacing:24},r.a.createElement(b.c,{item:!0,xs:12},r.a.createElement(b.g,{variant:"h4",align:"center",color:"primary"},"Profit Calculator")),r.a.createElement(b.c,{item:!0,xs:6},r.a.createElement(b.e,{value:this.state.curdeposit,error:this.state.fielderror,name:"curdeposit",label:"Current deposits",type:"number",fullWidth:!0,margin:"normal",onChange:this.handleChange})),r.a.createElement(b.c,{item:!0,xs:6},r.a.createElement(b.e,{value:this.state.levelcost,error:this.state.fielderror,name:"levelcost",label:"Cost to level GB",type:"number",fullWidth:!0,margin:"normal",onChange:this.handleChange})),r.a.createElement(b.c,{item:!0,xs:6},r.a.createElement(b.e,{value:this.state.overtake,name:"overtake",label:"Amount to overtake",type:"number",fullWidth:!0,margin:"normal",onChange:this.handleChange})),r.a.createElement(b.c,{item:!0,xs:6},r.a.createElement(b.e,{value:this.state.fpwin,name:"fpwin",label:"Targeted place reward",type:"number",fullWidth:!0,margin:"normal",onChange:this.handleChange})),r.a.createElement(b.c,{item:!0,xs:12},0!==this.state.curdeposit&&0!==this.state.levelcost&&!1===this.state.fielderror&&r.a.createElement(n.Fragment,null,r.a.createElement(b.g,{variant:"body1",align:"left"},r.a.createElement("strong",null,"Summary: ")),r.a.createElement(b.g,{variant:"body1",align:"center"},this.state.curdeposit," / ",this.state.levelcost),r.a.createElement(y.a,{className:e.progress,percent:this.state.progressbar,strokeLinecap:"butt",trailWidth:"3",strokeWidth:"3",strokeColor:"#215d1b"}),!isNaN(this.state.remain)&&0!==this.state.remain&&r.a.createElement(b.g,{variant:"body1",align:"left"},"Remaining FP to level GB: \xa0\xa0\xa0\xa0\xa0\xa0\xa0 \xa0\xa0\xa0\xa0\xa0\xa0\xa0",this.state.remain),!isNaN(this.state.overtake)&&0!==this.state.overtake&&r.a.createElement(b.g,{variant:"body1",align:"left"},"Nb of FP of player to overtake : \xa0\xa0\xa0\xa0 \xa0\xa0\xa0",this.state.overtake),!isNaN(this.state.reward)&&0!==this.state.reward&&r.a.createElement(b.g,{variant:"body1",align:"left"},"Reward (Arc bonus applied): \xa0\xa0\xa0\xa0\xa0\xa0 \xa0\xa0\xa0\xa0\xa0",this.state.reward),""!==this.state.msg1&&r.a.createElement(n.Fragment,null,r.a.createElement(b.g,{className:e.result,variant:"body1",align:"left"},r.a.createElement("strong",null,"Results: ")),this.state.msg2&&r.a.createElement(b.g,null,"The player will need to invest ",this.state.bidcost," FP while gaining ",this.state.reward," FP."),r.a.createElement(b.g,{variant:"body1",align:"left"},r.a.createElement("strong",null,r.a.createElement("span",{style:{color:"".concat(this.state.msgcolor)}},this.state.msg1)))))))," ",r.a.createElement(b.c,{container:!0,spacing:0,direction:"row",justify:"flex-start"},r.a.createElement(b.c,{item:!0,className:e.info,xs:12},r.a.createElement(b.g,{color:"secondary"},r.a.createElement(E.a,{className:e.icon}),r.a.createElement("span",{className:e.icon},"\xa0Result is calculated based on the investing player owning a level 80 Arc"))))," "))}}]),t}(n.Component),k=Object(h.withStyles)(function(e){return{layout:Object(f.a)({width:"auto",marginTop:5*e.spacing.unit,marginLeft:2*e.spacing.unit,marginRight:2*e.spacing.unit},e.breakpoints.up(600+2*e.spacing.unit*2),{width:600,marginLeft:"auto",marginRight:"auto"}),paper:Object(f.a)({marginTop:3*e.spacing.unit,marginBottom:3*e.spacing.unit,padding:2*e.spacing.unit},e.breakpoints.up(600+3*e.spacing.unit*2),{marginTop:6*e.spacing.unit,marginBottom:6*e.spacing.unit,padding:3*e.spacing.unit}),result:{marginTop:30},info:{marginTop:20},progress:{marginBottom:15},icon:{verticalAlign:"middle"}}})(N),w=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.handleClick;return r.a.createElement("div",{className:t.root},r.a.createElement(b.a,{className:t.appBar,position:"static",color:"primary"},r.a.createElement(b.c,{container:!0,spacing:24,alignItems:"baseline"},r.a.createElement(b.c,{item:!0,xs:12,className:t.flex},r.a.createElement(b.f,null,r.a.createElement(b.g,{variant:"h6",color:"inherit"},r.a.createElement("strong",null,"My Tools")),r.a.createElement("div",{className:t.productLogo},r.a.createElement(b.g,{color:"inherit"},"Some useful tools... \xa0\xa0\xa0\xa0\xa0\xa0")),r.a.createElement(b.b,{name:"secure",variant:"contained",color:"secondary",className:t.button,onClick:a},"Secure Place"),r.a.createElement(b.b,{name:"profit",variant:"contained",color:"secondary",className:t.button,onClick:a},"Profit Calc"))))))}}]),t}(n.Component),C=Object(h.withStyles)(function(e){return{root:{flexGrow:1},appBar:{position:"relative"},productLogo:{display:"inline-block",borderLeft:"1px solid ".concat(e.palette.grey.A100),marginLeft:32,paddingLeft:24},flex:Object(f.a)({display:"flex"},e.breakpoints.down("sm"),{display:"flex",justifyContent:"space-evenly",alignItems:"center"}),button:{margin:e.spacing.unit}}})(w),S=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(c.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={curdeposit:0,levelcost:0,overtake:0,fpwin:0,myfp:0,fielderror:!1,remain:0,msg1:"",msgflag:!1,msgcolor:"#000000",reward:0,bidcost:0,bank:0,progressbar:0},a.calculateResults=function(){var e=a.state,t=e.remain,n=e.overtake,r=e.fpwin,s=e.curdeposit,i=e.levelcost,l=e.myfp;isNaN(t)&&(t=0),isNaN(n)&&(n=0),isNaN(r)&&(r=0),isNaN(s)&&(s=0),isNaN(i)&&(i=0),isNaN(l)&&(l=0),i>0&&s>0?a.setState({progressbar:Math.ceil(s/i*100)}):a.setState({progressbar:0});var o=Math.ceil((t+n-l)/2);a.setState({bidcost:o}),o>t||o+l<n+t-o?a.setState({msg1:"Player can't win win win",msgcolor:"#b70431",msgflag:!1}):0!==r&&(r>o?a.setState({msg1:"You will win "+(r-o)+" FP on this transaction",msgcolor:"#177e0e",msgflag:!0}):r<o?a.setState({msg1:"You will lose "+(o-r)+" FP on this transaction",msgcolor:"#b70431",msgflag:!0}):a.setState({msg1:"No profit nor loss on this transaction",msgcolor:"#fed029",msgflag:!0}))},a.handleChange=function(e){a.setState({msg1:""});var t=e.target,n=t.name,r=t.value,s=parseInt(r,10);s<0&&(s=0),a.setState(Object(f.a)({},n,s),function(){a.state.curdeposit>=a.state.levelcost?a.setState({fielderror:!0}):(a.setState({fielderror:!1}),a.setState({remain:a.state.levelcost-a.state.curdeposit},function(){a.calculateResults()}))})},a}return Object(g.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.layout},r.a.createElement(b.d,{className:e.paper,elevation:4},r.a.createElement(b.c,{container:!0,spacing:24},r.a.createElement(b.c,{item:!0,xs:12},r.a.createElement(b.g,{variant:"h4",align:"center",color:"primary"},"Secure (Block) place")),r.a.createElement(b.c,{item:!0,xs:6},r.a.createElement(b.e,{value:this.state.curdeposit,error:this.state.fielderror,name:"curdeposit",label:"Current deposits",type:"number",fullWidth:!0,margin:"normal",onChange:this.handleChange})),r.a.createElement(b.c,{item:!0,xs:6},r.a.createElement(b.e,{value:this.state.levelcost,error:this.state.fielderror,name:"levelcost",label:"Cost to level GB",type:"number",fullWidth:!0,margin:"normal",onChange:this.handleChange})),r.a.createElement(b.c,{item:!0,xs:6},r.a.createElement(b.e,{value:this.state.overtake,name:"overtake",label:"Player to overtake",type:"number",fullWidth:!0,margin:"normal",onChange:this.handleChange})),r.a.createElement(b.c,{item:!0,xs:6},r.a.createElement(b.e,{value:this.state.myfp,name:"myfp",label:"My invested FP",type:"number",fullWidth:!0,margin:"normal",onChange:this.handleChange})),r.a.createElement(b.c,{item:!0,xs:6},r.a.createElement(b.e,{value:this.state.fpwin,name:"fpwin",label:"Targeted place reward",type:"number",fullWidth:!0,margin:"normal",onChange:this.handleChange})),r.a.createElement(b.c,{item:!0,xs:6},r.a.createElement(b.e,{value:this.state.bank,name:"bank",label:"Amount in the Bank",type:"number",fullWidth:!0,margin:"normal",onChange:this.handleChange})),r.a.createElement(b.c,{item:!0,xs:12},0!==this.state.curdeposit&&0!==this.state.levelcost&&!1===this.state.fielderror&&r.a.createElement(n.Fragment,null,r.a.createElement(b.g,{variant:"body1",align:"left"},r.a.createElement("strong",null,"Summary: ")),r.a.createElement(b.g,{variant:"body1",align:"center"},this.state.curdeposit," / ",this.state.levelcost),r.a.createElement(y.a,{className:e.progress,percent:this.state.progressbar,strokeLinecap:"butt",trailWidth:"3",strokeWidth:"3",strokeColor:"#215d1b"}),!isNaN(this.state.remain)&&0!==this.state.remain&&r.a.createElement(b.g,{variant:"body1",align:"left"},"Remaining FP to level GB: \xa0\xa0\xa0\xa0\xa0\xa0\xa0 \xa0\xa0\xa0\xa0\xa0\xa0\xa0",this.state.remain),!isNaN(this.state.overtake)&&0!==this.state.overtake&&r.a.createElement(b.g,{variant:"body1",align:"left"},"Nb of FP of player to overtake : \xa0\xa0\xa0\xa0 \xa0\xa0\xa0",this.state.overtake),!isNaN(this.state.myfp)&&0!==this.state.myfp&&r.a.createElement(b.g,{variant:"body1",align:"left"},"My currently invested FP: \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",this.state.myfp),!isNaN(this.state.fpwin)&&0!==this.state.fpwin&&r.a.createElement(b.g,{variant:"body1",align:"left"},"FP Reward: \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",this.state.fpwin),!isNaN(this.state.bank)&&0!==this.state.bank&&r.a.createElement(b.g,{variant:"body1",align:"left"},"Availaible FP in my bank: \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",this.state.bank),""!==this.state.msg1&&r.a.createElement(n.Fragment,null,r.a.createElement(b.g,{className:e.result,variant:"body1",align:"left"},r.a.createElement("strong",null,"Results: ")),this.state.msgflag&&r.a.createElement(b.g,{variant:"body1",align:"left"},"You will need to invest ",this.state.bidcost," FP to secure the place."),r.a.createElement(b.g,{variant:"body1",align:"left"},r.a.createElement("strong",null,r.a.createElement("span",{style:{color:"".concat(this.state.msgcolor)}},this.state.msg1))),!isNaN(this.state.bank)&&0!==this.state.bank&&r.a.createElement(b.g,{variant:"body1",align:"left"},"You will need to take ",this.state.bidcost-this.state.bank," FP from your inventory while")))))," ",r.a.createElement(b.c,{container:!0,spacing:0,direction:"row",justify:"flex-start"},r.a.createElement(b.c,{item:!0,className:e.info,xs:12},r.a.createElement(b.g,{color:"secondary"},r.a.createElement(E.a,{className:e.icon}),r.a.createElement("span",{className:e.icon},"\xa0I have nothing to say here"))))," "))}}]),t}(n.Component),j=Object(h.withStyles)(function(e){return{layout:Object(f.a)({width:"auto",marginTop:5*e.spacing.unit,marginLeft:2*e.spacing.unit,marginRight:2*e.spacing.unit},e.breakpoints.up(600+2*e.spacing.unit*2),{width:600,marginLeft:"auto",marginRight:"auto"}),paper:Object(f.a)({marginTop:3*e.spacing.unit,marginBottom:3*e.spacing.unit,padding:2*e.spacing.unit},e.breakpoints.up(600+3*e.spacing.unit*2),{marginTop:6*e.spacing.unit,marginBottom:6*e.spacing.unit,padding:3*e.spacing.unit}),result:{marginTop:30},info:{marginTop:20},progress:{marginBottom:15},icon:{verticalAlign:"middle"}}})(S),O=Object(h.createMuiTheme)({palette:{secondary:{main:d.pink[400]},primary:{main:d.blue[600]}},typography:{useNextVariants:!0}}),x=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(c.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={isblockplace:!0},a.handleClick=function(e){var t=e.target.name;"secure"===t&&a.setState({isblockplace:!0}),"profit"===t&&a.setState({isblockplace:!1})},a}return Object(g.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(n.Fragment,null,r.a.createElement(h.MuiThemeProvider,{theme:O},r.a.createElement(p.a,null),r.a.createElement(C,{handleClick:this.handleClick}),this.state.isblockplace&&r.a.createElement(j,null),!this.state.isblockplace&&r.a.createElement(k,null)))}}]),t}(n.Component);i.a.render(r.a.createElement(x,null),document.getElementById("root"))}},[[249,2,1]]]);
//# sourceMappingURL=main.33eeba09.chunk.js.map