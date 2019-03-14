import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  display,
  fontSize,
  lineHeight,
  space,
  color,
  colorStyle,
  fontWeight,
  width,
  height,
} from 'styled-system'
import tag from 'clean-tag'

export const StyledTextArea = styled(tag.textarea)`
  font-family: ${({ theme }) => theme.fontSans};
  margin: 0;
  ${display};
  ${fontSize};
  ${lineHeight};
  ${space};
  ${colorStyle};
  ${color};
  ${fontWeight};
  ${width};
  ${height}
`
StyledTextArea.propTypes = {
  ...display.propTypes,
  ...fontSize.propTypes,
  ...lineHeight.propTypes,
  ...space.propTypes,
  ...colorStyle.propTypes,
  ...color.propTypes,
  ...fontWeight.propTypes,
  ...width.propTypes,
  ...height.propTypes,
}

export const TextArea = props => (
  <StyledTextArea
    display="block"
    fontSize={[2, null, 3]}
    lineHeight={[2, null, 3]}
    colors="textArea"
    width={['300px', null, '600px']}
    height={['200px', null, '300px']}
    {...props}
  >
    {props.children}
  </StyledTextArea>
)

TextArea.propTypes = {
  children: PropTypes.any,
}