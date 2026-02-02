import{d as q,h as F}from"./assets/header-WssbBULz.js";import{n as u}from"./assets/vendor-BP42vfHS.js";const i={filters:document.querySelector(".filters"),navButtons:document.querySelector(".nav-buttons"),musclesBtn:document.querySelector(".muscles-btn"),exercisesTitle:document.querySelector(".exercises-title"),searchForm:document.querySelector(".search-form"),loadMoreBtn:document.querySelector(".load-more-btn"),quoteContainer:document.querySelector(".quote"),pagination:document.querySelector(".pagination"),exercises:document.querySelector(".exercises-div")};let B=window.innerWidth<768?9:12,C=window.innerWidth<768?8:10,a=1,d="Muscles",b="Muscles",$="",g="",y="",p=[];q(i.quoteContainer);x();i.musclesBtn.classList.add("active-btn");i.filters.addEventListener("click",H);i.exercises.addEventListener("click",j);i.searchForm.addEventListener("submit",I);var S;(S=i.loadMoreBtn)==null||S.addEventListener("click",loadMore);function f(e){const t=e.trim();return t[0].toUpperCase()+t.slice(1)}async function x(e=!0){e&&(a=1,i.exercises.innerHTML="");let t=`https://your-energy.b.goit.study/api/filters?filter=${d}&page=${a}&limit=${B}`;b.trim()&&(t+=`&name=${b}`);const r=await(await fetch(t)).json();if(!r.results.length){L();return}N(r.results),E(r.totalPages)}function N(e){const t=`
    <ul class="exercises">
      ${e.map(({name:s,filter:r,imgURL:n})=>`
            <li class="exercise">
              <img
                src="${n}?w=290&h=242"
                srcset="
                  ${n}?w=335&h=225 335w,
                  ${n}?w=225&h=225 225w,
                  ${n}?w=290&h=242 290w
                "
                sizes="(max-width: 767px) 335px,
                       (min-width: 768px) and (max-width: 1439px) 225px,
                       290px"
                alt="${s}"
                loading="lazy"
                class="exercise-image"
              />

              <div class="exercise-info">
                <h2 class="exercise-subtitle">
                  ${s[0].toUpperCase()+s.slice(1)}
                </h2>
                <p class="exercise-filter">${r}</p>
              </div>
            </li>
          `).join("")}
    </ul>
    <ul class="nav-buttons pagination" id="pagination-container"></ul>
  `;i.exercises.insertAdjacentHTML("beforeend",t)}function H(e){var t;e.target.tagName==="BUTTON"&&((t=document.querySelector(".active-btn"))==null||t.classList.remove("active-btn"),e.target.classList.add("active-btn"),e.target.classList.contains("muscles-btn")?d="Muscles":e.target.classList.contains("bodyparts-btn")?d="Body parts":e.target.classList.contains("equipment-btn")&&(d="Equipment"),i.exercisesTitle.textContent="Exercises",i.searchForm.style.display="none",x(!0))}async function j(e){const t=e.target.closest(".exercise");if(!t)return;const s=t.querySelector(".exercise-filter"),r=t.querySelector(".exercise-subtitle");!s||!r||(g=s.textContent,y=r.textContent.toLowerCase(),i.exercisesTitle.innerHTML=`
    <ul class="exercises-title">
      Exercises / <span>${f(y)}</span>
    </ul>
  `,i.searchForm.style.display="block",a=1,i.exercises.innerHTML="",await v())}async function v(e=!0){e&&(p=[]);let t=g.toLowerCase();t==="body parts"&&(t="bodypart");const s=`
    https://your-energy.b.goit.study/api/exercises?
    ${t}=${y}
    &keyword=${$}
    &page=${a}
    &limit=${C}
  `.replace(/\s+/g,""),n=await(await fetch(s)).json();if(!n.results.length){L();return}p=n.results,A(n.results),E(n.totalPages)}async function A(e){i.exercises.innerHTML="",p=e;const t=`
    <ul class="exercises-cards">
      ${e.map(({name:s,_id:r,rating:n,burnedCalories:l,bodyPart:c,target:T,time:M})=>{let k=`${l} / ${M} min`;return n%1===0&&(n+=".0"),n=parseFloat(n).toFixed(1),`
              <li class="exercise-information" data-id-card="${r}">
                <div class="top-nav">
                  <div>
                    <p class="tag">Workout</p>
                    <span class="rating">
                      ${n}
                      <svg class="star-icon" width="14" height="14">
                        <use href="/home-task/icons.svg#icon-star"></use>
                      </svg>
                    </span>
                  </div>
                  <button
                    name="start"
                    data-action="start"
                    data-id="${r}"
                    class="details-link">
                    Start
                    <svg class="arrow-icon" width="16" height="16">
                      <use href="/home-task/icons.svg#icon-arrow"></use>
                    </svg>
                  </button>
                </div>

                <div class="exercise-header">
                  <svg class="icon-man" fill="white" width="24" height="24">
                    <use href="/home-task/icons.svg#icon-run"></use>
                  </svg>
                  <h2 class="exercise-name">
                    ${f(s)}
                  </h2>
                </div>

                <ul class="exercise-details">
                  <li>
                    <span>Burned calories:</span>
                    ${k}
                  </li>
                  <li>
                    <span>Body part:</span>
                    ${f(c)}
                  </li>
                  <li>
                    <span>Target:</span>
                    ${f(T)}
                  </li>
                </ul>
              </li>
            `}).join("")}
    </ul>
    <ul class="nav-buttons pagination" id="pagination-container"></ul>
  `;i.exercises.insertAdjacentHTML("beforeend",t)}function I(e){e.preventDefault(),$=i.searchForm.elements.searchQuery.value.trim().toLowerCase(),a=1,v(!0)}function E(e){const t=document.querySelector("#pagination-container");if(!t)return;if(e<=1){t.innerHTML="";return}let s="";const r=c=>`
    <li>
      <button
        class="pagination-btn ${c===a?"active":""}"
        data-page="${c}">
        ${c}
      </button>
    </li>
  `;let n=Math.max(1,a-1),l=Math.min(e,a+1);a===1&&(l=Math.min(e,3)),a===e&&(n=Math.max(1,e-2)),n>1&&(s+=r(1),n>2&&e>4&&(s+='<li class="dots">...</li>'));for(let c=n;c<=l;c++)s+=r(c);l<e&&(l<e-1&&e>4&&(s+='<li class="dots">...</li>'),s+=r(e)),t.innerHTML=s}i.exercises.addEventListener("click",e=>{const t=e.target.closest(".pagination-btn");if(!t)return;const s=Number(t.dataset.page);s!==a&&(a=s,i.exercises.innerHTML="",g?v(!1):x(!1))});i.exercises.addEventListener("click",e=>{const t=e.target.closest('[data-action="start"]');if(!t)return;const s=p.find(r=>r._id===t.dataset.id);F(s)});function L(){var e;i.exercises.innerHTML=`
    <p class="no-results-paragraph">
      Unfortunately, <span>no results</span> were found.
    </p>
  `,(e=i.loadMoreBtn)==null||e.style.setProperty("display","none"),i.pagination&&(i.pagination.innerHTML="")}async function _(e){const t=await fetch("https://your-energy.b.goit.study/api/subscription",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})});if(t.status===409)throw new Error("EMAIL_EXISTS");if(!t.ok)throw new Error("REQUEST_FAILED");return await t.json()}const o=document.querySelector("input[name=email]"),m=document.querySelector(".footer-send-button"),w="feedback-form-state";function h(e){return/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(e)}function O(){localStorage.setItem(w,JSON.stringify({email:o.value}))}function W(){const e=localStorage.getItem(w);if(!e)return;const{email:t}=JSON.parse(e);o.value=t||"",m.disabled=!h(o.value)}W();o.addEventListener("input",()=>{O(),m.disabled=!h(o.value)});o.addEventListener("change",()=>{h(o.value)||u.Notify.failure("Please enter a valid email address")});m.addEventListener("click",async e=>{if(e.preventDefault(),!h(o.value)){u.Notify.failure("Please enter a valid email address");return}try{await _(o.value),u.Notify.success("Success! Welcome to energy.flow world!"),o.value="",m.disabled=!0,localStorage.removeItem(w)}catch(t){t.message==="EMAIL_EXISTS"?u.Notify.warning("This email is already subscribed"):u.Notify.failure("Something went wrong! Please try again later")}});
//# sourceMappingURL=index.js.map
