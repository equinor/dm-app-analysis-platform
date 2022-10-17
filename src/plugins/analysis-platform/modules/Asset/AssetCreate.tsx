import React, { useContext, useState } from 'react'
import { getUsername } from '../../utils/auth'
import {
  AuthContext,
  ApplicationContext,
  ErrorResponse,
  DmssAPI,
} from '@development-framework/dm-core'
import { Progress } from '@equinor/eds-core-react'
import { EBlueprints } from '../../Enums'
import { ASSET_PATH, DEFAULT_DATASOURCE_ID } from '../../const'
import { CreateAssetForm } from './components'
// @ts-ignore
import { NotificationManager } from 'react-notifications'
import { TAsset } from '../../Types'
import { AxiosError, AxiosResponse } from 'axios'
import { useHistory } from 'react-router-dom'

export const AssetCreate = (): JSX.Element => {
  const settings = useContext<any>(ApplicationContext)
  const { tokenData, token } = useContext(AuthContext)
  const history = useHistory()
  const dmssAPI = new DmssAPI(token)
  const user = getUsername(tokenData)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const createdAt = new Date().toISOString()

  const handleCreateAsset = (formData: TAsset) => {
    setIsLoading(true)
    const data = {
      ...formData,
      type: EBlueprints.ASSET,
      creator: user,
      created: createdAt,
      updated: createdAt,
      location: formData.location || {
        type: EBlueprints.LOCATION,
      },
    }
    dmssAPI
      .documentAddToPath({
        dataSourceId: DEFAULT_DATASOURCE_ID,
        updateUncontained: true,
        document: JSON.stringify(data),
        directory: ASSET_PATH,
      })
      .then((response: AxiosResponse<any>) => {
        history.push(
          `/${settings.urlPath}/view/${DEFAULT_DATASOURCE_ID}/${response.data.uid}`
        )
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        console.error(error)
        NotificationManager.error(error.response?.data.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  if (isLoading) return <Progress.Linear />

  return <CreateAssetForm onSubmit={handleCreateAsset} />
}
