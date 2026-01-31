(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();const v="favouriteExercises",b="quote",x="quote_time",N=864e5,L=e=>localStorage.setItem(v,JSON.stringify(e)),y=e=>{try{const t=localStorage.getItem(e);return t?JSON.parse(t):[]}catch(t){return console.error("Error parsing JSON:",t.message),[]}},k=e=>{const t=y(v).filter(s=>s._id!==e);L(t)};async function M(){return(await fetch("https://your-energy.b.goit.study/api/quote")).json()}async function O(){const e=localStorage.getItem(b),t=localStorage.getItem(x);if(e&&t&&Date.now()-Number(t)<N)return JSON.parse(e);try{const s=await M();return localStorage.setItem(b,JSON.stringify(s)),localStorage.setItem(x,Date.now().toString()),s}catch(s){return console.error("Error fetching quote:",s),e?JSON.parse(e):{quote:"No quote available",author:""}}}const F=(e,t)=>`
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
`,T=async e=>{const{quote:t,author:s}=await O();e.innerHTML=F(t,s)},g={root:document.querySelector(".scrollbar_custom"),quoteContainer:document.querySelector(".quote")};let n=1;const h=8,B=(e,t)=>{const s=(t-1)*h;return e.slice(s,s+h)},C=(e=[])=>{const t=new Set;return e.filter(s=>!(s!=null&&s._id)||t.has(s._id)?!1:(t.add(s._id),!0))};function A(){g.root.innerHTML=`
    <div class="no_cards_wrapper-container">
      <p class="no_cards_wrapper">
        It appears that you haven't added any exercises to your favorites yet.
        To get started, you can add exercises that you like to your favorites
        for easier access in the future.
      </p>
    </div>
  `}function P(e){return`
    <ul class="fav_card_list">
      ${e.map(({name:t,_id:s,burnedCalories:i,bodyPart:o,target:r,time:a=3})=>{let I=`${i} / ${a} min`;return`
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
                <li><span>Burned calories:</span> ${I}</li>
                <li><span>Body part:</span> ${o}</li>
                <li><span>Target:</span> ${r}</li>
              </ul>
            </li>
          `}).join("")}
    </ul>
  `}function H(e){if(e<=1)return"";let t='<ul class="nav-buttons pagination">';const s=r=>`
    <li>
      <button
        class="pagination-btn ${r===n?"active":""}"
        data-page="${r}">
        ${r}
      </button>
    </li>
  `;let i=Math.max(1,n-1),o=Math.min(e,n+1);n===1&&(o=Math.min(e,3)),n===e&&(i=Math.max(1,e-2)),i>1&&(t+=s(1),i>2&&(t+='<li class="dots">...</li>'));for(let r=i;r<=o;r++)t+=s(r);return o<e&&(o<e-1&&(t+='<li class="dots">...</li>'),t+=s(e)),t+="</ul>",t}function p(){if(!g.root)return;const e=C(y(v)||[]);if(!e.length){A();return}const t=Math.ceil(e.length/h);n>t&&(n=t);const s=window.innerWidth<1440?B(e,n):e;g.root.innerHTML=P(s)+(window.innerWidth<1440?H(t):"")}var w;(w=g.root)==null||w.addEventListener("click",e=>{const t=e.target.closest('[data-action="delete"]'),s=e.target.closest('[data-action="start"]'),i=e.target.closest(".pagination-btn");if(t&&(k(t.dataset.id),p()),s){const r=(y(v)||[]).find(a=>a._id===s.dataset.id);r&&K(r,!0,!0)}if(i){const o=Number(i.dataset.page);o!==n&&(n=o,p())}});window.addEventListener("resize",()=>{n=1,p()});p();T(g.quoteContainer);async function J(e,{email:t,rate:s,comment:i}){const o=`https://your-energy.b.goit.study/api/exercises/${e}/rating`;s=Number(s);const r=await fetch(o,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,rate:s,review:i})});if(!r.ok){const a=await r.json();throw new Error(a.message||"Rating failed")}return r.json()}const Q=document.getElementById("form-close-btn"),u=document.querySelector(".backdrop"),q=document.querySelector("#user-email"),E=document.getElementById("user-comment"),R=document.querySelector(".form-send-btn"),j=document.querySelector(".rating-wrapper"),$=document.querySelector(".rating-star-value"),D=document.querySelector(".backdrop-form");let _=null;const c={rate:0,email:"",comment:""};R.disabled=!1;function U(){q.value="",E.value="",c.rate=0,c.comment="",c.email="",$.textContent="0.0",document.querySelectorAll(".rating-star-icons").forEach(t=>{t.style.fill="var(--white-20)"})}Q.addEventListener("click",()=>{u.classList.remove("is-open")});u.addEventListener("click",e=>{e.target===u&&u.classList.remove("is-open")});j.addEventListener("click",e=>{const t=document.querySelectorAll(".rating-star-icons");if(e.target.dataset.id){c.rate=Number(e.target.dataset.id);for(let s=0;s<5;s++)t[s].style.fill=s<c.rate?"var(--star-color)":"var(--white-20)";$.textContent=`${c.rate}.0`}});function W(e){_=e,u.classList.add("is-open")}D.addEventListener("submit",Y);async function Y(e){if(e.preventDefault(),c.email=q.value.trim(),c.comment=E.value.trim()||void 0,!c.rate){alert("Please select a rating");return}if(!c.email){alert("Please enter your email");return}try{await J(_,c),alert("Your rating is accepted"),U(),u.classList.remove("is-open")}catch(t){alert(`Error: ${t.message}`)}}const l=document.querySelector(".exr-card-backdrop");let d=!1,f=[],S=JSON.parse(localStorage.getItem("favourite"));S&&S.forEach(e=>{f[0]||(f[0]=e),f.push(e)});function m(e){return`${e.charAt(0).toUpperCase()}${e.slice(1)}`}function K(e,t=!1,s=!1){d=t,d||f.forEach(i=>{i._id===e._id&&(d=!0)}),z(e),l.classList.add("card-is-open"),document.body.classList.add("not-scrollable"),d===!0&&(document.querySelector(".add-favourite-btn").innerHTML=`Remove from
          <svg class="heart-icon">
            <use href="/js_university_projectNew/icons.svg#icon-heart"></use>
          </svg>`)}function z(e,t){let s=e.rating;s%1===0&&(s+=".0"),s=parseFloat(s).toFixed(1);const i=`
    <div class="exr-card-cont">
      <button name="close" id="close-card" type="button" class="close-card-button">
      <svg class="close-card-icon"">
        <use href="/home-task/icons.svg#icon-x"></use>
      </svg>
      </button>
      <img src="${e.gifUrl}" alt="example-img" class="exr-image" />
      <div>
      <h3 class="exercise-name">${m(e.name)}</h3>
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
          <p class="exr-info" id="exr-target">${m(e.target)}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Body Part</p>
          <p class="exr-info" id="body-part">${m(e.bodyPart)}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Equipment</p>
          <p class="exr-info" id="exr-equip">${m(e.equipment)}</p>
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
    </div>`;l.innerHTML=i;const o=document.querySelectorAll(".star-rating-icon");for(let a=0;a<Math.round(e.rating);++a)o[a].style.fill="#eea10c";const r=document.querySelector(".add-favourite-btn");r.addEventListener("click",function(){d?(k(e._id),r.innerHTML=`Add to favourite
          <svg class="heart-icon" width="20px" height="20px">
            <use href="/home-task/icons.svg#icon-heart"></use>
          </svg>`,d=!1):(f.push(e),L(f),r.innerHTML=`Remove from
          <svg class="heart-icon" width="20px" height="20px">
            <use href="/home-task/icons.svg#icon-heart"></use>
          </svg>`,d=!0),p()}),document.getElementById("close-card").addEventListener("click",()=>{l.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable")}),l.addEventListener("click",a=>{a.target===l&&(l.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable"))}),document.querySelector(".give-rating-btn").addEventListener("click",()=>{l.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable"),W(e._id)})}export{T as d,K as h};
//# sourceMappingURL=exercises_card-K8mKdohk.js.map
