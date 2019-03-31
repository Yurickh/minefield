import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'

import Cell from './cell'

describe('Cell', () => {
  let baseProps

  beforeEach(() => {
    baseProps = {
      cell: {
        minesAround: 0,
      },
      selectCell: jest.fn(),
      markCell: jest.fn(),
      selectCellsAround: jest.fn(),
    }
  })

  afterEach(cleanup)

  it('shows a button on screen', () => {
    const cell = render(<Cell {...baseProps} />)

    expect(cell.queryByLabelText('Hidden cell')).not.toBeNull()
  })

  describe('event callbacks', () => {
    let button

    beforeEach(() => {
      const cell = render(<Cell {...baseProps} />)
      button = cell.queryByLabelText('Hidden cell')
    })

    it('calls selectCell on click', () => {
      fireEvent.click(button)

      expect(baseProps.selectCell).toHaveBeenCalled()
    })

    it('calls markCell when right-clicking', () => {
      fireEvent.contextMenu(button)

      expect(baseProps.selectCell).not.toHaveBeenCalled()
      expect(baseProps.markCell).toHaveBeenCalled()
    })

    it('calls selectCellsAround when double-clicking', () => {
      fireEvent.doubleClick(button)

      expect(baseProps.selectCellsAround).toHaveBeenCalled()
    })
  })

  describe('different labels', () => {
    it('is still hidden even if it is a mine', () => {
      const cell = render(
        <Cell {...baseProps} cell={{ ...baseProps.cell, isMine: true }} />
      )

      expect(cell.queryByLabelText('Hidden cell')).not.toBeNull()
      expect(cell.queryByLabelText('Mine')).toBeNull()
    })

    it('is a mine when is mine and visible', () => {
      const cell = render(
        <Cell
          {...baseProps}
          cell={{ ...baseProps.cell, visible: true, isMine: true }}
        />
      )
      expect(cell.queryByLabelText('Mine').textContent).toMatch('💣')
    })

    it('shows the number of mines around when visible', () => {
      const cell = render(
        <Cell
          {...baseProps}
          cell={{ ...baseProps.cell, visible: true, minesAround: 3 }}
        />
      )
      expect(
        cell.queryByLabelText('3 mines around this cell').textContent
      ).toMatch('3')
    })

    it('remains empty when visible and no mine is around', () => {
      const cell = render(
        <Cell
          {...baseProps}
          cell={{ ...baseProps.cell, visible: true, minesAround: 0 }}
        />
      )
      expect(
        cell.queryByLabelText('No mine around this cell').textContent
      ).toHaveLength(0)
    })

    it('is a flag when marked and visible', () => {
      const cell = render(
        <Cell
          {...baseProps}
          cell={{ ...baseProps.cell, visible: true, marked: true }}
        />
      )
      expect(cell.queryByLabelText('Marked cell').textContent).toMatch('🚩')
    })
  })
})
