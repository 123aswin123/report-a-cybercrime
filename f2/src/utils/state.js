import React, { createContext, useContext, useReducer } from 'react'
import { formDefaults } from '../forms/defaultValues'
import { whatWasAffectedNavState } from './nextWhatWasAffectedUrl'

export const StateContext = createContext()

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext)

export const initialState = {
  doneForms: false,
  formData: { ...formDefaults, prodVersion: '1.7.0' },
  doneFinalFeedback: false,
  whatWasAffectedOptions: { ...whatWasAffectedNavState },
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'saveFormData':
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.data,
        },
      }
    case 'deleteFormData':
      return {
        ...state,
        formData: { ...initialState.formData },
        doneForms: false,
        submitted: false,
        doneFinalFeedback: false,
        reportId: undefined,
        whatWasAffectedOptions: { ...initialState.whatWasAffectedOptions },
      }
    case 'saveDoneForms':
      return {
        ...state,
        doneForms: action.data,
      }
    case 'saveGoogleRecaptcha':
      return {
        ...state,
        reCaptcha: action.data,
      }
    case 'saveSubmitted':
      return {
        ...state,
        submitted: action.data,
      }
    case 'saveReportId':
      return {
        ...state,
        reportId: action.data,
      }
    default:
      return state
  }
}
