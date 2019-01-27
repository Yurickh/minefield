import React from 'react'
import styled from '@emotion/styled/macro'

function getColorFor(number) {
  const colors = [
    'blue',
    'green',
    'red',
    'dark-blue',
    'brown',
    'cyan',
    'black',
    'gray',
  ]

  return colors[number - 1]
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
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

  ${({ children }) =>
    children !== '💣 ' &&
    `color: ${getColorFor(children)};`}

  background-color: #b2b2b2;

  cursor: pointer;
  box-sizing: border-box;
  user-select: none;

  :active {
    border: none;
    padding: 0.481em; /* visual compensation */
  }
`

function Cell({ cell, setCell }) {
  return (
    <Button visible={cell.visible} onClick={() => setCell({ visible: true })}>
      {cell.visible && (cell.isMine ? '💣 ' : cell.minesAround || '')}
    </Button>
  )
}

export default React.memo(Cell)
