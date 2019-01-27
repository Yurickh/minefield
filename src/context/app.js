import React from 'react'

const AppContext = React.createContext(() => {
  throw new Error('Trying to consume AppContext without wrapping provider.')
})

export default AppContext
