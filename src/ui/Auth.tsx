import React, { useState } from 'react';
import { useInput, Text, Box } from 'ink';
import open from 'open';
import TextInput from 'ink-text-input';
import { setConfig } from '../config/configManage.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config({ quiet: true });

const AUTH_URL = process.env.AUTH_URL || '';

const Auth = ({ onAuthenticated }: { onAuthenticated?: () => void }) => {
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
                    // Show success for 1s, then advance
                    setTimeout(() => {
                        onAuthenticated && onAuthenticated();
                    }, 1000);
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
				<Box marginTop={1} marginBottom={1} borderStyle="single" borderColor="white" width="100%" paddingX={1}>
					<Text color='gray'>🔐 Press <Text bold color="white">[Enter]</Text> to Signin to your account</Text>
				</Box>
			)}

			{step === 'waiting' && (
				<>
					<Box flexDirection="column" marginTop={1} marginBottom={1} borderStyle="single" borderColor="white" width="100%" paddingX={1}>
						<Text color="gray">🌐 Browser opened at {AUTH_URL}</Text>
						<Text color="gray">📥 Paste your token here and press <Text bold color="white">[Enter]</Text>:</Text>
					</Box>
					<Box borderStyle="single" alignSelf="flex-start" width="100%" borderColor="green">
						<Box marginRight={1}><Text color="white">{`>`}</Text></Box>
						<TextInput mask='*' value={token} onChange={setToken} placeholder='Add your token here..' />
					</Box>
				</>
			)}

			{step === 'done' && (
				<Box marginTop={1} marginBottom={1} borderStyle="single" borderColor="gray" width="100%">
					<Text color="cyan">✅ Logged in successfully!</Text>
				</Box>
			)}

			{step === 'error' && (
				<>
					<Box flexDirection="column" marginTop={1} marginBottom={1} borderStyle="single" borderColor="white" width="100%" paddingX={1}>
						<Text color="red">❌ Error: {error}</Text>
						<Text color="yellow">Press [Enter] to try again</Text>
					</Box>
				</>
			)}
		</Box>
	);
};

export default Auth;
