import React from 'react'
import styled from '@emotion/styled/macro'

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2em;
  width: 2em;
  padding: 0.2em;

  font-family: sans-serif;
  font-weight: bold;
  border: none;

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

export default function Cell({ cell, setCell, row, col }) {
  return (
    <Button visible={cell.visible} onClick={() => setCell({ visible: true })}>
      {cell.visible && (cell.isMine ? 'X' : cell.minesAround || '')}
    </Button>
  )
}
