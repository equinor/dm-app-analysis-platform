import { IUIPlugin } from '@development-framework/dm-core'
import * as React from 'react'

import { EditSimaApplicationInput } from './EditSimaApplicationInput'

export const ViewSimaApplicationInput = (props: IUIPlugin) => {
  const { idReference } = props

  return <EditSimaApplicationInput idReference={idReference} readOnly={true} />
}
