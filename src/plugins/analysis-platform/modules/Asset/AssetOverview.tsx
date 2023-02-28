import {
  AuthContext,
  hasDomainRole,
  Loading,
  IUIPlugin,
  useDocument,
} from '@development-framework/dm-core'
import React, { ReactNode, useContext } from 'react'
import { Button, Divider } from '@equinor/eds-core-react'
import { AssetTable } from './components'
import { Link, useLocation } from 'react-router-dom'
import { TAsset } from '../../Types'

type TAssets = {
  assets: TAsset[]
}
export const AssetOverview = (props: IUIPlugin): ReactNode => {
  const [assets, isAssetsLoading] = useDocument<TAssets>(props.idReference)
  const { tokenData } = useContext(AuthContext)
  const location = useLocation()
  const analysisOverviewPage = {
    pathname: `/analyses`,
    state: location.state,
  }

  if (isAssetsLoading) {
    return <Loading />
  }

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
      <AssetTable assets={assets?.assets ?? []} />
    </>
  )
}
