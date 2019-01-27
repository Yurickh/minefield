import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled/macro'

import Cell from './cell'
import useGrid from '../hooks/useGrid'

const Row = styled.div`
  display: flex;
`

export default function Grid({ numMines, numCols, numRows }) {
  const [grid, { selectCell, markCell }] = useGrid({
    numMines,
    numCols,
    numRows,
  })

  return (
    <>
      {grid.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell
              cell={cell}
              key={colIndex}
              selectCell={() => selectCell({ row: rowIndex, col: colIndex })}
              markCell={() => markCell({ row: rowIndex, col: colIndex })}
            />
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
