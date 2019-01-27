export function coordinatesFromIndex({ numCols }) {
  return index => ({
    col: index % numCols,
    row: Math.floor(index / numCols),
  })
}

export function indexFromCoordinates({ numCols }) {
  return ({ col, row }) => row * numCols + col
}
