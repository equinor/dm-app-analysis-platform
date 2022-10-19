// @ts-nocheck

import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'
import Routes from './Routes'
import {
  ApplicationContext,
  TApp,
  TLayout,
} from '@development-framework/dm-core'
import Content from './layout/Content'
import Menu from './layout/Menu'
import { Header } from './layout/Header'

const MainLayout = (props: TLayout) => {
  const { content, settings } = props
  return (
    <>
      <Header
        appName={settings.label ?? settings.name}
        urlPath={settings.urlPath}
      />
      <Layout>
        <Menu appRootPath={settings.urlPath} />
        <Content settings={settings} content={content} />
      </Layout>
    </>
  )
}

const App = (props: TApp): JSX.Element => {
  const settings = useContext(ApplicationContext)
  const urlPath = settings.urlPath ? `/${settings.urlPath}` : ''

  return (
    <>
      {Routes.map((route) => (
        <Route
          exact
          path={`${urlPath}/${route.path}`}
          key={route.path}
          render={() => (
            <MainLayout content={route.content} settings={settings} />
          )}
        />
      ))}
    </>
  )
}

export default App
