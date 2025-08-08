import { getConfig } from "../config/configManage.js";
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const isModelSelected = (): boolean => {
	try{
        const config = getConfig();
        if (!config?.model?.modelName) return false;
        if (!config?.model?.modelKey) return false;
        return config.model.modelName !== '' && config.model.modelKey !== '';
    }catch(error){
        console.error(error);
        return false;
    }
};

export default isModelSelected;