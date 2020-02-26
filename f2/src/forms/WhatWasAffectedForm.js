import React from 'react'
import PropTypes from 'prop-types'
import { useLingui } from '@lingui/react'
import { Trans } from '@lingui/macro'
import { Form } from 'react-final-form'
import { NextAndCancelButtons } from '../components/next-and-cancel-buttons'
import { Stack, Alert, AlertIcon } from '@chakra-ui/core'
import { useStateValue } from '../utils/state'
import { CheckboxAdapter } from '../components/checkbox'
import { FormArrayControl } from '../components/FormArrayControl'
import { Text } from '../components/text'

const validate = () => {
  return {}
}

export const whatWasAffectedPages = [
  {
    key: 'whatWasAffectedForm.financial',
    url: 'moneylost',
  },
  {
    key: 'whatWasAffectedForm.personal_information',
    url: 'information',
  },
  { key: 'whatWasAffectedForm.devices', url: 'devices' },
  { key: 'whatWasAffectedForm.business_assets', url: 'business' },
  { key: 'whatWasAffectedForm.other', url: '' },
]

export const WhatWasAffectedForm = props => {
  const { i18n } = useLingui()

  const [data] = useStateValue()
  const whatWasAffected = {
    affectedOptions: [],
    ...data.formData.whatWasAffected,
    optionOther: '',
  }

  const affectedOptions = whatWasAffectedPages.map(page => page.key)
  let showWarning = false

  return (
    <React.Fragment>
      {false ? ( // mark ids for lingui
        <div>
          <Trans id="whatWasAffectedForm.financial" />
          <Trans id="whatWasAffectedForm.personal_information" />
          <Trans id="whatWasAffectedForm.devices" />
          <Trans id="whatWasAffectedForm.business_assets" />
          <Trans id="whatWasAffectedForm.other" />
          <Trans id="whatWasAffectedForm.financial.example" />
          <Trans id="whatWasAffectedForm.personal_information.example" />
          <Trans id="whatWasAffectedForm.devices.example" />
          <Trans id="whatWasAffectedForm.business_assets.example" />
        </div>
      ) : null}

      <Form
        initialValues={whatWasAffected}
        onSubmit={values => {
          if (values.affectedOptions.length === 0) {
            showWarning = true
          } else {
            props.onSubmit(values)
          }
        }}
        validate={validate}
        render={({ handleSubmit, values }) => (
          <Stack
            as="form"
            onSubmit={handleSubmit}
            shouldWrapChildren
            spacing={6}
          >
            <FormArrayControl
              name="affectedOptions"
              label={<Trans id="whatWasAffectedForm.optionsTitle" />}
              helperText={<Trans id="whatWasAffectedForm.optionsHelpText" />}
            >
              {affectedOptions.map(key => {
                return (
                  <React.Fragment key={key}>
                    <CheckboxAdapter
                      name="affectedOptions"
                      value={key}
                      isChecked={whatWasAffected.affectedOptions.includes(key)}
                    >
                      {i18n._(key)}
                      {key !== 'whatWasAffectedForm.other' && (
                        <Text as="span" d="block" fontSize="sm">
                          {<Trans id={`${key}.example`} />}
                        </Text>
                      )}
                    </CheckboxAdapter>
                  </React.Fragment>
                )
              })}
              {showWarning ? (
                <Alert status="warning">
                  <AlertIcon />
                  <Trans id="whatWasAffectedForm.warning" />
                </Alert>
              ) : null}
            </FormArrayControl>
            <NextAndCancelButtons
              next={<Trans id="whatWasAffectedForm.nextPage" />}
              button={<Trans id="whatWasAffectedForm.nextButton" />}
            />
          </Stack>
        )}
      />
    </React.Fragment>
  )
}

WhatWasAffectedForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
