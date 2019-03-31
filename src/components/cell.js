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

function describe(cell) {
  if (cell.marked) return 'marked'
  if (!cell.visible) return 'invisible'
  if (cell.isMine) return 'mine'

  return cell.minesAround || 'none'
}

function getDescriptionFor(cell) {
  switch (describe(cell)) {
    case 'marked':
      return 'Marked cell'
    case 'invisible':
      return 'Hidden cell'
    case 'mine':
      return 'Mine'
    case 'none':
      return `No mines around this cell`
    default:
      return `${describe(cell)} mines aroudn this cell`
  }
}

function getSymbolFor(cell) {
  switch (describe(cell)) {
    case 'marked':
      return '🚩 '
    case 'invisible':
      return ''
    case 'mine':
      return '💣 '
    case 'none':
      return ''

    default:
      return cell.minesAround
  }
}

function preventDefault(fn) {
  return event => {
    event.preventDefault()
    fn()
  }
}

function Cell({ cell, selectCell, markCell, selectCellsAround }) {
  return (
    <Button
      visible={cell.visible}
      onClick={selectCell}
      onDoubleClick={selectCellsAround}
      onContextMenu={preventDefault(markCell)}
      aria-label={getDescriptionFor(cell)}
    >
      {getSymbolFor(cell)}
    </Button>
  )
}

export default React.memo(Cell)
