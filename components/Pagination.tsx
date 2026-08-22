'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function Pagination({ currentPage, hasNextPage }: { currentPage: number; hasNextPage: boolean }) {
  const router = useRouter()
  const pathname = usePathname()
  const urlParams = useSearchParams()

  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(urlParams.toString())
    newParams.set('page', String(page))
    router.push(`${pathname}?${newParams.toString()}`)
  }

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="btn btn-sm"
      >
        Previous
      </button>
      <span className="text-sm">Page {currentPage}</span>
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={!hasNextPage}
        className="btn btn-sm"
      >
        Next
      </button>
    </div>
  )
}