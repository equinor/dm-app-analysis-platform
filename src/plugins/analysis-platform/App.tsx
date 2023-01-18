import React, { useContext } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Layout } from 'antd'

import Routes from './Routes'
import {
  ApplicationContext,
  Header,
  FSTreeProvider,
} from '@development-framework/dm-core'
import Content from './components/Layout/Content'
import Menu from './components/Layout/Menu'

// TODO find proper types
type TLayout = {
  content: any
  settings: any
  allApps?: any[]
}

const MainLayout = (props: TLayout) => {
  const { content, settings } = props
  return (
    <>
      <Header
        allApps={[]}
        appName={settings.label ?? settings.name}
        urlPath={''}
      />
      <Layout>
        <Menu />
        <Content settings={settings} content={content} />
      </Layout>
    </>
  )
}

export default (): JSX.Element => {
  const settings = useContext(ApplicationContext)

  return (
    <FSTreeProvider visibleDataSources={settings.dataSources}>
      <Router>
        <Switch>
          {Routes.map((route) => {
            return (
              <Route path={`${route.path}`} exact key={route.path}>
                <MainLayout
                  content={route.content}
                  settings={settings}
                  allApps={[]}
                />
              </Route>
            )
          })}
          <Route path="*">
            <div style={{ textAlign: 'center', padding: '10%' }}>
              Undefined route. Please go back.
            </div>
          </Route>
        </Switch>
      </Router>
    </FSTreeProvider>
  )
}
