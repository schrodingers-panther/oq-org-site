(() => {
  const topbar = document.querySelector('.topbar')
  const toggle = document.querySelector('[data-nav-toggle]')
  const nav = document.querySelector('.nav')
  if (!topbar || !toggle || !nav) return

  const otherItems = [
    ['İS-ŞARALAR', 'pages/is-sharalar.html'],
    ['Jalpy Chat', 'pages/jalpy-chat.html'],
    ['Eriktiler jäne Demeuşiler', 'pages/eriktiler-jane-demeushiler.html'],
    ['ĞYLYM/BİLİM Jobalary/Mäseleleri', 'pages/gylym-bilim-jobalary-maseleleri.html'],
    ['Oraza, 2026', 'pages/oraza-2026.html'],
    ['BUSINESS Jobalary/Mäseleleri', 'pages/business-jobalary-maseleleri.html'],
    ['KÖMEKJÄRDEM/ASARLATU', 'pages/komekjardem-asarlatu.html'],
    ['ZAN mäseleleri', 'pages/zan-maseleleri.html'],
    ['ORLANDO Qazaq Ortalyğy', 'pages/orlando-qazaq-ortalygy.html'],
    ['Florida Qazaq Ortalyğy', 'pages/florida-qazaq-ortalygy.html'],
    ['Jumys', 'pages/jumys.html'],
    ['DENSAULYQ Jobalary/Mäseleleri', 'pages/densaulyq-jobalary-maseleleri.html'],
    ['SPORT Jobalary', 'pages/sport-jobalary.html'],
    ['QARZHY mäseleleri', 'pages/qarzhy-maseleleri.html'],
    ['Käsipker Äielder', 'pages/kasipker-aielder.html'],
    ['Sälemdeme', 'pages/salemdeme.html']
  ]

  if (!nav.querySelector('.nav-dropdown')) {
    const isSubpage = window.location.pathname.includes('/pages/')
    const details = document.createElement('details')
    details.className = 'nav-dropdown'
    const summary = document.createElement('summary')
    summary.textContent = 'Other'
    const menu = document.createElement('div')
    menu.className = 'nav-dropdown-menu'

    otherItems.forEach(([label, href]) => {
      const link = document.createElement('a')
      link.textContent = label
      link.href = isSubpage ? href.replace('pages/', '') : href
      menu.appendChild(link)
    })

    details.appendChild(summary)
    details.appendChild(menu)
    nav.appendChild(details)
  }

  toggle.addEventListener('click', () => {
    const next = !topbar.classList.contains('nav-open')
    topbar.classList.toggle('nav-open', next)
    toggle.setAttribute('aria-expanded', String(next))
  })

  document.addEventListener('click', (event) => {
    if (!topbar.classList.contains('nav-open')) return
    if (topbar.contains(event.target)) return
    topbar.classList.remove('nav-open')
    toggle.setAttribute('aria-expanded', 'false')
  })
})()