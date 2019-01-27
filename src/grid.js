import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled/macro'

import useEffectOnFirstRender from './hooks/useEffectOnFirstRender'
import populate from './mines/populate'

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

  useEffectOnFirstRender(() => {
    setGrid(populate({ numMines, numCols, numRows }))
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
