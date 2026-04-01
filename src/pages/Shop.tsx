import { useState, useMemo, useCallback } from 'react'
import { ShoppingCart, Star, X, Plus, Minus, Trash2, Search } from 'lucide-react'
import { useCartStore } from '../stores/cartStore'
import { products } from '../lib/mockData'
import type { Product } from '../types'

const categories = ['All', 'Electronics', 'Clothing', 'Home']

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useState(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  })
  return debounced
}

function ProductCard({ product }: { product: Product }) {
  const { addItem, openCart } = useCartStore()

  const handleAdd = () => {
    addItem(product)
    openCart()
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md dark:hover:shadow-slate-900 transition-all group">
      <div className={`h-40 bg-gradient-to-br ${product.color} flex items-center justify-center`}>
        <ShoppingCart size={32} className="text-white/40" />
      </div>
      <div className="p-4">
        <span className="text-xs text-slate-500 dark:text-slate-400">{product.category}</span>
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5 mb-1">{product.name}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-1 mb-3">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{product.rating}</span>
          <span className="text-xs text-slate-400">· {product.stock} in stock</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900 dark:text-slate-100">${product.price}</span>
          <button
            onClick={handleAdd}
            className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, total } = useCartStore()

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={closeCart} />
      <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 z-50 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">
            Shopping Cart ({items.length})
          </h2>
          <button onClick={closeCart} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <ShoppingCart size={40} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{item.name}</p>
                  <p className="text-sm text-violet-600 dark:text-violet-400 font-semibold">${item.price}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-5 h-5 flex items-center justify-center rounded border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="text-sm w-4 text-center text-slate-900 dark:text-slate-100">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-5 h-5 flex items-center justify-center rounded border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <Plus size={10} />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex justify-between text-sm font-semibold text-slate-900 dark:text-slate-100">
              <span>Total</span>
              <span>${total().toLocaleString()}</span>
            </div>
            <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-2.5 rounded-xl text-sm transition-colors">
              Checkout
            </button>
            <button onClick={clearCart} className="w-full text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default function Shop() {
  const [category, setCategory] = useState('All')
  const [rawSearch, setRawSearch] = useState('')
  const itemCount = useCartStore((s) => s.itemCount)
  const openCart = useCartStore((s) => s.openCart)

  const debouncedSearch = useDebounce(rawSearch, 300)

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = category === 'All' || p.category === category
      const matchSearch = p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      return matchCat && matchSearch
    })
  }, [category, debouncedSearch])

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRawSearch(e.target.value)
  }, [])

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Shop</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Filter · debounced search · Zustand cart
          </p>
        </div>
        <button
          onClick={openCart}
          className="relative flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
        >
          <ShoppingCart size={16} />
          Cart
          {itemCount() > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-violet-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {itemCount()}
            </span>
          )}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search products…"
            value={rawSearch}
            onChange={handleSearch}
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-violet-500"
          />
        </div>
        <div className="flex gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={[
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                category === cat
                  ? 'bg-violet-600 text-white'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700',
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p className="text-lg font-medium mb-1">No products found</p>
          <p className="text-sm">Try a different search or category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <CartDrawer />
    </div>
  )
}
