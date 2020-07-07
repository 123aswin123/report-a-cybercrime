import React from 'react'
import PropTypes from 'prop-types'
import { useLingui } from '@lingui/react'
import { Trans } from '@lingui/macro'
import { Form } from 'react-final-form'
import { NextAndCancelButtons } from '../components/next-and-cancel-buttons'
import { RadioAdapter } from '../components/radio'
import { Stack } from '@chakra-ui/core'
import { useStateValue } from '../utils/state'
import { FormArrayControl } from '../components/FormArrayControl'
import { TextArea } from '../components/text-area'
import { Field } from '../components/Field'
import { Well } from '../components/Messages'
import { ErrorSummary } from '../components/ErrorSummary'
import { clientFieldsAreValid } from '../utils/clientFieldsAreValid'
import { formDefaults } from './defaultValues'
import { validateDate } from '../utils/validateDate'
import { DatePicker } from '../components/dayMonthYear'
import { SingleDatePicker, DateRangePicker } from '../components/DatePicker'

let validate = (values) => {
  const errors = {}
  const startDate = validateDate(
    values.startYear,
    values.startMonth,
    values.startDay,
  )
  errors.whenDidItStart = []
  startDate.map((key) => {
    return errors.whenDidItStart.push(`whenDidItStart.error.${key}`)
  })
  return errors
}

export const WhenDidItHappenForm = (props) => {
  const localOnSubmit = (data) => {
    if (clientFieldsAreValid(data, formDefaults.whendidithappen))
      props
        .onSubmit
        // clearData({ ...data, phone: formatPhoneNumber(data.phone) }),
        ()
  }

  const { i18n } = useLingui()
  const [data] = useStateValue()
  const whendiditstart = {
    ...formDefaults.whendiditstart,
    ...data.formData.whendiditstart,
  }

  //TODO: Move this form data to some sort of a schema file instead?

  var questionsList = [
    {
      name: 'once',
      channel: 'howOften.once',
      label: 'howOftenLabel.question1',
      hint: 'howOftenLabel.hint1',
    },
    {
      name: 'morethanonce',
      channel: 'howOften.morethanonce',
      label: 'howOftenLabel.question2',
      hint: 'howOftenLabel.hint2',
    },
    {
      name: 'notsure',
      channel: 'howOften.notsure',
      label: 'howOftenLabel.question3',
      hint: 'howOftenLabel.hint3',
    },
  ]

  return (
    <React.Fragment>
      {false ? ( // mark ids for lingui
        <div>
          <Trans id="howOftenLabel.question1" />
          <Trans id="howOftenLabel.question2.1" />
          <Trans id="howOftenLabel.question2.2" />
          <Trans id="howOftenLabel.question3" />
          <Trans id="howOftenLabel.hint1" />
          <Trans id="howOftenLabel.hint3" />
          <Trans id="howOften.once" />
          <Trans id="howOften.morethanonce" />
          <Trans id="howOften.notSure" />

          <Trans id="whenDidItStart.error.notDay" />
          <Trans id="whenDidItStart.error.notMonth" />
          <Trans id="whenDidItStart.error.isFuture" />
          <Trans id="whenDidItStart.error.notYear" />
          <Trans id="whenDidItStart.error.yearLength" />
          <Trans id="whenDidItStart.error.hasNoYear" />
          <Trans id="whenDidItStart.error.hasNoMonth" />
          <Trans id="whenDidItStart.error.hasNoDay" />
        </div>
      ) : null}

      <Form
        initialValues={whendiditstart}
        onSubmit={localOnSubmit}
        validate={validate}
        render={({
          handleSubmit,
          values,
          errors,
          submitFailed,
          hasValidationErrors,
        }) => (
          <Stack
            as="form"
            onSubmit={handleSubmit}
            shouldWrapChildren
            spacing={12}
          >
            {submitFailed ? (
              <ErrorSummary>
                <Trans id="whenDidItStart.hasValidationErrors" />
              </ErrorSummary>
            ) : null}
            <FormArrayControl
              name="howOften"
              label={<Trans id="howOften.label" />}
            >
              <React.Fragment>
                <RadioAdapter
                  name="howOften"
                  value="once"
                  conditionalField={
                    <Field
                      component={SingleDatePicker}
                      name="singleDate"
                      group="singleDate"
                      label={<Trans id="howOftenLabel.question1" />}
                      helperText={<Trans id="howOftenLabel.hint1" />}
                    />
                  }
                >
                  <Trans id="howOften.once" />
                </RadioAdapter>
              </React.Fragment>
              <React.Fragment>
                <RadioAdapter
                  name="howOften"
                  value="morethanonce"
                  conditionalField={
                    <Field
                      component={DateRangePicker}
                      name="dateRange"
                      group="dateRange"
                      label={<Trans id="howOftenLabel.question1" />}
                      helperText={<Trans id="howOftenLabel.hint1" />}
                    />
                  }
                >
                  <Trans id="howOften.morethanonce" />
                </RadioAdapter>
              </React.Fragment>
              <React.Fragment>
                <RadioAdapter
                  name="howOften"
                  value="notSure"
                  conditionalField={
                    <Field
                      name={<Trans id="howOften.notSure" />}
                      label={<Trans id="howOftenLabel.question3" />}
                      helperText={<Trans id="howOftenLabel.hint3" />}
                      component={TextArea}
                    />
                  }
                >
                  <Trans id="howOften.notSure" />
                </RadioAdapter>
              </React.Fragment>
            </FormArrayControl>
            <Well variantColor="blue">
              <Trans id="howDidItStartPage.tip" />
            </Well>
            <NextAndCancelButtons
              next={<Trans id="WhenDidItHappenPage.nextPage" />}
              button={<Trans id="WhenDidItHappenPage.nextButton" />}
            />
          </Stack>
        )}
      />
    </React.Fragment>
  )
}

WhenDidItHappenForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}