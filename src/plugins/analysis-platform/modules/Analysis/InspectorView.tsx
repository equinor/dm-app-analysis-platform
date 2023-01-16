import React, { useEffect, useState } from 'react'
import {
  IUIPlugin,
  TGenericObject,
  TJob,
  useDocument,
} from '@development-framework/dm-core'
import { AnalysisInfoCard, AnalysisJobTable } from './components'

import { Loading } from '@development-framework/dm-core'
import { TAnalysis } from '../../Types'

export const InspectorView = (props: IUIPlugin): JSX.Element => {
  const { idReference } = props
  const [dataSourceId, documentId] = idReference.split('/', 2)
  const [jobs, setJobs] = useState<any[]>([])
  const [document, loading] = useDocument<TAnalysis>(idReference)
  const [analysis, setAnalysis] = useState<TAnalysis | null>(null)

  useEffect(() => {
    if (!document) return
    setAnalysis(document)
  }, [document])

  useEffect(() => {
    if (!analysis) return
    setJobs(analysis.jobs)
  }, [analysis])
  if (loading || analysis === null) {
    return <Loading />
  }
  return (
    <>
      <AnalysisInfoCard
        analysis={analysis}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        addJob={(newJob: TJob) => false}
        jobs={jobs}
        dataSourceId={dataSourceId}
      />
      <AnalysisJobTable
        jobs={jobs}
        analysisId={analysis._id}
        dataSourceId={dataSourceId}
        setJobs={() => undefined}
      />
    </>
  )
}
