import cellsAround from './cells-around'

function isSameCell({ row, col }) {
  return cell => row === cell.row && col === cell.col
}

function createSnapshotWithGrid({ numCols, numRows }) {
  return positions =>
    '\n' +
    Array(numRows)
      .fill()
      .map((_, row) =>
        Array(numCols)
          .fill()
          .map((_, col) =>
            positions.some(isSameCell({ row, col })) ? '#' : '.'
          )
          .join('')
      )
      .join('\n')
}

describe('cells-around', () => {
  let snapshot
  let getCellsAround

  beforeEach(() => {
    const grid = { numCols: 5, numRows: 5 }
    snapshot = createSnapshotWithGrid(grid)
    getCellsAround = cellsAround(grid)
  })

  it('is an array of cells', () => {
    expect(getCellsAround({ row: 3, col: 3 })).toEqual([
      { row: 2, col: 2 },
      { row: 2, col: 3 },
      { row: 2, col: 4 },
      { row: 3, col: 2 },
      { row: 3, col: 4 },
      { row: 4, col: 2 },
      { row: 4, col: 3 },
      { row: 4, col: 4 },
    ])
  })

  it('gets the cells around the center', () => {
    expect(snapshot(getCellsAround({ row: 2, col: 2 }))).toMatchSnapshot()
  })

  it('gets the cells around the corner', () => {
    expect(snapshot(getCellsAround({ row: 0, col: 0 }))).toMatchSnapshot()
    expect(snapshot(getCellsAround({ row: 4, col: 4 }))).toMatchSnapshot()
    expect(snapshot(getCellsAround({ row: 0, col: 4 }))).toMatchSnapshot()
    expect(snapshot(getCellsAround({ row: 4, col: 0 }))).toMatchSnapshot()
  })

  it('skips cells that overflow', () => {
    expect(getCellsAround({ row: 3, col: 3 })).toHaveLength(8)
    expect(getCellsAround({ row: 0, col: 0 })).toHaveLength(3)
  })
})
