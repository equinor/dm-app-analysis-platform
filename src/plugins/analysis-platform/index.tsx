import { EDmtPluginType } from '@development-framework/dm-core'

import App from './App'
import { InspectorView, OperatorView } from './modules/Analysis'
import { AssetView } from './modules/Asset/AssetView'
import {EditTask} from "./plugins/task/src/EditTask";
import {ViewTask} from "./plugins/task/src/ViewTask";
import {EditInput} from "./plugins/task/src/InputOnly";
import {EditSimaApplicationInput} from "./plugins/sima-application-input/src/EditSimaApplicationInput";
import {UpdateInputOnly} from "./plugins/sima-application-input/src/UpdateInputOnly";
import {ViewSimaApplicationInput} from "./plugins/sima-application-input/src/ViewSimaApplicationInput";

export const plugins: any = [
  {
    pluginName: 'analysisPlatformApp',
    pluginType: EDmtPluginType.PAGE,
    component: App,
  },
  {
    pluginName: 'view-analysis-inspector',
    pluginType: EDmtPluginType.UI,
    component: InspectorView,
  },
  {
    pluginName: 'view-analysis-operator',
    pluginType: EDmtPluginType.UI,
    component: OperatorView,
  },
  {
    pluginName: 'view-asset',
    pluginType: EDmtPluginType.UI,
    component: AssetView,
  },
  {
    pluginName: 'edit-task',
    pluginType: EDmtPluginType.UI,
    component: EditTask,
  },
  {
    pluginName: 'view-task',
    pluginType: EDmtPluginType.UI,
    component: ViewTask,
  },
  {
    pluginName: 'edit-task-operator',
    pluginType: EDmtPluginType.UI,
    component: EditInput,
  },
  {
    pluginName: 'edit-sima-application-input',
    pluginType: EDmtPluginType.UI,
    component: EditSimaApplicationInput,
  },
  {
    pluginName: 'edit-sima-application-input-input',
    pluginType: EDmtPluginType.UI,
    component: UpdateInputOnly,
  },
  {
    pluginName: 'view-sima-application-input',
    pluginType: EDmtPluginType.UI,
    component: ViewSimaApplicationInput,
  },

    //TODO now, I have copied EditTask, ViewTask and EditInput from dmt/packages/plugins/task into src/plugins/analysis-platform/plugins.
    //Question: is it okay to include plugins inside the analysis-portal plugin? the stuff inside dmt/packages/plugins/task is related to BPs from analysis portal, and I think task should not be a plugin in dm-core-pacakges.
    // the stuff inside analysis-platform/plugins might requires separate packages (for example EditTask requires Lodash)
]

export * from './utils/auth'
export * from './Types'
export * from './const'
export * from './Enums'
