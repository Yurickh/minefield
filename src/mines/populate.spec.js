import populate from './populate'

describe('populate', () => {
  it('creates a matrix with given cols and rows', () => {
    const matrix = populate({ numCols: 10, numRows: 5, numMines: 0 })

    expect(matrix).toHaveLength(5)
    matrix.forEach(line => expect(line).toHaveLength(10))
  })

  it('populates the matrix with the specified mines', () => {
    const matrix = populate({ numCols: 10, numRows: 10, numMines: 50 })

    let bombs = 0

    matrix.forEach(line =>
      line.forEach(cell => {
        if (cell.isMine) bombs++
      })
    )

    expect(bombs).toBe(50)
  })
})
