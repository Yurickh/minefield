import React from 'react'
import { render, cleanup } from '@testing-library/react'

import Grid from './grid'

describe('Grid', () => {
  afterEach(cleanup)

  it('renders correctly', () => {
    const grid = render(<Grid />)

    expect(grid.container).not.toBeNull()
  })
})
