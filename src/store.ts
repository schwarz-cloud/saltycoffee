export type CartItem = {
  id: string
  name: string
  price: number
  qty: number
  kind: 'drink' | 'merch'
  note?: string
}

export type Member = {
  name: string
  email: string
  points: number
  stamps: number
}

type State = {
  cart: CartItem[]
  member: Member | null
  lastOrder: string | null
  category: string
}

const KEY = 'saltycoffee-state-v1'

function load(): State {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as State
  } catch {
    /* ignore */
  }
  return { cart: [], member: null, lastOrder: null, category: 'all' }
}

let state: State = load()
const listeners = new Set<() => void>()

function persist() {
  localStorage.setItem(KEY, JSON.stringify(state))
  for (const fn of listeners) fn()
}

export const store = {
  get: () => state,
  subscribe(fn: () => void) {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
  setCategory(category: string) {
    state = { ...state, category }
    persist()
  },
  add(item: Omit<CartItem, 'qty'> & { qty?: number }) {
    const qty = item.qty ?? 1
    const existing = state.cart.find(
      (c) => c.id === item.id && c.note === item.note,
    )
    const cart = existing
      ? state.cart.map((c) =>
          c === existing ? { ...c, qty: c.qty + qty } : c,
        )
      : [...state.cart, { ...item, qty }]
    state = { ...state, cart }
    persist()
  },
  setQty(id: string, note: string | undefined, qty: number) {
    const cart =
      qty <= 0
        ? state.cart.filter((c) => !(c.id === id && c.note === note))
        : state.cart.map((c) =>
            c.id === id && c.note === note ? { ...c, qty } : c,
          )
    state = { ...state, cart }
    persist()
  },
  clearCart() {
    state = { ...state, cart: [] }
    persist()
  },
  join(name: string, email: string) {
    state = {
      ...state,
      member: state.member ?? { name, email, points: 12, stamps: 1 },
    }
    persist()
  },
  redeem(cost: number) {
    if (!state.member || state.member.points < cost) return false
    state = {
      ...state,
      member: { ...state.member, points: state.member.points - cost },
    }
    persist()
    return true
  },
  checkout(total: number) {
    const pts = Math.floor(total)
    const member = state.member
      ? {
          ...state.member,
          points: state.member.points + pts,
          stamps: (state.member.stamps % 10) + 1,
        }
      : state.member
    const order = `SC-${Date.now().toString(36).toUpperCase()}`
    state = { ...state, cart: [], member, lastOrder: order }
    persist()
    return order
  },
  clearNotice() {
    if (!state.lastOrder) return
    state = { ...state, lastOrder: null }
    persist()
  },
}

export function money(n: number) {
  return `$${n.toFixed(2)}`
}

export function cartCount() {
  return state.cart.reduce((a, c) => a + c.qty, 0)
}

export function cartTotal() {
  return state.cart.reduce((a, c) => a + c.price * c.qty, 0)
}
