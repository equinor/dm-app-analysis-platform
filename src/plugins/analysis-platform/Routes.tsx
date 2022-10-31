import { TRoute } from '@development-framework/dm-core'
import { AssetOverview } from './modules/Asset'
import { AssetCreate } from './modules/Asset'
import { AnalysisCreate, AnalysisOverview } from './modules/Analysis'
import { View } from './modules'

const Routes: Array<TRoute> = [
  {
    path: '/',
    content: AssetOverview,
  },
  {
    path: '/analyses',
    content: AnalysisOverview,
  },
  {
    path: '/asset/new',
    content: AssetCreate,
  },
  {
    path: '/analysis/new/:asset_id',
    content: AnalysisCreate,
  },
  {
    path: '/analysis/new',
    content: AnalysisCreate,
  },
  {
    path: '/analysis/:data_source/:entity_id',
    content: View,
  },
  {
    path: '/view/:data_source/:entity_id',
    content: View,
  },
]

export default Routes
