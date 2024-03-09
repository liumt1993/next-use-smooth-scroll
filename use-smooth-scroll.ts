import { useEffect, useState } from 'react'

function useQueryParams() {
  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search))

  useEffect(() => {
    const handlePopState = () => {
      setSearchParams(new URLSearchParams(window.location.search))
    }

    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return searchParams
}

export function useSmoothScroll(hashes: Array<string>) {
  const searchParams = useQueryParams()
  const [activeHash, setActiveHash] = useState<string | null>(null)

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

    if (hashes.includes(currentHash)) {
      const id = currentHash.replace('#', '')
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [searchParams])

  return activeHash
}
