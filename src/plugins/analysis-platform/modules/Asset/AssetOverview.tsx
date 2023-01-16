import {
  AuthContext,
  hasDomainRole,
  // useSearch,
  Loading,
} from '@development-framework/dm-core'
import React, { ReactNode, useContext } from 'react'
import { Button, Divider } from '@equinor/eds-core-react'
import { AssetTable } from './components'
import { Link, useLocation } from 'react-router-dom'
import { TAsset } from '../../Types'
import { EBlueprints } from '../../Enums'
import { DEFAULT_DATASOURCE_ID } from '../../const'

export const AssetOverview = (): ReactNode => {
  const { tokenData } = useContext(AuthContext)
  const location = useLocation()
  const analysisOverviewPage = {
    pathname: `/analyses`,
    state: location.state,
  }
  // const [assets, isLoading] = useSearch<TAsset>(
  //   {
  //     type: EBlueprints.ASSET,
  //   },
  //   DEFAULT_DATASOURCE_ID
  // )

  // if (isLoading) {
  //   return <Loading />
  // }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {hasDomainRole(tokenData) && (
          <Link to={`/asset/new`}>
            <Button>Create new asset</Button>
          </Link>
        )}
        <Link to={analysisOverviewPage}>
          <Button>View all analyses</Button>
        </Link>
      </div>

      <Divider variant="medium" />
      {/*<AssetTable assets={assets} /> //TODO enable after usesearch fix*/}
    </>
  )
}
