import React from 'react'
import styled from '@emotion/styled/macro'

import Title from './title'

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
    </Main>
  )
}

export default App
