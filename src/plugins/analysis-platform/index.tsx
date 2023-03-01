import {
  AnalysisOverview,
  InspectorView,
  OperatorView,
} from './modules/Analysis'
import { AssetView } from './modules/Asset/AssetView'
import { EditTask } from './plugins/task/src/EditTask'
import { ViewTask } from './plugins/task/src/ViewTask'
import { EditInput } from './plugins/task/src/InputOnly'
import { EditSimaApplicationInput } from './plugins/sima-application-input/src/EditSimaApplicationInput'
import { UpdateInputOnly } from './plugins/sima-application-input/src/UpdateInputOnly'
import { ViewSimaApplicationInput } from './plugins/sima-application-input/src/ViewSimaApplicationInput'
import { EditContainer } from './plugins/job-handlers/src/EditContainer'
import { AssetOverview } from './modules/Asset'

export const plugins: any = [
  {
    pluginName: 'asset-overview',
    component: AssetOverview,
  },
  {
    pluginName: 'analyses-overview',
    component: AnalysisOverview,
  },
  {
    pluginName: 'view-analysis-inspector',
    component: InspectorView,
  },
  {
    pluginName: 'view-analysis-operator',
    component: OperatorView,
  },
  {
    pluginName: 'view-asset',
    component: AssetView,
  },
  {
    pluginName: 'edit-task',
    component: EditTask,
  },
  {
    pluginName: 'view-task',
    component: ViewTask,
  },
  {
    pluginName: 'edit-task-operator',
    component: EditInput,
  },
  {
    pluginName: 'edit-sima-application-input',
    component: EditSimaApplicationInput,
  },
  {
    pluginName: 'edit-sima-application-input-input',
    component: UpdateInputOnly,
  },
  {
    pluginName: 'view-sima-application-input',
    component: ViewSimaApplicationInput,
  },
  {
    pluginName: 'edit-container-job',
    component: EditContainer,
  },
]

export * from './utils/auth'
export * from './Types'
export * from './const'
export * from './Enums'
