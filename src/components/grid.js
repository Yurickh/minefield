import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled/macro'

import Cell from './cell'
import useGrid from '../hooks/useGrid'

import cellsAround from '../mines/cells-around'

const Row = styled.div`
  display: flex;
`

const Container = styled.div`
  width: ${({ numCols }) => numCols * 3}em;
  height: ${({ numRows }) => numRows * 3}em;
`

export default function Grid({ numMines, numCols, numRows }) {
  const [grid, { selectCell, markCell }] = useGrid({
    numMines,
    numCols,
    numRows,
  })

  const numberOfFlags = grid.reduce(
    (amount, column) =>
      amount + column.reduce((flags, cell) => flags + (cell.marked ? 1 : 0), 0),
    0
  )

  const findCellsAround = cellsAround({ numCols, numRows })

  return (
    <Container numCols={numCols} numRows={numRows}>
      {grid.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell
              cell={cell}
              key={colIndex}
              selectCell={() => selectCell({ row: rowIndex, col: colIndex })}
              selectCellsAround={() =>
                findCellsAround({ row: rowIndex, col: colIndex }).forEach(
                  selectCell
                )
              }
              markCell={() => markCell({ row: rowIndex, col: colIndex })}
            />
          ))}
        </Row>
      ))}
      <div>
        {numberOfFlags} / {numMines}
      </div>
    </Container>
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
