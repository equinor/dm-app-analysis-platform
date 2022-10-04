// @ts-nocheck

import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {ApplicationContext, UiPluginContext, FSTreeProvider, useSearch, DmssAPI} from "@development-framework/dm-core";
import {Progress} from "@equinor/eds-core-react";
import styled, {createGlobalStyle, ThemeProvider} from "styled-components";
import {
  Redirect,
  Route,
  useHistory,
} from 'react-router-dom'
import { Switch } from 'react-router'
import {
    CardBody,
    CardFieldset,
    CardHeader,
    CardHeading,
    CardWrapper,
} from './components/Card'
import {AuthContext} from "react-oauth2-code-pkce";

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

const HorizontalList = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;

  & > div {
    margin: 20px;
    padding: 20px;
  }
`
const AppSelector = (props) => {
    const {applications} = props
    const history = useHistory()
    const links = Object.values(applications).map((setting) => (
        <div key={setting.name}>
            <CardWrapper onClick={() => history.push(`/${setting.urlPath}`)}>
                <CardHeader>
                    <CardHeading>{`${setting.label}`}</CardHeading>
                </CardHeader>
                <CardBody>
                    <CardFieldset>{`${setting.description}`}</CardFieldset>
                </CardBody>
            </CardWrapper>
        </div>
    ))
    return (
        <div>
            <HorizontalList>{links}</HorizontalList>
        </div>
    )
}

const dataSourceId = "DemoDS"

function App() {
    const [isLoadingApplications, setLoadingApplications] = useState<boolean>(true)
    const [applications, setApplications] = useState<boolean>([])
    const {loading, getPagePlugin} = useContext(UiPluginContext)
    const [portal, isLoading] = useSearch(
        {
            type: "system/SIMOS/Portal",
        },
        dataSourceId
    )
    const {token} = useContext(AuthContext)

    const dmssAPI = new DmssAPI(token)

    useEffect(() => {
        setLoadingApplications(true)
        if (portal.length > 0) {
            const applications = []
            const load = () => {
                portal[0].applications.forEach(async (applicationId) => {
                    await dmssAPI
                        .documentGetById({
                            dataSourceId: dataSourceId,
                            documentId: applicationId,
                            depth: 999,
                        })
                        .then((response: any) => {
                            const data = response.data
                            setApplications([...applications, data])
                        })
                        .catch((error: AxiosError) => console.error(error))
                        .finally(() => setLoadingApplications(false))
                })
            }
            load()

        }
    }, [portal])

    if (loading || isLoading || isLoadingApplications)
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

    if (applications?.length === 0) return <></>

    return (
        <ThemeProvider theme={theme}>
            <div>
                <GlobalStyle/>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() =>
                            applications.length === 1 ? (
                                <Redirect to={applications[0].urlPath}/>
                            ) : (
                                <AppSelector applications={applications}/>
                            )
                        }
                    />
                    {Object.values(applications).map((application) => (
                        <Route
                            path={`/${application.urlPath}`}
                            render={() => {
                                const UiPlugin = getPagePlugin(application?.pluginName)
                                    .component
                                if (!UiPlugin)
                                    return (
                                        <div style={{color: 'red'}}>
                                            {' '}
                                            <b>Error:</b>Failed to get UiPlugins, see web console for
                                            details.
                                        </div>
                                    )
                                return (
                                    <ApplicationContext.Provider value={application}>
                                        <FSTreeProvider>
                                            <UiPlugin
                                                settings={application}
                                                applications={applications}
                                            />
                                        </FSTreeProvider>
                                    </ApplicationContext.Provider>
                                )
                            }}
                            key={application.name}
                        />
                    ))}
                </Switch>
            </div>
        </ThemeProvider>
    )
}

export default App;
