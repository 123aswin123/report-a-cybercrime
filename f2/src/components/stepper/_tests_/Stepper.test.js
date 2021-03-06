import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import theme from '../../../theme'
import { render } from '@testing-library/react'
import { Steps } from '../'
import en from '../../../locales/en.json'

i18n.load('en', { en })
i18n.activate('en')

describe('<Steps />', () => {
  it('Render without crashing - 2 steps', () => {
    render(
      <ThemeProvider theme={theme}>
        <I18nProvider i18n={i18n}>
          <Steps activeStep={2} totalSteps={6} />
        </I18nProvider>
      </ThemeProvider>,
    )
  })

  it('Uses step props correctly', () => {
    const { getAllByText } = render(
      <ThemeProvider theme={theme}>
        <I18nProvider i18n={i18n}>
          <Steps activeStep={1} totalSteps={6}></Steps>
        </I18nProvider>
      </ThemeProvider>,
    )
    const test = getAllByText(/stepper/)
    expect(test).toHaveLength(1)
  })
})
