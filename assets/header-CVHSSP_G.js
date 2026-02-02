import{n as g}from"./vendor-BP42vfHS.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const b="favouriteExercises",E="quote",S="quote_time",P=864e5,M=e=>localStorage.setItem(b,JSON.stringify(e)),k=e=>{try{const t=localStorage.getItem(e);return t?JSON.parse(t):[]}catch(t){return console.error("Error parsing JSON:",t.message),[]}},_=e=>{const t=k(b).filter(s=>s._id!==e);M(t)};async function H(){return(await fetch("https://your-energy.b.goit.study/api/quote")).json()}let m=null;async function R(){if(m)return m;const e=localStorage.getItem(E),t=localStorage.getItem(S);return e&&t&&Date.now()-Number(t)<P?JSON.parse(e):(m=(async()=>{try{const s=await H();return localStorage.setItem(E,JSON.stringify(s)),localStorage.setItem(S,Date.now().toString()),s}catch(s){return console.error("Error fetching quote:",s),e?JSON.parse(e):{quote:"No quote available",author:""}}finally{m=null}})(),m)}const J=(e,t)=>`
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
`,Q=async e=>{const{quote:t,author:s}=await R();e.innerHTML=J(t,s)},v={root:document.querySelector(".scrollbar_custom"),quoteContainer:document.querySelector(".quote")};let a=1;const L=8,D=(e,t)=>{const s=(t-1)*L;return e.slice(s,s+L)},j=(e=[])=>{const t=new Set;return e.filter(s=>!(s!=null&&s._id)||t.has(s._id)?!1:(t.add(s._id),!0))};function W(){v.root.innerHTML=`
    <div class="no_cards_wrapper-container">
      <p class="no_cards_wrapper">
        It appears that you haven't added any exercises to your favorites yet.
        To get started, you can add exercises that you like to your favorites
        for easier access in the future.
      </p>
    </div>
  `}function U(e){return`
    <ul class="fav_card_list">
      ${e.map(({name:t,_id:s,burnedCalories:n,bodyPart:r,target:o,time:i=3})=>{let A=`${n} / ${i} min`;return`
            <li class="exercise-information" data-id-card="${s}">
              <div class="top-nav">
                <div>
                  <p class="tag">Workout</p>
                  <button
                    data-action="delete"
                    data-id="${s}"
                    class="trash-btn">
                    <svg width="16" height="16">
                      <use href="/home-task/icons.svg#icon-trash"></use>
                    </svg>
                  </button>
                </div>

                <button
                  data-action="start"
                  data-id="${s}"
                  class="details-link">
                  Start
                  <svg width="16" height="16">
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
                <li><span>Burned calories:</span> ${A}</li>
                <li><span>Body part:</span> ${r}</li>
                <li><span>Target:</span> ${o}</li>
              </ul>
            </li>
          `}).join("")}
    </ul>
  `}function Y(e){if(e<=1)return"";let t='<ul class="nav-buttons pagination">';const s=o=>`
    <li>
      <button
        class="pagination-btn ${o===a?"active":""}"
        data-page="${o}">
        ${o}
      </button>
    </li>
  `;let n=Math.max(1,a-1),r=Math.min(e,a+1);a===1&&(r=Math.min(e,3)),a===e&&(n=Math.max(1,e-2)),n>1&&(t+=s(1),n>2&&(t+='<li class="dots">...</li>'));for(let o=n;o<=r;o++)t+=s(o);return r<e&&(r<e-1&&(t+='<li class="dots">...</li>'),t+=s(e)),t+="</ul>",t}function p(){if(!v.root)return;const e=j(k(b)||[]);if(!e.length){W();return}const t=Math.ceil(e.length/L);a>t&&(a=t);const s=window.innerWidth<1440?D(e,a):e;v.root.innerHTML=U(s)+(window.innerWidth<1440?Y(t):"")}var $;($=v.root)==null||$.addEventListener("click",e=>{const t=e.target.closest('[data-action="delete"]'),s=e.target.closest('[data-action="start"]'),n=e.target.closest(".pagination-btn");if(t&&(_(t.dataset.id),p()),s){const o=(k(b)||[]).find(i=>i._id===s.dataset.id);o&&se(o,!0,!0)}if(n){const r=Number(n.dataset.page);r!==a&&(a=r,p())}});window.addEventListener("resize",()=>{a=1,p()});p();Q(v.quoteContainer);async function K(e,{email:t,rate:s,comment:n}){const r=`https://your-energy.b.goit.study/api/exercises/${e}/rating`;s=Number(s);const o=await fetch(r,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,rate:s,review:n})});if(!o.ok){const i=await o.json();throw new Error(i.message||"Rating failed")}return o.json()}const z=document.getElementById("form-close-btn"),y=document.querySelector(".backdrop"),G=document.querySelector(".backdrop-form"),N=document.querySelector("#user-email"),F=document.getElementById("user-comment"),V=document.querySelector(".form-send-btn"),X=document.querySelector(".rating-wrapper"),O=document.querySelector(".rating-star-value");let B=null;const c={rate:0,email:"",comment:""};V.disabled=!1;function Z(){N.value="",F.value="",c.rate=0,c.comment="",c.email="",O.textContent="0.0",document.querySelectorAll(".rating-star-icons").forEach(e=>{e.style.fill="var(--white-20)"})}function x(){y.classList.remove("is-open"),document.removeEventListener("keydown",C),typeof window.reopenExerciseModal=="function"&&window.reopenExerciseModal()}function C(e){e.key==="Escape"&&x()}z.addEventListener("click",x);y.addEventListener("click",e=>{e.target===y&&x()});X.addEventListener("click",e=>{if(!e.target.dataset.id)return;const t=document.querySelectorAll(".rating-star-icons");c.rate=Number(e.target.dataset.id),t.forEach((s,n)=>{s.style.fill=n<c.rate?"var(--star-color)":"var(--white-20)"}),O.textContent=`${c.rate}.0`});function ee(e){B=e,y.classList.add("is-open"),document.addEventListener("keydown",C)}G.addEventListener("submit",te);async function te(e){if(e.preventDefault(),c.email=N.value.trim(),c.comment=F.value.trim()||void 0,!c.rate){g.Notify.failure("Please select a rating");return}if(!c.email){g.Notify.failure("Please enter your email");return}try{await K(B,c),g.Notify.success("Your rating has been saved!"),Z(),x()}catch(t){g.Notify.failure(t.message||"Something went wrong")}}const l=document.querySelector(".exr-card-backdrop");let d=!1,u=[],q=JSON.parse(localStorage.getItem("favourite"));q&&q.forEach(e=>{u[0]||(u[0]=e),u.push(e)});function h(e){return`${e.charAt(0).toUpperCase()}${e.slice(1)}`}function f(e){e.key==="Escape"&&(l.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable"),document.removeEventListener("keydown",f))}function se(e,t=!1,s=!1){d=t,d||u.forEach(n=>{n._id===e._id&&(d=!0)}),oe(e),l.classList.add("card-is-open"),document.body.classList.add("not-scrollable"),document.addEventListener("keydown",f),d===!0&&(document.querySelector(".add-favourite-btn").innerHTML=`Remove from
          <svg class="heart-icon">
            <use href="/home-task/icons.svg#icon-heart"></use>
          </svg>`)}function oe(e,t){let s=e.rating;s%1===0&&(s+=".0"),s=parseFloat(s).toFixed(1);const n=`
    <div class="exr-card-cont">
      <button name="close" id="close-card" type="button" class="close-card-button">
      <svg class="close-card-icon"">
        <use href="/home-task/icons.svg#icon-x"></use>
      </svg>
      </button>
      <img src="${e.gifUrl}" alt="example-img" class="exr-image" />
      <div>
      <h3 class="exercise-name">${h(e.name)}</h3>
      <div class="rating-container">
        <ul class="star-rating-list">
          <li>
            <p class="rating-score">${s}</p>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/home-task/icons.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/home-task/icons.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/home-task/icons.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/home-task/icons.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/home-task/icons.svg#icon-star"></use>
            </svg>
          </li>
        </ul>
      </div>
      <div class="exr-information-container">
        <div class="exr-info-block">
          <p class="info-label">Target</p>
          <p class="exr-info" id="exr-target">${h(e.target)}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Body Part</p>
          <p class="exr-info" id="body-part">${h(e.bodyPart)}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Equipment</p>
          <p class="exr-info" id="exr-equip">${h(e.equipment)}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Popular</p>
          <p class="exr-info" id="exr-popularity">${e.popularity}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Burned Calories</p>
          <p class="exr-info" id="burned-cal">${e.burnedCalories}/${e.time} min</p>
        </div>
      </div>
      <p class="exr-description">${e.description}</p>
      <div class="buttons-cont">
        <button name="add-favorurite" class="add-favourite-btn">
          Add to favourites
          <svg class="heart-icon" width="20px" height="20px">
            <use href="/home-task/icons.svg#icon-heart"></use>
          </svg>
        </button>
        <button name="rating" class="give-rating-btn">Give a rating</button>
      </div>
    </div>`;l.innerHTML=n;const r=document.querySelectorAll(".star-rating-icon");for(let i=0;i<Math.round(e.rating);++i)r[i].style.fill="#eea10c";const o=document.querySelector(".add-favourite-btn");o.addEventListener("click",function(){d?(_(e._id),o.innerHTML=`Add to favourite
          <svg class="heart-icon" width="20px" height="20px">
            <use href="/home-task/icons.svg#icon-heart"></use>
          </svg>`,d=!1):(u.push(e),M(u),o.innerHTML=`Remove from
          <svg class="heart-icon" width="20px" height="20px">
            <use href="/home-task/icons.svg#icon-heart"></use>
          </svg>`,d=!0),p()}),document.getElementById("close-card").addEventListener("click",()=>{l.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable"),document.removeEventListener("keydown",f)}),l.addEventListener("click",i=>{i.target===l&&(l.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable"),document.removeEventListener("keydown",f))}),document.querySelector(".give-rating-btn").addEventListener("click",()=>{l.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable"),document.removeEventListener("keydown",f),ee(e._id)})}const re=document.querySelector(".open-mobile-menu-btn"),ne=document.querySelector(".close-mobile-menu-btn"),w=document.querySelector(".mobile-menu-wrapper"),ie=document.querySelector(".mobile-menu"),ae=document.querySelector(".header-nav-link-fav"),ce=document.querySelector(".header-nav-link-home"),le=document.currentScript,I=le.dataset.page;I==="fav"&&ae.classList.add("active");I==="home"&&ce.classList.add("active");re.addEventListener("click",()=>{w.classList.add("is-open"),document.body.classList.add("not-scrollable")});ne.addEventListener("click",()=>{T()});w.addEventListener("click",()=>{T()});ie.addEventListener("click",e=>{e.stopPropagation()});function T(){w.classList.remove("is-open"),document.body.classList.remove("not-scrollable")}export{Q as d,se as h};
//# sourceMappingURL=header-CVHSSP_G.js.map
