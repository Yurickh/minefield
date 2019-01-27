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

export default function Grid({ numBombs, numCols, numRows }) {
  const [grid, setGrid] = useState([[]])

  useEffectOnFirstRender(() => {
    const cols = Array(numCols).fill(emptyCell)
    setGrid(Array(numRows).fill(cols))
  })

  return (
    <>
      {grid.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((_, colIndex) => (
            <Cell key={colIndex} />
          ))}
        </Row>
      ))}
    </>
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
