import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@equinor/eds-core-react'
import { ANALYSIS_PLATFORM_URLPATH } from '../../../const'

export const CreateAnalysisButton = () => {
  const { entity_id } = useParams<{
    entity_id: string
  }>()
  return (
    <Link
      to={
        entity_id
          ? `/${ANALYSIS_PLATFORM_URLPATH}/analysis/new/${entity_id}`
          : `/${ANALYSIS_PLATFORM_URLPATH}/analysis/new`
      }
    >
      <Button>Create new analysis</Button>
    </Link>
  )
}
