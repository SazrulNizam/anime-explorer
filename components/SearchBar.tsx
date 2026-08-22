'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useFilterStore } from '@/store/UseFilterStore'

export default function SearchBar() {
  const router = useRouter()
  const pathname = usePathname()
  const urlParams = useSearchParams()

  const query = useFilterStore((s) => s.query)
  const setQuery = useFilterStore((s) => s.setQuery)

  const [input, setInput] = useState(query)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(input)
    }, 500)
    return () => clearTimeout(timeout)
  }, [input, setQuery])

  useEffect(() => {
    const newParams = new URLSearchParams(urlParams.toString())
    if (query) {
      newParams.set('q', query)
    } else {
      newParams.delete('q')
    }
    newParams.set('page', '1') 
    router.push(`${pathname}?${newParams.toString()}`)
  }, [query])

  return (
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Search anime..."
      className="input input-bordered w-full max-w-md"
    />
  )
}