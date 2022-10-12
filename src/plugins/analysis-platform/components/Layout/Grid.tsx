import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledGrid = styled.div<{ centerContent: any }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  row-gap: 1rem;
  column-gap: 1rem;
  @media (min-width: 1600px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  ${({ centerContent }) =>
    centerContent &&
    `
    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 1rem;
    }
  `}
`

const Grid = ({
  centerContent,
  children,
}: {
  centerContent: any
  children: ReactNode
}) => {
  return <StyledGrid centerContent={centerContent}>{children}</StyledGrid>
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  centerContent: PropTypes.bool,
}

Grid.defaultProps = {
  //@ts-ignore - Don't know what this is....
  centerContent: PropTypes.false,
}

export default Grid
