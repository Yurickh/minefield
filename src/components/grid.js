import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled/macro'

import Cell from './cell'
import useGrid from '../hooks/useGrid'

const Row = styled.div`
  display: flex;
`

const Container = styled.div`
  width: ${({ numCols }) => numCols * 3}em;
  height: ${({ numRows }) => numRows * 3}em;
`

export default function Grid({ numMines, numCols, numRows }) {
  const [markedAmount, setMarkedAmount] = useState(0)
  const [grid, { selectCell, markCell }] = useGrid({
    numMines,
    numCols,
    numRows,
  })

  return (
    <Container numCols={numCols} numRows={numRows}>
      {grid.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell
              cell={cell}
              key={colIndex}
              selectCell={() => selectCell({ row: rowIndex, col: colIndex })}
              markCell={() => {
                markCell({ row: rowIndex, col: colIndex })
                setMarkedAmount(marked => marked + 1)
              }}
            />
          ))}
        </Row>
      ))}
      <div>
        {markedAmount} / {numMines}
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
