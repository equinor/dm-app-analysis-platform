// @ts-nocheck

import React from 'react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'
import Routes from './Routes'
import { TApp, TLayout } from '@development-framework/dm-core'
import Content from './layout/Content'
import Menu from './layout/Menu'
import {Header} from "./layout/Header";

const MainLayout = (props: TLayout) => {
  const { content, settings, allApps } = props
  return (
    <>
      <Header
        appName={settings.label}
        urlPath={settings.urlPath}
        allApps={allApps}
      />
      <Layout>
        <Menu appRootPath={settings.urlPath} />
        <Content settings={settings} content={content} />
      </Layout>
    </>
  )
}

export default (props: TApp): JSX.Element => {
  const { settings, applications } = props

  return (
    <>
      {Routes.map((route) => (
        <Route
          exact
          path={`/${settings.urlPath}${route.path}`}
          key={route.path}
          render={() => (
            <MainLayout
              allApps={applications}
              content={route.content}
              settings={settings}
            />
          )}
        />
      ))}
    </>
  )
}
