import React, { useCallback, useContext } from 'react'
import styled from '@emotion/styled/macro'

import AppContext from '../context/app'

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

function getSymbolFor(cell) {
  if (cell.marked) return '🚩 '
  if (!cell.visible) return ''
  if (cell.isMine) return '💣 '

  return cell.minesAround || ''
}

function Cell({ cell, setCell }) {
  const { onBomb, locked } = useContext(AppContext)

  const handleClick = useCallback(() => {
    if (!locked && !cell.marked) {
      setCell({ visible: true })

      if (cell.isMine) {
        onBomb()
      }
    }
  }, [setCell, cell])
  const handleRightClick = useCallback(
    event => {
      event.preventDefault()
      if (!locked) {
        setCell({ marked: !cell.marked })
      }
    },
    [setCell, cell]
  )

  return (
    <Button
      visible={cell.visible}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {getSymbolFor(cell)}
    </Button>
  )
}

export default React.memo(Cell)
