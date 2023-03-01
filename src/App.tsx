import React, { useContext } from 'react'
import './App.css'
import {
  ApplicationContext,
  useDocument,
  UIRecipesSelector,
  UiPluginContext,
  FSTreeProvider,
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
const [dataSourceId, documentId] = appSettings.applicationId.split('/', 2) // TODO create helper function to do this split

function App() {
  const { loading: isPluginsLoading } = useContext(UiPluginContext)
  const [application, isLoading, updateDocument, error] = useDocument<any>(
    appSettings.applicationId
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
          <FSTreeProvider visibleDataSources={application.dataSources}>
            <UIRecipesSelector
              idReference={`${dataSourceId}/${application?._id}`}
              type={application?.type}
            />
          </FSTreeProvider>
        </ApplicationContext.Provider>
      </div>
    </ThemeProvider>
  )
}

export default App
