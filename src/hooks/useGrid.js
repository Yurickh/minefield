import { useState, useContext } from 'react'
import produce from 'immer'

import useEffectOnFirstRender from './useEffectOnFirstRender'
import populate from '../mines/populate'
import cellsAround from '../mines/cells-around'
import {
  coordinatesFromIndex,
  indexFromCoordinates,
} from '../mines/coordinates'

import AppContext from '../context/app'

export default function useGrid(stats) {
  const { onBomb, locked } = useContext(AppContext)
  const [grid, setGrid] = useState([[]])
  const findCellsAround = cellsAround(stats)
  const fromIndex = coordinatesFromIndex(stats)
  const toIndex = indexFromCoordinates(stats)

  useEffectOnFirstRender(() => {
    setGrid(populate(stats))
  })

  const setCell = ({ col, row }) => partial =>
    setGrid(minefield =>
      produce(minefield, draft => {
        draft[row][col] = {
          ...draft[row][col],
          ...partial,
        }
      })
    )

  const selectCell = ({ row, col }, cache = []) => {
    const cell = grid[row][col]
    if (!locked && !cell.marked) {
      setCell({ row, col })({ visible: true })

      if (cell.isMine) {
        return onBomb()
      }

      if (cell.minesAround === 0) {
        findCellsAround(toIndex({ row, col })).forEach(index => {
          if (!cache.includes(index)) {
            selectCell(fromIndex(index), [...cache, index])
          }
        })
      }
    }
  }

  const markCell = ({ col, row }) => {
    if (!locked) {
      setCell({ col, row })({ marked: !grid[row][col].marked })
    }
  }

  return [grid, { selectCell, markCell }]
}
