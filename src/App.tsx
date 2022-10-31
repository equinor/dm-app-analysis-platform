import React, { useContext } from 'react'
import './App.css'
import {
  ApplicationContext,
  useDocument,
  UIPluginSelector,
  UiPluginContext,
} from '@development-framework/dm-core'
import { Progress } from '@equinor/eds-core-react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import appSettings from './app-settings.json'

const theme = {
  flexboxgrid: {
    gutterWidth: 0, // rem
    outerMargin: 0, // rem
  },
}

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: Equinor-Regular, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

const _applicationId = appSettings.applicationId.split('/')
const dataSourceId = _applicationId[0]
const applicationId = _applicationId[1]

function App() {
  const { loading: isPluginsLoading } = useContext(UiPluginContext)
  const [application, isLoading, updateApplication, error] = useDocument(
    dataSourceId,
    applicationId
  )

  if (isLoading || isPluginsLoading)
    return (
      <Progress.Circular
        style={{
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '150px',
        }}
      />
    )

  if (error) {
    console.error(error)
    return (
      <div style={{ color: 'red' }}>
        {' '}
        <b>Error:</b>Failed to load data, see web console for details
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalStyle />
        <ApplicationContext.Provider value={application}>
          <UIPluginSelector
            absoluteDottedId={`${dataSourceId}/${application?._id}`}
            type={application?.type}
            categories={['Application']}
          />
        </ApplicationContext.Provider>
      </div>
    </ThemeProvider>
  )
}

export default App
