import { getConfig } from "../config/configManage.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });


const isAuthenticated = (): boolean => {
	try {
		const config = getConfig();

		if (!config?.user?.token) return false;
		if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined');

		const decoded = jwt.verify(config.user.token, process.env.JWT_SECRET) as any;

		return decoded && typeof decoded === 'object' && 'userId' in decoded;
	} catch (error) {
		return false;
	}
};

export default isAuthenticated;