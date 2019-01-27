import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled/macro'

import useEffectOnFirstRender from './hooks/useEffectOnFirstRender'
import randomUntil from './utils/random-until'
import cellsAround from './utils/cells-around'

const emptyCell = {
  visible: false,
  isMine: false,
  minesAround: 0,
}

const Row = styled.div`
  display: flex;
`

const Cell = styled.div`
  border: 0.3em outset #686868;
  border-top-color: rgb(174, 174, 174);
  padding: 0.2em;
  background-color: #b2b2b2;
  cursor: pointer;
  box-sizing: border-box;
  user-select: none;
  height: 2em;
  width: 2em;

  :active {
    border: none;
    padding: 0.481em; /* visual compensation */
  }
`

export default function Grid({ numMines, numCols, numRows }) {
  const [grid, setGrid] = useState([[]])
  const getCellsAround = cellsAround({ numCols, numRows })

  useEffectOnFirstRender(() => {
    const cells = Array(numCols * numRows).fill(emptyCell)

    const minePositions = Array(numMines)
      .fill(0)
      .map((_, _index, filledPositions) =>
        randomUntil(filledPositions)(numCols * numRows)
      )

    const cellsWithMines = cells.map((cell, index) => {
      if (minePositions.includes(index)) {
        return { ...cell, isMine: true }
      }
      return cell
    })

    const cellsWithMinesAndNumbers = cellsWithMines.map((cell, index) => ({
      ...cell,
      minesAround: getCellsAround(index)
        .map(cellIndex => cellsWithMines[cellIndex])
        .filter(cell => cell.isMine).length,
    }))

    setGrid(
      Array(numRows)
        .fill(0)
        .map((_, index) => index * numCols)
        .map(index => cellsWithMinesAndNumbers.slice(index, index + numCols))
    )
  })

  return (
    <>
      {grid.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell key={colIndex}>{cell.isMine ? 'X' : cell.minesAround}</Cell>
          ))}
        </Row>
      ))}
    </>
  )
}

Grid.propTypes = {
  numMines: PropTypes.number,
  numCols: PropTypes.number,
  numRows: PropTypes.number,
}

Grid.defaultProps = {
  numMines: 0,
  numCols: 1,
  numRows: 1,
}
