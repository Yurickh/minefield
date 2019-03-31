import { coordinatesFromIndex, indexFromCoordinates } from './coordinates'

describe('coordinates', () => {
  describe('coordinatesFromIndex', () => {
    it('calculates the position from the index', () => {
      expect(coordinatesFromIndex({ numCols: 5 })(2)).toEqual({
        row: 0,
        col: 2,
      })
      expect(coordinatesFromIndex({ numCols: 5 })(7)).toEqual({
        row: 1,
        col: 2,
      })
      expect(coordinatesFromIndex({ numCols: 5 })(12)).toEqual({
        row: 2,
        col: 2,
      })
    })

    it('works with multiple number of cols', () => {
      expect(coordinatesFromIndex({ numCols: 3 })(5)).toEqual({
        row: 1,
        col: 2,
      })

      expect(coordinatesFromIndex({ numCols: 5 })(5)).toEqual({
        row: 1,
        col: 0,
      })

      expect(coordinatesFromIndex({ numCols: 7 })(5)).toEqual({
        row: 0,
        col: 5,
      })
    })
  })

  describe('indexFromCoordinates', () => {
    it('calculates the index from the position', () => {
      expect(
        indexFromCoordinates({ numCols: 5 })({
          row: 0,
          col: 2,
        })
      ).toEqual(2)
      expect(
        indexFromCoordinates({ numCols: 5 })({
          row: 1,
          col: 2,
        })
      ).toEqual(7)
      expect(
        indexFromCoordinates({ numCols: 5 })({
          row: 2,
          col: 2,
        })
      ).toEqual(12)
    })

    it('works with multiple number of cols', () => {
      expect(
        indexFromCoordinates({ numCols: 3 })({
          row: 1,
          col: 2,
        })
      ).toEqual(5)

      expect(
        indexFromCoordinates({ numCols: 5 })({
          row: 1,
          col: 0,
        })
      ).toEqual(5)

      expect(
        indexFromCoordinates({ numCols: 7 })({
          row: 0,
          col: 5,
        })
      ).toEqual(5)
    })
  })
})
