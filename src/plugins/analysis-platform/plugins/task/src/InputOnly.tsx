import {
  IUIPlugin,
  Loading,
  UIPluginSelector,
  useDocument,
} from '@development-framework/dm-core'
import * as React from 'react'

export const EditInput = (props: IUIPlugin) => {
  const { idReference, onOpen } = props
  const [document, loading] = useDocument<any>(idReference)
  if (loading) {
    return <Loading />
  }
  if (!document?.applicationInput) {
    return <pre style={{ color: 'red' }}>No input exists for the analysis</pre>
  }
  return (
    <div>
      <UIPluginSelector
        idReference={`${idReference}.applicationInput`}
        type={document?.applicationInput.type}
        onOpen={onOpen}
      />
    </div>
  )
}
