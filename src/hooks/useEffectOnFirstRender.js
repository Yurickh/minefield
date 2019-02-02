import { useState, useEffect } from 'react'

export default function useEffectOnFirstRender(callback, dependencies = []) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!mounted) {
      setMounted(true)
      callback()
    }
  }, [...dependencies, mounted, setMounted, callback])
}
