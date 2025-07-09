import { dirname } from 'node:path';
import {fileURLToPath} from "node:url"

const publicDataConfig = dirname(fileURLToPath(import.meta.url));
    

export default publicDataConfig;