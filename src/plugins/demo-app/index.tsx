import { EDmtPluginType } from '@development-framework/dm-core'

import App from './App'

export const plugins: any = [
  {
    pluginName: 'demoApp',
    pluginType: EDmtPluginType.PAGE,
    component: App,
  },
]
