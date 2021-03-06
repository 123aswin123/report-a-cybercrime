import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import canada from '../../../theme/canada'
import { render, cleanup, screen } from '@testing-library/react'
import { DatePicker, SingleDatePicker, DateRangePicker } from '../'
import { Form } from 'react-final-form'
import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'
import en from '../../../locales/en.json'
i18n.load('en', { en })
i18n.activate('en')
describe('<DatePicker />', () => {
  afterEach(cleanup)
  it('properly renders DatePicker components', () => {
    const submitMock = jest.fn()
    const { getAllByText } = render(
      <I18nProvider i18n={i18n}>
        <ThemeProvider theme={canada}>
          <Form
            initialValues=""
            onSubmit={submitMock}
            render={() => <DatePicker datePickerName="test" />}
          />
        </ThemeProvider>
      </I18nProvider>,
    )

    screen.debug()
    const testDay = getAllByText(/whenDidItStart.startDay/)
    expect(testDay).toHaveLength(1)

    const testMonth = getAllByText(/whenDidItStart.startMonth/)
    expect(testMonth).toHaveLength(1)

    const testYear = getAllByText(/whenDidItStart.startYear/)
    expect(testYear).toHaveLength(1)
  })

  it('properly renders SingleDatePicker components', () => {
    const submitMock = jest.fn()
    const { getAllByText } = render(
      <I18nProvider i18n={i18n}>
        <ThemeProvider theme={canada}>
          <Form
            initialValues=""
            onSubmit={submitMock}
            render={() => (
              <SingleDatePicker
                label="singleDatePickerTest"
                name="singleDatePickerTest"
              />
            )}
          />
        </ThemeProvider>
      </I18nProvider>,
    )
    const testSingleDatePicker = getAllByText(/singleDatePickerTest/)
    expect(testSingleDatePicker).toHaveLength(1)
  })
  it('properly renders DateRangePicker components', () => {
    const submitMock = jest.fn()
    const { getAllByText } = render(
      <I18nProvider i18n={i18n}>
        <ThemeProvider theme={canada}>
          <Form
            initialValues=""
            onSubmit={submitMock}
            render={() => (
              <DateRangePicker
                datePickerName="dateRangePickertest"
                startLabel="startDateLabel"
                endLabel="endDateLabel"
              />
            )}
          />
        </ThemeProvider>
      </I18nProvider>,
    )
    const testStartDate = getAllByText(/startDateLabel/)
    expect(testStartDate).toHaveLength(1)
    const testEndDate = getAllByText(/endDateLabel/)
    expect(testEndDate).toHaveLength(1)
  })
})
