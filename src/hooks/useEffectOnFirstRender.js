import { useState, useEffect } from 'react'

export default function useEffectOnFirstRender(callback) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!mounted) {
      setMounted(true)
      callback()
    }
  })
}
