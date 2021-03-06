import React from 'react'
import * as Yup from 'yup'
import { regexDef } from './regex'
import { Trans } from '@lingui/macro'

export const yupSchema = () => {
  return {
    phoneSchema: Yup.string().matches(regexDef().phoneRegExp, {
      excludeEmptyString: true,
      message: 'Please enter a valid phone number',
    }),
    emailSchema: Yup.string().email(
      <Trans id="contactinfoForm.email.warning" />,
    ),

    postalCodeSchema: Yup.string().matches(regexDef().postalCodeRegex, {
      message: <Trans id="locationInfoForm.Warning" />,
    }),

    dateSchema: {
      DAY: Yup.number().min(1).max(31),
      MONTH: Yup.number().min(1).max(12),
      YEAR: Yup.number().min(1000).max(9999), //Enforce 4 digit entry
    },
  }
}
