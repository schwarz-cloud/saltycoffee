import {
  CAFE,
  CATEGORIES,
  HOURS,
  MENU,
  MERCH,
  POSTS,
  REWARDS,
  REVIEWS,
  SOCIAL,
  type MenuItem,
} from './data'
import { cartCount, cartTotal, money, store } from './store'

function route(): { name: string; slug?: string } {
  const raw = location.hash.replace(/^#/, '') || '/'
  const path = raw.startsWith('/') ? raw : `/${raw}`
  const parts = path.split('/').filter(Boolean)
  if (parts.length === 0) return { name: 'home' }
  if (parts[0] === 'blog' && parts[1]) return { name: 'post', slug: parts[1] }
  return { name: parts[0] }
}

function esc(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function stars(n: number) {
  return '★'.repeat(n) + '☆'.repeat(5 - n)
}

function decoRule(variant = '') {
  return `<div class="deco-rule${variant ? ` ${variant}` : ''}" aria-hidden="true"><i></i><span></span><i></i></div>`
}

function nav(active: string) {
  const links = [
    ['/', 'Home'],
    ['/menu', 'Menu'],
    ['/order', 'Order'],
    ['/shop', 'Merch'],
    ['/rewards', 'Rewards'],
    ['/blog', 'Blog'],
    ['/visit', 'Visit'],
  ] as const
  return links
    .map(
      ([href, label]) =>
        `<a href="#${href}" class="${active === href.slice(1) || (href === '/' && active === 'home') ? 'is-on' : ''}">${label}</a>`,
    )
    .join('')
}

function header(active: string) {
  const n = cartCount()
  return `
    <header class="top">
      <a class="brand" href="#/" aria-label="SaltyCoffee home">
        <img src="/brand/mascot.svg" alt="" width="44" height="50" />
        <span class="wordmark">SALTY<span>COFFEE</span></span>
      </a>
      <button class="nav-toggle" type="button" aria-label="Open menu" data-nav-toggle>☰</button>
      <nav class="nav" data-nav>${nav(active)}</nav>
      <a class="cart-btn" href="#/order" data-open-cart>
        Bag <b data-cart-count>${n}</b>
      </a>
    </header>`
}

function footer() {
  return `
    <footer class="foot">
      <div class="foot-brand">
        <span class="wordmark">SALTYCOFFEE</span>
        <p>Some like their coffee sweet. We prefer ours like our humor: salty.</p>
      </div>
      <div>
        <h3>Visit</h3>
        <p>${CAFE.address}</p>
        <!--<p>${CAFE.phone}</p>-->
      </div>
      <div>
        <h3>Hours</h3>
        ${HOURS.map(([d, h]) => `<p>${d} · ${h}</p>`).join('')}
      </div>
      <div>
        <h3>Sip with us</h3>
        <p><a href="https://www.instagram.com/saltycoffee.cyp/" target="_blank" rel="noreferrer">Instagram</a></p>
        <p><a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a></p>
        <p><a href="#/rewards">Salty Rewards</a></p>
      </div>
    </footer>`
}

function home() {
  return `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Hot sips · warm bites · salty vibes</p>
        <h1 class="display">Coffee with a<br/>salt rim.</h1>
        ${decoRule('on-dark')}
        <p class="lede">House drip, briny lattes, and merch that looks like it wandered off a vintage tin. Mornings optional. Attitude included.</p>
        <div class="row">
          <a class="btn" href="#/order">Order ahead</a>
          <a class="btn ghost" href="#/menu">See the menu</a>
        </div>
      </div>
      <div class="hero-art">
        <div class="fan" aria-hidden="true"></div>
        <div class="portrait">
          <img src="/brand/mascot.svg" alt="Salty mascot with croissant hair" />
        </div>
      </div>
    </section>
    <section class="strip">
      <p>Feeling mornings · some like it sweet · we take ours salty</p>
    </section>
    <section class="block">
      <div class="block-head">
        <h2>Signatures</h2>
        <a href="#/menu">Full menu →</a>
      </div>
      ${decoRule()}
      <div class="cards">
        ${MENU.filter((m) => m.tags?.includes('signature'))
          .map(
            (m) => `
          <article class="card">
            <p class="tag">${esc(m.category)}</p>
            <h3>${esc(m.name)}</h3>
            <p>${esc(m.blurb)}</p>
            <div class="card-foot">
              <strong>${money(m.price)}</strong>
              <button type="button" data-add-drink="${m.id}">Add</button>
            </div>
          </article>`,
          )
          .join('')}
      </div>
    </section>
    <section class="split">
      <div>
        <h2>Salty Rewards</h2>
        <p>One point per dollar. Pastries at 50. A free drip at 100. Join from your phone — we will not email you about “pumpkin season.”</p>
        <a class="btn" href="#/rewards">Join the brine</a>
      </div>
      <div class="stamp-card">
        ${REWARDS.map((r) => `<div><b>${r.pts} pts</b><span>${r.perk}</span></div>`).join('')}
      </div>
    </section>
    <section class="block">
      <div class="block-head">
        <h2>What regulars mutter</h2>
        <a href="#/visit">Find us →</a>
      </div>
      <div class="reviews">
        ${REVIEWS.map(
          (r) => `
          <blockquote class="review">
            <p class="stars">${stars(r.stars)}</p>
            <p>“${esc(r.text)}”</p>
            <footer>${esc(r.name)} · ${esc(r.city)}</footer>
          </blockquote>`,
        ).join('')}
      </div>
    </section>
    ${socialBlock()}
  `
}

function socialBlock() {
  return `
    <section class="block">
      <div class="block-head">
        <h2>From the feed</h2>
        <a href="https://www.instagram.com/saltycoffee.cyp/" target="_blank" rel="noreferrer">@saltycoffee</a>
      </div>
      <div class="feed">
        ${SOCIAL.map(
          (s) => `
          <article class="post-tile ${s.tone}">
            <img src="/brand/mascot.svg" alt="" />
            <p>${esc(s.caption)}</p>
            <span>${esc(s.handle)}</span>
          </article>`,
        ).join('')}
      </div>
    </section>`
}

function menuItem(m: MenuItem) {
  return `
    <article class="menu-row">
      <div>
        <h3>${esc(m.name)} ${m.tags?.map((t) => `<em>${esc(t)}</em>`).join(' ') ?? ''}</h3>
        <p>${esc(m.blurb)}</p>
      </div>
      <div class="menu-buy">
        <strong>${money(m.price)}</strong>
        <button type="button" data-add-drink="${m.id}">Add</button>
      </div>
    </article>`
}

function menuPage() {
  const cat = store.get().category
  const items =
    cat === 'all' ? MENU : MENU.filter((m) => m.category === cat)
  return `
    <section class="page-hero">
      <p class="eyebrow">The carte</p>
      <h1>Menu</h1>
      ${decoRule()}
      <p>Coffee, tea, lattes with a point of view, cold drinks, smoothies, and juices squeezed like we mean it.</p>
    </section>
    <div class="chips" role="tablist">
      <button type="button" data-cat="all" class="${cat === 'all' ? 'is-on' : ''}">All</button>
      ${CATEGORIES.map(
        (c) =>
          `<button type="button" data-cat="${c.id}" class="${cat === c.id ? 'is-on' : ''}">${c.label}</button>`,
      ).join('')}
    </div>
    <div class="menu-list">
      ${items.map(menuItem).join('')}
    </div>`
}

function cartPanel() {
  const { cart, member } = store.get()
  const total = cartTotal()
  if (!cart.length) {
    return `<p class="empty">Your bag is empty. That is a personality, not an order.</p>`
  }
  return `
    <ul class="bag">
      ${cart
        .map(
          (c) => `
        <li>
          <div>
            <strong>${esc(c.name)}</strong>
            ${c.note ? `<small>${esc(c.note)}</small>` : ''}
            <span>${money(c.price)}</span>
          </div>
          <div class="qty">
            <button type="button" data-qty="${esc(c.id)}" data-note="${esc(c.note ?? '')}" data-n="${c.qty - 1}">−</button>
            <span>${c.qty}</span>
            <button type="button" data-qty="${esc(c.id)}" data-note="${esc(c.note ?? '')}" data-n="${c.qty + 1}">+</button>
          </div>
        </li>`,
        )
        .join('')}
    </ul>
    <p class="total">Total <strong>${money(total)}</strong></p>
    ${member ? `<p class="hint">You will earn ${Math.floor(total)} Salty points on this pickup.</p>` : `<p class="hint"><a href="#/rewards">Join Rewards</a> to stash points on this order.</p>`}
    <form class="checkout" data-checkout>
      <label>Name <input name="name" required placeholder="Name for the cup" /></label>
      <label>Phone <input name="phone" required placeholder="310…" /></label>
      <label>How
        <select name="how">
          <option value="pickup">Pickup · Windward</option>
          <option value="delivery">Bike delivery · 2 mile radius</option>
        </select>
      </label>
      <label>When
        <select name="when">
          <option>ASAP · ~12 min</option>
          <option>In 20 minutes</option>
          <option>In 45 minutes</option>
        </select>
      </label>
      <button class="btn" type="submit">Place order</button>
    </form>`
}

function orderPage() {
  const notice = store.get().lastOrder
  return `
    <section class="page-hero">
      <p class="eyebrow">Counter service</p>
      <h1>Order ahead</h1>
      ${decoRule()}
      <p>Skip the Windward line. We start pulling shots when you tap place.</p>
    </section>
    ${notice ? `<div class="toast">Order <strong>${esc(notice)}</strong> is in. See you at the counter.</div>` : ''}
    <div class="order-grid">
      <div>
        <h2>Drinks</h2>
        <div class="chips">
          ${CATEGORIES.map((c) => `<a class="chip" href="#/menu">${c.label}</a>`).join('')}
        </div>
        <div class="menu-list compact">
          ${MENU.map(menuItem).join('')}
        </div>
      </div>
      <aside class="bag-card">
        <h2>Your bag</h2>
        ${cartPanel()}
      </aside>
    </div>`
}

function shopPage() {
  return `
    <section class="page-hero">
      <p class="eyebrow">Cabinet</p>
      <h1>Merch</h1>
      ${decoRule()}
      <p>Mugs, totes, beans, and a beanie that looks like pastry hair. Wash cold. Attitude hot.</p>
    </section>
    <div class="merch">
      ${MERCH.map(
        (m) => `
        <article class="merch-card">
          <div class="swatch" style="background:${m.hue}">
            <img src="/brand/mascot.svg" alt="" />
          </div>
          <h3>${esc(m.name)}</h3>
          <p>${esc(m.blurb)}</p>
          <div class="card-foot">
            <strong>${money(m.price)}</strong>
            <button type="button" data-add-merch="${m.id}">Add</button>
          </div>
        </article>`,
      ).join('')}
    </div>`
}

function rewardsPage() {
  const { member } = store.get()
  if (!member) {
    return `
      <section class="page-hero">
        <p class="eyebrow">Membership</p>
        <h1>Salty Rewards</h1>
        ${decoRule()}
        <p>A punch card that lives on your phone. No app store hostage situation.</p>
      </section>
      <div class="split">
        <form class="join" data-join>
          <label>Name <input name="name" required /></label>
          <label>Email <input name="email" type="email" required /></label>
          <button class="btn" type="submit">Join free</button>
        </form>
        <div class="stamp-card">
          ${REWARDS.map((r) => `<div><b>${r.pts} pts</b><span>${r.perk}</span></div>`).join('')}
        </div>
      </div>`
  }
  const next = REWARDS.find((r) => r.pts > member.points) ?? REWARDS[REWARDS.length - 1]
  const pct = Math.min(100, Math.round((member.points / next.pts) * 100))
  return `
    <section class="page-hero">
      <p class="eyebrow">Your ledger</p>
      <h1>Hey ${esc(member.name.split(' ')[0])}.</h1>
      ${decoRule()}
      <p>${member.points} points · stamp ${member.stamps} / 10 on the pastry card.</p>
    </section>
    <div class="progress"><i style="width:${pct}%"></i></div>
    <p class="hint">${next.pts - member.points} points to ${esc(next.perk)}.</p>
    <div class="stamp-card">
      ${REWARDS.map(
        (r) => `
        <div>
          <b>${r.pts} pts</b>
          <span>${r.perk}</span>
          <button type="button" data-redeem="${r.pts}" ${member.points >= r.pts ? '' : 'disabled'}>Redeem</button>
        </div>`,
      ).join('')}
    </div>`
}

function blogPage() {
  return `
    <section class="page-hero">
      <p class="eyebrow">Seasonal ledger</p>
      <h1>Brew notes</h1>
      ${decoRule()}
      <p>Seasonal tips from the bar. Not a lifestyle blog. A kettle diary.</p>
    </section>
    <div class="posts">
      ${POSTS.map(
        (p) => `
        <a class="post-card" href="#/blog/${p.slug}">
          <span class="tag">${esc(p.season)}</span>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.excerpt)}</p>
          <small>${esc(p.date)} · ${esc(p.read)}</small>
        </a>`,
      ).join('')}
    </div>`
}

function postPage(slug: string) {
  const p = POSTS.find((x) => x.slug === slug)
  if (!p) return `<section class="page-hero"><h1>Lost in the grind</h1><a href="#/blog">Back to notes</a></section>`
  return `
    <article class="article">
      <a href="#/blog">← Brew notes</a>
      <span class="tag">${esc(p.season)}</span>
      <h1>${esc(p.title)}</h1>
      <p class="meta">${esc(p.date)} · ${esc(p.read)}</p>
      ${p.body.map((para) => `<p>${esc(para)}</p>`).join('')}
    </article>`
}

function visitPage() {
  //const CAFE = {lat: 35.201674, lng : 33.302006}
  const { lat, lng } = CAFE
  
  const bbox = `${lng - 0.02},${lat - 0.012},${lng + 0.02},${lat + 0.012}`
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat}%2C${lng}`
  return `
    <section class="page-hero">
      <p class="eyebrow">The salon</p>
      <h1>Find the brine</h1>
      ${decoRule()}
     <!-- <p>${CAFE.address}. ${CAFE.phone}</p>-->
      <p>${CAFE.address}</p>
    </section>
    <div class="map-wrap">
      <iframe title="SaltyCoffee on the map" src="${src}" loading="lazy"></iframe>
    </div>
    <div class="split">
      <div>
        <h2>Hours</h2>
        ${HOURS.map(([d, h]) => `<p>${d} · ${h}</p>`).join('')}
        <p class="hint">Bike parking on Windward. Tiny patio. Loud kettle, louder opinions.</p>
      </div>
      <div>
        <h2>Social</h2>
        <p>Stories go up when the croissant tray lands. Tag <strong>@saltycoffee</strong> if your foam art looks like hair.</p>
      </div>
    </div>
    ${socialBlock()}
  `
}

function page() {
  const r = route()
  switch (r.name) {
    case 'menu':
      return menuPage()
    case 'order':
      return orderPage()
    case 'shop':
      return shopPage()
    case 'rewards':
      return rewardsPage()
    case 'blog':
      return blogPage()
    case 'post':
      return postPage(r.slug ?? '')
    case 'visit':
      return visitPage()
    default:
      return home()
  }
}

function toast(root: HTMLElement, msg: string) {
  const el = document.createElement('div')
  el.className = 'float-toast'
  el.textContent = msg
  root.append(el)
  setTimeout(() => el.remove(), 1800)
}

export function mount(root: HTMLElement) {
  const render = () => {
    const r = route()
    const active = r.name === 'post' ? 'blog' : r.name
    root.innerHTML = `${header(active)}<main>${page()}</main>${footer()}`
    bind(root)
  }

  function bind(el: HTMLElement) {
    el.querySelector('[data-nav-toggle]')?.addEventListener('click', () => {
      el.querySelector('[data-nav]')?.classList.toggle('open')
    })
    el.querySelectorAll<HTMLButtonElement>('[data-cat]').forEach((btn) => {
      btn.addEventListener('click', () => store.setCategory(btn.dataset.cat ?? 'all'))
    })
    el.querySelectorAll<HTMLButtonElement>('[data-add-drink]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = MENU.find((m) => m.id === btn.dataset.addDrink)
        if (!item) return
        store.add({
          id: item.id,
          name: item.name,
          price: item.price,
          kind: 'drink',
          note: CATEGORIES.find((c) => c.id === item.category)?.label,
        })
        toast(el, `Added ${item.name}`)
      })
    })
    el.querySelectorAll<HTMLButtonElement>('[data-add-merch]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = MERCH.find((m) => m.id === btn.dataset.addMerch)
        if (!item) return
        store.add({
          id: item.id,
          name: item.name,
          price: item.price,
          kind: 'merch',
          note: 'Merch',
        })
        toast(el, `Added ${item.name}`)
      })
    })
    el.querySelectorAll<HTMLButtonElement>('[data-qty]').forEach((btn) => {
      btn.addEventListener('click', () => {
        store.setQty(btn.dataset.qty ?? '', btn.dataset.note || undefined, Number(btn.dataset.n))
      })
    })
    el.querySelector<HTMLFormElement>('[data-join]')?.addEventListener('submit', (e) => {
      e.preventDefault()
      const fd = new FormData(e.currentTarget as HTMLFormElement)
      store.join(String(fd.get('name')), String(fd.get('email')))
    })
    el.querySelectorAll<HTMLButtonElement>('[data-redeem]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const ok = store.redeem(Number(btn.dataset.redeem))
        toast(el, ok ? 'Redeemed. Show this screen at the register.' : 'Need more points.')
      })
    })
    el.querySelector<HTMLFormElement>('[data-checkout]')?.addEventListener('submit', (e) => {
      e.preventDefault()
      if (!store.get().cart.length) return
      const total = cartTotal()
      store.checkout(total)
      toast(el, 'Order placed')
    })
  }

  window.addEventListener('hashchange', () => {
    store.clearNotice()
    render()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
  store.subscribe(render)
  render()
}
