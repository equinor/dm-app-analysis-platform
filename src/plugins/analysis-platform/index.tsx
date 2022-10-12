import { EDmtPluginType } from '@development-framework/dm-core'

import App from './App'
import { InspectorView, OperatorView } from './modules/Analysis'
import { AssetView } from './modules/Asset/AssetView'
import {EditTask} from "./plugins/task/src/EditTask";
import {ViewTask} from "./plugins/task/src/ViewTask";
import {EditInput} from "./plugins/task/src/InputOnly";

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

    //TODO now, I have copied EditTask, ViewTask and EditInput from dmt/packages/plugins/task into src/plugins/analysis-platform/plugins.
    //Question: is it okay to include plugins inside the analysis-portal plugin? the stuff inside dmt/packages/plugins/task is related to BPs from analysis portal, and I think task should not be a plugin in dm-core-pacakges.
    // the stuff inside analysis-platform/plugins might requires separate packages (for example EditTask requires Lodash)
]

export * from './utils/auth'
export * from './Types'
export * from './const'
export * from './Enums'
