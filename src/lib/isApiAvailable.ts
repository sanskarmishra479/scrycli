import { getConfig } from "../core/configManage.js";
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const isApiAvailable = (): boolean => {
    const config = getConfig();
    if (config?.openRouter?.apiKey) {
        return true
    }else{
        return false
    }
}

export default isApiAvailable;