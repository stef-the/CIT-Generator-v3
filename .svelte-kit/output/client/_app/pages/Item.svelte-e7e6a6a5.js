import{S as J,i as K,s as W,e as h,t as V,k as O,c as p,a as g,h as j,d as f,m as x,b as s,g as H,G as t,K as C,L as z,j as Q,M as X}from"../chunks/vendor-69c2806c.js";function F(r,e,a){const o=r.slice();return o[3]=e[a],o}function q(r){let e,a,o=r[3].title+"",i,y,v,E,c,u,R,B,U,I,_;return{c(){e=h("div"),a=h("label"),i=V(o),v=O(),E=h("div"),c=O(),u=h("input"),I=h("br"),_=O(),this.h()},l(k){e=p(k,"DIV",{class:!0});var d=g(e);a=p(d,"LABEL",{for:!0});var w=g(a);i=j(w,o),w.forEach(f),v=x(d),E=p(d,"DIV",{class:!0}),g(E).forEach(f),c=x(d),u=p(d,"INPUT",{class:!0,type:!0,name:!0,id:!0,placeholder:!0}),I=p(d,"BR",{}),_=x(d),d.forEach(f),this.h()},h(){s(a,"for",y=r[3].name),s(E,"class","linebreak"),s(u,"class","text"),s(u,"type","text"),s(u,"name",R=r[3].name),s(u,"id",B=r[3].name),s(u,"placeholder",U=r[3].placeholder),s(e,"class","labelgroup")},m(k,d){H(k,e,d),t(e,a),t(a,i),t(e,v),t(e,E),t(e,c),t(e,u),t(e,I),t(e,_)},p:C,d(k){k&&f(e)}}}function Y(r){let e,a,o,i,y,v,E,c,u,R,B,U,I,_,k,d,w=r[0].displayname+"",L,S,P,D=r[1],m=[];for(let l=0;l<D.length;l+=1)m[l]=q(F(r,D,l));return{c(){e=h("main"),a=h("h1"),o=h("a"),i=V("Item CIT Generator"),y=O(),v=h("div"),E=O(),c=h("form"),u=h("div");for(let l=0;l<m.length;l+=1)m[l].c();R=O(),B=h("div"),U=O(),I=h("div"),_=h("input"),k=O(),d=h("p"),L=V(w),this.h()},l(l){e=p(l,"MAIN",{});var b=g(e);a=p(b,"H1",{class:!0});var n=g(a);o=p(n,"A",{class:!0,href:!0});var $=g(o);i=j($,"Item CIT Generator"),$.forEach(f),n.forEach(f),y=x(b),v=p(b,"DIV",{class:!0}),g(v).forEach(f),E=x(b),c=p(b,"FORM",{autocomplete:!0});var N=g(c);u=p(N,"DIV",{class:!0});var A=g(u);for(let T=0;T<m.length;T+=1)m[T].l(A);A.forEach(f),R=x(N),B=p(N,"DIV",{class:!0}),g(B).forEach(f),U=x(N),I=p(N,"DIV",{class:!0});var G=g(I);_=p(G,"INPUT",{class:!0,type:!0,name:!0}),G.forEach(f),k=x(N),d=p(N,"P",{});var M=g(d);L=j(M,w),M.forEach(f),N.forEach(f),b.forEach(f),this.h()},h(){s(o,"class","linkto"),s(o,"href","/"),s(a,"class","box-inner"),s(v,"class","linebreak"),s(u,"class","labelcontainer"),s(B,"class","linebreak"),s(_,"class","submit"),s(_,"type","button"),s(_,"name","submit"),_.value="Submit",s(I,"class","labelgroup submit"),s(c,"autocomplete","off")},m(l,b){H(l,e,b),t(e,a),t(a,o),t(o,i),t(e,y),t(e,v),t(e,E),t(e,c),t(c,u);for(let n=0;n<m.length;n+=1)m[n].m(u,null);t(c,R),t(c,B),t(c,U),t(c,I),t(I,_),t(c,k),t(c,d),t(d,L),S||(P=z(_,"click",r[2]),S=!0)},p(l,[b]){if(b&2){D=l[1];let n;for(n=0;n<D.length;n+=1){const $=F(l,D,n);m[n]?m[n].p($,b):(m[n]=q($),m[n].c(),m[n].m(u,null))}for(;n<m.length;n+=1)m[n].d(1);m.length=D.length}b&1&&w!==(w=l[0].displayname+"")&&Q(L,w)},i:C,o:C,d(l){l&&f(e),X(m,l),S=!1,P()}}}function Z(r,e,a){var o=new Blob([r],{type:a});if(window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(o,e);else{var i=document.createElement("a"),y=URL.createObjectURL(o);i.href=y,i.download=e,document.body.appendChild(i),i.click(),setTimeout(function(){document.body.removeChild(i),window.URL.revokeObjectURL(y)},0)}}async function ee(r){const a=await(await fetch(`https://raw.githubusercontent.com/NotEnoughUpdates/NotEnoughUpdates-REPO/master/items/${r}.json`,{method:"GET"})).json();return console.log(a),a}function te(r,e,a){const o=[{name:"iname",title:"Internal Name",placeholder:"END_SWORD"},{name:"txname",title:"Texture Name",placeholder:"texture.png"},{name:"fname",title:"File Name",placeholder:"texture.properties"}];let i={displayname:""};return[i,o,()=>ee(document.getElementById("iname").value).then(v=>{a(0,i=v),alert(JSON.stringify(i));const E=`texture=${document.getElementById("txname").value}
type=item
items=${v.itemid}
nbt.ExtraAttributes.id=${document.getElementById("iname").value}`;Z(E,document.getElementById("fname").value,"text")})]}class le extends J{constructor(e){super();K(this,e,te,Y,W,{})}}export{le as default};
