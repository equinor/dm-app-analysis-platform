import { EPluginType } from '@development-framework/dm-core'

import App from './App'
import { InspectorView, OperatorView } from './modules/Analysis'
import { AssetView } from './modules/Asset/AssetView'
import { EditTask } from './plugins/task/src/EditTask'
import { ViewTask } from './plugins/task/src/ViewTask'
import { EditInput } from './plugins/task/src/InputOnly'
import { EditSimaApplicationInput } from './plugins/sima-application-input/src/EditSimaApplicationInput'
import { UpdateInputOnly } from './plugins/sima-application-input/src/UpdateInputOnly'
import { ViewSimaApplicationInput } from './plugins/sima-application-input/src/ViewSimaApplicationInput'
import { EditContainer } from './plugins/job-handlers/src/EditContainer'

export const plugins: any = [
  {
    pluginName: 'analysisPlatformApp',
    pluginType: EPluginType.PAGE,
    component: App,
  },
  {
    pluginName: 'view-analysis-inspector',
    pluginType: EPluginType.UI,
    component: InspectorView,
  },
  {
    pluginName: 'view-analysis-operator',
    pluginType: EPluginType.UI,
    component: OperatorView,
  },
  {
    pluginName: 'view-asset',
    pluginType: EPluginType.UI,
    component: AssetView,
  },
  {
    pluginName: 'edit-task',
    pluginType: EPluginType.UI,
    component: EditTask,
  },
  {
    pluginName: 'view-task',
    pluginType: EPluginType.UI,
    component: ViewTask,
  },
  {
    pluginName: 'edit-task-operator',
    pluginType: EPluginType.UI,
    component: EditInput,
  },
  {
    pluginName: 'edit-sima-application-input',
    pluginType: EPluginType.UI,
    component: EditSimaApplicationInput,
  },
  {
    pluginName: 'edit-sima-application-input-input',
    pluginType: EPluginType.UI,
    component: UpdateInputOnly,
  },
  {
    pluginName: 'view-sima-application-input',
    pluginType: EPluginType.UI,
    component: ViewSimaApplicationInput,
  },
  {
    pluginName: 'edit-container-job',
    pluginType: EPluginType.UI,
    component: EditContainer,
  },
]

export * from './utils/auth'
export * from './Types'
export * from './const'
export * from './Enums'
