import './src/style.css'

const menuToggle = document.querySelector('#menu-toggle')
const mobileMenu = document.querySelector('#mobile-menu')
const menuIconOpen = document.querySelector('#menu-icon-open')
const menuIconClose = document.querySelector('#menu-icon-close')

function closeMenu() {
  if (!mobileMenu || !menuToggle) return

  mobileMenu.classList.add('hidden')
  menuIconOpen?.classList.remove('hidden')
  menuIconClose?.classList.add('hidden')
  menuToggle.setAttribute('aria-expanded', 'false')
}

function openMenu() {
  if (!mobileMenu || !menuToggle) return

  mobileMenu.classList.remove('hidden')
  menuIconOpen?.classList.add('hidden')
  menuIconClose?.classList.remove('hidden')
  menuToggle.setAttribute('aria-expanded', 'true')
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden')

    if (isOpen) {
      closeMenu()
    } else {
      openMenu()
    }
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu()
    }
  })

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu()
    })
  })

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMenu()
    }
  })
}
const themeToggle = document.querySelector('#theme-toggle')
const iconDark = document.querySelector('#theme-icon-dark')
const iconLight = document.querySelector('#theme-icon-light')

function setTheme(theme) {
  document.documentElement.dataset.theme = theme
  localStorage.setItem('theme', theme)

  if (theme === 'light') {
    iconDark?.classList.add('hidden')
    iconLight?.classList.remove('hidden')
  } else {
    iconDark?.classList.remove('hidden')
    iconLight?.classList.add('hidden')
  }
}

// initial state
const savedTheme = localStorage.getItem('theme') || 'dark'
setTheme(savedTheme)

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.dataset.theme
  const next = current === 'dark' ? 'light' : 'dark'
  setTheme(next)
})
const form = document.querySelector('#contact-form')

if (form) {
  const nameInput = document.querySelector('#name')
  const emailInput = document.querySelector('#email')
  const messageInput = document.querySelector('#message')

  const nameError = document.querySelector('#name-error')
  const emailError = document.querySelector('#email-error')
  const messageError = document.querySelector('#message-error')

  function showError(input, errorEl) {
    errorEl.classList.remove('hidden')
    input.setAttribute('aria-invalid', 'true')
  }

  function hideError(input, errorEl) {
    errorEl.classList.add('hidden')
    input.setAttribute('aria-invalid', 'false')
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  form.addEventListener('submit', (e) => {
    let valid = true

    // NAME
    if (!nameInput.value.trim()) {
      showError(nameInput, nameError)
      valid = false
    } else {
      hideError(nameInput, nameError)
    }

    // EMAIL
    if (!validateEmail(emailInput.value)) {
      showError(emailInput, emailError)
      valid = false
    } else {
      hideError(emailInput, emailError)
    }

    // MESSAGE
    if (!messageInput.value.trim()) {
      showError(messageInput, messageError)
      valid = false
    } else {
      hideError(messageInput, messageError)
    }

    if (!valid) {
      e.preventDefault()
    }
  })
}
const githubInput = document.querySelector('#github-username')
const githubButton = document.querySelector('#github-load-btn')
const githubStatus = document.querySelector('#github-status')
const githubRepos = document.querySelector('#github-repos')

function setGithubStatus(message, type = 'default') {
  if (!githubStatus) return

  githubStatus.textContent = message
  githubStatus.className =
    'rounded-xl border px-4 py-3 text-sm'

  if (type === 'loading') {
    githubStatus.classList.add('border-line', 'bg-panel/60', 'text-muted')
  } else if (type === 'error') {
    githubStatus.classList.add('border-red-500/30', 'bg-red-500/10', 'text-red-400')
  } else if (type === 'success') {
    githubStatus.classList.add('border-emerald-500/30', 'bg-emerald-500/10', 'text-emerald-400')
  } else {
    githubStatus.classList.add('border-line', 'bg-panel/60', 'text-muted')
  }
}

function renderRepos(repos) {
  if (!githubRepos) return

  githubRepos.innerHTML = ''

  repos.forEach((repo) => {
    const article = document.createElement('article')
    article.className = 'card-surface p-5'

    article.innerHTML = `
      <div class="flex items-start justify-between gap-4">
        <div>
          <h3 class="font-heading text-xl font-black uppercase">
            <a
              href="${repo.html_url}"
              target="_blank"
              rel="noopener noreferrer"
              class="transition hover:text-primary"
            >
              ${repo.name}
            </a>
          </h3>
          <p class="mt-2 text-sm leading-6 text-muted">
            ${repo.description ? repo.description : 'Kirjeldus puudub.'}
          </p>
        </div>
        <span class="rounded-full border border-line px-3 py-1 text-xs text-muted">
          ${repo.language ? repo.language : 'Puudub'}
        </span>
      </div>

      <div class="mt-4 flex flex-wrap gap-4 text-xs text-muted">
        <span>⭐ Tähti: ${repo.stargazers_count}</span>
        <span>🍴 Forke: ${repo.forks_count}</span>
        <span>👀 Vaadatud: ${repo.watchers_count}</span>
      </div>
    `

    githubRepos.appendChild(article)
  })
}

async function loadGithubRepos() {
  const username = githubInput?.value.trim()

  if (!username) {
    setGithubStatus('Palun sisesta GitHubi kasutajanimi.', 'error')
    githubRepos.innerHTML = ''
    return
  }

  setGithubStatus('Laadimine käib...', 'loading')
  githubRepos.innerHTML = ''

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Seda GitHubi kasutajat ei leitud.')
      }

      throw new Error('GitHubi andmete laadimine ebaõnnestus.')
    }

    const repos = await response.json()

    if (!Array.isArray(repos) || repos.length === 0) {
      setGithubStatus('Sellel kasutajal ei leitud avalikke repositooriume.', 'error')
      githubRepos.innerHTML = ''
      return
    }

    renderRepos(repos)
    setGithubStatus('Projektid laaditi edukalt.', 'success')
  } catch (error) {
    setGithubStatus(error.message || 'Tekkis tundmatu viga.', 'error')
    githubRepos.innerHTML = ''
  }
}

githubButton?.addEventListener('click', loadGithubRepos)

githubInput?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    loadGithubRepos()
  }
})
