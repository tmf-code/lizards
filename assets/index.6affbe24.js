var g=Object.defineProperty;var v=(r,e,n)=>e in r?g(r,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[e]=n;var w=(r,e,n)=>(v(r,typeof e!="symbol"?e+"":e,n),n);import{V as m,P as y,S as M,R as b,E as z,C as E,a as P,G as L,W,A as R,s as O,O as S,c as h}from"./vendor.cd371a89.js";const C=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))p(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&p(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerpolicy&&(i.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?i.credentials="include":t.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function p(t){if(t.ep)return;t.ep=!0;const i=n(t);fetch(t.href,i)}};C();var H="https://tmf-code.github.io/lizards/assets/lizard2.0c9288ba.glb",I="https://tmf-code.github.io/lizards/assets/venice_sunset_1k.0e72ed46.hdr";let o,d,s;var a=new m;class N{constructor(){w(this,"pos",new m);window.addEventListener("mousemove",e=>{a.set(e.clientX/window.innerWidth*2-1,-(e.clientY/window.innerHeight)*2+1,.5),a.unproject(o),a.sub(o.position).normalize();var n=-o.position.z/a.z;this.pos.copy(o.position).add(a.multiplyScalar(n))}),window.addEventListener("touchmove",e=>{a.set(e.touches[0].clientX/window.innerWidth*2-1,-(e.touches[0].clientY/window.innerHeight)*2+1,.5),a.unproject(o),a.sub(o.position).normalize();var n=-o.position.z/a.z;this.pos.copy(o.position).add(a.multiplyScalar(n))})}}const u=new N;function f(){var r;if(u){const e=o.position.length(),n=d.getObjectByName("Neck");n&&(n.rotation.z=h(-(u.pos.x*Math.PI/window.innerWidth*1024)/2/e,-Math.PI,0),n.rotation.x=h(-(u.pos.y*Math.PI/window.innerWidth*1024)/2/e+Math.PI/4,-Math.PI/2,Math.PI/2)),(r=d.getObjectByName("Head"))==null||r.lookAt(u.pos)}l(),requestAnimationFrame(f)}function j(){const r=document.createElement("div");document.body.appendChild(r),o=new y(45,window.innerWidth/window.innerHeight,.25,20),o.position.set(-1.8,.6,2.7),d=new M,new b().load(I,function(n){n.mapping=z,d.background=new E(0,.5,1),d.environment=n,l();const p=new P(s);new L().load(H,function(i){i.scene.traverse(function(c){c.isMesh&&p.generateMipmaps(c.material)}),i.scene.scale.set(.2,.2,.2),d.add(i.scene),p.dispose(),l()})}),s=new W({antialias:!0}),s.setPixelRatio(window.devicePixelRatio),s.setSize(window.innerWidth,window.innerHeight),s.toneMapping=R,s.toneMappingExposure=1,s.outputEncoding=O,r.appendChild(s.domElement);const e=new S(o,s.domElement);e.addEventListener("change",l),e.minDistance=2,e.maxDistance=10,e.target.set(0,0,-.2),e.update(),window.addEventListener("resize",x),f()}function x(){o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix(),s.setSize(window.innerWidth,window.innerHeight),l()}function l(){s.render(d,o)}j();l();