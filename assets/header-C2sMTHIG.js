import{n as g}from"./vendor-BP42vfHS.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();const d="favouriteExercises",L="quote",x="quote_time",P=864e5,$=e=>localStorage.setItem(d,JSON.stringify(e)),m=e=>{try{const t=localStorage.getItem(e);return t?JSON.parse(t):[]}catch(t){return console.error("Error parsing JSON:",t.message),[]}},_=e=>{const t=m(d).filter(s=>s._id!==e);$(t)};async function R(){return(await fetch("https://your-energy.b.goit.study/api/quote")).json()}let u=null;async function H(){if(u)return u;const e=localStorage.getItem(L),t=localStorage.getItem(x);return e&&t&&Date.now()-Number(t)<P?JSON.parse(e):(u=(async()=>{try{const s=await R();return localStorage.setItem(L,JSON.stringify(s)),localStorage.setItem(x,Date.now().toString()),s}catch(s){return console.error("Error fetching quote:",s),e?JSON.parse(e):{quote:"No quote available",author:""}}finally{u=null}})(),u)}const Q=(e,t)=>`
  <svg width="32" height="32" class="quote-text-icon">
    <use href="/home-task/icons.svg#icon-run"></use>
  </svg>
  <div>
    <h3 class="main-quote-title">Quote of the day</h3>
    <p class="main-quote-text">${e}</p>
    <p class="main-quote-author">${t}</p>
    <svg width="24" height="24" class="quote-text-icon-commas">
      <use href="/home-task/icons.svg#icon-commas"></use>
    </svg>
  </div>
`,J=async e=>{const{quote:t,author:s}=await H();e.innerHTML=Q(t,s)},p={root:document.querySelector(".scrollbar_custom"),quoteContainer:document.querySelector(".quote")};let l=1;const S=8,D=(e,t)=>{const s=(t-1)*S;return e.slice(s,s+S)},j=(e=[])=>{const t=new Set;return e.filter(s=>!(s!=null&&s._id)||t.has(s._id)?!1:(t.add(s._id),!0))};function W(){p.root.innerHTML=`
    <div class="no_cards_wrapper-container">
      <p class="no_cards_wrapper">
        It appears that you haven't added any exercises to your favorites yet.
        To get started, you can add exercises that you like to your favorites
        for easier access in the future.
      </p>
    </div>
  `}function U(e){return`
    <ul class="fav_card_list">
      ${e.map(({name:t,_id:s,burnedCalories:r,bodyPart:n,target:o,time:i=3})=>`
          <li class="exercise-information" data-id-card="${s}">
            <div class="top-nav">
              <div>
                <p class="tag">Workout</p>
                <button data-action="delete" data-id="${s}" class="trash-btn">
                  <svg width="16" height="16" class="trash-icon">
                    <use href="/home-task/icons.svg#icon-trash"></use>
                  </svg>
                </button>
              </div>

              <button data-action="start" data-id="${s}" class="details-link">
                Start
                <svg width="16" height="16" class="arrow-icon">
                  <use href="/home-task/icons.svg#icon-arrow"></use>
                </svg>
              </button>
            </div>

            <div class="exercise-header">
              <svg width="24" height="24">
                <use href="/home-task/icons.svg#icon-run"></use>
              </svg>
              <h2 class="exercise-name">${t}</h2>
            </div>

            <ul class="exercise-details">
              <li><span>Burned calories:</span> ${r} / ${i} min</li>
              <li><span>Body part:</span> ${n}</li>
              <li><span>Target:</span> ${o}</li>
            </ul>
          </li>
        `).join("")}
    </ul>
  `}function Y(e){if(e<=1)return"";let t='<ul class="nav-buttons pagination">';const s=o=>`
    <li>
      <button class="pagination-btn ${o===l?"active":""}" data-page="${o}">
        ${o}
      </button>
    </li>
  `;let r=Math.max(1,l-1),n=Math.min(e,l+1);l===1&&(n=Math.min(e,3)),l===e&&(r=Math.max(1,e-2)),r>1&&(t+=s(1),r>2&&(t+='<li class="dots">...</li>'));for(let o=r;o<=n;o++)t+=s(o);return n<e&&(n<e-1&&(t+='<li class="dots">...</li>'),t+=s(e)),t+="</ul>",t}function v(){if(!p.root)return;const e=j(m(d));if(!e.length){W();return}const t=Math.ceil(e.length/S);l>t&&(l=t);const s=window.innerWidth<1440?D(e,l):e;p.root.innerHTML=U(s)+(window.innerWidth<1440?Y(t):"")}var q;(q=p.root)==null||q.addEventListener("click",e=>{const t=e.target.closest('[data-action="delete"]'),s=e.target.closest('[data-action="start"]'),r=e.target.closest(".pagination-btn");if(t&&(_(t.dataset.id),v()),s){const o=m(d).find(i=>i._id===s.dataset.id);o&&se(o,!0,!0)}r&&(l=Number(r.dataset.page),v())});window.addEventListener("resize",()=>{l=1,v()});v();J(p.quoteContainer);async function G(e,{email:t,rate:s,comment:r}){const n=`https://your-energy.b.goit.study/api/exercises/${e}/rating`;s=Number(s);const o=await fetch(n,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,rate:s,review:r})});if(!o.ok){const i=await o.json();throw new Error(i.message||"Rating failed")}return o.json()}const K=document.getElementById("form-close-btn"),b=document.querySelector(".backdrop"),z=document.querySelector(".backdrop-form"),M=document.querySelector("#user-email"),N=document.getElementById("user-comment"),V=document.querySelector(".form-send-btn"),X=document.querySelector(".rating-wrapper"),F=document.querySelector(".rating-star-value");let B=null;const a={rate:0,email:"",comment:""};V.disabled=!1;function Z(){M.value="",N.value="",a.rate=0,a.comment="",a.email="",F.textContent="0.0",document.querySelectorAll(".rating-star-icons").forEach(e=>{e.style.fill="var(--white-20)"})}function E(){b.classList.remove("is-open"),document.removeEventListener("keydown",C),typeof window.reopenExerciseModal=="function"&&window.reopenExerciseModal()}function C(e){e.key==="Escape"&&E()}K.addEventListener("click",E);b.addEventListener("click",e=>{e.target===b&&E()});X.addEventListener("click",e=>{if(!e.target.dataset.id)return;const t=document.querySelectorAll(".rating-star-icons");a.rate=Number(e.target.dataset.id),t.forEach((s,r)=>{s.style.fill=r<a.rate?"var(--star-color)":"var(--white-20)"}),F.textContent=`${a.rate}.0`});function ee(e){B=e,b.classList.add("is-open"),document.addEventListener("keydown",C)}z.addEventListener("submit",te);async function te(e){if(e.preventDefault(),a.email=M.value.trim(),a.comment=N.value.trim()||void 0,!a.rate){g.Notify.failure("Please select a rating");return}if(!a.email){g.Notify.failure("Please enter your email");return}try{await G(B,a),g.Notify.success("Your rating has been saved!"),Z(),E()}catch(t){g.Notify.failure(t.message||"Something went wrong")}}const f=document.querySelector(".exr-card-backdrop");function h(e){return`${e.charAt(0).toUpperCase()}${e.slice(1)}`}function O(e){e.key==="Escape"&&y()}function y(){f.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable"),document.removeEventListener("keydown",O)}function se(e,t=!1,s=!1){oe(e),f.classList.add("card-is-open"),document.body.classList.add("not-scrollable"),document.addEventListener("keydown",O)}function oe(e){let s=m(d).some(c=>c._id===e._id),r=e.rating;r%1===0&&(r+=".0"),r=parseFloat(r).toFixed(1);const n=`
    <div class="exr-card-cont">
      <button name="close" id="close-card" type="button" class="close-card-button">
        <svg class="close-card-icon">
          <use href="/home-task/icons.svg#icon-x"></use>
        </svg>
      </button>

      <img src="${e.gifUrl}" alt="example-img" class="exr-image" />

      <div>
        <h3 class="exercise-name">${h(e.name)}</h3>

        <div class="rating-container">
          <ul class="star-rating-list">
            <li><p class="rating-score">${r}</p></li>
            ${'<li><svg class="star-rating-icon" width="14" height="14"><use href="/home-task/icons.svg#icon-star"></use></svg></li>'.repeat(5)}
          </ul>
        </div>

        <div class="exr-information-container">
          <div class="exr-info-block">
            <p class="info-label">Target</p>
            <p class="exr-info">${h(e.target)}</p>
          </div>
          <div class="exr-info-block">
            <p class="info-label">Body Part</p>
            <p class="exr-info">${h(e.bodyPart)}</p>
          </div>
          <div class="exr-info-block">
            <p class="info-label">Equipment</p>
            <p class="exr-info">${h(e.equipment)}</p>
          </div>
          <div class="exr-info-block">
            <p class="info-label">Popular</p>
            <p class="exr-info">${e.popularity}</p>
          </div>
          <div class="exr-info-block">
            <p class="info-label">Burned Calories</p>
            <p class="exr-info">${e.burnedCalories}/${e.time} min</p>
          </div>
        </div>

        <p class="exr-description">${e.description}</p>

        <div class="buttons-cont">
          <button class="add-favourite-btn"></button>
          <button class="give-rating-btn">Give a rating</button>
        </div>
      </div>
    </div>
  `;f.innerHTML=n;const o=document.querySelectorAll(".star-rating-icon");for(let c=0;c<Math.round(e.rating);c++)o[c].style.fill="#eea10c";const i=document.querySelector(".add-favourite-btn"),k=()=>{i.innerHTML=s?`Remove from
        <svg class="heart-icon">
          <use href="/home-task/icons.svg#icon-heart"></use>
        </svg>`:`Add to favourites
        <svg class="heart-icon">
          <use href="/home-task/icons.svg#icon-heart"></use>
        </svg>`};k(),i.addEventListener("click",()=>{const c=m(d);c.some(A=>A._id===e._id)?(_(e._id),s=!1):($([...c,e]),s=!0),k(),v()}),document.getElementById("close-card").addEventListener("click",y),f.onclick=c=>{c.target===f&&y()},document.querySelector(".give-rating-btn").addEventListener("click",()=>{y(),ee(e._id)})}const ne=document.querySelector(".open-mobile-menu-btn"),re=document.querySelector(".close-mobile-menu-btn"),w=document.querySelector(".mobile-menu-wrapper"),ie=document.querySelector(".mobile-menu"),ae=document.querySelector(".header-nav-link-fav"),ce=document.querySelector(".header-nav-link-home"),I=window.PAGE;I==="fav"&&ae.classList.add("active");I==="home"&&ce.classList.add("active");ne.addEventListener("click",()=>{w.classList.add("is-open"),document.body.classList.add("not-scrollable")});re.addEventListener("click",()=>{T()});w.addEventListener("click",()=>{T()});ie.addEventListener("click",e=>{e.stopPropagation()});function T(){w.classList.remove("is-open"),document.body.classList.remove("not-scrollable")}export{J as d,se as h};
//# sourceMappingURL=header-C2sMTHIG.js.map
