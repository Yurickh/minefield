import React from 'react'
import styled from '@emotion/styled/macro'

import Title from './title'
import Grid from './grid'

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 5vh 25vw;
`

function App() {
  return (
    <Main>
      <Title>Minesweeper</Title>
      <Grid numCols={10} numRows={10} numMines={30} />
    </Main>
  )
}

export default App
