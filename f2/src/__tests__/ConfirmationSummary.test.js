import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming'
import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'
import { ConfirmationSummary } from '../ConfirmationSummary'
import canada from '../theme/canada'
import en from '../locales/en.json'
import { StateProvider, reducer } from '../utils/state'

i18n.load('en', { en })
i18n.activate('en')

describe('<ConfirmationSummary />', () => {
  beforeEach(() => (global.scrollTo = jest.fn()))
  afterEach(cleanup)

  it('renders for anonymous flow', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ThemeProvider theme={canada}>
          <StateProvider
            initialState={{
              formData: {
                anonymous: { anonymousOptions: ['anonymousPage.yes'] },
              },
            }}
            reducer={reducer}
          >
            <I18nProvider i18n={i18n}>
              <ConfirmationSummary />
            </I18nProvider>
          </StateProvider>
        </ThemeProvider>
      </MemoryRouter>,
    )
  })

  it('renders for non-anonymous flow', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ThemeProvider theme={canada}>
          <StateProvider
            initialState={{
              formData: {
                anonymous: { anonymousOptions: ['anonymousPage.no'] },
              },
            }}
            reducer={reducer}
          >
            <I18nProvider i18n={i18n}>
              <ConfirmationSummary />
            </I18nProvider>
          </StateProvider>
        </ThemeProvider>
      </MemoryRouter>,
    )
  })
})
