import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'

import Routes from './Routes'
import {
  ApplicationContext,
  Header,
  FSTreeProvider,
  TLayout,
} from '@development-framework/dm-core'
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

export default (): JSX.Element => {
  const settings = useContext(ApplicationContext)

  return (
    <FSTreeProvider visibleDataSources={settings.dataSources}>
      <Switch>
        {Routes.map((route) => {
          console.log('r: ', route)
          return (
            <Route path={`/ap${route.path}`} exact key={route.path}>
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
    </FSTreeProvider>
  )
}
