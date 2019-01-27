import { useState, useCallback } from 'react'
import produce from 'immer'

import useEffectOnFirstRender from './useEffectOnFirstRender'
import populate from '../mines/populate'

export default function useGrid(stats) {
  const [grid, setGrid] = useState([[]])

  useEffectOnFirstRender(() => {
    setGrid(populate(stats))
  })

  const setCell = useCallback(
    ({ col, row }, cell) =>
      setGrid(
        produce(grid, draft => {
          draft[row][col] = {
            ...draft[row][col],
            ...cell,
          }
        })
      ),
    [grid]
  )

  return [grid, setCell]
}
