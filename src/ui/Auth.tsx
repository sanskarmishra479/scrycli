import React, { useState } from 'react';
import { useInput, Text, Box } from 'ink';
import open from 'open';
import TextInput from 'ink-text-input';
import { setConfig } from '../config/configManage.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const AUTH_URL = process.env.AUTH_URL || 'https://scrycli.com/auth';

const Auth = () => {
	const [step, setStep] = useState<'prompt' | 'waiting' | 'done' | 'error'>('prompt');
	const [inputMode, setInputMode] = useState(false);
	const [token, setToken] = useState('');
	const [error, setError] = useState('');


	useInput((input, key) => {
		if (step === 'prompt' && key.return) {
			try {
				open(AUTH_URL); 
				setStep('waiting');
				setInputMode(true);
				setError('');
			} catch (error) {
				console.error('Failed to open browser:', error);
				setError('Failed to open browser. Please visit the URL manually.');
				setStep('error');
			}
		} else if (step === 'waiting' && inputMode && key.return) {         
			try {
				
				if (!token.trim()) {
					setError('Token cannot be empty');
					setStep('error');
					return;
				}

				const jwtSecret = process.env.JWT_SECRET;
				if (!jwtSecret) {
					setError('JWT_SECRET not configured in environment variables');
					setStep('error');
					return;
				}

				const decoded = jwt.verify(token, jwtSecret) as { userId: string };

				if (decoded && decoded.userId) {
					setConfig('user', {token: token, userId: decoded.userId});
					setStep('done');
					setInputMode(false);
					setError('');
				} else {
					throw new Error('Invalid token structure');
				}
			} catch (error) {
				console.error('Token verification failed:', error);
				setError('Invalid token. Please check your token and try again.');
				setStep('error');
			}
		} else if (step === 'error' && key.return) {
			setStep('prompt');
			setError('');
			setToken('');
			setInputMode(false);
		}
	});

	return (
		<Box flexDirection="column">
			{step === 'prompt' && (
				<Text>🔐 Press [Enter] to Sign In / Sign Up in browser</Text>
			)}

			{step === 'waiting' && (
				<>
					<Text>🌐 Browser opened at {AUTH_URL}</Text>
					<Text>📥 Paste your token here and press [Enter]:</Text>
					<Box borderStyle="single" alignSelf="flex-start" width="100%" borderColor="green">
						<TextInput value={token} onChange={setToken} placeholder='Add your token here..' />
					</Box>
				</>
			)}

			{step === 'done' && (
				<Text color="cyan">✅ Token received and verified successfully!</Text>
			)}

			{step === 'error' && (
				<>
					<Text color="red">❌ Error: {error}</Text>
					<Text color="yellow">Press [Enter] to try again</Text>
				</>
			)}
		</Box>
	);
};

export default Auth;
