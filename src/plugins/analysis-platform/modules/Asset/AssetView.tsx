import React from 'react'
import { IUIPlugin, useDocument, Loading } from '@development-framework/dm-core'
import { AssetInfoCard } from './components'
import { AnalysisTable } from '../Analysis'
import { TAsset } from '../../Types'

export const AssetView = (props: IUIPlugin): JSX.Element => {
  const { idReference } = props
  const [dataSourceId, documentId] = idReference.split('/', 2)
  const [asset, loading] = useDocument<TAsset>(idReference)

  if (loading || asset === null) {
    return <Loading />
  }
  return (
    <>
      <AssetInfoCard
        asset={asset}
        analyses={asset.analyses}
        dataSourceId={dataSourceId}
      />
      <AnalysisTable analyses={asset.analyses} />
    </>
  )
}
