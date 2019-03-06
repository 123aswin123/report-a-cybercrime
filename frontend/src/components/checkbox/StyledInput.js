import styled from '@emotion/styled'
import tag from 'clean-tag'

export const StyledInput = styled(tag.input)`
  position: absolute;
  left: 0;
  top: 0;
  width: 24px;
  height: 24px;
  z-index: 1;
  margin: 0;
  zoom: 1;
  opacity: 0;
  :checked + span:after {
    opacity: 1;
  }
  :focus + span:before {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.yellow};
  }
`
