import { useEffect, useState } from 'react'

export function useSmoothScroll(hashes: Array<string>, useSearchParams: any) {
  const [activeHash, setActiveHash] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveHash('#' + entry.target.id)
          } else if (activeHash === '#' + entry.target.id) {
            setActiveHash(null)
          }
        })
      },
      { threshold: 0.2 }
    )

    const ids = hashes.map(hash => hash.replace('#', ''))

    ids.forEach(id => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      ids.forEach(id => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [hashes])

  useEffect(() => {
    const currentHash = '#' + window.location.hash.split('#')[1]

    if (currentHash === '') return

    const hashesSet = new Set(hashes)

    if (hashesSet.has(currentHash)) {
      const id = currentHash.replace('#', '')
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [searchParams])

  return activeHash
}
