import { Route } from 'react-router-dom'
import React from 'react'
import { Trans } from '@lingui/macro'
import { H1 } from './components/header'
import { Lead } from './components/paragraph'
import { Layout } from './components/layout'
import { WhatWasAffectedForm } from './forms/WhatWasAffectedForm'
import { BackButton } from './components/backbutton'
import { Stack, usePrevious } from '@chakra-ui/core'
import { useStateValue } from './utils/state'
import { nextWhatWasAffectedUrl } from './utils/nextWhatWasAffectedUrl'
import { Page } from './components/Page'

export const WhatWasAffectedPage = () => {
  const [data, dispatch] = useStateValue()
  const { doneForms } = data
  const { whatWasAffected } = data.formData

  console.log('')
  console.log(`State: ${JSON.stringify(whatWasAffected, null, 2)}`)
  console.log('')

  return (
    <Route
      render={({ history }) => (
        <Page>
          <Layout columns={{ base: 4 / 4, md: 6 / 8, lg: 7 / 12 }}>
            <Stack spacing={10} shouldWrapChildren>
              <BackButton />

              <H1>
                <Trans id="whatWasAffectedPage.title" />
              </H1>

              <Lead>
                <Trans id="whatWasAffectedPage.intro" />
              </Lead>

              <WhatWasAffectedForm
                onSubmit={(data) => {
                  dispatch({
                    type: 'saveFormData',
                    data: { whatWasAffected: data },
                  })
                  console.log('')
                  console.log(
                    `State On Submit: ${JSON.stringify(data, null, 2)}`,
                  )
                  console.log('')
                  history.push(
                    doneForms
                      ? '/confirmation'
                      : nextWhatWasAffectedUrl(
                          data.affectedOptions,
                          'whatwasaffected',
                        ),
                  )
                }}
              />
            </Stack>
          </Layout>
        </Page>
      )}
    />
  )
}
