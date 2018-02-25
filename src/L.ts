import { ILocalizer } from './localizer/ILocalizer';

//#if (NODE)
import { NodeLocalizer } from './localizer/NodeLocalizer';
import './node/middleware'
export default NodeLocalizer as ILocalizer;
//#endif 

/*#if (BROWSER)
import { BrowserLocalizer  } from './localizer/BrowserLocalizer';
export default BrowserLocalizer;
*/