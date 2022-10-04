import { TRoute } from '@development-framework/dm-core'
import {Overview} from "./pages/Overview";

const Routes: Array<TRoute> = [
  {
    path: '',
    //@ts-ignore
    content: Overview,
  }
]

export default Routes
