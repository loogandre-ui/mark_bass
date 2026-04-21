(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.querySelector(`#menu-toggle`),t=document.querySelector(`#mobile-menu`),n=document.querySelector(`#menu-icon-open`),r=document.querySelector(`#menu-icon-close`);function i(){!t||!e||(t.classList.add(`hidden`),n?.classList.remove(`hidden`),r?.classList.add(`hidden`),e.setAttribute(`aria-expanded`,`false`))}function a(){!t||!e||(t.classList.remove(`hidden`),n?.classList.add(`hidden`),r?.classList.remove(`hidden`),e.setAttribute(`aria-expanded`,`true`))}e&&t&&(e.addEventListener(`click`,()=>{t.classList.contains(`hidden`)?a():i()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&i()}),t.querySelectorAll(`a`).forEach(e=>{e.addEventListener(`click`,()=>{i()})}),window.addEventListener(`resize`,()=>{window.innerWidth>=768&&i()}));var o=document.querySelector(`#theme-toggle`),s=document.querySelector(`#theme-icon-dark`),c=document.querySelector(`#theme-icon-light`);function l(e){document.documentElement.dataset.theme=e,localStorage.setItem(`theme`,e),e===`light`?(s?.classList.add(`hidden`),c?.classList.remove(`hidden`)):(s?.classList.remove(`hidden`),c?.classList.add(`hidden`))}l(localStorage.getItem(`theme`)||`dark`),o?.addEventListener(`click`,()=>{l(document.documentElement.dataset.theme===`dark`?`light`:`dark`)});var u=document.querySelector(`#contact-form`);if(u){let e=document.querySelector(`#name`),t=document.querySelector(`#email`),n=document.querySelector(`#message`),r=document.querySelector(`#name-error`),i=document.querySelector(`#email-error`),a=document.querySelector(`#message-error`);function o(e,t){t.classList.remove(`hidden`),e.setAttribute(`aria-invalid`,`true`)}function s(e,t){t.classList.add(`hidden`),e.setAttribute(`aria-invalid`,`false`)}function c(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}u.addEventListener(`submit`,l=>{let u=!0;e.value.trim()?s(e,r):(o(e,r),u=!1),c(t.value)?s(t,i):(o(t,i),u=!1),n.value.trim()?s(n,a):(o(n,a),u=!1),u||l.preventDefault()})}var d=document.querySelector(`#github-username`),f=document.querySelector(`#github-load-btn`),p=document.querySelector(`#github-status`),m=document.querySelector(`#github-repos`);function h(e,t=`default`){p&&(p.textContent=e,p.className=`rounded-xl border px-4 py-3 text-sm`,t===`loading`?p.classList.add(`border-line`,`bg-panel/60`,`text-muted`):t===`error`?p.classList.add(`border-red-500/30`,`bg-red-500/10`,`text-red-400`):t===`success`?p.classList.add(`border-emerald-500/30`,`bg-emerald-500/10`,`text-emerald-400`):p.classList.add(`border-line`,`bg-panel/60`,`text-muted`))}function g(e){m&&(m.innerHTML=``,e.forEach(e=>{let t=document.createElement(`article`);t.className=`card-surface p-5`,t.innerHTML=`
      <div class="flex items-start justify-between gap-4">
        <div>
          <h3 class="font-heading text-xl font-black uppercase">
            <a
              href="${e.html_url}"
              target="_blank"
              rel="noopener noreferrer"
              class="transition hover:text-primary"
            >
              ${e.name}
            </a>
          </h3>
          <p class="mt-2 text-sm leading-6 text-muted">
            ${e.description?e.description:`Kirjeldus puudub.`}
          </p>
        </div>
        <span class="rounded-full border border-line px-3 py-1 text-xs text-muted">
          ${e.language?e.language:`Puudub`}
        </span>
      </div>

      <div class="mt-4 flex flex-wrap gap-4 text-xs text-muted">
        <span>⭐ Tähti: ${e.stargazers_count}</span>
        <span>🍴 Forke: ${e.forks_count}</span>
        <span>👀 Vaadatud: ${e.watchers_count}</span>
      </div>
    `,m.appendChild(t)}))}async function _(){let e=d?.value.trim();if(!e){h(`Palun sisesta GitHubi kasutajanimi.`,`error`),m.innerHTML=``;return}h(`Laadimine käib...`,`loading`),m.innerHTML=``;try{let t=await fetch(`https://api.github.com/users/${e}/repos?sort=updated&per_page=6`);if(!t.ok)throw t.status===404?Error(`Seda GitHubi kasutajat ei leitud.`):Error(`GitHubi andmete laadimine ebaõnnestus.`);let n=await t.json();if(!Array.isArray(n)||n.length===0){h(`Sellel kasutajal ei leitud avalikke repositooriume.`,`error`),m.innerHTML=``;return}g(n),h(`Projektid laaditi edukalt.`,`success`)}catch(e){h(e.message||`Tekkis tundmatu viga.`,`error`),m.innerHTML=``}}f?.addEventListener(`click`,_),d?.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),_())});