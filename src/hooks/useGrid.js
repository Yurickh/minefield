import { useEffect, useState, useContext, useRef } from 'react'
import immer from 'immer'

import populate from '../mines/populate'
import cellsAround from '../mines/cells-around'
import { indexFromCoordinates } from '../mines/coordinates'

import AppContext from '../context/app'

export default function useGrid(stats) {
  const { numCols, numRows, numMines } = stats

  const { onBomb, locked } = useContext(AppContext)
  const [grid, setGrid] = useState([[]])
  const findCellsAround = cellsAround(stats)
  const toIndex = indexFromCoordinates(stats)

  useEffect(() => {
    setGrid(populate({ numCols, numRows, numMines }))
  }, [numCols, numRows, numMines])

  const setCell = ({ col, row }) => partial =>
    setGrid(minefield =>
      immer(minefield, draft => {
        draft[row][col] = {
          ...draft[row][col],
          ...partial,
        }
      })
    )

  const visited = useRef(new Set())

  const selectCell = ({ row, col }) => {
    const cell = grid[row][col]
    if (!locked && !cell.marked) {
      setCell({ row, col })({ visible: true })

      if (cell.isMine) {
        return onBomb()
      }

      if (cell.minesAround === 0) {
        findCellsAround({ row, col }).forEach(position => {
          if (!visited.current.has(toIndex(position))) {
            visited.current.add(toIndex(position))
            selectCell(position)
          }
        })
      }
    }
  }

  const markCell = ({ col, row }) => {
    const cell = grid[row][col]
    if (!locked && !cell.visible) {
      setCell({ col, row })({ marked: !cell.marked })
    }
  }

  return [grid, { selectCell, markCell }]
}
