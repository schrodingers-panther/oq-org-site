(() => {
  const topbar = document.querySelector('.topbar')
  const toggle = document.querySelector('[data-nav-toggle]')
  const nav = document.querySelector('.nav')
  if (!topbar || !toggle || !nav) return

  const otherItems = [
    ['Іс-Шаралар / Events', 'pages/is-sharalar.html'],
    ['Ғылым/Білім / Science & Education', 'pages/gylym-bilim-jobalary-maseleleri.html'],
    ['Бизнес / Business', 'pages/business-jobalary-maseleleri.html'],
    ['Көмекжәрдем / Mutual Aid', 'pages/komekjardem-asarlatu.html'],
    ['Заң / Legal', 'pages/zan-maseleleri.html'],
    ['Орландо Орталығы / Orlando Center', 'pages/orlando-qazaq-ortalygy.html'],
    ['Флорида Орталығы / Florida Center', 'pages/florida-qazaq-ortalygy.html'],
    ['Жұмыс / Jobs', 'pages/jumys.html'],
    ['Денсаулық / Health', 'pages/densaulyq-jobalary-maseleleri.html'],
    ['Спорт / Sports', 'pages/sport-jobalary.html'],
    ['Қаржы / Finance', 'pages/qarzhy-maseleleri.html'],
    ['Кәсіпкер Әйелдер / Women Entrepreneurs', 'pages/kasipker-aielder.html'],
    ['Сәлемдеме / Greetings', 'pages/salemdeme.html']
  ]

  if (!nav.querySelector('.nav-dropdown')) {
    const isSubpage = window.location.pathname.includes('/pages/')
    const details = document.createElement('details')
    details.className = 'nav-dropdown'
    const summary = document.createElement('summary')
    summary.textContent = 'Қызметтер / Services'
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