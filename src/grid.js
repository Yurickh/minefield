import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled/macro'

import useEffectOnFirstRender from './hooks/useEffectOnFirstRender'

const emptyCell = {
  visible: false,
  isBomb: false,
  bombsAround: 0,
}

const Row = styled.div`
  display: flex;
`

export default function Grid({ numBombs, numCols, numRows }) {
  const [grid, setGrid] = useState([[]])

  useEffectOnFirstRender(() => {
    const cols = Array(numCols).fill(emptyCell)
    setGrid(Array(numRows).fill(cols))
  })

  return (
    <div>
      {grid.map((row, rowIndex) => (
        <Row>
          {row.map((_, colIndex) => (
            <div>
              Cell number {rowIndex},{colIndex}
            </div>
          ))}
        </Row>
      ))}
    </div>
  )
}

Grid.propTypes = {
  numBombs: PropTypes.number,
  numCols: PropTypes.number,
  numRows: PropTypes.number,
}

Grid.defaultProps = {
  numBombs: 0,
  numCols: 1,
  numRows: 1,
}
