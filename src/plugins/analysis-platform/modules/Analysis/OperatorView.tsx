import React, { useEffect, useState, useContext } from 'react'
import {
  AuthContext,
  IUIPlugin,
  UIPluginSelector,
  TJob,
  useDocument,
  Loading,
  hasDomainRole,
} from '@development-framework/dm-core'
import { AnalysisInfoCard, AnalysisJobTable } from './components'

export const OperatorView = (props: IUIPlugin): JSX.Element => {
  const { idReference } = props
  const [dataSourceId, documentId] = idReference.split('/', 2)
  const [jobs, setJobs] = useState<any[]>([])
  const [analysis, setAnalysis] = useState<any>()
  const [document, loading] = useDocument(idReference)
  const { tokenData } = useContext(AuthContext)

  useEffect(() => {
    if (!analysis) return
    setJobs(analysis.jobs)
  }, [analysis])

  useEffect(() => {
    setAnalysis(document)
  }, [document])
  if (loading) {
    return <Loading />
  }
  return (
    <>
      <AnalysisInfoCard
        analysis={analysis}
        addJob={(newJob: TJob) => setJobs([...jobs, newJob])}
        jobs={jobs}
        dataSourceId={dataSourceId}
      />
      <>
        {hasDomainRole(tokenData) && (
          <UIPluginSelector
            type={analysis.task.type}
            idReference={`${dataSourceId}/${analysis._id}.task`}
            onSubmit={(formData: any) => {
              setAnalysis({ ...analysis, task: formData })
            }}
          />
        )}
        <AnalysisJobTable
          jobs={jobs}
          analysisId={analysis._id}
          dataSourceId={dataSourceId}
          setJobs={setJobs}
        />
      </>
    </>
  )
}
