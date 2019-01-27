import React, { useState, useMemo, useCallback } from 'react'
import styled from '@emotion/styled/macro'

import Title from './components/title'
import Grid from './components/grid'
import AppContext from './context/app'

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 5vh 25vw;
`

function App() {
  const [tries, setTries] = useState(0)
  const [finished, setFinished] = useState(false)

  const restart = useCallback(() => {
    setTries(tries => tries + 1)
    setFinished(false)
  }, [setTries, setFinished])

  const context = useMemo(
    () => ({
      locked: finished,
      onBomb: () => setFinished(true),
    }),
    [setFinished, finished]
  )

  return (
    <AppContext.Provider value={context}>
      <Main>
        <Title>Minesweeper</Title>
        <Grid key={tries} numCols={10} numRows={10} numMines={30} />
        <button onClick={restart}>Restart</button>
      </Main>
    </AppContext.Provider>
  )
}

export default App
