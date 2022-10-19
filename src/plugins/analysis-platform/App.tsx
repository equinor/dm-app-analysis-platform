import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'

import Routes from './Routes'
import {
  ApplicationContext,
  Header,
  TApp,
  TLayout,
} from '@development-framework/dm-core'
import { backgroundColorDefault } from './components/Design/Colors'
import Content from './components/Layout/Content'
import Menu from './components/Layout/Menu'

const MainLayout = (props: TLayout) => {
  const { content, settings } = props
  return (
    <>
      <Header
        allApps={[]}
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

export default (props: TApp): JSX.Element => {
  const settings = useContext(ApplicationContext)
  const appConfig = useContext(ApplicationContext)

  const urlPath = settings.urlPath ? `/${settings.urlPath}` : ''
  console.log('appConfig', appConfig)
  return (
    <>
      {Routes.map((route) => (
        <Route
          exact
          path={`${urlPath}/${route.path}`}
          key={route.path}
          render={() => (
            <MainLayout
              content={route.content}
              settings={settings}
              allApps={[]}
            />
          )}
        />
      ))}
    </>
  )
}
