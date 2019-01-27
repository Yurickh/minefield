import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled/macro'

import useGrid from './hooks/useGrid'

const Row = styled.div`
  display: flex;
`

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2em;
  width: 2em;
  padding: 0.2em;

  font-family: sans-serif;
  font-weight: bold;

  ${({ visible }) =>
    !visible &&
    `
    border: 0.3em outset #686868;
    border-top-color: #aeaeae;
  `}

  background-color: #b2b2b2;

  cursor: pointer;
  box-sizing: border-box;
  user-select: none;

  :active {
    border: none;
    padding: 0.481em; /* visual compensation */
  }
`

export default function Grid({ numMines, numCols, numRows }) {
  const [grid, setCell] = useGrid({ numMines, numCols, numRows })

  return (
    <>
      {grid.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              visible={cell.visible}
              onClick={() =>
                setCell({ row: rowIndex, col: colIndex }, { visible: true })
              }
            >
              {cell.visible && (cell.isMine ? 'X' : cell.minesAround || '')}
            </Cell>
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
