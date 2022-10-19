import React, { useContext } from 'react'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import { Layout } from 'antd'

import Routes from './Routes'
import {
  ApplicationContext,
  Header,
  TApp,
  FSTreeProvider,
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


    plan:
    få til routing å fungere. Drit i andre datasources, siden dm-cli ikke funker med reset.
    Av en eller annen grunn vil ikke komponenter definert i Routes rendre når man går til riktig url.
  return (
        // @ts-ignore
    <FSTreeProvider visibleDataSources={settings.dataSources}>
        <Router>
            <Switch>
      {Routes.map((route) => (
        <Route
          path={`/ap/${route.path}`}
          key={route.path}
          render={() => (
            <MainLayout
              content={route.content}
                // @ts-ignore
              settings={settings}
              allApps={[]}
            />
          )}
        />
      ))}
            </Switch>
            </Router>
    </FSTreeProvider>
  )
}
