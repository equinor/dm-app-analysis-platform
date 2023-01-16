import {
  Button,
  Icon,
  Progress,
  Table,
  Typography,
} from '@equinor/eds-core-react'
import React, { useContext, useEffect, useState } from 'react'
import {
  AuthContext,
  DmssAPI,
  JobStatus,
  hasOperatorRole,
  DmJobAPI,
  TJob,
  ErrorResponse,
} from '@development-framework/dm-core'
import styled from 'styled-components'
import { AxiosError, AxiosResponse } from 'axios'
// @ts-ignore
import { NotificationManager } from 'react-notifications'

type TAnalysisJobTableProps = {
  jobs: any
  analysisId: string
  dataSourceId: string
  setJobs: (jobs: TJob[]) => void
}

const ClickableLabel = styled.div`
  cursor: pointer;
  color: blue;
  text-decoration-line: underline;
`

const JobRow = (props: {
  job: TJob
  index: number
  analysisId: string
  dataSourceId: string
  removeJob: () => void
  setJob: (j: TJob) => void
}) => {
  const { job, index, analysisId, dataSourceId, removeJob, setJob } = props
  const { token, tokenData } = useContext(AuthContext)
  const jobApi = new DmJobAPI(token)
  const dmssAPI = new DmssAPI(token)
  const [loading, setLoading] = useState<boolean>(false)
  const [jobStatus, setJobStatus] = useState<JobStatus>(JobStatus.Unknown)
  const jobURL: string = `/view/${dataSourceId}/${analysisId}.jobs.${index}`
  const resultURL = job.result?._id
    ? `/view/${dataSourceId}/${job.result?._id}`
    : undefined

  const viewJob = () => {
    if (hasOperatorRole(tokenData)) {
      document.location.href = jobURL
    } else {
      if (resultURL) {
        document.location.href = resultURL
      } else {
        NotificationManager.warning('Result is not ready')
      }
    }
  }

  const startJob = () => {
    setLoading(true)
    jobApi
      .startJob({ jobDmssId: `${dataSourceId}/${analysisId}.jobs.${index}` })
      .then((result: AxiosResponse) => {
        NotificationManager.success(
          result.data.message,
          'Simulation job started'
        )
        const now = new Date().toLocaleString(navigator.language)
        setJobStatus(JobStatus.Starting)
        setJob({ ...job, started: now, status: JobStatus.Starting })
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        console.error(error.response?.data)
        NotificationManager.error(error.response?.data.message)
      })
      .finally(() => setLoading(false))
  }

  async function deleteJob(): Promise<void> {
    setLoading(true)
    await dmssAPI
      .documentRemove({
        dataSourceId: dataSourceId,
        dottedId: `${analysisId}.jobs.${index}`,
      })
      .then(() => {
        if (job?.uid) {
          jobApi.removeJob({ jobUid: job.uid }).then(() => removeJob)
        }
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        if (error.response?.data.status === 404) {
          removeJob()
        } else {
          console.error(error)
          NotificationManager.error(error.response?.data.message)
        }
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!job?.uid) {
      // Job has not been started
      setJobStatus(job.status)
      return
    }
    setLoading(true)
    jobApi
      .jobStatus({ jobUid: job.uid })
      .then((result: any) => {
        setJobStatus(result.data.status)
      })
      .catch((e: AxiosError<ErrorResponse>) => {
        console.error(e)
        setJobStatus(job.status)
      })
      .finally(() => setLoading(false))
  }, [job, index])

  return (
    <Table.Row>
      <Table.Cell onClick={viewJob}>
        {jobStatus !== JobStatus.NotStarted
          ? new Date(job.started).toLocaleString(navigator.language)
          : 'Not started'}
      </Table.Cell>
      <Table.Cell onClick={viewJob}>{job.triggeredBy}</Table.Cell>
      <Table.Cell onClick={viewJob}>{jobStatus}</Table.Cell>
      <Table.Cell>
        {Object.keys(job?.result || {}).length ? (
          <ClickableLabel
            onClick={() => {
              window.open(resultURL, '_blank')
            }}
          >
            Open
          </ClickableLabel>
        ) : (
          <>None</>
        )}
      </Table.Cell>
      {loading ? (
        <Table.Cell>
          <Progress.Circular style={{ height: '24px' }} />
        </Table.Cell>
      ) : hasOperatorRole(tokenData) ? (
        <Table.Cell>
          {jobStatus === JobStatus.NotStarted ? (
            <Button variant="ghost_icon" onClick={() => startJob()}>
              <Icon name="play" title="play" />
            </Button>
          ) : (
            <Button
              variant="ghost_icon"
              color="danger"
              onClick={() => deleteJob()}
            >
              <Icon name="delete_forever" title="delete" />
            </Button>
          )}
        </Table.Cell>
      ) : (
        <></>
      )}
    </Table.Row>
  )
}

export const AnalysisJobTable = (props: TAnalysisJobTableProps) => {
  const { jobs, analysisId, dataSourceId, setJobs } = props
  const { tokenData } = useContext(AuthContext)

  return (
    <>
      <Table style={{ width: '100%' }}>
        <Table.Caption>
          <Typography variant="h3">Runs</Typography>
        </Table.Caption>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Started</Table.Cell>
            <Table.Cell>Started by</Table.Cell>
            <Table.Cell>Status</Table.Cell>
            <Table.Cell>Result</Table.Cell>
            {hasOperatorRole(tokenData) && <Table.Cell>Control</Table.Cell>}
          </Table.Row>
        </Table.Head>
        <Table.Body style={{ cursor: 'pointer' }}>
          {jobs.map((job: TJob, index: number) => (
            <JobRow
              key={index}
              job={job}
              index={index}
              analysisId={analysisId}
              dataSourceId={dataSourceId}
              removeJob={() => {
                jobs.splice(index, 1)
                setJobs([...jobs])
              }}
              setJob={(job: TJob) => {
                jobs[index] = job
                setJobs([...jobs])
              }}
            />
          ))}
        </Table.Body>
      </Table>
    </>
  )
}
