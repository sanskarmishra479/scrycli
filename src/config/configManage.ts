import fs from 'fs';
import path from 'path';
import os from 'os';

const configPath = path.join(os.homedir(), ".scrycli", "config.json");

if(!fs.existsSync(configPath)){
    fs.mkdirSync(path.dirname(configPath), {recursive:true})
    fs.writeFileSync(configPath, JSON.stringify({}));
}

export const getConfig = () => {
    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    return config;
};

export const setConfig = (key: string, value: any) => {
    const config = getConfig();
    config[key] = value;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
};